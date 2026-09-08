"""Email service with HTML templates for the double opt-in flow."""

import re
import smtplib
from dataclasses import dataclass
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from html import unescape as html_unescape
from typing import Optional, cast

from ..config import get_logger, get_settings
from ..config.server_settings import Settings

logger = get_logger("email")


def _get_logo(base_url: str) -> str:
    """Remote logo for the mail header.

    The file is whatever mkdocs published at assets/logo-512.png. Not
    cached in a module global any more: the old version froze the first
    base_url it ever saw, which silently pointed dev mails at production.
    """
    return (
        f'<img src="{base_url}/assets/logo-512.png" '
        'width="60" height="60" alt="Waterpark" '
        'style="display:block; margin:0 auto; border:0; outline:none; '
        'text-decoration:none;">'
    )


@dataclass
class EmailSettings:
    """Settings for the email service."""

    server: str
    port: int
    username: Optional[str] = None
    password: Optional[str] = None
    from_email: str = "waterpark@support.dkrz.de"
    from_name: str = "Waterpark"
    base_url: str = "https://waterpark.dkrz.de"
    api_url: str = ""

    @property
    def api(self) -> str:
        """Origin serving /api, falling back to the site origin."""
        return self.api_url or self.base_url


class EmailService:
    """Email service for newsletter communications."""

    def __init__(self, settings: Optional[Settings] = None) -> None:
        """Initialize email service.

        Args:
            settings: Email configuration settings
        """
        settings = settings or get_settings()
        self.settings = EmailSettings(
            server=settings.email_server,
            port=settings.email_port,
            username=settings.email_user or None,
            password=settings.email_password or None,
            from_email=settings.email_from_address,
            from_name=settings.email_from_name,
            base_url=settings.base_url,
            api_url=settings.api_url,
        )
        self.enabled = settings.email_disabled is False

    def _one_click_url(self, unsubscribe_token: Optional[str]) -> Optional[str]:
        """Endpoint a mail client can POST to without asking the user."""
        if not unsubscribe_token:
            return None
        return (
            f"{self.settings.api}/api/newsletter/unsubscribe/"
            f"{unsubscribe_token}"
        )

    def _get_server(self) -> smtplib.SMTP:

        _method = {
            smtplib.SMTP_PORT: smtplib.SMTP,
            smtplib.SMTP_SSL_PORT: smtplib.SMTP_SSL,
            587: smtplib.SMTP,
        }.get(self.settings.port, smtplib.SMTP)
        server = _method(self.settings.server, self.settings.port)
        if self.settings.port == 587:
            server.starttls()
        # Only authenticate when credentials are actually configured. The
        # DKRZ relay accepts unauthenticated mail on 25, and mailpit on
        # 1025 rejects AUTH outright, so an unconditional login breaks
        # both local development and the in-house relay.
        if self.settings.username and self.settings.password:
            server.login(self.settings.username, self.settings.password)
        return cast(smtplib.SMTP, server)

    def send_verification_email(
        self,
        to_email: str,
        token: str,
        language: str = "de",
        unsubscribe_token: Optional[str] = None,
    ) -> bool:
        """Send double opt-in verification email.

        Args:
            to_email: Recipient email address
            token: Verification token
            language: Email language (de, en, es)
            unsubscribe_token: Token for unsubscribe link

        Returns:
            True if sent successfully
        """
        if not self.enabled:
            logger.info(f"Email disabled - would send verification to {to_email}")
            return True

        verify_url = f"{self.settings.api}/api/newsletter/verify/{token}"

        if unsubscribe_token:
            unsubscribe_url = (
                f"{self.settings.base_url}/newsletter/"
                f"?action=unsubscribe&token={unsubscribe_token}&lang={language}"
            )
        else:
            unsubscribe_url = (
                f"{self.settings.base_url}/newsletter/"
                f"?action=unsubscribe&lang={language}"
            )

        content = self._get_verification_template(
            language=language,
            verify_url=verify_url,
            unsubscribe_url=unsubscribe_url,
        )

        subject = {
            "de": "Bitte bestätige deine Newsletter-Anmeldung",
            "en": "Please confirm your newsletter subscription",
            "es": "Por favor confirma tu suscripción al boletín",
        }.get(language, "Please confirm your newsletter subscription")

        return self._send_email(
            to_email,
            subject,
            content,
            unsubscribe_url=self._one_click_url(unsubscribe_token),
        )

    def send_welcome_email(
        self,
        to_email: str,
        language: str = "de",
        unsubscribe_token: Optional[str] = None,
    ) -> bool:
        """Send welcome email after successful verification.

        Args:
            to_email: Recipient email address
            language: Email language (de, en, es)
            unsubscribe_token: Token for unsubscribe link

        Returns:
            True if sent successfully
        """
        if not self.enabled:
            logger.info(f"Email disabled - would send welcome to {to_email}")
            return True

        if unsubscribe_token:
            unsubscribe_url = (
                f"{self.settings.base_url}/newsletter/"
                f"?action=unsubscribe&token={unsubscribe_token}&lang={language}"
            )
        else:
            unsubscribe_url = (
                f"{self.settings.base_url}/newsletter/"
                f"?action=unsubscribe&lang={language}"
            )

        content = self._get_welcome_template(
            language=language,
            unsubscribe_url=unsubscribe_url,
        )

        subject = {
            "de": "Willkommen beim Waterpark-Newsletter",
            "en": "Welcome to the Waterpark newsletter",
            "es": "Bienvenido al boletín de Waterpark",
        }.get(language, "Welcome to the Waterpark newsletter")

        return self._send_email(
            to_email,
            subject,
            content,
            unsubscribe_url=self._one_click_url(unsubscribe_token),
        )

    @staticmethod
    def _to_plain_text(html_content: str) -> str:
        """Crude HTML to text conversion for the plain alternative part."""
        text = re.sub(r"(?is)<(script|style|head)[^>]*>.*?</\1>", "", html_content)
        text = re.sub(r"(?i)<br\s*/?>|</p>|</div>|</h[1-6]>", "\n", text)
        text = re.sub(r"<[^>]+>", "", text)
        text = html_unescape(text)
        text = re.sub(r"[ \t]+", " ", text)
        return re.sub(r"\n{3,}", "\n\n", text).strip()

    def _send_email(
        self,
        to_email: str,
        subject: str,
        html_content: str,
        unsubscribe_url: Optional[str] = None,
    ) -> bool:
        """Send an email.

        Args:
            to_email: Recipient email address
            subject: Email subject
            html_content: HTML email body
            unsubscribe_url: One-click unsubscribe endpoint, advertised in
                the List-Unsubscribe headers

        Returns:
            True if sent successfully
        """
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"{self.settings.from_name} <{self.settings.from_email}>"
        msg["To"] = to_email

        # RFC 2369 / RFC 8058. Large providers and most institutional relays
        # score bulk mail without these headers as spam, and the one-click
        # form is what puts an "Unsubscribe" affordance in the client UI
        # instead of leaving people to hit "report as junk" instead.
        if unsubscribe_url:
            msg["List-Unsubscribe"] = (
                f"<{unsubscribe_url}>, <mailto:{self.settings.from_email}"
                "?subject=unsubscribe>"
            )
            msg["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click"

        # Order matters: the last part is the one clients prefer, so the
        # plain text alternative has to come first.
        msg.attach(MIMEText(self._to_plain_text(html_content), "plain", "utf-8"))
        msg.attach(MIMEText(html_content, "html", "utf-8"))
        try:
            server = self._get_server()
            server.sendmail(self.settings.from_email, to_email, msg.as_string())
            server.quit()
            logger.info(f"Email sent to {to_email}: {subject}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {e}")
            return False

    def _get_verification_template(
        self,
        language: str,
        verify_url: str,
        unsubscribe_url: str,
    ) -> str:
        """Generate verification email HTML template."""
        translations = {
            "de": {
                "preheader": "Bitte bestätige deine E-Mail-Adresse",
                "greeting": "Hallo!",
                "intro": "Vielen Dank für Ihr Interesse am Waterpark-Newsletter.",
                "confirm_text": (
                    "Bitte klicke auf den Button unten, um deine E-Mail-Adresse "
                    "zu bestätigen und deine Anmeldung abzuschließen."
                ),
                "button": "E-Mail bestätigen",
                "expire_notice": (
                    "Dieser Link ist 48 Stunden gültig. Falls du dich nicht "
                    "angemeldet hast, kannst du diese E-Mail ignorieren."
                ),
                "footer_text": "Du erhältst diese E-Mail, weil du dich für den "
                "Waterpark-Newsletter angemeldet haben.",
                "unsubscribe": "Abmelden",
                "click": "Link nicht klickbar? Kopiere diese URL in deinen Browser",
            },
            "en": {
                "preheader": "Please confirm your email address",
                "greeting": "Hello!",
                "intro": "Thank you for your interest in the Waterpark newsletter.",
                "confirm_text": (
                    "Please click the button below to confirm your email address "
                    "and complete your subscription."
                ),
                "button": "Confirm Email",
                "expire_notice": (
                    "This link is valid for 48 hours. If you didn't sign up, "
                    "you can safely ignore this email."
                ),
                "footer_text": "You received this email because you signed up for "
                "the Waterpark newsletter.",
                "unsubscribe": "Unsubscribe",
                "click": "Link not clickable? Copy this URL into your browser",
            },
            "es": {
                "preheader": "Por favor confirma tu dirección de correo",
                "greeting": "¡Hola!",
                "intro": "Gracias por su interés en el boletín de Waterpark.",
                "confirm_text": (
                    "Por favor haz clic en el botón de abajo para confirmar tu "
                    "dirección de correo y completar tu suscripción."
                ),
                "button": "Confirmar Correo",
                "expire_notice": (
                    "Este enlace es válido por 48 horas. Si no te registraste, "
                    "puedes ignorar este correo."
                ),
                "footer_text": "Recibiste este correo porque te suscribiste al "
                "boletín de Waterpark.",
                "unsubscribe": "Cancelar suscripción",
                "click": "¿El enlace no funciona? Copia esta URL en tu navegador",
            },
        }

        t = translations.get(language, translations["en"])

        return f"""<!DOCTYPE html>
<html lang="{language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{t["preheader"]}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body {{
      margin: 0;
      padding: 0;
      background-color: #fafbfa;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                   'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }}
    .container {{
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }}
    .card {{
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 80, 74, 0.08);
      overflow: hidden;
    }}
    .header {{
      background: linear-gradient(135deg, #00504a 0%, #00695f 100%);
      padding: 40px 40px 30px;
      text-align: center;
    }}
    .logo {{
      margin: 0 auto 16px auto;
      display: block;
      text-align: center;
    }}
    .brand {{
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }}
    .content {{
      padding: 40px;
    }}
    .greeting {{
      color: #00504a;
      font-size: 22px;
      font-weight: 600;
      margin: 0 0 16px;
    }}
    .text {{
      color: #5a6b63;
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 24px;
    }}
    .button-container {{
      text-align: center;
      margin: 32px 0;
    }}
    .button {{
      display: inline-block;
      background-color: #f9b913;
      color: #00504a !important;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      padding: 16px 40px;
      border-radius: 6px;
      transition: background-color 0.2s;
    }}
    .button:hover {{
      background-color: #e5a811;
    }}
    .notice {{
      background-color: #f5f7f6;
      border-radius: 8px;
      padding: 16px 20px;
      margin-top: 24px;
    }}
    .notice-text {{
      color: #5a6b63;
      font-size: 14px;
      line-height: 1.5;
      margin: 0;
    }}
    .divider {{
      height: 1px;
      background-color: #e8ebe9;
      margin: 32px 0;
    }}
    .footer {{
      padding: 24px 40px;
      background-color: #f5f7f6;
      text-align: center;
    }}
    .footer-text {{
      color: #8a9a91;
      font-size: 13px;
      line-height: 1.5;
      margin: 0 0 12px;
    }}
    .footer-link {{
      color: #5a6b63;
      text-decoration: underline;
      font-size: 13px;
    }}
    .url-fallback {{
      color: #8a9a91;
      font-size: 12px;
      word-break: break-all;
      margin-top: 16px;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">{_get_logo(self.settings.base_url)}</div>
        <h1 class="brand">Waterpark</h1>
      </div>

      <div class="content">
        <h2 class="greeting">{t["greeting"]}</h2>
        <p class="text">{t["intro"]}</p>
        <p class="text">{t["confirm_text"]}</p>

        <div class="button-container">
          <a href="{verify_url}" class="button">{t["button"]}</a>
        </div>

        <div class="notice">
          <p class="notice-text">{t["expire_notice"]}</p>
        </div>

        <p class="url-fallback">
          {t["click"]}:
          {verify_url}
        </p>
      </div>

      <div class="footer">
        <p class="footer-text">{t["footer_text"]}</p>
        <a href="{unsubscribe_url}" class="footer-link">{t["unsubscribe"]}</a>
      </div>
    </div>
  </div>
</body>
</html>"""

    def _get_welcome_template(
        self,
        language: str,
        unsubscribe_url: str,
    ) -> str:
        """Generate welcome email HTML template."""
        translations = {
            "de": {
                "preheader": "Deine Anmeldung wurde bestätigt",
                "greeting": "Willkommen beim Waterpark-Newsletter!",
                "intro": (
                    "Deine E-Mail-Adresse wurde erfolgreich bestätigt. "
                    "Du bist jetzt für unseren Newsletter angemeldet."
                ),
                "what_next": "Was dich erwartet:",
                "benefit1": "Neue Datensätze im Hub",
                "benefit2": "Änderungen am S3-Endpunkt und am Storage-Layout",
                "benefit3": "Alles, was bestehende Notebooks brechen könnte",
                "closing": (
                    "Wir freuen uns, dich auf dem Laufenden zu halten. "
                    "Bis bald!"
                ),
                "team": "Ihr Waterpark-Team am DKRZ",
                "footer_text": "Du erhältst diese E-Mail, weil du den "
                "Waterpark-Newsletter abonniert haben.",
                "unsubscribe": "Abmelden",
            },
            "en": {
                "preheader": "Your subscription has been confirmed",
                "greeting": "Welcome to the Waterpark newsletter!",
                "intro": (
                    "Your email address has been successfully confirmed. "
                    "You're now subscribed to our newsletter."
                ),
                "what_next": "What to expect:",
                "benefit1": "New datasets added to the hub",
                "benefit2": "Changes to the S3 endpoint and the storage layout",
                "benefit3": "Anything that would break existing notebooks",
                "closing": (
                    "We're excited to keep you updated. " "See you soon!"
                ),
                "team": "The Waterpark team at DKRZ",
                "footer_text": "You received this email because you subscribed "
                "to the Waterpark newsletter.",
                "unsubscribe": "Unsubscribe",
            },
            "es": {
                "preheader": "Tu suscripción ha sido confirmada",
                "greeting": "¡Bienvenido al boletín de Waterpark!",
                "intro": (
                    "Tu dirección de correo ha sido confirmada exitosamente. "
                    "Ahora estás suscrito a nuestro boletín."
                ),
                "what_next": "Qué puedes esperar:",
                "benefit1": "Nuevos conjuntos de datos en el hub",
                "benefit2": "Cambios en el endpoint S3 y en el almacenamiento",
                "benefit3": "Todo lo que pueda romper notebooks existentes",
                "closing": (
                    "Estamos emocionados de mantenerte informado. "
                    "¡Hasta pronto!"
                ),
                "team": "El equipo de Waterpark en DKRZ",
                "footer_text": "Recibiste este correo porque te suscribiste "
                "al boletín de Waterpark.",
                "unsubscribe": "Cancelar suscripción",
            },
        }

        t = translations.get(language, translations["en"])

        return f"""<!DOCTYPE html>
<html lang="{language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{t["preheader"]}</title>
  <style>
    body {{
      margin: 0;
      padding: 0;
      background-color: #fafbfa;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                   'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }}
    .container {{
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }}
    .card {{
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 80, 74, 0.08);
      overflow: hidden;
    }}
    .header {{
      background: linear-gradient(135deg, #00504a 0%, #00695f 100%);
      padding: 40px 40px 30px;
      text-align: center;
    }}
    .logo {{
      margin: 0 auto 16px auto;
      display: block;
      text-align: center;
    }}
    .brand {{
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }}
    .content {{
      padding: 40px;
    }}
    .greeting {{
      color: #00504a;
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 16px;
    }}
    .text {{
      color: #5a6b63;
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 24px;
    }}
    .benefits {{
      background-color: #f5f7f6;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
    }}
    .benefits-title {{
      color: #00504a;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 16px;
    }}
    .benefit {{
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
    }}
    .benefit:last-child {{
      margin-bottom: 0;
    }}
    .check {{
      color: #f9b913;
      font-size: 18px;
      margin-right: 12px;
      line-height: 1.4;
    }}
    .benefit-text {{
      color: #5a6b63;
      font-size: 15px;
      line-height: 1.4;
      margin: 0;
    }}
    .closing {{
      color: #5a6b63;
      font-size: 16px;
      line-height: 1.6;
      margin: 24px 0 8px;
    }}
    .team {{
      color: #00504a;
      font-size: 16px;
      font-weight: 600;
      margin: 0;
    }}
    .footer {{
      padding: 24px 40px;
      background-color: #f5f7f6;
      text-align: center;
    }}
    .footer-text {{
      color: #8a9a91;
      font-size: 13px;
      line-height: 1.5;
      margin: 0 0 12px;
    }}
    .footer-link {{
      color: #5a6b63;
      text-decoration: underline;
      font-size: 13px;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">{_get_logo(self.settings.base_url)}</div>
        <h1 class="brand">Waterpark</h1>
      </div>

      <div class="content">
        <h2 class="greeting">{t["greeting"]}</h2>
        <p class="text">{t["intro"]}</p>

        <div class="benefits">
          <p class="benefits-title">{t["what_next"]}</p>
          <div class="benefit">
            <span class="check">✓</span>
            <p class="benefit-text">{t["benefit1"]}</p>
          </div>
          <div class="benefit">
            <span class="check">✓</span>
            <p class="benefit-text">{t["benefit2"]}</p>
          </div>
          <div class="benefit">
            <span class="check">✓</span>
            <p class="benefit-text">{t["benefit3"]}</p>
          </div>
        </div>

        <p class="closing">{t["closing"]}</p>
        <p class="team">{t["team"]}</p>
      </div>

      <div class="footer">
        <p class="footer-text">{t["footer_text"]}</p>
        <a href="{unsubscribe_url}" class="footer-link">{t["unsubscribe"]}</a>
      </div>
    </div>
  </div>
</body>
</html>"""
