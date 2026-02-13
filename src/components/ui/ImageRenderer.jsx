import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import {
  isValidImageSource,
  handleImageError,
  getImageType,
  getOptimizedImageUrl,
  getFallbackImage
} from '../../utils/imageHandlerUtils';

/**
 * ImageRenderer - Unified image rendering component
 * Handles both HTTPS/HTTP and local image paths seamlessly
 * 
 * Features:
 * - Automatic detection of image source type (remote/local)
 * - Fallback image generation for both types
 * - Lazy loading with Intersection Observer
 * - Error handling and recovery
 * - Blur-up animation effect
 * - Dark mode support
 * - Accessibility features (ARIA labels, alt text)
 * - Performance optimizations
 * 
 * @component
 * @example
 * // Remote image
 * <ImageRenderer src="https://example.com/image.jpg" alt="Example" />
 * 
 * // Local image
 * <ImageRenderer src="/images/hero/avatar.jpg" alt="Avatar" />
 */
const ImageRenderer = memo(function ImageRenderer({
  src,
  alt = 'Image',
  className = '',
  style = {},
  width,
  height,
  aspectRatio = 'auto',
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  quality = 85,
  animated = true,
  useLazyLoad = true,
  fallbackGradient = 'from-blue-500 to-purple-600',
  fallbackOptions = {},
  onLoad,
  onError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!useLazyLoad);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Validate image source
  const isValid = isValidImageSource(src);
  const imageType = getImageType(src);
  const optimizedSrc = isValid ? getOptimizedImageUrl(src, width, quality) : null;
  const fallbackSrc = getFallbackImage(alt, fallbackOptions);

  // Set up Intersection Observer for lazy loading
  useEffect(() => {
    if (!useLazyLoad || !containerRef.current) {
      setIsInView(true);
      return;
    }

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

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [useLazyLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = (event) => {
    setHasError(true);
    if (event && event.target) {
      event.target.src = fallbackSrc;
    }
    onError?.(event);
  };

  const containerStyle = {
    aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
    ...style
  };

  const imgStyle = {
    objectFit,
    objectPosition,
    width: '100%',
    height: '100%'
  };

  // If source is invalid, show error placeholder
  if (!isValid) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${className}`}
        style={containerStyle}
        role="img"
        aria-label={alt || 'Invalid image'}
      >
        <div className="text-center">
          <span className="text-6xl opacity-20">⚠️</span>
          <p className="text-xs text-slate-400 dark:text-slate-600 mt-2">Invalid image source</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${className}`}
      style={containerStyle}
    >
      {/* Loading/Error placeholder */}
      {(!isLoaded || hasError) && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} ${isLoaded && hasError ? 'opacity-100' : 'opacity-100'}`}
          animate={isLoaded && hasError ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Animated skeleton pulse while loading */}
      {!isLoaded && !hasError && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} animate-pulse`}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Error state icon */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl opacity-40">📷</span>
            <p className="text-xs text-white/60 mt-2">Failed to load</p>
          </div>
        </div>
      )}

      {/* Actual image - only render if in view (for lazy loading) */}
      {isInView && optimizedSrc && (
        <motion.img
          ref={imgRef}
          src={optimizedSrc}
          alt={alt}
          style={imgStyle}
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          initial={animated ? { opacity: 0, scale: 1.05 } : { opacity: 0 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          decoding="async"
          data-image-type={imageType}
          data-optimized={quality < 100}
          {...props}
        />
      )}

      {/* Placeholder text for accessibility */}
      {!isInView && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50 font-bold text-sm">
          {alt}
        </div>
      )}
    </div>
  );
});

ImageRenderer.displayName = 'ImageRenderer';

export default ImageRenderer;
