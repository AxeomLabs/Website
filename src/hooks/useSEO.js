import { useEffect } from 'react';

/**
 * useSEO — Sets page-level title and meta description on mount.
 * Restores the default home title on unmount.
 *
 * @param {string} title       — Full <title> string for this page
 * @param {string} description — Meta description for this page
 * @param {string} [canonical] — Optional canonical URL override
 */
const DEFAULT_TITLE = 'AxeomLabs | Drones, Robotics & Intelligent Systems — India';
const DEFAULT_DESC  = 'AxeomLabs designs and builds autonomous drones, robotics platforms, embedded software, and custom hardware. Founded by Harinandan J V and Abhishek A S, based in India.';

export default function useSEO(title, description, canonical) {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Description
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag && description) descTag.setAttribute('content', description);

    // OG title + description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute('content', description);

    // Twitter title + description
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle && title) twTitle.setAttribute('content', title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && description) twDesc.setAttribute('content', description);

    // Canonical
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.href = canonical;
    }

    // Cleanup: restore defaults when navigating away
    return () => {
      document.title = DEFAULT_TITLE;
      if (descTag) descTag.setAttribute('content', DEFAULT_DESC);
      if (ogTitle)  ogTitle.setAttribute('content', 'AxeomLabs | Drones, Robotics & Intelligent Systems');
      if (ogDesc)   ogDesc.setAttribute('content', DEFAULT_DESC);
      if (twTitle)  twTitle.setAttribute('content', 'AxeomLabs | Drones, Robotics & Intelligent Systems');
      if (twDesc)   twDesc.setAttribute('content', DEFAULT_DESC);
      if (canonicalTag) canonicalTag.href = 'https://www.axeomlabs.in/';
    };
  }, [title, description, canonical]);
}
