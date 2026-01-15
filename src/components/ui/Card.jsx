import { memo } from 'react';
import { motion } from 'framer-motion';

const Card = memo(function Card({
  children,
  className = '',
  hover = true,
  padding = 'md',
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
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        rounded-xl shadow-sm
        ${hover ? 'card-hover' : ''}
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
    <h3 className={`text-xl font-semibold text-slate-900 dark:text-white ${className}`}>
      {children}
    </h3>
  );
});

export const CardDescription = memo(function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-slate-600 dark:text-slate-400 mt-1 ${className}`}>
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
    <div className={`mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 ${className}`}>
      {children}
    </div>
  );
});
