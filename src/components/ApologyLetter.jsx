import { useEffect, useState } from 'react';

const apologyLines = [
  { text: "I was wrong.", delay: 0 },
  { text: "You didn't deserve that.", delay: 400 },
  { text: "You deserved peace that night.", delay: 800 },
  { text: "I am sorry.", delay: 1200 },
  { text: "", delay: 1600 },
  { text: "Not because I'm scared of losing you.", delay: 2000, style: 'muted' },
  { text: "But because you matter.", delay: 2600, style: 'highlight' },
  { text: "", delay: 3000 },
  { text: "And I hurt someone who matters.", delay: 3400, style: 'final' },
];

export default function ApologyLetter() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    apologyLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
      }, line.delay);
    });
  }, [isVisible]);

  return (
    <section
      id="apology-letter"
      className="min-h-screen flex items-center justify-center py-24 px-6 relative"
      style={{
        background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-lavender-soft) 100%)',
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, var(--color-accent-warm), transparent)' }}
      ></div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Section header */}
        <div className={`mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--color-text-muted)' }}>
            From my heart
          </span>
          <div className="w-12 h-px mx-auto mt-4 mb-8" style={{ background: 'var(--color-lavender-deep)' }}></div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            The Apology
          </h2>
        </div>

        {/* Letter card */}
        <div
          className={`p-8 md:p-12 rounded-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(192, 132, 252, 0.15)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div className="space-y-5">
            {apologyLines.map((line, index) => {
              if (line.text === '') {
                return <div key={index} className="h-4"></div>;
              }

              const isShown = visibleLines.includes(index);

              let className = 'font-body text-lg md:text-xl leading-relaxed';
              let color = 'var(--color-text-secondary)';

              if (line.style === 'muted') {
                className = 'font-body text-base md:text-lg';
                color = 'var(--color-text-muted)';
              } else if (line.style === 'highlight') {
                className = 'font-heading text-2xl md:text-3xl font-bold';
                color = 'var(--color-accent)';
              } else if (line.style === 'final') {
                className = 'font-heading text-xl md:text-2xl italic';
                color = 'var(--color-text-primary)';
              }

              return (
                <p
                  key={index}
                  className={`
                    ${className}
                    transition-all duration-800 ease-out
                    ${isShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ color }}
                >
                  {line.text}
                </p>
              );
            })}
          </div>
        </div>

        {/* Bottom element */}
        <div className={`mt-12 transition-all duration-1000 delay-[4000ms] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <span className="text-4xl animate-pulse-soft inline-block">🌸</span>
        </div>
      </div>
    </section>
  );
}
