import { useEffect } from 'react';
import useSEO from '../hooks/useSEO';

const EFFECTIVE_DATE = '26 July 2025';
const COMPANY = 'AxeomLabs';
const EMAIL = 'founder@axeomlabs.in';


function LegalPage({ title, label, children }) {
  return (
    <div>
      <section className="page-hero" style={{ minHeight: 'auto' }} aria-label={title}>
        <div className="page-hero-bg" aria-hidden="true" />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'calc(80px + var(--margin)) var(--margin) var(--margin)', width: '100%' }}>
          <div className="page-hero-status">[ {label} ]</div>
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

function PrivacyPolicy() {
  useSEO(
    'Privacy Policy | AxeomLabs',
    'Read the AxeomLabs Privacy Policy. We only collect information voluntarily provided through our contact form and do not sell or share data with third parties without consent.',
    'https://www.axeomlabs.in/privacy-policy'
  );
  return (
    <LegalPage title="Privacy Policy" label="LEGAL DOCUMENTATION">
      <h2>1. Introduction</h2>
      <p>
        {COMPANY} ("we", "our", or "us") is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information
        when you visit our website at axeomlabs.in (the "Site").
      </p>
      <p>
        We collect as little personal data as possible. We do not collect any personal information
        unless you voluntarily provide it to us by filling out our contact form or sending us an email.
      </p>

      <h2>2. Information We Collect</h2>
      <h3>2.1 Information You Provide</h3>
      <p>When you contact us via the form on our Site, we collect:</p>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>The content of your message</li>
      </ul>
      <p>This information is submitted voluntarily. You are not required to provide it.</p>

      <h3>2.2 Automatically Collected Information</h3>
      <p>
        Like most websites, our hosting provider may automatically collect certain technical information
        when you visit, including IP address, browser type, pages visited, and time stamps.
        This data is aggregated and not linked to any personally identifiable information.
      </p>

      <h3>2.3 Cookies</h3>
      <p>
        We use only essential cookies required for the Site to function correctly. With your consent,
        we may also use analytics and advertising cookies. You can manage your preferences via the
        cookie consent banner. For full details, please read our{' '}
        <a href="/cookie-policy" className="legal-link">Cookie Policy</a>.
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information you provide solely to:</p>
      <ul>
        <li>Respond to your enquiry or message</li>
        <li>Communicate with you regarding your project or collaboration request</li>
      </ul>
      <p>
        We do not use your information for marketing purposes without your explicit consent.
        We do not sell, trade, or otherwise transfer your personal data to any third party.
      </p>

      <h2>4. Data Retention</h2>
      <p>
        We retain your personal information only for as long as necessary to respond to your enquiry.
        Once your enquiry is resolved, we may retain a record for up to 12 months for legitimate business purposes,
        after which it is deleted.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We implement reasonable technical and organisational measures to protect your personal information.
        However, no method of transmission over the internet is 100% secure, and we cannot guarantee
        absolute security.
      </p>

      <h2>6. Third-Party Services</h2>
      <p>Our Site uses the following third-party services:</p>
      <ul>
        <li><strong>Web3Forms</strong> - for processing contact form submissions. Their privacy policy applies to data processed through their service.</li>
        <li><strong>Unsplash</strong> - for stock photography displayed on the Site.</li>
        <li><strong>Google Fonts</strong> - for typography, which may result in font requests to Google's servers.</li>
      </ul>

      <h2>7. Your Rights</h2>
      <p>Depending on your location, you may have the following rights regarding your personal data:</p>
      <ul>
        <li><strong>Right to access</strong> - request a copy of the personal data we hold about you</li>
        <li><strong>Right to rectification</strong> - request correction of inaccurate data</li>
        <li><strong>Right to erasure</strong> - request deletion of your personal data</li>
        <li><strong>Right to object</strong> - object to processing of your personal data</li>
        <li><strong>Right to withdraw consent</strong> - withdraw consent at any time where processing is based on consent</li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at{' '}
        <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a>.
      </p>

      <h2>8. Children's Privacy</h2>
      <p>
        Our Site is not directed to children under the age of 13. We do not knowingly collect personal
        information from children. If you believe a child has provided us with personal information,
        please contact us and we will delete it promptly.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any significant
        changes by updating the "Effective date" at the top of this page. Continued use of the Site
        after any changes constitutes acceptance of the updated policy.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or our data practices, please contact us:<br />
        <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a>
      </p>
    </LegalPage>
  );
}

export default PrivacyPolicy;
