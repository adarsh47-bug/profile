import { memo } from 'react';
import { motion } from 'framer-motion';

const Card = memo(function Card({
  children,
  className = '',
  hover = true,
  padding = 'md',
  variant = 'default', // 'default' | 'elevated' | 'red'
  ...props
}) {
  const paddingSizes = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };

  const variantClass = {
    default: 'rb-panel',
    elevated: 'rb-panel-elevated',
    red: 'rb-panel-red',
  }[variant] || 'rb-panel';

  return (
    <motion.div
      className={`${variantClass} ${hover ? 'card-hover' : ''} ${paddingSizes[padding]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export default Card;

export const CardHeader = memo(function CardHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
});

export const CardTitle = memo(function CardTitle({ children, className = '' }) {
  return (
    <h3
      className={`text-xl font-bold ${className}`}
      style={{ fontFamily: "'Fredoka One', sans-serif", color: '#F2F2F2' }}
    >
      {children}
    </h3>
  );
});

export const CardDescription = memo(function CardDescription({ children, className = '' }) {
  return (
    <p className={`mt-1 ${className}`} style={{ color: '#ABABAB', fontFamily: "'Nunito', sans-serif" }}>
      {children}
    </p>
  );
});

export const CardContent = memo(function CardContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
});

export const CardFooter = memo(function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-4 pt-4 ${className}`} style={{ borderTop: '2px solid #3A3A3A' }}>
      {children}
    </div>
  );
});
