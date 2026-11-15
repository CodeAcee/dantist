// The 3D molar for demo 04. The tooth is one watertight surface built offline from signed distance fields
// (crown with four cusps and fissures, cervical waist, root trunk, furcation, two curved roots) and stored
// in tooth.bin (quantised positions, normals from the field). Here it gets its materials and the story:
// x-ray with pulp and canals, a facial veneer, a zirconia crown on a threaded implant.
// Performance: one draw per visible part, no transmission pass, adaptive pixel ratio, paused off screen.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const ease = t => 1 - Math.pow(1 - t, 3);
const seg = (p, a, b) => clamp((p - a) / (b - a));

/* ---------- tooth.bin ---------- */
async function loadMeshes(url) {
  const buf = await (await fetch(url)).arrayBuffer(), dv = new DataView(buf);
  if (dv.getUint32(0, true) !== 0x32485454) throw new Error('tooth.bin: bad magic');
  const n = dv.getUint32(4, true), out = [];
  let o = 8;
  for (let m = 0; m < n; m++) {
    const vc = dv.getUint32(o, true), ic = dv.getUint32(o + 4, true), ib = dv.getUint32(o + 8, true);
    const min = [0, 1, 2].map(a => dv.getFloat32(o + 12 + a * 4, true)), max = [0, 1, 2].map(a => dv.getFloat32(o + 24 + a * 4, true));
    o += 36;
    const q = new Int16Array(buf, o, vc * 3); o += vc * 6;
    const nr = new Int16Array(buf, o, vc * 3); o += vc * 6; o += (4 - (vc * 12) % 4) % 4;
    const idx = ib === 4 ? new Uint32Array(buf, o, ic) : new Uint16Array(buf, o, ic); o += ic * ib; o += (4 - (ic * ib) % 4) % 4;
    const pos = new Float32Array(vc * 3);
    for (let i = 0; i < vc * 3; i++) { const a = i % 3; pos[i] = min[a] + (q[i] + 32767) / 65534 * (max[a] - min[a]); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(new Int16Array(nr), 3, true));
    g.setIndex(new THREE.BufferAttribute(ib === 4 ? new Uint32Array(idx) : new Uint16Array(idx), 1));
    out.push(g);
  }
  return out;
}

// a part of a mesh: the faces whose three corners pass a test, optionally lifted along the normals
function subMesh(src, keep, lift = 0) {
  const P = src.attributes.position, N = src.attributes.normal, I = src.index.array;
  const map = new Int32Array(P.count).fill(-1), pos = [], nrm = [], idx = [];
  const ok = new Uint8Array(P.count);
  for (let i = 0; i < P.count; i++) ok[i] = keep(P.getX(i), P.getY(i), P.getZ(i)) ? 1 : 0;
  const add = i => {
    if (map[i] < 0) {
      map[i] = pos.length / 3;
      const nx = N.getX(i), ny = N.getY(i), nz = N.getZ(i);
      pos.push(P.getX(i) + nx * lift, P.getY(i) + ny * lift, P.getZ(i) + nz * lift); nrm.push(nx, ny, nz);
    }
    return map[i];
  };
  for (let t = 0; t < I.length; t += 3) if (ok[I[t]] && ok[I[t + 1]] && ok[I[t + 2]]) idx.push(add(I[t]), add(I[t + 1]), add(I[t + 2]));
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  g.setIndex(idx);
  return g;
}

