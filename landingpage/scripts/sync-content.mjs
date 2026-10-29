#!/usr/bin/env node
/**
 * Put the pages that are not written here into src/content/docs.
 *
 *   shared/*.md         vendored from grid-doctor (scripts/sync_shared.py)
 *   examples/*.py       rendered by build_examples.py --render, which is
 *                       offline: it reads the scripts and committed figures
 *
 * Both arrive in Material's Markdown dialect and are translated on the way
 * in (scripts/material-md.mjs).
 *
 * The generated pages sit next to the hand-written ones because Starlight
 * and the link checker both read exactly one directory. To keep them apart
 * anyway, this writes src/content/docs/.gitignore listing every file it
 * generated (and itself). That one file keeps them out of git, tells the
 * next run what to replace, and lets this refuse to overwrite a
 * hand-written page that happens to share a path with a generated one.
 *
 * `npm run build` and `npm run dev` run this first.
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { translate } from "./material-md.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "src", "content", "docs");
const LEDGER = join(DOCS, ".gitignore");
const RENDERED = join(ROOT, ".cache", "examples");

// Vendored pages carry no title of their own (MkDocs took it from the nav),
// so this is the one place their titles are written.
const VENDORED_TITLES = {
  "technical-decisions.md": "Remapping decisions",
};

const log = (message) => console.log(`[content] ${message}`);

/** Paths written by the previous run, from the .gitignore it left. */
function previous() {
  if (!existsSync(LEDGER)) return [];
  return readFileSync(LEDGER, "utf8")
    .split("\n")
    .filter((line) => line.startsWith("/") && line !== "/.gitignore")
    .map((line) => line.slice(1));
}

function renderExamples() {
  // build_examples.py substitutes its card grid into the index page it finds
  // in the output tree, so the hand-written index goes there first.
  rmSync(RENDERED, { recursive: true, force: true });
  mkdirSync(join(RENDERED, "examples"), { recursive: true });
  cpSync(join(ROOT, "examples", "index.md"), join(RENDERED, "examples", "index.md"));
  execFileSync(process.env.WATERPARK_PYTHON ?? "python3", [join(ROOT, "scripts", "build_examples.py"), "--render", "--out", RENDERED], {
    cwd: ROOT,
    stdio: ["ignore", "ignore", "inherit"],
  });
}

function main() {
  for (const rel of previous()) rmSync(join(DOCS, rel), { force: true });

  renderExamples();
  const pages = [
    ...readdirSync(join(ROOT, "shared"))
      .filter((name) => name.endsWith(".md"))
      .map((name) => ({ from: join(ROOT, "shared", name), rel: name })),
    ...readdirSync(join(RENDERED, "examples"))
      .filter((name) => name.endsWith(".md"))
      .map((name) => ({ from: join(RENDERED, "examples", name), rel: `examples/${name}` })),
  ];

  const written = [];
  for (const { from, rel } of pages) {
    const target = join(DOCS, rel);
    if (existsSync(target) || existsSync(target.replace(/\.md$/, ".mdx"))) {
      throw new Error(`${rel} is generated, but src/content/docs already has a page there; rename one of the two`);
    }
    const extra = {};
    const order = rel.match(/^examples\/(\d+)_/);
    if (order) extra.sidebar = `{ order: ${Number(order[1])} }`;
    if (rel === "examples/index.md") extra.sidebar = `{ order: 0, label: "Start here" }`;
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, translate(readFileSync(from, "utf8"), rel, { titles: VENDORED_TITLES, extra }));
    written.push(rel);
  }

  writeFileSync(
    LEDGER,
    [
      "# Written by scripts/sync-content.mjs: the pages it generated, which",
      "# are not sources. Edit shared/ or examples/ instead. Regenerated on",
      "# every build, and ignores itself.",
      "/.gitignore",
      ...written.map((rel) => `/${rel}`),
      "",
    ].join("\n"),
  );
  log(`${written.length} generated pages`);
}

main();
