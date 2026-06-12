import { motion } from 'framer-motion';

const moodStyles = {
  rosa:   { accent: '#C9797D', soft: '#FDF0F0', text: '#A0484C', border: 'rgba(201,121,125,0.3)' },
  dourado:{ accent: '#B8956A', soft: '#FDF8F0', text: '#8A6840', border: 'rgba(184,149,106,0.3)' },
  azul:   { accent: '#7A9CB8', soft: '#F0F4FD', text: '#4A6C88', border: 'rgba(122,156,184,0.3)' },
  lilas:  { accent: '#9B7DB8', soft: '#F6F0FD', text: '#6B4D88', border: 'rgba(155,125,184,0.3)' },
};

export default function ChapterPage({ chapter, index, isActive }) {
  const mood = moodStyles[chapter.mood] || moodStyles.rosa;
  const isEven = index % 2 === 0;
  const paragraphs = chapter.text.split('\n\n').filter(Boolean);

  return (
    <motion.div
      className="chapter-page"
      style={{ background: 'linear-gradient(160deg, #FEFAF6 0%, #FEFAF6 60%, rgba(253,240,240,0.4) 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Watermark number — hidden on mobile */}
      <div className="watermark-number" style={{ color: mood.soft, right: isEven ? '2%' : 'auto', left: isEven ? 'auto' : '2%' }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className={`chapter-inner ${isEven ? 'photo-left' : 'photo-right'}`}>

        {/* ── PHOTO COLUMN ── */}
        <motion.div
          className="photo-col"
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* Date */}
          <motion.div
            className="date-row"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="date-line" style={{ background: mood.accent }} />
            <span className="date-text" style={{ color: mood.text }}>{chapter.date}</span>
            <div className="date-line-long" style={{ background: mood.border }} />
          </motion.div>

          {/* Photo */}
          <div className="photo-frame-wrap">
            <motion.img
              src={chapter.image}
              alt={chapter.title}
              className="chapter-img"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
            {/* Corner accents */}
            {['tl','tr','bl','br'].map((corner) => (
              <div key={corner} className={`corner-accent corner-${corner}`} style={{
                borderTopColor:    corner.startsWith('t') ? mood.accent : 'transparent',
                borderBottomColor: corner.startsWith('b') ? mood.accent : 'transparent',
                borderLeftColor:   corner.endsWith('l')   ? mood.accent : 'transparent',
                borderRightColor:  corner.endsWith('r')   ? mood.accent : 'transparent',
              }} />
            ))}
          </div>
        </motion.div>

        {/* ── TEXT COLUMN ── */}
        <motion.div
          className="text-col"
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p className="chapter-label" style={{ color: mood.text }}>
            Capítulo {String(index + 1).padStart(2, '0')}
          </p>

          <h2 className="chapter-title">{chapter.title}</h2>

          <div className="ornament-row">
            <div className="orn-line" style={{ background: mood.accent }} />
            <span style={{ color: mood.accent, fontSize: '12px', opacity: 0.7 }}>✦</span>
            <div className="orn-line" style={{ background: mood.accent }} />
          </div>

          <div className="paragraphs">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="chapter-para"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {i === 0 && (
                  <span className="drop-cap" style={{ color: mood.accent }}>{para[0]}</span>
                )}
                {i === 0 ? para.slice(1) : para}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="bottom-ornament"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-px flex-1" style={{ background: mood.border }} />
            <span style={{ color: mood.accent, fontSize: '10px', opacity: 0.6 }}>✿</span>
            <div className="h-px w-8" style={{ background: mood.border }} />
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}
