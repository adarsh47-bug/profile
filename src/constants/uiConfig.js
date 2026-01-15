/**
 * UI Configuration Constants
 * Centralized styling and spacing configurations used across components
 */

// Animation durations (in seconds)
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  veraslow: 1.0,
};

// Animation transitions
export const ANIMATION_TRANSITIONS = {
  easeOut: 'easeOut',
  easeInOut: 'easeInOut',
  easeIn: 'easeIn',
  circ: 'circ',
};

// Animation variants
export const STAGGER_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
};

// Color tokens
export const COLORS = {
  primary: '#3b82f6',
  primaryDark: '#2563eb',
  secondary: '#8b5cf6',
  accent: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Spacing scale
export const SPACING = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem',  // 48px
  '4xl': '4rem',  // 64px
};

// Border radius
export const RADIUS = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
};

// Shadow scales
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

// Z-index scale
export const Z_INDEX = {
  auto: 'auto',
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  navbar: 50,
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  lineHeight: 1.6,
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

// Component sizes
export const COMPONENT_SIZES = {
  button: {
    sm: { px: 'px-3', py: 'py-1.5', text: 'text-sm' },
    md: { px: 'px-5', py: 'py-2.5', text: 'text-base' },
    lg: { px: 'px-7', py: 'py-3', text: 'text-lg' },
  },
  badge: {
    sm: { px: 'px-2', py: 'py-0.5', text: 'text-xs' },
    md: { px: 'px-2.5', py: 'py-1', text: 'text-sm' },
    lg: { px: 'px-3', py: 'py-1.5', text: 'text-base' },
  },
  card: {
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
};

// Common transitions
export const TRANSITIONS = {
  fast: 'transition-all duration-200',
  normal: 'transition-all duration-300',
  slow: 'transition-all duration-500',
};

export default {
  ANIMATION_DURATION,
  ANIMATION_TRANSITIONS,
  STAGGER_ANIMATIONS,
  COLORS,
  BREAKPOINTS,
  SPACING,
  RADIUS,
  SHADOWS,
  Z_INDEX,
  TYPOGRAPHY,
  COMPONENT_SIZES,
  TRANSITIONS,
};
