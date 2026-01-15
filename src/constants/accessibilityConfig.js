/**
 * Accessibility (a11y) Utilities and Constants
 * Follows WCAG 2.1 Level AA guidelines
 */

// Focus management utilities
export const FOCUS_STYLES = {
  outline: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900',
  ring: 'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
  underline: 'focus-visible:underline focus-visible:outline-none',
};

// Keyboard navigation
export const KEYBOARD_KEYS = {
  enter: 'Enter',
  space: ' ',
  escape: 'Escape',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
  tab: 'Tab',
};

// ARIA labels for common interactive elements
export const ARIA_LABELS = {
  menu: 'Open navigation menu',
  closeMenu: 'Close navigation menu',
  themToggle: (isDark) => isDark ? 'Switch to light mode' : 'Switch to dark mode',
  submit: 'Submit form',
  scrollTop: 'Scroll to top',
  externalLink: 'Opens in a new tab',
  currentPage: 'Current page',
};

// Skip navigation link for keyboard users
export const SKIP_NAV_CONFIG = {
  text: 'Skip to main content',
  href: '#main-content',
  className: 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2',
};

// Screen reader only utility
export const SR_ONLY = 'sr-only';

// Semantic HTML headings hierarchy
export const HEADING_LEVELS = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

// Color contrast ratios (WCAG 2.1)
export const MIN_CONTRAST_RATIO = {
  normalText: 4.5, // For 18px or larger text
  largeText: 3, // For 24px or larger text
  UIComponents: 3,
};

// Touch target size recommendations
export const MIN_TOUCH_TARGET = {
  size: 44, // pixels, minimum recommended size
  padding: 8, // pixels, minimum padding around target
};

export default {
  FOCUS_STYLES,
  KEYBOARD_KEYS,
  ARIA_LABELS,
  SKIP_NAV_CONFIG,
  SR_ONLY,
  HEADING_LEVELS,
  MIN_CONTRAST_RATIO,
  MIN_TOUCH_TARGET,
};
