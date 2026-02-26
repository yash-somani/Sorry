import { useEffect, useRef, useState } from 'react';

const errorLines = [
  { prefix: '>', text: ' System.log("Analyzing last interaction...");', delay: 0 },
  { prefix: '>', text: ' ...', delay: 600 },
  { prefix: '', text: '', delay: 1000 },
  { prefix: '❌', text: ' Error: HurtFeelingsException', delay: 1400, style: 'error' },
  { prefix: '📍', text: ' Location: Last few minutes of a 5h 5min call', delay: 1900 },
  { prefix: '🔍', text: ' Cause: Ego + PoorTiming', delay: 2400 },
  { prefix: '🛠️', text: ' Fix: Accountability + Growth', delay: 2900 },
  { prefix: '📊', text: ' Status: Learning...', delay: 3400, style: 'status' },
  { prefix: '', text: '', delay: 3800 },
  { prefix: '>', text: ' Applying patch: genuine_apology.js', delay: 4200, style: 'success' },
  { prefix: '>', text: ' Deploying: being_a_better_person.exe', delay: 4700, style: 'success' },
  { prefix: '', text: '', delay: 5100 },
  { prefix: '✅', text: ' Patch applied successfully.', delay: 5500, style: 'final' },
  { prefix: '🌸', text: ' Output: "I\'m sorry, Tanu."', delay: 6000, style: 'final' },
];

export default function ErrorLog() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    errorLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
      }, line.delay);
    });

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [isVisible]);

  const getLineColor = (style) => {
    switch (style) {
      case 'error': return '#ff6b6b';
      case 'status': return '#ffd93d';
      case 'success': return '#6bcb77';
      case 'final': return '#c084fc';
      default: return '#a0a0b0';
    }
  };

  return (
    <section
      id="error-log"
      className="min-h-screen flex items-center justify-center py-24 px-6"
      style={{ background: 'var(--color-dark)' }}
    >
      <div className="max-w-3xl mx-auto w-full">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gray-500">
            Developer Mode
          </span>
          <div className="w-12 h-px mx-auto mt-4 mb-8" style={{ background: 'rgba(192, 132, 252, 0.4)' }}></div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Error <span style={{ color: 'var(--color-accent)' }}>Log</span>
          </h2>
        </div>

        {/* Terminal */}
        <div
          className={`rounded-2xl overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            background: 'var(--color-dark-terminal)',
            border: '1px solid rgba(192, 132, 252, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="font-mono text-xs text-gray-500 ml-3">heart_debugger.sh — bash</span>
          </div>

          {/* Terminal body */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-loose min-h-[350px]">
            {errorLines.map((line, index) => {
              const isShown = visibleLines.includes(index);

              if (line.text === '') {
                return isShown ? <div key={index} className="h-4"></div> : null;
              }

              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ${isShown ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
                >
                  <span style={{ color: getLineColor(line.style) }}>
                    {line.prefix}
                  </span>
                  <span style={{ color: line.style ? getLineColor(line.style) : '#d0d0e0' }}>
                    {line.text}
                  </span>
                </div>
              );
            })}

            {isVisible && (
              <div className="mt-2">
                <span style={{ color: '#c084fc' }}>{'>'}</span>
                <span
                  className="inline-block w-2 h-5 ml-1 align-middle"
                  style={{
                    background: '#c084fc',
                    opacity: showCursor ? 1 : 0,
                    transition: 'opacity 0.1s',
                  }}
                ></span>
              </div>
            )}
          </div>
        </div>

        {/* Sub-text */}
        <div className={`text-center mt-10 transition-all duration-1000 delay-[7000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-body text-sm text-gray-500 italic">
            Built with guilt, fixed with growth. 🌿
          </p>
        </div>
      </div>
    </section>
  );
}
