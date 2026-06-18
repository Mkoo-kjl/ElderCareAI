import { useState, useEffect } from 'react';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Objectives', href: '#objectives' },
  { label: 'The Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav
      id="main-nav"
      className={`
        fixed top-0 inset-x-0 z-50
        transition-all duration-300
        ${scrolled
          ? 'bg-white/95 backdrop-blur shadow-sm'
          : 'bg-transparent'}
      `}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="shrink-0" aria-label="ElderCareAI Home">
          <Logo />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="
                text-sm font-medium text-ink/70
                hover:text-leaf transition-colors duration-200
              "
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="btn-leaf text-sm !px-5 !py-2">
            Contact Us
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-ink transition-transform duration-200
              ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-ink transition-opacity duration-200
              ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-ink transition-transform duration-200
              ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white mobile-menu-enter">
          <div className="flex flex-col items-center gap-6 pt-12 px-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-lg font-medium text-ink hover:text-leaf transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-leaf mt-4 w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