// enamel white on the crown, a warm ivory band at the cementoenamel junction, cementum on the roots
function paint(g) {
  const P = g.attributes.position, col = new Float32Array(P.count * 3), c = new THREE.Color();
  const enamel = new THREE.Color(0xf1ede6), cej = new THREE.Color(0xf0dcbc), root = new THREE.Color(0xe2c294);
  for (let i = 0; i < P.count; i++) {
    const y = P.getY(i);
    c.copy(enamel).lerp(cej, smooth(-.02, -.2, y)).lerp(root, smooth(-.2, -.9, y));
    col.set([c.r, c.g, c.b], i * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
}

// the implant: a tapered body, a helical thread, the platform, a hex and the abutment
function implantGroup(mat, lite) {
  const grp = new THREE.Group(), V = (r, y) => new THREE.Vector2(r, y);
  grp.add(new THREE.Mesh(new THREE.LatheGeometry([V(.001, -1.62), V(.08, -1.6), V(.15, -1.5), V(.18, -1.2), V(.2, -.6), V(.205, -.1), V(.23, -.02), V(.23, 0)], lite ? 40 : 64), mat));
  class Helix extends THREE.Curve { getPoint(t, o = new THREE.Vector3()) { const a = t * Math.PI * 2 * 10, r = .2 - .07 * smooth(.6, 1, t); return o.set(Math.cos(a) * r, -.08 - t * 1.42, Math.sin(a) * r); } }
  grp.add(new THREE.Mesh(new THREE.TubeGeometry(new Helix(), lite ? 320 : 520, .038, 3, false), mat));
  const hex = new THREE.Mesh(new THREE.CylinderGeometry(.15, .15, .12, 6), mat); hex.position.y = .06; grp.add(hex);
  const abut = new THREE.Mesh(new THREE.CylinderGeometry(.12, .19, .34, lite ? 32 : 48), mat); abut.position.y = .29; grp.add(abut);
  return grp;
}

const fresnel = color => new THREE.ShaderMaterial({
  uniforms: { c: { value: new THREE.Color(color) }, o: { value: 0 } },
  vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
  fragmentShader: 'uniform vec3 c; uniform float o; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1. - abs(dot(normalize(vN), normalize(vV))), 2.4); gl_FragColor = vec4(mix(c, vec3(1.), .35) * (.45 + f * .9), (.04 + f * .6) * o); }',
  transparent: true, depthWrite: false, side: THREE.DoubleSide,
});

export async function mountTooth(canvas, { progress, still = false, host, src = 'tooth.bin', rot = .5, dprCap, keep = false }) {
  const mobile = () => innerWidth < 900;
  const lite = (navigator.hardwareConcurrency || 4) <= 4 || mobile();
  const dprMax = dprCap || Math.min(devicePixelRatio || 1, lite ? 1.5 : 1.75);
  const [toothG, pulpG] = await loadMeshes(src);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: (devicePixelRatio || 1) < 2, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: keep, failIfMajorPerformanceCaveat: !keep });
  let dpr = dprMax; renderer.setPixelRatio(dpr);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .94;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), .04).texture; pmrem.dispose();
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 50);
  const key = new THREE.DirectionalLight(0xffffff, 1.3); key.position.set(3, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xc6e6ff, 1.8); rim.position.set(-5, 2, -4); scene.add(rim);
  const warm = new THREE.DirectionalLight(0xffe2cc, .5); warm.position.set(2, -3, 3); scene.add(warm);
  const glintA = new THREE.PointLight(0xffffff, 42, 10, 2), glintB = new THREE.PointLight(0xdff0ff, 24, 10, 2); scene.add(glintA, glintB);

  const enamel = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: .16, ior: 1.62, specularIntensity: 1, clearcoat: 1, clearcoatRoughness: .035, envMapIntensity: .85, sheen: .35, sheenRoughness: .4, sheenColor: new THREE.Color(0xffeef3) });
  const veneerMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: .05, clearcoat: 1, clearcoatRoughness: .02, iridescence: .7, iridescenceIOR: 1.35, side: THREE.DoubleSide, transparent: true, opacity: 0 });
  const zirconia = new THREE.MeshPhysicalMaterial({ color: 0xfffdf9, roughness: .3, clearcoat: 1, clearcoatRoughness: .1, transparent: true, opacity: 0 });
  const titanium = new THREE.MeshStandardMaterial({ color: 0xc3c9d1, metalness: 1, roughness: .3, transparent: true, opacity: 0 });
  const xrayMat = fresnel(0x4aa3ff);
  const pulpMat = new THREE.MeshBasicMaterial({ color: 0xff6b8b, transparent: true, opacity: 0, depthWrite: false });

  paint(toothG);
  const tooth = new THREE.Group();
  const natural = new THREE.Mesh(toothG, enamel); tooth.add(natural);
  const xray = new THREE.Group(); tooth.add(xray);
  xray.add(new THREE.Mesh(toothG, xrayMat), new THREE.Mesh(pulpG, pulpMat));
  const veneer = new THREE.Mesh(subMesh(toothG, (x, y, z) => z > .12 && y > -.02, .03), veneerMat); tooth.add(veneer);
  const cap = new THREE.Mesh(subMesh(toothG, (x, y) => y > .02, .025), zirconia); tooth.add(cap);
  const implant = implantGroup(titanium, lite); tooth.add(implant);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.3, .01, 8, 160), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
  ring.rotation.x = Math.PI / 2; ring.position.y = -2.8; scene.add(ring);
  scene.add(tooth);

  let tx = 0, ty = 0, cx = 0, cy = 0, drag = null, spin = 0, spinV = 0;
  addEventListener('pointermove', e => { tx = (e.clientX / innerWidth - .5) * .5; ty = (e.clientY / innerHeight - .5) * .25; }, { passive: true });
  canvas.addEventListener('pointerdown', e => { drag = e.clientX; spinV = 0; });
  addEventListener('pointerup', () => { drag = null; });
  canvas.addEventListener('pointermove', e => { if (drag !== null) { spinV = (e.clientX - drag) * .012; spin += spinV; drag = e.clientX; } }, { passive: true });

  // resize only on a real change: a mobile toolbar showing or hiding moves the height a little, and
  // reallocating the drawing buffer then would stutter the scroll
  let lw = 0, lh = 0;
  function size() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (w === lw && Math.abs(h - lh) < 160 && lh) return;
    lw = w; lh = h; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  size(); addEventListener('resize', size);

  let onScreen = true;
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen && !still) loop(); }).observe(host || canvas);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !still) loop(); });

  let acc = 0, n = 0, skip = false, flip = false;
  function adapt(ms) {
    acc += ms; n++;
    if (n < 40) return;
    const avg = acc / n; acc = n = 0;
    if (avg > 24 && dpr > 1) { dpr = Math.max(1, dpr - .25); renderer.setPixelRatio(dpr); lh = 0; size(); }
    else if (avg > 28 && dpr <= 1) skip = true;
    else if (avg < 14 && dpr < dprMax) { dpr = Math.min(dprMax, dpr + .25); renderer.setPixelRatio(dpr); lh = 0; size(); skip = false; }
  }

  let px = mobile() ? 0 : 2.65, py = mobile() ? -.55 : -.05, running = false, t = 0, last = 0;
  const setT = (m, tr) => { if (m.transparent !== tr) { m.transparent = tr; m.depthWrite = !tr; m.needsUpdate = true; } };

  function draw(dt) {
    t += dt;
    const p = progress ? progress() : 0;
    cx += (tx - cx) * .06; cy += (ty - cy) * .06;
    if (drag === null) { spinV *= .95; spin += spinV; }
    const xr = seg(p, .16, .24) * (1 - seg(p, .32, .4));
    const vn = ease(seg(p, .4, .52)) * (1 - seg(p, .6, .66));
    const fin = seg(p, .8, .92), cp = ease(seg(p, .6, .74)) * (1 - fin), im = ease(seg(p, .62, .78)) * (1 - fin);

    enamel.opacity = (1 - xr * .85) * (1 - Math.max(cp, im)); setT(enamel, enamel.opacity < .995);
    xrayMat.uniforms.o.value = xr; pulpMat.opacity = xr * .7;
    veneerMat.opacity = vn; veneer.position.set(0, (1 - vn) * .25, (1 - vn) * 1.6);
    zirconia.opacity = cp; setT(zirconia, cp < .995); cap.position.y = (1 - cp) * 2.4;
    titanium.opacity = im; setT(titanium, im < .995);
    implant.position.y = -.2 - (1 - im) * 3.2; implant.rotation.y = (1 - im) * 16;
    ring.material.opacity = fin * .75;
    natural.visible = enamel.opacity > .01; xray.visible = xr > .01; veneer.visible = vn > .01; cap.visible = cp > .01; implant.visible = im > .01;

    tooth.rotation.y = (still ? rot : t * .22 + p * Math.PI * 4) + spin + cx;
    tooth.rotation.x = .16 + cy + Math.sin(t * .6) * .025;
    const m = mobile();
    const gx = m ? 0 : (p < .14 ? 2.65 : -1.7), gy = m ? (p < .14 ? -.55 : 1.15) : (p < .14 ? -.05 : .3);
    if (still) { px = gx; py = gy; } else { px += (gx - px) * .06; py += (gy - py) * .06; }
    tooth.position.set(px, py + (still ? 0 : Math.sin(t * .9) * .045), 0);
    glintA.position.set(px + 1.6 + Math.sin(t * .5) * .8, py + 1.9, 2.6 + Math.cos(t * .4) * .6);
    glintB.position.set(px - 1.8, py + 1.2 + Math.sin(t * .35) * .5, 2.2);
    camera.position.set(0, .35, (m ? 13.4 : 9.8) - xr * .5 - vn * .7 + fin * .3);
    camera.lookAt(0, -.15, 0);
    renderer.render(scene, camera);
  }

  function loop() {
    if (running) return; running = true; last = performance.now();
    const step = now => {
      if (!onScreen || document.hidden) { running = false; return; }
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      adapt(dt * 1000); flip = !flip;
      if (!skip || flip) draw(skip ? dt * 2 : dt);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  if (still) { draw(0); await new Promise(r => requestAnimationFrame(() => { draw(0); r(); })); } else loop();
  return { info: () => ({ ...renderer.info.render, dpr }) };
}
