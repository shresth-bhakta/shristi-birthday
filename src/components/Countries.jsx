import { motion } from 'framer-motion';
import { useTilt } from '../hooks/useTilt';

/*
 * ✏️  Add/remove countries here.
 *     coords are decorative — feel free to make them accurate or leave as-is.
 */
const countries = [
  {
    flag: '🇮🇳',
    name: 'India',
    coords: '20.59°N  78.96°E',
    note: 'Where it all began. Home. The place that made her.',
    status: 'ORIGIN',
  },
  {
    flag: '🇳🇱',
    name: 'Netherlands',
    coords: '52.13°N  5.29°E',
    note: 'Her second home. TU Delft. Bikes, canals, and a dream.',
    status: 'CURRENT BASE',
  },
  {
    flag: '🇩🇪',
    name: 'Germany',
    coords: '51.16°N  10.45°E',
    note: 'Engineering, history, and good bread.',
    status: 'VISITED',
  },
  {
    flag: '🇫🇷',
    name: 'France',
    coords: '46.23°N  2.21°E',
    note: 'Paris or not, France always leaves a mark.',
    status: 'VISITED',
  },
  {
    flag: '🇱🇺',
    name: 'Luxembourg',
    coords: '49.82°N  6.13°E',
    note: 'The tiny country that punches above its weight.',
    status: 'VISITED',
  },
  {
    flag: '🇵🇹',
    name: 'Portugal',
    coords: '39.40°N  8.22°W',
    note: 'Sun, tiles, and the kind of calm you can\'t explain.',
    status: 'VISITED',
  },
  {
    flag: '🇧🇪',
    name: 'Belgium',
    coords: '50.50°N  4.47°E',
    note: 'Waffles, chocolate, and cobblestone streets.',
    status: 'VISITED',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  show:   { opacity: 1, scale: 1,   y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Countries() {
  return (
    <section id="places">
      <div className="section-inner">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          MISSION COORDINATES
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
        >
          Everywhere you've been
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
        >
          Every country a story. Every trip a version of you that grew a little.
        </motion.p>

        <motion.div
          style={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {countries.map((c) => (
            <CountryCard key={c.name} {...c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CountryCard({ flag, name, coords, note, status, dim }) {
  const { tiltStyle, onMouseMove, onMouseLeave } = useTilt(8);
  return (
    <motion.div
      variants={cardVariants}
      style={{ ...styles.card, ...(dim ? styles.cardDim : {}), ...(!dim ? tiltStyle : {}) }}
      onMouseMove={!dim ? onMouseMove : undefined}
      onMouseLeave={!dim ? onMouseLeave : undefined}
    >
      {/* Status badge */}
      <span style={styles.status}>{status}</span>

      <div style={styles.flag}>{flag}</div>
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.coords}>{coords}</p>
      <p style={styles.note}>{note}</p>

      {/* Decorative grid lines */}
      <svg style={styles.gridLines} viewBox="0 0 180 60" preserveAspectRatio="none">
        {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="60" stroke="#1e90ff" strokeWidth="0.4" strokeOpacity="0.15"/>
        ))}
        {[0, 20, 40, 60].map(y => (
          <line key={y} x1="0" y1={y} x2="180" y2={y} stroke="#1e90ff" strokeWidth="0.4" strokeOpacity="0.15"/>
        ))}
      </svg>
    </motion.div>
  );
}

const styles = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  card: {
    background: 'var(--card-bg)',
    border: '1px solid var(--card-border)',
    borderRadius: 18,
    padding: '32px 24px 28px',
    textAlign: 'center',
    minWidth: 180,
    maxWidth: 220,
    flex: '1 1 180px',
    backdropFilter: 'blur(12px)',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'default',
  },
  cardDim: {
    borderStyle: 'dashed',
    opacity: 0.45,
  },
  status: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.48rem',
    letterSpacing: '0.25em',
    color: 'var(--cyan)',
    display: 'block',
    marginBottom: 20,
  },
  flag: {
    fontSize: '3.2rem',
    marginBottom: 14,
    display: 'block',
    filter: 'drop-shadow(0 0 12px rgba(30,144,255,0.3))',
  },
  name: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: 8,
  },
  coords: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.5rem',
    letterSpacing: '0.1em',
    color: 'var(--blue)',
    marginBottom: 12,
  },
  note: {
    fontSize: '0.85rem',
    color: 'var(--text-dim)',
    lineHeight: 1.6,
    fontWeight: 300,
  },
  gridLines: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 60,
    pointerEvents: 'none',
  },
};
