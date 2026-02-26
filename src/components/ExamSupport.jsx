import { useEffect, useRef, useState } from 'react';

const motivationMessages = [
  "Rest when you need to. You're human, not a machine. 🤗",
  "You are stronger than your syllabus. 💪",
  "I believe in you more than you believe in yourself. 🌟",
  "Take a deep breath. You've got this. 🌬️",
  "Every page you turn takes you closer to your dream. 📖",
  "The girl who works this hard deserves every star. ⭐",
  "Your effort today is writing your tomorrow. ✍️",
  "You're not just studying. You're building your future. 🏗️",
  "Even diamonds need pressure. You're becoming one. 💎",
  "One chapter at a time. One breath at a time. 🍃",
  "I'm proud of you, even if I don't say it enough. 🌻",
  "You've survived 100% of your worst days. Keep going. 🔥",
  "The world needs what you're becoming. Don't give up. 🌍",
  "When this is over, you'll look back and smile. 😊",
  "Your notes don't know how powerful the girl reading them is. 📝",
  "Eat something. Your brain needs fuel, warrior. 🍎",
  "You're closer to the finish line than you think. 🏁",
  "It's okay to feel overwhelmed. It's not okay to give up. 🌊",
  "Sleep well tonight. Tomorrow you'll conquer again. 🌙",
  "Somewhere, your future self is thanking you for this grind. 🙏",
  "You don't have to be perfect. You just have to keep going. 🚶‍♀️",
  "That chapter you hate? You'll master it. Watch. 👀",
  "Take a 5-minute break. Stretch. You deserve it. 🧘",
  "Exams are temporary. Your strength is permanent. 💫",
  "The hardest battles are given to the toughest warriors. ⚔️",
  "You're doing better than you think. Trust the process. 🌱",
  "Put the phone down after reading this. Go crush it. 📵",
  "Your handwriting gets messier when you're working hard. That's a good sign. ✏️",
  "Nobody sees the hours you put in. But the results will speak. 📊",
  "Coffee or chai — whatever keeps you going, you've earned it. ☕",
  "Don't compare your chapter 1 to someone else's chapter 20. 📚",
  "You're not studying for marks. You're studying for your dreams. 🎯",
  "If it was easy, everyone would do it. You're built different. 🔥",
  "That one topic you keep avoiding? Start with just 10 minutes. ⏰",
  "Your dedication is inspiring, even if nobody tells you. 🌸",
  "You are going to walk out of that exam hall smiling. 😌",
  "Revision is just telling your brain: 'Hey, remember this.' 🧠",
  "The syllabus is big. But so is your determination. 📏",
  "Difficult roads lead to beautiful destinations. 🛤️",
  "Don't stress about what you haven't covered. Focus on what you can. 🎯",
  "You have the same 24 hours as every topper before you. Use them. ⏳",
  "No amount of anxiety can change the future. Preparation can. 🔑",
  "Read this, smile, and get back to work. Deal? 🤝",
  "You're going to look back at this phase and be so proud. 🏆",
  "The pen in your hand is more powerful than you think. 🖊️",
  "Keep going. The last few days are the hardest but the most important. 📅",
  "Tough times don't last. Tough girls do. 🌺",
  "You've already come so far. Don't stop now. 🚀",
  "When you feel like quitting, remember why you started. 🌄",
];

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        ended: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.ended) {
    return (
      <div className="text-center">
        <p className="font-heading text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>
          You did it! 🎉
        </p>
        <p className="font-body text-base mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          The battle is over. You&apos;re a warrior.
        </p>
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center px-4 py-3 rounded-2xl min-w-[70px]"
          style={{
            background: 'rgba(192, 132, 252, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(192, 132, 252, 0.2)',
          }}
        >
          <span className="font-heading text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="font-body text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ExamSupport() {
  const [isVisible, setIsVisible] = useState(false);
  const [motivation, setMotivation] = useState(null);
  const [usedIndices, setUsedIndices] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const getRandomMessage = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    let available = motivationMessages
      .map((_, i) => i)
      .filter((i) => !usedIndices.includes(i));

    if (available.length === 0) {
      setUsedIndices([]);
      available = motivationMessages.map((_, i) => i);
    }

    const randomIndex = available[Math.floor(Math.random() * available.length)];
    setUsedIndices((prev) => [...prev, randomIndex]);

    setMotivation(null);
    setTimeout(() => {
      setMotivation(motivationMessages[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  // Set exam end date — update this to the actual date
  const examEndDate = new Date('2026-03-28T13:30:00+05:30');

  return (
    <section
      id="exam-support"
      className="min-h-screen flex items-center justify-center py-24 px-6 relative"
      style={{
        background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-lavender-soft) 50%, var(--color-sky-soft) 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Section header */}
        <div className={`mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--color-text-muted)' }}>
            For the warrior
          </span>
          <div className="w-12 h-px mx-auto mt-4" style={{ background: 'var(--color-lavender-deep)' }}></div>
        </div>

        <h2
          className={`font-heading text-3xl md:text-5xl font-bold mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ color: 'var(--color-text-primary)' }}
        >
          To The Girl Fighting <br className="hidden md:block" />
          <span style={{ color: 'var(--color-accent)' }}>Her Toughest Battle</span>
        </h2>

        {/* Emotional bridge */}
        <div className={`space-y-3 mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-body text-lg md:text-xl" style={{ color: 'var(--color-text-secondary)' }}>
            While you&apos;re solving problems in your books,
          </p>
          <p className="font-body text-lg md:text-xl" style={{ color: 'var(--color-text-secondary)' }}>
            I created one in your heart.
          </p>
          <p className="font-heading text-xl md:text-2xl italic mt-4" style={{ color: 'var(--color-accent)' }}>
            And I&apos;m truly sorry.
          </p>
        </div>

        {/* Countdown */}
        <div className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-body text-sm uppercase tracking-wider mb-6" style={{ color: 'var(--color-text-muted)' }}>
            ⏳ Until the battle ends
          </p>
          <Countdown targetDate={examEndDate} />
        </div>

        {/* Daily Motivation */}
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={getRandomMessage}
            className="
              px-8 py-4 rounded-full
              font-body text-sm md:text-base font-medium tracking-wide
              cursor-pointer
              transition-all duration-500 ease-out
              hover:scale-105 hover:shadow-2xl
              active:scale-95
            "
            style={{
              background: 'linear-gradient(135deg, #c084fc, #a78bfa)',
              color: 'white',
              boxShadow: '0 8px 32px rgba(192, 132, 252, 0.25)',
            }}
          >
            ✨ Daily Motivation
          </button>

          {/* Motivation message */}
          <div className="mt-8 min-h-[80px] flex items-center justify-center">
            {motivation && (
              <div
                className="px-8 py-5 rounded-2xl max-w-lg mx-auto animate-fade-in-up"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(192, 132, 252, 0.2)',
                  boxShadow: '0 8px 32px rgba(192, 132, 252, 0.1)',
                }}
              >
                <p className="font-heading text-lg md:text-xl italic" style={{ color: 'var(--color-text-primary)' }}>
                  {motivation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
