import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

function PrivacyPolicy() {
  useSEO('Privacy Policy | Acme Labs', 'Privacy policy for Acme Labs.', 'https://example.com/privacy-policy');

  return (
    <div>
      <section className="page-hero" aria-label="Privacy Policy" style={{ minHeight: 'auto' }}>
        <div className="page-hero-bg" aria-hidden="true" />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'calc(80px + var(--margin)) var(--margin) 40px', width: '100%' }}>
          <div className="page-hero-status">[ LEGAL ]</div>
          <h1 style={{ marginTop: 16 }}>PRIVACY POLICY</h1>
        </div>
      </section>
      <section className="page-section">
        <div className="container legal-content" style={{ maxWidth: 800, lineHeight: 1.8, color: 'var(--on-bg-dim)' }}>
          <p><strong>Last updated:</strong> January 2025</p>
          <h2 style={{ fontSize: 24, marginTop: 32 }}>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you fill out a contact form or send us an email.</p>
          <h2 style={{ fontSize: 24, marginTop: 32 }}>2. How We Use Your Information</h2>
          <p>We use the information we collect to respond to your enquiries and provide the services you request.</p>
          <h2 style={{ fontSize: 24, marginTop: 32 }}>3. Contact</h2>
          <p>If you have questions about this policy, please contact us at <a href="mailto:hello@example.com" style={{ color: 'var(--accent)' }}>hello@example.com</a>.</p>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
