import { useState, useEffect } from 'react';

const isHeic = (src) => /\.(heic|heif)$/i.test(src ?? '');

/*
 * Renders any image, including HEIC/HEIF (iPhone photos).
 * HEIC files are converted to JPEG in the browser via heic2any.
 * Regular images pass straight through.
 */
export default function HeicImg({ src, alt, style, onError }) {
  const [resolved, setResolved]   = useState(isHeic(src) ? null : src);
  const [converting, setConverting] = useState(isHeic(src));

  useEffect(() => {
    if (!isHeic(src)) {
      setResolved(src);
      setConverting(false);
      return;
    }

    let mounted = true;
    let objectUrl;
    setConverting(true);

    (async () => {
      try {
        const blob = await fetch(src).then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.blob();
        });
        // Lazy-import so it doesn't bloat the initial bundle
        const { default: heic2any } = await import('heic2any');
        const out = await heic2any({ blob, toType: 'image/jpeg', quality: 0.88 });
        objectUrl = URL.createObjectURL(Array.isArray(out) ? out[0] : out);
        if (mounted) setResolved(objectUrl);
      } catch (err) {
        console.warn('HEIC conversion failed for', src, err);
        if (mounted) onError?.();
      } finally {
        if (mounted) setConverting(false);
      }
    })();

    return () => {
      mounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  if (converting) {
    return (
      <div style={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#0d1e35' }}>
        <div style={spinnerStyle} />
        <span style={labelStyle}>CONVERTING</span>
      </div>
    );
  }

  if (!resolved) return null;

  return (
    <img
      src={resolved}
      alt={alt}
      style={style}
      onError={onError}
    />
  );
}

const spinnerStyle = {
  width: 22,
  height: 22,
  border: '2px solid rgba(30,144,255,0.2)',
  borderTopColor: '#1e90ff',
  borderRadius: '50%',
  animation: 'spin 0.75s linear infinite',
};

const labelStyle = {
  fontFamily: 'var(--font-space)',
  fontSize: '0.48rem',
  letterSpacing: '0.2em',
  color: '#4a7a9a',
};
