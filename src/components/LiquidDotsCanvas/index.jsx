import { useRef, useEffect } from 'react';

import styles from './LiquidDotsCanvas.module.css';

const LiquidDotsCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const palette = ['#a3eccc', '#861fdb', '#ff922bff', '#3b8c90ff', '#ffd8a8'];

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1 + Math.random(), // dots size (1–2px)
      dx: (Math.random() - 0.5) * 0.4, // dots movement speed reduced
      dy: (Math.random() - 0.5) * 0.4,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    function clear() {
      ctx.clearRect(0, 0, width, height);
    }

    function drawBg() {
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, width, height);
    }

    function drawDots() {
      dots.forEach((dot, i) => {
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < 0 || dot.x > width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > height) dot.dy *= -1;

        ctx.beginPath();
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = 0.6; // Pale effect for dots
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0; // Reset

        connect(dot, i);
      });
    }

    function connect(dot, i) {
      let connections = 0;
      for (let j = i + 1; j < dots.length && connections < 5; j++) {
        const other = dots[j];
        const dx = dot.x - other.x;
        const dy = dot.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.strokeStyle = `${dot.color}1A`; // Pale effect for lines (approx 10% opacity)
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();

          connections++;
        }
      }
    }

    function animate() {
      clear();
      drawBg();
      drawDots();

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.LiquidDotsCanvas} />;
};

export default LiquidDotsCanvas;
