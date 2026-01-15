import { useState, useEffect } from 'react';

/**
 * Hook to track active section based on scroll position
 * Returns the active section ID as user scrolls through the page
 * Uses viewport-based detection for reliable section tracking
 * @param {number} offset - Offset from top (for fixed navbar height)
 * @returns {string} Current active section ID
 */
export const useActiveSection = (offset = 80) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Fallback method: scroll listener
    const handleScroll = () => {
      const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'education', 'contact'];

      let currentSection = 'home';
      let closestDistance = Infinity;

      // Find section closest to the top of viewport
      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const element = document.getElementById(id);

        if (element) {
          // Get element bounds relative to viewport
          const rect = element.getBoundingClientRect();

          // Calculate distance from top of viewport
          // Negative means above viewport, positive means below
          const distance = Math.abs(rect.top - (window.innerHeight / 3));

          // If element is in viewport (or slightly above), consider it
          if (rect.top <= window.innerHeight - 100 && rect.bottom > 100) {
            if (distance < closestDistance) {
              closestDistance = distance;
              currentSection = id;
            }
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Add scroll listener with debouncing
    let timeoutId;
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    // Set initial state immediately
    handleScroll();

    window.addEventListener('scroll', debouncedScroll, false);
    window.addEventListener('resize', debouncedScroll, false);

    return () => {
      window.removeEventListener('scroll', debouncedScroll, false);
      window.removeEventListener('resize', debouncedScroll, false);
      clearTimeout(timeoutId);
    };
  }, []);

  return activeSection;
};

export default useActiveSection;
