import { useEffect, useState } from 'react';

const petalShapes = ['✿', '❀', '✾', '❁', '✽'];

export default function FloatingPetals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const initial = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 10 + Math.random() * 8,
      shape: petalShapes[Math.floor(Math.random() * petalShapes.length)],
      opacity: 0.06 + Math.random() * 0.1,
    }));
    setPetals(initial);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute petal"
          style={{
            left: `${petal.x}%`,
            top: '-20px',
            fontSize: `${petal.size}px`,
            color: '#C9797D',
            opacity: petal.opacity,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          {petal.shape}
        </div>
      ))}
    </div>
  );
}
