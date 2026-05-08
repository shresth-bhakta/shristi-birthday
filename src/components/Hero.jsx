import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Cute SVG Astronaut ──────────────────────────── */
function Astronaut() {
  return (
    <svg viewBox="0 0 100 132" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="visor" x1="32" y1="20" x2="70" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#60b4ff" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#001a40" stopOpacity="0.95"/>
        </linearGradient>
        <radialGradient id="suitGlow" cx="50%" cy="60%" r="50%">
          <stop offset="0%"   stopColor="#1e90ff" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#1e90ff" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="chestGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#00c8ff" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#1e90ff" stopOpacity="0.3"/>
        </radialGradient>
      </defs>

      {/* Ambient glow behind suit */}
      <ellipse cx="50" cy="82" rx="42" ry="46" fill="url(#suitGlow)"/>

      {/* Legs */}
      <rect x="27" y="100" width="17" height="22" rx="6"   fill="#0a1f40" stroke="#4a9eff" strokeWidth="1.2"/>
      <rect x="56" y="100" width="17" height="22" rx="6"   fill="#0a1f40" stroke="#4a9eff" strokeWidth="1.2"/>
      {/* Boots */}
      <rect x="23" y="116" width="23" height="11" rx="4.5" fill="#050e20" stroke="#4a9eff" strokeWidth="1"/>
      <rect x="54" y="116" width="23" height="11" rx="4.5" fill="#050e20" stroke="#4a9eff" strokeWidth="1"/>

      {/* Body */}
      <rect x="21" y="62" width="58" height="44" rx="15"   fill="#0a1f40" stroke="#4a9eff" strokeWidth="1.8"/>

      {/* Arms */}
      <rect x="2"  y="66" width="20" height="12" rx="6"    fill="#0a1f40" stroke="#4a9eff" strokeWidth="1.2"/>
      <rect x="78" y="66" width="20" height="12" rx="6"    fill="#0a1f40" stroke="#4a9eff" strokeWidth="1.2"/>
      {/* Gloves */}
      <ellipse cx="7"  cy="84" rx="6.5" ry="5.5"           fill="#050e20" stroke="#4a9eff" strokeWidth="1"/>
      <ellipse cx="93" cy="84" rx="6.5" ry="5.5"           fill="#050e20" stroke="#4a9eff" strokeWidth="1"/>

      {/* Neck ring */}
      <rect x="32" y="57" width="36" height="10" rx="5"    fill="#061828" stroke="#4a9eff" strokeWidth="1.8"/>

      {/* Helmet */}
      <circle cx="50" cy="33" r="29"                        fill="#0a1f40" stroke="#4a9eff" strokeWidth="2.2"/>
      {/* Visor */}
      <ellipse cx="50" cy="33" rx="20" ry="18"              fill="url(#visor)"/>
      {/* Visor border */}
      <ellipse cx="50" cy="33" rx="20" ry="18"              stroke="#00c8ff" strokeWidth="0.8" fill="none" strokeOpacity="0.6"/>
      {/* Visor reflection */}
      <path d="M36 26 Q44 20 56 25" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>

      {/* Chest badge */}
      <circle cx="50" cy="81" r="9"                         fill="#091830" stroke="#4a9eff" strokeWidth="1.2"/>
      <circle cx="50" cy="81" r="5"                         fill="url(#chestGlow)"/>

      {/* Life support tube */}
      <path d="M21 75 Q9 76 8 86" stroke="#4a9eff" strokeWidth="1.5" fill="none" strokeDasharray="3,2.5" strokeOpacity="0.7"/>

      {/* Indian flag patch on right arm */}
      <rect x="78" y="69" width="17" height="6" rx="1.2"    fill="#0a1f40"/>
      <rect x="78" y="69" width="17" height="2"             fill="#FF9933" rx="1"/>
      <rect x="78" y="71" width="17" height="2"             fill="#F0F0F0"/>
      <rect x="78" y="73" width="17" height="2"             fill="#138808" rx="1"/>
      <circle cx="86.5" cy="72" r="1"                       fill="#000088" opacity="0.8"/>

      {/* Tiny stars on left arm — space agency badge */}
      <text x="4" y="79" fontSize="5" fill="#ffc857" opacity="0.9">★</text>
      <text x="11" y="77" fontSize="4" fill="#ffc857" opacity="0.6">★</text>
    </svg>
  );
}

