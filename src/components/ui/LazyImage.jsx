import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Lazy-loaded image component with blur-up effect
 * Optimized for performance with Intersection Observer
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  aspectRatio = '16/9',
  fallbackGradient = 'from-blue-500 to-purple-600',
  onLoad,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Fallback gradient or placeholder */}
      {!isLoaded && !hasError && (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} animate-pulse`} />
      )}

      {/* Error state */}
      {hasError && (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} flex items-center justify-center`}>
          <span className="text-white text-6xl font-bold opacity-20">
            {alt?.[0] || '?'}
          </span>
        </div>
      )}

      {/* Actual image */}
      {isInView && src && (
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
}

/**
 * Responsive image component that serves different sizes based on viewport
 */
export function ResponsiveImage({
  src,
  alt,
  sizes = {
    mobile: 'sm',
    tablet: 'md',
    desktop: 'lg'
  },
  className = '',
  ...props
}) {
  // In production, you'd generate these URLs with a CDN or image optimization service
  const getSrcSet = () => {
    if (!src) return '';

    // For now, just use the original image
    // In production: return `${src}?w=400 400w, ${src}?w=800 800w, ${src}?w=1200 1200w`
    return src;
  };

  return (
    <LazyImage
      src={src}
      srcSet={getSrcSet()}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      alt={alt}
      className={className}
      {...props}
    />
  );
}

/**
 * Image gallery grid with lazy loading
 */
export function LazyImageGrid({ images = [], columns = 3, gap = 4, className = '' }) {
  return (
    <div
      className={`grid gap-${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {images.map((image, index) => (
        <LazyImage
          key={index}
          src={image.src || image}
          alt={image.alt || `Gallery image ${index + 1}`}
          aspectRatio={image.aspectRatio || '1/1'}
          className="rounded-lg"
        />
      ))}
    </div>
  );
}
