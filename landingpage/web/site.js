// Connects the Freva packages to the site's pages; configured by #wp-site (src/components/Head.astro).
import { initCodeCopy } from "@freva-org/browser-python/ui/copy";

const config = JSON.parse(document.getElementById("wp-site")?.textContent || "null");
const root = new URL(`${config?.base ?? "."}/`, document.baseURI);
const siteUrl = (path) => new URL(String(path).replace(/^\/+/, ""), root).href;
const absolute = (path) => (path && !/^[a-z]+:/i.test(path) ? siteUrl(path) : path);
const report = (what) => (error) => console.error(`[waterpark] ${what}:`, error);

function onDiscard(teardown) {
  const listener = (event) => {
    if (event.persisted) return;
    window.removeEventListener("pagehide", listener);
    teardown();
  };
  window.addEventListener("pagehide", listener);
}

const themeListeners = new Set();
// Starlight owns the theme: it sets data-theme="light" | "dark" on <html>,
// resolving "auto" itself. This only listens and passes changes on.
const currentTheme = () => (document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");

function followSiteTheme() {
  let theme = currentTheme();
  new MutationObserver(() => {
    if (currentTheme() === theme) return;
    theme = currentTheme();
    for (const listener of themeListeners) listener(theme);
    window.dispatchEvent(new CustomEvent("portal:theme", { detail: { mode: theme } }));
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
}

function playgroundConfig(playground) {
  return {
    ...playground,
    workerUrl: absolute(playground.workerUrl),
    addonBaseUrl: absolute(playground.addonBaseUrl),
    siteWheels: playground.siteWheels.map((wheel) => ({ ...wheel, url: absolute(wheel.url) })),
    wheelhouseUrl: absolute(playground.wheelhouseUrl),
    packagePolicy: { ...playground.packagePolicy, sources: { ...playground.packagePolicy.sources, addons: absolute(playground.packagePolicy.sources.addons) } },
    playgroundBase: root.pathname,
  };
}

async function openNotebook(request = {}) {
  const { openNotebook: openSheet } = await import("@freva-org/browser-python/ui/notebook/sheet");
  openSheet({ href: siteUrl(config.app.notebook.lab), frame: true, datasets: true, panel: true }, request);
}

let inspector = null;
async function openInspector(url) {
  if (typeof url !== "string" || !/^https?:\/\//.test(url)) return;
  const { attachInspector } = await import("@freva-org/data-inspector");
  if (!inspector) {
    const element = document.createElement("data-inspector");
    element.className = "wp-inspector";
    document.body.append(element);
    inspector = { element, controller: attachInspector(element, { getAuthHeaders: () => ({}), isStore: () => true }) };
    element.addEventListener("inspector-close", () => element.removeAttribute("open"));
  }
  inspector.element.file = url;
  inspector.element.setAttribute("open", "");
  await inspector.controller.load(url);
}

// "Visualise": a dataset on GridLook's 3D globe, full screen.
//
// The dataset tree has no hook for extra row buttons, so this adds one next
// to each "View metadata" (the tree's inspect action) as rows render. Rows
// are found by the tree's own data-dt-action/data-dt-id attributes; if a
// future tree release renames them, the button disappears rather than
// breaking anything. The store URL is built the way the tree's S3 source
// builds the inspect URL, from the row id (s3://bucket/key).
const GRIDLOOK = "https://gridlook.pages.dev/";

function storeUrl(endpoint, id) {
  const match = /^s3:\/\/([^/]+)\/(.+)$/.exec(id);
  if (!match) return null;
  const key = match[2].split("/").map(encodeURIComponent).join("/");
  return `${String(endpoint).replace(/\/+$/, "")}/${encodeURIComponent(match[1])}/${key}`;
}

let gridlook = null;
function openGridlook(url, title, opener) {
  if (!gridlook) {
    const dialog = document.createElement("dialog");
    dialog.className = "wp-gridlook";
    dialog.setAttribute("aria-labelledby", "wp-gridlook-title");
    dialog.innerHTML =
      '<header class="wp-gridlook__bar">' +
      '<h2 class="wp-gridlook__title" id="wp-gridlook-title"></h2>' +
      '<a class="wp-gridlook__open" target="_blank" rel="noopener">Open in GridLook</a>' +
      '<button type="button" class="wp-gridlook__close">Close</button>' +
      "</header>" +
      '<iframe class="wp-gridlook__frame" title="GridLook 3D viewer" allow="fullscreen" referrerpolicy="no-referrer"' +
      ' sandbox="allow-scripts allow-same-origin allow-popups allow-downloads"></iframe>';
    const frame = dialog.querySelector("iframe");
    dialog.querySelector(".wp-gridlook__close").addEventListener("click", () => dialog.close());
    // Esc closes a modal <dialog> natively; either way, stop the viewer so it
    // is not rendering the globe in the background, and give focus back.
    dialog.addEventListener("close", () => {
      frame.src = "about:blank";
      gridlook.opener?.focus();
    });
    document.body.append(dialog);
    gridlook = { dialog, frame, title: dialog.querySelector("h2"), link: dialog.querySelector("a"), opener: null };
  }
  const target = `${GRIDLOOK}#${url}`;
  gridlook.opener = opener;
  gridlook.title.textContent = title;
  gridlook.link.href = target;
  gridlook.frame.src = target;
  gridlook.dialog.showModal();
}

function addVisualise(host, endpoint) {
  const decorate = () => {
    for (const inspect of host.querySelectorAll('[data-dt-action="inspect"][data-dt-id]')) {
      if (inspect.nextElementSibling?.hasAttribute("data-wp-visualise")) continue;
      const url = storeUrl(endpoint, inspect.dataset.dtId);
      if (!url) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "dataset-tree__btn";
      button.dataset.wpVisualise = url;
      button.dataset.wpTitle = inspect.dataset.dtId.replace(/^s3:\/\//, "").replace(/\/+$/, "");
      button.textContent = "Visualise";
      button.setAttribute("aria-label", `Visualise ${button.dataset.wpTitle} on a 3D globe`);
      inspect.after(button);
    }
  };
  const observer = new MutationObserver(decorate);
  observer.observe(host, { childList: true, subtree: true });
  decorate();
  host.addEventListener("click", (event) => {
    const button = event.target?.closest?.("[data-wp-visualise]");
    if (button) openGridlook(button.dataset.wpVisualise, button.dataset.wpTitle, button);
  });
  return () => observer.disconnect();
}

async function mountTree(host) {
  const [{ mountDatasetTree }, { createS3Source }, recipes, { settleBlockBar, wireMaximizeControls }, { mountLayer }, bridge, { sha256Hex }, logos] =
    await Promise.all([
      import("@freva-org/dataset-tree"),
      import("@freva-org/dataset-tree/s3"),
      import("@freva-org/dataset-tree/recipes"),
      import("@freva-org/dataset-tree/ui"),
      import("@freva-org/freva-client-terminal/layers"),
      import("@freva-org/browser-python/ui/bridge"),
      import("@freva-org/browser-python/embed/examples"),
      import("@freva-org/browser-python/ui/notebook"),
    ]);
  const store = config.tree;
  const digests = Object.fromEntries(await Promise.all(recipes.TREE_RECIPES.map(async (r) => [r.id, await sha256Hex(r.template)])));
  const runnable = recipes.runnableRecipes(config.playground.packages);
  const block = bridge.registerPythonBlock({
    host,
    config: playgroundConfig({
      ...config.playground,
      examples: recipes.TREE_RECIPES.filter((r) => runnable.includes(r.id)).map((r) => ({ id: recipes.recipeExampleId(r.id), sha256: digests[r.id], title: r.label })),
      recipes: runnable,
      recipeDigests: digests,
      store,
    }),
    sources: new Map(recipes.TREE_RECIPES.map((r) => [recipes.recipeExampleId(r.id), { title: r.label, source: r.template }])),
    bind: (request, example) => {
      if (!example.source.includes(recipes.STORE_PLACEHOLDER)) return example;
      const binding = request.datasetId ? recipes.bindStore(request.datasetId, store) : null;
      const recipe = recipes.TREE_RECIPES.find((r) => recipes.recipeExampleId(r.id) === request.exampleId);
      if (!binding || !recipe) return null;
      return {
        title: `${binding.s3Path.replace(/\/+$/, "").split("/").pop()} · ${recipe.label}`,
        source: recipes.renderRecipe(recipe, binding, store.endpoint),
        notebookDataset: request.datasetId,
      };
    },
  });

  const panel = host.closest("[data-portal-tree-panel]");
  const expand = panel?.querySelector("[data-portal-tree-expand]");
  const notebookButton = document.createElement("button");
  notebookButton.type = "button";
  notebookButton.className = "dataset-tree__btn portal-tree-notebook";
  notebookButton.dataset.portalTreeNotebook = "";
  notebookButton.setAttribute("aria-label", "Open the notebook");
  const label = document.createElement("span");
  label.textContent = "Notebook";
  notebookButton.append(...logos.jupyterLogo(document), label);
  notebookButton.addEventListener("click", () => openNotebook());
  host.style.setProperty("--portal-jupyter-logo-light", `url("${logos.JUPYTER_LOGO}")`);
  host.style.setProperty("--portal-jupyter-logo-dark", `url("${logos.JUPYTER_LOGO_DARK}")`);

  const handle = mountDatasetTree(host, {
    source: createS3Source(store),
    toolbarExtras: [notebookButton, expand].filter(Boolean),
    accessExamples: (node) => recipes.recipeAccessExamples(node, { store, digests, runnable }),
    python: { enabled: true, onTry: (event) => void block.tryPython(event).catch(() => undefined) },
    onOpenNotebook: (node) => openNotebook({ dataset: node.id }),
    onInspect: (node) => openInspector(node.inspect),
    labels: { emptyBadge: "no data yet", inspect: "View metadata" },
    status: { tone: "live", label: "LIVE", code: store.endpoint },
  });
  Promise.all([import("@freva-org/dataset-tree/search-index"), fetch(siteUrl("assets/dataset-tree-search-index.json"))])
    .then(async ([{ parseDatasetTreeSearchIndexV1 }, response]) => response.ok && handle.setSearchIndex(parseDatasetTreeSearchIndexV1(await response.json())))
    .catch(report("search index"));
  host.querySelector('[data-dt-action="collapse-all"]')?.before(notebookButton);
  if (expand) settleBlockBar(panel);
  wireMaximizeControls(document, { mountLayer });
  const stopVisualise = addVisualise(host, store.endpoint);
  onDiscard(() => {
    stopVisualise();
    handle.destroy();
  });
}

async function preparePlayground() {
  const host = document.querySelector("[data-portal-python-playground]");
  if (host) host.setAttribute("data-portal-python-playground", JSON.stringify(playgroundConfig(JSON.parse(host.getAttribute("data-portal-python-playground")))));
  const [{ preparePythonPlayground }, { loadLocalChunks }, { mountRunnableCode }] = await Promise.all([
    import("@freva-org/browser-python/ui"),
    import("@freva-org/browser-python/ui/local"),
    import("@freva-org/browser-python/ui/code"),
  ]);
  await mountRunnableCode();
  preparePythonPlayground(loadLocalChunks);
}

async function mountStac(mount) {
  document.body.classList.add("waterpark-stac-page");
  const markRoute = () => {
    const path = (window.location.hash || "").replace(/^#/, "").split("?")[0].replace(/\/+$/, "");
    document.body.classList.toggle("waterpark-stac-root", path === "");
  };
  markRoute();
  window.addEventListener("hashchange", markRoute);
  for (const [id, attributes] of [
    ["meta-description", { name: "description", content: "" }],
    ["og-title", { property: "og:title", content: document.title }],
    ["og-description", { property: "og:description", content: "" }],
    ["og-locale", { property: "og:locale", content: "en" }],
    ["og-url", { property: "og:url", content: window.location.href }],
  ]) {
    const meta = document.getElementById(id) ?? document.head.appendChild(Object.assign(document.createElement("meta"), { id }));
    for (const [key, value] of Object.entries(attributes)) meta.setAttribute(key, value);
  }
  for (const style of config.app.stac.styles) {
    document.head.append(Object.assign(document.createElement("link"), { rel: "stylesheet", href: siteUrl(style) }));
  }
  try {
    const settings = await import(/* @vite-ignore */ siteUrl("assets/stac-browser.config.js")).catch(() => ({}));
    window.STAC_BROWSER_CONFIG = { ...(settings.default ?? {}), pathPrefix: new URL(".", window.location.href).pathname, historyMode: "hash" };
    await import(/* @vite-ignore */ siteUrl(config.app.stac.entry));
  } catch (error) {
    mount.append(Object.assign(document.createElement("div"), { className: "waterpark-stac-error", textContent: "The STAC Browser could not be loaded. Please try again later." }));
    report("STAC Browser")(error);
  }
}

async function mountDatabrowser(mount) {
  document.body.classList.add("waterpark-databrowser-page");
  const [widget, settings] = await Promise.all([
    import("@freva-org/databrowser"),
    import(/* @vite-ignore */ siteUrl("assets/databrowser.config.js")).catch(() => ({})),
  ]);
  const options = { ...(settings.default ?? settings.config ?? {}) };
  options.overlayRoot = document.body.appendChild(Object.assign(document.createElement("div"), { id: "waterpark-databrowser-overlay" }));
  options.theme = { ...(options.theme ?? {}), mode: currentTheme() === "dark" ? "night" : "day" };
  const handle = widget.mountDataBrowser(mount, options);
  const listener = (theme) => handle.setTheme(theme === "dark" ? "night" : "day");
  themeListeners.add(listener);
  onDiscard(() => {
    themeListeners.delete(listener);
    handle.destroy();
    options.overlayRoot.remove();
  });
}

function start() {
  followSiteTheme();
  if (document.querySelector("[data-portal-copy]")) initCodeCopy();
  if (!config) return;
  import("@freva-org/browser-python/ui/notebook").then((m) => m.initNotebookLinks(siteUrl(config.app.notebook.lab))).catch(report("notebook"));
  const trees = Promise.all([...document.querySelectorAll("[data-wp-dataset-tree]")].map((host) => mountTree(host).catch(report("dataset tree"))));
  if (document.querySelector("[data-portal-python-playground], [data-wp-dataset-tree]")) trees.then(preparePlayground).catch(report("Python"));
  const stac = document.getElementById("stac-browser-mount");
  if (stac) mountStac(stac);
  const databrowser = document.getElementById("databrowser-mount");
  if (databrowser) mountDatabrowser(databrowser).catch(report("Data Browser"));
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
