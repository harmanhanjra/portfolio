import * as THREE from './vendor/three.module.min.js';

export function initScene(initialPaused) {
  const canvas = document.querySelector('#scene');
  const host = canvas.parentElement;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch { return; }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
  camera.position.set(0, 0, 8.5);
  const sculpture = new THREE.Group();
  scene.add(sculpture);
  scene.add(new THREE.AmbientLight(0xd5fa71, 1.3));
  const key = new THREE.PointLight(0xe8ffb2, 65); key.position.set(3, 4, 4); scene.add(key);
  const fill = new THREE.PointLight(0x668d29, 30); fill.position.set(-4, -2, 2); scene.add(fill);
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.32, 3), new THREE.MeshStandardMaterial({ color: 0x7c9a42, metalness: .82, roughness: .28, flatShading: true }));
  sculpture.add(core);
  const cage = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.43, 2)), new THREE.LineBasicMaterial({ color: 0xd5fa71, transparent: true, opacity: .22 }));
  sculpture.add(cage);
  const rings = [];
  for (let i = 0; i < 5; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.9 + i * .105, .009, 6, 180), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x789b43 : 0xd5fa71, transparent: true, opacity: .7 }));
    ring.rotation.set(.55 + i * .45, .25 + i * .36, i * .4);
    rings.push(ring); sculpture.add(ring);
  }
  const satellite = new THREE.Mesh(new THREE.SphereGeometry(.1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xe6ffad }));
  sculpture.add(satellite);
  const positions = new Float32Array(450 * 3);
  for (let i = 0; i < positions.length; i++) positions[i] = (Math.random() - .5) * 12;
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ size: .018, color: 0xd5fa71, transparent: true, opacity: .45 })); scene.add(dust);
  let paused = initialPaused, visible = true, frame = 0, last = 0, elapsed = 0;
  const pointer = new THREE.Vector2();
  function render(now = 0) {
    frame = 0;
    const delta = Math.min((now - last) / 1000 || 0, .05); last = now;
    if (!paused) {
      elapsed += delta;
      sculpture.rotation.y += (pointer.x * .25 - sculpture.rotation.y) * .035;
      sculpture.rotation.x += (pointer.y * .16 - sculpture.rotation.x) * .035;
      sculpture.position.y = Math.sin(elapsed * .6) * .1;
      core.rotation.y = elapsed * .12;
      cage.rotation.y = -elapsed * .045;
      rings.forEach((ring, i) => ring.rotation.z = i * .4 + elapsed * (i % 2 ? -.045 : .055));
      dust.rotation.y = elapsed * .008;
    }
    satellite.position.set(Math.cos(elapsed * .35) * 2.2, Math.sin(elapsed * .35) * .75, Math.sin(elapsed * .35) * 1.5);
    renderer.render(scene, camera);
    if (!paused && visible && !document.hidden) frame = requestAnimationFrame(render);
  }
  function sync() { cancelAnimationFrame(frame); frame = 0; if (visible && !document.hidden) { last = performance.now(); render(last); } }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio, 1.5);
    renderer.setSize(Math.round(width * ratio), Math.round(height * ratio), false);
    camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); sync();
  }); resize.observe(host);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }); observer.observe(host);
  host.addEventListener('pointermove', event => { const r = host.getBoundingClientRect(); pointer.set((event.clientX - r.left) / r.width * 2 - 1, (event.clientY - r.top) / r.height * 2 - 1); });
  host.addEventListener('pointerleave', () => pointer.set(0, 0));
  window.addEventListener('portfolio-motion', event => { paused = event.detail.paused; sync(); });
  document.addEventListener('visibilitychange', sync);
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); cancelAnimationFrame(frame); host.classList.remove('scene-ready'); });
  canvas.addEventListener('webglcontextrestored', () => { host.classList.add('scene-ready'); sync(); });
  host.classList.add('scene-ready');
  sync();
}
