var j="application/vnd.freva.notice+json";var le=6,Te=["image/png","text/plain"],ln=[...Te,"text/html","image/svg+xml",j],dn=24*1024*1024,it=18*1024*1024,hn=256*1024,cn=1024*1024,un=4*1024*1024,pn=16*1024,xe=24*1024*1024,fn=256*1024,de=2*1024*1024,he=64*1024*1024,mn=["base64","utf8"];function _n(t){return typeof t=="string"&&Te.includes(t)}function yn(t){return typeof t=="string"&&ln.includes(t)}function gn(t){return typeof t=="string"&&mn.includes(t)}function wn(t){let e=t.length;if(e%4!==0)return!1;let n=e;if(e>0&&(t.charCodeAt(e-1)===61&&(n-=1),n>0&&t.charCodeAt(n-1)===61&&(n-=1),e-n===2&&n%4!==2||e-n===1&&n%4!==3))return!1;for(let r=0;r<n;r+=1){let a=t.charCodeAt(r);if(!(a>=65&&a<=90||a>=97&&a<=122||a>=48&&a<=57)&&a!==43&&a!==47)return!1}return!0}function Ne(t){if(!t||typeof t!="object")return{ok:!1,error:"not an object"};let e=t;if(!_n(e.mime))return{ok:!1,error:`unsupported mime ${String(e.mime)}`};if(!gn(e.encoding))return{ok:!1,error:`unsupported encoding ${String(e.encoding)}`};if(typeof e.data!="string")return{ok:!1,error:"data must be a string"};let n=Se(e.mime,e.data,e.encoding);if(n)return{ok:!1,error:n};let r={mime:e.mime,encoding:e.encoding,data:e.data},a=e.metadata;if(a&&typeof a=="object"){let s=a,i={};typeof s.figure=="number"&&(i.figure=s.figure),typeof s.width=="number"&&(i.width=s.width),typeof s.height=="number"&&(i.height=s.height),Object.keys(i).length>0&&(r.metadata=i)}return{ok:!0,value:r}}var bn={"text/plain":hn,"text/html":cn,"image/svg+xml":un,[j]:pn};function kn(t){return bn[t]??dn}var V=t=>`${(t/1048576).toFixed(1)} MiB`;function Se(t,e,n){let r=kn(t);return e.length>r?`${t} payload is ${V(e.length)}, over the ${V(r)} limit for one display. Reduce the figure size or dpi, or save it to a file in /workspace and download it instead.`:t==="image/png"?n!=="base64"?"image/png must be base64":wn(e)?null:"data is not valid base64":n!=="utf8"?`${t} must be utf8`:null}function Ae(t){let e=t??{};if(!e.data||typeof e.data!="object")return{ok:!1,error:"data must be an object"};let n={},r={},a=0;for(let[s,i]of Object.entries(e.data)){let h=yn(s)?typeof i!="string"?`${s} must be a string`:Se(s,i,s==="image/png"?"base64":"utf8"):`unsupported mime ${s}`;if(h)return{ok:!1,error:h};a+=(n[s]=i).length;let l=e.metadata?.[s]??{},c=Object.fromEntries(["width","height"].map(f=>[f,l[f]]).filter(([,f])=>typeof f=="number"&&f>0&&f<=1e5));Object.keys(c).length>0&&(r[s]=c)}return typeof n["text/plain"]!="string"?{ok:!1,error:"text/plain is missing"}:a>xe?{ok:!1,error:`one output is ${V(a)}, over the ${V(xe)} limit`}:{ok:!0,value:{data:n,metadata:r}}}function q(t){let e=[],n=0;for(let r of t){let a=String(r);if(n+a.length>fn){e.push(`[browser-python] traceback truncated: ${t.length-e.length} lines omitted`);break}n+=a.length+1,e.push(a)}return e}var En={runtime:{portalKey:"pythonPlayground.runtimeIndexUrl",apiKey:"pyodide.indexURL",prepare:"freva-browser-python prepare-runtime"},"profile-package":{portalKey:"pythonPlayground.runtimeIndexUrl",apiKey:"pyodide.indexURL",prepare:"freva-browser-python prepare-runtime --full"},wheelhouse:{portalKey:"pythonPlayground.wheelhouseUrl",apiKey:"wheelhouseURL",prepare:"freva-browser-python prepare-freva-wheelhouse"},addon:{portalKey:"pythonPlayground.addonBaseUrl",apiKey:"addonBaseURL",prepare:"freva-browser-python prepare-addons"},"site-wheel":{portalKey:"the site's own wheel list",apiKey:"siteWheels",prepare:"the site's own preparation step, which records each wheel's SHA-256"}};function x(t){let n=(t instanceof Error?t.message:typeof t=="string"?t:String(t??"")).split(`
`);for(let r=n.length-1;r>=0;r-=1){let a=(n[r]??"").trim();if(a!=="")return a}}function ce(t){return t.kind==="unreachable"}function C(t){let e=En[t.resource],n=t.resource==="addon"?`The '${t.addon}' add-on${t.optional?" (optional)":""}`:t.resource==="wheelhouse"?"The Freva client's wheels":t.resource==="site-wheel"?"A wheel this site pins":t.resource==="runtime"?"The Python runtime":"A package this profile needs",r=t.artefact?`${n}: ${t.artefact}`:n,a=[];switch(t.kind){case"unavailable":a.push(`${r} is not available at ${t.url} (HTTP ${t.status}).`);break;case"unreachable":a.push(`${r} could not be fetched from ${t.url}.`);break;case"mismatch":a.push(`${r} is not the artefact this build pinned.`),t.digests&&(a.push(`  expected sha256 ${t.digests.expected}`),a.push(`  received sha256 ${t.digests.received}`)),a.push(`Nothing from ${t.url} has been installed.`);break;case"install":a.push(`${r} was fetched and verified, and could not be installed.`);break;case"unsupported":a.push(r);break}return t.underlying&&a.push(`Underlying error: ${t.underlying}`),t.kind!=="unsupported"&&(a.push(`These are static files this deployment serves; ${e.portalKey} (${e.apiKey} in the API) selects where from, and they are created with \`${e.prepare}\`.`),t.url&&a.push(`Expected to be served at: ${t.url}`),a.push(ce(t)?"This looks like a network or CORS failure rather than a missing file, so a restart may help.":"Restarting requests the same URL and gets the same answer; this needs the deployment fixed, not another attempt.")),a.join(`
`)}function B(t){if(t.length===0)return"";if(t.length===1)return C(t[0]);let e=t.map((n,r)=>`${r+1}. ${C(n)}`);return[`${t.length} things this interpreter needs could not be prepared:`,"",...e].join(`
`)}var Re=["cartopy-natural-earth-110m","dask"],Oe=["cartopy-natural-earth-110m"],K={dask:{title:"Dask arrays, on one synchronous scheduler",profiles:["xarray-zarr","freva-client"],runtimePackages:["toolz","cloudpickle","click","packaging","pyyaml","fsspec"],wheels:[{name:"locket",version:"1.0.0",file:"locket-1.0.0-py2.py3-none-any.whl",sha256:"b6c819a722f7b6bd955b80781788e4a66a55628b858d347536b7e81325a3a5e3",bytes:4398,url:"https://files.pythonhosted.org/packages/db/bc/83e112abc66cd466c6b83f99118035867cecd41802f8d044638aa78a106e/locket-1.0.0-py2.py3-none-any.whl"},{name:"partd",version:"1.4.2",file:"partd-1.4.2-py3-none-any.whl",sha256:"978e4ac767ec4ba5b86c6eaa52e5a2a3bc748a2ca839e8cc798f1cc6ce6efb0f",bytes:18905,url:"https://files.pythonhosted.org/packages/71/e7/40fb618334dcdf7c5a316c0e7343c5cd82d3d866edc100d98e29bc945ecd/partd-1.4.2-py3-none-any.whl"},{name:"dask",version:"2026.8.0",file:"dask-2026.8.0-py3-none-any.whl",sha256:"ccc0c83a189b0398602435189771d28dad7b5773b6089bb8dce14ae732dd782c",bytes:1492182,url:"https://files.pythonhosted.org/packages/f8/3a/4fc99e788bcfa1b3b3f21abf57da45898d807d007e7f6fd1c7300904eb70/dask-2026.8.0-py3-none-any.whl"}],data:[],reports:["dask"],note:"Dask is NOT in Pyodide 314.0.6's package index, but it publishes a pure-Python wheel and so do its two missing dependencies. `click`, `cloudpickle`, `fsspec`, `packaging`, `pyyaml` and `toolz` come from the pinned runtime's own lock and are loaded with `loadPackage`; only `dask`, `partd` and `locket` are mirrored. `tlz`, which `dask.utils` imports, ships inside the `toolz` wheel. Every install is `micropip.install(url, deps=False)` against an explicit URL, so resolution never reaches PyPI."},"cartopy-natural-earth-110m":{title:"Cartopy coastlines and country borders, offline",profiles:["minimal","xarray-zarr","freva-client"],runtimePackages:[],wheels:[],data:[{path:"shapefiles/natural_earth/physical/ne_110m_coastline.shp",sha256:"a1f8285d0e0a4858392cd78fc74fa3ee4cd9088947cf6e3693729dc852d70b60",bytes:89652,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/110m_physical/ne_110m_coastline.shp"},{path:"shapefiles/natural_earth/physical/ne_110m_coastline.shx",sha256:"53d8c141edfb7e05c59feecc7bb64b0e22bc2e282dfa1024d20ae54c3ef7b01e",bytes:1172,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/110m_physical/ne_110m_coastline.shx"},{path:"shapefiles/natural_earth/physical/ne_110m_coastline.dbf",sha256:"ac7e59083a862bafc20b86d73595fdf2a7c0693a411cf3ba91910a5de9df9bc3",bytes:3747,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/110m_physical/ne_110m_coastline.dbf"},{path:"shapefiles/natural_earth/physical/ne_110m_coastline.prj",sha256:"3259f0e55290a82b1350646f604e8a7ee1e2136c0320a40fad838ab40819fff8",bytes:147,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/110m_physical/ne_110m_coastline.prj"},{path:"shapefiles/natural_earth/physical/ne_110m_coastline.cpg",sha256:"3ad3031f5503a4404af825262ee8232cc04d4ea6683d42c5dd0a2f2a27ac9824",bytes:5,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/110m_physical/ne_110m_coastline.cpg"},{path:"shapefiles/natural_earth/cultural/ne_110m_admin_0_boundary_lines_land.shp",sha256:"d19f784f92626816c064f878571f61bc43ec7bfc407666ce6a450d6e757afff0",bytes:68372,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/110m_cultural/ne_110m_admin_0_boundary_lines_land.shp"},{path:"shapefiles/natural_earth/cultural/ne_110m_admin_0_boundary_lines_land.shx",sha256:"849899c47c51c6edd04750307b21cb109ae4c7e8ca3c5fee8606f8646dbe2787",bytes:2748,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/110m_cultural/ne_110m_admin_0_boundary_lines_land.shx"},{path:"shapefiles/natural_earth/cultural/ne_110m_admin_0_boundary_lines_land.dbf",sha256:"373d7a150b9f8dcb6ec918b52eea0f0361ad40ef433602a1b9f59b4de668daec",bytes:483250,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/110m_cultural/ne_110m_admin_0_boundary_lines_land.dbf"},{path:"shapefiles/natural_earth/cultural/ne_110m_admin_0_boundary_lines_land.prj",sha256:"3259f0e55290a82b1350646f604e8a7ee1e2136c0320a40fad838ab40819fff8",bytes:147,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/110m_cultural/ne_110m_admin_0_boundary_lines_land.prj"},{path:"shapefiles/natural_earth/cultural/ne_110m_admin_0_boundary_lines_land.cpg",sha256:"3ad3031f5503a4404af825262ee8232cc04d4ea6683d42c5dd0a2f2a27ac9824",bytes:5,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/110m_cultural/ne_110m_admin_0_boundary_lines_land.cpg"},{path:"LICENSE.md",sha256:"2631b5b39b6d1acc56de75235109b5af2dbb4b0ac5a127b6f06185977247fd4b",bytes:4636,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/LICENSE.md"},{path:"VERSION",sha256:"0c9a9d43610d66f4cc3f42da08cae044483de25894a9daf9dc6a76ff75ca9327",bytes:6,url:"https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/VERSION"}],reports:[],dataset:{name:"Natural Earth vector",release:"5.1.2",tag:"v5.1.2",source:"https://github.com/nvkelso/natural-earth-vector",home:"https://www.naturalearthdata.com/",licence:"Public domain - see https://www.naturalearthdata.com/about/terms-of-use/ and the LICENSE.md staged beside the data.",attribution:"Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com."},note:"Cartopy 0.25.0 IS in the pinned runtime's lock, with shapely, pyshp, pyproj, matplotlib and scipy; it is loaded lazily on import like any other. What is missing is only the data, which Cartopy otherwise fetches through `urllib` at figure-render time - and there is no socket in a Worker. These are the two 110m feature sets `ax.coastlines()` and `feature.BORDERS` ask for, staged under Cartopy's own layout and pointed at with CARTOPY_DATA_DIR, which is read at import and needs no Cartopy import to set."}};function H(t){return Oe.includes(t)}var ue=Re,mt=Object.freeze(Object.fromEntries(ue.map(t=>{let e=K[t];return[t,Object.freeze({id:t,title:e.title,profiles:e.profiles,optionalCapable:H(t),...e.dataset?{dataset:Object.freeze({name:e.dataset.name,release:e.dataset.release,source:e.dataset.source,home:e.dataset.home,licence:e.dataset.licence,attribution:e.dataset.attribution})}:{}})]})));var vn=`"""Everything the worker calls into Python for. One module, one name in the user's namespace.

Why a module and not a handful of globals
-----------------------------------------
The worker holds ONE PyProxy - this module - for as long as the interpreter lives, and reaches
every helper through it. That is the whole proxy-ownership strategy, and it is deliberate.

The failure it is designed out of: pulling a callable off \`\`pyodide.console\`\` and keeping it after
destroying the module proxy it came from. Pyodide's docs prescribe \`\`.copy()\`\` for a borrowed proxy
that must outlive its parent, which works - but it leaves a lifetime rule that a later edit has to
remember. Retaining exactly one long-lived parent and creating no long-lived children removes the
rule instead of documenting it: there is nothing here whose parent can be destroyed early, because
the only parent is the module and it lives as long as the worker does.

Everything returned to JavaScript is a PRIMITIVE or a list/tuple/dict of primitives. No PyProxy ever
crosses the boundary, so the worker has nothing of Python's to destroy on the happy path and cannot
leak one on the unhappy path. The single exception is the \`\`ConsoleFuture\`\` from \`\`push()\`\`, which
the worker must hold briefly and hands straight back to \`\`run_future\`\` - see \`\`console_push\`\`.
"""

from __future__ import annotations

import ast as _ast
import asyncio as _asyncio
import inspect as _inspect
import sys as _sys
import contextlib as _contextlib
import traceback as _traceback


_ALLOW_TOP_LEVEL_AWAIT = _ast.PyCF_ALLOW_TOP_LEVEL_AWAIT

if "/freva" not in _sys.path:
    _sys.path.insert(0, "/freva")

import rich_display as _rich_display



_console = None
























_running_task = None














_INTERRUPTED = object()
_interrupt_report = ""





_interrupt_requested = False




_USER_FILES = frozenset({"<console>", "<snippet>", "<exec>"})


def _is_user_file(name):
    """The fixed names above, or a notebook cell's own \`\`<cell-\u2026>\`\` filename."""
    return name in _USER_FILES or name.startswith("<cell-")


def _user_frames(tb):
    """Advance a traceback to the first frame that is the visitor's.

    A cancellation is raised at the innermost \`\`await\`\` inside their code, so their frames are
    already in the traceback - underneath this module's, and underneath \`pyodide.console\`'s own two
    or three. Printed whole it opens on \`console.py\`, which is not where anything happened and not
    what CPython shows for a Ctrl+C; the console's \`formattraceback\` performs the same trim for an
    exception it handles itself, keyed on the same filenames.

    Falls back to the WHOLE traceback if no such frame is found. A cancellation that arrived before
    the visitor's code began has nothing of theirs in it, and showing the real frames is better than
    showing none.
    """
    frames = tb
    while frames is not None and not _is_user_file(frames.tb_frame.f_code.co_filename):
        frames = frames.tb_next
    return frames if frames is not None else tb


def _format_interrupt(tb):
    """The traceback Python prints for a Ctrl+C, over the visitor's own frames.

    Built here rather than left to \`Console.formattraceback\` because the exception never reaches
    the console as an exception - it cannot, without killing the event loop - so there is nothing
    for the console to format.
    """
    interrupt = KeyboardInterrupt()
    frames = _user_frames(tb)
    return "".join(_traceback.format_exception(type(interrupt), interrupt, frames))


def interrupt():
    """Ask whatever is running to stop. Returns whether there was anything to ask.

    Called from JavaScript OUTSIDE the worker's request queue, which is the whole point: the queue
    is serialised behind the very execution this is trying to end, so an interrupt that waited its
    turn would arrive after the thing it was meant to interrupt had finished.

    Reentrancy is not a hazard here even though it enters Python while Python is mid-execution:
    there is no \`await\` in this function, so it runs to completion before the event loop turns
    again, and \`Task.cancel()\` only records a request - the \`CancelledError\` is delivered later, by
    the loop, at a suspension point.
    """
    global _interrupt_requested
    if _interrupt_requested:





        return True
    task = _running_task
    if task is None or task.done():
        return False
    _interrupt_requested = True
    task.cancel()
    return True












_jspi = True



_NO_STACK_SWITCHING = "WebAssembly stack switching not supported in this JavaScript runtime"





REMOTE_DATA_NEEDS_JSPI = (
    "RuntimeError: This browser can't open remote datasets. Your code is fine: reading data over "
    "the network needs WebAssembly JSPI (stack switching), which this browser does not provide "
    "yet.\\n"
    "Still works here: local Python, NumPy/xarray on local data and /workspace files.\\n"
    "To fix it, update the browser or open this page in one that has JSPI: Safari 27 "
    "(https://webkit.org/blog/18325/webkit-features-for-safari-27-0/), Chrome or Edge 137, "
    "Firefox 153 or Opera 121, or later.\\n"
)


def needs_jspi_text():
    """The report for a remote read without JSPI, so the worker can recognise it."""
    return REMOTE_DATA_NEEDS_JSPI


def set_jspi(available):
    """Record whether this worker can stack switch. Called once, by the worker, at startup."""
    global _jspi
    _jspi = bool(available)
    if not _jspi:
        _quiet_run_sync()
    return _jspi


def _quiet_run_sync():
    """Without JSPI, let \`\`run_sync\`\` refuse WITHOUT a second, misleading warning.

    Pyodide's \`\`run_sync\`\` refuses before it has touched the coroutine it was handed, so the
    coroutine is garbage-collected unawaited and Python adds "RuntimeWarning: coroutine ... was
    never awaited" above the real error - a line about the caller's code, when nothing is wrong
    with it. Closing the coroutine on exactly that refusal removes the noise; the RuntimeError
    raised is the same object, and every other outcome is untouched. Installed once, before any
    user code runs; a module that bound \`\`run_sync\`\` earlier keeps the original, which differs only
    by that warning.
    """
    import pyodide.ffi as ffi

    original = ffi.run_sync
    if getattr(original, "_freva_browser_patch", False):
        return

    def run_sync(awaitable):
        try:
            return original(awaitable)
        except RuntimeError as exc:
            if _NO_STACK_SWITCHING in str(exc) and _inspect.iscoroutine(awaitable):
                awaitable.close()
            raise

    run_sync.__doc__ = original.__doc__
    run_sync.__wrapped__ = original
    run_sync._freva_browser_patch = True
    ffi.run_sync = run_sync


    try:
        import pyodide.webloop as webloop

        if getattr(webloop, "run_sync", None) is original:
            webloop.run_sync = run_sync
    except Exception:
        pass


def _mentions_no_stack_switching(exc):
    try:
        return _NO_STACK_SWITCHING in str(exc)
    except Exception:
        return False


def _needs_jspi(exc):
    """True when \`\`exc\`\` failed ONLY because this runtime cannot stack switch.

    Never true where JSPI is present: there the same family of messages ("the Python entrypoint
    was a synchronous function") is a real bug and keeps its full traceback. Otherwise:

    * the exception itself carries Pyodide's refusal, or a member of an exception group does;
    * or it is a LIBRARY's own exception type (zarr, xarray, fsspec wrap what they catch) whose
      cause/context chain carries it. A BUILTIN exception raised from the refusal - typically the
      visitor's own \`\`raise ValueError(...) from exc\`\` - is not rewritten: its traceback is theirs.

    Called inside the REPL's exception handlers, so it never raises.
    """
    if _jspi:
        return False
    try:
        if _mentions_no_stack_switching(exc):
            return True
        for member in getattr(exc, "exceptions", None) or ():
            if _needs_jspi(member):
                return True
        if type(exc).__module__ == "builtins":
            return False
        seen = {id(exc)}
        current = exc.__cause__ or exc.__context__
        while current is not None and id(current) not in seen:
            seen.add(id(current))
            if _mentions_no_stack_switching(current):
                return True
            current = current.__cause__ or current.__context__
    except Exception:
        return False
    return False


def _report(exc, formatted):
    """The text a failed execution shows: the fixed sentence for a remote read without JSPI, the
    real traceback for everything else."""
    if exc is not None and _needs_jspi(exc):
        return REMOTE_DATA_NEEDS_JSPI
    return formatted




REPR_LIMIT = 4000


def make_console(stdout_callback, stderr_callback):
    """Build the interactive console over the interpreter's own \`\`__main__\`\` namespace.

    The namespace is \`\`__main__\`\`'s dict rather than a fresh one, so \`\`pyodide.runPython\`\` from the
    worker and a line typed at the prompt see the same variables. A console with its own private
    globals would make \`run()\` and \`push()\` two different interpreters wearing one name.

    Note the signature: \`\`stdout_callback\`\` / \`\`stderr_callback\`\` are KEYWORD-only in this Pyodide,
    and there is no \`\`toPy\`\`-ed options dict. An older three-positional-argument form appears in a
    lot of copied examples and raises \`\`TypeError\`\` here.
    """
    global _console
    from pyodide.console import PyodideConsole

    class _InterruptibleConsole(PyodideConsole):
        """\`\`PyodideConsole\`\`, plus a handle on the task that is running the visitor's line.

        \`runcode\` is overridden rather than \`runsource\` or \`_runcode_with_lock\`, and the choice is
        deliberate in both directions. \`runsource\` is where the task is CREATED - it does
        \`\`ensure_future(...).add_done_callback(done_cb)\`\` and hands back a separate, plain
        \`\`ConsoleFuture\`\` - so cancelling what it returns would cancel a future nobody is running:
        the real task would carry on, and \`done_cb\` would then call \`set_exception\` on a future it
        had already cancelled. \`_runcode_with_lock\` is private and one Pyodide release from being
        renamed. \`runcode\` is documented API, it runs INSIDE the task, and \`current_task()\` there is
        exactly the task to cancel - no snapshot of \`all_tasks()\`, no guessing.

        The cancellation is also caught here rather than being allowed out, and that is not tidiness.
        \`\`done_cb\`\` in \`runsource\` opens with \`\`fut.exception()\`\`, which RAISES on a cancelled task:
        the callback would die, the \`ConsoleFuture\` would never be settled, and the console would
        hang on a line the visitor had just asked to abandon. So the task finishes with an ordinary
        exception - \`KeyboardInterrupt\`, which is what Python calls this - and every path downstream
        stays the path an exception already takes.
        """

        async def runcode(self, source, code):
            global _running_task
            _running_task = _asyncio.current_task()
            try:
                return await super().runcode(source, code)
            except _asyncio.CancelledError as cancelled:
                if not _interrupt_requested:
                    raise


                global _interrupt_report
                _interrupt_report = _format_interrupt(cancelled.__traceback__)
                return _INTERRUPTED
            finally:
                _running_task = None

    _rich_display.install_builtins()
    main = _sys.modules["__main__"].__dict__
    _console = _InterruptibleConsole(
        main,
        stdout_callback=stdout_callback,
        stderr_callback=stderr_callback,
    )
    return True


def console_push(line):
    """Feed one line to the console and report only what JavaScript can hold.

    Returns \`\`(syntax, error_text, future_or_None)\`\`. The future is the ONE Python object that
    crosses to JavaScript, and only when there is something to await; for an incomplete line or a
    syntax error it is \`\`None\`\`, so the common typing case transfers no proxy at all.
    """
    future = _console.push(line)
    syntax = future.syntax_check
    if syntax == "syntax-error":


        text = future.formatted_error or ""
        return (syntax, text, None)
    if syntax == "incomplete":
        return (syntax, "", None)
    return (syntax, "", future)


async def run_future(future):
    """Await a \`\`ConsoleFuture\`\` and reduce it to primitives.

    The awaiting happens in PYTHON rather than in JavaScript, which is the point. The JavaScript
    pattern - await the future proxy, unwrap the value, test whether it is itself a proxy, destroy
    it, destroy the future, destroy the wrapper - has five ownership decisions in it and gets one
    of them wrong under an exception. Here the value never leaves Python: it is repr'd in place and
    what crosses the boundary is a string.
    """
    global _interrupt_requested
    interrupted = False
    try:
        result = await future
    except BaseException as exc:
        formatted = getattr(future, "formatted_error", None) or _traceback.format_exc()
        return (False, "", _report(exc, formatted))
    finally:




        interrupted = _interrupt_requested
        _interrupt_requested = False

    if result is _INTERRUPTED:



        return (False, "", _interrupt_report)
    if interrupted and result is None:



        return (False, "", "KeyboardInterrupt\\n")

    if result is None:


        return (False, "", None)

    try:
        from pyodide.console import repr_shorten

        text = repr_shorten(result, limit=REPR_LIMIT)
    except Exception:
        text = "<unrepresentable %s>" % type(result).__name__
    return (True, text, None)


@_contextlib.contextmanager
def _no_redirection():
    """What \`run()\` gets before a console exists: the interpreter's own streams, untouched."""
    yield


def _stream_redirection():
    """The console's stdout/stderr for the duration of a snippet, when there is a console.

    \`run()\` and \`push()\` are two entry points to ONE interpreter and their output has to look the
    same. The console owns the callbacks the worker forwards; borrowing its redirection is what
    makes \`run()\` emit the same bytes, in the same order, attributed the same way.
    """
    if _console is None:
        return _no_redirection()
    return _console.redirect_streams()


async def run_source(source):
    """Execute a whole snippet, as if it were a file. Returns \`\`(has_value, text, error)\`\`.

    Separate from the console on purpose: this must NOT touch the console's line buffer, so a host
    that runs a snippet while the user is halfway through typing a \`\`for\`\` loop does not eat their
    continuation.

    \`\`PyCF_ALLOW_TOP_LEVEL_AWAIT\`\` is not optional here, and a plain \`\`compile(..., "exec")\`\` was
    the first version of this function. It made \`\`push("await ...")\`\` work and \`\`run("await ...")\`\`
    fail with \`\`SyntaxError: 'await' outside function\`\` - two entry points to one interpreter
    disagreeing about what Python is, which is exactly the kind of seam a consumer discovers at the
    worst moment. With the flag, an exec-mode code object containing a top-level await EVALUATES to
    a coroutine instead of running to completion, so it has to be awaited rather than discarded;
    \`\`eval\`\` is used rather than \`\`exec\`\` only because \`\`exec\`\` throws that coroutine away.
    """
    global _running_task, _interrupt_requested
    main = _sys.modules["__main__"].__dict__
    try:
        code = compile(source, "<snippet>", "exec", flags=_ALLOW_TOP_LEVEL_AWAIT)
    except SyntaxError:
        return (False, "", _traceback.format_exc())




    _running_task = _asyncio.current_task()
    try:








        with _stream_redirection():
            returned = eval(code, main)
            if returned is not None and _inspect.isawaitable(returned):
                await returned
    except _asyncio.CancelledError as cancelled:
        if not _interrupt_requested:



            raise
        return (False, "", _format_interrupt(cancelled.__traceback__))
    except BaseException as exc:
        return (False, "", _report(exc, _traceback.format_exc()))
    finally:
        _running_task = None
        _interrupt_requested = False
    return (False, "", None)


def set_publisher(callback):
    """Where \`display()\`, \`clear_output()\` and a cell's result go: one JSON string per message."""
    _rich_display.set_publisher(callback)
    return True


def _cell_traceback(exc):
    """Jupyter's \`\`traceback\`\`: the lines Python prints, from the cell's own first frame."""
    frames = exc.__traceback__
    while frames is not None and not _is_user_file(frames.tb_frame.f_code.co_filename):
        frames = frames.tb_next
    if frames is None or isinstance(exc, SyntaxError):
        text = "".join(_traceback.format_exception_only(type(exc), exc))
    else:
        text = "".join(_traceback.format_exception(type(exc), exc, frames))
    return text.rstrip("\\n").split("\\n")


def _flush_figures():
    try:
        _rich_display.flush_figures()
    except Exception as exc:
        _sys.stderr.write("[display] figures could not be drawn: %s\\n" % exc)


async def run_cell(source, filename, count, silent):
    """One notebook cell: CPython semantics, the last expression's value as \`execute_result\`.

    Returns \`\`(status, ename, evalue, traceback, notice)\`\`; output, figures and the result have
    already been published by then, in order.
    """
    global _running_task, _interrupt_requested
    from pyodide.code import eval_code_async

    main = _sys.modules["__main__"].__dict__
    _running_task = _asyncio.current_task()
    _rich_display.begin_cell()
    try:
        with _stream_redirection():
            try:
                value = await eval_code_async(
                    source,
                    main,
                    return_mode="last_expr",
                    quiet_trailing_semicolon=True,
                    filename=filename,
                )
                if value is not None and not silent:
                    _rich_display.publish_result(value, count)
            finally:
                _flush_figures()
    except _asyncio.CancelledError as cancelled:
        if not _interrupt_requested:
            raise
        text = _format_interrupt(cancelled.__traceback__).rstrip("\\n").split("\\n")
        return ("error", "KeyboardInterrupt", "", text, None)
    except BaseException as exc:
        if _needs_jspi(exc):
            first = REMOTE_DATA_NEEDS_JSPI.split("\\n", 1)[0]
            return ("error", "RuntimeError", first.partition(": ")[2], [], "needs-jspi")
        try:
            evalue = str(exc)
        except Exception:
            evalue = "<unprintable %s>" % type(exc).__name__
        return ("error", type(exc).__name__, evalue, _cell_traceback(exc), None)
    finally:
        _rich_display.end_cell()
        _running_task = None
        _interrupt_requested = False
    return ("ok", None, None, None, None)


def clear_buffer():
    """Drop a half-typed multi-line statement.

    This is NOT the interrupt - \`interrupt()\` is, and it cancels the task an execution is running
    in. This empties the console's line buffer, which is only ever non-empty while the console is
    waiting for more input, and is what Ctrl-C means at an idle prompt.
    """
    if _console is None:
        return True
    _console.buffer = []
    return True


def complete(source):
    """Completions for the end of \`\`source\`\`: \`\`(matches, start_offset)\`\`."""
    if _console is None:
        return ([], len(source))
    try:
        matches, start = _console.complete(source)
    except Exception:
        return ([], len(source))


    seen = []
    for match in matches:
        if match not in seen:
            seen.append(match)
    return (seen, int(start))


def capture_display():
    """Rich output produced by the execution that just finished, as protocol-shaped dicts."""
    try:
        return _rich_display.capture_figures()
    except Exception as exc:
        return [
            {
                "mime": "text/plain",
                "encoding": "utf8",
                "data": "browser-python display bridge error: %s" % exc,
            }
        ]


def install_browser_http():
    """Register the Fetch-backed filesystems. Returns a status string for the ready event.

    Two of them: \`browser_http\` for \`http\`/\`https\`, and \`browser_s3\` for anonymous \`s3://\` against
    a named HTTPS gateway, which is a URL rewrite in front of the first. One call site, because a
    profile that has fsspec wants both and a profile that has not cannot have either.
    """
    import browser_http
    import browser_s3

    browser_http.install()
    browser_s3.install()
    return "installed"


def install_cartopy_data():
    """Arm on-demand Natural Earth downloads for Cartopy. Returns a status for the ready event.

    Cheap, and it imports nothing: \`cartopy_data.install()\` only puts a finder on \`sys.meta_path\`
    that answers for one module name, so a session that never draws a map pays nothing and a session
    that does gets the adaptation at the moment \`cartopy.io.shapereader\` loads.

    A failure here is reported and swallowed. Prepared data keeps working without this - it is read
    from \`CARTOPY_DATA_DIR\` by Cartopy itself - so a console that cannot arm the downloads is less
    capable, not broken, and taking the interpreter down over it would be the wrong trade.
    """
    try:
        import cartopy_data

        return cartopy_data.install()
    except Exception as exc:
        return "unavailable: %s: %s" % (type(exc).__name__, exc)


def versions(names):
    """Resolved versions of whatever is actually importable, for the ready event.

    Reported rather than hardcoded: the wheel set a CDN serves for a pinned runtime is not this
    package's to promise, and a UI that prints its own idea of the xarray version will eventually
    print a number that is not there.
    """
    import importlib

    out = {}
    for name in names:
        try:
            module = importlib.import_module(name)
        except Exception:
            continue
        version = getattr(module, "__version__", None)
        if version:
            out[name] = str(version)
    return out


def python_version():
    return "%d.%d.%d" % _sys.version_info[:3]
`,xn=`"""A read-only fsspec filesystem backed by the browser's own Fetch, for remote Zarr.

Why this exists
---------------
\`\`xr.open_zarr("https://...")\`\` works by asking fsspec for an \`\`https\`\` filesystem. fsspec's own
HTTP implementation is built on aiohttp, which does not exist in Emscripten, so without this the
familiar one-line xarray call simply fails in a browser. Registering a Fetch-backed implementation
under the same two protocol names is what keeps the API people already know: nobody has to import
Zarr-Python internals, and nobody has to learn a JavaScript Zarr library.

Shape of this module
--------------------
The pure functions come FIRST and import nothing but the standard library. Everything about what an
HTTP range means, how an exclusive end becomes an inclusive one, and what a 200/404/416 implies is
in them - so that behaviour is testable in an interpreter with no fsspec, no aiohttp and no network,
which is exactly what the browser suite does. The fsspec subclass is built inside \`\`install()\`\` and
is only the adapter between those functions and the interface fsspec wants.

Scope, stated plainly: public HTTPS, CORS-enabled, read-only, no credentials. See the README.
"""

from __future__ import annotations




class RangeUnsatisfiable(Exception):
    """The requested range cannot contain bytes. Callers return b"" rather than erroring."""


def needs_size(start, end):
    """True when the requested slice cannot be expressed as an HTTP range without the size.

    A negative bound counts from the END of the object, and HTTP has exactly one form for that: a
    suffix range, which means "the last N bytes" and nothing else. So \`\`[-5:]\`\` maps faithfully and
    \`\`[-5:-2]\`\` and \`\`[:-2]\`\` do not - they need the object's length before they can be turned into
    an absolute range, which is why \`fetch_bytes\` looks it up rather than approximating.
    """
    if start is not None and start < 0:
        return end is not None
    return end is not None and end < 0


def normalise_slice(start, end, size):
    """Resolve a Python-style \`\`[start:end]\`\` against a known \`\`size\`\` into absolute bounds.

    Exactly \`slice(start, end).indices(size)\` semantics, which is what fsspec callers mean by
    \`\`_cat_file(path, start, end)\`\` - and what the previous implementation did not do: a negative
    \`\`end\`\` was compared against a non-negative \`\`start\`\` and rejected as unsatisfiable, so
    \`\`[:-2]\`\` returned nothing at all, and \`\`[-5:-2]\`\` fetched the last five bytes instead of the
    three that were asked for.
    """
    begin, stop, _ = slice(start, end).indices(int(size))
    return begin, max(begin, stop)


def range_header(start, end):
    """Build a \`\`Range\`\` header value for an fsspec-style \`\`[start, end)\`\` request.

    Two conversions live here and both are off-by-one traps:

    * fsspec's \`\`end\`\` is EXCLUSIVE; the HTTP \`\`Range\`\` unit is INCLUSIVE. Requesting
      \`\`bytes=0-100\`\` for \`\`end=100\`\` fetches 101 bytes, and for a Zarr chunk that is a silently
      corrupt array rather than an error.
    * a NEGATIVE \`\`start\`\` with no \`\`end\`\` is a suffix request - the last N bytes. Zarr v2 readers
      use it to find a footer without knowing the object's length first, and it is the ONE negative
      form HTTP can express faithfully.

    Anything else with a negative bound must be resolved against the object's size first; callers
    use \`needs_size\` and \`normalise_slice\` for that. Returns \`\`None\`\` when the whole object is
    wanted, and raises \`\`RangeUnsatisfiable\`\` for a range that cannot contain a byte.
    """
    if start is None and end is None:
        return None
    if start is not None and start < 0:
        if end is not None:
            raise RangeUnsatisfiable(
                "a negative start with an end (%r, %r) is not an HTTP range; resolve it against "
                "the object size first" % (start, end)
            )
        return "bytes=%d" % start
    if end is not None and end < 0:
        raise RangeUnsatisfiable(
            "a negative end (%r) is not an HTTP range; resolve it against the object size first"
            % (end,)
        )
    begin = 0 if start is None else int(start)
    if end is None:
        return "bytes=%d-" % begin
    last = int(end) - 1
    if last < begin:
        raise RangeUnsatisfiable("end (%r) is not after start (%r)" % (end, start))
    return "bytes=%d-%d" % (begin, last)



























MAX_DECODED_BODY_BYTES = 64 * 1024 * 1024






MAX_IGNORED_RANGE_BYTES = 64 * 1024 * 1024


def content_length(headers):
    """\`\`Content-Length\`\` as an int, or \`\`None\`\` when the server does not say.

    Absent is normal and not an error: a chunked or compressed response legitimately has no length,
    and fsspec accepts \`\`None\`\` for an unknown size.
    """
    if not headers:
        return None
    for key in ("content-length", "Content-Length"):
        raw = headers.get(key) if hasattr(headers, "get") else None
        if raw is None:
            continue
        try:
            return int(raw)
        except (TypeError, ValueError):
            return None
    return None


def describe_status(url, status):
    """Map a non-2xx status to the exception fsspec and Zarr expect, or \`\`None\`\` if it is fine.

    404 must be \`\`FileNotFoundError\`\` specifically: Zarr PROBES for optional keys - a v3 store asks
    for \`\`zarr.json\`\`, a consolidated reader asks for \`\`.zmetadata\`\` - and treats "missing" as a
    normal answer. Raising a generic \`\`OSError\`\` there turns an ordinary absent key into a failed
    open, which is how a store that would otherwise work reports itself as broken.
    """
    if 200 <= status < 300:
        return None
    if status == 404:
        return FileNotFoundError(url)
    if status == 416:
        return RangeUnsatisfiable(url)
    return OSError("HTTP %d for %s" % (status, url))





async def fetch_bytes(url, start=None, end=None, fetcher=None, max_bytes=None):
    """GET \`\`url\`\`, honouring an fsspec-style \`\`[start, end)\`\` range.

    \`\`fetcher\`\` is injectable so this whole path can be exercised against a fake in a test with no
    network. In the browser it defaults to \`\`pyodide.http.pyfetch\`\`.

    \`\`max_bytes\`\` is the DECODED ceiling for a whole-object read, defaulting to
    \`MAX_DECODED_BODY_BYTES\`. An accepted range response is bounded by its own validated span
    instead, which is always the smaller of the two.
    """
    if fetcher is None:
        from pyodide.http import pyfetch

        fetcher = pyfetch

    if needs_size(start, end):
        """
        A negative bound with another bound cannot be an HTTP range.

        \`[-5:-2]\` and \`[:-2]\` mean "counted from the end", and HTTP's only end-relative form is a
        suffix range - "the last N bytes" - which is a different request. So the size is looked up
        and the slice resolved to absolute bounds. The previous code turned \`[-5:-2]\` into
        \`bytes=-5\` and returned five bytes where three were asked for, and rejected \`[:-2]\`
        outright as unsatisfiable, returning nothing.
        """
        exists, size = await head(url, fetcher=fetcher)
        if not exists or size is None:
            raise OSError(
                "cannot resolve the range %r:%r for %s: the server did not report a size"
                % (start, end, url)
            )
        start, end = normalise_slice(start, end, size)

    try:
        header = range_header(start, end)
    except RangeUnsatisfiable:
        return b""

    options = {}
    if header is not None:
        options["headers"] = {"Range": header}
    """
    No cookies, ever, on this adapter.

    It exists for PUBLIC, CORS-enabled data. Sending credentials would make every store a visitor
    types into the prompt a place their session cookies are offered to, and would make the request
    fail outright against the many CORS configurations that allow \`*\` but not credentials.
    Authenticated Freva requests go through their own transport, which is tested separately.
    """
    options["credentials"] = "omit"

    response = await fetcher(url, **options)
    status = int(response.status)

    """
    EVERY HEADER-LEVEL EXIT LETS THE BODY GO.

    This function refuses a good many responses on their headers alone - a range-ignoring 200, a
    206 that is not the slice that was asked for, an encoded ranged response, a span above the
    ceiling, a 404, a 416, a 503 - and each of those refusals was correct and each left the BODY
    live. Reading nothing and closing nothing is not neutral: an undrained response goes on
    consuming the network for as long as the server keeps sending, and on the range-ignoring 200
    that body is the WHOLE object, which is exactly what refusing it was meant to avoid
    downloading.

    The \`try\` below is the whole of it: anything that leaves the header phase - by raising or by
    returning - cancels the body and releases the reader first, without consuming a byte, and the
    diagnostic travels on unchanged. A refusal that lost its reason in the tidy-up would be a worse
    bug than the leak it fixed.
    """
    try:
        return await _read_within_bounds(url, response, status, header, max_bytes)
    except BaseException:
        await discard_body(response)
        raise


async def _read_within_bounds(url, response, status, header, max_bytes):
    """The header phase and the bounded read. See \`fetch_bytes\` for why this is a separate frame."""
    problem = describe_status(url, status)
    if isinstance(problem, RangeUnsatisfiable):



        await discard_body(response)
        return b""
    if problem is not None:
        raise problem

    if header is not None and status != 206:
        """
        The server ignored the range, so this is THE WHOLE OBJECT. Refuse it unread.

        The previous version read it and sliced locally, guarded by a \`\`Content-Length\`\` check -
        which is not a memory bound. \`\`Content-Length\`\` is absent on a chunked or compressed
        response, and absent meant "read it anyway": a four-kilobyte Zarr chunk request answered by
        a two-gigabyte chunked 200 allocated two gigabytes before any slice was applied, and the tab
        died with a message about memory rather than about a server that does not implement ranges.

        Reading a bounded prefix would be better than either and is not available here: \`\`pyfetch\`\`
        exposes the body as a whole, and reading a JavaScript stream from Python needs machinery
        this adapter deliberately does not carry. So the refusal is the fix, and it is also the
        more useful answer - a store served through a range-ignoring server cannot be read chunk by
        chunk at all, and saying so beats dying while trying.

        A request that asked for NO range is unaffected: that caller wants the whole object.
        """
        declared = content_length(getattr(response, "headers", None))
        size_text = "%d bytes" % declared if declared is not None else "an undeclared size"
        raise OSError(
            "%s ignored the Range header (%s) and answered 200 with the whole object (%s). It was "
            "not read: this server does not support byte ranges, so a store served through it "
            "cannot be read chunk by chunk." % (url, header, size_text)
        )

    response_headers = getattr(response, "headers", None)
    ceiling = MAX_DECODED_BODY_BYTES if max_bytes is None else int(max_bytes)

    """
    EVERY HEADER IS JUDGED BEFORE THE BODY IS TOUCHED, AND THE BOUND COMES FROM THE REQUEST.

    Round 4 refused a range-ignoring 200 unread, on the grounds that validating a response after it
    is in memory is not a memory bound. The 206 path kept doing exactly that. Round 6 fixed the
    order and then bounded the read with \`Content-Length\`, which is the wrong quantity in both
    directions - see \`MAX_DECODED_BODY_BYTES\`.

    So: headers first, then a bound that does not come from the wire. An accepted range response is
    held to the span that has just been validated against the request; a whole-object response is
    held to this module's own decoded ceiling.
    """
    span = None
    if header is None:

        span = verify_unsolicited_partial(url, response_headers, status)
    else:
        """
        A RANGE OF AN ENCODED REPRESENTATION IS NOT A RANGE OF THE BYTES PYTHON GETS.

        \`Content-Range\` counts in the coordinates of the SELECTED REPRESENTATION - the compressed
        one, when a content coding is applied - and Fetch hands over the decoded bytes. So byte
        offsets do not survive the decoding, and there is no arithmetic that recovers them: the
        five bytes asked for are not the five bytes that arrive, and the length check would be
        comparing a decoded length against an encoded span. Refused, before anything is read.

        This is only reachable when the server EXPOSED \`Content-Encoding\`. When it did not, the
        span still bounds the read and the exact-length check below still refuses the mismatch -
        the diagnosis is worse, but nothing incorrect is returned.
        """
        if encoded(response_headers):
            raise OSError(
                "%s answered the range %s with Content-Encoding %r. A byte range names positions "
                "in the encoded representation, and the browser delivers the decoded body, so the "
                "bytes that arrive are not the bytes that were asked for. The response was "
                "refused rather than misread."
                % (url, header, content_encoding(response_headers))
            )

        verify_content_range(url, header, response_headers, None)
        span = range_span(response_headers)

    limit = ceiling if span is None else min(span, ceiling)
    if span is not None and span > ceiling:
        raise OSError(
            "%s would deliver %d bytes, above this reader's %d-byte limit for a single response. "
            "Read it in smaller ranges, or stream it." % (url, span, ceiling)
        )

    body = await read_body(url, response, limit)

    """
    THE EXACT LENGTH, for every response whose length was declared in a way worth checking.

    A 206's span is a statement about what is being sent, and a body that does not match it is
    either truncated or something else entirely. Both matter: short is half a Zarr chunk, which
    decodes into an array that is quietly wrong, and long is a response that is not the one the
    \`Content-Range\` describes. The over-long case is normally caught by the cap above; this is the
    check that makes it true rather than probable, and it covers the unsolicited 206 too, which
    previously had its headers checked and its body never counted.
    """
    if header is not None:
        verify_content_range(url, header, response_headers, len(body))
    elif span is not None and len(body) != span:
        raise OSError(
            "%s answered 206 covering %d bytes and sent %d. The response does not match the "
            "Content-Range it declared, so it was refused." % (url, span, len(body))
        )
    return bytes(body)


def content_encoding(headers):
    """The \`\`Content-Encoding\`\` the server exposed, or \`\`None\`\`."""
    if not headers:
        return None
    for key in ("content-encoding", "Content-Encoding"):
        raw = headers.get(key) if hasattr(headers, "get") else None
        if raw:
            return str(raw).strip()
    return None


def range_span(headers):
    """How many bytes an accepted \`\`Content-Range\`\` says are being sent, or \`\`None\`\`.

    Used as the accumulation ceiling for a range response, and ONLY after \`verify_content_range\`
    has agreed that the span is the one that was asked for. An unvalidated span is a number the
    server chose, which is not a bound on anything.
    """
    parsed = parse_content_range(headers)
    if parsed is None:
        return None
    first, last, _total = parsed
    return last - first + 1 if last >= first else None


def encoded(headers):
    """True when the body on the wire is not the body the caller will see.

    \`\`Content-Encoding: gzip\`\` makes every declared length a length of the COMPRESSED bytes, so it
    is not a cap on what \`read_body\` accumulates and not something to compare a decoded length
    against. Absent, empty and \`\`identity\`\` all mean "what you see is what was sent".
    """
    if not headers:
        return False
    for key in ("content-encoding", "Content-Encoding"):
        raw = headers.get(key) if hasattr(headers, "get") else None
        if raw:
            text = str(raw).strip().lower()
            if text and text != "identity":
                return True
    return False


def verify_unsolicited_partial(url, headers, status):
    """A 206 answering a request that carried no \`\`Range\`\` must cover the WHOLE object.

    Every 206 check in this module used to be gated on "a range was requested", so a request for
    the whole object that got a partial answer skipped all of them: \`\`206 Content-Range: bytes
    0-4/100\`\` was returned to the caller as the entire file, and Zarr decoded five bytes of a
    hundred-byte chunk into an array that is quietly wrong.

    A 206 to a request with no \`\`Range\`\` is a protocol violation - RFC 9110 makes a partial
    response an answer to a range request - and the only harmless form of it is one whose
    \`\`Content-Range\`\` runs from the first byte to the last. Anything else is refused unread, for
    the same reason the range-ignoring 200 is.

    Returns the validated span for an accepted 206, or \`\`None\`\` when the response is not a 206.
    """
    if status != 206:
        return None
    parsed = parse_content_range(headers)
    if parsed is None:
        raise OSError(
            "%s answered 206 to a request that asked for no range, with no usable Content-Range "
            "header, so there is no evidence this is the whole object." % (url,)
        )
    first, last, total = parsed
    if first != 0 or total is None or last != total - 1:
        raise OSError(
            "%s answered 206 with Content-Range %d-%s to a request that asked for the whole "
            "object: a partial response nobody asked for. It was refused rather than returned as "
            "the complete object." % (url, first, "%d/%s" % (last, "*" if total is None else total))
        )



    return last - first + 1


async def read_body(url, response, limit=None):
    """Read the response body, refusing to accumulate more than \`\`limit\`\` bytes.

    \`\`pyfetch\`\` hands the decoded body over whole through \`\`bytes()\`\`, which is why the earlier
    rounds could only refuse a response rather than bound one. The underlying \`\`Response\`\` is right
    there as \`\`js_response\`\` though, and its \`\`body\`\` is an ordinary readable stream - so the body
    can be taken a chunk at a time and abandoned the moment it passes the length the server itself
    declared. A response that lies about its length now costs one chunk, not its whole size.

    \`\`limit\`\` of \`\`None\`\` means the server declared nothing to hold it to - a chunked or compressed
    response - and the body is read as before.
    """
    try:
        setattr(response, _BODY_DONE, True)
    except Exception:
        pass
    reader = _body_reader(response)
    if reader is None:
        """
        NO READER, NO READ.

        \`response.bytes()\` materialises whatever arrives, in full, before anything can object -
        which is precisely the property this function exists to remove. Falling back to it "just
        this once" would mean the bound advertised on this path is real only when the browser
        happens to expose a stream, and silently absent when it does not. So the fallback is gone
        and the refusal names what is missing.
        """
        raise OSError(
            "%s: this response exposes no readable body stream, so it cannot be read within a "
            "memory bound. It was refused rather than read whole." % (url,)
        )

    chunks = []
    total = 0
    overflow = False
    drained = False
    try:
        while True:
            item = await reader.read()
            if getattr(item, "done", False):
                drained = True
                break
            value = getattr(item, "value", None)
            if value is None:
                continue
            piece = _to_bytes(value)
            total += len(piece)
            if limit is not None and total > limit:


                overflow = True
                break
            chunks.append(piece)
    finally:
        """
        Cancel what is still running, and ALWAYS give the lock back.

        \`getReader()\` locks the stream for as long as the reader holds it, and a reader dropped
        without \`releaseLock()\` leaves the response permanently unreadable by anything else -
        including the browser's own cleanup. The cancel is conditional (there is nothing to stop
        once the stream ended); the release is not.
        """
        if not drained:
            await _cancel(reader)
        _release(reader)
    if overflow:
        raise OSError(
            "%s kept sending past the %d bytes this read is bounded to (%d and counting). The "
            "transfer was cancelled rather than accumulated." % (url, limit, total)
        )
    return b"".join(chunks)



_BODY_DONE = "_freva_browser_body_done"


async def discard_body(response):
    """Let a response's body go without reading a byte of it.

    EVERY HEADER-ONLY EXIT, and this is not tidiness. A response whose body is never cancelled
    holds a live network transfer for as long as the server keeps sending - on the probe path that
    body may be the WHOLE object, which is exactly what a one-byte range request exists to avoid
    downloading. Reading it to "use it up" would be worse still.

    Best effort by design: a body already disturbed, already closed, or absent (a stub, a \`HEAD\`
    with nothing behind it) is nothing to do anything about, and a probe must not fail because its
    tidy-up did.
    """
    if getattr(response, _BODY_DONE, False):


        return
    try:
        setattr(response, _BODY_DONE, True)
    except Exception:
        pass
    reader = _body_reader(response)
    if reader is None:
        return
    await _cancel(reader)
    _release(reader)


def _body_reader(response):
    """The response's streaming reader, or \`\`None\`\` when this response cannot give one."""
    js = getattr(response, "js_response", None)
    body = getattr(js, "body", None) if js is not None else None
    get_reader = getattr(body, "getReader", None) if body is not None else None
    if get_reader is None:
        return None
    try:
        return get_reader()
    except Exception:

        return None


def _to_bytes(value):
    """A stream chunk as \`\`bytes\`\`, whether it arrived as a JS \`\`Uint8Array\`\` or Python bytes."""
    if isinstance(value, (bytes, bytearray, memoryview)):
        return bytes(value)
    to_py = getattr(value, "to_py", None)
    if to_py is not None:
        return bytes(to_py())
    return bytes(value)


def _release(reader):
    """Give the stream's lock back. Best effort, and after cancellation as well as success."""
    release = getattr(reader, "releaseLock", None)
    if release is None:
        return
    try:
        release()
    except Exception:
        pass


async def _cancel(reader):
    """Stop the transfer. Best effort: the refusal is what matters, not the tidy-up."""
    cancel = getattr(reader, "cancel", None)
    if cancel is None:
        return
    try:
        result = cancel()
        if result is not None:
            await result
    except Exception:
        pass


def parse_content_range(headers):
    """\`\`(first, last, total)\`\` from \`\`Content-Range: bytes 10-19/500\`\`, or \`\`None\`\`.

    \`\`total\`\` is \`\`None\`\` for the \`\`*\`\` form, which is legal and means the server will not say.
    """
    if not headers:
        return None
    raw = None
    for key in ("content-range", "Content-Range"):
        raw = headers.get(key) if hasattr(headers, "get") else None
        if raw:
            break
    if not raw:
        return None
    text = str(raw).strip()
    if not text.lower().startswith("bytes "):
        return None
    text = text[6:].strip()
    if "/" not in text:
        return None
    span, _, total_text = text.partition("/")
    span = span.strip()
    if "-" not in span:
        return None
    first_text, _, last_text = span.partition("-")
    try:
        first = int(first_text)
        last = int(last_text)
    except ValueError:
        return None
    total_text = total_text.strip()
    total = None
    if total_text and total_text != "*":
        try:
            total = int(total_text)
        except ValueError:
            return None
    """
    A HEADER THAT PARSES IS NOT A HEADER THAT MEANS ANYTHING.

    The grammar has nothing to say about whether a range describes an object that could exist, and
    every caller here goes on to use these numbers as arithmetic: \`bytes 0-0/-1\` parsed, satisfied
    "the byte I asked for", and became \`(True, -1)\` - a negative object size handed to fsspec,
    which a reader then plans chunks against. So the meaning is checked here, once, and a
    \`Content-Range\` that cannot describe any object is refused as unusable rather than passed on:

      * a first byte before the start of the object;
      * a last byte before the first;
      * a negative total;
      * a span that runs past the total it declares.

    \`*\` for the total remains legal and is \`None\`: it is a server declining to say, not a server
    saying something impossible.
    """
    if first < 0 or last < first:
        return None
    if total is not None and (total < 0 or last >= total):
        return None
    return (first, last, total)


def verify_content_range(url, header, headers, length):
    """Check that a 206 delivered the range that was ASKED for.

    The gap this closes was an asymmetry rather than an oversight: the 200 path was defended - a
    server that ignores \`\`Range\`\` is refused outright rather than handing Zarr a whole object where
    it expected a chunk - and the 206 path trusted the status alone.
    A 206 whose \`\`Content-Range\`\` says something else is not hypothetical: a caching proxy can
    coalesce or widen ranges, a gateway can clamp a suffix range it does not like, and an
    intermediary can serve a neighbouring slice from cache. The bytes then arrive with the right
    length and the wrong contents, Zarr decodes them without complaining, and the array is quietly
    wrong - which is exactly the failure the 200 refusal was written to prevent.

    A server that sends no \`\`Content-Range\`\` at all IS a failure, and the paragraph that used to
    stand here said the opposite - it survived from the version that returned early on a missing
    header, and described behaviour this function had already stopped having. RFC 9110 requires the
    header on a 206; without it there is nothing to check the body against, so accepting one means
    accepting an arbitrary body as the requested slice.

    \`\`length\`\` is the number of bytes actually delivered, or \`\`None\`\` when the body has not been
    read yet. \`fetch_bytes\` calls this twice: once on the headers alone, BEFORE reading anything,
    and again with the delivered length. Everything that can be decided from the headers is decided
    on the first call, so a response that is provably the wrong slice is never materialised.
    """
    parsed = parse_content_range(headers)
    if parsed is None:
        """
        A 206 with no parseable \`\`Content-Range\`\` is not evidence of anything.

        The header is REQUIRED on a 206 by RFC 9110, and accepting a response without it means
        accepting an arbitrary body as though it were the requested slice. The previous version
        returned here, which made "the server sent no header" the one way past every check below.
        """
        raise OSError(
            "%s answered 206 without a usable Content-Range header, so there is no evidence the "
            "body is the range that was requested (%s)." % (url, header)
        )
    first, last, total = parsed
    if last < first:
        raise OSError("%s answered 206 with an inverted range (%d-%d)" % (url, first, last))
    delivered = last - first + 1
    if total is not None and last >= total:
        raise OSError(
            "%s answered 206 with Content-Range %d-%d/%d, which runs past the end of the object"
            % (url, first, last, total)
        )
    if length is not None and length != delivered:
        raise OSError(
            "%s answered 206 with Content-Range %d-%d (%d bytes) but sent %d bytes"
            % (url, first, last, delivered, length)
        )

    wanted = header[len("bytes=") :] if header.startswith("bytes=") else header
    if wanted.startswith("-"):
        """
        A suffix range: the last N bytes.

        Where they START depends on the object's size, which is the SERVER's to know - so the only
        thing that makes this response the one that was asked for is a total, and a last byte that
        reaches it. Without a total there is nothing to check against: \`bytes 92-99/*\` might be the
        end of the object or might be eight bytes from the middle of a larger one, and accepting it
        means deciding on the server's behalf that it is the former.
        """
        suffix = int(wanted)
        if total is None:
            raise OSError(
                "%s answered bytes=%s with %d-%d and no total size, so there is no way to prove "
                "these are the LAST %d bytes rather than %d bytes from somewhere else. A store "
                "read this way must report Content-Range with a total; see the README on "
                "Access-Control-Expose-Headers." % (url, wanted, first, last, -suffix, -suffix)
            )
        if last != total - 1:
            raise OSError(
                "%s answered a suffix range with %d-%d of %d, which is not the end of the object"
                % (url, first, last, total)
            )
        if length is not None and length != min(-suffix, total):
            raise OSError(
                "%s answered bytes=%s with %d bytes" % (url, wanted, length)
            )
        return

    begin_text, _, end_text = wanted.partition("-")
    try:
        begin = int(begin_text)
    except ValueError:
        return
    if first != begin:
        raise OSError(
            "%s answered 206 starting at byte %d, but bytes=%s was requested. The response is a "
            "different part of the object than the one asked for." % (url, first, wanted)
        )
    if not end_text:
        """
        An OPEN-ENDED range: \`\`bytes=N-\`\` means "from N to the end of the object".

        Round 4 taught the bounded case to demand a full span, and this case had no requested last
        byte to compare against - so \`bytes=10-\` answered with \`bytes 10-19/100\` and ten bytes
        passed every check while being ninety bytes short. Zarr asks for open-ended ranges whenever
        it reads a chunk whose length it does not know, and ten bytes of a hundred-byte chunk
        decodes into an array that is quietly wrong rather than an error.

        The proof is the same one a short bounded range needs: a reported total, and a last byte
        that reaches it.
        """
        if total is None:
            raise OSError(
                "%s answered bytes=%s with %d-%d and no total size, so there is no way to prove "
                "the response runs to the end of the object as the request asked. A store read "
                "this way must report Content-Range with a total; see the README on "
                "Access-Control-Expose-Headers." % (url, wanted, first, last)
            )
        if last != total - 1:
            raise OSError(
                "%s answered bytes=%s with %d-%d of %d: an incomplete range that does not reach "
                "the end of the object. Half a chunk decodes into an array that is quietly wrong, "
                "so it was refused." % (url, wanted, first, last, total)
            )
        return

    if end_text:
        try:
            wanted_last = int(end_text)
        except ValueError:
            return
        if last > wanted_last:
            raise OSError(
                "%s answered 206 with %d-%d, wider than the requested bytes=%s"
                % (url, first, last, wanted)
            )
        if last < wanted_last:
            """
            SHORT is only legitimate at the end of the object.

            \`\`bytes=0-9\`\` answered with \`\`bytes 0-4/100\`\` and five bytes passed every check there
            was: the header parses, the start matches, the span is not wider than requested, and
            the body length matches the span. It is still half a Zarr chunk, and Zarr decodes half
            a chunk into an array that is quietly wrong - which is the whole failure this function
            exists to prevent.

            The one honest short answer is the last range of an object, where the reported total
            proves there was nothing more to send. Without a total - the \`\`*\`\` form - there is no
            proof, so there is no acceptance.
            """
            if total is None or last != total - 1:
                raise OSError(
                    "%s answered 206 with %d-%d for a request of bytes=%s: an incomplete range "
                    "that does not reach the end of the object%s. Half a chunk decodes into an "
                    "array that is quietly wrong, so it was refused."
                    % (
                        url,
                        first,
                        last,
                        wanted,
                        "" if total is None else " (%d bytes)" % total,
                    )
                )


async def head(url, fetcher=None):
    """Probe an object: \`\`(exists, size)\`\`.

    HEAD first, then a one-byte ranged GET if HEAD does not settle it.

    The distinction this makes is the point. The previous version answered \`\`(False, None)\`\` for
    everything that was not a clean 2xx - a CORS rejection, a 403, a 500, a server that simply does
    not implement HEAD (405 is common on object stores, and S3-compatible gateways often answer 501)
    - so fsspec reported "this key does not exist" for a store that was there, reachable, and
    merely fussy. Someone debugging that is told their URL is wrong when their credentials, their
    CORS configuration or the server's health is the actual problem.

    So: 404 means missing and nothing else does. A HEAD that is refused for any other reason falls
    back to \`\`Range: bytes=0-0\`\`, which is what the reader is going to use anyway and which many
    servers answer when they will not answer HEAD. A failure of BOTH is raised, not reported as a
    missing file, because a caller that cannot tell those apart cannot show a usable error.
    """
    if fetcher is None:
        from pyodide.http import pyfetch

        fetcher = pyfetch

    head_error = None
    try:


        response = await fetcher(url, method="HEAD", credentials="omit")
        status = int(response.status)

        await discard_body(response)
        if status == 404:
            return (False, None)
        if 200 <= status < 300:
            return (True, content_length(getattr(response, "headers", None)))
        head_error = OSError("HTTP %d for HEAD %s" % (status, url))
    except Exception as error:
        head_error = error



    try:
        response = await fetcher(
            url, method="GET", headers={"Range": "bytes=0-0"}, credentials="omit"
        )
    except Exception as error:
        raise OSError(
            "cannot reach %s (HEAD: %s; ranged GET: %s). This is a network, CORS or server "
            "problem, not a missing object." % (url, head_error, error)
        ) from error

    status = int(response.status)
    headers = getattr(response, "headers", None)
    """
    THE BODY GOES, WHATEVER THE ANSWER IS.

    This function returns headers and never bytes, so on every path below the body is a transfer
    nobody is going to read. Left alone it keeps running: on the range-ignoring 200 case it is the
    WHOLE object, which is precisely what asking for one byte was meant to avoid.
    """
    await discard_body(response)

    if status == 404:
        return (False, None)
    if status == 416:

        return (True, 0)
    if not (200 <= status < 300):
        raise OSError(
            "cannot read %s (HEAD: %s; ranged GET: HTTP %d). This is a server or permissions "
            "problem, not a missing object." % (url, head_error, status)
        )

    if status != 206:
        """
        THE SERVER IGNORED THE RANGE.

        It answered with the whole object, so the object EXISTS - that much is settled and is worth
        reporting, because the alternative is telling a caller a file is missing when it is there.
        What is not settled is anything else. \`Content-Length\` here describes the wire bytes of a
        response nobody asked for and may be a compressed length (see \`MAX_DECODED_BODY_BYTES\`),
        and a server that ignores \`Range\` cannot back a chunked read at all - so a size taken from
        here would be a number a reader builds a chunk plan on, from a server that will not serve
        chunks. \`None\` is the honest answer: fsspec accepts an unknown size, and the first ranged
        read will refuse this server with a message that names the real problem.
        """
        return (True, None)

    parsed = parse_content_range(headers)
    if parsed is None:

        return (True, None)
    first, last, total = parsed
    if first != 0 or last != 0:
        """
        A DIFFERENT BYTE THAN THE ONE ASKED FOR.

        \`bytes=0-0\` answered with \`bytes 5-5/100\` used to become \`(True, 100)\`. A server that
        serves a different single byte is a server whose ranges do not mean what this adapter
        assumes - a proxy rewriting them, a gateway clamping them - and a total taken from it is a
        number every later chunk request is planned against. Existence is still established; the
        size is not.
        """
        return (True, None)
    return (True, total)


def content_range_total(headers):
    """Total object size from a \`\`Content-Range: bytes 0-0/12345\`\` reply, or \`\`None\`\`.

    \`\`Content-Length\`\` on a 206 is the length of the SLICE - one byte here - so reading it as the
    object's size would tell Zarr every array is one byte long.
    """
    if not headers:
        return None
    raw = None
    for key in ("content-range", "Content-Range"):
        raw = headers.get(key) if hasattr(headers, "get") else None
        if raw:
            break
    if not raw or "/" not in str(raw):
        return None
    total = str(raw).rsplit("/", 1)[1].strip()
    if not total.isdigit():
        return None
    return int(total)




INSTALL_ERROR = "fsspec is not available in this interpreter"


def _running_loop():
    """The event loop this interpreter is already running on, or None.

    Emscripten's single loop is the only one there is; fsspec's usual answer - start a thread and
    give it one - is not available. \`None\` is an acceptable answer for an asynchronous filesystem,
    which never touches \`_loop\` on the paths this adapter supports.
    """
    import asyncio

    try:
        return asyncio.get_running_loop()
    except RuntimeError:
        try:
            return asyncio.get_event_loop_policy().get_event_loop()
        except Exception:
            return None


def install(clobber=True):
    """Define and register \`\`BrowserHTTPFileSystem\`\` for both \`\`http\`\` and \`\`https\`\`.

    Registered for BOTH because a Zarr store's own metadata may name either scheme, and a store
    opened as \`\`https\`\` can hold absolute \`\`http\`\` references. Registering one and not the other
    produces a store that opens and then fails partway through reading.

    \`\`clobber=True\`\` because fsspec ships its own aiohttp-based HTTP implementation and registers it
    first; without clobbering, this one is never consulted and the failure is an aiohttp import
    error from deep inside xarray.
    """
    import fsspec
    from fsspec.asyn import AsyncFileSystem

    class BrowserHTTPFileSystem(AsyncFileSystem):
        """Read-only HTTP(S) through the browser's Fetch. One object per URL, no listing."""

        protocol = ("http", "https")
        root_marker = ""


        cachable = False
        async_impl = True

        def __init__(self, *args, **storage_options):



            storage_options.pop("anon", None)
            storage_options.pop("token", None)













            storage_options["asynchronous"] = True
            storage_options.setdefault("loop", _running_loop())
            super().__init__(*args, **storage_options)

        @classmethod
        def _strip_protocol(cls, path):
            """Keep the WHOLE URL.

            fsspec's default strips the scheme, which is right for a bucket-style filesystem where
            the remainder is a key. For plain HTTP the scheme, host and path together ARE the
            identity of the object; dropping the scheme leaves \`//host/key\`, which cannot be
            fetched. This is the single most important line in the adapter.
            """
            if isinstance(path, (list, tuple)):
                return [cls._strip_protocol(p) for p in path]
            return path

        @staticmethod
        def _get_kwargs_from_urls(path):
            return {}

        async def _cat_file(self, path, start=None, end=None, **_kwargs):
            return await fetch_bytes(path, start, end)

        async def _exists(self, path, **_kwargs):
            exists, _size = await head(path)
            return exists

        async def _info(self, path, **_kwargs):
            exists, size = await head(path)
            if not exists:
                raise FileNotFoundError(path)
            info = {"name": path, "type": "file"}
            info["size"] = size
            return info

        async def _isfile(self, path, **_kwargs):
            return await self._exists(path)

        async def _isdir(self, _path, **_kwargs):
            return False

        async def _ls(self, path, detail=True, **_kwargs):




            raise NotImplementedError(
                "Listing is not possible over plain HTTP (%s). Open a Zarr store with "
                "consolidated metadata, which names its own keys." % path
            )

        async def _find(self, path, **_kwargs):
            raise NotImplementedError(
                "Searching is not possible over plain HTTP (%s); see _ls." % path
            )

        async def _glob(self, path, **_kwargs):
            raise NotImplementedError(
                "Globbing is not possible over plain HTTP (%s); see _ls." % path
            )

        async def _pipe_file(self, path, *_args, **_kwargs):
            raise PermissionError("This filesystem is read-only (%s)." % path)

        async def _rm_file(self, path, **_kwargs):
            raise PermissionError("This filesystem is read-only (%s)." % path)

    fsspec.register_implementation("http", BrowserHTTPFileSystem, clobber=clobber)
    fsspec.register_implementation("https", BrowserHTTPFileSystem, clobber=clobber)
    return BrowserHTTPFileSystem
`,Tn=`"""Anonymous, read-only \`\`s3://\`\` over an S3-compatible HTTPS gateway.

NOT S3 SUPPORT: no signing, no credential chain, no region resolution, no listing. A URL
translation in front of \`browser_http\`, so a catalogue written as \`s3://bucket/key\` opens without
\`s3fs\` - which wants botocore, threads and a credential resolver, none of which exist here.
\`s3://<bucket>/<key>\` plus an endpoint becomes \`\`<endpoint>/<bucket>/<key>\`\`, path style, and every
byte after that is fetched by the code that serves \`\`https://\`\`: the same ranges, validation and
size ceiling.

Supported: \`anon=True\`, an HTTPS \`endpoint_url\`, path style, consolidated Zarr, reads. Everything
else is refused BY NAME - a credential silently dropped means an unauthenticated request that 403s
somewhere the reader cannot see.
"""

from __future__ import annotations

from urllib.parse import quote, urlsplit



CREDENTIAL_OPTIONS = (
    "key",
    "secret",
    "token",
    "aws_access_key_id",
    "aws_secret_access_key",
    "aws_session_token",
    "session_token",
    "profile",
    "profile_name",
    "client_kwargs_credentials",
)

NO_ENDPOINT = (
    "s3:// needs storage_options={'anon': True, 'endpoint_url': 'https://<gateway>'}. This "
    "filesystem does not resolve AWS endpoints or regions: it rewrites s3://<bucket>/<key> to "
    "<endpoint>/<bucket>/<key> and fetches that over HTTPS, so the gateway has to be named."
)

NOT_ANONYMOUS = (
    "Only anonymous access is supported: pass anon=True. This filesystem cannot sign a request - "
    "there is no credential chain and no signing implementation in the browser build - so a "
    "bucket that requires authentication has to be served through a gateway that does the "
    "signing, or exposed with a presigned URL opened as https://."
)

NOT_HTTPS = (
    "endpoint_url must be an https:// origin (got %r). A page served over HTTPS cannot fetch "
    "http://, and an unencrypted gateway would put every byte of the dataset on the wire in "
    "clear. \`http://localhost\`, \`http://127.0.0.1\` and \`http://[::1]\` are the exception, because "
    "a browser treats them as potentially trustworthy (W3C Secure Contexts)."
)

ENDPOINT_PART = (
    "endpoint_url must be an origin with an optional base path; this one carries %s (%r). "
    "Anything after the path is concatenated in front of the object key, which produces a URL "
    "that addresses something other than the object."
)


LOCAL_HOSTS = ("localhost", "127.0.0.1", "[::1]", "::1")

DOT_SEGMENT = (
    "An s3 key may not contain a \`.\` or \`..\` segment (%r). S3 treats a key as an opaque string, "
    "but a URL parser resolves those segments before the request is sent, so the object fetched "
    "would not be the object asked for. Nothing here can encode its way out of that."
)

NO_LISTING = (
    "Listing is not possible here (%s): ListObjectsV2 is an S3 API call this filesystem does not "
    "make, and an anonymous gateway may refuse it anyway. Open a Zarr store with consolidated "
    "metadata, which names its own keys."
)


def split_path(path):
    """\`\`s3://bucket/key\`\` (or \`\`bucket/key\`\`) -> \`\`("bucket", "key")\`\`. Key may be empty."""
    text = path
    if "://" in text:
        scheme, _, rest = text.partition("://")
        if scheme.lower() not in ("s3", "s3a", "s3n"):
            raise ValueError("Not an s3 path: %s" % path)



        text = rest
    else:
        text = text.lstrip("/")
    bucket, sep, key = text.partition("/")
    if not bucket:
        raise ValueError("An s3 path needs a bucket: %s" % path)




    return bucket, key if sep else ""


def object_url(endpoint, bucket, key):
    """Path-style object URL, each segment percent-encoded, the key preserved exactly.

    Per SEGMENT, so a key keeps its slashes: a gateway matching on \`%2F\` would 404 on a store that
    works everywhere else. Everything else - a space, \`#\`, \`?\`, non-ASCII - is escaped, because
    unescaped it would end the path or start a query. An EMPTY segment is kept, because \`a//c\` is
    not \`a/c\` in a bucket, and \`.\`/\`..\` are refused rather than encoded: a URL parser resolves
    them on the way out, so no escaping saves them.
    """
    base = endpoint.rstrip("/")
    segments = key.split("/") if key else []
    for segment in segments:
        if segment in (".", ".."):
            raise ValueError(DOT_SEGMENT % key)
    parts = [quote(bucket, safe="")]
    parts.extend(quote(segment, safe="") for segment in segments)
    return "%s/%s" % (base, "/".join(parts))


def check_endpoint(endpoint):
    """Return the endpoint origin, or raise with the reason it cannot be used."""
    if not endpoint:
        raise ValueError(NO_ENDPOINT)
    split = urlsplit(endpoint)
    if not split.netloc:
        raise ValueError(NOT_HTTPS % endpoint)




    if split.query:
        raise ValueError(ENDPOINT_PART % ("a query string", endpoint))
    if split.fragment:
        raise ValueError(ENDPOINT_PART % ("a fragment", endpoint))
    if split.username is not None or split.password is not None:
        raise ValueError(ENDPOINT_PART % ("credentials in the URL", endpoint))
    try:
        port = split.port
    except ValueError:
        raise ValueError(ENDPOINT_PART % ("an invalid port", endpoint)) from None
    if port is not None and not 1 <= port <= 65535:
        raise ValueError(ENDPOINT_PART % ("an invalid port", endpoint))
    if split.scheme == "https":
        return endpoint
    if split.scheme == "http" and split.hostname in LOCAL_HOSTS:
        return endpoint
    raise ValueError(NOT_HTTPS % endpoint)


def check_options(options):
    """Refuse credentials and non-anonymous access, by name."""
    named = [name for name in CREDENTIAL_OPTIONS if options.get(name) is not None]
    if named:
        raise ValueError(
            "Credentials are not supported here (%s). %s" % (", ".join(sorted(named)), NOT_ANONYMOUS)
        )
    client_kwargs = options.get("client_kwargs") or {}
    if isinstance(client_kwargs, dict):
        for name in ("aws_access_key_id", "aws_secret_access_key", "aws_session_token"):
            if client_kwargs.get(name) is not None:
                raise ValueError(
                    "Credentials are not supported here (client_kwargs.%s). %s"
                    % (name, NOT_ANONYMOUS)
                )
    if options.get("anon") is False:
        raise ValueError(NOT_ANONYMOUS)


def endpoint_from(options):
    """The gateway origin, from \`endpoint_url\` or \`client_kwargs={'endpoint_url': ...}\`."""
    endpoint = options.get("endpoint_url")
    if not endpoint:
        client_kwargs = options.get("client_kwargs") or {}
        if isinstance(client_kwargs, dict):
            endpoint = client_kwargs.get("endpoint_url")
    return check_endpoint(endpoint)


def install(clobber=True):
    """Register \`\`BrowserS3FileSystem\`\` for \`\`s3\`\`, \`\`s3a\`\` and \`\`s3n\`\`.

    All three because a catalogue written for Hadoop or Spark names the other two. \`clobber=True\`
    for the reason \`browser_http\` clobbers: if \`s3fs\` is present it registers first, and its first
    act is to want botocore.
    """
    import browser_http
    import fsspec
    from fsspec.asyn import AsyncFileSystem

    class BrowserS3FileSystem(AsyncFileSystem):
        """Read-only, anonymous \`\`s3://\`\` translated to path-style HTTPS. One object per key."""

        protocol = ("s3", "s3a", "s3n")
        root_marker = ""
        cachable = False
        async_impl = True

        def __init__(self, *args, **storage_options):
            check_options(storage_options)
            self.endpoint_url = endpoint_from(storage_options)

            for name in ("anon", "endpoint_url", "client_kwargs", "config_kwargs", "use_ssl"):
                storage_options.pop(name, None)


            storage_options["asynchronous"] = True
            storage_options.setdefault("loop", browser_http._running_loop())
            super().__init__(*args, **storage_options)

        @classmethod
        def _strip_protocol(cls, path):
            """\`\`s3://bucket/key\`\` -> \`\`bucket/key\`\`.

            The scheme goes, unlike \`browser_http\`: here the endpoint is the object's identity, and
            what remains is what gets appended to it.
            """
            if isinstance(path, (list, tuple)):
                return [cls._strip_protocol(p) for p in path]
            bucket, key = split_path(path)
            return "%s/%s" % (bucket, key) if key else bucket

        @staticmethod
        def _get_kwargs_from_urls(_path):

            return {}

        def url_for(self, path):
            """The HTTPS URL this key is fetched from. Public, because it is what a reader debugs."""
            bucket, key = split_path(path)
            return object_url(self.endpoint_url, bucket, key)

        async def _cat_file(self, path, start=None, end=None, **_kwargs):
            return await browser_http.fetch_bytes(self.url_for(path), start, end)

        async def _exists(self, path, **_kwargs):
            exists, _size = await browser_http.head(self.url_for(path))
            return exists

        async def _info(self, path, **_kwargs):
            url = self.url_for(path)
            exists, size = await browser_http.head(url)
            if not exists:
                raise FileNotFoundError(path)
            info = {"name": self._strip_protocol(path), "type": "file"}
            info["size"] = size
            return info

        async def _isfile(self, path, **_kwargs):
            return await self._exists(path)

        async def _isdir(self, _path, **_kwargs):
            return False

        async def _ls(self, path, detail=True, **_kwargs):
            raise NotImplementedError(NO_LISTING % path)

        async def _find(self, path, **_kwargs):
            raise NotImplementedError(NO_LISTING % path)

        async def _glob(self, path, **_kwargs):
            raise NotImplementedError(NO_LISTING % path)

        async def _pipe_file(self, path, *_args, **_kwargs):
            raise PermissionError("This filesystem is read-only (s3://%s)." % path)

        async def _rm_file(self, path, **_kwargs):
            raise PermissionError("This filesystem is read-only (s3://%s)." % path)

    for scheme in ("s3", "s3a", "s3n"):
        fsspec.register_implementation(scheme, BrowserS3FileSystem, clobber=clobber)
    return BrowserS3FileSystem
`,Nn=`"""On-demand Natural Earth data for Cartopy, in a browser.

Why this exists
---------------
Cartopy draws its coastlines, borders and land polygons from Natural Earth shapefiles that it
downloads on first use. In a browser neither half of that works:

* \`\`urllib.request.urlopen\`\` - which Cartopy's downloader uses - has no socket in Pyodide. It does
  not raise a clear "no network here"; it fails somewhere inside the socket module, and the
  traceback a reader sees has nothing to do with maps.
* \`\`naturalearth.s3.amazonaws.com\`\`, the host Cartopy asks, serves no
  \`\`Access-Control-Allow-Origin\`\` header, so even a working transport would be refused by the
  browser before the bytes arrived. Loosening a Content-Security-Policy does not change that: CORS
  is the server's decision, not the page's.

So a portal could prepare the 110m files and \`\`ax.coastlines()\`\` would work, and the moment a reader
drew a regional map - where Cartopy AUTOMATICALLY selects 50m or 10m - it stopped working, with an
error about sockets.

What this does
--------------
Registers one Cartopy downloader, for one key: \`\`('shapefiles', 'natural_earth')\`\`. It keeps
Cartopy's own path templates, so the lookup order is unchanged - a prepared file under
\`\`CARTOPY_DATA_DIR\`\` is found and nothing is fetched; a file already downloaded this session is
found in Cartopy's own cache; only a genuine miss is fetched, and it is written where Cartopy
expects it so the next draw finds it too.

The two things it replaces are the URL and the transport:

* the URL is the same pinned Natural Earth release the prepared add-on is built from -
  \`\`nvkelso/natural-earth-vector\`\` at a tag, served by raw.githubusercontent.com, which DOES send
  \`\`Access-Control-Allow-Origin: *\`\`. Same data, same version, a host a browser can actually read.
* the transport is \`\`pyodide.ffi.run_sync\`\` over \`\`pyfetch\`\`. Cartopy's downloader API is
  synchronous, so a \`\`fetch\`\` promise cannot be awaited from inside it - and a synchronous
  \`\`XMLHttpRequest\`\`, the usual answer, was measured to BLOCK FOREVER in this Worker. Stack
  switching is the mechanism this package already uses to put a synchronous call on an
  asynchronous fetch; see \`\`_fetch\`\`.

Scope, stated plainly
---------------------
This patches CARTOPY. It does not replace \`\`urllib\`\`, it does not install an opener, and it does not
touch any other library's downloads - a global transport shim would change the behaviour of every
package a visitor installs, which is exactly the kind of invisible difference that makes a browser
Python session untrustworthy.

Nothing here is forced: resolutions, features and a local data directory all keep working as they
do anywhere else, and a deployment that prepares more data simply sees fewer fetches.
"""

from __future__ import annotations

import sys







MIRROR_TEMPLATE = (
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/"
    "v5.1.2/{resolution}_{category}/ne_{resolution}_{name}{extension}"
)







REQUIRED_EXTENSIONS = (".shp", ".shx", ".dbf")
OPTIONAL_EXTENSIONS = (".prj", ".cpg")


class MirrorUnavailable(OSError):
    """A Natural Earth file could not be fetched. Raised with the URL and the status."""


def _fetch(url):
    """Fetch one URL as bytes, synchronously, or raise \`MirrorUnavailable\`.

    SYNCHRONOUS OVER AN ASYNCHRONOUS TRANSPORT, which needs explaining because the obvious answers
    do not work here.

    Cartopy's \`\`Downloader.acquire_resource\`\` is a plain method called from plain plotting code:
    there is no coroutine to await in and no event loop turn available, so \`\`pyfetch\`\` alone returns
    a coroutine that nothing can run. The usual escape is a synchronous \`\`XMLHttpRequest\`\`, which a
    Worker is nominally allowed - and it does not work in this one. Measured, in the shipped console
    under its own deployment policy: \`\`open_url\`\` and a hand-rolled sync XHR both BLOCK FOREVER,
    printing nothing and never returning the Worker to idle. A hang is the worst failure mode
    available, so it is not what this ships.

    What does work is the mechanism this package already depends on for exactly this shape of
    problem: WebAssembly stack switching. \`\`run_sync\`\` suspends the Python stack while a JavaScript
    promise settles, which is how a synchronous Zarr decode calls an asynchronous fetch underneath
    it - see the JSPI note in the Worker's start-up. The same primitive makes a synchronous
    downloader API sit on \`\`pyfetch\`\`.

    Without JSPI this raises rather than hangs, and says which capability is missing. A browser
    without stack switching gets prepared data and no on-demand downloads, which is a smaller
    console than the one this aims at and a working one.
    """
    try:
        from pyodide.ffi import run_sync
        from pyodide.http import pyfetch
    except ImportError as exc:
        raise MirrorUnavailable(
            "Natural Earth data can only be fetched from inside the browser interpreter"
        ) from exc

    async def _get():
        response = await pyfetch(url)
        if response.status != 200:
            raise MirrorUnavailable(f"{url}: HTTP {response.status}")
        return await response.bytes()

    try:
        return run_sync(_get())
    except MirrorUnavailable:
        raise
    except Exception as exc:


        raise MirrorUnavailable(f"{url}: {type(exc).__name__}: {exc}") from exc


def _install_downloader(shapereader):
    """Replace the \`('shapefiles', 'natural_earth')\` downloader with the mirrored one."""
    import cartopy

    key = ("shapefiles", "natural_earth")
    existing = cartopy.config["downloaders"].get(key)
    if existing is None:
        existing = shapereader.NEShpDownloader.default_downloader()

    class MirroredNEDownloader(shapereader.NEShpDownloader):
        """Cartopy's own downloader, with a reachable host and a transport that exists.

        Everything else is inherited, deliberately: \`path()\` still checks the pre-downloaded
        directory first, then the cache, and only then calls \`acquire_resource\` - so the prepared
        add-on still short-circuits every fetch, and a second draw in one session reads the file
        written by the first.
        """

        def url(self, format_dict):
            return MIRROR_TEMPLATE.format(extension=".shp", **format_dict)

        def acquire_resource(self, target_path, format_dict):
            """Fetch the shapefile and its companions beside it, then hand back the path.

            The upstream repository stores the parts UNZIPPED, one file per extension, which is why
            this does not reuse the base class's zip handling: there is no archive to open. The
            files land exactly where Cartopy asked for them, under the names Cartopy expects.
            """
            from pathlib import Path

            target = Path(target_path)
            target.parent.mkdir(parents=True, exist_ok=True)
            stem = target.with_suffix("")

            fetched = {}
            for extension in REQUIRED_EXTENSIONS:
                fetched[extension] = _fetch(
                    MIRROR_TEMPLATE.format(extension=extension, **format_dict)
                )
            for extension in OPTIONAL_EXTENSIONS:
                try:
                    fetched[extension] = _fetch(
                        MIRROR_TEMPLATE.format(extension=extension, **format_dict)
                    )
                except MirrorUnavailable:
                    pass



            for extension, payload in fetched.items():
                stem.with_suffix(extension).write_bytes(payload)
            return str(target)

    mirrored = MirroredNEDownloader(
        url_template=MIRROR_TEMPLATE,
        target_path_template=existing.target_path_template,
        pre_downloaded_path_template=existing.pre_downloaded_path_template,
    )
    cartopy.config["downloaders"][key] = mirrored
    return mirrored


class _ShapereaderFinder:
    """Arm the replacement for the moment \`cartopy.io.shapereader\` is first imported.

    A meta-path finder rather than an import at startup, because importing Cartopy pulls in
    Matplotlib, SciPy and Shapely - several megabytes of wheels that a session which never draws a
    map should not pay for. The engine's whole loading strategy is that the plotting stack arrives
    on the first \`import\`, and this has to not defeat it.

    It answers for exactly one module name and delegates everything else, so no other import in the
    interpreter changes shape because this is installed.
    """

    TARGET = "cartopy.io.shapereader"

    def find_spec(self, fullname, path=None, target=None):
        if fullname != self.TARGET:
            return None
        import importlib.util


        try:
            sys.meta_path.remove(self)
        except ValueError:
            return None
        try:
            spec = importlib.util.find_spec(fullname)
        finally:
            sys.meta_path.insert(0, self)
        if spec is None or spec.loader is None:
            return None
        spec.loader = _AfterExec(spec.loader)
        return spec


class _AfterExec:
    """The real loader, plus one call once the module's own code has run."""

    def __init__(self, inner):
        self._inner = inner

    def create_module(self, spec):
        return self._inner.create_module(spec)

    def exec_module(self, module):
        self._inner.exec_module(module)
        try:
            _install_downloader(module)
        except Exception as exc:
            print(
                "browser-python: Natural Earth downloads are unavailable "
                f"({type(exc).__name__}: {exc}). Prepared data still works.",
                file=sys.stderr,
            )

    def __getattr__(self, name):
        return getattr(self._inner, name)


def install():
    """Arm the adaptation. Idempotent, and cheap when no map is ever drawn.

    Returns a short status string for the ready event: \`"armed"\` when the hook is in place and
    Cartopy has not been imported yet, \`"installed"\` when Cartopy was already loaded and the
    downloader was replaced immediately.
    """
    if any(isinstance(finder, _ShapereaderFinder) for finder in sys.meta_path):
        return "armed"

    if "cartopy.io.shapereader" in sys.modules:

        _install_downloader(sys.modules["cartopy.io.shapereader"])
        return "installed"

    sys.meta_path.insert(0, _ShapereaderFinder())
    return "armed"
`,Sn='"""A Matplotlib backend whose ``show()`` marks figures for the console to collect.\n\nWhy a backend rather than patching ``plt.show`` after the fact.\n\nThe patch used to be applied from ``capture_figures()``, which runs AFTER the user\'s command has\nfinished. On a fresh interpreter that is one command too late::\n\n    import matplotlib.pyplot as plt; plt.plot([1, 4, 9]); plt.show()\n\nHere the import, the plot and the ``show()`` all happen inside a single submission: the real\n``show()`` runs, nothing is marked, the collection that follows finds no marked figures and returns\nnothing - and only then is ``show`` patched. The user\'s first plot silently does not appear, which\nis the worst possible first impression for a plotting console. The same is true of any\n``engine.run()`` whose source both imports pyplot and shows a figure.\n\nMatplotlib resolves its backend when pyplot is first imported, so a backend module is hooked in\nfrom the very first import - there is no window in which the wrong ``show`` is live. ``MPLBACKEND``\nis set to ``module://freva_browser_backend`` in ``rich_display``, before anything can import\nMatplotlib.\n\nDrawing is Agg\'s, unchanged: this is Agg plus a ``show()`` that records which figures the user\nasked to see.\n"""\n\nfrom __future__ import annotations\n\nfrom matplotlib.backends.backend_agg import FigureCanvasAgg, FigureManagerBase\n\nimport rich_display\n\n\nFigureCanvas = FigureCanvasAgg\nFigureManager = FigureManagerBase\n\n\ndef show(*_args, **_kwargs):\n    """Mark every open figure for display. The console renders them after this execution.\n\n    Not a draw. Rendering happens once the command is over, in ``rich_display.capture_figures()``,\n    because that is the point at which the payloads can be handed to the transport. ``show()``\n    only records the intent - which is exactly what it means everywhere else.\n    """\n    from matplotlib import _pylab_helpers\n\n\n    if rich_display.cell_mode():\n        rich_display.show_now()\n        return\n    for manager in _pylab_helpers.Gcf.get_all_fig_managers():\n        rich_display.mark_figure(manager.num)\n',An=`"""Everything that makes \`freva_client\` work in a browser, in one removable file.

This module is the ONLY place in @freva-org/browser-python that knows anything about Freva's
internals. Nothing in the worker, the REPL, the console controller or the other Python helpers
carries an \`if emscripten\` branch for Freva's benefit; if a patch does not fit here, it does not
belong in this package.

It is written to be deleted. Every section below states the upstream problem, the upstream symbol
it touches, and the condition under which the section can be removed. \`tests/\` carries a sunset
check that fails when an upstream version already provides the capability, so the removal condition
is enforced rather than merely documented.

Contract
--------
    install()   idempotent, safe to call more than once, a no-op off Emscripten.

Applied BEFORE the first \`import freva_client\`, because two of the patches replace attributes that
\`freva_client\`'s own modules bind at import time - after the fact is too late.

Supported upstream versions are pinned explicitly. An unknown version fails loudly instead of
patching something that may have moved: a compatibility layer that silently no-ops is worse than
one that is absent, because the failure surfaces somewhere else entirely.

Never logs, prints or returns a token value.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path








SUPPORTED_FREVA_CLIENT = {"2607.1.0", "2607.1.0+browser.1"}
SUPPORTED_OIDC_CLIENT = {"2603.0.1"}

_INSTALLED = False


class CompatError(RuntimeError):
    """Raised when the runtime is not what this adapter was written against."""


def _version(module_name: str) -> str:
    from importlib.metadata import PackageNotFoundError, version

    try:
        return version(module_name)
    except PackageNotFoundError:
        return "(not installed)"


def _check_versions() -> None:
    freva = _version("freva-client")
    oidc = _version("py-oidc-auth-client")
    if freva not in SUPPORTED_FREVA_CLIENT:
        raise CompatError(
            f"freva_client_compat supports freva-client {sorted(SUPPORTED_FREVA_CLIENT)}, "
            f"found {freva!r}. Re-read the patches in src/python/freva_client_compat.py against "
            "the new version before widening this set - each one reaches into an implementation "
            "detail that may have moved or been fixed."
        )
    if oidc not in SUPPORTED_OIDC_CLIENT:
        raise CompatError(
            f"freva_client_compat supports py-oidc-auth-client {sorted(SUPPORTED_OIDC_CLIENT)}, "
            f"found {oidc!r}. See the note above."
        )
































def _patch_get_dirs() -> None:
    from freva_client.utils import databrowser_utils

    config = databrowser_utils.Config
    if getattr(config.get_dirs, "_freva_browser_patch", None) == "CONFIG_GET_DIRS":
        return

    original = config.get_dirs

    def get_dirs(user: bool = True) -> Path:
        """Portable replacement: PYTHONUSERBASE, then ~/.local. Non-user paths are unchanged."""
        if not user:
            return original(user=False)
        base = os.environ.get("PYTHONUSERBASE")
        root = Path(base) if base else Path.home() / ".local"
        return root / "share" / "freva"

    get_dirs._freva_browser_patch = "CONFIG_GET_DIRS"
    get_dirs._freva_browser_original = original
    config.get_dirs = staticmethod(get_dirs)






























def _patch_auth_config() -> None:
    from freva_client import utils as freva_utils

    auth_config = freva_utils.AuthConfig
    if getattr(auth_config.__init__, "_freva_browser_patch", None) == "AUTH_CONFIG_PORTS":
        return

    original_init = auth_config.__init__

    def __init__(self, host, _redirect_ports=None):
        """Upstream's constructor with the /auth-ports probe removed. No network at all.

        \`Config\` and \`TokenStore\` are read off the upstream MODULE rather than imported here, and
        that is not fussiness. There are two classes called \`Config\` in this codebase - the OIDC
        client's, which \`freva_client.utils\` binds at line 12, and Freva's own in
        \`databrowser_utils\` - and they take different arguments. Importing "the" Config by name got
        the wrong one and produced

            TypeError: Config.__init__() got an unexpected keyword argument 'app_name'

        Reading the symbol the module itself resolved cannot pick the wrong one.
        """
        module = sys.modules["freva_client.utils"]
        self.token_db = module.TokenStore(app_name=self.app_name)
        host = self.get_rest_host(host)


        self.config = module.Config(host, app_name=self.app_name)

    __init__._freva_browser_patch = "AUTH_CONFIG_PORTS"
    __init__._freva_browser_original = original_init
    auth_config.__init__ = __init__






































_INTAKE_FALLBACK_MESSAGE = (
    "intake_catalogue() is not included in the browser profile because\\n"
    "intake-esm's dependency set is incompatible with this Pyodide runtime.\\n"
    "Use the standard Freva Python environment for this feature."
)


def _intake_message() -> str:
    try:
        from freva_client.utils import lazy

        return lazy._BROWSER_UNSUPPORTED["intake_esm"]
    except Exception:
        return _INTAKE_FALLBACK_MESSAGE


def _patch_intake_catalogue() -> None:
    from freva_client import query

    databrowser = query.databrowser
    if getattr(databrowser.intake_catalogue, "_freva_browser_patch", None) == "INTAKE_CATALOGUE":
        return

    original = databrowser.intake_catalogue
    message = _intake_message()

    def intake_catalogue(self, *args, **kwargs):
        """Refuse before doing any work. See the block comment above."""
        raise NotImplementedError(message)

    intake_catalogue.__doc__ = original.__doc__
    intake_catalogue._freva_browser_patch = "INTAKE_CATALOGUE"
    intake_catalogue._freva_browser_original = original
    databrowser.intake_catalogue = intake_catalogue









































def _patch_flavour() -> None:
    from freva_client.utils import databrowser_utils

    config = databrowser_utils.Config
    if getattr(config.flavour, "fget", None) is None:
        return
    if getattr(config.flavour.fget, "_freva_browser_patch", None) == "CONFIG_FLAVOUR":
        return

    original = config.flavour

    def flavour(self):
        """Upstream's property, with a fallback that catches the browser's failure - quietly.

        The probe's stderr is captured, and that is not cosmetics for its own sake. A failed fetch
        writes \`pyodide.ffi.JsException: TypeError: Failed to fetch\` to stderr even when the
        exception is caught here and handled exactly as upstream intends, and the console renders
        any stderr in red with a gutter rule. So \`databrowser(host=...)\` SUCCEEDED and looked like a
        crash - the object was built, \`_flavour\` was "freva", and the transcript showed a red
        traceback line above it. Reporting a handled, expected condition as an error is how a
        working console teaches people not to trust it.

        Only this one probe is silenced, and only its stderr; a real failure still raises, and every
        other stream is untouched.
        """
        import contextlib
        import io

        if getattr(self, "_flavour", None):
            return self._flavour
        try:
            with contextlib.redirect_stderr(io.StringIO()):
                flavours = self.overview.get("flavours", [])
            self._flavour = flavours[0] if flavours else "freva"
        except Exception:



            self._flavour = "freva"
        return self._flavour

    flavour._freva_browser_patch = "CONFIG_FLAVOUR"
    flavour._freva_browser_original = original
    config.flavour = property(flavour)

























































NO_TOKEN_MESSAGE = (
    "No valid browser authentication token.\\n"
    'Run: await freva_client.authenticate(host="...")'
)

REFRESH_NEEDS_AWAIT_MESSAGE = (
    "The cached access token has expired and only a refresh token remains.\\n"
    "Refreshing needs the network, which a synchronous call cannot do here.\\n"
    'Run: await freva_client.authenticate(host="...")'
)


_TOKEN_CACHE: dict = {}


def _auth_config(host=None, token_file=None):
    """Upstream's own AuthConfig, so host normalisation stays upstream's business."""
    from freva_client.utils import AuthConfig

    if token_file:
        from freva_client.utils.databrowser_utils import Config as FrevaConfig

        return AuthConfig.from_token_file(FrevaConfig(host).api_url, token_file)
    return AuthConfig(host)


async def _browser_authenticate(host=None, *, token_file=None, force=False, timeout=180, **_ignored):
    """The browser profile's \`authenticate\`: awaitable, device flow, no event-loop bridge."""
    from py_oidc_auth_client.flows import DeviceFlow

    auth = _auth_config(host=host, token_file=token_file)
    api_url = auth.config.host
    flow = DeviceFlow(api_url, store=auth.token_db, timeout=timeout, interactive=False)
    token = await flow.authenticate(force=force, auto_open=False)
    _TOKEN_CACHE[api_url] = token
    await _flush_storage()
    return token


async def _flush_storage() -> None:
    """Push IDBFS writes to IndexedDB, if the host mounted it.

    IDBFS keeps writes in memory until \`syncfs\`, so a token written and never flushed is a token
    that does not survive the reload it was persisted for. The worker installs
    \`_freva_browser_syncfs\` only when the host opted into persistence; without it this is a no-op
    and the session is simply in-memory.
    """
    try:
        import js

        flush = getattr(js, "_freva_browser_syncfs", None)
    except Exception:
        flush = None
    if flush is None:
        return
    try:
        result = flush()
        if hasattr(result, "__await__"):
            await result
    except Exception:


        pass


def persistence_available() -> bool:
    """Whether the host mounted persistent storage. Reported, never assumed."""
    try:
        import js

        return getattr(js, "_freva_browser_syncfs", None) is not None
    except Exception:
        return False


def _cached_token(host=None, *_args, **kwargs):
    """The synchronous bridge: a cached, unexpired token, or a clear instruction. Never network.

    Accepts both shapes upstream calls it with - \`authenticate(host=...)\` from
    \`Config.auth_headers\`, and \`authenticate(host, redirect_ports=..., store=..., app_name=...)\`
    from \`databrowser._authenticate\` - and ignores the arguments that only matter to a real login.
    """
    from py_oidc_auth_client.utils import choose_token_strategy

    host = host or kwargs.get("host")
    auth = _auth_config(host=host)
    api_url = auth.config.host

    token = _TOKEN_CACHE.get(api_url) or auth.token_db.get(api_url) or None
    strategy = choose_token_strategy(token or None)
    if strategy == "use_token" and token:
        _TOKEN_CACHE[api_url] = token
        return token
    if strategy == "refresh_token":
        raise RuntimeError(REFRESH_NEEDS_AWAIT_MESSAGE)
    raise RuntimeError(NO_TOKEN_MESSAGE)


def _patch_authenticate() -> None:
    import freva_client
    from freva_client import auth as freva_auth
    from freva_client import query
    from freva_client.utils import databrowser_utils

    if getattr(freva_auth.authenticate, "_freva_browser_patch", None) == "AUTHENTICATE_ASYNC":
        return

    _browser_authenticate._freva_browser_patch = "AUTHENTICATE_ASYNC"
    _cached_token._freva_browser_patch = "TOKEN_BRIDGE"


    freva_auth.authenticate = _browser_authenticate
    freva_client.authenticate = _browser_authenticate



    databrowser_utils.authenticate = _cached_token
    query.authenticate = _cached_token


def cached_token_hosts() -> list:
    """Which hosts have a token in the in-memory cache. Hosts only - never token values."""
    return sorted(_TOKEN_CACHE)



def install() -> None:
    """Apply every browser patch. Idempotent; a no-op off Emscripten."""
    global _INSTALLED
    if sys.platform != "emscripten":
        return
    if _INSTALLED:
        return
    _check_versions()
    _patch_get_dirs()
    _patch_auth_config()
    _patch_flavour()
    _patch_intake_catalogue()
    _patch_authenticate()
    _INSTALLED = True


def installed_patches() -> list[str]:
    """Which patches are live. Used by the tests and by the sunset check."""
    from freva_client import utils as freva_utils
    from freva_client.utils import databrowser_utils

    live = []
    if getattr(databrowser_utils.Config.get_dirs, "_freva_browser_patch", None):
        live.append("CONFIG_GET_DIRS")
    if getattr(freva_utils.AuthConfig.__init__, "_freva_browser_patch", None):
        live.append("AUTH_CONFIG_PORTS")
    if getattr(getattr(databrowser_utils.Config.flavour, "fget", None), "_freva_browser_patch", None):
        live.append("CONFIG_FLAVOUR")
    from freva_client import query

    if getattr(query.databrowser.intake_catalogue, "_freva_browser_patch", None):
        live.append("INTAKE_CATALOGUE")
    from freva_client import auth as freva_auth
    from freva_client.utils import databrowser_utils

    if getattr(freva_auth.authenticate, "_freva_browser_patch", None):
        live.append("AUTHENTICATE_ASYNC")
    if getattr(databrowser_utils.authenticate, "_freva_browser_patch", None) and getattr(
        query.authenticate, "_freva_browser_patch", None
    ):
        live.append("TOKEN_BRIDGE")
    return live
`,Rn=`"""The display bridge: turn Matplotlib figures into protocol payloads.

Matplotlib's default Pyodide backend draws into a canvas and therefore reaches for \`\`document\`\` and
\`\`window\`\`. Neither exists in a Worker, so the first \`\`import matplotlib.pyplot\`\` there fails with
\`\`ReferenceError: window is not defined\`\` - and it fails at IMPORT, before any user code has had a
chance to choose a backend. \`\`MPLBACKEND\`\` is read when the library first configures itself, so the
only reliable place to set it is here, before anything can import Matplotlib.

Nothing in this module imports Matplotlib. That is deliberate: a wheel that is only needed by people
who plot should be fetched when they plot, not during startup because plotting is *supported*.
\`\`figures_pending()\`\` answers "has anyone imported it yet" by looking in \`\`sys.modules\`\`, which is
free.
"""

from __future__ import annotations

import base64
import io
import os
import sys








os.environ.setdefault("MPLBACKEND", "module://freva_browser_backend")



_FORMAT = "png"
_MIME = "image/png"


def matplotlib_imported():
    """True once the user's code has actually imported pyplot. Costs one dict lookup."""
    return "matplotlib.pyplot" in sys.modules


_MARKED = set()
"""Figure numbers that \`plt.show()\` asked to display, cleared each time they are collected."""


def mark_figure(number):
    """Record that the user asked to see this figure. Called by the backend's \`\`show()\`\`."""
    _MARKED.add(int(number))


def _configure(pyplot):
    """Belt and braces: make \`\`plt.show()\`\` mark figures even if the backend is not ours.

    The backend does this properly, from Matplotlib's first import. This stays for the case where a
    consumer sets \`\`MPLBACKEND\`\` themselves, or replaces \`\`plt.show\`\` in their own code - it costs a
    dict lookup per execution and means the console still behaves if the backend is not in play.
    Under plain Agg it also silences \`\`FigureCanvasAgg is non-interactive, and thus cannot be
    shown\`\`, a warning that is right for a script and wrong here.
    """
    if getattr(pyplot, "_freva_browser_python_patched", False):
        return

    def _show(*_args, **_kwargs):
        """Mark every open figure for display. The console renders them after this execution."""
        for number in pyplot.get_fignums():
            mark_figure(number)

    pyplot.show = _show
    pyplot._freva_browser_python_patched = True


def capture_figures():
    """Render the figures that \`\`show()\`\` asked for, and return protocol-shaped dicts.

    Explicit show, and this is a deliberate change from rendering-and-closing everything open.

    The old rule - after every command, draw all open figures and close them - made the one-liner
    work and made everything else impossible. A figure is normally BUILT over several commands::

        fig, ax = plt.subplots()
        ax.plot(temperature)
        ax.set_title("2m air temperature")
        plt.show()

    Under the old rule the first line displayed an empty pair of axes and then closed the figure, so
    \`ax\` referred to something detached and the next two commands drew into nothing. Every plot had
    to be a single pasted block, which is not what a console is for.

    Now \`plt.show()\` marks what to display, exactly as it does in any other Python session, and only
    marked figures are rendered and closed. A figure nobody showed stays open and stays yours.

    The cost is that a bare \`plt.plot(...)\` no longer draws anything by itself - \`plt.show()\` is
    required, as it is outside a notebook. The gain is that building a figure across several
    commands works at all. Unshown figures do accumulate; Matplotlib's own \`figure.max_open_warning\`
    is what warns about that, and it is left in place rather than second-guessed here.

    Returns \`\`[]\`\` - never raises - when Matplotlib was never imported, which is the common case and
    is checked on every execution.
    """
    if not matplotlib_imported():
        return []

    import matplotlib.pyplot as plt

    _configure(plt)

    rendered = []


    open_now = set(plt.get_fignums())
    wanted = sorted(_MARKED & open_now)
    _MARKED.clear()
    for number in wanted:
        figure = plt.figure(number)
        buffer = io.BytesIO()
        try:
            figure.savefig(buffer, format=_FORMAT, bbox_inches="tight")
        except Exception as exc:
            plt.close(figure)
            rendered.append(
                {
                    "mime": "text/plain",
                    "encoding": "utf8",
                    "data": "Figure %d could not be rendered: %s" % (number, exc),
                    "metadata": {"figure": number},
                }
            )
            continue

        size = figure.get_size_inches() * figure.dpi
        plt.close(figure)
        rendered.append(
            {
                "mime": _MIME,
                "encoding": "base64",
                "data": base64.b64encode(buffer.getvalue()).decode("ascii"),
                "metadata": {
                    "figure": number,
                    "width": int(size[0]),
                    "height": int(size[1]),
                },
            }
        )
    return rendered








TEXT_LIMIT = 256 * 1024
HTML_LIMIT = 1024 * 1024
SVG_LIMIT = 4 * 1024 * 1024
PNG_BYTES_LIMIT = 18 * 1024 * 1024
BUNDLE_LIMIT = 24 * 1024 * 1024

_TEXT_MIMES = {"text/plain": TEXT_LIMIT, "text/html": HTML_LIMIT, "image/svg+xml": SVG_LIMIT}
_REPR_METHODS = (
    ("text/html", "_repr_html_"),
    ("image/svg+xml", "_repr_svg_"),
    ("image/png", "_repr_png_"),
)
_PNG_SIGNATURE = b"\\x89PNG\\r\\n\\x1a\\n"

_publisher = None
_cell_mode = False


def set_publisher(callback):
    """The worker's sink for bundles: called with one JSON string per message."""
    global _publisher
    _publisher = callback


def _publish(message):
    import json

    if _publisher is None:
        return False
    _publisher(json.dumps(message, ensure_ascii=False, separators=(",", ":")))
    return True


def begin_cell():
    global _cell_mode
    _cell_mode = True
    _MARKED.clear()


def end_cell():
    global _cell_mode
    _cell_mode = False


def cell_mode():
    return _cell_mode


def _mib(n):
    return "%.1f MiB" % (n / 1048576) if n >= 1048576 else "%d KiB" % max(1, round(n / 1024))


def _method(obj, name):
    """A repr method of the object's TYPE: \`__getattr__\` that answers every name is not a repr."""
    if isinstance(obj, type):
        return None
    try:
        if getattr(type(obj), name, None) is None:
            return None
        found = getattr(obj, name)
    except Exception:
        return None
    return found if callable(found) else None


def _numbers(meta):
    out = {}
    if isinstance(meta, dict):
        for key in ("width", "height"):
            value = meta.get(key)
            if isinstance(value, (int, float)) and not isinstance(value, bool):
                if 0 < value <= 100000:
                    out[key] = value
    return out


class _Bundle:
    def __init__(self, label):
        self.label = label
        self.data = {}
        self.metadata = {}
        self.problems = []
        self.size = 0

    def add(self, mime, value, meta=None):
        if mime in self.data or value is None:
            return
        if mime == "image/png":
            if isinstance(value, (bytes, bytearray, memoryview)):
                raw = bytes(value)
                if len(raw) > PNG_BYTES_LIMIT:
                    return self._over(mime, len(raw), PNG_BYTES_LIMIT)
                if not raw.startswith(_PNG_SIGNATURE):
                    return self.problems.append("%s: image/png is not a PNG" % self.label)
                text = base64.b64encode(raw).decode("ascii")
            elif isinstance(value, str):
                text = value.replace("\\n", "")
                if len(text) > PNG_BYTES_LIMIT * 4 // 3 + 4:
                    return self._over(mime, len(text) * 3 // 4, PNG_BYTES_LIMIT)
            else:
                return self.problems.append("%s: image/png must be bytes" % self.label)
        else:
            if mime == "image/svg+xml" and isinstance(value, (bytes, bytearray)):
                if len(value) > SVG_LIMIT:
                    return self._over(mime, len(value), SVG_LIMIT)
                value = bytes(value).decode("utf-8", "replace")
            if not isinstance(value, str):
                return self.problems.append(
                    "%s: %s must be text, not %s" % (self.label, mime, type(value).__name__)
                )
            limit = _TEXT_MIMES[mime]
            if len(value) > limit:
                return self._over(mime, len(value), limit)
            text = value
        if self.size + len(text) > BUNDLE_LIMIT:
            return self._over(mime, self.size + len(text), BUNDLE_LIMIT, "this output")
        self.size += len(text)
        self.data[mime] = text
        numbers = _numbers(meta)
        if numbers:
            self.metadata[mime] = numbers

    def _over(self, mime, size, limit, what=None):
        self.problems.append(
            "%s: %s is %s, over the %s limit for %s; showing a simpler form"
            % (self.label, mime, _mib(size), _mib(limit), what or "one representation")
        )

    def broken(self, method, exc):
        self.problems.append(
            "%s.%s() raised %s: %s; showing a simpler form"
            % (self.label, method, type(exc).__name__, _short(exc))
        )


def _short(exc):
    try:
        text = str(exc)
    except Exception:
        text = "<unprintable>"
    return text if len(text) <= 300 else text[:300] + "..."


def _plain(obj):
    try:
        from pyodide.console import repr_shorten

        return repr_shorten(obj, limit=4000)
    except Exception as exc:
        return "<unrepresentable %s: %s>" % (type(obj).__name__, _short(exc))


def format_bundle(obj):
    """MIME bundle for one object: \`_repr_mimebundle_\`, then \`_repr_html_\`, \`_repr_svg_\`,
    \`_repr_png_\`, a Matplotlib figure as PNG, and always a plain-text fallback."""
    bundle = _Bundle(type(obj).__name__)
    method = _method(obj, "_repr_mimebundle_")
    if method is not None:
        try:
            try:
                result = method(include=None, exclude=None)
            except TypeError:
                result = method()
        except Exception as exc:
            bundle.broken("_repr_mimebundle_", exc)
            result = None
        meta = {}
        if isinstance(result, tuple) and len(result) == 2:
            result, meta = result
        if isinstance(result, dict):
            for mime in ("text/plain", "text/html", "image/svg+xml", "image/png"):
                if mime in result:
                    bundle.add(mime, result[mime], meta.get(mime) if isinstance(meta, dict) else None)
    for mime, name in _REPR_METHODS:
        if mime in bundle.data:
            continue
        method = _method(obj, name)
        if method is None:
            continue
        try:
            value = method()
        except Exception as exc:
            bundle.broken(name, exc)
            continue
        meta = None
        if isinstance(value, tuple) and len(value) == 2:
            value, meta = value
        bundle.add(mime, value, meta)
    if "image/png" not in bundle.data and _is_figure(obj):
        try:
            png, meta = _figure_png(obj)
            bundle.add("image/png", png, meta)
        except Exception as exc:
            bundle.broken("savefig", exc)
    if not isinstance(bundle.data.get("text/plain"), str):
        bundle.data.pop("text/plain", None)
        bundle.data["text/plain"] = _plain(obj)[:TEXT_LIMIT]
    return bundle


def _is_figure(obj):
    module = sys.modules.get("matplotlib.figure")
    return module is not None and isinstance(obj, getattr(module, "Figure", ()))


def _figure_png(figure):
    buffer = io.BytesIO()
    figure.savefig(buffer, format=_FORMAT, bbox_inches="tight")
    size = figure.get_size_inches() * figure.dpi
    return buffer.getvalue(), {"width": int(size[0]), "height": int(size[1])}


def _report(problems):
    for problem in problems:
        sys.stderr.write("[display] %s\\n" % problem)


def _emit(kind, bundle, extra=None):
    _report(bundle.problems)
    message = {"output": kind, "data": bundle.data}
    if bundle.metadata:
        message["metadata"] = bundle.metadata
    if extra:
        message.update(extra)
    return _publish(message)


def publish_result(value, count):
    """The cell's last expression, as \`execute_result\`."""
    _emit("execute_result", format_bundle(value), {"executionCount": count})


def display(*objs, raw=False, metadata=None, clear=False, **_ignored):
    """Show objects below the running code, like IPython's \`\`display\`\`.

    \`\`raw=True\`\` takes ready-made bundles (\`\`{"text/html": ...}\`\`). Only text/plain, text/html,
    image/svg+xml and image/png are carried; anything else is dropped.
    """
    if clear:
        clear_output(wait=True)
    for obj in objs:
        if raw:
            bundle = _Bundle("display(raw=True)")
            if isinstance(obj, dict):
                for mime in ("text/plain", "text/html", "image/svg+xml", "image/png"):
                    if mime in obj:
                        bundle.add(mime, obj[mime], (metadata or {}).get(mime))
            if "text/plain" not in bundle.data:
                bundle.data["text/plain"] = "<%d representation(s)>" % len(bundle.data)
        else:
            bundle = format_bundle(obj)
        if not _emit("display_data", bundle):
            print(bundle.data.get("text/plain", ""))


def clear_output(wait=False):
    """Clear this cell's output, now or (\`\`wait=True\`\`) when the next output arrives."""
    _publish({"output": "clear_output", "wait": bool(wait)})


def show_now():
    """\`plt.show()\` in a notebook cell: draw every open figure here, in order, then close it."""
    flush_figures()


def flush_figures():
    """End of a cell: display every open figure and close it, as IPython's inline backend does."""
    if not matplotlib_imported():
        return
    import matplotlib.pyplot as plt

    for number in plt.get_fignums():
        figure = plt.figure(number)
        bundle = _Bundle("Figure %d" % number)
        try:
            png, meta = _figure_png(figure)
            bundle.add("image/png", png, meta)
        except Exception as exc:
            bundle.broken("savefig", exc)
        finally:
            plt.close(figure)
        bundle.data["text/plain"] = "<Figure %d>" % number
        _emit("display_data", bundle)


def install_builtins():
    """\`display\` and \`clear_output\` without an import, as in Jupyter."""
    import builtins

    builtins.display = display
    builtins.clear_output = clear_output
`,Ie=[["_freva_bridge.py",vn],["browser_http.py",xn],["browser_s3.py",Tn],["cartopy_data.py",Nn],["freva_browser_backend.py",Sn],["freva_client_compat.py",An],["rich_display.py",Rn]];var X="/freva",pe={minimal:[],"xarray-zarr":["xarray","zarr","fsspec","numcodecs","cftime","micropip"],"freva-client":["xarray","zarr","fsspec","numcodecs","cftime","micropip","requests","pyyaml","pandas","rich","pygments","tomli","setuptools","click","typing-extensions","httpx","platformdirs"]},Pe={minimal:[],"xarray-zarr":["xarray","zarr","fsspec","numcodecs","cftime","numpy","micropip"],"freva-client":["xarray","zarr","fsspec","numcodecs","cftime","numpy","micropip","freva_client","py_oidc_auth_client"]},k=class extends Error{reason;constructor(e,n,r){super(e,r===void 0?void 0:{cause:r}),this.name="RuntimeError",this.reason=n}};function Ce(){return typeof WebAssembly>"u"?"no-webassembly":null}function fe(){return typeof WebAssembly.Suspending=="function"}async function De(t){let e=new URL("pyodide.mjs",t.indexURL).href,n;try{n=(await import(e)).loadPyodide}catch(r){throw new k(`Could not load the Python runtime from ${e}. Check that the URL is reachable and CORS-enabled, or set pyodide.indexURL to a copy you host.`,"runtime-unreachable",r)}if(typeof n!="function")throw new k(`${e} did not export loadPyodide; this does not look like a Pyodide distribution.`,"runtime-unreachable");return n({indexURL:t.indexURL,...t.packageBaseURL!==void 0?{packageBaseUrl:t.packageBaseURL}:{},stdout:t.onStdout,stderr:t.onStderr})}var J={progress:/^Load(?:ing|ed) [\w.-]+(?:, [\w.-]+)*$/,redundant:/^[\w.-]+ already loaded from .+$/,nothing:"No new packages to load"};function Le(t,e){let n=t.trim();return n?n===J.nothing||J.redundant.test(n)||e==="starting"&&J.progress.test(n)?"":J.progress.test(n)?`${n}
`:t:t}function Fe(t){let e=/the following error occurred while loading ([^:]+):/gi,n=e.exec(t);if(!n)return t;let r=t.slice(0,n.index),a=[],s=new Set,i=-1,h=n;for(;h!==null;){if(i>=0){let f=t.slice(i,h.index).trim();f&&s.add(f)}a.push((h[1]??"").trim()),i=h.index+h[0].length,h=e.exec(t)}let l=t.slice(i).trim();l&&s.add(l);let c=s.size>0?`: ${[...s].join("; ")}`:"";return`${r}Could not download ${a.join(", ")}${c}
`}function On(t){let e=new Set;for(let a of t.join(`
`).split(`
`)){let s=a.replace(/the following error occurred while loading [^:]*:/gi," ").trim();s&&!e.has(s)&&e.add(s)}let n=[...e][0];if(!n)return"";let r=n.length>100?`${n.slice(0,99).trimEnd()}\u2026`:n;return` ${r.endsWith(".")?r:`${r}.`}`}async function Z(t,e,n,r="The interpreter started, but"){if(e.length===0)return;let a=[],s=await t.loadPackage([...e],{errorCallback:f=>a.push(f)}),i=new Set((Array.isArray(s)?s:[]).map(f=>String(f?.name??"").toLowerCase()));for(let f of Object.keys(t.loadedPackages??{}))i.add(f.toLowerCase());let h=e.filter(f=>!i.has(f.toLowerCase()));if(h.length===0)return;let l=On(a),c=h.length===e.length?"none of its packages could be downloaded":`${h.length} of its ${e.length} packages could not be downloaded`;throw new k(`${r} ${c}: ${h.join(", ")}.${l}
They are fetched from ${n}. Either that location is not serving the wheels, or it cannot be reached from this page.`,"packages-unreachable")}var In="freva_client-2607.1.0+browser.1-py3-none-any.whl";async function Me(t,e){let n=e.endsWith("/")?e:`${e}/`,r=["import micropip",`await micropip.install(${JSON.stringify(`${n}${In}`)})`,""].join(`
`);try{await t.runPythonAsync(r)}catch(a){let s=x(a);throw new k(C({resource:"wheelhouse",kind:"install",url:n,...s?{underlying:s}:{}}),"packages-unreachable",a)}}var U="/home/pyodide/.freva-browser";async function $e(t,e){let n=s=>new Promise((i,h)=>{t.FS.syncfs(s,l=>l?h(l):i())}),r=()=>{delete globalThis._freva_browser_syncfs};try{t.FS.mkdirTree(U),t.FS.mount(t.FS.filesystems.IDBFS,{},U),await n(!0)}catch{return r(),!1}t.runPython(["import os",`os.environ["XDG_CACHE_HOME"] = ${JSON.stringify(`${U}/cache`)}`,`os.environ["XDG_CONFIG_HOME"] = ${JSON.stringify(`${U}/config`)}`,`os.environ["PYTHONUSERBASE"] = ${JSON.stringify(`${U}/user`)}`,"for _p in (os.environ['XDG_CACHE_HOME'], os.environ['XDG_CONFIG_HOME'], os.environ['PYTHONUSERBASE']):","    os.makedirs(_p, exist_ok=True)",""].join(`
`));let a=async()=>{try{return await n(!1),!0}catch(s){return r(),e?.(s),!1}};return globalThis._freva_browser_syncfs=a,!!await a()}function je(t){t.FS.mkdirTree(X);for(let[e,n]of Ie)t.FS.writeFile(`${X}/${e}`,n);t.runPython(`import sys
if ${JSON.stringify(X)} not in sys.path: sys.path.insert(0, ${JSON.stringify(X)})`)}var Pn="/freva-addons",me=t=>`${Pn}/${t}`;function ze(t){let e=K[t];if(!e)throw new k(`Unknown add-on '${t}'.`,"packages-unreachable");return e}function We(t){return new URL("../python-addons/",t).href}var L=class extends Error{failure;constructor(e){super(C(e)),this.name="AddonFailure",this.failure=e}},Cn=t=>[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,"0")).join("");async function Be(t,e,n){let r=l=>{throw new L({...n,url:t,...l})},a=globalThis.crypto?.subtle;if(!a)throw new L({...n,url:t,kind:"unsupported",underlying:"this context has no Web Crypto, so an artefact cannot be verified - serve the portal over HTTPS, or from localhost. An unverified wheel is not installed."});let s;try{s=await fetch(t,{credentials:"omit"})}catch(l){return r({kind:"unreachable",...x(l)?{underlying:x(l)}:{}})}if(!s.ok)return r({kind:"unavailable",status:s.status});let i=new Uint8Array(await s.arrayBuffer()),h=Cn(await a.digest("SHA-256",i));return h!==e?r({kind:"mismatch",digests:{expected:e,received:h}}):i}function He(t,e,n){let r=e.lastIndexOf("/");r>0&&t.FS.mkdirTree(e.slice(0,r)),t.FS.writeFile(e,n)}var Dn={dask:()=>["import os","os.environ['DASK_SCHEDULER'] = 'synchronous'","import dask","dask.config.set(scheduler='synchronous')",""].join(`
`),"cartopy-natural-earth-110m":t=>["import os",`os.environ['CARTOPY_DATA_DIR'] = ${JSON.stringify(t)}`,""].join(`
`)};function Ln(t){return`Prepare the files with \`freva-browser-python prepare-addons --addons ${t}\` and serve them from the directory pythonPlayground.addonBaseUrl (addonBaseURL in the API) names.`}async function Ye(t,e){let n=ue.filter(l=>e.addons.includes(l));if(n.length===0)return{prepared:[],unavailable:[]};let r=new Set(e.optional??[]);for(let l of r)if(n.includes(l)&&!H(l))throw new k(`The '${l}' add-on cannot be optional.
It installs wheels into the interpreter, so a failure part-way through would leave a session holding some of its dependencies and not the capability. There is no supported way to undo that in a live interpreter, so this add-on is required or absent, never best-effort. Remove it from optionalAddons, or stop configuring it.`,"packages-unreachable");let a=e.addonBaseURL.endsWith("/")?e.addonBaseURL:`${e.addonBaseURL}/`,s=[],i=[],h=[];for(let l of n){let c=ze(l),f=r.has(l),p={resource:"addon",addon:l,...f?{optional:!0}:{}};if(!c.profiles.includes(e.profile))throw new k(`The '${l}' add-on does not work with the '${e.profile}' profile.
It is available on: ${c.profiles.join(", ")}.`,"packages-unreachable");e.onStatus?.(`preparing ${l}`);try{let o=[];for(let u of c.wheels)o.push({file:u.file,bytes:await Be(`${a}${l}/${u.file}`,u.sha256,{...p,artefact:`${u.name} ${u.version}`})});let d=[];for(let u of c.data)d.push({path:u.path,bytes:await Be(`${a}${l}/${u.path}`,u.sha256,{...p,artefact:u.path})});c.runtimePackages.length>0&&await e.loadPackages(c.runtimePackages,`the '${l}' add-on`);for(let u of o){let w=`${me(l)}/wheels/${u.file}`;He(t,w,u.bytes);try{await t.runPythonAsync(`import micropip
await micropip.install("emfs:${w}", deps=False)
`)}catch(y){let v=x(y);throw new L({...p,artefact:u.file,kind:"install",...v?{underlying:v}:{}})}}for(let u of d)He(t,`${me(l)}/${u.path}`,u.bytes);let m=Dn[l];if(m)try{await t.runPythonAsync(m(me(l)))}catch(u){let w=x(u);throw new L({...p,kind:"install",artefact:"its activation",...w?{underlying:w}:{}})}s.push({id:l,title:c.title,versions:{}})}catch(o){if(!(o instanceof L))throw o;if(!f){h.push(o.failure);continue}i.push({id:l,title:c.title,reason:Ue(C(o.failure)),remedy:Ln(l),retryMayHelp:ce(o.failure)}),e.onWarning?.(`${c.title} is unavailable: ${Ue(C(o.failure))} Python started without it.`)}}if(h.length>0)throw new k(B(h),"packages-unreachable");return{prepared:s,unavailable:i}}function Ue(t){return t.split(`
`)[0]??t}function Ge(t,e){return t.map(n=>({...n,versions:e(ze(n.id).reports)}))}var Q=class{#t;#e;#o=new Map;constructor(e,n){this.#t=e,this.#e=n}settle(e,n){let r=this.#t.list(),a=[],s=[],i=new Map;for(let c of r){let f={generation:c.generation,state:c.state};i.set(c.name,f);let p=this.#o.get(c.name);p?(p.generation!==f.generation||p.state!==f.state)&&s.push(c.name):a.push(c.name)}let h=[...this.#o.keys()].filter(c=>!i.has(c));this.#o=i,!(a.length===0&&s.length===0&&h.length===0&&n===void 0)&&this.#e({kind:"artifacts",...n!==void 0?{id:n}:{},...e!==void 0?{executionId:e}:{},artifacts:r,added:a,updated:s,removed:h})}};var Fn={csv:"text/csv",tsv:"text/tab-separated-values",json:"application/json",txt:"text/plain",md:"text/markdown",py:"text/x-python",yaml:"text/yaml",yml:"text/yaml",log:"text/plain",xml:"application/xml",html:"text/html",htm:"text/html",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",bmp:"image/bmp",wav:"audio/wav",mp3:"audio/mpeg",ogg:"audio/ogg",flac:"audio/flac",mp4:"video/mp4",webm:"video/webm",zip:"application/zip",gz:"application/gzip",tar:"application/x-tar",nc:"application/x-netcdf",h5:"application/x-hdf5",hdf5:"application/x-hdf5",parquet:"application/vnd.apache.parquet",npy:"application/x-npy",npz:"application/x-npz",pdf:"application/pdf"};function ee(t){let e=t.lastIndexOf("."),n=e>=0?t.slice(e+1).toLowerCase():"";return Fn[n]??"application/octet-stream"}var Mn=new Set(["text/html","image/svg+xml","application/xhtml+xml","application/xml","text/xml","application/pdf"]);function $n(t){return Mn.has(t)}function Ve(t){return $n(t)?"application/octet-stream":t}var ne=".freva-import-";function qe(t){let e=t.split("/");if(t.length===0)return"it is empty";if(t.length>1024)return"it is longer than 1024 characters";if(e.length>16)return"it is nested deeper than 16 levels";for(let n of e){if(n===""||n==="."||n==="..")return"it has an empty, '.' or '..' part";if(n.length>255)return"a part is longer than 255 characters";if(n.startsWith(ne))return"it uses a reserved name";if(/[\u0000-\u001f\u007f\\]/.test(n))return"it contains a control character or '\\'"}return null}function Bn(t){let e=qe(t);if(e)throw new Error(`${JSON.stringify(t)} is not a valid workspace file name: ${e}.`);return t.split("/")}var _e=()=>Object.create(null),N=Object.freeze(Object.create(null)),Ke="browser-python-workspace",A="/workspace",Hn=64,Xe=4*1024*1024,Je=8*1024*1024,Un=["EACCES","EBADF","EBUSY","EINTR","EINVAL","EIO","EISDIR","EMFILE","ENOENT","ENOSPC","ENOTDIR","ENOTEMPTY","EPERM"];function zn(t){let e=t,n=e.ERRNO_CODES??e._module?.ERRNO_CODES??e._api?._module?.ERRNO_CODES;if(!n)throw new Error("This Pyodide build does not expose ERRNO_CODES. The browser workspace refuses to guess errno values, because the wrong number turns a full disk into an invalid argument.");let r=Un.filter(a=>!Number.isInteger(n[a]));if(r.length>0)throw new Error(`This Pyodide build's ERRNO_CODES is missing ${r.join(", ")}. The browser workspace raises every one of them, and an undefined errno produces an OSError a caller cannot branch on, so it refuses to start rather than reporting the wrong failure later.`);return n}function Wn(){return typeof globalThis.navigator?.storage?.getDirectory!="function"?"no-opfs":typeof globalThis.FileSystemFileHandle?.prototype?.createSyncAccessHandle!="function"?"no-sync-access-handles":null}var re=class extends Error{requested;actual;constructor(e,n){super(n===null?`truncate(${e}) returned but the resulting size could not be read`:`truncate(${e}) returned but the file is ${n} bytes`),this.name="TruncateFailed",this.requested=e,this.actual=n}};function te(t,e){t.truncate(e);let n=null;try{n=t.getSize()}catch{throw new re(e,null)}if(n!==e)throw new re(e,n)}function ye(t,e){switch(e?.name){case"QuotaExceededError":return t.ENOSPC;case"NotFoundError":return t.ENOENT;case"NoModificationAllowedError":return t.EBUSY;case"NotAllowedError":return t.EACCES;case"InvalidStateError":return t.EBADF;case"TypeMismatchError":return t.ENOTDIR;case"AbortError":return t.EINTR;default:return t.EIO}}var ge=class{slots=[];#t;constructor(e){this.#t=e}async open(e){for(let n=0;n<e;n+=1){let r=await this.#t.getFileHandle(`slot-${n}`,{create:!0}),a=await r.createSyncAccessHandle();try{te(a,0)}catch(s){try{a.close()}catch{}throw s}this.slots.push({index:n,fileHandle:r,handle:a,taken:!1})}}take(e,n){let r=this.slots.find(a=>!a.taken&&!a.broken);if(!r)throw new e.ErrnoError(n.EMFILE);r.taken=!0;try{te(r.handle,0)}catch(a){r.broken=D(a),r.taken=!1;try{r.handle.close()}catch{}throw new e.ErrnoError(ye(n,a))}return r}release(e){if(!(!e||!e.taken)){try{te(e.handle,0)}catch(n){e.broken=D(n),e.taken=!1;try{e.handle.close()}catch{}return}e.taken=!1}}free(){return this.slots.reduce((e,n)=>e+(n.taken||n.broken?0:1),0)}capacity(){return this.slots.reduce((e,n)=>e+(n.broken?0:1),0)}retired(){return this.slots.flatMap(e=>e.broken?[`slot-${e.index}: ${e.broken}`]:[])}closeAll(){for(let e of this.slots)try{e.handle.close()}catch{}}};function Yn(t){if(t===void 0)return Hn;if(!Number.isSafeInteger(t)||t<1)throw new RangeError(`workspaceMaxFiles must be a whole number of at least 1, not ${String(t)}.`);if(t>1024)throw new RangeError(`workspaceMaxFiles is capped at ${1024}; ${t} storage handles would have to be reserved before the interpreter could start.`);return t}var ae=class t{sessionId;maxFiles;#t;#e;#o;#l;#u;#i=null;#c=!1;#r=0;#n=new Map;#f=0;#d=new Map;#y=0;constructor(e){this.#t=e.pyodide,this.#e=e.FS,this.#o=e.E,this.#l=e.pool,this.#u=e.lock,this.sessionId=e.sessionId,this.maxFiles=e.maxFiles}static async open(e,n={}){let r;try{r=Yn(n.maxFiles)}catch(f){return{status:{available:!1,reason:"open-failed",detail:D(f),path:A,maxFiles:0,sessionId:n.sessionId??""}}}let a=n.sessionId??Gn(),s=Wn();if(s)return{status:{available:!1,reason:s,detail:s==="no-opfs"?"This browser does not provide an origin private filesystem, so Python file output cannot be written to disk. Files still work, but they live in memory.":"This browser has no synchronous file access handles, which are what let Python write to disk without buffering the whole file in memory.",path:A,maxFiles:r,sessionId:a}};let i=null,h=null,l=null,c="the workspace directory";try{let f=zn(e);l=await(await navigator.storage.getDirectory()).getDirectoryHandle(Ke,{create:!0}),await Kn(l,a);let o=await l.getDirectoryHandle(a,{create:!0}),d=await o.getFileHandle("lock",{create:!0});return c="the session lock",i=await d.createSyncAccessHandle(),h=new ge(o),c="the file slots",await h.open(r),{workspace:new t({pyodide:e,FS:e.FS,E:f,pool:h,lock:i,sessionId:a,maxFiles:r})}}catch(f){h?.closeAll();try{i?.close()}catch{}try{await l?.removeEntry(a,{recursive:!0})}catch{}return{status:{available:!1,reason:"open-failed",detail:`The browser refused to open ${c}: ${D(f)}. Python file output will stay in memory, so large files may exhaust the tab.`,path:A,maxFiles:r,sessionId:a}}}}status(){let e=this.#l.capacity(),n=this.#l.retired();return{available:!0,path:A,maxFiles:e,sessionId:this.sessionId,...e<this.maxFiles?{degraded:`${this.maxFiles-e} of ${this.maxFiles} file slots were withdrawn after storage errors, so this workspace now holds ${e} files at once: `+n.join("; ")}:{}}}mount(){let e=this.#e;e.mkdirTree(A),e.mount(this.#w(),{},A),this.#i=e.lookupPath(A).node,this.#t.runPython(`import os
os.chdir(${JSON.stringify(A)})
`)}list(){if(!this.#i)return[];let e=[];return this.#s(this.#i,"",e),e.sort((n,r)=>n.name<r.name?-1:n.name>r.name?1:0),e}#s(e,n,r){for(let[a,s]of Object.entries(e.contents??N)){if(a.startsWith(ne))continue;let i=n?`${n}/${a}`:a;if(this.#e.isDir(s.mode)){this.#s(s,i,r);continue}let h=this.#p(s),l=s.failure?"failed":(s.leases?.size??0)>0?"transferring":(s.openCount??0)>0?"open":"ready";r.push({name:i,size:h,modifiedMs:s.timestamp,generation:s.generation??0,state:l,mime:ee(a),...s.failure?{failure:s.failure}:{}})}}#p(e){let n=e.slot;if(!n)return e.knownSize??0;try{let r=n.handle.getSize();return e.knownSize=r,r}catch(r){return e.failure||(e.failure=`the browser could not report this file's size: ${D(r)}.`,e.generation=++this.#r),e.knownSize??0}}openLease(e){let n=this.#m(e),r=this.#p(n);if(n.failure)throw new Error(this.#h(e,n.failure));let a=`lease-${++this.#f}`,s=n.generation??0;return(n.leases??=new Set).add(a),this.#n.set(a,{node:n,name:e,size:r,generation:s,transferred:0}),{lease:a,name:e,size:r,mime:ee(e),generation:s}}readChunk(e,n,r){let a=this.#n.get(e);if(!a)throw new Error("This transfer has already finished or was cancelled.");let s=a.node;if((s.generation??0)!==a.generation)throw new Error(`${a.name} changed while it was being downloaded, so the transfer was stopped rather than delivering a file that is partly the old version and partly the new one.`);if(s.failure)throw new Error(this.#h(a.name,s.failure));let i=s.slot;if(!i)throw new Error(`${a.name} no longer has storage behind it.`);if(n<0||n>a.size)throw new Error(`Read at ${n} is outside ${a.name} (${a.size} bytes).`);let h=Math.max(0,Math.min(r,a.size-n)),l=new Uint8Array(h),c=0;for(;c<h;){let f;try{f=i.handle.read(l.subarray(c),{at:n+c})}catch(p){throw new Error(`${a.name} could not be read: ${D(p)}`)}if(f<=0)throw new Error(`${a.name} returned no data at byte ${n+c} although it reports ${a.size} bytes. The transfer was stopped rather than completed with a gap.`);c+=f}return a.transferred=Math.max(a.transferred,n+c),l}closeLease(e){let n=this.#n.get(e);n&&(this.#n.delete(e),n.node.leases?.delete(e))}openLeases(){return this.#n.size}leaseSize(e){return this.#a(e).size}leaseGeneration(e){return this.#a(e).generation}#a(e){let n=this.#n.get(e);if(!n)throw new Error("This transfer has already finished or was cancelled.");return n}#m(e){let n=this.#g(e);if(!n||this.#e.isDir(n.mode))throw new Error(`There is no artifact called ${e} in the workspace.`);if(n.failure)throw new Error(this.#h(e,n.failure));if((n.openCount??0)>0)throw new Error(`${e} is still open in Python. Close the file - leave the \`with\` block - before downloading it.`);if(!n.slot)throw new Error(`${e} has no storage behind it.`);return n}#h(e,n){return`${e} is incomplete: ${n} Its bytes are partial, so it is not offered for download. Delete it and run the export again.`}async read(e,n={}){let r=this.#m(e),a=this.#p(r);if(r.failure)throw new Error(this.#h(e,r.failure));let s=n.maxBytes??a;if(!Number.isSafeInteger(s)||s<0)throw new Error(`maxBytes must be a non-negative whole number, not ${String(n.maxBytes)}.`);let i=Math.min(s,a);if(i>Je)throw new Error(`${e} is ${Ze(a)} and readArtifact() will not build a Blob above ${Ze(Je)} - the whole file would sit in browser memory before any of it reached a destination. Pass maxBytes for a preview, or stream it with streamArtifact().`);let{lease:h}=this.openLease(e);try{let l=[];for(let f=0;f<i;f+=Xe){let p=this.readChunk(h,f,Math.min(Xe,i-f));l.push(new Blob([p.slice().buffer])),await Promise.resolve()}let c=ee(e);return{blob:new Blob(l,{type:Ve(c)}),size:a,mime:c,truncated:i<a}}finally{this.closeLease(h)}}delete(e){let n=this.#g(e);if(!n)throw new Error(`There is no artifact called ${e} in the workspace.`);if(this.#e.isDir(n.mode))throw new Error(`${e} is a directory, not an artifact.`);if((n.openCount??0)>0)throw new Error(`${e} is still open in Python and cannot be deleted yet.`);if((n.leases?.size??0)>0)throw new Error(`${e} is being downloaded right now. Cancel the download, or wait for it to finish, before deleting it.`);this.#e.unlink(`${A}/${e}`)}beginImport(e,n,r){let a=Bn(e);if(!Number.isSafeInteger(n)||n<0)throw new Error(`Invalid size ${n}.`);let s=this.#g(e);if(s&&(this.#e.isDir(s.mode)||!r))throw new Error(`${e} already exists in the workspace.`);if(s&&((s.openCount??0)>0||(s.leases?.size??0)>0))throw new Error(`${e} is open or being downloaded and cannot be replaced now.`);let i=[A,...a.slice(0,-1)].join("/");this.#e.mkdirTree(i);let h=`import-${++this.#y}`,l=`${i}/${ne}${this.#y}`,c=this.#e.open(l,"w");return this.#d.set(h,{stream:c,temp:l,target:`${A}/${a.join("/")}`,name:e,size:n,written:0}),h}writeImport(e,n,r){let a=this.#d.get(e);if(!a?.stream)throw new Error("This import has already finished or was cancelled.");if(n!==a.written||a.written+r.byteLength>a.size)throw new Error(`Import of ${a.name}: bytes at ${n} do not follow ${a.written}.`);let s=0;for(;s<r.byteLength;){let i=this.#e.write(a.stream,r,s,r.byteLength-s);if(i<=0)throw new Error(`Import of ${a.name} stopped at byte ${a.written+s}.`);s+=i}a.written+=s}endImport(e,n){let r=this.#d.get(e);if(!r){if(n)throw new Error("This import has already finished or was cancelled.");return""}this.#d.delete(e);try{r.stream&&this.#e.close(r.stream),r.stream=null;let a=this.#e.lookupPath(r.temp).node;if(n){if(r.written!==r.size)throw new Error(`Import of ${r.name} ended at ${r.written} of ${r.size} bytes.`);if(a.failure)throw new Error(this.#h(r.name,a.failure));return this.#e.rename(r.temp,r.target),r.name}}catch(a){throw this.#_(r.temp),a}return this.#_(r.temp),""}abandonImports(){for(let e of[...this.#d.keys()])this.endImport(e,!1)}#_(e){try{this.#e.unlink(e)}catch{}}bytesUsed(){let e=0;for(let n of this.list())e+=n.size;return e}freeSlots(){return this.#l.free()}annotate=e=>{let n=this.#o.EMFILE,r=this.#o.ENOSPC;return e.includes(`[Errno ${n}]`)?`${e.trimEnd()}
[browser-python] The workspace holds at most ${this.maxFiles} files at once, and all of them are in use. This is a browser limit, not a disk limit: storage handles must be reserved before Python asks for them. Delete files you no longer need - each deletion frees a slot - or write fewer files at a time. Exports that create thousands of small files, such as a local Zarr store, are not supported in the browser.
`:e.includes(`[Errno ${r}]`)?`${e.trimEnd()}
[browser-python] The browser's storage quota for this origin is exhausted. The file that was being written is incomplete and is marked failed rather than offered for download; delete it and any other artifacts you do not need, then try again.
`:e};async close(){if(!this.#c){this.#c=!0;try{this.abandonImports()}catch{}this.#l.closeAll();try{this.#u?.close()}catch{}this.#u=null;try{await(await(await navigator.storage.getDirectory()).getDirectoryHandle(Ke,{create:!1})).removeEntry(this.sessionId,{recursive:!0})}catch{}}}#g(e){let n=e.split("/").filter(a=>a!==""&&a!=="."),r=this.#i;for(let a of n){if(!r)return null;let s=(r.contents??N)[a];if(!s)return null;r=s}return r===this.#i?null:r}#w(){let e=this.#e,n=this.#o,r=this.#l,a=o=>this.#p(o),s=o=>{o.generation=++this.#r},i=o=>{if((o.leases?.size??0)>0)throw new e.ErrnoError(n.EBUSY)},h=(o,d,m)=>{throw o.failure=d,new e.ErrnoError(m)},l=(o,d,m)=>{try{return m()}catch(u){throw u instanceof e.ErrnoError||h(o,`${d} failed: ${D(u)}.`,ye(n,u)),u}},c=o=>{o.unlinked=!0,!((o.openCount??0)>0)&&(r.release(o.slot),o.slot=null)},f=o=>{let d={};for(let[m,u]of Object.entries(o)){if(typeof u!="function"){d[m]=u;continue}let w=u;d[m]=function(...v){try{return w.apply(this,v)}catch(P){if(P instanceof e.ErrnoError)throw P;let R=v[0],O=R?.node??R;throw O&&O.failure===null&&(O.failure=`the browser's storage failed during ${m}: ${D(P)}.`),new e.ErrnoError(ye(n,P))}}}return d},p={mount(){return p.createNode(null,"/",16895,0)},createNode(o,d,m,u){let w=o!==null&&!e.isDir(m)?r.take(e,n):null,y;try{y=e.createNode(o,d,m,u)}catch(v){throw r.release(w),v}if(e.isDir(y.mode))y.node_ops=p.dir_node_ops,y.stream_ops=p.dir_stream_ops,y.contents=_e();else{if(y.node_ops=p.file_node_ops,y.stream_ops=p.stream_ops,y.openCount=0,y.failure=null,y.knownSize=0,s(y),!w)throw new e.ErrnoError(n.EIO);y.slot=w}return y.timestamp=Date.now(),o&&((o.contents??=_e())[d]=y,o.timestamp=y.timestamp),y},getattr(o){let d=e.isDir(o.mode)?4096:o.slot?a(o):0;return{dev:1,ino:o.id,mode:o.mode,nlink:1,uid:0,gid:0,rdev:o.rdev,size:d,atime:new Date(o.timestamp),mtime:new Date(o.timestamp),ctime:new Date(o.timestamp),blksize:4096,blocks:Math.ceil(d/4096)}},setattr(o,d){if(d.mode!==void 0&&(o.mode=d.mode),d.timestamp!==void 0&&(o.timestamp=d.timestamp),d.size!==void 0&&o.slot){let m=o.slot;i(o),l(o,"truncate",()=>te(m.handle,d.size)),o.knownSize=d.size,o.timestamp=Date.now(),s(o)}},dir_node_ops:{},file_node_ops:{},dir_stream_ops:{},stream_ops:{}};return p.dir_node_ops=f({getattr:p.getattr,setattr:p.setattr,lookup(o,d){let m=(o.contents??N)[d];if(!m)throw new e.ErrnoError(n.ENOENT);return m},mknod(o,d,m,u){return p.createNode(o,d,m,u)},rename(o,d,m){i(o);let u=(d.contents??N)[m];if(u&&u!==o&&i(u),u&&u!==o)if(e.isDir(u.mode)){if(!e.isDir(o.mode))throw new e.ErrnoError(n.EISDIR);if(Object.keys(u.contents??N).length>0)throw new e.ErrnoError(n.ENOTEMPTY);e.hashRemoveNode(u),u.unlinked=!0}else{if(e.isDir(o.mode))throw new e.ErrnoError(n.ENOTDIR);e.hashRemoveNode(u),c(u)}let w=o.parent;delete(w.contents??N)[o.name],w.timestamp=Date.now(),o.name=m,(d.contents??=_e())[m]=o,d.timestamp=w.timestamp,o.parent=d,s(o)},unlink(o,d){let m=(o.contents??N)[d];if(!m)throw new e.ErrnoError(n.ENOENT);i(m),c(m),delete(o.contents??N)[d],o.timestamp=Date.now()},rmdir(o,d){let m=(o.contents??N)[d];if(!m)throw new e.ErrnoError(n.ENOENT);if(Object.keys(m.contents??N).length>0)throw new e.ErrnoError(n.ENOTEMPTY);delete(o.contents??N)[d],o.timestamp=Date.now()},readdir(o){return[".","..",...Object.keys(o.contents??N)]},symlink(){throw new e.ErrnoError(n.EPERM)}}),p.file_node_ops=f({getattr:p.getattr,setattr:p.setattr}),p.dir_stream_ops=f({llseek(o,d,m){let u=d;if(m===1)u+=o.position;else if(m===2)throw new e.ErrnoError(n.EINVAL);if(u<0)throw new e.ErrnoError(n.EINVAL);return u}}),p.stream_ops=f({open(o){((o.flags??0)&3)!==0&&i(o.node),o.node.openCount=(o.node.openCount??0)+1},dup(o){o.node.openCount=(o.node.openCount??0)+1},close(o){let d=o.node;if(d.openCount=Math.max(0,(d.openCount??1)-1),d.openCount>0)return;if(d.unlinked){r.release(d.slot),d.slot=null;return}let m=d.slot;m&&l(d,"flush",()=>m.handle.flush())},read(o,d,m,u,w){let y=o.node,v=y.slot;if(!v)throw new e.ErrnoError(n.EBADF);let P=new Uint8Array(d.buffer,d.byteOffset+m,u),R=Math.min(a(y),w+u),O=0;for(;w+O<R;){let ve=l(y,"read",()=>v.handle.read(P.subarray(O),{at:w+O}));ve<=0&&h(y,`the browser returned no data at byte ${w+O} of a file it reports as ${a(y)} bytes.`,n.EIO),O+=ve}return O},write(o,d,m,u,w){let y=o.node,v=y.slot;if(!v)throw new e.ErrnoError(n.EBADF);let P=new Uint8Array(d.buffer,d.byteOffset+m,u),R=l(y,"write",()=>v.handle.write(P,{at:w}));return R<u&&(y.knownSize=Math.max(y.knownSize??0,w+R),s(y),h(y,`the browser's storage quota was exhausted after ${w+R} bytes.`,n.ENOSPC)),y.knownSize=Math.max(y.knownSize??0,w+R),y.timestamp=Date.now(),s(y),R},llseek(o,d,m){let u=d;if(m===1)u+=o.position;else if(m===2){if(!o.node.slot)throw new e.ErrnoError(n.EBADF);u+=a(o.node)}if(u<0)throw new e.ErrnoError(n.EINVAL);return u},flush(o){let d=o.node,m=d.slot;m&&l(d,"flush",()=>m.handle.flush())}}),p}};function Ze(t){if(t<1024)return`${t} B`;let e=["KiB","MiB","GiB","TiB"],n=t/1024,r=0;for(;n>=1024&&r<e.length-1;)n/=1024,r+=1;return`${n<10?n.toFixed(1):Math.round(n)} ${e[r]}`}function D(t){return t instanceof Error?`${t.name}: ${t.message}`:String(t)}function Gn(){let t=Date.now().toString(36),e=globalThis.crypto?.randomUUID,n=typeof e=="function"?e.call(globalThis.crypto):Math.random().toString(36).slice(2,10);return`s-${t}-${n}`}var Vn=3e4;function qn(t){let e=/^s-([0-9a-z]+)-/.exec(t)?.[1],n=e===void 0?Number.NaN:Number.parseInt(e,36);return Number.isFinite(n)?Date.now()-n:Number.POSITIVE_INFINITY}async function Kn(t,e){let n=[];try{for await(let r of t.keys())r!==e&&qn(r)>=Vn&&n.push(r)}catch{return}for(let r of n){let a=null;try{a=await(await(await t.getDirectoryHandle(r,{create:!1})).getFileHandle("lock",{create:!1})).createSyncAccessHandle()}catch(s){if(s?.name!=="NotFoundError")continue}try{a?.close(),await t.removeEntry(r,{recursive:!0})}catch{}}}var Xn=32*1024,Qe=50,Jn=1e3,se=class{#t;#e="";#o=!1;#l=[];#u="";#i=null;#c=0;#r=null;#n=0;#f=0;#d=null;#y=!1;#s=0;#p=!1;constructor(e){this.#t=e}beginExecution(e){this.flush(),this.#m(),this.#e=e,this.#o=!0,this.#n=0,this.#f=0,this.#d=null,this.#y=!1,this.#s=0,this.#p=!1}endExecution(){this.flush(),this.#m(),this.#o=!1}flush(){if(this.#r!==null&&(clearTimeout(this.#r),this.#r=null),this.#i===null)return;let e=this.#i,n=this.#u;this.#u="",this.#i=null,this.#t({kind:e,...this.#_(),text:n})}annotate(e){this.#l.push(e)}status(e,n){this.flush(),this.#t({kind:"status",state:e,...n!==void 0?{detail:n}:{}})}stdout(e){this.#a("stdout",e)}stderr(e){if(e==="")return;let n=e;for(let r of this.#l)n=r(n);this.#a("stderr",n)}result(e){this.flush(),this.#t({kind:"result",executionId:this.#e,text:e})}#a(e,n){if(n==="")return;this.#i!==null&&this.#i!==e&&this.flush();let r=de-this.#n,a=r<=0?"":n.length<=r?n:n.slice(0,r);a.length<n.length&&(this.#f+=n.length-a.length,this.#d===null&&(this.#d=Date.now())),a!==""&&(this.#n+=a.length,this.#i===null&&(this.#i=e,this.#c=Date.now(),this.#r=setTimeout(()=>{this.#r=null,this.flush()},Qe)),this.#u+=a,(this.#u.length>=Xn||Date.now()-this.#c>=Qe)&&this.flush()),this.#d!==null&&Date.now()-this.#d>=Jn&&this.#m()}#m(){this.#y||this.#f===0||(this.#y=!0,this.#h(`[browser-python] output limit reached after ${we(de)}; ${we(this.#f)} omitted and further output from this execution is not shown. Print less, or write it to a file in /workspace and download it.
`))}#h(e){this.flush(),this.#t({kind:"stderr",...this.#_(),text:e})}notice(e){this.#h(e)}attribution(){return this.#_()}spendDisplay(e){return this.#s+e>he?(this.#p||(this.#p=!0,this.#h(`[browser-python] display output limit reached: this execution has already produced ${we(he)} of figures, so the rest are not shown. Draw fewer figures per cell, or save them to /workspace and download them.
`)),!1):(this.#s+=e,!0)}stderrNotice(e,n){this.flush(),this.#t({kind:"stderr",...this.#_(),text:e,notice:n})}#_(){return this.#o?{executionId:this.#e}:{executionId:this.#e,background:!0}}display(e){let n=Ne(e);if(!n.ok){this.#h(`[browser-python] dropped a display payload: ${n.error}
`);return}this.spendDisplay(n.value.data.length)&&(this.flush(),this.#t({kind:"display",executionId:this.#e,...n.value}))}},oe=class{#t;#e;constructor(e,n){this.#t=e,this.#e=n}start(e,n,r){this.#t.flush(),this.#e({kind:"execute-input",executionId:e,executionCount:n,...r!==void 0?{token:r}:{}})}publish(e){let n=this.#t.attribution();if(e.output==="clear_output"){this.#t.flush(),this.#e({kind:"clear-output",...n,wait:e.wait===!0});return}let r=e.output==="execute_result"?"execute_result":"display_data",a=Ae(e);if(!a.ok){this.#t.notice(`[browser-python] dropped a display payload: ${a.error}
`);return}let s=0;for(let h of Object.values(a.value.data))s+=h?.length??0;if(!this.#t.spendDisplay(s))return;this.#t.flush();let i=e.executionCount;this.#e({kind:"bundle",type:r,...n,data:a.value.data,metadata:a.value.metadata,...r==="execute_result"?{executionCount:typeof i=="number"?i:null}:{}})}error(e,n,r,a){this.#t.flush();let s=q(a);this.#e({kind:"cell-error",executionId:e,text:s.join(`
`),ename:n,evalue:r,traceback:s})}};function we(t){return t>=1024*1024?`${(t/1024/1024).toFixed(1)} MiB`:`${Math.max(1,Math.round(t/1024))} KiB`}function Zn(t,e){let n=0;for(let r=0;r<e&&n<t.length;r+=1)n+=(t.codePointAt(n)??0)>65535?2:1;return n}function F(t){return typeof t=="object"&&t!==null&&typeof t.destroy=="function"}var ie=class t{#t;#e;#o;#l=null;#u=0;#i=0;#c=null;#r=null;#n=0;constructor(e,n,r={}){this.#t=e,this.#e=n,this.#o=r.jspi??!0}useCells(e){this.#l=e}get liveProxies(){return this.#n}async start(){this.#t.runPython(`import sys
if "/freva" not in sys.path: sys.path.insert(0, "/freva")
import _freva_bridge`);let e=this.#t.globals.get("_freva_bridge");if(!F(e))throw new Error("The Python bridge module did not load.");this.#r=e,this.#r.make_console(a=>this.#e.stdout(a),a=>this.#e.stderr(a)),this.#r.set_jspi(this.#o);let n=typeof this.#r.needs_jspi_text=="function"?this.#r.needs_jspi_text():null;this.#c=typeof n=="string"&&n!==""?n.trimEnd():null;let r=this.#l;r&&typeof this.#r.set_publisher=="function"&&this.#r.set_publisher(a=>{let s;try{s=JSON.parse(String(a))}catch{this.#e.stderr(`[browser-python] dropped a display payload: not JSON
`);return}r.publish(s&&typeof s=="object"?s:{})})}async executeCell(e){let n=this.#s(),r=this.#l;if(!r)throw new Error("This worker has no cell output.");let a=e.storeHistory&&!e.silent?++this.#u:null;r.start(e.executionId,a,e.token);let s=e.filename??`<cell-${a??`s${++this.#i}`}>`;await this.#t.loadPackagesFromImports(e.source);let i=await n.run_cell(e.source,s,a,e.silent);this.#n+=1;let h,l="",c="",f=[],p=null;try{h=String(this.#a(i,0)),l=String(this.#a(i,1)??""),c=String(this.#a(i,2)??"");let d=this.#a(i,3);if(F(d)){this.#n+=1;try{let m=d.toJs?.({create_pyproxies:!1});f=Array.isArray(m)?q(m):[]}finally{d.destroy(),this.#n-=1}}p=this.#a(i,4)??null}finally{i.destroy(),this.#n-=1}let o={executionId:e.executionId,executionCount:a,...e.token!==void 0?{token:e.token}:{}};if(h!=="error")return{...o,status:"ok"};if(p==="needs-jspi"&&this.#c!==null){let d=`${this.#c}
`;return r.publish({output:"display_data",data:{"text/plain":d,[j]:JSON.stringify({notice:"needs-jspi",text:d})}}),{...o,status:"error",ename:l,evalue:c,traceback:[],notice:"needs-jspi"}}return r.error(e.executionId,l,c,f),{...o,status:"error",ename:l,evalue:c,traceback:f}}#f(e){let n=e.endsWith(`
`)?e:`${e}
`;this.#c!==null&&e.trimEnd()===this.#c?this.#e.stderrNotice(n,"needs-jspi"):this.#e.stderr(n)}installBrowserHttp(){return this.#s().install_browser_http()}installCartopyData(){return this.#s().install_cartopy_data()}resolveVersions(e){let n=this.#s().versions([...e]);return this.#_(n)}pythonVersion(){return this.#s().python_version()}async push(e){let r=this.#s().console_push(e);this.#n+=1;let a,s="",i=null;try{a=this.#a(r,0),s=String(this.#a(r,1)??""),i=this.#a(r,2)??null}finally{r.destroy(),this.#n-=1}if(a==="incomplete")return{syntax:a,executed:!1};if(a==="syntax-error"){let l=s.trimEnd();return this.#e.stderr(`${l}
`),{syntax:a,executed:!1,error:l}}let h=await this.#p(i);return await this.#m(),{syntax:"complete",executed:!0,...h}}async run(e){let n=this.#s();await this.#t.loadPackagesFromImports(e);let r=await n.run_source(e);this.#n+=1;let a=null;try{a=this.#a(r,2)??null}finally{r.destroy(),this.#n-=1}return await this.#m(),a?(this.#f(a),{error:a.trimEnd()}):{}}clearBuffer(){this.#s().clear_buffer()}interrupt(){let e=this.#r;return e?!!e.interrupt():!1}static#d=new Set(["_freva_bridge","browser_http","browser_s3","cartopy_data","freva_browser_backend","freva_client_compat","rich_display"]);static#y(e){let n=e.split(".")[0]??e;return t.#d.has(n)}complete(e,n){let r=this.#s(),a=e.slice(0,n),s=r.complete(a);this.#n+=1;try{let i=this.#a(s,0),h=Zn(a,Number(this.#a(s,1)??a.length)),l=[];if(i&&F(i)){this.#n+=1;try{let c=Number(i.length??0);for(let f=0;f<c;f+=1){let p=String(i.get?.(f)??"");t.#y(p)||l.push(p)}}finally{i.destroy(),this.#n-=1}}return{start:h,matches:l}}finally{s.destroy(),this.#n-=1}}destroy(){let e=this.#r;if(this.#r=null,!!e)try{e.destroy()}catch{}}#s(){if(!this.#r)throw new Error("The Python bridge is not available.");return this.#r}async#p(e){if(!F(e))return{};let n=this.#s();this.#n+=1;let r=null;try{r=await n.run_future(e),this.#n+=1;try{let a=!!this.#a(r,0),s=String(this.#a(r,1)??""),i=this.#a(r,2)??null;return i?(this.#f(i),{error:i.trimEnd()}):a?(this.#e.result(s),{result:s}):{}}finally{r.destroy(),this.#n-=1}}finally{e.destroy(),this.#n-=1}}#a(e,n){return e.get?.(n)}async#m(){let e=this.#r;if(!e)return;let n;try{n=await this.#h(e)}catch(r){this.#e.stderr(`[browser-python] the display bridge raised and was skipped: ${x(r)??String(r)}
`);return}if(F(n)){this.#n+=1;try{let r=n.toJs?.({create_pyproxies:!1,dict_converter:void 0}),a=Array.isArray(r)?r:[];for(let s of a)this.#e.display(s instanceof Map?Object.fromEntries(s):s)}finally{n.destroy(),this.#n-=1}}}async#h(e){if(!this.#o)return e.capture_display();let n=e.capture_display;if(typeof n!="function"||typeof n.callPromising!="function")return F(n)&&n.destroy(),e.capture_display();this.#n+=1;try{return await n.callPromising()}catch(r){return this.#e.stderr(`[browser-python] display capture could not use stack switching: ${x(r)??String(r)}
`),e.capture_display()}finally{n.destroy?.(),this.#n-=1}}#_(e){if(!F(e))return{};let n=e;this.#n+=1;try{let r=n.toJs?.({create_pyproxies:!1});if(r instanceof Map){let a={};for(let[s,i]of r)a[String(s)]=String(i);return a}if(r&&typeof r=="object"){let a={};for(let[s,i]of Object.entries(r))a[s]=String(i);return a}return{}}finally{n.destroy(),this.#n-=1}}};var en="/freva-site-wheels",Qn=t=>[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,"0")).join("");function et(t){return decodeURIComponent(new URL(t).pathname.split("/").pop()??"")}async function nt(t){let e=et(t.url),n={resource:"site-wheel",artefact:e,url:t.url},r=globalThis.crypto?.subtle;if(!r)return{...n,kind:"unsupported",underlying:"this context has no Web Crypto, so a wheel cannot be verified - serve the site over HTTPS, or from localhost. An unverified wheel is not installed."};let a;try{a=await fetch(t.url,{credentials:"omit"})}catch(h){let l=x(h);return{...n,kind:"unreachable",...l?{underlying:l}:{}}}if(!a.ok)return{...n,kind:"unavailable",status:a.status};let s=new Uint8Array(await a.arrayBuffer()),i=Qn(await r.digest("SHA-256",s));return i!==t.sha256?{...n,kind:"mismatch",digests:{expected:t.sha256,received:i}}:{file:e,bytes:s}}async function nn(t,e,n){if(e.length===0)return[];n?.("fetching the site's wheels");let r=await Promise.all(e.map(i=>nt(i))),a=r.filter(i=>"kind"in i);if(a.length>0)throw new k(B(a),"packages-unreachable");let s=[];for(let i of r){let h=`${en}/${i.file}`;t.FS.mkdirTree(en),t.FS.writeFile(h,i.bytes),n?.(`installing ${i.file}`);try{await t.runPythonAsync(`import micropip
await micropip.install(${JSON.stringify(`emfs:${h}`)}, deps=False)
`)}catch(l){let c=x(l);throw new k(B([{resource:"site-wheel",artefact:i.file,kind:"install",...c?{underlying:c}:{}}]),"packages-unreachable")}s.push(i.file)}return s}function tn(t){try{let e=t?._module?.HEAPU8?.buffer?.byteLength;return typeof e=="number"&&Number.isSafeInteger(e)&&e>0?e:void 0}catch{return}}function rn(t=globalThis.performance){let e=0,n=0,r=[];try{r=t?.getEntriesByType?.("resource")??[]}catch{return{}}for(let a of r)typeof a.decodedBodySize=="number"&&a.decodedBodySize>0&&(e+=a.decodedBodySize),typeof a.transferSize=="number"&&a.transferSize>0&&(n+=a.transferSize);return{...e>0?{fetchedDecodedBytes:e}:{},...n>0?{transferBytesEstimate:n}:{}}}function an(t,e=WebAssembly){let n=0,r=e.instantiate;e.instantiate=function(s,i,...h){let l=s instanceof ArrayBuffer||ArrayBuffer.isView(s)?s.byteLength:1/0;if(n===0||l>8388608||h.length>0)return Reflect.apply(r,e,[s,i,...h]);try{let c=new e.Module(s);return Promise.resolve({module:c,instance:new e.Instance(c,i)})}catch(c){return Promise.reject(c)}};let a=s=>async(...i)=>{n+=1;try{return await s.apply(t,i)}finally{n-=1}};t.loadPackage=a(t.loadPackage),t.loadPackagesFromImports=a(t.loadPackagesFromImports)}var Ee=(t,e)=>{e&&e.length>0?self.postMessage(t,e):self.postMessage(t)},g=new se(Ee),tt=new oe(g,Ee),_=(t,e)=>{g.flush(),Ee(t,e)},W={available:!1,reason:"open-failed",detail:"The interpreter did not finish starting.",path:"/workspace",maxFiles:0,sessionId:""},be=!1,G="",sn="starting",T=null,I=null,S=null,Y=null,on=Promise.resolve();function E(t){on=on.then(t).catch(e=>{_({kind:"fatal",message:`The Python worker failed: ${b(e)}`})})}function rt(t){return new URL("../freva-wheels/",t).href}function b(t){return t instanceof Error?t.message:String(t)}async function at(t){if(t.protocol!==le){_({kind:"fatal",id:t.id,message:`Protocol mismatch: the page speaks v${t.protocol} and this worker speaks v${le}. One of the two is cached from an older deployment - reload the page, and if that does not fix it, check that the worker asset is not being served from a stale cache.`});return}G=t.workerSession;let e=Date.now(),n=Ce();if(n){_({kind:"fatal",id:t.id,message:"This browser cannot run WebAssembly, which the Python runtime requires.",reason:n});return}try{g.status("loading","downloading the Python runtime"),T=await De({indexURL:t.indexURL,...t.packageBaseURL!==void 0?{packageBaseURL:t.packageBaseURL}:{},onStdout:p=>{let o=Le(p,sn);o&&g.stdout(o)},onStderr:p=>g.stderr(Fe(p))}),an(T),je(T),g.status("loading","opening the workspace");let r=await ae.open(T,{...t.workspaceMaxFiles!==void 0?{maxFiles:t.workspaceMaxFiles}:{}});"workspace"in r?(S=r.workspace,S.mount(),W=S.status(),g.annotate(S.annotate),Y=new Q(S,_)):(W=r.status,g.stderr(`[browser-python] ${W.detail??"The disk-backed workspace is unavailable."}
[browser-python] Files written by Python are kept in memory in this session, and there is no download panel. Exporting anything large may exhaust the tab.
`));let a=[...pe[t.profile],...t.packages];a.length>0&&(g.status("loading",`loading ${a.join(", ")}`),await Z(T,a,t.packageBaseURL??t.indexURL));let s=T,{prepared:i,unavailable:h}=t.addons.length>0?await Ye(s,{addons:t.addons,...t.optionalAddons?.length?{optional:t.optionalAddons}:{},profile:t.profile,addonBaseURL:t.addonBaseURL??We(t.indexURL),onStatus:p=>g.status("loading",p),onWarning:p=>g.stderr(`[browser-python] ${p}
`),loadPackages:(p,o)=>Z(s,[...p],t.packageBaseURL??t.indexURL,`${o} needs packages from the pinned runtime, but`)}):{prepared:[],unavailable:[]},l=[];if(t.siteWheels&&t.siteWheels.length>0&&(await Z(s,["micropip"],t.packageBaseURL??t.indexURL,"installing the site's wheels needs micropip from the pinned runtime, but"),l=await nn(s,t.siteWheels,p=>g.status("loading",p))),t.profile==="freva-client"){if(t.persistCredentials){g.status("loading","opening persistent storage");let p=await $e(T,o=>{be=!1,g.stderr(`[browser-python] persistent storage stopped accepting writes, so credentials will not survive a reload from here on: ${b(o)}. This session is unaffected.
`),_({kind:"storage",credentialsPersisted:!1,detail:b(o)})});be=p,p||g.stderr(`[browser-python] persistent storage is unavailable in this browser, so credentials will not survive a reload. Authentication still works for this session.
`)}g.status("loading","installing the Freva client"),await Me(T,t.wheelhouseURL??rt(t.indexURL)),g.status("loading","applying browser compatibility"),await T.runPythonAsync(`import freva_client_compat
freva_client_compat.install()
`)}g.status("loading","starting the console");let c=new ie(T,g,{jspi:fe()});c.useCells(tt),I=c,await c.start(),pe[t.profile].includes("fsspec")&&(g.status("loading","registering the browser filesystem"),I.installBrowserHttp());{let p=I.installCartopyData();p.startsWith("unavailable")&&g.stderr(`[browser-python] Cartopy's on-demand map data could not be armed (${p}). Any prepared Natural Earth data still works; a map that needs a resolution this deployment did not prepare will report missing data.
`)}let f={profile:t.profile,pythonVersion:I.pythonVersion(),pyodideVersion:T.version,packages:I.resolveVersions(Pe[t.profile]),addons:Ge(i,p=>c.resolveVersions(p)),unavailableAddons:h,...l.length>0?{siteWheels:l}:{},startupMs:Date.now()-e,workspace:W,credentialsPersisted:be,jspi:fe()};sn="running",_({kind:"ready",id:t.id,info:f})}catch(r){let a=r instanceof k?r.reason:void 0;_({kind:"fatal",id:t.id,message:b(r),...a!==void 0?{reason:a}:{}})}}function z(t){return I||(_({kind:"request-error",id:t,message:"The interpreter is not running."}),null)}function $(t){try{Y?.settle(t)}catch(e){g.stderr(`[browser-python] could not list the workspace: ${b(e)}
`)}}function ke(t){return t.workerSession===G?!0:(_({kind:"request-error",id:t.id,message:`This request is addressed to worker session ${t.workerSession}, and this worker is ${G}. It belongs to an interpreter that has been replaced.`}),!1)}function M(t){return S||(_({kind:"request-error",id:t,message:W.detail??"This browser cannot back Python file output with storage, so there are no artifacts."}),null)}self.onmessage=t=>{let e=t.data;switch(e.kind){case"init":E(()=>at(e));return;case"push":E(async()=>{let n=z(e.id);if(n){g.beginExecution(e.executionId);try{let r=await n.push(e.line);$(e.executionId),g.endExecution(),_({kind:"push-reply",id:e.id,result:{executionId:e.executionId,...r}})}catch(r){g.endExecution(),_({kind:"request-error",id:e.id,message:b(r)})}}});return;case"run":E(async()=>{let n=z(e.id);if(n){g.beginExecution(e.executionId);try{let r=await n.run(e.code);$(e.executionId),g.endExecution(),_({kind:"run-reply",id:e.id,result:{executionId:e.executionId,...r}})}catch(r){g.endExecution(),_({kind:"request-error",id:e.id,message:b(r)})}}});return;case"execute-cell":E(async()=>{let n=z(e.id);if(n){g.beginExecution(e.executionId);try{let r=await n.executeCell({executionId:e.executionId,source:e.source,silent:e.silent,storeHistory:e.storeHistory,...e.filename!==void 0?{filename:e.filename}:{},...e.token!==void 0?{token:e.token}:{}});$(e.executionId),g.endExecution(),_({kind:"cell-reply",id:e.id,result:r})}catch(r){g.endExecution(),_({kind:"request-error",id:e.id,message:b(r)})}}});return;case"resources":{let n=tn(T),r;try{r=S?.bytesUsed()}catch{r=void 0}_({kind:"resources-reply",id:e.id,sample:{...n!==void 0?{wasmCapacityBytes:n}:{},...r!==void 0?{workspaceBytes:r}:{},...rn()}});return}case"import-open":E(async()=>{let n=M(e.id);if(n)try{let r=n.beginImport(e.name,e.size,e.overwrite);_({kind:"import-handle",id:e.id,handle:r})}catch(r){_({kind:"request-error",id:e.id,message:b(r)})}});return;case"import-chunk":E(async()=>{let n=M(e.id);if(n)try{n.writeImport(e.handle,e.offset,new Uint8Array(e.bytes)),_({kind:"ack",id:e.id})}catch(r){_({kind:"request-error",id:e.id,message:b(r)})}});return;case"import-close":E(async()=>{try{S?.endImport(e.handle,e.commit),e.commit&&$(),_({kind:"ack",id:e.id})}catch(n){_({kind:"request-error",id:e.id,message:b(n)})}});return;case"complete":E(async()=>{let n=z(e.id);if(n)try{_({kind:"completion",id:e.id,result:n.complete(e.source,e.cursor)})}catch(r){_({kind:"request-error",id:e.id,message:b(r)})}});return;case"clear-buffer":E(async()=>{let n=z(e.id);if(n)try{n.clearBuffer(),_({kind:"ack",id:e.id})}catch(r){_({kind:"request-error",id:e.id,message:b(r)})}});return;case"interrupt":{let n=!1;try{n=I?.interrupt()??!1}catch(r){_({kind:"request-error",id:e.id,message:b(r)});return}_({kind:"interrupt-reply",id:e.id,requested:n});return}case"artifact-list":E(async()=>{if(M(e.id))try{Y?.settle(void 0,e.id)}catch(n){_({kind:"request-error",id:e.id,message:b(n)})}});return;case"artifact-read":E(async()=>{let n=M(e.id);if(n)try{let r=await n.read(e.name,{...e.maxBytes!==void 0?{maxBytes:e.maxBytes}:{}});_({kind:"artifact-data",id:e.id,name:e.name,mime:r.mime,size:r.size,blob:r.blob,truncated:r.truncated})}catch(r){_({kind:"request-error",id:e.id,message:b(r)})}});return;case"artifact-open":E(async()=>{if(!ke(e))return;let n=M(e.id);if(n)try{let r=n.openLease(e.name);_({kind:"artifact-lease",id:e.id,workerSession:G,...r}),$()}catch(r){_({kind:"request-error",id:e.id,message:b(r)})}});return;case"artifact-chunk":E(async()=>{if(!ke(e))return;let n=M(e.id);if(n)try{let r=n.readChunk(e.lease,e.offset,e.length),a=n.leaseSize(e.lease),s=n.leaseGeneration(e.lease);_({kind:"artifact-chunk-data",id:e.id,workerSession:G,lease:e.lease,offset:e.offset,bytes:r.buffer,generation:s,eof:e.offset+r.byteLength>=a},[r.buffer])}catch(r){_({kind:"request-error",id:e.id,message:b(r)})}});return;case"artifact-close":E(async()=>{ke(e)&&(S?.closeLease(e.lease),$(),_({kind:"ack",id:e.id}))});return;case"artifact-delete":E(async()=>{let n=M(e.id);if(n)try{n.delete(e.name),Y?.settle(void 0,e.id)}catch(r){_({kind:"request-error",id:e.id,message:b(r)})}});return;case"dispose":E(async()=>{I?.destroy(),I=null,T=null;let n=S?.close();S=null,Y=null,await n,_({kind:"ack",id:e.id})});return}};g.status("loading","worker started");
