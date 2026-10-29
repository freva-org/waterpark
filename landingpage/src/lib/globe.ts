/**
 * The look of the HEALPix globe, shared by the hero figure
 * (src/components/HealpixGlobe.astro) and the logo (scripts/make-logo.mjs),
 * so the two cannot drift apart.
 */
import type { LonLat } from "./healpix";

/**
 * An illustrative field: warm at the equator, cold at the poles, with
 * eddy-sized structure on top that coarse levels average away and fine
 * levels resolve. That difference is what the figure is for.
 */
export function field([lon, lat]: LonLat): number {
  const large = 0.85 * Math.cos(lat) ** 2 + 0.1 * Math.sin(3 * lon + 2.2 * lat) * Math.cos(lat);
  const eddies = 0.22 * Math.sin(17 * lon + 5 * Math.sin(9 * lat)) * Math.sin(15 * lat + 3 * Math.cos(11 * lon));
  return Math.max(0, Math.min(1, large + eddies * Math.cos(lat)));
}

// Deep water to warm sand. Amber is kept for the refined region's outline.
const STOPS: [number, [number, number, number]][] = [
  [0, [27, 52, 92]],
  [0.4, [14, 110, 116]],
  [0.7, [95, 199, 194]],
  [1, [240, 228, 196]],
];

export function colour(v: number): string {
  let i = 0;
  while (i < STOPS.length - 2 && v > STOPS[i + 1][0]) i++;
  const [a, ca] = STOPS[i];
  const [b, cb] = STOPS[i + 1];
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  const c = ca.map((x, k) => Math.round(x + (cb[k] - x) * t));
  return `rgb(${c.join(" ")})`;
}

type Projector = (point: LonLat) => { x: number; y: number; visible: boolean };

/**
 * A cell outline as an SVG path on the unit disc; points behind the horizon
 * are pulled onto it. Null when the whole cell faces away.
 */
export function ringPath(project: Projector, ring: LonLat[]): string | null {
  const pts = ring.map(project);
  if (!pts.some((p) => p.visible)) return null;
  const xy = pts.map((p) => {
    if (p.visible) return [p.x, p.y];
    const r = Math.hypot(p.x, p.y) || 1;
    return [p.x / r, p.y / r];
  });
  return "M" + xy.map(([x, y]) => `${x.toFixed(4)} ${y.toFixed(4)}`).join("L") + "Z";
}
