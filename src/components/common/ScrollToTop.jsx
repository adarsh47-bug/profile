import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SCROLL_CONFIG } from '../../constants';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (hash) {
        // Scroll to section if hash exists, accounting for navbar offset
        const element = document.querySelector(hash);
        if (element) {
          const targetPosition = element.offsetTop - SCROLL_CONFIG.offsetNavbar;
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });
        }
      } else {
        // Scroll to top if no hash
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
