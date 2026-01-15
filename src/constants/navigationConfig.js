/**
 * Navigation & UI Configuration Constants
 * Centralized navigation items and scroll behavior config
 */

// Navigation items - used in Navbar and Footer
export const NAV_ITEMS = [
  {
    name: 'Home',
    path: '/',
    id: 'home',
    ariaLabel: 'Navigate to home section',
  },
  {
    name: 'About',
    path: '/#about',
    id: 'about',
    ariaLabel: 'Navigate to about section',
  },
  {
    name: 'Skills',
    path: '/#skills',
    id: 'skills',
    ariaLabel: 'Navigate to skills section',
  },
  {
    name: 'Projects',
    path: '/#projects',
    id: 'projects',
    ariaLabel: 'Navigate to projects section',
  },
  {
    name: 'Experience',
    path: '/#experience',
    id: 'experience',
    ariaLabel: 'Navigate to experience section',
  },
  {
    name: 'Achievements',
    path: '/#achievements',
    id: 'achievements',
    ariaLabel: 'Navigate to achievements section',
  },
  {
    name: 'Education',
    path: '/#education',
    id: 'education',
    ariaLabel: 'Navigate to education section',
  },
  {
    name: 'Contact',
    path: '/#contact',
    id: 'contact',
    ariaLabel: 'Navigate to contact section',
  },
];

// Scroll configuration
export const SCROLL_CONFIG = {
  offsetNavbar: 80, // Height of navbar + offset for smooth scroll
  debounceDelay: 50, // Debounce delay for scroll events (ms)
  smoothDuration: 800, // Duration for smooth scroll animation (ms)
};

// Navbar configuration
export const NAVBAR_CONFIG = {
  height: 64, // Height in pixels (md:h-20 = 80px)
  stickyTop: true, // Sticky navbar
  showBorder: true,
  logoSize: 'sm', // Logo component size
};

// Active section indicator configuration
export const ACTIVE_INDICATOR_CONFIG = {
  enabled: true,
  style: 'underline', // 'underline' or 'highlight'
  animationDuration: 0.3, // Framer Motion duration
  color: 'text-blue-600 dark:text-blue-400',
};

// Mobile menu configuration
export const MOBILE_MENU_CONFIG = {
  breakpoint: 768, // md breakpoint where menu collapses
  animationDuration: 0.3,
  overlayBlur: true,
};

export default {
  NAV_ITEMS,
  SCROLL_CONFIG,
  NAVBAR_CONFIG,
  ACTIVE_INDICATOR_CONFIG,
  MOBILE_MENU_CONFIG,
};
