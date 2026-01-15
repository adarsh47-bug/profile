import { memo } from 'react';
import { SKIP_NAV_CONFIG } from '../../constants/accessibilityConfig';

/**
 * Skip Navigation Link
 * Allows keyboard users to skip to main content
 * Visible only when focused (with Tab key)
 * WCAG 2.1 Level A requirement
 */
const SkipNavigation = memo(function SkipNavigation() {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(SKIP_NAV_CONFIG.href);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={SKIP_NAV_CONFIG.href}
      onClick={handleClick}
      className={SKIP_NAV_CONFIG.className}
    >
      {SKIP_NAV_CONFIG.text}
    </a>
  );
});

export default SkipNavigation;
