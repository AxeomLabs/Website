import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useSEO from '../hooks/useSEO';

const SITE_LINKS = [
  { path: '/robotics', label: 'Robotics', num: '01' },
  { path: '/systems', label: 'Systems', num: '02' },
  { path: '/research', label: 'Research', num: '03' },
  { path: '/founders', label: 'Founders', num: '04' },
  { path: '/contact', label: 'Contact', num: '05' },
];

function NotFound() {
  useSEO(
    '404 Page Not Found | AxeomLabs',
    'The page you are looking for does not exist or has been moved. Return to the AxeomLabs homepage.',
    'https://www.axeomlabs.in/404'
  );

  useEffect(() => {
    document.body.style.overflow = '';
  }, []);

  return (
    <section className="not-found" aria-label="Page not found">
      <div className="not-found-code" aria-hidden="true">404</div>
      <h1>PAGE NOT FOUND.</h1>
      <p>
        The page you are looking for does not exist, has been moved,
        or is temporarily unavailable.
      </p>

      <Link to="/" className="btn-primary" style={{ marginBottom: 48 }}>
        RETURN HOME <span aria-hidden="true">&rarr;</span>
      </Link>

      <nav aria-label="Site pages" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px 24px',
        justifyContent: 'center',
        marginTop: 16,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.1em',
      }}>
        {SITE_LINKS.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{ color: 'var(--on-bg-muted)', textTransform: 'uppercase', transition: 'color 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--on-bg-muted)'; }}
          >
            <span style={{ color: 'var(--accent)', marginRight: 4 }}>{link.num}/</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}

export default NotFound;
