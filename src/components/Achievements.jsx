import { motion } from 'framer-motion';
import { useTilt } from '../hooks/useTilt';

/* ✏️  Edit these cards freely */
const achievements = [
  {
    id: 'F001',
    icon: '🚀',
    title: 'Aerospace Engineer',
    body: 'Pursuing a Masters at TU Delft which is one of the top engineering universities on the planet. You literally study the sky for a living.',
    color: 'var(--blue)',
  },
  {
    id: 'F002',
    icon: '🇮🇳',
    title: 'From India, to the World',
    body: 'All the way from India to the Netherlands. Do you know how big a deal that is? Not everyone dares. You packed your bags and went.',
    color: 'var(--gold)',
    highlight: true,
  },
  {
    id: 'F003',
    icon: '🪐',
    title: 'Eyes on the Stars',
    body: "Astronaut. You said it and you mean it. The kind of dream most people whisper and forget - you're actively building the path to it. Nahi toh 30 lpa ka job kon chhodta hai bhai",
    color: 'var(--cyan)',
  },
  {
    id: 'F004',
    icon: '🇳🇱',
    title: 'Living in Delft',
    body: 'You rebuilt your entire life in a country where everything was unfamiliar. A new language, new routines, new city. And you thrived.',
    color: 'var(--blue)',
  },
  {
    id: 'F005',
    icon: '🌍',
    title: 'World Traveler',
    body: "You've seen corners of this world that most people only dream about. Every stamp in your passport is a small act of courage.",
    color: 'var(--rose)',
  },
  {
    id: 'F006',
    icon: '💙',
    title: 'Quietly Brilliant',
    body: "Studying Aerospace but part-time coder, chemist, biologist, dancer and what not. Who else possesses these skills?",
    color: 'var(--purple)',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Achievements() {
  return (
    <section id="amazing">
      <div className="section-inner">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          MISSION LOG
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          Look how far you've come
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
        >
          Sometimes you forget to look back at the distance you've already covered. Hence this page is to remind you that you are enough
        </motion.p>

        <motion.div
          style={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {achievements.map((a) => (
            <AchCard key={a.id} {...a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AchCard({ id, icon, title, body, color, highlight }) {
  const { tiltStyle, onMouseMove, onMouseLeave } = useTilt(10);
  return (
    <motion.div
      variants={cardVariants}
      style={{
        ...styles.card,
        ...(highlight ? { borderColor: 'rgba(255,200,87,0.45)', background: 'rgba(255,200,87,0.06)' } : {}),
        ...tiltStyle,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Top row */}
      <div style={styles.cardTop}>
        <span style={{ ...styles.fileId, color }}>{id}</span>
        <span style={styles.indicator(color)}/>
      </div>

      <div style={{ ...styles.icon, color }}>{icon}</div>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardBody}>{body}</p>

      {/* Bottom accent line */}
      <div style={{ ...styles.accentLine, background: color }}/>
    </motion.div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
    gap: 24,
    textAlign: 'left',
  },
  card: {
    background: 'var(--card-bg)',
    border: '1px solid var(--card-border)',
    borderRadius: 16,
    padding: '28px 26px 36px',
    backdropFilter: 'blur(12px)',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'default',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  fileId: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.55rem',
    letterSpacing: '0.2em',
    opacity: 0.8,
  },
  indicator: (color) => ({
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: color,
    boxShadow: `0 0 8px ${color}`,
    animation: 'blink 2.5s ease-in-out infinite',
  }),
  icon: {
    fontSize: '2.2rem',
    marginBottom: 14,
    display: 'block',
  },
  cardTitle: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: 12,
    lineHeight: 1.4,
  },
  cardBody: {
    fontSize: '0.92rem',
    color: 'var(--text-dim)',
    lineHeight: 1.75,
    fontWeight: 300,
  },
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    opacity: 0.5,
  },
};
