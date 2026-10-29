/**
 * Material for MkDocs Markdown -> Starlight Markdown.
 *
 * Pages written for this site are in Starlight's dialect already. Two kinds
 * of page are not, and are translated on every build by sync-content.mjs:
 *
 *   shared/      vendored from grid-doctor, which still renders them with
 *                MkDocs, so they arrive in Material's dialect;
 *   examples     rendered by build_examples.py from the example scripts,
 *                whose prose also feeds the notebooks.
 *
 * Covered: admonitions (!!! and ???), `/// caption`, `grid cards`,
 * #only-light/#only-dark images, attribute lists, icon shortcodes, fenced
 * code attributes and relative .md links (resolved to site paths).
 */
import { posix } from "node:path";

const ASIDE = {
  note: "note", info: "note", abstract: "note", summary: "note", example: "note", quote: "note",
  tip: "tip", hint: "tip", success: "tip", check: "tip", question: "tip", help: "tip", faq: "tip",
  warning: "caution", caution: "caution", attention: "caution",
  danger: "danger", error: "danger", failure: "danger", fail: "danger", bug: "danger",
};

const dedent = (lines, n = 4) => lines.map((l) => (l.startsWith(" ".repeat(n)) ? l.slice(n) : l.trimStart() === "" ? "" : l));

/** Take the indented body that follows line i (blank lines allowed inside). */
function indentedBlock(lines, start) {
  let end = start;
  while (end < lines.length && (lines[end].trim() === "" || /^ {4}|^\t/.test(lines[end]))) end++;
  while (end > start && lines[end - 1].trim() === "") end--;
  return { body: dedent(lines.slice(start, end)), end };
}

/** `!!! tip "Title"` / `??? note "Title"` blocks, recursively. */
function admonitions(lines) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(!!!|\?\?\?\+?)\s+(\w+)(?:\s+"([^"]*)")?\s*$/);
    if (!m) {
      out.push(lines[i]);
      continue;
    }
    const { body, end } = indentedBlock(lines, i + 1);
    const inner = admonitions(body);
    const [marker, type, title] = m.slice(1);
    if (marker.startsWith("???")) {
      const label = title || type[0].toUpperCase() + type.slice(1);
      out.push(`<details${marker.endsWith("+") ? " open" : ""}>`, `<summary>${label}</summary>`, "", ...inner, "", "</details>");
    } else {
      const kind = ASIDE[type] ?? "note";
      out.push(title === "" || title === undefined ? `:::${kind}` : `:::${kind}[${title}]`, ...inner, ":::");
    }
    i = end - 1;
  }
  return out;
}

/** `<div class="grid cards" markdown>` lists become a plain card grid. */
function cardGrids(lines) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/^<div class="grid cards" markdown>\s*$/.test(lines[i])) {
      out.push(lines[i]);
      continue;
    }
    let end = i + 1;
    while (end < lines.length && !/^<\/div>\s*$/.test(lines[end])) end++;
    const items = [];
    for (const line of lines.slice(i + 1, end)) {
      if (/^-   /.test(line)) items.push([line.slice(4)]);
      else if (items.length) items.at(-1).push(line);
    }
    out.push('<div class="wp-cards">', "");
    for (const item of items) {
      const body = dedent(item).filter((l) => l.trim() !== "---");
      out.push('<div class="wp-card">', "", ...body, "", "</div>", "");
    }
    out.push("</div>");
    i = end;
  }
  return out;
}

/** `/// caption` ... `///` after a figure. */
function captions(text) {
  return text.replace(/^\/\/\/ caption\s*\n([\s\S]*?)\n\/\/\/\s*$/gm, (_, body) => `<p class="wp-caption">${body.trim()}</p>`);
}

/** Resolve a link or image target relative to the page, into a site path. */
function resolver(pagePath) {
  const dir = posix.dirname(pagePath);
  return (target) => {
    if (/^([a-z]+:|#|\/)/i.test(target)) return target;
    const [path, hash = ""] = target.split("#");
    const joined = posix.normalize(posix.join(dir, path));
    if (joined.startsWith("assets/") || joined.startsWith("blobmap/")) return `/${joined}${hash ? `#${hash}` : ""}`;
    if (!/\.md$/.test(joined)) return target;
    const slug = joined.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, "/");
    return `/${slug}${hash ? `#${hash}` : ""}`;
  };
}

function inline(text, resolve) {
  return text
    // Material icon shortcodes; the card grid carries its own visual weight.
    .replace(/:(material|octicons|fontawesome|simple)-[\w-]+:(\{[^}]*\})?\s*/g, "")
    // Light/dark image pairs.
    .replace(/!\[([^\]]*)\]\(([^)\s]+)#only-(light|dark)\)/g, (_, alt, src, mode) => `<img src="${resolve(src)}" alt="${alt}" class="wp-only-${mode}" />`)
    // Images first (they can sit inside a link's label), then links:
    // resolve targets, drop attribute lists.
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)(\{[^}]*\})?/g, (_, alt, target) => `![${alt}](${resolve(target)})`)
    .replace(/(!?)\[((?:[^\]\[]|!\[[^\]]*\]\([^)]*\))*)\]\(([^)\s]+)\)(\{[^}]*\})?/g, (_, bang, label, target) => `${bang}[${label}](${resolve(target)})`)
    // Fenced code attributes: ```{ .python .try-in-python } -> ```python try-in-python
    .replace(/^(\s*)(`{3,}|~{3,})\s*\{\s*\.(\w+)([^}]*)\}\s*$/gm, (_, ind, fence, lang, rest) => {
      const flags = [...rest.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
      const title = rest.match(/title="([^"]*)"/);
      return `${ind}${fence}${lang}${flags.length ? ` ${flags.join(" ")}` : ""}${title ? ` title="${title[1]}"` : ""}`;
    })
    // Leftover attribute lists at the end of a line ({ .md-button } and friends).
    .replace(/\)\{[^}\n]*\}/g, ")")
    .replace(/<div([^>]*?)\s+markdown(="1")?>/g, "<div$1>");
}

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return { data: {}, body: text };
  const data = {};
  let key = null;
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) {
      key = kv[1];
      data[key] = kv[2] === "" ? [] : kv[2].replace(/^["']|["']$/g, "");
    } else if (key && /^\s*-\s+/.test(line) && Array.isArray(data[key])) data[key].push(line.replace(/^\s*-\s+/, ""));
  }
  return { data, body: text.slice(m[0].length) };
}

const yamlString = (s) => JSON.stringify(s);

export function translate(source, pagePath, { titles = {}, extra = {} } = {}) {
  let { data, body } = frontmatter(source);
  body = body.replace(/^<!--[\s\S]*?-->\s*/, "");

  // Starlight renders the title from frontmatter, so lift the first H1.
  let title = data.title ?? titles[pagePath];
  const h1 = body.match(/^# (.+)\n/m);
  if (h1) {
    title ??= h1[1].trim();
    body = body.replace(h1[0], "");
  }

  const resolve = resolver(pagePath);
  let lines = body.split("\n");
  lines = cardGrids(lines);
  lines = admonitions(lines);
  body = inline(captions(lines.join("\n")), resolve);

  const fm = [`title: ${yamlString(title ?? posix.basename(pagePath, ".md"))}`];
  if (data.description) fm.push(`description: ${yamlString(data.description)}`);
  const hide = Array.isArray(data.hide) ? data.hide : [];
  if (hide.includes("toc")) fm.push("tableOfContents: false");
  for (const [k, v] of Object.entries(extra)) fm.push(`${k}: ${v}`);
  return `---\n${fm.join("\n")}\n---\n\n${body.trimStart()}`;
}
