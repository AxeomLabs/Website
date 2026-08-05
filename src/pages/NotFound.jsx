import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useSEO from '../hooks/useSEO';

function NotFound() {
  useSEO(
    '404 | Page Not Found -- AxeomLabs',
    'The page you are looking for does not exist or has been moved.',
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
      <Link to="/" className="btn-primary">
        RETURN HOME <span aria-hidden="true">&rarr;</span>
      </Link>
    </section>
  );
}

export default NotFound;
