import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pt-28 md:pt-36 pb-0"
    >
      {/* Subtle dot-grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #09CD47 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Decorative gradient orbs */}
      <div
        className="absolute top-20 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'linear-gradient(135deg, #09CD47, #38B6FF)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 -right-32 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'linear-gradient(135deg, #38B6FF, #09CD47)' }}
        aria-hidden="true"
      />

      <div className="relative section-wrapper text-center pb-12 md:pb-20">
        <ScrollReveal>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-tight max-w-4xl mx-auto">
            Watching over aging in place —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-leaf to-sky">
              without watching over their shoulder.
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            ElderCareAI pairs IoT sensors with AI-driven analysis to give
            caregivers real-time alerts and a clear monitoring dashboard —
            so elderly residents stay safe while keeping their dignity and
            independence.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#how-it-works" className="btn-leaf text-base px-8 py-3.5">
              See How It Works
            </a>
            <a href="#contact" className="btn-outline text-base px-8 py-3.5">
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
