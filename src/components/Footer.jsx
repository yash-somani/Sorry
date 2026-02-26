export default function Footer() {
  return (
    <footer
      className="min-h-screen flex items-center justify-center py-16 px-6 text-center relative overflow-hidden"
    >
      {/* Background image — more visible */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/tanu.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          opacity: 0.45,
        }}
      />

      {/* Soft gradient overlay — lighter, lets photo breathe */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(26, 18, 37, 0.3) 0%, rgba(26, 18, 37, 0.55) 50%, rgba(26, 18, 37, 0.75) 100%)',
        }}
      />

      <div className="max-w-lg mx-auto relative z-10">
        <div className="mb-8">
          <span className="text-5xl animate-pulse-soft inline-block">🌸</span>
        </div>

        <p className="font-heading text-2xl md:text-3xl text-white mb-4"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
        >
          I&apos;m sorry, Babudi.
        </p>

        <p className="font-body text-base text-gray-300 mb-2"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
        >
          I hope this makes you smile,
        </p>
        <p className="font-body text-base text-gray-300 mb-8"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
        >
          even if it&apos;s just a little.
        </p>

        <div className="w-12 h-px mx-auto mb-8" style={{ background: 'rgba(192, 132, 252, 0.5)' }}></div>

        <p className="font-body text-sm text-gray-400"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
        >
          Made with care, guilt, and a lot of code.
        </p>
        <p className="font-body text-xs text-gray-400 mt-2"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
        >
          — From someone who&apos;s learning to be better 🌿
        </p>
      </div>
    </footer>
  );
}
