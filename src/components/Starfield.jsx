import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId, shooterTimer;
    let W, H, stars, shooters;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const makeStars = (n) =>
      Array.from({ length: n }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 1.3 + 0.2,
        a:  Math.random(),
        da: (Math.random() * 0.007 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      }));

    const newShooter = () => ({
      x:    Math.random() * W * 0.65,
      y:    Math.random() * H * 0.45,
      vx:   Math.random() * 11 + 8,
      vy:   Math.random() * 5  + 3,
      len:  Math.random() * 160 + 70,
      a:    1,
    });

    const init = () => { resize(); stars = makeStars(280); shooters = []; };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Deep space gradient */
      const bg = ctx.createLinearGradient(0, 0, W * 0.6, H);
      bg.addColorStop(0,   '#000814');
      bg.addColorStop(0.4, '#000d24');
      bg.addColorStop(1,   '#000814');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* Nebula clouds — deep blues and a hint of purple */
      [
        { x: W * 0.15, y: H * 0.25, r: W * 0.28, c: '14, 40, 120' },
        { x: W * 0.85, y: H * 0.65, r: W * 0.22, c: '60, 20, 120' },
        { x: W * 0.55, y: H * 0.48, r: W * 0.32, c: '10, 50, 140' },
      ].forEach(({ x, y, r, c }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${c}, 0.14)`);
        g.addColorStop(1, `rgba(${c}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      /* Stars */
      stars.forEach(s => {
        s.a += s.da;
        if (s.a > 1 || s.a < 0) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,255,${Math.max(0, Math.min(1, s.a))})`;
        ctx.fill();
      });

      /* Shooting stars */
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.len * 0.7, s.y - s.len * 0.35);
        g.addColorStop(0, `rgba(96, 180, 255, ${s.a})`);
        g.addColorStop(1, 'rgba(96, 180, 255, 0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len * 0.7, s.y - s.len * 0.35);
        ctx.stroke();
        s.x += s.vx; s.y += s.vy; s.a -= 0.022;
        if (s.a <= 0) shooters.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    };

    const scheduleShooter = () => {
      shooters.push(newShooter());
      shooterTimer = setTimeout(scheduleShooter, Math.random() * 7000 + 3500);
    };

    init();
    draw();
    setTimeout(scheduleShooter, 1800);

    const onResize = () => { resize(); stars = makeStars(280); };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(shooterTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
