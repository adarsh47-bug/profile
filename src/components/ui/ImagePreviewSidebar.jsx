import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect, memo } from 'react';

const ImagePreviewSidebar = memo(function ImagePreviewSidebar({
  isOpen,
  onClose,
  data
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when data changes to prevent index overflow
  useEffect(() => {
    if (data?.images) {
      const images = data.images || [data.image].filter(Boolean);
      if (currentImageIndex >= images.length) {
        setCurrentImageIndex(0);
      }
    } else {
      setCurrentImageIndex(0);
    }
  }, [data]);

  if (!data) return null;

  const images = data.images || [data.image].filter(Boolean);
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-125 md:w-150 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate pr-4">
                {data.title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Image Section */}
            <div className="relative bg-slate-100 dark:bg-slate-800 aspect-video flex items-center justify-center overflow-hidden">
              {images.length > 0 ? (
                <>
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={images[currentImageIndex]}
                    alt={data.title}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/600x400?text=${encodeURIComponent(data.title || 'Image')}`;
                    }}
                  />

                  {/* Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <FaChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <FaChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {hasMultipleImages && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center text-slate-400 dark:text-slate-600">
                  <span className="text-6xl">📷</span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {hasMultipleImages && (
              <div className="flex gap-2 p-3 overflow-x-auto bg-slate-50 dark:bg-slate-800/50">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index
                      ? 'border-blue-500 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/64x64?text=${index + 1}`;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Content Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Metadata */}
              {data.metadata && data.metadata.length > 0 && (
                <div className="flex flex-wrap gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
                  {data.metadata.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        {Icon && <Icon className="w-4 h-4" />}
                        <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}:</span>
                        <span>{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Category/Type Badge */}
              {(data.category || data.type || data.status) && (
                <div className="flex flex-wrap gap-2">
                  {data.category && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                      {data.category}
                    </span>
                  )}
                  {data.type && (
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                      {data.type}
                    </span>
                  )}
                  {data.status && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${data.status === 'Completed'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                      {data.status}
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              {data.description && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {data.longDescription || data.description}
                  </p>
                </div>
              )}

              {/* Highlights */}
              {data.highlights && data.highlights.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Key Highlights
                  </h4>
                  <ul className="space-y-1">
                    {data.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="text-blue-500 mt-0.5">✦</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {data.techStack && data.techStack.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {data.tags && data.tags.length > 0 && (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Sections */}
              {data.sections && data.sections.length > 0 && (
                <>
                  {data.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {section.title}
                      </h4>
                      {section.items && (
                        <ul className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <span className="text-blue-500 mt-0.5">✦</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </>
              )}

              {/* Date */}
              {data.date && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  📅 {new Date(data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              )}

              {/* Links */}
              {data.links && data.links.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Links
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {/* Support array format (from pages) */}
                    {Array.isArray(data.links) && data.links.map((link, index) => {
                      const LinkIcon = link.icon || FaExternalLinkAlt;
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <LinkIcon className="w-3 h-3" /> {link.label}
                        </a>
                      );
                    })}

                    {/* Support object format (legacy) */}
                    {!Array.isArray(data.links) && (
                      <>
                        {data.links.live && (
                          <a
                            href={data.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            <FaExternalLinkAlt className="w-3 h-3" /> Live Demo
                          </a>
                        )}
                        {data.links.github && (
                          <a
                            href={data.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            View Code
                          </a>
                        )}
                        {data.links.demo && (
                          <a
                            href={data.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Watch Demo
                          </a>
                        )}
                        {data.links.view && (
                          <a
                            href={data.links.view}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            <FaExternalLinkAlt className="w-3 h-3" /> View
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Company/Issuer Info */}
              {(data.company || data.issuer) && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    {data.companyLogo && (
                      <img
                        src={data.companyLogo}
                        alt={data.company || data.issuer}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {data.company || data.issuer}
                      </p>
                      {data.location && (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          📍 {data.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default ImagePreviewSidebar;
