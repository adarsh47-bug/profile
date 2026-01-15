import { memo } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data';

/**
 * Logo Component
 * Displays the domain name with styled separators
 * Responsive for all devices
 * @param {string} className - Additional CSS classes
 * @param {boolean} animated - Whether to add animation on hover
 * @param {string} size - Size variant: 'sm', 'md', 'lg'
 */
const Logo = memo(function Logo({ className = '', animated = true, size = 'md' }) {
  const domain = profileData.domain || 'adarshkadam.is-a.dev';
  const parts = domain.split('.');

  // For domains like "adarshkadam.is-a.dev"
  const firstPart = parts[0]; // "adarshkadam"
  const middleParts = parts.slice(1, -1).join('.'); // "is-a"
  const lastPart = parts[parts.length - 1]; // "dev"

  const sizeClasses = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
  };

  const Component = animated ? motion.a : 'a';
  const motionProps = animated ? {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      href="/"
      className={`font-bold text-slate-900 dark:text-white inline-flex items-center flex-wrap ${sizeClasses[size]} ${className}`}
      {...motionProps}
    >
      <span className="truncate max-w-[150px] sm:max-w-none">{firstPart}</span>
      <span className="text-blue-600">.</span>
      <span className="hidden sm:inline">{middleParts}</span>
      <span className="text-blue-600 hidden sm:inline">.</span>
      <span className="text-blue-600 sm:text-slate-900 sm:dark:text-white">{lastPart}</span>
    </Component>
  );
});

export default Logo;
