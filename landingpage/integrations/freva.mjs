/**
 * The Freva parts of the site, wired into Astro.
 *
 * scripts/prepare.mjs builds the components the site embeds (page bundle,
 * Python add-ons, STAC Browser, notebook) into .prepared/ and describes them
 * in .prepared/manifest.json. Everything here reads that manifest. Without it
 * the site still builds: code blocks stay plain, and the widget pages show
 * their fallback text. That keeps a docs-only checkout working without Node
 * having fetched half of npm first.
 *
 *   freva()        the integration: serves extra directories under fixed
 *                  URLs in `astro dev` and copies them into dist/ on build
 *                  (the job the MkDocs hook's on_post_build had, plus
 *                  assets/), and provides `virtual:waterpark/freva`, the
 *                  configuration Head.astro hands to web/site.js
 *   remarkFreva()  turns ```python try-in-python fences into the runnable
 *                  figures @freva-org/browser-python mounts on, registers
 *                  them for the page, and adds the "Open in Notebook"
 *                  controls to pages that have a notebook
 */
import { createHash } from "node:crypto";
import { cpSync, createReadStream, existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { codeToHtml } from "shiki";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONTENT = join(ROOT, "src", "content", "docs");

/** Where prepare.mjs left its output. The dev container mounts it elsewhere. */
export const PREPARED = resolve(process.env.WATERPARK_PREPARED ?? join(ROOT, ".prepared"));

let cached;
/** The manifest, or null when the Freva parts have not been prepared. */
export function manifest() {
  if (cached === undefined) {
    const file = join(PREPARED, "manifest.json");
    cached = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null;
  }
  return cached;
}

/** The configuration web/site.js reads from #wp-site, or null. */
function siteConfig() {
  const m = manifest();
  if (!m) return null;
  return {
    config: { app: m.app, tree: m.tree, playground: m.playground, base: "" },
    script: `/${m.app.site}`,
    styles: `/${m.app.ui}`,
    notebook: `/${m.app.notebook.lab}`,
  };
}

// ---------------------------------------------------------------------------
// Static directories

const TYPES = {
  ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json",
  ".html": "text/html", ".svg": "image/svg+xml", ".png": "image/png", ".gif": "image/gif", ".jpg": "image/jpeg",
  ".ico": "image/x-icon", ".wasm": "application/wasm", ".whl": "application/zip", ".zip": "application/zip",
  ".py": "text/x-python", ".txt": "text/plain", ".ipynb": "application/json", ".woff2": "font/woff2",
};

const VIRTUAL = "virtual:waterpark/freva";

/**
 * @param {object} options
 * @param {Record<string, string | (() => string)>} options.staticDirs
 *   URL prefix -> directory, for directories that are not Astro's public/:
 *   the committed assets/ (paths the catalogue, examples and bucket-refresh
 *   workflows write to), and the generated .prepared/ parts. Later entries
 *   win on overlap.
 */
export function freva({ staticDirs: dirs }) {
  const entries = () =>
    Object.entries(dirs)
      .map(([prefix, dir]) => [prefix.replace(/^\/+|\/+$/g, ""), typeof dir === "function" ? dir() : resolve(ROOT, dir)])
      .filter(([, dir]) => existsSync(dir));
  return {
    name: "waterpark:freva",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              {
                name: "waterpark:freva-config",
                resolveId: (id) => (id === VIRTUAL ? `\0${VIRTUAL}` : undefined),
                load: (id) => (id === `\0${VIRTUAL}` ? `export default ${JSON.stringify(siteConfig())};` : undefined),
              },
            ],
          },
        });
      },
      "astro:server:setup": ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const path = decodeURIComponent((req.url ?? "/").split("?")[0]).replace(/^\/+/, "");
          for (const [prefix, dir] of entries().reverse()) {
            if (path !== prefix && !path.startsWith(`${prefix}/`)) continue;
            let file = resolve(dir, path.slice(prefix.length).replace(/^\/+/, ""));
            if (!file.startsWith(dir)) continue;
            if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
            if (!existsSync(file) || !statSync(file).isFile()) continue;
            res.setHeader("Content-Type", TYPES[extname(file)] ?? "application/octet-stream");
            createReadStream(file).pipe(res);
            return;
          }
          next();
        });
      },
      "astro:build:done": ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        for (const [prefix, from] of entries()) {
          cpSync(from, join(out, prefix), { recursive: true });
          logger.info(`${relative(ROOT, from) || from} -> /${prefix}/`);
        }
        checkBuild(out, entries().map(([prefix]) => prefix), logger);
      },
    },
  };
}

/**
 * What the link checker cannot see, because it only knows Starlight's pages:
 *
 *   - links into the copied directories (/notebook/, /app/, /assets/) that
 *     point at nothing, such as a sidebar link Starlight rewrote;
 *   - a ```mermaid fence printed as text, which is what happens when one
 *     sits inside an HTML block (Material's md_in_html is gone).
 *
 * Only for a full build: without .prepared/ there is no /notebook/ to check.
 */
