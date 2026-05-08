import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeicImg from './HeicImg';

const toUrl = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '');

/*
 * ✏️  HOW TO ADD MEMORIES
 * 1. Put your photo in  public/photos/memory1.jpg  (etc.)
 * 2. Add an entry to the `memories` array below.
 *    { id, file, category, title, letter }
 */
const memories = [
  {
    id: 'MF-001',
    file: '/photos/1.jpg',
    category: 'GRADUATION',
    title: 'The place where we met',
    letter: 'graduation day... if this college wasn’t there we wouldn’t even be here today. definitely one of the best things NITT did for me.',
  },
  {
    id: 'MF-002',
    file: '/photos/2.jpg',
    category: 'FIRST TIME',
    title: 'Snowfall',
    letter: 'first times are always special and i can’t forget the day you saw snowfall for the first time. waking up in the middle of the night and going out just to VC me so i could see how it looks... it was a dream come true moment for you.',
  },
  {
    id: 'MF-003',
    file: '/photos/3.jpg',
    category: 'FIRST TIME',
    title: 'Ice Skating',
    letter: 'the first time you went ice skating! i remember how happy you were. bohot baar gir bhi gayi thi but issokay... slowly and steadily you’ll get better.',
  },
  {
    id: 'MF-004',
    file: '/photos/4.jpg',
    category: 'TRAVEL',
    title: 'Shristi in Paris',
    letter: 'first time you went to paris alone. going till the top of the eiffel tower and sending pictures from there... you were the happiest that day.',
  },
  {
    id: 'MF-005',
    file: '/photos/5.jpg',
    category: 'Scribble',
    title: 'Your first sketch that I made',
    letter: 'hehe idk why i included this but it looks cute. still dont know how i pulled it off with just a ball pen.',
  },
  {
    id: 'MF-006',
    file: '/photos/6.jpg',
    category: 'Sport',
    title: 'First self-defence vaala sport',
    letter: 'every time you learn a new skill i see how happy you get. fencing looks amazing on you... i’m pretty sure the day you start earning you’re gonna enroll in a million new activities unlike me who does nothing :P',
  },
  {
    id: 'MF-007',
    file: '/photos/7.PNG',
    category: 'That day',
    title: 'Glad I asked this',
    letter: 'Confess karne ka tareeka thoda casual tha but kaam chal gaya :P... Hehe, I love you <333',
  },
  {
    id: 'MF-008',
    file: '/photos/8.jpg',
    category: ':P',
    title: 'First meet as a couple hit different',
    letter: 'First times are always special and Im glad I experienced all of it with you... muaaaaahhhhhhhh',
  },
];

