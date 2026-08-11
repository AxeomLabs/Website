import { useEffect } from 'react';

const DEFAULT_TITLE = 'Acme Labs — Engineering the Future';
const DEFAULT_DESC  = 'Acme Labs builds advanced technology solutions.';

export default function useSEO(title, description, canonical) {
  useEffect(() => {
    if (title) document.title = title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag && description) descTag.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute('content', description);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle && title) twTitle.setAttribute('content', title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && description) twDesc.setAttribute('content', description);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.href = canonical;
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (descTag) descTag.setAttribute('content', DEFAULT_DESC);
      if (ogTitle) ogTitle.setAttribute('content', DEFAULT_TITLE);
      if (ogDesc) ogDesc.setAttribute('content', DEFAULT_DESC);
      if (twTitle) twTitle.setAttribute('content', DEFAULT_TITLE);
      if (twDesc) twDesc.setAttribute('content', DEFAULT_DESC);
      if (canonicalTag) canonicalTag.href = 'https://example.com/';
    };
  }, [title, description, canonical]);
}
