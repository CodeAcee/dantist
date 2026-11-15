// The 3D molar for demo 04: an anatomical crown (four cusps, fissures, cervical waist), two curved roots on a
// root trunk, pulp and canals for the x-ray act, a facial veneer shell, a zirconia crown and a threaded implant.
// Performance: no transmission pass, one fresnel shader for the x-ray, geometry built once, adaptive pixel
// ratio, rendering only while the stage is on screen and the tab is visible.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const ease = t => 1 - Math.pow(1 - t, 3);
const seg = (p, a, b) => clamp((p - a) / (b - a));
const gauss = (d2, s) => Math.exp(-d2 / (2 * s * s));

/* ---------- geometry ---------- */

// crown: a unit sphere pushed onto a rounded block, then the occlusal relief
function crownGeometry(w, h) {
  const g = new THREE.SphereGeometry(1, w, h);
  const pos = g.attributes.position, col = new Float32Array(pos.count * 3);
  const d = new THREE.Vector3(), enamel = new THREE.Color(0xfdfbf6), neck = new THREE.Color(0xeee0c8), c = new THREE.Color();
  const ax = .84, az = .72, ayT = .58, ayB = .52, n = 3.2;
  const cusps = [[-.36, -.27, .17], [.34, -.29, .15], [-.35, .27, .16], [.33, .28, .14], [0, .02, .05]];
  for (let i = 0; i < pos.count; i++) {
    d.fromBufferAttribute(pos, i).normalize();
    const ay = d.y > 0 ? ayT : ayB;
    const r = Math.pow(Math.pow(Math.abs(d.x / ax), n) + Math.pow(Math.abs(d.y / ay), n) + Math.pow(Math.abs(d.z / az), n), -1 / n);
    let x = d.x * r, y = d.y * r, z = d.z * r;
    // the buccal bulge in the cervical third, the waist at the neck
    const waist = 1 - .3 * smooth(.05, .52, -y);
    x *= waist; z *= waist * (1 + .05 * gauss((y + .12) * (y + .12), .18));
    // occlusal table: cusps up, the central fissure and the buccal and lingual grooves down
    const w8 = smooth(.18, .56, y) * smooth(.95, .55, Math.hypot(x / ax, z / az));
    if (w8 > 0) {
      let hgt = 0;
      for (const [cx, cz, a] of cusps) hgt += a * gauss((x - cx) ** 2 + (z - cz) ** 2, .19);
      hgt -= .12 * gauss(z * z, .045) * smooth(.78, .2, Math.abs(x));
      hgt -= .07 * gauss(x * x, .04) * smooth(.75, .15, Math.abs(z));
      hgt -= .03 * gauss((x - .48) ** 2 + z * z, .05) + .03 * gauss((x + .5) ** 2 + z * z, .05);
      y += w8 * (hgt - .08);
    }
    // a little surface life
    const k = .004 * (Math.sin(19 * x + 2) * Math.sin(23 * z + 1) + .6 * Math.sin(31 * y + 3 * x));
    pos.setXYZ(i, x * (1 + k), y + .12, z * (1 + k));
    c.copy(enamel).lerp(neck, smooth(-.05, -.5, y));
    col.set([c.r, c.g, c.b], i * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.computeVertexNormals();
  return g;
}

// a tube with an elliptic section along a curve, tapering to a rounded tip
function taperedTube(curve, { rx, rz, steps, radial, tipPow = .55, open = true, groove = 0 }) {
  const verts = [], norms = [], idx = [];
  const T = new THREE.Vector3(), X = new THREE.Vector3(), Z = new THREE.Vector3(0, 0, 1), C = new THREE.Vector3(), P = new THREE.Vector3();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    curve.getPointAt(t, C); curve.getTangentAt(t, T);
    X.crossVectors(T, Z).normalize();
    const s = Math.pow(1 - t, tipPow) * (1 - .12 * t) + (i === steps ? 0 : .002);
    for (let j = 0; j <= radial; j++) {
      const a = j / radial * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
      const gr = 1 - groove * Math.pow(Math.abs(ca), 6);
      P.copy(C).addScaledVector(X, ca * rx * s * gr).addScaledVector(Z, sa * rz * s);
      verts.push(P.x, P.y, P.z);
      norms.push(0, 0, 0);
    }
  }
  const row = radial + 1;
  for (let i = 0; i < steps; i++) for (let j = 0; j < radial; j++) {
    const a = i * row + j, b = a + row;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

const curve = pts => new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)), false, 'centripetal');
const rootCurves = [
  curve([[-.3, -.2, 0], [-.36, -.85, .02], [-.4, -1.45, 0], [-.33, -2.05, -.02]]),
  curve([[.3, -.2, 0], [.39, -.85, -.01], [.38, -1.4, .02], [.26, -1.95, 0]]),
];