/* ── Hero Section ────────────────────────────────── */
export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="hero" style={styles.section}>
      <motion.div style={{ ...styles.inner, y, opacity }}>

        {/* HUD corners */}
        {['tl','tr','bl','br'].map(pos => (
          <div key={pos} style={{ ...styles.hud, ...styles[`hud_${pos}`] }}/>
        ))}

        {/* Mission tag */}
        <motion.div
          style={styles.missionTag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span style={styles.blinkDot}/>
          MISSION: BIRTHDAY
        </motion.div>

        {/* Floating astronaut */}
        <motion.div
          style={styles.astronautWrap}
          animate={{ y: [-14, 14, -14], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Astronaut />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
        >
          <p style={styles.heroPre}>Happy Birthday,</p>
          {/* ✏️  EDIT: replace "Her Name" with her actual name */}
          <h1 style={styles.heroName}>Shristuuuuu</h1>
          <p style={styles.heroSub}>
            You are destined for the stars<br/>
            and this page is proof of how far you've already come.
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.a
          href="#amazing"
          style={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <span style={styles.scrollLabel}>SCROLL</span>
          <div style={styles.scrollLine}/>
        </motion.a>

      </motion.div>

      {/* Earth glow at base */}
      <div style={styles.earthGlow}/>
    </section>
  );
}

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '40px 20px 100px',
  },
  inner: {
    maxWidth: 660,
    width: '100%',
    textAlign: 'center',
    position: 'relative',
  },
  missionTag: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.58rem',
    letterSpacing: '0.35em',
    color: 'var(--cyan)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 28,
  },
  blinkDot: {
    display: 'inline-block',
    width: 7,
    height: 7,
    background: 'var(--cyan)',
    borderRadius: '50%',
    animation: 'blink 1.3s ease-in-out infinite',
    boxShadow: '0 0 8px var(--cyan)',
  },
  astronautWrap: {
    width: 190,
    height: 240,
    margin: '0 auto 32px',
    filter: 'drop-shadow(0 0 28px rgba(30,144,255,0.55)) drop-shadow(0 0 60px rgba(30,144,255,0.2))',
  },
  heroPre: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.25rem',
    color: 'var(--text-dim)',
    fontWeight: 300,
    marginBottom: 6,
  },
  heroName: {
    fontFamily: 'var(--font-space)',
    fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
    fontWeight: 900,
    color: 'var(--blue-bright)',
    textShadow: '0 0 40px var(--blue), 0 0 80px rgba(30,144,255,0.35)',
    lineHeight: 1.05,
    marginBottom: 24,
    letterSpacing: '-0.01em',
  },
  heroSub: {
    fontSize: '1.05rem',
    color: 'var(--text-dim)',
    fontWeight: 300,
    lineHeight: 1.8,
    maxWidth: 440,
    margin: '0 auto 56px',
  },
  scrollHint: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  scrollLabel: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.55rem',
    letterSpacing: '0.3em',
    color: 'var(--text-dim)',
  },
  scrollLine: {
    width: 1,
    height: 52,
    background: 'linear-gradient(to bottom, var(--blue), transparent)',
  },
  earthGlow: {
    position: 'absolute',
    bottom: -80,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '900px',
    height: '220px',
    borderRadius: '50%',
    background: 'radial-gradient(ellipse at center bottom, rgba(30,144,255,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  hud: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderColor: 'var(--cyan)',
    borderStyle: 'solid',
    opacity: 0.35,
  },
  hud_tl: { top: 0,   left: 0,   borderWidth: '1px 0 0 1px' },
  hud_tr: { top: 0,   right: 0,  borderWidth: '1px 1px 0 0' },
  hud_bl: { bottom: 80, left: 0,  borderWidth: '0 0 1px 1px' },
  hud_br: { bottom: 80, right: 0, borderWidth: '0 1px 1px 0' },
};
