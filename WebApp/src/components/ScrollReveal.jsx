import { useEffect, useRef } from 'react';

/**
 * ScrollReveal — wraps children and fades them in on scroll.
 * Uses IntersectionObserver. Respects prefers-reduced-motion.
 *
 * @param {number} delay — stagger delay in ms (for lists)
 * @param {number} threshold — visibility threshold (0–1)
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.15,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Respect reduced motion */
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('revealed');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
