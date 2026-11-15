// The pearl ground: a full-page WebGL1 shader of mother-of-pearl (thin-film colours over soft flowing noise)
// with a light that follows the pointer or the finger. It renders at a fraction of the screen's pixels
// (the picture is soft, the browser scales it up), pauses off screen and in hidden tabs, and on phones
// draws only when the page scrolls or is touched. Reduced motion: one still frame.
const VS = 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }';
const FS = `precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform float s;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1., 0.)), f.x), mix(h(i + vec2(0., 1.)), h(i + vec2(1., 1.)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 5; i++) { v += a * n(p); p = p * 2.03 + 1.7; a *= .5; } return v; }
vec3 film(float x){ return .5 + .5 * cos(6.28318 * (x + vec3(0., .33, .67))); }
void main(){
  float k = r.x / r.y;
  vec2 uv = gl_FragCoord.xy / r, p = uv * vec2(k, 1.);
  vec2 L = m * vec2(k, 1.);
  float w = fbm(p * 1.4 + vec2(t * .025, s * .35));
  float w2 = fbm(p * 2.6 + w * 1.6 - vec2(s * .2, t * .018));
  float d = length(p - L);
  vec3 iri = film(w2 * 1.3 + d * .35 + s * .12 + t * .01);
  vec3 base = vec3(.962, .955, .942);
  vec3 col = mix(base, base * .965 + iri * .055, .45 + .35 * w);
  float sp = exp(-d * d * 3.2);
  col += sp * (.07 + iri * .06);
  col = mix(col, vec3(1.), .38 * smoothstep(.48, .86, w2) + .12 * sp);
  gl_FragColor = vec4(col, 1.);
}`;

export function mountPearl(canvas) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'low-power' });
  if (!gl) return null;
  const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = ['r', 't', 'm', 's'].reduce((o, k) => (o[k] = gl.getUniformLocation(pr, k), o), {});

  const touch = matchMedia('(hover: none)').matches;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scale = touch ? .3 : .45;
  let W = 0, H = 0;
  function size() {
    const w = Math.round(innerWidth * scale), h = Math.round(innerHeight * scale);
    if (w === W && Math.abs(h - H) < 40 * scale && H) return;
    W = canvas.width = w; H = canvas.height = h; gl.viewport(0, 0, w, h);
  }
  size(); addEventListener('resize', size);

  // the light: eased toward the pointer or the finger
  let mx = .7, my = .65, tx = .7, ty = .65, t = 0, last = performance.now(), dirty = true, sc = 0;
  const aim = (x, y) => { tx = x / innerWidth; ty = 1 - y / innerHeight; dirty = true; };
  addEventListener('pointermove', e => aim(e.clientX, e.clientY), { passive: true });
  addEventListener('touchmove', e => { const p = e.touches[0]; if (p) aim(p.clientX, p.clientY); }, { passive: true });
  addEventListener('scroll', () => { dirty = true; }, { passive: true });

  function draw() {
    sc = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    gl.uniform2f(U.r, W, H); gl.uniform1f(U.t, t); gl.uniform2f(U.m, mx, my); gl.uniform1f(U.s, sc * 3);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (!document.hidden) {
      const moving = Math.abs(tx - mx) + Math.abs(ty - my) > .001;
      mx += (tx - mx) * .06; my += (ty - my) * .06;
      if (!touch && !still) { t += dt; draw(); }
      else if (dirty || moving) { t += dt * .5; draw(); dirty = false; }
    }
    requestAnimationFrame(frame);
  }
  draw();
  if (!still) requestAnimationFrame(frame);
  return { gl };
}
