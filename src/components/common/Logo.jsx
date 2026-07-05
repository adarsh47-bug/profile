import { memo } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data';

/**
 * Logo Component – Web3 Neon Edition
 * Neon cyan/violet gradient text with JetBrains Mono for .dev accent
 */
const Logo = memo(function Logo({ className = '', animated = true, size = 'md' }) {
  const domain = profileData.domain || 'adarshkadam.is-a.dev';
  const parts = domain.split('.');
  const firstPart = parts[0];
  const middleParts = parts.slice(1, -1).join('.');
  const lastPart = parts[parts.length - 1];

  const sizeClasses = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
  };

  const Component = animated ? motion.a : 'a';
  const motionProps = animated ? {
    whileHover: { scale: 1.03 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      href="/"
      className={`font-bold inline-flex items-center flex-wrap ${sizeClasses[size]} ${className}`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      {...motionProps}
    >
      {/* First part — neon cyan to violet gradient */}
      <span
        style={{
          background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 8px rgba(0,245,255,0.4))',
          maxWidth: '9rem',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        className="sm:max-w-none"
      >
        {firstPart}
      </span>
      {/* Separator */}
      <span style={{ color: 'rgba(0,245,255,0.5)', fontFamily: "'JetBrains Mono', monospace" }}>.</span>
      {/* Middle part */}
      <span className="hidden sm:inline" style={{ color: 'var(--color-text-secondary)' }}>
        {middleParts}
      </span>
      <span className="text-neon-cyan hidden sm:inline" style={{ color: 'rgba(0,245,255,0.5)', fontFamily: "'JetBrains Mono', monospace" }}>.</span>
      {/* .dev — neon cyan accent */}
      <span
        style={{
          color: '#00f5ff',
          fontFamily: "'JetBrains Mono', monospace",
          textShadow: '0 0 10px rgba(0,245,255,0.6)',
          fontSize: '0.85em',
        }}
      >
        {lastPart}
      </span>
    </Component>
  );
});

export default Logo;
