import useSEO from '../hooks/useSEO';

function TermsOfService() {
  useSEO('Terms of Service | Acme Labs', 'Terms of service for Acme Labs.', 'https://example.com/terms-of-service');

  return (
    <div>
      <section className="page-hero" aria-label="Terms of Service" style={{ minHeight: 'auto' }}>
        <div className="page-hero-bg" aria-hidden="true" />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'calc(80px + var(--margin)) var(--margin) 40px', width: '100%' }}>
          <div className="page-hero-status">[ LEGAL ]</div>
          <h1 style={{ marginTop: 16 }}>TERMS OF SERVICE</h1>
        </div>
      </section>
      <section className="page-section">
        <div className="container legal-content" style={{ maxWidth: 800, lineHeight: 1.8, color: 'var(--on-bg-dim)' }}>
          <p><strong>Last updated:</strong> January 2025</p>
          <h2 style={{ fontSize: 24, marginTop: 32 }}>1. Acceptance of Terms</h2>
          <p>By accessing this website, you agree to be bound by these terms of service.</p>
          <h2 style={{ fontSize: 24, marginTop: 32 }}>2. Use of Services</h2>
          <p>You agree to use our services only for lawful purposes and in accordance with these terms.</p>
          <h2 style={{ fontSize: 24, marginTop: 32 }}>3. Contact</h2>
          <p>For questions, contact us at <a href="mailto:hello@example.com" style={{ color: 'var(--accent)' }}>hello@example.com</a>.</p>
        </div>
      </section>
    </div>
  );
}

export default TermsOfService;
