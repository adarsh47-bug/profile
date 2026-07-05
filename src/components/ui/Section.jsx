import { memo } from 'react';
import { motion } from 'framer-motion';

const Section = memo(function Section({
  id,
  children,
  className = '',
  containerClass = '',
  title,
  subtitle,
  label,            // pixel-font label above title (e.g. "GAME BROWSER")
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
        {(title || subtitle || label) && (
          <motion.div
            className={`mb-12 ${centered ? 'text-center' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Pixel label */}
            {label && (
              <span className="rb-section-label">{label}</span>
            )}

            {/* Main title */}
            {title && (
              <HeadingComponent
                id={`${id}-heading`}
                className="rb-section-title text-3xl md:text-4xl mb-3"
              >
                {title}
              </HeadingComponent>
            )}

            {/* Red divider bar */}
            {title && (
              <div className={`rb-section-divider ${centered ? 'mx-auto' : ''}`} />
            )}

            {/* Subtitle */}
            {subtitle && (
              <p
                className="text-base max-w-2xl mt-4"
                style={{ color: '#ABABAB', fontFamily: "'Nunito', sans-serif", ...(centered ? { margin: '1rem auto 0' } : {}) }}
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
