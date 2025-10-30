// 3D Canvas Animation (vanilla JS)
const canvas = document.getElementById('canvas3d');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Card3D {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * 1000;
    this.rotX = Math.random() * Math.PI * 2;
    this.rotY = Math.random() * Math.PI * 2;
    this.rotSpeedX = (Math.random() - 0.5) * 0.02;
    this.rotSpeedY = (Math.random() - 0.5) * 0.02;
    this.speedZ = 0.5 + Math.random() * 1;
  }

  update() {
    this.z -= this.speedZ;
    if (this.z < 1) {
      this.z = 1000;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
    this.rotX += this.rotSpeedX;
    this.rotY += this.rotSpeedY;
  }

  draw() {
    const scale = 200 / this.z;
    const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
    const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;

    const size = 30 * scale;
    const opacity = Math.max(0, 1 - this.z / 1000) * 0.3;

    ctx.save();
    ctx.translate(x2d, y2d);

    // 3D-like rotation effect
    const perspective = Math.cos(this.rotY) * Math.cos(this.rotX);
    ctx.scale(perspective, 1);

    // Draw card
    ctx.fillStyle = `rgba(13, 92, 13, ${opacity})`;
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
    ctx.lineWidth = 2 * scale;

    ctx.beginPath();
    // roundRect is supported in modern browsers
    ctx.roundRect(-size / 2, -(size * 1.4) / 2, size, size * 1.4, 3 * scale);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}

const cards = Array.from({ length: 30 }, () => new Card3D());

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  cards.forEach((card) => {
    card.update();
    card.draw();
  });

  requestAnimationFrame(animate);
}
animate();

// Smooth scroll for CTA
Array.from(document.querySelectorAll('a[href^="#"]')).forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
