import { memo } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data';

const Logo = memo(function Logo({ className = '', animated = true, size = 'md' }) {
  const domain = profileData.domain || 'adarshkadam.is-a.dev';
  const [first, ...rest] = domain.split('.');
  const tld = rest[rest.length - 1];

  const sizeMap = { sm: '1.2rem', md: '1.4rem', lg: '1.8rem' };
  const Component = animated ? motion.a : 'a';
  const motionProps = animated ? { whileHover: { scale: 1.03 }, transition: { duration: 0.15 } } : {};

  return (
    <Component
      href="/"
      className={`inline-flex items-center gap-0 font-bold no-underline ${className}`}
      style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: sizeMap[size], letterSpacing: '0.02em', textDecoration: 'none' }}
      {...motionProps}
    >
      {/* Name part */}
      <span style={{ color: '#F2F2F2' }}>{first}</span>
      {/* Red dot separator */}
      <span style={{ color: '#E8192C' }}>.</span>
      {/* Middle parts */}
      <span className="hidden sm:inline" style={{ color: '#ABABAB', fontSize: '0.85em' }}>
        {rest.slice(0, -1).join('.')}
      </span>
      <span className="hidden sm:inline" style={{ color: '#E8192C' }}>.</span>
      {/* TLD accent */}
      <span style={{
        color: '#F2F2F2',
        background: '#E8192C',
        padding: '0 6px 1px',
        borderRadius: 4,
        fontSize: '0.75em',
        marginLeft: 1,
      }}>
        {tld}
      </span>
    </Component>
  );
});

export default Logo;
