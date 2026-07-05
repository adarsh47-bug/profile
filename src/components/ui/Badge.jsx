import { memo } from 'react';

const variantClass = {
  default:   'rb-badge rb-badge-grey',
  primary:   'rb-badge rb-badge-red',
  secondary: 'rb-badge rb-badge-blue',
  success:   'rb-badge rb-badge-green',
  warning:   'rb-badge rb-badge-gold',
  danger:    'rb-badge rb-badge-red',
  purple:    'rb-badge rb-badge-purple',
};

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
  lg: 'text-sm px-3 py-1.5',
};

const Badge = memo(function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon,
}) {
  return (
    <span className={`${variantClass[variant] || variantClass.default} ${sizes[size]} ${className}`}>
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
      {children}
    </span>
  );
});

export default Badge;
