#!/usr/bin/env node
/**
 * Draw the Waterpark logo and icons from HEALPix geometry.
 *
 *   node scripts/make-logo.mjs        (or: just logo)
 *
 * The mark is the landing page's globe in miniature: a coarse HEALPix grid
 * with one region refined, each refined cell outlined in amber. It uses the
 * same geometry (src/lib/healpix.ts) and the same field and colours
 * (src/lib/globe.ts) as the hero figure, so the two stay one picture.
 *
 * Three cuts of the same mark, as icon sets usually have, each simpler so
 * it still reads at its size:
 *
 *   detailed   level 2 grid, refined to level 4      logo-512.png,
 *                                                     apple-touch-icon.png,
 *                                                     favicon 48 px
 *   bold       level 1 grid, refined to level 3      logo.svg (the site
 *                                                     header, ~40 px), favicon
 *                                                     32 px
 *   tiny       the 12 base faces, one refined to      favicon 16 px
 *              level 2; heaviest lines, largest globe
 *
 * Writes into assets/. The outputs are committed, like the example figures:
 * the site build never runs this.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { colour, field, ringPath } from "../src/lib/globe.ts";
import { cellBoundary, cellCentre, cells, distance, orthographic } from "../src/lib/healpix.ts";

const ASSETS = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");

const NAVY = "#0f1b2d";
const GLOBE = "#13283f";
const AMBER = "#fbbf24";
const LAGOON = "#5fc7c2";

const deg = Math.PI / 180;
const VIEW = [-12 * deg, 30 * deg];
const FOCUS = [-2 * deg, 48 * deg];

const CUTS = {
  detailed: { coarse: 4, fine: 16, radius: 21 * deg, grid: 0.012, outline: 0.028, rim: 0.03, steps: 6, fill: 0.72, scale: 196 },
  bold: { coarse: 2, fine: 8, radius: 30 * deg, grid: 0, outline: 0.075, rim: 0.07, steps: 8, fill: 0.62, scale: 212 },
  tiny: { coarse: 1, fine: 2, radius: 38 * deg, grid: 0, outline: 0.16, rim: 0.12, steps: 12, fill: 0.5, scale: 232 },
};

/** The mark on the unit disc, as SVG markup (no <svg> wrapper). */
function mark(cut) {
  const { coarse, fine, radius, grid, outline, rim, steps, fill } = CUTS[cut];
  const ratio = fine / coarse;
  const project = orthographic(...VIEW);
  const path = (ring) => ringPath(project, ring);

  const base = [];
  const refined = [];
  const outlines = [];
  for (const [face, ix, iy] of cells(coarse)) {
    const d = path(cellBoundary(coarse, face, ix, iy, steps));
    if (!d) continue;
    const centre = cellCentre(coarse, face, ix, iy);
    const grid_ = grid ? ` stroke="${LAGOON}" stroke-opacity=".3" stroke-width="${grid}"` : "";
    base.push(`<path d="${d}" fill="${colour(field(centre))}" fill-opacity="${fill}"${grid_}/>`);
    if (distance(centre, FOCUS) >= radius) continue;
    outlines.push(`<path d="${d}"/>`);
    for (let a = 0; a < ratio; a++)
      for (let b = 0; b < ratio; b++) {
        const jx = ix * ratio + a;
        const jy = iy * ratio + b;
        const dd = path(cellBoundary(fine, face, jx, jy, 1));
        const c = colour(field(cellCentre(fine, face, jx, jy)));
        if (dd) refined.push(`<path d="${dd}" fill="${c}" stroke="${c}" stroke-width="0.004"/>`);
      }
  }

  return (
    `<defs><clipPath id="wp-logo-disc"><circle r="1"/></clipPath>` +
    `<radialGradient id="wp-logo-shade" cx="-0.35" cy="-0.4" r="1.5" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/>` +
    `<stop offset="1" stop-color="#000" stop-opacity=".3"/></radialGradient></defs>` +
    `<circle r="1" fill="${GLOBE}"/>` +
    `<g clip-path="url(#wp-logo-disc)">${base.join("")}${refined.join("")}` +
    `<g fill="none" stroke="${AMBER}" stroke-width="${outline}" stroke-linejoin="round">${outlines.join("")}</g>` +
    `<circle r="1" fill="url(#wp-logo-shade)"/></g>` +
    `<circle r="1" fill="none" stroke="${LAGOON}" stroke-opacity=".75" stroke-width="${rim}"/>`
  );
}

/**
 * The mark on the navy tile. `corner` is the tile's corner radius as a
 * fraction of its size: 0 for a full-bleed square (iOS rounds its icons
 * itself and shows transparent corners as black).
 */
function icon(cut, corner = 0.2) {
  const tile = corner ? `<rect width="512" height="512" rx="${512 * corner}" fill="${NAVY}"/>` : `<rect width="512" height="512" fill="${NAVY}"/>`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">` +
    `<title>Waterpark</title>${tile}<g transform="translate(256 256) scale(${CUTS[cut].scale})">${mark(cut)}</g></svg>\n`
  );
}

const png = (svg, size) => sharp(Buffer.from(svg), { density: 72 * (size / 512) * 4 }).resize(size, size).png().toBuffer();

/** A .ico holding PNG images, which every current browser reads. */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const at = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, at);
    header.writeUInt8(size >= 256 ? 0 : size, at + 1);
    header.writeUInt16LE(1, at + 4);
    header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(data.length, at + 8);
    header.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

const detailed = icon("detailed");
const bold = icon("bold");
const tiny = icon("tiny", 0.16);

writeFileSync(join(ASSETS, "logo.svg"), bold);
writeFileSync(join(ASSETS, "logo-512.png"), await png(detailed, 512));
writeFileSync(join(ASSETS, "apple-touch-icon.png"), await png(icon("detailed", 0), 180));
writeFileSync(
  join(ASSETS, "favicon.ico"),
  ico([
    { size: 16, data: await png(tiny, 16) },
    { size: 32, data: await png(bold, 32) },
    { size: 48, data: await png(detailed, 48) },
  ]),
);
console.log("[logo] logo.svg, logo-512.png, apple-touch-icon.png, favicon.ico (16, 32, 48) in assets/");
