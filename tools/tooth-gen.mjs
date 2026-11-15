// Builds the molar offline: signed distance fields -> marching cubes -> surface projection -> quantised binary.
// Output: tooth.bin with three meshes: 0 the whole tooth, 1 the pulp and canals, 2 the crown alone.
import { edgeTable, triTable } from 'three/examples/jsm/objects/MarchingCubes.js';
import fs from 'node:fs';

const out = process.argv[2] || 'tooth.bin';
const STEP = +(process.argv[3] || .02);

/* ---------- SDF toolkit ---------- */
const len = (x, y, z) => Math.hypot(x, y, z);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smoothstep = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const smin = (a, b, k) => { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k * .25; };
const smax = (a, b, k) => -smin(-a, -b, k);
function roundBox(x, y, z, bx, by, bz, r) {
  const qx = Math.abs(x) - bx + r, qy = Math.abs(y) - by + r, qz = Math.abs(z) - bz + r;
  return len(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, qy, qz), 0) - r;
}
function ellipsoid(x, y, z, rx, ry, rz) {
  const k0 = len(x / rx, y / ry, z / rz), k1 = len(x / (rx * rx), y / (ry * ry), z / (rz * rz));
  return k1 === 0 ? -Math.min(rx, ry, rz) : k0 * (k0 - 1) / k1;
}
function capsule(px, py, pz, ax, ay, az, bx, by, bz, r) {
  const pax = px - ax, pay = py - ay, paz = pz - az, bax = bx - ax, bay = by - ay, baz = bz - az;
  const h = clamp((pax * bax + pay * bay + paz * baz) / (bax * bax + bay * bay + baz * baz), 0, 1);
  return len(pax - bax * h, pay - bay * h, paz - baz * h) - r;
}
// iq's round cone between a (radius r1) and b (radius r2)
function roundCone(px, py, pz, a, b, r1, r2) {
  const bax = b[0] - a[0], bay = b[1] - a[1], baz = b[2] - a[2];
  const l2 = bax * bax + bay * bay + baz * baz, rr = r1 - r2, a2 = l2 - rr * rr, il2 = 1 / l2;
  const pax = px - a[0], pay = py - a[1], paz = pz - a[2];
  const y = pax * bax + pay * bay + paz * baz, z = y - l2;
  const xx = pax * l2 - bax * y, xy = pay * l2 - bay * y, xz = paz * l2 - baz * y;
  const x2 = xx * xx + xy * xy + xz * xz, y2 = y * y * l2, z2 = z * z * l2;
  const k = Math.sign(rr) * rr * rr * x2;
  if (Math.sign(z) * a2 * z2 > k) return Math.sqrt(x2 + z2) * il2 - r2;
  if (Math.sign(y) * a2 * y2 < k) return Math.sqrt(x2 + y2) * il2 - r1;
  return (Math.sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
}
function chain(px, py, pz, pts) {
  let d = 1e9;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    d = Math.min(d, roundCone(px, py, pz, a, b, a[3], b[3]));
  }
  return d;
}

