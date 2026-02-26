import { useEffect, useRef, useState } from 'react';

const Particles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 12 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 16000);
    };

    const interval = setInterval(createParticle, 800);
    for (let i = 0; i < 8; i++) {
      setTimeout(createParticle, i * 300);
    }

    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
};

export default function Landing({ onNext }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="landing"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: 'linear-gradient(135deg, #f0ecf7 0%, #fdf8f0 30%, #f7d4e0 60%, #d4e8f7 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient-shift 12s ease infinite',
      }}
    >
      <Particles />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Decorative element */}
        <div className="mb-8 opacity-0 animate-fade-in">
          <span className="text-5xl">🌸</span>
        </div>

        {showText && (
          <>
            <h1
              className="font-heading text-4xl md:text-6xl font-semibold tracking-tight opacity-0 animate-fade-in-up mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Hi Tanu.
            </h1>

            <div className="space-y-4 mb-12">
              <p className="font-body text-lg md:text-xl opacity-0 animate-fade-in-up stagger-2" style={{ color: 'var(--color-text-secondary)' }}>
                This is not a random website.
              </p>
              <p className="font-body text-lg md:text-xl opacity-0 animate-fade-in-up stagger-3" style={{ color: 'var(--color-text-secondary)' }}>
                This is me trying to fix
              </p>
              <p className="font-heading text-2xl md:text-3xl italic opacity-0 animate-fade-in-up stagger-4" style={{ color: 'var(--color-text-primary)' }}>
                what I broke.
              </p>
            </div>

            <button
              onClick={onNext}
              className="
                opacity-0 animate-fade-in-up stagger-6
                px-8 py-4 rounded-full
                font-body text-sm md:text-base font-medium tracking-wide
                cursor-pointer
                transition-all duration-500 ease-out
                hover:scale-105 hover:shadow-2xl
                active:scale-95
              "
              style={{
                background: 'linear-gradient(135deg, #c084fc, #f0abfc)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(192, 132, 252, 0.3)',
              }}
            >
              Click only if your heart is a little less angry 🌿
            </button>
          </>
        )}
      </div>
    </section>
  );
}
