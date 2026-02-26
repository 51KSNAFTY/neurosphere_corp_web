document.addEventListener('DOMContentLoaded', function () {
  // ローディングアニメーション制御 (シンプル・高速化)
  const loader = document.getElementById('global-loader');
  if (loader) {
    // DOM構築後、少しだけ見せてすぐ消す（サクサク感を重視）
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 600);
  }
  // ヒーロー動画のフェードイン制御（Three.jsと共にシームレスに見せる）
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    const fadeInVideo = () => {
      // THE AI MERGE の文字が現れるタイミングに合わせてゆっくり動画を表示
      setTimeout(() => {
        heroVideo.classList.add('is-loaded');
      }, 300); // 300ms待ってからフェードイン開始
    };

    if (heroVideo.readyState >= 3) {
      fadeInVideo();
    } else {
      heroVideo.addEventListener('canplay', fadeInVideo);
    }
  }

  // ハンバーガーメニュー処理
  const hamburger = document.querySelector('.header-hamburger');
  const nav = document.querySelector('.header-nav');
  const hasSubMenus = document.querySelectorAll('.has-sub > span');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  // サブメニューの開閉（モバイル時）
  hasSubMenus.forEach(submenu => {
    submenu.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const subNav = this.nextElementSibling;
        subNav.classList.toggle('active');
      }
    });
  });

  // ウィンドウリサイズ時の処理
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.querySelectorAll('.sub-nav-list').forEach(subNav => {
        subNav.classList.remove('active');
      });
    }
  });

  // ──────────────────────────────────────────────
  // SVG ボーダートレースアニメーション（カードホバー）
  // ──────────────────────────────────────────────
  document.querySelectorAll('.business-card').forEach(card => {
    // SVG要素を生成してカード上に配置
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'card-border-svg');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;';
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '1');
    rect.setAttribute('y', '1');
    rect.setAttribute('rx', '0');
    rect.setAttribute('ry', '0');
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', '#2FBB8C');
    rect.setAttribute('stroke-width', '2');
    svg.appendChild(rect);
    card.style.position = 'relative';
    card.appendChild(svg);

    // サイズを合わせてパスの長さを計算
    function updateRect() {
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      rect.setAttribute('width', w - 2);
      rect.setAttribute('height', h - 2);
      const perimeter = 2 * (w - 2) + 2 * (h - 2);
      rect.style.strokeDasharray = perimeter;
      rect.style.strokeDashoffset = perimeter;
      rect.style.transition = 'none';
    }
    updateRect();
    window.addEventListener('resize', updateRect);

    // ホバーでラインを描画
    card.addEventListener('mouseenter', () => {
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      const perimeter = 2 * (w - 2) + 2 * (h - 2);
      rect.style.transition = 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      rect.style.strokeDashoffset = '0';
    });

    // マウスアウトでラインを戻す
    card.addEventListener('mouseleave', () => {
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      const perimeter = 2 * (w - 2) + 2 * (h - 2);
      rect.style.transition = 'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      rect.style.strokeDashoffset = perimeter;
    });
  });

  // ──────────────────────────────────────────────
  // スクロールフェードインアニメーション
  // ──────────────────────────────────────────────
  const revealElements = document.querySelectorAll('.js-reveal-text');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 少し遅延を入れてから表示（自然なフェージング）
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, 100);
          // 一度表示したら監視を解除する場合:
          // observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Observer非対応ブラウザへのフォールバック
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ネットワークアニメーション処理 (Three.js)
  const canvas = document.getElementById('networkCanvas');
  if (canvas) {
    import('https://unpkg.com/three@0.160.0/build/three.module.js').then((THREE) => {
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0xffffff, 0.002);

      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 250;

      const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      const particleCount = 200;
      const maxDistance = 65;
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 500;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 500;

        velocities.push({
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005
        });
      }

      const pointGeometry = new THREE.BufferGeometry();
      pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleCanvas = document.createElement('canvas');
      particleCanvas.width = 32;
      particleCanvas.height = 32;
      const context = particleCanvas.getContext('2d');
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(47,187,140,0.15)'); // #2FBB8C
      gradient.addColorStop(1, 'rgba(47,187,140,0)');
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(16, 16, 16, 0, Math.PI * 2, true);
      context.fill();
      const particleTexture = new THREE.CanvasTexture(particleCanvas);

      const pointMaterial = new THREE.PointsMaterial({
        color: 0x2FBB8C,
        size: 10,
        transparent: true,
        opacity: 0.15,
        map: particleTexture,
        depthWrite: false
      });

      const particles = new THREE.Points(pointGeometry, pointMaterial);
      scene.add(particles);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x2FBB8C,
        transparent: true,
        opacity: 0.05,
      });

      const maxLines = 6000;
      const linePositions = new Float32Array(maxLines * 6);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

      const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(linesMesh);

      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;
      let windowHalfX = window.innerWidth / 2;
      let windowHalfY = window.innerHeight / 2;

      document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
      });

      window.addEventListener('resize', () => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      function animate() {
        requestAnimationFrame(animate);

        const posAttribute = pointGeometry.attributes.position;
        let lineVertexIndex = 0;

        for (let i = 0; i < particleCount; i++) {
          velocities[i].x += (Math.random() - 0.5) * 0.0001;
          velocities[i].y += (Math.random() - 0.5) * 0.0001;
          velocities[i].z += (Math.random() - 0.5) * 0.0001;

          const speed = Math.sqrt(velocities[i].x ** 2 + velocities[i].y ** 2 + velocities[i].z ** 2);
          if (speed > 0.01) {
            velocities[i].x *= 0.01 / speed;
            velocities[i].y *= 0.01 / speed;
            velocities[i].z *= 0.01 / speed;
          }

          let x = posAttribute.getX(i) + velocities[i].x;
          let y = posAttribute.getY(i) + velocities[i].y;
          let z = posAttribute.getZ(i) + velocities[i].z;

          if (x > 250 || x < -250) velocities[i].x *= -1;
          if (y > 250 || y < -250) velocities[i].y *= -1;
          if (z > 250 || z < -250) velocities[i].z *= -1;

          posAttribute.setXYZ(i, x, y, z);

          for (let j = i + 1; j < particleCount; j++) {
            const dx = x - posAttribute.getX(j);
            const dy = y - posAttribute.getY(j);
            const dz = z - posAttribute.getZ(j);
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < maxDistance * maxDistance && lineVertexIndex < maxLines * 2) {
              linePositions[lineVertexIndex * 3] = x;
              linePositions[lineVertexIndex * 3 + 1] = y;
              linePositions[lineVertexIndex * 3 + 2] = z;
              lineVertexIndex++;

              linePositions[lineVertexIndex * 3] = posAttribute.getX(j);
              linePositions[lineVertexIndex * 3 + 1] = posAttribute.getY(j);
              linePositions[lineVertexIndex * 3 + 2] = posAttribute.getZ(j);
              lineVertexIndex++;
            }
          }
        }

        posAttribute.needsUpdate = true;

        for (let i = lineVertexIndex; i < maxLines * 2; i++) {
          linePositions[i * 3] = 0;
          linePositions[i * 3 + 1] = 0;
          linePositions[i * 3 + 2] = 0;
        }
        lineGeometry.attributes.position.needsUpdate = true;

        scene.rotation.y += 0.00005;
        scene.rotation.x += 0.000025;

        targetX = mouseX * 0.02;
        targetY = mouseY * 0.02;
        camera.position.x += (targetX - camera.position.x) * 0.01;
        camera.position.y += (-targetY - camera.position.y) * 0.01;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }

      animate();
    }).catch(err => console.error('Three.js failed to load:', err));
  }
});