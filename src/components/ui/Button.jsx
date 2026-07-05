import { memo } from 'react';
import { motion } from 'framer-motion';
import { FOCUS_STYLES } from '../../constants';

function getVariantClass(variant) {
  switch (variant) {
    case 'primary':   return 'rb-btn rb-btn-primary';
    case 'secondary': return 'rb-btn rb-btn-secondary';
    case 'ghost':     return 'rb-btn rb-btn-secondary';
    case 'danger':    return 'rb-btn rb-btn-primary';
    case 'green':     return 'rb-btn rb-btn-green';
    default:          return 'rb-btn rb-btn-primary';
  }
}

const sizes = {
  sm: 'px-4 py-2 text-sm min-h-[40px]',
  md: 'px-6 py-2.5 text-base min-h-[44px]',
  lg: 'px-8 py-3 text-lg min-h-[48px]',
};

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
  const classes = `${getVariantClass(variant)} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        aria-label={ariaLabel}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98, y: 3 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, y: 3 }}
      {...props}
    >
      {content}
    </motion.button>
  );
});

export default Button;
