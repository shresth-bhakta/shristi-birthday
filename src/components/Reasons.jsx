import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
 * ✏️  EDIT THESE — replace with your personal reasons.
 *     Keep them specific. Generic is forgettable. Specific is everything.
 */
const reasons = [
  {
    id: 'R-001',
    text: "You chose to chase astronauts when you could have chosen comfort. Not everyone dares to do that. You did.",
  },
  {
    id: 'R-002',
    text: "You packed your life into bags and flew to the Netherlands alone, to a country where everything was unfamiliar. That takes a kind of courage most people don't have.",
  },
  {
    id: 'R-003',
    text: "From India to one of the world's top aerospace programmes. Let that actually sink in for a moment.",
  },
  {
    id: 'R-004',
    text: "The quiet way you carry your intelligence : in the questions you ask, the things you notice, the connections you make when you think no one is watching.",
  },
  {
    id: 'R-005',
    text: "You show up, even on the hard days. Especially on the hard days. That's not nothing. That's everything.",
  },
  {
    id: 'R-006',
    text: "You want to go to space. Not just think about it....actually, genuinely want it. Do you know how rare that is?",
  },
  {
    id: 'R-007',
    text: "The way you care. Deeply, quietly, without always saying it out loud. The people around you are lucky and they don't even know it.",
  },
  {
    id: 'R-008',
    text: "You. Just you. exactly as you are right now, on this birthday, in this chapter. That's the whole reason.",
  },
];

export default function Reasons() {
  const [phase,   setPhase]   = useState('idle');   // idle | active | done
  const [current, setCurrent] = useState(0);
  const [dir,     setDir]     = useState(1);         // slide direction

  const start = () => { setPhase('active'); setCurrent(0); };

  const next = () => {
    setDir(1);
    if (current < reasons.length - 1) {
      setCurrent(c => c + 1);
    } else {
      setPhase('done');
    }
  };

  const prev = () => {
    if (current === 0) return;
    setDir(-1);
    setCurrent(c => c - 1);
  };

  return (
    <section id="reasons">
      <div className="section-inner">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          MISSION DOSSIER
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
        >
          Why you are extraordinary
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
        >
          {reasons.length} things I never want you to forget about yourself.
        </motion.p>

        <motion.div
          style={s.card}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Top row */}
          <div style={s.cardTop}>
            <span style={s.fileId}>
              {phase === 'idle' ? 'CLASSIFIED' : phase === 'done' ? 'END OF FILE' : reasons[current].id}
            </span>
            <span style={s.counter}>
              {phase === 'active' ? `${String(current + 1).padStart(2,'0')} / ${String(reasons.length).padStart(2,'0')}` : ''}
            </span>
          </div>

          {/* Content area */}
          <div style={s.contentArea}>
            <AnimatePresence mode="wait" custom={dir}>
              {phase === 'idle' && (
                <motion.div
                  key="idle"
                  style={s.idleState}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={s.lockIcon}>🔒</div>
                  <p style={s.idleHint}>tap to unlock</p>
                </motion.div>
              )}

              {phase === 'active' && (
                <motion.p
                  key={current}
                  style={s.reasonText}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  "{reasons[current].text}"
                </motion.p>
              )}

              {phase === 'done' && (
                <motion.div
                  key="done"
                  style={s.doneState}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <div style={s.doneIcon}>💙</div>
                  <p style={s.doneText}>End of dossier.</p>
                  <p style={s.doneSubtext}>Every single one of these is true.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          {phase === 'active' && (
            <div style={s.dots}>
              {reasons.map((_, i) => (
                <span
                  key={i}
                  style={{
                    ...s.dot,
                    ...(i === current ? s.dotActive : {}),
                    ...(i < current  ? s.dotDone  : {}),
                  }}
                />
              ))}
            </div>
          )}

          {/* Buttons */}
          <div style={s.btns}>
            {phase === 'idle' && (
              <motion.button
                style={s.primaryBtn}
                onClick={start}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                OPEN DOSSIER →
              </motion.button>
            )}

            {phase === 'active' && (
              <>
                <motion.button
                  style={{ ...s.ghostBtn, opacity: current === 0 ? 0.25 : 1 }}
                  onClick={prev}
                  disabled={current === 0}
                  whileHover={{ scale: current > 0 ? 1.04 : 1 }}
                >
                  ← BACK
                </motion.button>
                <motion.button
                  style={s.primaryBtn}
                  onClick={next}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {current < reasons.length - 1 ? 'NEXT →' : 'FINISH →'}
                </motion.button>
              </>
            )}

            {phase === 'done' && (
              <motion.button
                style={s.ghostBtn}
                onClick={() => { setPhase('idle'); setCurrent(0); }}
                whileHover={{ scale: 1.04 }}
              >
                READ AGAIN
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center:        ({ opacity: 1, x: 0 }),
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

const s = {
  card: {
    maxWidth: 640,
    margin: '0 auto',
    background: 'var(--card-bg)',
    border: '1px solid var(--card-border)',
    borderRadius: 20,
    padding: '32px 36px 36px',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 0 60px rgba(30,144,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 16,
    borderBottom: '1px solid rgba(30,144,255,0.12)',
  },
  fileId: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.55rem',
    letterSpacing: '0.25em',
    color: 'var(--cyan)',
  },
  counter: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.55rem',
    letterSpacing: '0.2em',
    color: 'var(--text-dim)',
  },
  contentArea: {
    minHeight: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  idleState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  lockIcon: {
    fontSize: '2.5rem',
    filter: 'grayscale(0.3)',
  },
  idleHint: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.55rem',
    letterSpacing: '0.3em',
    color: 'var(--text-dim)',
  },
  reasonText: {
    fontFamily: 'var(--font-script)',
    fontSize: 'clamp(1.2rem, 3vw, 1.55rem)',
    color: '#e8f4ff',
    lineHeight: 1.85,
    textAlign: 'center',
    maxWidth: 520,
    padding: '0 8px',
  },
  doneState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  doneIcon: { fontSize: '2.8rem' },
  doneText: {
    fontFamily: 'var(--font-script)',
    fontSize: '1.5rem',
    color: '#fff',
  },
  doneSubtext: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'var(--text-dim)',
    fontStyle: 'italic',
  },
  dots: {
    display: 'flex',
    justifyContent: 'center',
    gap: 7,
    marginTop: 28,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'rgba(30,144,255,0.2)',
    transition: 'all 0.3s',
  },
  dotActive: {
    background: '#1e90ff',
    boxShadow: '0 0 8px #1e90ff',
    transform: 'scale(1.3)',
  },
  dotDone: {
    background: 'rgba(30,144,255,0.5)',
  },
  btns: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    marginTop: 32,
  },
  primaryBtn: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    background: 'var(--blue)',
    color: '#fff',
    border: 'none',
    borderRadius: 40,
    padding: '12px 28px',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(30,144,255,0.4)',
    transition: 'box-shadow 0.2s',
  },
  ghostBtn: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    background: 'transparent',
    color: 'var(--text-dim)',
    border: '1px solid var(--card-border)',
    borderRadius: 40,
    padding: '12px 28px',
    cursor: 'pointer',
    transition: 'border-color 0.2s, color 0.2s',
  },
};
