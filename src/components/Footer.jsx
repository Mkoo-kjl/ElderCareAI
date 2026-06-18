import Logo from './Logo';

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Objectives', href: '#objectives' },
  { label: 'The Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/80">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand column */}
          <div>
            <Logo variant="light" />
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
              An AI-Driven IoT System for Elderly Monitoring and Caregiver
              Support — a capstone research project.
            </p>
          </div>

          {/* Links column */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-white/60 hover:text-leaf transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* University column */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Institution
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              University of Cebu –<br />
              Lapu-Lapu and Mandaue
            </p>
            <p className="text-sm text-white/60 mt-2">
              College of Computer Studies
            </p>
            <p className="text-sm text-white/60 mt-1">
              BS Information Technology
            </p>
            <p className="text-xs text-white/30 font-mono mt-4">
              Capstone {year}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {year} ElderCareAI. Team Spartan.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