/* ---------- the molar (y up, x mesiodistal, z buccolingual) ---------- */
const CUSPS = [[-.33, -.25, .3], [.31, -.27, .28], [-.34, .26, .29], [.32, .28, .27]];
function crownSDF(x, y, z) {
  const qy = y - .3;
  // the cervical waist: narrower toward the neck, the buccal bulge just above it
  const s = 1 - .3 * smoothstep(.16, -.46, qy) + .04 * Math.exp(-((qy + .02) ** 2) / .03);
  let d = roundBox(x / s, qy, z / s, .64, .38, .54, .27) * s;
  // four cusps and the low distal one
  for (const [cx, cz, r] of CUSPS) d = smin(d, ellipsoid(x - cx, qy - .3, z - cz, r, .22, r * .92), .17);
  d = smin(d, ellipsoid(x - .5, qy - .22, z - .02, .17, .14, .16), .12);
  // the central fissure (mesiodistal), the transverse groove, the buccal groove down the face, two pits
  d = smax(d, -capsule(x, qy, z, -.62, .58, .0, .62, .58, .0, .055), .07);
  d = smax(d, -capsule(x, qy, z, .0, .56, -.46, .0, .56, .46, .045), .06);
  d = smax(d, -capsule(x, qy, z, .0, .5, .44, .0, .1, .6, .03), .05);
  d = smax(d, -capsule(x, qy, z, .26, .52, -.18, .3, .52, .18, .03), .04);
  return d;
}
const ROOTS = [
  [[-.27, -.2, 0, .27], [-.32, -.6, .01, .245], [-.36, -1.0, .01, .21], [-.385, -1.4, 0, .165], [-.37, -1.78, -.01, .11], [-.33, -2.08, -.02, .055], [-.31, -2.2, -.02, .025]],
  [[.27, -.2, 0, .27], [.33, -.6, -.01, .24], [.36, -1.0, 0, .2], [.36, -1.38, .01, .155], [.32, -1.72, .01, .1], [.27, -1.98, 0, .05], [.25, -2.08, 0, .022]],
];
function rootsSDF(x, y, z) {
  // roots are wide buccolingually: evaluate in a space squeezed along z
  const zs = .74;
  let d = 1e9;
  for (const r of ROOTS) d = Math.min(d, chain(x, y, z * zs, r));
  // a shallow groove on the mesial and distal faces of each root
  return d / 1.0 * Math.max(zs, .9);
}
function trunkSDF(x, y, z) { return roundCone(x, y, z / .86, [0, -.02, 0], [0, -.42, 0], .44, .36) * .86; }
function toothSDF(x, y, z) {
  let d = smin(crownSDF(x, y, z), trunkSDF(x, y, z), .14);
  d = smin(d, rootsSDF(x, y, z), .14);
  return d;
}
function pulpSDF(x, y, z) {
  let d = ellipsoid(x, y - .12, z, .33, .17, .25);
  for (const [cx, cz] of CUSPS) d = smin(d, ellipsoid(x - cx * .72, y - .3, z - cz * .72, .07, .14, .07), .08);
  for (const r of ROOTS) {
    const c = r.slice(0, 4).map(([px, py, pz], i) => [px, py + (i ? 0 : .1), pz, [.1, .07, .045, .02][i]]);
    d = smin(d, chain(x, y, z * .8, c) * .8, .08);
  }
  return d;
}
function capSDF(x, y, z) { return smax(crownSDF(x, y, z) - .0, -(y + .16), .06); }

/* ---------- marching cubes with welded vertices ---------- */
function polygonize(f, [x0, y0, z0], [x1, y1, z1], h) {
  const nx = Math.ceil((x1 - x0) / h) + 1, ny = Math.ceil((y1 - y0) / h) + 1, nz = Math.ceil((z1 - z0) / h) + 1;
  const V = new Float32Array(nx * ny * nz);
  for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) V[i + nx * (j + ny * k)] = f(x0 + i * h, y0 + j * h, z0 + k * h);
  const C = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
  const E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  const pos = [], idx = [], key = new Map();
  const id = (i, j, k) => i + nx * (j + ny * k);
  const vert = (i, j, k, e) => {
    const [a, b] = E[e], ca = C[a], cb = C[b];
    const ia = id(i + ca[0], j + ca[1], k + ca[2]), ib = id(i + cb[0], j + cb[1], k + cb[2]);
    const kk = ia < ib ? ia * 4194304 + ib : ib * 4194304 + ia;
    let v = key.get(kk);
    if (v === undefined) {
      const va = V[ia], vb = V[ib], t = va / (va - vb);
      pos.push(x0 + (i + ca[0] + (cb[0] - ca[0]) * t) * h, y0 + (j + ca[1] + (cb[1] - ca[1]) * t) * h, z0 + (k + ca[2] + (cb[2] - ca[2]) * t) * h);
      v = pos.length / 3 - 1; key.set(kk, v);
    }
    return v;
  };
  const vals = new Float32Array(8);
  for (let k = 0; k < nz - 1; k++) for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
    let ci = 0;
    for (let c = 0; c < 8; c++) { vals[c] = V[id(i + C[c][0], j + C[c][1], k + C[c][2])]; if (vals[c] < 0) ci |= 1 << c; }
    if (!edgeTable[ci]) continue;
    for (let t = 0; triTable[ci * 16 + t] !== -1; t += 3) {
      const a = vert(i, j, k, triTable[ci * 16 + t]), b = vert(i, j, k, triTable[ci * 16 + t + 1]), c = vert(i, j, k, triTable[ci * 16 + t + 2]);
      if (a !== b && b !== c && a !== c) idx.push(a, b, c);
    }
  }
  return { pos: new Float32Array(pos), idx: Uint32Array.from(idx) };
}

