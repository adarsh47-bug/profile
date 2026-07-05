import { memo } from 'react';
import { motion } from 'framer-motion';

const Section = memo(function Section({
  id,
  children,
  className = '',
  containerClass = '',
  title,
  subtitle,
  centered = true,
  ariaLabel,
  headingLevel = 'h2',
}) {
  const HeadingComponent = headingLevel;

  return (
    <section
      id={id}
      className={`py-16 md:py-24 relative z-10 ${className}`}
      aria-label={ariaLabel}
      aria-labelledby={title ? `${id}-heading` : undefined}
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
              <HeadingComponent
                id={`${id}-heading`}
                className="text-3xl md:text-4xl font-bold mb-4 section-title-underline inline-block text-gradient"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {title}
              </HeadingComponent>
            )}
            {subtitle && (
              <p
                className="text-lg max-w-2xl mx-auto mt-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
});

export default Section;
