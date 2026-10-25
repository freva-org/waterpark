from litestar import Litestar
from litestar.openapi import OpenAPIConfig
from litestar.openapi.plugins import SwaggerRenderPlugin
from litestar.openapi.spec import Components, SecurityScheme
from remapweights import check_config, drain, router

app = Litestar(
    route_handlers=[router],
    on_startup=[check_config],
    on_shutdown=[drain],
    openapi_config=OpenAPIConfig(
        title="Waterpark API",
        version="1",
        path="/api/v1/docs",
        render_plugins=[SwaggerRenderPlugin(path="/")],
        use_handler_docstrings=True,
        components=Components(
            security_schemes={
                "bearer": SecurityScheme(
                    type="http", scheme="bearer", bearer_format="JWT"
                )
            }
        ),
    ),
)
