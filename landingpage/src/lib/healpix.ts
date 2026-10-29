/**
 * Just enough HEALPix to draw cell outlines at build time.
 *
 * A cell is addressed by (face, ix, iy) at a given nside; a point inside
 * it by fractional offsets (dx, dy) in [0, 1]. This is HEALPix's xyf2loc,
 * as used by healpy's `boundaries`, which is all a drawing needs: walk the
 * four edges in small steps and the curved boundaries come out right.
 */

const JRLL = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
const JPLL = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7];

export type LonLat = [lon: number, lat: number];

/** Position of (x, y) in face coordinates, both in [0, 1]. Radians. */
export function faceToLonLat(face: number, x: number, y: number): LonLat {
  const jr = JRLL[face] - x - y;
  let nr: number;
  let z: number;
  if (jr < 1) {
    nr = jr;
    z = 1 - (nr * nr) / 3;
  } else if (jr > 3) {
    nr = 4 - jr;
    z = (nr * nr) / 3 - 1;
  } else {
    nr = 1;
    z = ((2 - jr) * 2) / 3;
  }
  let t = JPLL[face] * nr + x - y;
  if (t < 0) t += 8;
  if (t >= 8) t -= 8;
  const lon = nr < 1e-15 ? 0 : ((Math.PI / 4) * t) / nr;
  return [lon, Math.asin(Math.max(-1, Math.min(1, z)))];
}

/** Outline of one cell as a closed ring of lon/lat points. */
export function cellBoundary(nside: number, face: number, ix: number, iy: number, steps = 4): LonLat[] {
  const ring: LonLat[] = [];
  const at = (dx: number, dy: number) => ring.push(faceToLonLat(face, (ix + dx) / nside, (iy + dy) / nside));
  for (let s = 0; s < steps; s++) at(1 - s / steps, 1);
  for (let s = 0; s < steps; s++) at(0, 1 - s / steps);
  for (let s = 0; s < steps; s++) at(s / steps, 0);
  for (let s = 0; s < steps; s++) at(1, s / steps);
  return ring;
}

export function cellCentre(nside: number, face: number, ix: number, iy: number): LonLat {
  return faceToLonLat(face, (ix + 0.5) / nside, (iy + 0.5) / nside);
}

/** Every cell at a level, as (face, ix, iy). */
export function* cells(nside: number): Generator<[number, number, number]> {
  for (let face = 0; face < 12; face++)
    for (let ix = 0; ix < nside; ix++) for (let iy = 0; iy < nside; iy++) yield [face, ix, iy];
}

/** Orthographic projection centred on (lon0, lat0), radius 1. */
export function orthographic(lon0: number, lat0: number) {
  const sin0 = Math.sin(lat0);
  const cos0 = Math.cos(lat0);
  return ([lon, lat]: LonLat) => {
    const cosc = sin0 * Math.sin(lat) + cos0 * Math.cos(lat) * Math.cos(lon - lon0);
    const x = Math.cos(lat) * Math.sin(lon - lon0);
    const y = cos0 * Math.sin(lat) - sin0 * Math.cos(lat) * Math.cos(lon - lon0);
    return { x, y: -y, visible: cosc > 0 };
  };
}

/** Great-circle distance in radians. */
export function distance([a, b]: LonLat, [c, d]: LonLat): number {
  return Math.acos(Math.min(1, Math.sin(b) * Math.sin(d) + Math.cos(b) * Math.cos(d) * Math.cos(a - c)));
}
