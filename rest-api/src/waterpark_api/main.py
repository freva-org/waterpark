"""Route registration for the Waterpark backend.

This service is an API only. The landing page and all documentation are
static output from mkdocs-material, served directly by nginx from the
gh-pages checkout; see nginx-api-snippet.conf. Keeping the two apart means
uvicorn never has to be restarted for a docs change, and the docs never
need the API to be up.
"""

from .announcements import router as announce_router
from .app import app
from .db import db_router

app.include_router(db_router)
app.include_router(announce_router)


@app.get("/api/health", tags=["ops"])
async def health() -> dict[str, str]:
    """Liveness probe for the reverse proxy and for monitoring."""
    return {"status": "ok"}
