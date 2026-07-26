const EFFECTIVE_DATE = '26 July 2025';
const EMAIL = 'founder@axeomlabs.in';

function LegalPage({ title, label, children }) {
  return (
    <div>
      <section className="page-hero" style={{ minHeight: 'auto' }} aria-label={title}>
        <div className="page-hero-bg" aria-hidden="true" />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'calc(80px + var(--margin)) var(--margin) var(--margin)', width: '100%' }}>
          <div className="page-hero-status">[ LEGAL DOCUMENTATION ]</div>
          <h1 style={{ marginTop: 24, fontSize: 'clamp(28px, 4vw, 52px)' }}>{title}</h1>
          <p className="page-hero-desc" style={{ marginTop: 12 }}>Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </section>
      <section className="page-section" aria-label={title + ' content'}>
        <div className="container">
          <div className="legal-body">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}

function CookiePolicy() {
  return (
    <LegalPage title="Cookie Policy" label="LEGAL DOCUMENTATION">
      <h2>1. What Are Cookies</h2>
      <p>
        Cookies are small text files that are stored on your device when you visit a website.
        They help websites function properly, remember your preferences, and provide information
        to site owners about how users interact with their content.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>
        We use cookies to ensure our website works correctly and, with your consent, to understand
        how visitors use our Site and to serve relevant advertising in the future.
      </p>

      <h2>3. Types of Cookies We Use</h2>

      <h3>3.1 Essential Cookies (Always Active)</h3>
      <p>
        These cookies are necessary for the website to function and cannot be switched off.
        They do not store any personally identifiable information.
      </p>
      <div className="cookie-table">
        <div className="cookie-table-header">
          <span>Cookie Name</span>
          <span>Purpose</span>
          <span>Duration</span>
        </div>
        <div className="cookie-table-row">
          <span>cookie_consent</span>
          <span>Stores your cookie preferences</span>
          <span>1 year</span>
        </div>
        <div className="cookie-table-row">
          <span>session</span>
          <span>Maintains session state for form submissions</span>
          <span>Session</span>
        </div>
      </div>

      <h3>3.2 Analytics Cookies (With Consent)</h3>
      <p>
        These cookies help us understand how visitors interact with our website by collecting
        aggregated, anonymous information. We may use these to improve the Site experience.
        These are only activated if you consent.
      </p>
      <div className="cookie-table">
        <div className="cookie-table-header">
          <span>Provider</span>
          <span>Purpose</span>
          <span>Duration</span>
        </div>
        <div className="cookie-table-row">
          <span>Google Analytics (planned)</span>
          <span>Page views, traffic sources, user behaviour analysis</span>
          <span>Up to 2 years</span>
        </div>
      </div>

      <h3>3.3 Advertising Cookies (With Consent)</h3>
      <p>
        With your explicit consent, we may in the future share aggregated, anonymised cookie data
        with advertising partners to serve you relevant advertisements on other platforms.
        No personally identifiable information is shared without your separate, explicit consent.
        These are only activated if you opt in.
      </p>

      <h2>4. Managing Cookies</h2>
      <p>
        You can manage your cookie preferences at any time by clicking the cookie settings
        option in the footer of our Site. You can also control cookies through your browser settings:
      </p>
      <ul>
        <li><strong>Chrome</strong> - Settings &gt; Privacy and Security &gt; Cookies</li>
        <li><strong>Firefox</strong> - Settings &gt; Privacy and Security &gt; Cookies</li>
        <li><strong>Safari</strong> - Preferences &gt; Privacy &gt; Cookies</li>
        <li><strong>Edge</strong> - Settings &gt; Privacy, Search and Services &gt; Cookies</li>
      </ul>
      <p>
        Please note that disabling certain cookies may affect the functionality of the Site.
      </p>

      <h2>5. Third-Party Cookies</h2>
      <p>
        Some content or functionality on our Site may be provided by third parties (such as Google Fonts
        or embedded videos), and those parties may set their own cookies. We do not control these cookies.
        Please refer to the relevant third parties' privacy policies for more information.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. The updated date at the top of this page
        will reflect the most recent revision. Continued use of the Site after changes are posted
        constitutes acceptance of those changes.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have questions about our use of cookies, please contact us at{' '}
        <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a>.
      </p>
    </LegalPage>
  );
}

export default CookiePolicy;
