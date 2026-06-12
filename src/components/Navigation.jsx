import { motion } from 'framer-motion';
import { chapters } from '../data/chapters';

export default function Navigation({ current, total, onNavigate, onCover }) {
  return (
    <motion.div
      className="nav-bar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {/* Back to cover */}
      <motion.button
        onClick={onCover}
        className="nav-btn nav-btn-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Voltar à capa"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L1 7L7 13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* Prev */}
      <motion.button
        onClick={() => onNavigate(current - 1)}
        disabled={current <= 0}
        className="nav-btn"
        style={{ opacity: current <= 0 ? 0.3 : 1 }}
        whileHover={current > 0 ? { scale: 1.1 } : {}}
        whileTap={current > 0 ? { scale: 0.95 } : {}}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* Dots */}
      <div className="nav-dots">
        {chapters.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => onNavigate(i)}
            className="nav-dot"
            animate={{
              width: i === current ? 18 : 6,
              background: i === current ? '#C9797D' : 'rgba(201,121,125,0.3)',
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>

      {/* Next */}
      <motion.button
        onClick={() => onNavigate(current + 1)}
        disabled={current >= total - 1}
        className="nav-btn"
        style={{ opacity: current >= total - 1 ? 0.3 : 1 }}
        whileHover={current < total - 1 ? { scale: 1.1 } : {}}
        whileTap={current < total - 1 ? { scale: 0.95 } : {}}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* Counter */}
      <div className="nav-counter">
        <span>{current + 1} / {total}</span>
      </div>
    </motion.div>
  );
}
