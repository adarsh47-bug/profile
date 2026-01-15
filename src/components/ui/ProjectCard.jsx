import PropTypes from 'prop-types';
import { FaGithub, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import ImageGallery from './ImageGallery';

/**
 * ProjectCard - A reusable, modular component for displaying project information
 * 
 * Features:
 * - Consistent styling and layout across all pages
 * - Responsive image handling with fallback
 * - Support for multiple display variants (compact, detailed)
 * - Accessibility-focused with proper ARIA labels
 * - Optimized for both light and dark themes
 * 
 * @component
 */
export default function ProjectCard({
  project,
  onClick,
  variant = 'default',
  showFullDescription = false,
  maxTechStackDisplay = 3,
  maxHighlightsDisplay = 2,
  showImageGallery = true
}) {
  const handleCardClick = (e) => {
    if (onClick) {
      onClick(project);
    }
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const renderImage = () => {
    const hasImages = project.images && project.images.length > 0;
    const fallbackImage = project.image;

    return (
      <div
        className="relative h-48 -m-6 mb-4 rounded-t-xl overflow-hidden cursor-pointer group"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCardClick(e);
          }
        }}
        aria-label={`View details for ${project.title}`}
      >
        {fallbackImage ? (
          <img
            src={fallbackImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x300/1e40af/ffffff?text=${encodeURIComponent(project.title)}`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-6xl opacity-30" aria-hidden="true">💻</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="secondary" size="sm">
              View Details
            </Button>
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <Badge variant="warning" className="font-semibold">
              Featured
            </Badge>
          </div>
        )}

        {/* Image Count Indicator */}
        {hasImages && project.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs">
            <span>{project.images.length} images</span>
          </div>
        )}
      </div>
    );
  };

  const renderTechStack = () => {
    if (!project.techStack || project.techStack.length === 0) return null;

    const displayTech = project.techStack.slice(0, maxTechStackDisplay);
    const remainingCount = project.techStack.length - maxTechStackDisplay;

    return (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {displayTech.map((tech) => (
          <Badge key={tech} variant="primary" size="sm">
            {tech}
          </Badge>
        ))}
        {remainingCount > 0 && (
          <Badge variant="default" size="sm">
            +{remainingCount}
          </Badge>
        )}
      </div>
    );
  };

  const renderHighlights = () => {
    if (!project.highlights || project.highlights.length === 0) return null;

    const displayHighlights = project.highlights.slice(0, maxHighlightsDisplay);

    return (
      <div className="mb-4">
        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
          {displayHighlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="text-blue-500 mt-0.5" aria-hidden="true">✓</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderImageGalleryPreview = () => {
    if (!showImageGallery || !project.images || project.images.length <= 1) return null;

    return (
      <div className="mb-4">
        <ImageGallery
          images={project.images}
          onImageClick={handleCardClick}
          maxDisplay={3}
          size="sm"
        />
      </div>
    );
  };

  const renderLinks = () => {
    const hasLinks = project.links && (project.links.github || project.links.live || project.links.demo);
    if (!hasLinks) return null;

    return (
      <div
        className="flex gap-2 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700"
        onClick={handleLinkClick}
      >
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-700 rounded-lg transition-colors"
            aria-label={`View source code for ${project.title}`}
          >
            <FaGithub className="w-4 h-4" aria-hidden="true" /> Code
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label={`View live demo of ${project.title}`}
          >
            <FaExternalLinkAlt className="w-3 h-3" aria-hidden="true" /> Live
          </a>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-700 rounded-lg transition-colors"
            aria-label={`Watch video demo of ${project.title}`}
          >
            <FaPlay className="w-3 h-3" aria-hidden="true" /> Demo
          </a>
        )}
      </div>
    );
  };

  return (
    <Card
      hover
      className="flex flex-col h-full"
      onClick={handleCardClick}
    >
      {/* Project Image */}
      {renderImage()}

      {/* Project Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {project.title}
        </h3>

        <p className={`text-slate-600 dark:text-slate-400 text-sm mb-4 ${showFullDescription ? '' : 'line-clamp-2'}`}>
          {project.description}
        </p>

        {renderTechStack()}
        {renderHighlights()}
        {variant === 'detailed' && renderImageGalleryPreview()}
        {renderLinks()}
      </div>
    </Card>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    techStack: PropTypes.arrayOf(PropTypes.string),
    highlights: PropTypes.arrayOf(PropTypes.string),
    featured: PropTypes.bool,
    links: PropTypes.shape({
      github: PropTypes.string,
      live: PropTypes.string,
      demo: PropTypes.string,
    }),
  }).isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'compact', 'detailed']),
  showFullDescription: PropTypes.bool,
  maxTechStackDisplay: PropTypes.number,
  maxHighlightsDisplay: PropTypes.number,
  showImageGallery: PropTypes.bool,
};

ProjectCard.defaultProps = {
  onClick: null,
  variant: 'default',
  showFullDescription: false,
  maxTechStackDisplay: 4,
  maxHighlightsDisplay: 2,
  showImageGallery: true,
};
