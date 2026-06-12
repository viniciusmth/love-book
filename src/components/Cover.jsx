import { motion } from 'framer-motion';
import { COVER, COUPLE_NAMES } from '../data/chapters';

const HeartSVG = () => (
  <svg viewBox="0 0 100 90" className="w-10 h-10" fill="none">
    <path
      d="M50 82 C50 82 8 52 8 28 C8 14 20 4 34 4 C41 4 47 7 50 12 C53 7 59 4 66 4 C80 4 92 14 92 28 C92 52 50 82 50 82Z"
      fill="none" stroke="#C9797D" strokeWidth="2" strokeLinecap="round"
    />
  </svg>
);

export default function Cover({ onBegin }) {
  return (
    <motion.div
      className="cover-root"
      style={{ background: 'linear-gradient(135deg, #FEFAF6 0%, #FDF0F0 50%, #F7F2EB 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Background petals */}
      <div className="cover-petals-bg" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="cover-petal"
            style={{
              left: `${8 + i * 11}%`,
              top: `${6 + (i % 3) * 14}%`,
              fontSize: `${14 + (i % 3) * 7}px`,
            }}
            animate={{ y: [0, -12, 0], rotate: [-8, 8, -8], opacity: [0.07, 0.13, 0.07] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          >
            ✿
          </motion.div>
        ))}
      </div>

      {/* Top ornament */}
      <motion.div
        className="cover-top-ornament"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-rose-accent opacity-40" style={{ background: 'linear-gradient(to right, transparent, #C9797D)', opacity: 0.4 }} />
        <HeartSVG />
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #C9797D)', opacity: 0.4 }} />
      </motion.div>

      {/* Main title */}
      <motion.div
        className="cover-titles"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
      >
        <p className="cover-eyebrow">A história de</p>
        <h1 className="cover-name-him">{COUPLE_NAMES.him}</h1>
        <p className="cover-name-her">&amp; {COUPLE_NAMES.her}</p>
        <h2 className="cover-subtitle-title">{COVER.title}</h2>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="cover-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        {COVER.subtitle}
      </motion.p>

      {/* Date */}
      <motion.p
        className="cover-date"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        {COVER.date}
      </motion.p>

      {/* CTA */}
      <motion.button
        onClick={onBegin}
        className="cover-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="cover-cta-text">Abrir o livro</span>
      </motion.button>

      {/* Bottom ornament */}
      <motion.div
        className="cover-bottom-orn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span style={{ fontFamily: '"Dancing Script", cursive', color: '#C9797D', fontSize: '13px' }}>
          ✦ com amor ✦
        </span>
      </motion.div>
    </motion.div>
  );
}
