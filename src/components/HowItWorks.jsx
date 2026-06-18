import ScrollReveal from './ScrollReveal';

/* ── Inline line-icon SVGs ─────────────────────────────── */
/* Custom minimal icons instead of a generic icon library  */

function IconMotion() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#09CD47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="8" r="4" />
      <path d="M12 38 L16 24 L20 28 L24 24 L28 38" />
      <path d="M10 16 L16 20 L24 16 L30 20" />
    </svg>
  );
}

function IconVitals() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#09CD47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22 L10 22 L14 12 L18 32 L22 18 L26 26 L30 22 L36 22" />
      <circle cx="20" cy="22" r="16" strokeDasharray="4 3" opacity="0.3" />
    </svg>
  );
}

function IconEnvironment() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#09CD47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 L20 12" />
      <path d="M20 28 L20 36" />
      <path d="M4 20 L12 20" />
      <path d="M28 20 L36 20" />
      <circle cx="20" cy="20" r="6" />
      <circle cx="20" cy="20" r="12" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  );
}

function IconWearable() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#09CD47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="8" width="16" height="24" rx="4" />
      <path d="M16 4 L16 8" />
      <path d="M24 4 L24 8" />
      <path d="M16 32 L16 36" />
      <path d="M24 32 L24 36" />
      <circle cx="20" cy="18" r="2" fill="#09CD47" />
      <path d="M16 24 L24 24" />
    </svg>
  );
}

function IconDashboard() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#38B6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="32" height="24" rx="3" />
      <path d="M4 14 L36 14" />
      <path d="M10 20 L10 26" />
      <path d="M16 18 L16 26" />
      <path d="M22 22 L22 26" />
      <path d="M28 16 L28 26" />
      <path d="M14 34 L26 34" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#38B6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 L20 6" />
      <path d="M10 12 C10 8 14 4 20 4 C26 4 30 8 30 12 L30 22 L34 28 L6 28 L10 22 Z" />
      <path d="M16 28 C16 32 18 34 20 34 C22 34 24 32 24 28" />
      <circle cx="30" cy="10" r="4" fill="#38B6FF" stroke="none" opacity="0.3" />
    </svg>
  );
}

function IconHistory() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#38B6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="22" r="14" />
      <path d="M20 14 L20 22 L26 26" />
      <path d="M8 10 L4 6" />
      <path d="M8 10 L12 6" />
    </svg>
  );
}

function IconAI() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#38B6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="6" />
      <circle cx="20" cy="6" r="3" />
      <circle cx="20" cy="34" r="3" />
      <circle cx="6" cy="20" r="3" />
      <circle cx="34" cy="20" r="3" />
      <path d="M20 9 L20 14" />
      <path d="M20 26 L20 31" />
      <path d="M9 20 L14 20" />
      <path d="M26 20 L31 20" />
    </svg>
  );
}

/* ── Data ──────────────────────────────────────────────── */

const SENSING = [
  {
    icon: <IconMotion />,
    title: 'Motion & Fall Detection',
    desc: 'Accelerometer and gyroscope data processed in real time to detect falls, unusual inactivity, or movement anomalies.',
  },
  {
    icon: <IconVitals />,
    title: 'Vital Signs Monitoring',
    desc: 'Continuous heart rate, SpO₂, and temperature tracking through non-invasive wearable sensors.',
  },
  {
    icon: <IconEnvironment />,
    title: 'Environmental Sensors',
    desc: 'Room temperature, humidity, and ambient light monitoring to flag potentially hazardous living conditions.',
  },
  {
    icon: <IconWearable />,
    title: 'Wearable Alerts',
    desc: 'A lightweight wearable device that residents can use to send manual SOS signals to caregivers instantly.',
  },
];

const FEATURES = [
  {
    icon: <IconDashboard />,
    title: 'Real-Time Dashboard',
    desc: 'A caregiver-facing web dashboard showing live sensor data, resident status, and facility-wide overview at a glance.',
  },
  {
    icon: <IconAlert />,
    title: 'Smart Alerts',
    desc: 'Threshold-based and AI-driven notifications that escalate based on urgency — no alert fatigue, no missed events.',
  },
  {
    icon: <IconHistory />,
    title: 'Historical Data Logging',
    desc: 'Timestamped records of all sensor readings, alerts, and caregiver actions for review and compliance.',
  },
  {
    icon: <IconAI />,
    title: 'AI Anomaly Detection',
    desc: 'Machine-learning models trained to recognize patterns that precede adverse events, enabling proactive care.',
  },
];

/* ── Component ─────────────────────────────────────────── */

function FeatureCard({ icon, title, desc, delay = 0 }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="card flex flex-col items-start gap-4 h-full">
        <div className="p-2.5 rounded-xl bg-gray-50">{icon}</div>
        <h4 className="font-display text-lg font-semibold text-ink">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </ScrollReveal>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-sky mb-3">
              How It Works
            </p>
            <h2 className="section-title mx-auto">
              Sensors gather. AI interprets. Caregivers act.
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              The system is built around two pillars: reliable IoT sensing at the
              point of care, and intelligent features that turn raw data into
              actionable insight for caregivers.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Sensing Mechanisms */}
          <div>
            <ScrollReveal>
              <h3 className="font-display text-xl font-bold text-leaf mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-leaf rounded-full" />
                Sensing Mechanisms
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SENSING.map((item, i) => (
                <FeatureCard key={item.title} {...item} delay={i * 100} />
              ))}
            </div>
          </div>

          {/* System Features */}
          <div>
            <ScrollReveal>
              <h3 className="font-display text-xl font-bold text-sky mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-sky rounded-full" />
                System Features
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map((item, i) => (
                <FeatureCard key={item.title} {...item} delay={i * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
