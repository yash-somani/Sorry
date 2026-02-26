import { useEffect, useState } from 'react';

const gratitudeItems = [
  { emoji: "🎧", text: "For every time you listened when I needed someone." },
  { emoji: "🌙", text: "For staying with me and listening to me even when you were exhausted." },

  { emoji: "☕", text: "For caring even when you were tired." },
  { emoji: "😊", text: "For every smile you gave me, even on your bad days." },
  { emoji: "🤝", text: "For not giving up on me when I was difficult." },
  { emoji: "💬", text: "For those 5 hours you gave me during your toughest phase. I truly enjoyed every moment." },
  { emoji: "🌸", text: "For being you. Just being you." },
];

export default function MemoryTimeline() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    gratitudeItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, 400 + index * 350);
    });
  }, [isVisible]);

  return (
    <section
      id="memory-timeline"
      className="min-h-screen py-24 px-6 relative"
      style={{ background: 'var(--color-cream)' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--color-text-muted)' }}>
            Looking Back
          </span>
          <div className="w-12 h-px mx-auto mt-4 mb-8" style={{ background: 'var(--color-lavender-deep)' }}></div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Things I&apos;m <span style={{ color: 'var(--color-accent)' }}>Grateful</span> For
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-px"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--color-lavender-deep), var(--color-soft-pink-deep), transparent)`,
            }}
          ></div>

          <div className="space-y-8 md:space-y-12">
            {gratitudeItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isShown = visibleItems.includes(index);

              return (
                <div
                  key={index}
                  className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} pl-16 md:pl-0`}
                >
                  {/* Center dot */}
                  <div
                    className={`
                      absolute left-4 md:left-1/2 w-5 h-5 rounded-full transform md:-translate-x-1/2
                      transition-all duration-700 ease-out
                      ${isShown ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                    `}
                    style={{
                      background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-warm))',
                      boxShadow: '0 0 20px rgba(192, 132, 252, 0.4)',
                    }}
                  ></div>

                  {/* Content card */}
                  <div
                    className={`
                      w-full md:w-[calc(50%-2rem)] transition-all duration-800 ease-out
                      ${isShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                      ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}
                    `}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div
                      className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(192, 132, 252, 0.15)',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
                      }}
                    >
                      <span className="text-2xl mb-3 block">{item.emoji}</span>
                      <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-[3500ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-heading text-xl md:text-2xl italic" style={{ color: 'var(--color-text-muted)' }}>
            And a hundred more things I can&apos;t put into words...
          </p>
          <span className="text-3xl mt-4 block">🌿</span>
        </div>
      </div>
    </section>
  );
}
