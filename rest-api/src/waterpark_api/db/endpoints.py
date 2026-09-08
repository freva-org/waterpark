"""Newsletter API routes.

Double opt-in flow: POST /subscribe stores a pending row and mails a
confirmation link, GET /verify/{token} activates it, POST /unsubscribe
deactivates by token (from the link in every mail) or by address.
"""

from typing import Optional

from fastapi import APIRouter, BackgroundTasks, Depends, Form, Request, status
from fastapi.responses import JSONResponse, RedirectResponse
from pydantic import BaseModel

from ..config import get_logger, get_settings
from .dependencies import get_newsletter_service, session_scope
from .newsletter import NewsletterService, check_email

logger = get_logger("newsletter")

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])

SUPPORTED_LANGUAGES = ("de", "en", "es")

# Where the browser lands after clicking a link in a mail. mkdocs builds
# data/newsletter.md to /newsletter/ because use_directory_urls is on.
#
# Absolute rather than relative: in development the API answers on :8080
# while the page lives on the docs server at :8000, so a relative redirect
# would land on the API and 404. In production both are waterpark.dkrz.de
# and this resolves to the same place a relative path would.
LANDING_PATH = "/newsletter/"


def landing_url(state: str, lang: str) -> str:
    """Absolute URL of the newsletter page, with the outcome attached."""
    base = get_settings().base_url.rstrip("/")
    return f"{base}{LANDING_PATH}?status={state}&lang={lang}"


class GenericResponse(BaseModel):
    """Generic API response."""

    success: bool
    message: str


def client_ip(request: Request) -> Optional[str]:
    """Best-effort originating address.

    nginx sets X-Forwarded-For; the leftmost entry is the client. This is
    only trustworthy because nothing but our own proxy can reach the
    uvicorn port. If the API is ever exposed directly, the header becomes
    attacker-controlled and this must go back to request.client.
    """
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip()[:45]
    return request.client.host if request.client else None


def _bad_request(message: str) -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"success": False, "message": message},
    )


def run_subscribe_task(email: str, language: str, signup_ip: Optional[str]) -> None:
    """Background task for subscription.

    Opens its own session rather than borrowing one from a `Depends`
    generator; see the note on `session_scope`.
    """
    with session_scope() as session:
        NewsletterService(session).subscribe(
            email, language=language, signup_ip=signup_ip
        )


def run_unsubscribe_task(
    email: Optional[str],
    token: Optional[str],
    reason: Optional[str],
) -> None:
    """Background task for unsubscription."""
    with session_scope() as session:
        NewsletterService(session).unsubscribe(
            email=email, token=token, reason=reason
        )


@router.post("/subscribe", response_model=GenericResponse)
async def subscribe(
    request: Request,
    background_tasks: BackgroundTasks,
    email: str = Form(...),
    language: str = Form("en"),
    website: str = Form(""),
) -> JSONResponse:
    """Subscribe to the newsletter (Step 1 of double opt-in).

    Creates a pending subscription and sends a verification email. Returns
    the same success message whether or not the address is already known,
    so the endpoint cannot be used to test who is on the list.
    """
    # Honeypot: the form ships a visually hidden `website` field that no
    # human fills in. Answer 200 so a bot has nothing to tune against.
    if website.strip():
        logger.info("Honeypot triggered from %s", client_ip(request))
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"success": True, "message": "Verification email sent"},
        )

    try:
        email = check_email(email, available=False)
    except Exception as error:
        logger.warning("Rejected subscribe address: %s", error)
        return _bad_request("Invalid email format")

    if language not in SUPPORTED_LANGUAGES:
        language = "en"

    background_tasks.add_task(
        run_subscribe_task,
        email=email,
        language=language,
        signup_ip=client_ip(request),
    )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"success": True, "message": "Verification email sent"},
    )


@router.get("/verify/{token}")
async def verify(
    token: str,
    request: Request,
    service: NewsletterService = Depends(get_newsletter_service),
) -> RedirectResponse:
    """Verify subscription via email link (Step 2 of double opt-in).

    Called when the user clicks the link in the confirmation mail.
    Redirects to the newsletter page, which renders the outcome.
    """
    success, language, error = service.verify(token, confirm_ip=client_ip(request))

    lang = language or "en"
    if success:
        state = "success"
    elif error == "expired_token":
        state = "expired"
    else:
        state = "invalid"

    return RedirectResponse(
        url=landing_url(state, lang),
        status_code=status.HTTP_302_FOUND,
    )


@router.post("/unsubscribe/{token}", response_model=GenericResponse)
async def unsubscribe_one_click(
    token: str,
    background_tasks: BackgroundTasks,
) -> JSONResponse:
    """RFC 8058 one-click unsubscribe.

    The mail client POSTs here by itself when the user hits the client's own
    unsubscribe button, with no confirmation step and no session. The token
    in the path is the only credential, which is why it is a long random
    value and never expires.
    """
    background_tasks.add_task(
        run_unsubscribe_task,
        email=None,
        token=token,
        reason="one-click",
    )
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"success": True, "message": "Unsubscribe request processed"},
    )


@router.post("/unsubscribe", response_model=GenericResponse)
async def unsubscribe(
    background_tasks: BackgroundTasks,
    email: Optional[str] = Form(None),
    token: Optional[str] = Form(None),
    reason: Optional[str] = Form(None),
) -> JSONResponse:
    """Unsubscribe from the newsletter.

    Accepts either the persistent token from the link in every mail, or a
    plain address. Always reports success so the endpoint reveals nothing
    about who is on the list.
    """
    if not email and not token:
        return _bad_request("Email or token required")

    # Only validate when an address was actually supplied. The previous
    # version validated unconditionally, so every token-based unsubscribe
    # (i.e. every link in every mail) failed with a 400.
    if email:
        try:
            email = check_email(email, available=False)
        except Exception as error:
            logger.warning("Rejected unsubscribe address: %s", error)
            return _bad_request("Invalid email format")

    if reason:
        reason = reason.strip()[:500]

    background_tasks.add_task(
        run_unsubscribe_task,
        email=email,
        token=token,
        reason=reason,
    )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"success": True, "message": "Unsubscribe request processed"},
    )
