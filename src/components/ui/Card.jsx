import { memo } from 'react';
import { motion } from 'framer-motion';

const Card = memo(function Card({
  children,
  className = '',
  hover = true,
  padding = 'md',
  glow = false,
  ...props
}) {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      className={`
        glass-card rounded-xl
        ${hover ? 'card-hover' : ''}
        ${glow ? 'neon-glow-cyan' : ''}
        ${paddingSizes[padding]}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export default Card;

export const CardHeader = memo(function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
});

export const CardTitle = memo(function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-xl font-semibold text-gradient-cyan-violet ${className}`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {children}
    </h3>
  );
});

export const CardDescription = memo(function CardDescription({ children, className = '' }) {
  return (
    <p className={`mt-1 ${className}`} style={{ color: 'var(--color-text-secondary)' }}>
      {children}
    </p>
  );
});

export const CardContent = memo(function CardContent({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
});

export const CardFooter = memo(function CardFooter({ children, className = '' }) {
  return (
    <div
      className={`mt-4 pt-4 ${className}`}
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      {children}
    </div>
  );
});
