import { useEffect, useRef, useState } from 'react';

export default function Acknowledgement() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Auto-trigger since it's page-wise now
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const lines = [
    { text: "You gave me", style: "normal" },
    { text: "5 hours ", style: "highlight" },
    { text: "during your toughest days.", style: "normal" },
    { text: "And I gave you hurt", style: "normal" },
    { text: "in the last 5 minutes.", style: "highlight" },
    { text: "That wasn't fair.", style: "emphasis" },
  ];

  return (
    <section
      id="acknowledgement"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-24 px-6"
      style={{ background: 'var(--color-cream)' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Section label */}
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-body text-xs uppercase tracking-[0.3em] opacity-60" style={{ color: 'var(--color-text-muted)' }}>
            The Truth
          </span>
          <div className="w-12 h-px mx-auto mt-4" style={{ background: 'var(--color-lavender-deep)' }}></div>
        </div>

        {/* Lines */}
        <div className="space-y-6">
          {lines.map((line, index) => (
            <p
              key={index}
              className={`
                transition-all ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                ${line.style === 'highlight' ? 'font-heading text-3xl md:text-5xl font-bold' : ''}
                ${line.style === 'normal' ? 'font-body text-lg md:text-xl' : ''}
                ${line.style === 'emphasis' ? 'font-heading text-2xl md:text-4xl italic mt-8' : ''}
              `}
              style={{
                transitionDuration: `${800 + index * 200}ms`,
                transitionDelay: `${index * 250}ms`,
                color: line.style === 'highlight'
                  ? 'var(--color-text-primary)'
                  : line.style === 'emphasis'
                    ? 'var(--color-accent)'
                    : 'var(--color-text-secondary)',
              }}
            >
              {line.text}
            </p>
          ))}
        </div>

        {/* Decorative divider */}
        <div
          className={`mt-16 transition-all duration-1000 delay-[2000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-3xl">🥀</span>
        </div>
      </div>
    </section>
  );
}
