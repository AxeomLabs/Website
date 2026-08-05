import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useSEO from '../hooks/useSEO';
import useReducedMotion from '../hooks/useReducedMotion';

const WEB3FORMS_KEY = '8d069e2b-4ec5-4e29-94c2-0d8429647ba6';

const CONTACT_DETAILS = [
  {
    label: 'EMAIL',
    value: 'founder@axeomlabs.in',
    href: 'mailto:founder@axeomlabs.in',
    icon: '✉',
  },
  {
    label: 'BASE',
    value: 'India',
    href: null,
    icon: '◎',
  },
  {
    label: 'RESPONSE TIME',
    value: 'Within 48 hours',
    href: null,
    icon: '◷',
  },
];

function Contact() {
  const container = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  useSEO(
    'Contact | AxeomLabs — Get in Touch',
    'Get in touch with AxeomLabs. Whether you have a project, want to collaborate, or just want to say hello — reach out to founder@axeomlabs.in.',
    'https://www.axeomlabs.in/contact'
  );

  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!prefersReducedMotion) {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from('.contact-hero-label', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' })
        .from('.contact-hero h1', { opacity: 0, y: 50, duration: 1, ease: 'expo.out' }, '-=0.2')
        .from('.contact-hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' }, '-=0.5')
        .from('.contact-details-item', {
          opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'expo.out',
        }, '-=0.3')
        .from('.contact-form-field', {
          opacity: 0, y: 16, duration: 0.5, stagger: 0.08, ease: 'expo.out',
        }, '-=0.4');
    }
  }, { scope: container });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: form.name,
          email: form.email,
          subject: `[AxeomLabs Contact] ${form.subject}`,
          message: form.message,
          botcheck: '',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div ref={container}>
      {/* HERO */}
      <section className="contact-hero" aria-label="Contact AxeomLabs">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="contact-hero-inner">
          <div className="contact-hero-left">
            <div className="contact-hero-label">06 // CONTACT</div>
            <h1>GET IN<br />TOUCH.</h1>
            <p className="contact-hero-desc">
              Whether you have a project in mind, want to collaborate on something new,
              or just want to say hello — we want to hear from you.
            </p>

            <div className="contact-details">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} className="contact-details-item">
                  <span className="contact-details-icon" aria-hidden="true">{item.icon}</span>
                  <div>
                    <div className="contact-details-label">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="contact-details-value contact-details-link">
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-details-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form-wrap">
            <div className="contact-form-header">
              <span className="contact-form-label">SEND A MESSAGE</span>
              <span className="contact-form-status">
                <span className="contact-form-dot" aria-hidden="true" />
                SECURE
              </span>
            </div>

            {status === 'success' ? (
              <div className="contact-success">
                <div className="contact-success-icon" aria-hidden="true">✓</div>
                <h3>Message Sent</h3>
                <p>We received your message and will respond within 48 hours.</p>
                <button
                  className="btn-primary"
                  onClick={() => setStatus('idle')}
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="contact-form"
                noValidate
                aria-label="Contact form"
              >
                {/* Honeypot */}
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" />

                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="contact-name">NAME</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="contact-email">EMAIL</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="contact-form-field">
                  <label htmlFor="contact-subject">SUBJECT</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What is this about?"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-form-field">
                  <label htmlFor="contact-message">MESSAGE</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    placeholder="Tell us about your project, idea, or inquiry..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {status === 'error' && (
                  <div className="contact-error" role="alert">
                    Something went wrong. Please try again or email us directly at
                    {' '}<a href="mailto:founder@axeomlabs.in">founder@axeomlabs.in</a>.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary contact-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="contact-spinner" aria-hidden="true" />
                      SENDING...
                    </>
                  ) : (
                    'SEND MESSAGE \u2192'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
