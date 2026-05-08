import { useEffect, useRef } from 'react';

const COLORS = ['#60b4ff', '#00c8ff', '#ffffff', '#4a9eff', '#a8d8ff'];

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    let particles = [];
    let animId;

    const spawn = (x, y) => {
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.4;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          r:  Math.random() * 2.2 + 0.4,
          alpha: 0.75 + Math.random() * 0.25,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          decay: Math.random() * 0.018 + 0.012,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles = particles.filter(p => p.alpha > 0.02);

      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = 8;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.045;
        p.vx *= 0.97;
        p.alpha -= p.decay;
        p.r     *= 0.97;
      });

      animId = requestAnimationFrame(draw);
    };

    const onMove   = (e) => spawn(e.clientX, e.clientY);
    const onResize = ()  => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize',    onResize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize',    onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 998, pointerEvents: 'none' }}
    />
  );
}
