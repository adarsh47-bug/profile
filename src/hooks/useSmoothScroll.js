import { useCallback } from 'react';

/**
 * Hook for smooth scrolling to elements
 * Optimized with requestAnimationFrame for best performance
 * Handles scroll offset for fixed headers
 * @param {number} offset - Scroll offset (e.g., navbar height)
 * @returns {Function} smoothScroll function
 */
export const useSmoothScroll = (offset = 80) => {
  const smoothScroll = useCallback((elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const targetPosition = element.offsetTop - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800; // milliseconds
    let start = null;

    // Use native smooth scrolling if available for instant response
    if (window.CSS && window.CSS.supports('scroll-behavior', 'smooth')) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      return;
    }

    // Fallback to custom easing function (easeInOutCubic)
    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeInOutCubic
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, [offset]);

  return smoothScroll;
};

export default useSmoothScroll;
