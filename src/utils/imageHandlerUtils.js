/**
 * Image Handler Utilities
 * Centralized utilities for handling both local and remote image paths
 * Provides validation, optimization, and error handling for image sources
 */

/**
 * Checks if an image source is a remote URL (HTTPS/HTTP)
 * @param {string} src - Image source path or URL
 * @returns {boolean} True if the source is a remote URL
 */
export const isRemoteImage = (src) => {
  if (!src || typeof src !== 'string') return false;
  return /^https?:\/\//.test(src);
};

/**
 * Checks if an image source is a local path
 * @param {string} src - Image source path or URL
 * @returns {boolean} True if the source is a local path
 */
export const isLocalImage = (src) => {
  if (!src || typeof src !== 'string') return false;
  return src.startsWith('/') || src.startsWith('./') || src.startsWith('../');
};

/**
 * Validates if an image source is valid (either remote or local)
 * @param {string} src - Image source to validate
 * @returns {boolean} True if the source is valid
 */
export const isValidImageSource = (src) => {
  if (!src || typeof src !== 'string') return false;
  return isRemoteImage(src) || isLocalImage(src) || src.startsWith('data:');
};

/**
 * Generates an optimized image URL (for future CDN integration)
 * @param {string} src - Original image source
 * @param {number} width - Target width in pixels (optional)
 * @param {number} quality - Image quality 1-100 (optional)
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (src, width = null, quality = 85) => {
  if (!isValidImageSource(src)) return null;

  // For remote URLs, you can add CDN optimization parameters here
  if (isRemoteImage(src)) {
    // Example: Add width and quality params for CDN optimization
    // return `${src}?w=${width || 'auto'}&q=${quality}`;
    return src;
  }

  // For local images, return as-is (local server will serve them)
  return src;
};

/**
 * Gets the appropriate placeholder/fallback for an image
 * @param {string} alt - Alt text for the image
 * @param {object} options - Placeholder options
 * @returns {string} Placeholder URL or fallback
 */
export const getImagePlaceholder = (alt = 'Image', options = {}) => {
  const {
    width = 400,
    height = 300,
    bgColor = '1e40af',
    textColor = 'ffffff',
    text = alt
  } = options;

  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

/**
 * Creates a fallback image URL with customizable options
 * @param {string} alt - Alt text for fallback
 * @param {object} customOptions - Custom placeholder options
 * @returns {string} Fallback image URL
 */
export const getFallbackImage = (alt = 'Image', customOptions = {}) => {
  return getImagePlaceholder(alt, {
    width: 400,
    height: 300,
    bgColor: '1e40af',
    textColor: 'ffffff',
    ...customOptions
  });
};

/**
 * Handles image load errors by returning appropriate fallback
 * @param {Event} event - Image error event
 * @param {string} alt - Alt text for fallback
 * @param {object} fallbackOptions - Options for fallback image
 */
export const handleImageError = (event, alt = 'Image', fallbackOptions = {}) => {
  if (event && event.target) {
    event.target.src = getFallbackImage(alt, fallbackOptions);
  }
};

/**
 * Gets the image type (remote, local, or data URI)
 * @param {string} src - Image source
 * @returns {string} Type: 'remote', 'local', 'data', or 'invalid'
 */
export const getImageType = (src) => {
  if (!src || typeof src !== 'string') return 'invalid';
  if (isRemoteImage(src)) return 'remote';
  if (src.startsWith('data:')) return 'data';
  if (isLocalImage(src)) return 'local';
  return 'invalid';
};

/**
 * Builds image srcset for responsive images (future enhancement)
 * @param {string} src - Base image source
 * @param {array} sizes - Array of size objects with width properties
 * @returns {string} srcset string for responsive images
 */
export const buildImageSrcSet = (src, sizes = []) => {
  if (!isValidImageSource(src) || sizes.length === 0) return src;

  // For local images, srcset would need server-side generation
  if (isLocalImage(src)) {
    // Could implement multiple size versions in the future
    return src;
  }

  // For remote images, add width parameters
  return sizes
    .map(size => `${getOptimizedImageUrl(src, size.width)} ${size.width}w`)
    .join(', ');
};

/**
 * Detects if we're running in a browser environment
 * @returns {boolean} True if in browser
 */
export const isBrowser = () => typeof window !== 'undefined';

/**
 * Gets image dimensions if available (for optimization)
 * @param {string} src - Image source
 * @returns {Promise<{width: number, height: number}>} Image dimensions
 */
export const getImageDimensions = (src) => {
  return new Promise((resolve, reject) => {
    if (!isValidImageSource(src)) {
      reject(new Error('Invalid image source'));
      return;
    }

    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = src;
  });
};

/**
 * Preloads an image for better UX
 * @param {string} src - Image source to preload
 * @returns {Promise<boolean>} Resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve) => {
    if (!isValidImageSource(src)) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

/**
 * Batches multiple image preloads
 * @param {array} sources - Array of image sources to preload
 * @returns {Promise<array>} Results of preload attempts
 */
export const preloadImages = async (sources = []) => {
  if (!Array.isArray(sources)) return [];
  return Promise.all(sources.map(src => preloadImage(src)));
};

export default {
  isRemoteImage,
  isLocalImage,
  isValidImageSource,
  getOptimizedImageUrl,
  getImagePlaceholder,
  getFallbackImage,
  handleImageError,
  getImageType,
  buildImageSrcSet,
  isBrowser,
  getImageDimensions,
  preloadImage,
  preloadImages
};