const tilts = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.2];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="memories">
      <div className="section-inner">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          MISSION PHOTOS
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
        >
          Moments I never want to forget
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
        >
          Click any photo to read the little letter that goes with it.
        </motion.p>

        <motion.div
          style={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {memories.map((m, i) => (
            <PhotoCard
              key={m.id}
              memory={m}
              tilt={tilts[i % tilts.length]}
              onClick={() => setSelected(m)}
            />
          ))}
        </motion.div>
      </div>

      {/* Letter modal */}
      <AnimatePresence>
        {selected && (
          <LetterModal memory={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function PhotoCard({ memory, tilt, onClick }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ rotate: 0, y: -10, scale: 1.03, transition: { duration: 0.25 } }}
      style={{ ...styles.polaroid, '--tilt': `${tilt}deg` }}
      onClick={onClick}
    >
      {/* Mission file header */}
      <div style={styles.fileHeader}>
        <span style={styles.fileNum}>{memory.id}</span>
        <span style={styles.classifiedDot}/>
      </div>

      {/* Photo */}
      <div style={styles.photoWrap}>
        {failed ? (
          <div style={{ ...styles.placeholder, display: 'flex' }}>
            <span style={{ fontSize: '2rem' }}>📷</span>
            <small style={{ fontSize: '0.68rem', textAlign: 'center', lineHeight: 1.6, color: '#4a7a9a' }}>
              {memory.file.replace('/photos/', 'photos/')}
            </small>
          </div>
        ) : (
          <HeicImg
            src={toUrl(memory.file)}
            alt={memory.title}
            style={styles.photo}
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {/* Label */}
      <div style={styles.label}>
        <span style={styles.category}>{memory.category}</span>
        <p style={styles.title}>{memory.title}</p>
      </div>

      {/* Hover hint */}
      <div style={styles.hoverHint}>TAP TO READ ↑</div>
    </motion.div>
  );
}

function LetterModal({ memory, onClose }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      style={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={styles.modal}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1,    opacity: 1, y: 0 }}
        exit={{   scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Photo side */}
        <div style={styles.modalPhoto}>
          {!failed && (
            <HeicImg
              src={toUrl(memory.file)}
              alt={memory.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '12px 0 0 12px' }}
              onError={() => setFailed(true)}
            />
          )}
          <div style={styles.modalPhotoOverlay}>
            <span style={styles.modalFileNum}>{memory.id}</span>
            <span style={styles.modalCategory}>{memory.category}</span>
          </div>
        </div>

        {/* Letter side */}
        <div style={styles.modalLetter}>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
          <p style={styles.modalTitle}>{memory.title}</p>
          <p style={styles.letterText}>{memory.letter}</p>
          <span style={styles.letterSign}>— with love 💙</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 32,
    alignItems: 'start',
  },
  polaroid: {
    background: '#fffef8',
    borderRadius: 4,
    padding: '10px 10px 44px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    transform: 'rotate(var(--tilt))',
    transition: 'box-shadow 0.3s',
    position: 'relative',
  },
  fileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: '0 2px',
  },
  fileNum: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.52rem',
    letterSpacing: '0.15em',
    color: '#aaa',
  },
  classifiedDot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#1e90ff',
    boxShadow: '0 0 6px #1e90ff',
  },
  photoWrap: {
    width: '100%',
    aspectRatio: '1',
    background: '#1a2a40',
    overflow: 'hidden',
    borderRadius: 2,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  placeholder: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    padding: '10px 2px 0',
    textAlign: 'center',
  },
  category: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.52rem',
    letterSpacing: '0.2em',
    color: '#1e90ff',
  },
  title: {
    fontFamily: 'Dancing Script, cursive',
    fontSize: '1.05rem',
    color: '#333',
    marginTop: 4,
  },
  hoverHint: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'var(--font-space)',
    fontSize: '0.45rem',
    letterSpacing: '0.2em',
    color: '#bbb',
  },
  /* Modal */
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,4,16,0.88)',
    backdropFilter: 'blur(10px)',
    zIndex: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    display: 'flex',
    maxWidth: 780,
    width: '100%',
    maxHeight: '90vh',
    background: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
  },
  modalPhoto: {
    flex: '0 0 300px',
    position: 'relative',
    background: '#1a2a40',
    minHeight: 380,
  },
  modalPhotoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '16px',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  modalFileNum: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.55rem',
    letterSpacing: '0.2em',
    color: '#60b4ff',
  },
  modalCategory: {
    fontFamily: 'var(--font-space)',
    fontSize: '0.6rem',
    letterSpacing: '0.15em',
    color: '#fff',
  },
  modalLetter: {
    flex: 1,
    padding: '40px 36px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    overflowY: 'auto',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 16,
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#999',
    lineHeight: 1,
    padding: 4,
  },
  modalTitle: {
    fontFamily: 'Dancing Script, cursive',
    fontSize: '1.6rem',
    color: '#1a1a2e',
    marginTop: 20,
  },
  letterText: {
    fontFamily: 'Dancing Script, cursive',
    fontSize: '1.1rem',
    color: '#2a2a3a',
    lineHeight: 1.9,
    flex: 1,
  },
  letterSign: {
    fontFamily: 'Dancing Script, cursive',
    fontSize: '1rem',
    color: '#1e90ff',
    alignSelf: 'flex-end',
  },
};
