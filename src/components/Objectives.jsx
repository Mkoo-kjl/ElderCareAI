import ScrollReveal from './ScrollReveal';

const SPECIFIC_OBJECTIVES = [
  'To design and develop an IoT-based sensor network capable of monitoring motion, vital signs, environmental conditions, and fall events among elderly residents in an assisted living facility.',
  'To implement an AI-driven analysis module that processes sensor data in real time, detects anomalies, and generates prioritized alerts for caregivers.',
  'To develop a web-based caregiver dashboard that presents real-time resident status, historical trends, and actionable notifications in a clear, accessible interface.',
  "To evaluate the system's accuracy, responsiveness, and usability through testing at a partner assisted living facility in Cebu.",
  'To assess caregiver satisfaction and workload impact through structured surveys (Form B) administered before and after system deployment.',
];

export default function Objectives() {
  return (
    <section id="objectives" className="bg-sky-tint">
      <div className="section-wrapper">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-widest uppercase text-sky mb-3">
            Research Objectives
          </p>
          <h2 className="section-title">What this study aims to achieve</h2>
        </ScrollReveal>

        {/* General Objective — pull-quote style */}
        <ScrollReveal delay={100}>
          <blockquote className="
            mt-10 pl-6 border-l-4 border-leaf
            bg-white/60 rounded-r-card py-6 pr-6
          ">
            <p className="font-display text-xl sm:text-2xl text-ink leading-relaxed italic">
              "To develop and evaluate an AI-driven IoT system for real-time
              elderly monitoring and caregiver support in an assisted living
              facility setting."
            </p>
            <cite className="block mt-3 text-sm text-gray-500 not-italic font-mono">
              — General Objective
            </cite>
          </blockquote>
        </ScrollReveal>

        {/* Specific Objectives — numbered list */}
        <div className="mt-12">
          <ScrollReveal>
            <h3 className="font-display text-lg font-semibold text-ink mb-6">
              Specific Objectives
            </h3>
          </ScrollReveal>

          <ol className="space-y-5">
            {SPECIFIC_OBJECTIVES.map((obj, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <li className="flex gap-4 items-start">
                  <span className="
                    shrink-0 w-9 h-9 rounded-full
                    bg-gradient-to-br from-leaf to-sky
                    text-white font-mono text-sm font-semibold
                    flex items-center justify-center
                    mt-0.5
                  ">
                    {i + 1}
                  </span>
                  <p className="text-base text-ink/80 leading-relaxed">
                    {obj}
                    {' '}
                  </p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