function checkBuild(out, prefixes, logger) {
  const pages = (function walk(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith(".html") ? [join(dir, e.name)] : [],
    );
  })(out);
  const roots = prefixes.filter((prefix) => existsSync(join(out, prefix)));
  const problems = [];
  const missing = new Map(); // href -> pages linking to it
  for (const page of pages) {
    if (/^(app|notebook)\//.test(relative(out, page).split(sep).join("/"))) continue;
    const html = readFileSync(page, "utf8");
    const where = `/${relative(out, page).split(sep).join("/")}`;
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
      if (!roots.some((root) => href.startsWith(`/${root}/`))) continue;
      const target = join(out, decodeURIComponent(href));
      const file = href.endsWith("/") ? join(target, "index.html") : target;
      if (!existsSync(file)) missing.set(href, [...(missing.get(href) ?? []), where]);
    }
    if (html.includes("```mermaid")) {
      problems.push(`${where} shows a mermaid fence as text: is it inside an HTML block? Leave it on its own.`);
    }
  }
  for (const [href, from] of missing) {
    const more = from.length > 1 ? ` and ${from.length - 1} more page(s)` : "";
    problems.unshift(`${href} does not exist (linked from ${from[0]}${more})`);
  }
  if (problems.length) {
    for (const problem of problems) logger.error(problem);
    throw new Error(`${problems.length} broken link(s) or diagram(s) in the built site, see above`);
  }
}

// ---------------------------------------------------------------------------
// Runnable code blocks and notebook controls

const escape = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Python highlighted with the same themes as the rest of the site's code. */
async function highlight(source) {
  const html = await codeToHtml(source, {
    lang: "python",
    themes: { light: "github-light", dark: "github-dark-dimmed" },
    defaultColor: false,
  });
  // The contract (@freva-org/browser-python/ui/code-figure.html): any markup
  // inside <code>, as long as its text is exactly the source.
  return html.slice(html.indexOf("<code>") + 6, html.lastIndexOf("</code>"));
}

function figure(example, title, code) {
  const head = title ? `<span class="portal-code-title">${escape(title)}</span>` : "";
  return (
    '<div class="portal-code-figure not-content" data-portal-code="python" data-portal-editable>' +
    `<div class="portal-code-head">${head}<span class="portal-code-lang${title ? " portal-code-lang-secondary" : ""}">Python</span>` +
    `<div class="portal-code-actions"><button type="button" class="portal-code-copy" data-portal-copy="${escape(example.source)}" ` +
    'aria-label="Copy code" hidden><span class="portal-code-copy-icon" aria-hidden="true"></span>' +
    '<span class="portal-code-copy-label">Copy</span></button><button type="button" class="portal-code-run" ' +
    `data-portal-run data-portal-example="${escape(example.id)}" data-portal-digest="${example.sha256}" ` +
    'aria-label="Try this code in Python" hidden><span class="portal-code-run-icon" aria-hidden="true"></span>' +
    '<span class="portal-code-run-label">Try in Python</span></button></div></div>' +
    '<pre class="portal-code-block" data-portal-language="python"><code class="portal-code" data-portal-language="python">' +
    `${code}</code></pre></div>`
  );
}

function notebookControl(m, seed, foot) {
  const href = escape(`/${m.app.notebook.lab}?example=${encodeURIComponent(seed)}`);
  const images = ["light", "dark"]
    .map((v) => `<img class="portal-jupyter-logo" data-variant="${v}" src="${escape(m.jupyterLogo[v])}" alt="" width="14" height="16" />`)
    .join("");
  const control =
    `<a class="portal-document-notebook" href="${href}" data-portal-document-notebook${foot ? "-foot" : ""}>` +
    `<span class="portal-document-notebook-launch">${images}Open in</span>` +
    '<span class="portal-document-notebook-target">Notebook</span></a>';
  return `<div class="portal-document-notebook-${foot ? "foot" : "head"} not-content">${control}</div>`;
}

const RUNNABLE = /\btry-in-python\b/;

/** Remark plugin; see the module comment. */
export function remarkFreva() {
  return async (tree, file) => {
    const path = file.path ?? file.history?.[0];
    if (!path || !path.startsWith(CONTENT + sep)) return;
    const stem = relative(CONTENT, path).split(sep).join("/").replace(/\.mdx?$/, "");
    const m = manifest();

    const fences = [];
    (function walk(node, parent) {
      if (node.type === "code" && node.lang === "python" && RUNNABLE.test(node.meta ?? "")) fences.push({ node, parent });
      for (const child of node.children ?? []) walk(child, node);
    })(tree);

    if (!m) {
      // Nothing to run them in: render as ordinary code.
      for (const { node } of fences) node.meta = node.meta.replace(RUNNABLE, "").trim() || null;
      return;
    }

    const pageTitle = file.data?.astro?.frontmatter?.title ?? stem;
    const examples = [];
    for (const { node, parent } of fences) {
      const source = node.value;
      const named = (node.meta ?? "").match(/title="([^"]*)"/);
      const example = {
        id: `${stem}#${examples.length + 1}`,
        title: named ? named[1] : `${pageTitle} · block ${examples.length + 1}`,
        source,
        sha256: createHash("sha256").update(source).digest("hex"),
      };
      examples.push(example);
      parent.children[parent.children.indexOf(node)] = {
        type: "html",
        value: figure(example, named?.[1], await highlight(source)),
      };
    }

    const seed = `${stem}.ipynb`;
    const hasNotebook = m.app.notebook.seeds.includes(seed);
    if (hasNotebook) {
      tree.children.unshift({ type: "html", value: notebookControl(m, seed, false) });
      tree.children.push({ type: "html", value: notebookControl(m, seed, true) });
    }
    if (examples.length) {
      const registered = examples.map(({ id, sha256, title }) => ({ id, sha256, title, ...(hasNotebook ? { notebook: seed } : {}) }));
      tree.children.push({
        type: "html",
        value: `<div class="portal-python-config" hidden data-portal-python-playground="${escape(JSON.stringify({ ...m.playground, examples: registered }))}"></div>`,
      });
    }
  };
}