function grad(f, x, y, z, e = .0015) {
  const gx = f(x + e, y, z) - f(x - e, y, z), gy = f(x, y + e, z) - f(x, y - e, z), gz = f(x, y, z + e) - f(x, y, z - e);
  const l = Math.hypot(gx, gy, gz) || 1; return [gx / l, gy / l, gz / l];
}
function finish(f, m) {
  const { pos, idx } = m, n = new Float32Array(pos.length);
  for (let v = 0; v < pos.length; v += 3) {
    let x = pos[v], y = pos[v + 1], z = pos[v + 2];
    for (let it = 0; it < 2; it++) { const d = f(x, y, z), g = grad(f, x, y, z); x -= d * g[0]; y -= d * g[1]; z -= d * g[2]; }
    pos[v] = x; pos[v + 1] = y; pos[v + 2] = z;
    n.set(grad(f, x, y, z), v);
  }
  // winding: make faces agree with the field's outward normal
  let agree = 0;
  for (let t = 0; t < Math.min(idx.length, 3000); t += 3) {
    const a = idx[t] * 3, b = idx[t + 1] * 3, c = idx[t + 2] * 3;
    const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
    const vx = pos[c] - pos[a], vy = pos[c + 1] - pos[a + 1], vz = pos[c + 2] - pos[a + 2];
    agree += Math.sign((uy * vz - uz * vy) * n[a] + (uz * vx - ux * vz) * n[a + 1] + (ux * vy - uy * vx) * n[a + 2]);
  }
  if (agree < 0) for (let t = 0; t < idx.length; t += 3) { const s = idx[t + 1]; idx[t + 1] = idx[t + 2]; idx[t + 2] = s; }
  return { pos, nrm: n, idx };
}

/* ---------- pack ---------- */
function pack(meshes) {
  const parts = [], head = new Uint32Array([0x31485454, meshes.length]); parts.push(Buffer.from(head.buffer));
  for (const m of meshes) {
    const vc = m.pos.length / 3, ic = m.idx.length, big = vc > 65535;
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (let v = 0; v < m.pos.length; v += 3) for (let a = 0; a < 3; a++) { min[a] = Math.min(min[a], m.pos[v + a]); max[a] = Math.max(max[a], m.pos[v + a]); }
    const h = Buffer.alloc(36); h.writeUInt32LE(vc, 0); h.writeUInt32LE(ic, 4); h.writeUInt32LE(big ? 4 : 2, 8);
    for (let a = 0; a < 3; a++) { h.writeFloatLE(min[a], 12 + a * 4); h.writeFloatLE(max[a], 24 + a * 4); }
    parts.push(h);
    const q = new Int16Array(vc * 3);
    for (let v = 0; v < vc * 3; v++) { const a = v % 3; q[v] = Math.round(((m.pos[v] - min[a]) / ((max[a] - min[a]) || 1)) * 65534 - 32767); }
    const nb = Buffer.alloc(vc * 3); for (let v = 0; v < vc * 3; v++) nb.writeInt8(Math.round(m.nrm[v] * 127), v);
    const body = q.byteLength + nb.length, pad = (4 - body % 4) % 4;
    parts.push(Buffer.from(q.buffer), nb, Buffer.alloc(pad));
    const ib = Buffer.from((big ? Uint32Array.from(m.idx) : Uint16Array.from(m.idx)).buffer);
    parts.push(ib, Buffer.alloc((4 - ib.length % 4) % 4));
    console.log(`mesh: ${vc} verts, ${ic / 3} tris`);
  }
  return Buffer.concat(parts);
}

const t0 = Date.now();
const tooth = finish(toothSDF, polygonize(toothSDF, [-.95, -2.3, -.85], [.95, 1.15, .85], STEP));
const pulp = finish(pulpSDF, polygonize(pulpSDF, [-.7, -2.1, -.45], [.7, .55, .45], .035));
const buf = pack([tooth, pulp]);
fs.writeFileSync(out, buf);
console.log(`${out}: ${(buf.length / 1024).toFixed(0)} KB in ${Date.now() - t0} ms`);
