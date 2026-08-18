import { useRef, useEffect } from 'react';

import styles from './MatrixCanvas.module.css';

const MatrixCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stepInterval = 50;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const letters =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 10;
    const rowHeight = 12;
    const trailLength = 12;
    const columns = Math.floor(width / fontSize);
    const randomLetter = () => letters.charAt(Math.floor(Math.random() * letters.length));

    const drops = Array.from({ length: columns }).map(() => ({
      row: Math.floor(Math.random() * -100),
      elapsed: Math.random() * stepInterval,
      interval: stepInterval + Math.random() * 160,
      glyphs: Array.from({ length: trailLength }, randomLetter),
    }));

    function draw(frameTime = 0) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.025)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#20c94a';
      ctx.font = `${fontSize}px monospace`;

      const previousFrameTime = draw.previousFrameTime ?? frameTime;
      const deltaTime = frameTime - previousFrameTime;
      draw.previousFrameTime = frameTime;

      drops.forEach((drop, i) => {
        const x = i * fontSize;

        drop.glyphs.forEach((glyph, index) => {
          const trailRow = drop.row - index;
          const y = trailRow * rowHeight;

          if (y < -rowHeight || y > height + rowHeight) {
            return;
          }

          if (index === 0) {
            ctx.fillStyle = '#00ff00';
          } else {
            const alpha = 0.25 + (1 - index / trailLength) * 0.75;
            ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
          }

          ctx.fillText(glyph, x, y);
        });

        drop.elapsed += deltaTime;

        while (drop.elapsed >= drop.interval) {
          drop.elapsed -= drop.interval;
          drop.row += 1;
          drop.glyphs.unshift(randomLetter());
          drop.glyphs.length = trailLength;
        }

        if (drop.row * rowHeight > height && Math.random() > 0.985) {
          drop.row = 0;
          drop.elapsed = 0;
          drop.interval = stepInterval + Math.random() * 160;
          drop.glyphs = Array.from({ length: trailLength }, randomLetter);
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

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

  return <canvas ref={canvasRef} className={styles.MatrixCanvas} />;
};

export default MatrixCanvas;
