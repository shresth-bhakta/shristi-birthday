import { useState } from 'react';
import { useScroll, useSpring, motion } from 'framer-motion';
import Starfield from './components/Starfield';
import Hero from './components/Hero';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import Countries from './components/Countries';
import Reasons from './components/Reasons';
import Letter from './components/Letter';
import MusicPlayer from './components/MusicPlayer';
import LaunchSequence from './components/LaunchSequence';
import CursorTrail from './components/CursorTrail';

export default function App() {
  const [launched, setLaunched] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Starfield />
      <Hero />
      <Achievements />
      <Gallery />
      <Countries />
      <Reasons />
      <Letter />
      <footer className="site-footer">
        <p>Made with love, just for you ✨</p>
        <p className="footer-sub">because you deserve to know how special you are</p>
      </footer>
      <MusicPlayer autoPlay={launched} />

      {/* Launch sequence sits on top until dismissed */}
      {!launched && <LaunchSequence onComplete={() => setLaunched(true)} />}

      {/* Cursor trail — always on top of everything */}
      <CursorTrail />
    </>
  );
}
