import { useRef, useEffect } from 'react';

import styles from './LogoInteractiveCanvas.module.css';

class Particle {
  constructor(ctx, mouse, x, y, size) {
    this.ctx = ctx;
    this.mouse = mouse;
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 50 + 1;
  }

  draw() {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  update() {
    let dx = this.x - this.mouse.x;
    let dy = this.y - this.mouse.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = this.mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < this.mouse.radius) {
      this.x += directionX;
      this.y += directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

// Source image dimensions sampled from the embedded logo bitmap.
const IMG_WIDTH = 150;
const IMG_HEIGHT = 150;
// Particle spacing scale used when projecting bitmap pixels onto the canvas.
let K = 5;
// Radius of each rendered particle dot.
let SIZE = 2;
// Maximum line length for particle-to-particle connections.
const DISTANCE = 10;
// Hard cap on how many neighbors each particle will connect to per frame.
const MAX_CONNECTIONS_PER_PARTICLE = 3;
let data;

const LogoInteractiveCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const imageBase64 =
      'data:image/png;base64,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';
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particleArray = [];

    const mouse = {
      x: null,
      y: null,
      // Interaction radius that pushes nearby particles away from the pointer.
      radius: 100,
    };

    const image = new Image();
    image.src = imageBase64;
    image.onload = () => {
      clear();
      drawImage();
    };

    function drawImage() {
      ctx.drawImage(image, 0, 0, IMG_WIDTH, IMG_HEIGHT);
      data = ctx.getImageData(0, 0, IMG_WIDTH, IMG_HEIGHT);
      createParticles();
    }

    function createParticles() {
      if (data === undefined) return;

      particleArray = [];
      
      for (let y = 0; y < data.height; y++) {
        for (let x = 0; x < data.width; x++) {
          if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
            const positionX = x;
            const positionY = y;
            particleArray.push(
              new Particle(
                ctx,
                mouse,
                positionX * K + (width * 0.6 - IMG_WIDTH * K) / 3,
                positionY * K + height / 2 - (IMG_HEIGHT * K) / 2,
                SIZE,
              ),
            );
          }
        }
      }
    }

    function drawParticles() {
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
    }

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particleArray.length; a++) {
        let connections = 0;
        for (let b = a + 1; b < particleArray.length; b++) {
          if (connections >= MAX_CONNECTIONS_PER_PARTICLE) break;

          const dx = particleArray[a].x - particleArray[b].x;
          const dy = particleArray[a].y - particleArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < DISTANCE) {
            opacityValue = 1 - distance / DISTANCE;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
            ctx.closePath();

            connections++;
          }
        }
      }
    }

    function clear() {
      ctx.clearRect(0, 0, width, height);
    }

    function animate() {
      clear();
      drawParticles();
      connect();

      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    function updateScale() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1600) {
        K = 4.5;
        SIZE = 2;
      } else if (screenWidth >= 1200) {
        K = 3.5;
        SIZE = 1.5;
      } else if (screenWidth >= 800) {
        K = 2.5;
        SIZE = 1;
      }
      createParticles();
    }
    updateScale();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      updateScale();
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.LogoInteractiveCanvas} />;
};

export default LogoInteractiveCanvas;
