import { memo } from 'react';

function getBadgeStyle(variant) {
  switch (variant) {
    case 'primary':
      return {
        background: 'rgba(0, 245, 255, 0.08)',
        border: '1px solid rgba(0, 245, 255, 0.25)',
        color: '#00f5ff',
        fontFamily: "'JetBrains Mono', monospace",
      };
    case 'secondary':
      return {
        background: 'rgba(168, 85, 247, 0.08)',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        color: '#a855f7',
        fontFamily: "'JetBrains Mono', monospace",
      };
    case 'success':
      return {
        background: 'rgba(34, 211, 238, 0.08)',
        border: '1px solid rgba(34, 211, 238, 0.25)',
        color: '#22d3ee',
        fontFamily: "'JetBrains Mono', monospace",
      };
    case 'warning':
      return {
        background: 'rgba(251, 146, 60, 0.08)',
        border: '1px solid rgba(251, 146, 60, 0.25)',
        color: '#fb923c',
        fontFamily: "'JetBrains Mono', monospace",
      };
    case 'danger':
      return {
        background: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid rgba(239, 68, 68, 0.25)',
        color: '#ef4444',
        fontFamily: "'JetBrains Mono', monospace",
      };
    default:
      return {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        color: 'var(--color-text-secondary)',
        fontFamily: "'JetBrains Mono', monospace",
      };
  }
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

const Badge = memo(function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon,
}) {
  const style = getBadgeStyle(variant);

  return (
    <span
      className={`
        inline-flex items-center gap-1
        font-medium rounded-full
        tracking-wide
        transition-all duration-200 cursor-default
        hover:scale-105
        ${sizes[size]}
        ${className}
      `}
      style={{
        ...style,
        letterSpacing: '0.04em',
      }}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
});

export default Badge;
