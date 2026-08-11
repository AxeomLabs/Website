import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useSEO from '../hooks/useSEO';
import useReducedMotion from '../hooks/useReducedMotion';

function Contact() {
  const container = useRef(null);
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const prefersReducedMotion = useReducedMotion();

  useSEO('Contact | Acme Labs', 'Get in touch with Acme Labs.', 'https://example.com/contact');

  useGSAP(() => {
    if (!prefersReducedMotion) {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from('.contact-hero-label', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' })
        .from('.contact-hero h1', { opacity: 0, y: 50, duration: 1, ease: 'expo.out' }, '-=0.2')
        .from('.contact-hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' }, '-=0.5')
        .from('.contact-details-item', { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'expo.out' }, '-=0.3')
        .from('.contact-form-field', { opacity: 0, y: 16, duration: 0.5, stagger: 0.08, ease: 'expo.out' }, '-=0.4');
    }
  }, { scope: container });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // TODO: Replace with your form backend
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_KEY',
          subject: `Contact: ${form.subject || 'General Enquiry'}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          subject_line: form.subject,
          message: form.message,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div ref={container}>
      <section className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="container contact-hero-inner">
          <div className="contact-hero-text">
            <div className="contact-hero-label label-mono">CONTACT US</div>
            <h1>LET'S TALK.</h1>
            <p className="contact-hero-desc">
              Have a project in mind? Want to collaborate? We'd love to hear from you.
            </p>
            <div className="contact-details-list">
              <div className="contact-details-item">
                <span className="contact-icon">✉</span>
                <div><div className="contact-detail-label">EMAIL</div>
                  <a href="mailto:hello@example.com">hello@example.com</a>
                </div>
              </div>
              <div className="contact-details-item">
                <span className="contact-icon">◎</span>
                <div><div className="contact-detail-label">LOCATION</div><span>Remote / Worldwide</span></div>
              </div>
              <div className="contact-details-item">
                <span className="contact-icon">◷</span>
                <div><div className="contact-detail-label">RESPONSE TIME</div><span>Within 48 hours</span></div>
              </div>
            </div>
          </div>
          <div className="contact-form-wrap">
            {status === 'success' ? (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>
                <h3>MESSAGE SENT</h3>
                <p>Thank you. We'll get back to you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="c-name">NAME</label>
                    <input id="c-name" name="name" type="text" required placeholder="Your name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="c-email">EMAIL</label>
                    <input id="c-email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="contact-form-field">
                  <label htmlFor="c-subject">SUBJECT</label>
                  <input id="c-subject" name="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="c-message">MESSAGE</label>
                  <textarea id="c-message" name="message" rows="5" required placeholder="Tell us about your project…" value={form.message} onChange={handleChange} />
                </div>
                {status === 'error' && <p style={{ color: '#e55', fontSize: 13, marginBottom: 12 }}>Something went wrong. Please try again.</p>}
                <button type="submit" className="btn-primary contact-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'SENDING…' : <>SEND MESSAGE <span aria-hidden="true">→</span></>}
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
