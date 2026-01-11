import { motion } from 'framer-motion';

export default function Section({
  id,
  children,
  className = '',
  containerClass = '',
  title,
  subtitle,
  centered = true,
}) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${className}`}
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClass}`}>
        {(title || subtitle) && (
          <motion.div
            className={`mb-12 ${centered ? 'text-center' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
