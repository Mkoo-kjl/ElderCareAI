import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const CONTACT_EMAIL = 'eldercare.ai.capstone@gmail.com';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `ElderCareAI Inquiry from ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white">
      <div className="section-wrapper">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold tracking-widest uppercase text-leaf mb-3">
                Contact
              </p>
              <h2 className="section-title">Get in touch</h2>
              <p className="section-subtitle mx-auto mt-4">
                Questions about the research, interested in a partnership, or
                want to learn more? Reach out to the team.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                id="contact-form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-ink mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="
                        w-full px-4 py-3 rounded-xl
                        border border-gray-200
                        bg-gray-50 text-ink
                        placeholder:text-gray-400
                        focus:outline-none focus:ring-2 focus:ring-leaf/40 focus:border-leaf
                        transition-all duration-200
                      "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-ink mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="
                        w-full px-4 py-3 rounded-xl
                        border border-gray-200
                        bg-gray-50 text-ink
                        placeholder:text-gray-400
                        focus:outline-none focus:ring-2 focus:ring-leaf/40 focus:border-leaf
                        transition-all duration-200
                      "
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-ink mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="
                      w-full px-4 py-3 rounded-xl
                      border border-gray-200
                      bg-gray-50 text-ink
                      placeholder:text-gray-400
                      focus:outline-none focus:ring-2 focus:ring-leaf/40 focus:border-leaf
                      transition-all duration-200 resize-none
                    "
                  />
                </div>

                <button type="submit" className="btn-leaf w-full sm:w-auto">
                  Send Message
                  <svg className="inline-block ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <p className="text-xs text-gray-400 font-mono">
                  [PLACEHOLDER — replace CONTACT_EMAIL with your real address]
                </p>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="
                  mx-auto w-16 h-16 rounded-full
                  bg-leaf-tint flex items-center justify-center mb-4
                ">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#09CD47" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M6 14 L12 20 L22 8" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  Your email client should be open
                </h3>
                <p className="text-gray-600 mt-2">
                  Complete sending the message in your email application. Thank you!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-leaf font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
