import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TICKS = ['T-4', 'T-3', 'T-2', 'T-1'];

const LOG_LINES = [
  '> INITIALIZING BIRTHDAY PROTOCOL...',
  '> NAVIGATION SYSTEMS ONLINE',
  '> LIFE SUPPORT NOMINAL',
  '> FUEL CELLS AT 100%',
  '> TRAJECTORY COMPUTED',
  '> ALL SYSTEMS GO',
  '> AWAITING LAUNCH COMMAND',
  '> IGNITION SEQUENCE ACTIVE',
  '> HAPPY BIRTHDAY PROTOCOL ENGAGED ★',
];

export default function LaunchSequence({ onComplete }) {
  const [step,    setStep]    = useState(0);
  const [log,     setLog]     = useState([LOG_LINES[0]]);
  const [exiting, setExiting] = useState(false);

  const launched = step >= TICKS.length;

  const skip = useCallback(() => {
    setExiting(true);
    setTimeout(onComplete, 500);
  }, [onComplete]);

  /* Advance countdown */
  useEffect(() => {
    if (exiting) return;
    if (step < TICKS.length) {
      const t = setTimeout(() => setStep(s => s + 1), 620);
      return () => clearTimeout(t);
    }
    /* At T-0: wait then exit */
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 650);
    }, 1400);
    return () => clearTimeout(t);
  }, [step, exiting, onComplete]);

  /* Scroll log lines */
  useEffect(() => {
    if (exiting) return;
    const t = setInterval(() => {
      setLog(prev => {
        const next = LOG_LINES[prev.length % LOG_LINES.length];
        return [...prev.slice(-6), next];
      });
    }, 430);
    return () => clearInterval(t);
  }, [exiting]);

  const progress = (step / TICKS.length) * 100;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          style={s.overlay}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={skip}
        >
          <div style={s.panel} onClick={e => e.stopPropagation()}>

            {/* Header row */}
            <div style={s.header}>
              <span style={s.badge}><span style={s.pulse}/> MISSION: BIRTHDAY</span>
              <span style={s.badgeRight}>LAUNCH SEQUENCE</span>
            </div>

            {/* Big countdown / launch */}
            <div style={s.countdownArea}>
              <AnimatePresence mode="wait">
                {!launched ? (
                  <motion.div
                    key={step}
                    style={s.tick}
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    animate={{ opacity: 1, scale: 1,   y: 0  }}
                    exit={{   opacity: 0, scale: 1.4,  y: -20 }}
                    transition={{ duration: 0.22 }}
                  >
                    {TICKS[step]}
                  </motion.div>
                ) : (
                  <motion.div
                    key="launch"
                    style={s.launchWord}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1   }}
                    transition={{ type: 'spring', stiffness: 380, damping: 14 }}
                  >
                    🚀 LAUNCH!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div style={s.barWrap}>
              <div style={s.barTrack}>
                <motion.div
                  style={s.barFill}
                  animate={{ width: `${launched ? 100 : progress}%` }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              </div>
              <span style={s.barPct}>{launched ? '100' : Math.round(progress)}%</span>
            </div>

            {/* Terminal log */}
            <div style={s.terminal}>
              {log.map((line, i) => (
                <motion.p
                  key={i + line}
                  style={{ ...s.logLine, opacity: 0.35 + (i / log.length) * 0.65 }}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 0.35 + (i / log.length) * 0.65, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {line}
                </motion.p>
              ))}
              <motion.span
                style={s.cursor}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ▊
              </motion.span>
            </div>

            {/* Scan line effect */}
            <div style={s.scanlines} />

          </div>

          {/* Launch flash */}
          <AnimatePresence>
            {launched && (
              <motion.div
                style={s.flash}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>

          {/* Skip hint */}
          <p style={s.skip}>click anywhere to skip</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const s = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: '#000810',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  panel: {
    width: '100%',
    maxWidth: 560,
    padding: '40px 40px 36px',
    cursor: 'default',
    userSelect: 'none',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 48,
    borderBottom: '1px solid rgba(30,144,255,0.2)',
    paddingBottom: 16,
  },
  badge: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.6rem',
    letterSpacing: '0.25em',
    color: '#00c8ff',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  pulse: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#00c8ff',
    boxShadow: '0 0 10px #00c8ff',
    animation: 'blink 1.2s ease-in-out infinite',
  },
  badgeRight: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.55rem',
    letterSpacing: '0.25em',
    color: 'rgba(200,230,255,0.4)',
  },
  countdownArea: {
    height: 140,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  tick: {
    fontFamily: 'var(--font-space)',
    fontSize: 'clamp(4rem, 15vw, 7rem)',
    fontWeight: 900,
    color: '#fff',
    textShadow: '0 0 40px rgba(30,144,255,0.8), 0 0 80px rgba(30,144,255,0.3)',
    letterSpacing: '-0.02em',
    lineHeight: 1,
  },
  launchWord: {
    fontFamily: 'var(--font-space)',
    fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
    fontWeight: 900,
    color: '#60b4ff',
    textShadow: '0 0 50px #1e90ff, 0 0 100px rgba(30,144,255,0.5)',
    letterSpacing: '0.05em',
  },
  barWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 32,
  },
  barTrack: {
    flex: 1,
    height: 3,
    background: 'rgba(30,144,255,0.15)',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #1e90ff, #00c8ff)',
    borderRadius: 2,
    boxShadow: '0 0 8px rgba(30,144,255,0.8)',
  },
  barPct: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.6rem',
    color: '#1e90ff',
    width: 36,
    textAlign: 'right',
    letterSpacing: '0.1em',
  },
  terminal: {
    fontFamily: 'monospace',
    fontSize: '0.72rem',
    letterSpacing: '0.05em',
    borderLeft: '2px solid rgba(30,144,255,0.25)',
    paddingLeft: 16,
    minHeight: 110,
    color: '#60b4ff',
  },
  logLine: {
    lineHeight: 1.8,
    color: '#60b4ff',
  },
  cursor: {
    color: '#00c8ff',
    fontSize: '0.8rem',
  },
  scanlines: {
    position: 'absolute',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  flash: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at center, rgba(30,144,255,0.9), rgba(0,8,28,0.3))',
    pointerEvents: 'none',
  },
  skip: {
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: 'var(--font-space)',
    fontSize: '0.5rem',
    letterSpacing: '0.25em',
    color: 'rgba(200,230,255,0.2)',
  },
};
