import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cover from './components/Cover';
import ChapterPage from './components/ChapterPage';
import Navigation from './components/Navigation';
import FloatingPetals from './components/FloatingPetals';
import { chapters } from './data/chapters';

export default function App() {
  const [showBook, setShowBook] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const scrollRef = useRef(null);

  const scrollToChapter = useCallback((index) => {
    if (!scrollRef.current || index < 0 || index >= chapters.length) return;
    const container = scrollRef.current;
    const target = container.children[index];
    if (target) {
      container.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    }
    setCurrentChapter(index);
  }, []);

  // Intersection observer — detect active chapter
  useEffect(() => {
    if (!showBook) return;
    const container = scrollRef.current;
    if (!container) return;

    const observers = [];
    Array.from(container.children).forEach((child, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting && entry.intersectionRatio > 0.5) setCurrentChapter(i); },
        { root: container, threshold: 0.5 }
      );
      obs.observe(child);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [showBook]);

  // Keyboard navigation
  useEffect(() => {
    if (!showBook) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentChapter(prev => { const n = Math.min(prev + 1, chapters.length - 1); scrollToChapter(n); return n; });
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentChapter(prev => { const n = Math.max(prev - 1, 0); scrollToChapter(n); return n; });
      }
      if (e.key === 'Escape') { setShowBook(false); setCurrentChapter(0); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showBook, scrollToChapter]);

  // Wheel → chapter nav (desktop)
  useEffect(() => {
    if (!showBook) return;
    const container = scrollRef.current;
    if (!container) return;
    let last = 0;
    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - last < 650) return;
      last = now;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta > 20) setCurrentChapter(prev => { const n = Math.min(prev + 1, chapters.length - 1); scrollToChapter(n); return n; });
      if (delta < -20) setCurrentChapter(prev => { const n = Math.max(prev - 1, 0); scrollToChapter(n); return n; });
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [showBook, scrollToChapter]);

  // Touch swipe
  useEffect(() => {
    if (!showBook) return;
    const container = scrollRef.current;
    if (!container) return;
    let startX = 0, startY = 0;

    const onStart = (e) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
    const onEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      // Only treat as horizontal swipe if dx dominates
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
        if (dx < 0) setCurrentChapter(prev => { const n = Math.min(prev + 1, chapters.length - 1); scrollToChapter(n); return n; });
        else setCurrentChapter(prev => { const n = Math.max(prev - 1, 0); scrollToChapter(n); return n; });
      }
    };
    container.addEventListener('touchstart', onStart, { passive: true });
    container.addEventListener('touchend', onEnd, { passive: true });
    return () => { container.removeEventListener('touchstart', onStart); container.removeEventListener('touchend', onEnd); };
  }, [showBook, scrollToChapter]);

  return (
    <div style={{ position: 'relative' }}>
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!showBook ? (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <Cover onBegin={() => { setShowBook(true); setCurrentChapter(0); }} />
          </motion.div>
        ) : (
          <motion.div
            key="book"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            {/* Horizontal scroll track */}
            <div
              ref={scrollRef}
              className="book-scroll"
              style={{
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'hidden',
                overflowY: 'hidden',
                width: '100vw',
                height: '100svh',
                scrollSnapType: 'x mandatory',
              }}
            >
              {chapters.map((chapter, i) => (
                <div
                  key={chapter.id}
                  style={{
                    flexShrink: 0,
                    width: '100vw',
                    height: '100svh',
                    scrollSnapAlign: 'start',
                    overflowY: 'auto',   /* allows inner vertical scroll on mobile */
                    overflowX: 'hidden',
                    position: 'relative',
                  }}
                >
                  {/* Page divider */}
                  {i > 0 && (
                    <div style={{
                      position: 'absolute', left: 0, top: '8%', bottom: '8%',
                      width: '1px',
                      background: 'linear-gradient(to bottom, transparent, rgba(201,121,125,0.15), transparent)',
                      zIndex: 10,
                    }} />
                  )}
                  <ChapterPage chapter={chapter} index={i} isActive={i === currentChapter} />
                </div>
              ))}
            </div>

            {/* Swipe hint */}
            <AnimatePresence>
              {currentChapter === 0 && (
                <motion.div
                  style={{ position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <p style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '10px',
                    color: '#A0484C',
                    opacity: 0.5,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>← deslize para ler →</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Navigation
              current={currentChapter}
              total={chapters.length}
              onNavigate={scrollToChapter}
              onCover={() => { setShowBook(false); setCurrentChapter(0); }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
