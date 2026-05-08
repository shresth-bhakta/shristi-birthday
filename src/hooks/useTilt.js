import { useState, useCallback, useRef } from 'react';

export function useTilt(maxDeg = 12) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left)  / rect.width  - 0.5) * maxDeg;
      const y = ((e.clientY - rect.top)   / rect.height - 0.5) * maxDeg;
      setTilt({ x, y });
    });
  }, [maxDeg]);

  const onMouseLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  const style = {
    transform: `perspective(700px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
    transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.45s ease' : 'transform 0.08s linear',
    willChange: 'transform',
  };

  return { tiltStyle: style, onMouseMove, onMouseLeave };
}
