(() => {
  const section = document.querySelector('#projects');
  if (!section) return;
  const projects = {
    bike: { category: '01 / EMBEDDED CONTROL', title: 'Bluetooth Bike Control', description: 'A mobile-controlled bike ignition prototype. Arduino firmware handles Bluetooth serial commands, switches the engine relay, and provides buzzer feedback when the connection changes.', tags: ['Arduino', 'C++', 'Bluetooth'], repo: 'bike_lock' },
    battery: { category: '02 / IOT TELEMETRY', title: 'EV Battery Monitoring', description: 'An ESP8266 battery telemetry prototype within an EV battery cooling project. The firmware samples analog voltage, estimates battery level, and publishes both readings to a Blynk dashboard over Wi-Fi.', tags: ['ESP8266', 'C++', 'Blynk', 'Wi-Fi'], repo: 'battery_manager' },
    plant: { category: '03 / CONNECTED SENSING', title: 'Plant Moisture Monitor', description: 'A Raspberry Pi Pico W sensing project that reads an analog soil moisture sensor and sends measurements to ThingSpeak over Wi-Fi. MicroPython code also includes threshold-based pump control.', tags: ['Pico W', 'MicroPython', 'ADC', 'ThingSpeak'], repo: '-raspberry_pi_pico_w_Thingspeak_DHT' },
    vision: { category: '04 / COMPUTER VISION', title: 'Real-Time Finger Counter', description: 'A camera-based Python application that detects hands and counts raised fingers. The live view displays per-hand counts, a combined total, and an FPS overlay using OpenCV and MediaPipe.', tags: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'], repo: 'finger-detection' },
    nova: { category: '05 / PYTHON BACKEND', title: 'NOVA Django Commerce', description: 'A Django e-commerce application with product browsing, cart management, checkout, and order history. An administration interface supports managing products, orders, and users.', tags: ['Python', 'Django', 'HTML / CSS', 'Bootstrap'], repo: 'NOVA-django-Ecom' }
  };
  const web = section.querySelector('.project-web');
  const svg = section.querySelector('svg');
  const nodes = [...section.querySelectorAll('.project-node')];
  const details = section.querySelector('.project-details');
  const motion = section.querySelector('.web-motion');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const anchors = [[.23, .23], [.77, .23], [.82, .66], [.5, .85], [.18, .66]];
  let selected = 0, paused = false, visible = false, frame = 0, elapsed = 0, previous = 0;
  const paths = Array.from({ length: 20 }, () => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.append(path);
    return path;
  });
  function draw() {
    const width = web.clientWidth, height = web.clientHeight;
    const center = [width * .5, height * .48];
    const points = anchors.map(([x, y], index) => {
      const offset = paused || reducedMotion.matches ? 0 : 1;
      const px = x * width + Math.sin(elapsed / 2200 + index * 1.7) * 5 * offset;
      const py = y * height + Math.cos(elapsed / 2600 + index * 1.3) * 6 * offset;
      nodes[index].style.left = `${px}px`;
      nodes[index].style.top = `${py}px`;
      // The dot sits above the center of its button; threads terminate at the dot.
      return [px, py - nodes[index].offsetHeight / 2 + 13.5];
    });
    points.forEach((point, i) => {
      paths[i].setAttribute('d', `M${center} L${point}`);
      paths[i].classList.toggle('is-connected', i === selected);
      for (let ring = 1; ring <= 3; ring++) {
        const ratio = ring / 3;
        const next = points[(i + 1) % points.length];
        const a = point.map((value, axis) => center[axis] + (value - center[axis]) * ratio);
        const b = next.map((value, axis) => center[axis] + (value - center[axis]) * ratio);
        const control = a.map((value, axis) => (value + b[axis]) / 2 * .85 + center[axis] * .15);
        const path = paths[5 + (ring - 1) * 5 + i];
        path.setAttribute('d', `M${a} Q${control} ${b}`);
        path.classList.toggle('is-connected', ring === 3 && (i === selected || (i + 1) % 5 === selected));
      }
    });
  }
  nodes.forEach((node, index) => node.addEventListener('click', () => {
    selected = index;
    nodes.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    const project = projects[node.dataset.project];
    details.querySelector('.project-category').textContent = project.category;
    details.querySelector('h3').textContent = project.title;
    details.querySelector('.project-description').textContent = project.description;
    details.querySelector('.project-tags').replaceChildren(...project.tags.map(tag => {
      const li = document.createElement('li'); li.textContent = tag; return li;
    }));
    details.querySelector('a').href = `https://github.com/ShelJi/${project.repo}`;
    draw();
  }));
  function tick(time) {
    elapsed += previous ? Math.min(time - previous, 50) : 0;
    previous = time;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function syncMotion() {
    cancelAnimationFrame(frame);
    previous = 0;
    motion.hidden = reducedMotion.matches;
    if (visible && !paused && !reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(tick);
    else draw();
  }
  motion.addEventListener('click', () => {
    paused = !paused;
    motion.setAttribute('aria-pressed', String(paused));
    motion.textContent = paused ? 'Resume motion' : 'Pause motion';
    syncMotion();
  });
  new ResizeObserver(draw).observe(web);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncMotion(); }).observe(web);
  reducedMotion.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  draw();
})();
