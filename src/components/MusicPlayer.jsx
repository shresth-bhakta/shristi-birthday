import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
 * ✏️  HOW TO ADD SONGS
 * 1. Put your .mp3 files in  public/music/
 * 2. Add entries here: { title: 'Song Name', artist: 'Artist', file: '/music/filename.mp3' }
 */
const BASE = import.meta.env.BASE_URL;
const songs = [
  { title: 'Your song',           artist: ':)',       file: `${BASE}music/fly.mp3` },
  // { title: 'A Thousand Years',  artist: 'Christina Perri',  file: '/music/thousand-years.mp3' },
  // { title: 'Your Song',         artist: 'Elton John',       file: '/music/your-song.mp3' },
];

export default function MusicPlayer({ autoPlay = false }) {
  const [visible, setVisible]       = useState(true);
  const [isPlaying, setIsPlaying]   = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress]     = useState(0);
  const [volume, setVolume]         = useState(0.45);
  const audioRef = useRef(null);

  const song = songs[currentIdx] ?? null;

  /* Load song whenever index changes */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;
    audio.volume = volume;
    audio.src = song.file;
    if (isPlaying) audio.play().catch(() => {});
  }, [currentIdx]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  /* Autoplay once the launch sequence finishes; fall back to first click if browser blocks */
  useEffect(() => {
    if (!autoPlay || !songs.length) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = songs[0].file;
    audio.volume = volume;

    let onInteract;
    const tryPlay = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          onInteract = () => {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
          };
          document.addEventListener('click', onInteract, { once: true });
        });
    };

    const t = setTimeout(tryPlay, 600);
    return () => {
      clearTimeout(t);
      if (onInteract) document.removeEventListener('click', onInteract);
    };
  }, [autoPlay]);

  const togglePlay = () => {
    if (!songs.length) return;
    const audio = audioRef.current;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else {
      if (!audio.src || audio.src === window.location.href) audio.src = songs[0].file;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const prev = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) { audio.currentTime = 0; return; }
    setCurrentIdx(i => (i - 1 + songs.length) % songs.length);
  };

  const next = () => setCurrentIdx(i => (i + 1) % songs.length);

  /* Loop: single song restarts itself; playlist wraps via next() */
  const onEnded = () => {
    if (songs.length <= 1) {
      const a = audioRef.current;
      if (a) { a.currentTime = 0; a.play().catch(() => {}); }
    } else {
      next();
    }
  };

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (a && a.duration) setProgress(a.currentTime / a.duration);
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    a.currentTime = e.target.value * a.duration;
  };

  if (!visible) {
    return (
      <motion.button
        style={styles.fab}
        onClick={() => setVisible(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        title="Show music player"
      >
        🎵
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        style={styles.bar}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        {/* Progress bar */}
        <div style={styles.progressTrack}>
          <input
            type="range" min="0" max="1" step="0.001"
            value={progress}
            onChange={seek}
            style={styles.progressSlider}
          />
          <div style={{ ...styles.progressFill, width: `${progress * 100}%` }}/>
        </div>

        <div style={styles.inner}>
          {/* Song info */}
          <div style={styles.info}>
            <div style={styles.noteIcon}>
              <motion.span
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'block' }}
              >
                💿
              </motion.span>
            </div>
            <div style={styles.meta}>
              <span style={styles.songTitle}>
                {song ? song.title : 'Add songs to /public/music/'}
              </span>
              <span style={styles.songArtist}>
                {song ? song.artist : 'Then update the songs array in MusicPlayer.jsx'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div style={styles.controls}>
            <CtrlBtn onClick={prev} disabled={!songs.length}>⏮</CtrlBtn>
            <CtrlBtn onClick={togglePlay} disabled={!songs.length} primary>
              {isPlaying ? '⏸' : '▶'}
            </CtrlBtn>
            <CtrlBtn onClick={next} disabled={!songs.length}>⏭</CtrlBtn>
          </div>

          {/* Volume + hide */}
          <div style={styles.right}>
            <span style={styles.volIcon}>{volume === 0 ? '🔇' : '🔊'}</span>
            <input
              type="range" min="0" max="1" step="0.02"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              style={styles.volSlider}
              title="Volume"
            />
            <button style={styles.hideBtn} onClick={() => setVisible(false)} title="Minimise">▾</button>
          </div>
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        />
      </motion.div>
    </AnimatePresence>
  );
}

function CtrlBtn({ children, onClick, disabled, primary }) {
  return (
    <motion.button
      style={{ ...styles.ctrlBtn, ...(primary ? styles.ctrlBtnPrimary : {}) }}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.button>
  );
}

const styles = {
  bar: {
    position: 'fixed',
    bottom: 0, left: 0, right: 0,
    zIndex: 200,
    background: 'rgba(0,8,28,0.88)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(30,144,255,0.2)',
  },
  progressTrack: {
    position: 'relative',
    height: 3,
    background: 'rgba(30,144,255,0.15)',
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0,
    background: 'linear-gradient(90deg, var(--blue), var(--cyan))',
    pointerEvents: 'none',
  },
  progressSlider: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
    margin: 0,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    gap: 20,
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    flex: 1,
    minWidth: 0,
  },
  noteIcon: { fontSize: '1.6rem', flexShrink: 0 },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  songTitle: {
    fontSize: '0.85rem',
    color: 'var(--text)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  songArtist: {
    fontSize: '0.7rem',
    color: 'var(--text-dim)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  ctrlBtn: {
    background: 'rgba(30,144,255,0.1)',
    border: '1px solid rgba(30,144,255,0.25)',
    color: 'var(--text)',
    borderRadius: '50%',
    width: 38,
    height: 38,
    fontSize: '0.95rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },
  ctrlBtnPrimary: {
    background: 'var(--blue)',
    border: '1px solid var(--blue)',
    color: '#fff',
    width: 44,
    height: 44,
    boxShadow: '0 0 20px rgba(30,144,255,0.4)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  },
  volIcon: { fontSize: '0.9rem' },
  volSlider: {
    width: 80,
    accentColor: 'var(--blue)',
    cursor: 'pointer',
  },
  hideBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-dim)',
    fontSize: '1.1rem',
    cursor: 'pointer',
    padding: '4px 6px',
    lineHeight: 1,
  },
  fab: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    zIndex: 200,
    width: 52,
    height: 52,
    borderRadius: '50%',
    background: 'var(--blue)',
    border: 'none',
    fontSize: '1.3rem',
    cursor: 'pointer',
    boxShadow: '0 4px 24px rgba(30,144,255,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
