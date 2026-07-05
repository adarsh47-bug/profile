import { memo } from 'react';
import { motion } from 'framer-motion';
import { FOCUS_STYLES } from '../../constants';

const variants = {
  primary: null, // handled via inline style for neon gradient
  secondary: null,
  ghost: null,
  danger: null,
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm min-h-[44px] min-w-[44px]',
  md: 'px-5 py-2.5 text-base min-h-[44px]',
  lg: 'px-7 py-3 text-lg min-h-[48px]',
};

function getVariantStyle(variant) {
  switch (variant) {
    case 'primary':
      return {
        background: 'linear-gradient(135deg, #00c4cc 0%, #7c3aed 50%, #e879f9 100%)',
        color: '#fff',
        border: 'none',
        boxShadow: '0 0 20px rgba(0,245,255,0.3), 0 4px 15px rgba(124,58,237,0.2)',
      };
    case 'secondary':
      return {
        background: 'transparent',
        color: '#00f5ff',
        border: '1px solid rgba(0,245,255,0.4)',
        boxShadow: '0 0 12px rgba(0,245,255,0.1)',
      };
    case 'ghost':
      return {
        background: 'rgba(0,245,255,0.05)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
      };
    case 'danger':
      return {
        background: 'linear-gradient(135deg, #dc2626, #9f1239)',
        color: '#fff',
        border: 'none',
        boxShadow: '0 0 12px rgba(220,38,38,0.3)',
      };
    default:
      return {};
  }
}

const Button = memo(function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  disabled,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  ariaLabel,
  ...props
}) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-lg
    transition-all duration-200
    shimmer-btn
    ${FOCUS_STYLES.outline}
    disabled:opacity-40 disabled:cursor-not-allowed
  `;

  const classes = `${baseClasses} ${sizes[size]} ${className}`;
  const style = getVariantStyle(variant);

  const hoverStyle =
    variant === 'secondary'
      ? {
          background: 'rgba(0,245,255,0.1)',
          boxShadow: '0 0 20px rgba(0,245,255,0.3)',
        }
      : {};

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        style={style}
        aria-label={ariaLabel}
        whileHover={{ scale: 1.04, ...hoverStyle }}
        whileTap={{ scale: 0.96 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      style={style}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {content}
    </motion.button>
  );
});

export default Button;
