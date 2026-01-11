import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExpand, FaImages } from 'react-icons/fa';

export default function ImageGallery({
  images = [],
  onImageClick,
  className = '',
  maxDisplay = 4,
  size = 'md'
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, maxDisplay);
  const remainingCount = images.length - maxDisplay;

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {displayImages.map((image, index) => (
        <motion.button
          key={index}
          onClick={() => onImageClick && onImageClick(images, index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden border-2 border-white dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow cursor-pointer group`}
          whileHover={{ scale: 1.1, zIndex: 10 }}
          style={{ marginLeft: index > 0 ? '-8px' : 0 }}
        >
          <img
            src={typeof image === 'string' ? image : image.src}
            alt={typeof image === 'string' ? `Image ${index + 1}` : image.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/64/3b82f6/ffffff?text=${index + 1}`;
            }}
          />

          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
            <FaExpand className="w-4 h-4 text-white" />
          </div>
        </motion.button>
      ))}

      {/* Remaining count indicator */}
      {remainingCount > 0 && (
        <motion.button
          onClick={() => onImageClick && onImageClick(images, maxDisplay)}
          className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden border-2 border-white dark:border-slate-700 shadow-md bg-slate-200 dark:bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors`}
          style={{ marginLeft: '-8px' }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
            +{remainingCount}
          </span>
        </motion.button>
      )}
    </div>
  );
}

// Mini gallery for cards
export function MiniGallery({ images = [], onClick, className = '' }) {
  if (!images || images.length === 0) return null;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors ${className}`}
    >
      <FaImages className="w-3.5 h-3.5" />
      <span>{images.length} photo{images.length > 1 ? 's' : ''}</span>
    </button>
  );
}
