"""Setup of the Waterpark backend app."""

import os
from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import __version__
from .config import get_logger, get_settings
from .db.dependencies import db_lifespan, db_shutdown

logger = get_logger()
server_settings = get_settings(
    config_path=os.getenv("CONFIG_PATH"),
    debug=bool(int(os.getenv("DEBUG", "0"))),
)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Start and end things before and after shutdown.

    Things before yield are executed on startup. Things after on teardown.
    """
    logger.info("Starting Waterpark backend app...")
    try:
        await db_lifespan(server_settings)
        yield
    finally:
        await db_shutdown()


app = FastAPI(
    debug=server_settings.debug,
    title="Waterpark RestAPI",
    version=__version__,
    description=__doc__,
    openapi_url=("/api/help/openapi.json" if server_settings.debug else None),
    docs_url="/api/help" if server_settings.debug else None,
    openapi_tags=None,
    lifespan=lifespan,
    contact={"name": "Waterpark", "email": "waterpark@support.dkrz.de"},
)

# In production nginx serves the static site and proxies /api/ on the same
# origin, so no CORS headers are needed and `cors_origins` stays empty.
# Local development runs `mkdocs serve` on :8000 and uvicorn on :8080, which
# are different origins, hence this escape hatch.
if server_settings.cors_origins:
    logger.warning(
        "CORS enabled for: %s", ", ".join(server_settings.cors_origins)
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=list(server_settings.cors_origins),
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type"],
    )