// the facial veneer: the crown's buccal faces, lifted off along their normals
function veneerGeometry(crown) {
  const src = crown.attributes.position, nrm = crown.attributes.normal, index = crown.index.array;
  const keep = new Uint8Array(src.count);
  for (let i = 0; i < src.count; i++) keep[i] = src.getZ(i) > .1 && src.getY(i) > -.36 && src.getY(i) < .62 ? 1 : 0;
  const map = new Int32Array(src.count).fill(-1), pos = [], idx = [];
  const add = i => { if (map[i] < 0) { map[i] = pos.length / 3; pos.push(src.getX(i) + nrm.getX(i) * .03, src.getY(i) + nrm.getY(i) * .03, src.getZ(i) + nrm.getZ(i) * .03); } return map[i]; };
  for (let t = 0; t < index.length; t += 3) {
    const [a, b, c] = [index[t], index[t + 1], index[t + 2]];
    if (keep[a] && keep[b] && keep[c]) idx.push(add(a), add(b), add(c));
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

// the implant: a tapered body, a helical thread, the platform, a hex and the abutment
function implantGroup(mat, mobile) {
  const grp = new THREE.Group();
  const V = (r, y) => new THREE.Vector2(r, y);
  const body = new THREE.LatheGeometry([V(.001, -1.62), V(.08, -1.6), V(.15, -1.5), V(.18, -1.2), V(.2, -.6), V(.205, -.1), V(.23, -.02), V(.23, 0)], mobile ? 40 : 64);
  grp.add(new THREE.Mesh(body, mat));
  class Helix extends THREE.Curve { getPoint(t, o = new THREE.Vector3()) { const a = t * Math.PI * 2 * 10, y = -.08 - t * 1.42, r = .2 - .07 * smooth(.6, 1, t); return o.set(Math.cos(a) * r, y, Math.sin(a) * r); } }
  grp.add(new THREE.Mesh(new THREE.TubeGeometry(new Helix(), mobile ? 320 : 520, .038, 3, false), mat));
  const hex = new THREE.Mesh(new THREE.CylinderGeometry(.15, .15, .12, 6), mat); hex.position.y = .06; grp.add(hex);
  const abut = new THREE.Mesh(new THREE.CylinderGeometry(.12, .19, .34, mobile ? 32 : 48), mat); abut.position.y = .29; grp.add(abut);
  return grp;
}

/* ---------- materials ---------- */
const fresnel = (color) => new THREE.ShaderMaterial({
  uniforms: { c: { value: new THREE.Color(color) }, o: { value: 0 } },
  vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
  fragmentShader: 'uniform vec3 c; uniform float o; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1. - abs(dot(normalize(vN), normalize(vV))), 2.4); gl_FragColor = vec4(mix(c, vec3(1.), .35) * (.45 + f * .9), (.04 + f * .6) * o); }',
  transparent: true, depthWrite: false, side: THREE.DoubleSide,
});

/* ---------- mount ---------- */
export function mountTooth(canvas, { progress, still = false, host }) {
  const mobile = () => innerWidth < 900;
  const lowEnd = (navigator.hardwareConcurrency || 4) <= 4 || mobile();
  const dprMax = Math.min(devicePixelRatio || 1, lowEnd ? 1.5 : 1.75);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: (devicePixelRatio || 1) < 2, alpha: true, powerPreference: 'high-performance' });
  let dpr = dprMax; renderer.setPixelRatio(dpr);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.08;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), .04).texture; pmrem.dispose();
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 50);
  const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(3, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xc6e6ff, 1.6); rim.position.set(-5, 2, -4); scene.add(rim);

  const enamel = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: .2, clearcoat: 1, clearcoatRoughness: .07, sheen: .5, sheenRoughness: .4, sheenColor: new THREE.Color(0xffeef4) });
  const cementum = new THREE.MeshPhysicalMaterial({ color: 0xece0cb, roughness: .5, clearcoat: .25 });
  const veneerMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: .05, clearcoat: 1, clearcoatRoughness: .02, iridescence: .7, iridescenceIOR: 1.35, side: THREE.DoubleSide, transparent: true, opacity: 0 });
  const zirconia = new THREE.MeshPhysicalMaterial({ color: 0xfffdf9, roughness: .28, clearcoat: 1, clearcoatRoughness: .1, transparent: true, opacity: 0 });
  const titanium = new THREE.MeshStandardMaterial({ color: 0xc3c9d1, metalness: 1, roughness: .3, transparent: true, opacity: 0 });
  const xrayMat = fresnel(0x4aa3ff);
  const pulpMat = new THREE.MeshBasicMaterial({ color: 0xff6b8b, transparent: true, opacity: 0, depthWrite: false });

  const [W, H] = mobile() ? [150, 112] : [220, 164];
  const crownG = crownGeometry(W, H);
  const rootG = rootCurves.map((c, i) => taperedTube(c, { rx: .19, rz: .31, steps: mobile() ? 56 : 80, radial: mobile() ? 28 : 40, groove: .14 }));
  const trunkG = taperedTube(curve([[0, -.05, 0], [0, -.45, 0], [0, -.82, 0]]), { rx: .62, rz: .54, steps: 24, radial: mobile() ? 40 : 56, tipPow: 1.6 });

  const tooth = new THREE.Group();
  const natural = new THREE.Group(); tooth.add(natural);
  const crown = new THREE.Mesh(crownG, enamel); natural.add(crown);
  const roots = new THREE.Group(); natural.add(roots);
  roots.add(new THREE.Mesh(trunkG, cementum));
  rootG.forEach(g => roots.add(new THREE.Mesh(g, cementum)));

  // x-ray: fresnel shells over the same geometry, the pulp and canals inside
  const xray = new THREE.Group(); tooth.add(xray);
  [crownG, trunkG, ...rootG].forEach(g => xray.add(new THREE.Mesh(g, xrayMat)));
  const pulp = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), pulpMat); pulp.scale.set(.36, .22, .26); pulp.position.y = .02; xray.add(pulp);
  rootCurves.forEach(c => xray.add(new THREE.Mesh(new THREE.TubeGeometry(c, 60, .045, 10, false), pulpMat)));
  xray.renderOrder = 2;

  const veneer = new THREE.Mesh(veneerGeometry(crownG), veneerMat); tooth.add(veneer);
  const cap = new THREE.Mesh(crownG, zirconia); cap.scale.setScalar(1.035); tooth.add(cap);
  const implant = implantGroup(titanium, mobile()); tooth.add(implant);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.3, .01, 8, 160), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
  ring.rotation.x = Math.PI / 2; ring.position.y = -2.25; scene.add(ring);
  scene.add(tooth);

  // pointer tilt and drag to spin
  let tx = 0, ty = 0, cx = 0, cy = 0, drag = null, spin = 0, spinV = 0;
  addEventListener('pointermove', e => { tx = (e.clientX / innerWidth - .5) * .5; ty = (e.clientY / innerHeight - .5) * .25; }, { passive: true });
  canvas.addEventListener('pointerdown', e => { drag = e.clientX; spinV = 0; });
  addEventListener('pointerup', () => { drag = null; });
  canvas.addEventListener('pointermove', e => { if (drag !== null) { spinV = (e.clientX - drag) * .012; spin += spinV; drag = e.clientX; } }, { passive: true });

  function size() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  size(); addEventListener('resize', size);

  // only while on screen and the tab is visible
  let onScreen = true;
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen && !still) loop(); }).observe(host || canvas);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !still) loop(); });

  // adaptive resolution: a slow device drops the pixel ratio, then frames
  let acc = 0, n = 0, last = performance.now(), skip = false, flip = false;
  function adapt(dt) {
    acc += dt; n++;
    if (n < 40) return;
    const avg = acc / n; acc = n = 0;
    if (avg > 24 && dpr > 1) { dpr = Math.max(1, dpr - .25); renderer.setPixelRatio(dpr); size(); }
    else if (avg > 28 && dpr <= 1) skip = true;
    else if (avg < 14 && dpr < dprMax) { dpr = Math.min(dprMax, dpr + .25); renderer.setPixelRatio(dpr); size(); skip = false; }
  }

  let px = mobile() ? 0 : 2.2, py = mobile() ? -1.05 : -.15, running = false, t = 0;
  const setT = (m, tr) => { if (m.transparent !== tr) { m.transparent = tr; m.depthWrite = !tr; m.needsUpdate = true; } };

  function draw(dt) {
    t += dt;
    const p = still ? 0 : progress();
    cx += (tx - cx) * .06; cy += (ty - cy) * .06;
    if (drag === null) { spinV *= .95; spin += spinV; }

    const xr = seg(p, .16, .24) * (1 - seg(p, .32, .4));
    const vn = ease(seg(p, .4, .52)) * (1 - seg(p, .6, .66));
    const cp = ease(seg(p, .6, .74)), im = ease(seg(p, .62, .78)), fin = seg(p, .8, .95);

    const nat = 1 - xr * .82;
    enamel.opacity = nat * (1 - cp); setT(enamel, enamel.opacity < .995);
    cementum.opacity = nat * (1 - im); setT(cementum, cementum.opacity < .995);
    xrayMat.uniforms.o.value = xr; pulpMat.opacity = xr * .7;
    veneerMat.opacity = vn; veneer.position.set(0, (1 - vn) * .25, (1 - vn) * 1.6);
    zirconia.opacity = cp; setT(zirconia, cp < .995); cap.position.y = (1 - cp) * 2.4;
    titanium.opacity = im; setT(titanium, im < .995);
    implant.position.y = -.42 - (1 - im) * 3.2; implant.rotation.y = (1 - im) * 16;
    ring.material.opacity = fin * .75;

    crown.visible = enamel.opacity > .01; roots.visible = cementum.opacity > .01;
    xray.visible = xr > .01; veneer.visible = vn > .01; cap.visible = cp > .01; implant.visible = im > .01;

    tooth.rotation.y = (still ? .5 : t * .22) + p * Math.PI * 4 + spin + cx;
    tooth.rotation.x = .16 + cy + Math.sin(t * .6) * .025;
    const m = mobile();
    px += ((m ? 0 : (p < .14 ? 2.2 : -1.7)) - px) * .06;
    py += ((m ? (p < .14 ? -1.05 : .72) : (p < .14 ? -.15 : .15)) - py) * .06;
    tooth.position.set(px, py + Math.sin(t * .9) * .045, 0);
    camera.position.set(0, .35, (m ? 11.2 : 8) - xr * 1.2 - vn * 1 + fin * .3);
    camera.lookAt(0, -.15, 0);
    renderer.render(scene, camera);
  }

  function loop() {
    if (running) return; running = true; last = performance.now();
    const step = now => {
      if (!onScreen || document.hidden) { running = false; return; }
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      adapt(dt * 1000);
      flip = !flip;
      if (!skip || flip) draw(skip ? dt * 2 : dt);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  if (still) { draw(0); requestAnimationFrame(() => draw(0)); } else loop();
  return { info: () => ({ ...renderer.info.render, dpr, geometries: renderer.info.memory.geometries }) };
}
