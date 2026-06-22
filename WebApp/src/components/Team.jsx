import ScrollReveal from './ScrollReveal';

const MEMBERS = [
  {
    name: 'Melvence R. Bagonggong',
    role: 'Hacker',
    program: 'BS Information Technology',
    image: '/member%201.jpg',
  },
  {
    name: 'Kristoffer James G. Layos',
    role: 'Project Manager',
    program: 'BS Information Technology',
    image: '/member%202.png',
  },
  {
    name: 'John Wayne C. Planos',
    role: 'Hipster/ Designer',
    program: 'BS Information Technology',
    image: '/member%203.jpg',
  },
];

export default function Team() {
  return (
    <section id="team" className="bg-leaf-tint">
      <div className="section-wrapper">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-sky mb-3">
              The Team
            </p>
            <h2 className="section-title">
              The people behind ElderCareAI
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              A capstone team from the University of Cebu Lapu-Lapu and
              Mandaue, College of Computer Studies.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {MEMBERS.map((member, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="flex flex-col text-center">
                {/* Full Image Card */}
                <div className="card !p-0 overflow-hidden aspect-[4/5] bg-white">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Name & Role below the card */}
                <div className="mt-4">
                  <h4 className="font-display text-lg font-bold text-ink leading-tight">
                    {member.name}
                  </h4>
                  <p className="text-sm font-semibold text-leaf mt-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mt-1.5">
                    {member.program}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
