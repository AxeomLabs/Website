import { useState, useEffect } from 'react';

const CONSENT_KEY = 'axeom_cookie_consent';

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, advertising: false });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (consent) => {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); } catch {}
    setVisible(false);
  };

  const acceptAll = () => save({ essential: true, analytics: true, advertising: true });
  const rejectAll = () => save({ essential: true, analytics: false, advertising: false });
  const savePrefs = () => save({ essential: true, ...prefs });

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-modal="true" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        {!showDetails ? (
          <>
            <div className="cookie-banner-content">
              <p className="cookie-banner-title">We use cookies</p>
              <p className="cookie-banner-text">
                We use essential cookies to make this site work. With your consent, we may also use
                analytics and advertising cookies.{' '}
                <a href="/cookie-policy" className="cookie-link">Learn more</a>.
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button className="cookie-btn cookie-btn-ghost" onClick={() => setShowDetails(true)}>
                Manage preferences
              </button>
              <button className="cookie-btn cookie-btn-secondary" onClick={rejectAll}>
                Reject non-essential
              </button>
              <button className="cookie-btn cookie-btn-primary" onClick={acceptAll}>
                Accept all
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cookie-banner-content">
              <p className="cookie-banner-title">Cookie preferences</p>
              <div className="cookie-pref-row">
                <span className="cookie-pref-label">
                  <strong>Essential</strong>
                  <span>Required for the site to function</span>
                </span>
                <span className="cookie-toggle cookie-toggle-on" aria-label="Essential cookies always on">Always on</span>
              </div>
              <div className="cookie-pref-row">
                <label className="cookie-pref-label" htmlFor="pref-analytics">
                  <strong>Analytics</strong>
                  <span>Help us understand how visitors use the site</span>
                </label>
                <input
                  id="pref-analytics"
                  type="checkbox"
                  className="cookie-checkbox"
                  checked={prefs.analytics}
                  onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))}
                />
              </div>
              <div className="cookie-pref-row">
                <label className="cookie-pref-label" htmlFor="pref-advertising">
                  <strong>Advertising</strong>
                  <span>Allows us to share data with advertising partners (with consent)</span>
                </label>
                <input
                  id="pref-advertising"
                  type="checkbox"
                  className="cookie-checkbox"
                  checked={prefs.advertising}
                  onChange={e => setPrefs(p => ({ ...p, advertising: e.target.checked }))}
                />
              </div>
            </div>
            <div className="cookie-banner-actions">
              <button className="cookie-btn cookie-btn-ghost" onClick={() => setShowDetails(false)}>
                Back
              </button>
              <button className="cookie-btn cookie-btn-primary" onClick={savePrefs}>
                Save preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CookieBanner;
