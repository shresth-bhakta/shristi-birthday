import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ✏️  EDIT the letter content here */
const LETTER = `I know you've been going through a rough patch lately. I see it. the weight you carry quietly, the doubts that creep in when you're alone at night.

I want you to know that I see you. Not just the version of you that's struggling right now, but all the versions. --> the brave one who packed her bags and flew to a new country, the brilliant one who got into one of the world's top aerospace programmes, the girl who chose to chase astronauts instead of comfort.

You are not behind. You are not failing. You are in the middle of something hard, and that is completely different.

The girl who left India to chase her dream in Delft? That girl doesn't give up. She might have a bad week. A bad month. But she doesn't give up — because I know her.

So on your birthday, I just want you to sit with this: you are enough. More than enough. And I am so incredibly lucky to know you.

Happy birthday, love. Here's to you — all of you.`;

function useTypewriter(text, started, speed = 22) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    indexRef.current = 0;
    setDisplayed('');
    const tick = () => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current < text.length) {
        timerRef.current = setTimeout(tick, speed);
      }
    };
    timerRef.current = setTimeout(tick, 600);
    return () => clearTimeout(timerRef.current);
  }, [started, text, speed]);

  return displayed;
}

export default function Letter() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const displayedText = useTypewriter(LETTER, inView, 18);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="letter" ref={sectionRef}>
      <div className="section-inner">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          INCOMING TRANSMISSION
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
        >
          A little note, just for you
        </motion.h2>

        <motion.div
          style={styles.terminalWrap}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Terminal header */}
          <div style={styles.termHeader}>
            <div style={styles.termDots}>
              <span style={{ ...styles.dot, background: '#ff5f57' }}/>
              <span style={{ ...styles.dot, background: '#febc2e' }}/>
              <span style={{ ...styles.dot, background: '#28c840' }}/>
            </div>
            <span style={styles.termTitle}>TRANSMISSION — SECURE CHANNEL 💙</span>
            <div style={styles.signalBars}>
              {[4, 8, 12, 16, 20].map((h, i) => (
                <span key={i} style={{ ...styles.bar, height: h, opacity: inView ? 1 : 0.2 }}/>
              ))}
            </div>
          </div>

          {/* Letter paper */}
          <div style={styles.paper}>
            <p style={styles.opening}>My dearest,</p>
            <div style={styles.letterBody}>
              {displayedText.split('\n\n').map((para, i) => (
                <p key={i} style={styles.para}>{para}</p>
              ))}
              {inView && displayedText.length < LETTER.length && (
                <span style={styles.cursor}>|</span>
              )}
            </div>
            {displayedText.length >= LETTER.length && (
              <motion.p
                style={styles.closing}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {/* ✏️  Change this to your name */}
                Yours always,<br/>
                <span style={styles.signature}>Shresth 💙</span>
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  terminalWrap: {
    maxWidth: 720,
    margin: '0 auto',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(30,144,255,0.2)',
  },
  termHeader: {
    background: '#020d20',
    borderBottom: '1px solid rgba(30,144,255,0.2)',
    padding: '12px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  termDots: { display: 'flex', gap: 7 },
  dot: { width: 12, height: 12, borderRadius: '50%', display: 'inline-block' },
  termTitle: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.55rem',
    letterSpacing: '0.2em',
    color: 'var(--blue)',
    flex: 1,
    textAlign: 'center',
  },
  signalBars: { display: 'flex', alignItems: 'flex-end', gap: 3 },
  bar: {
    width: 3,
    background: 'var(--cyan)',
    borderRadius: 2,
    transition: 'opacity 0.5s',
  },
  paper: {
    background: '#fffdf7',
    padding: '52px 56px 56px',
    textAlign: 'left',
    minHeight: 400,
    borderLeft: '3px solid',
    borderImage: 'linear-gradient(to bottom, #1e90ff, #60b4ff, #1e90ff) 1',
    position: 'relative',
  },
  opening: {
    fontFamily: 'Dancing Script, cursive',
    fontSize: '1.5rem',
    color: '#1e90ff',
    marginBottom: 28,
  },
  letterBody: {
    position: 'relative',
    minHeight: 200,
  },
  para: {
    fontFamily: 'Dancing Script, cursive',
    fontSize: '1.15rem',
    color: '#1e2030',
    lineHeight: 2,
    marginBottom: 24,
  },
  cursor: {
    fontFamily: 'monospace',
    fontSize: '1.2rem',
    color: '#1e90ff',
    animation: 'blink 1s ease-in-out infinite',
    marginLeft: 2,
  },
  closing: {
    fontFamily: 'Dancing Script, cursive',
    fontSize: '1.15rem',
    color: '#2a2a3a',
    marginTop: 32,
    lineHeight: 1.8,
  },
  signature: {
    display: 'block',
    fontSize: '1.5rem',
    color: '#1e90ff',
    marginTop: 6,
  },
};
