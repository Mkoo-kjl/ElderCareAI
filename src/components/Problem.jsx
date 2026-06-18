import ScrollReveal from './ScrollReveal';

export default function Problem() {
  return (
    <section id="problem" className="bg-leaf-tint">
      <div className="section-wrapper">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-widest uppercase text-leaf mb-3">
            The Challenge
          </p>
          <h2 className="section-title">
            Elderly care needs better tools — not more burden on caregivers
          </h2>
          <p className="section-subtitle mt-4">
            Aging populations in the Philippines and worldwide are growing faster than
            the care workforce can keep up. Falls go undetected, vital-sign changes
            are caught too late, and caregivers carry an unsustainable workload
            with limited technological support.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
