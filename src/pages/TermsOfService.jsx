import useSEO from '../hooks/useSEO';

const EFFECTIVE_DATE = '26 July 2025';
const COMPANY = 'AxeomLabs';
const EMAIL = 'founder@axeomlabs.in';
const SITE = 'axeomlabs.in';

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

function TermsOfService() {
  useSEO(
    'Terms of Service | AxeomLabs',
    'Read the AxeomLabs Terms of Service. By using axeomlabs.in you agree to these terms governing use of our website and services.',
    'https://www.axeomlabs.in/terms'
  );
  return (
    <LegalPage title="Terms of Service" label="LEGAL DOCUMENTATION">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using {SITE} (the "Site"), you accept and agree to be bound by these
        Terms of Service. If you do not agree to these terms, please do not use the Site.
      </p>

      <h2>2. About {COMPANY}</h2>
      <p>
        {COMPANY} is a technology company specialising in drone systems, autonomous robotics,
        embedded software, custom hardware design, and applied research. The Site is an
        informational and contact platform for our products and services.
      </p>

      <h2>3. Use of the Site</h2>
      <p>You agree to use the Site only for lawful purposes. You must not:</p>
      <ul>
        <li>Use the Site in any way that violates applicable local, national, or international laws or regulations</li>
        <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
        <li>Attempt to gain unauthorised access to any part of the Site or its related systems</li>
        <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site</li>
        <li>Reproduce, duplicate, copy, or resell any part of the Site in violation of these Terms</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        All content on this Site, including but not limited to text, graphics, logos, images, and software,
        is the property of {COMPANY} or its content suppliers and is protected by applicable intellectual
        property laws. You may not reproduce, distribute, or create derivative works from any content
        on the Site without our prior written consent.
      </p>

      <h2>5. Contact Form and Communications</h2>
      <p>
        When you submit a contact form, you represent that the information provided is accurate
        and that you have the right to use the email address provided. We may use this information
        solely to respond to your enquiry. Submitting a contact form does not create any contractual
        obligation on the part of {COMPANY}.
      </p>

      <h2>6. Disclaimer of Warranties</h2>
      <p>
        The Site is provided on an "as is" and "as available" basis without any warranties of any kind,
        either express or implied. We do not warrant that the Site will be uninterrupted, error-free,
        or free from viruses or other harmful components.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {COMPANY} shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages arising from your use of or inability
        to use the Site or its content.
      </p>

      <h2>8. Third-Party Links</h2>
      <p>
        The Site may contain links to third-party websites. These links are provided for convenience only.
        We have no control over the content of those sites and accept no responsibility for them or for
        any loss or damage that may arise from your use of them.
      </p>

      <h2>9. Privacy</h2>
      <p>
        Your use of the Site is also governed by our{' '}
        <a href="/privacy-policy" className="legal-link">Privacy Policy</a>, which is incorporated
        into these Terms by reference.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of India.
        Any disputes arising in connection with these Terms shall be subject to the exclusive
        jurisdiction of the courts of India.
      </p>

      <h2>11. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. Changes will be effective immediately
        upon posting to the Site. Continued use of the Site following any changes constitutes your
        acceptance of the revised Terms.
      </p>

      <h2>12. Contact</h2>
      <p>
        If you have any questions about these Terms, please contact us at{' '}
        <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a>.
      </p>
    </LegalPage>
  );
}

export default TermsOfService;
