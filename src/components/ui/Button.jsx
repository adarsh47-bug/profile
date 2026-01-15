import { memo } from 'react';
import { motion } from 'framer-motion';
import { FOCUS_STYLES } from '../../constants';

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900',
  ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm min-h-[44px] min-w-[44px]', // WCAG touch target
  md: 'px-5 py-2.5 text-base min-h-[44px]', // WCAG touch target
  lg: 'px-7 py-3 text-lg min-h-[48px]', // WCAG touch target
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
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg
    transition-all duration-200
    ${FOCUS_STYLES.outline}
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

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
        aria-label={ariaLabel}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
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
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
});

export default Button;
