import PropTypes from 'prop-types';
import { FaBriefcase, FaMapMarkerAlt, FaCalendar, FaClock } from 'react-icons/fa';
import Card from './Card';
import Badge from './Badge';
import MiniGallery from './ImageGallery';

/**
 * Utility function to format date strings
 */
function formatDate(dateString) {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Utility function to calculate duration between two dates
 */
function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();

  if (months < 1) return '< 1 month';
  if (months < 12) return `${months} month${months > 1 ? 's' : ''}`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
  return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo`;
}

/**
 * ExperienceCard - A reusable, modular component for displaying work experience
 * 
 * Features:
 * - Consistent styling and layout across all pages
 * - Responsive design with timeline support
 * - Support for multiple display variants (default, compact, detailed)
 * - Accessibility-focused with proper ARIA labels
 * - Optimized for both light and dark themes
 * - Image gallery support for work samples and achievements
 * 
 * @component
 */
export default function ExperienceCard({
  experience,
  onClick,
  variant = 'default',
  showFullDescription = false,
  maxResponsibilitiesDisplay = 3,
  maxTechnologiesDisplay = 5,
  showImageGallery = true,
  showTimeline = false,
  timelinePosition = 'left',
  index = 0
}) {
  const handleCardClick = (e) => {
    if (onClick) {
      onClick(experience);
    }
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const isEven = index % 2 === 0;

  const renderHeader = () => (
    <div className="flex items-start gap-4 mb-4">
      {experience.companyLogo && (
        <div className="shrink-0">
          <img
            src={experience.companyLogo}
            alt={experience.company}
            className="w-16 h-16 rounded-lg object-cover border border-slate-200 dark:border-slate-600"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          {experience.title}
        </h3>
        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
          {experience.company}
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="w-3 h-3" aria-hidden="true" />
            {experience.location}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendar className="w-3 h-3" aria-hidden="true" />
            {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
          </span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-500">
            <FaClock className="w-3 h-3" aria-hidden="true" />
            {calculateDuration(experience.startDate, experience.endDate)}
          </span>
        </div>
      </div>
      {experience.current && (
        <Badge variant="success" className={variant === 'compact' ? '' : 'animate-pulse'}>
          Current
        </Badge>
      )}
      {!experience.current && experience.type && (
        <Badge variant="default">
          {experience.type}
        </Badge>
      )}
    </div>
  );

  const renderDescription = () => {
    if (!experience.description) return null;

    return (
      <p className={`text-slate-600 dark:text-slate-400 mb-4 leading-relaxed ${showFullDescription ? '' : 'line-clamp-3'}`}>
        {experience.description}
      </p>
    );
  };

  const renderResponsibilities = () => {
    if (!experience.responsibilities || experience.responsibilities.length === 0) return null;

    const displayResponsibilities = variant === 'compact'
      ? experience.responsibilities.slice(0, maxResponsibilitiesDisplay)
      : experience.responsibilities;
    const remainingCount = experience.responsibilities.length - maxResponsibilitiesDisplay;

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">
          Key Responsibilities
        </h4>
        <ul className="space-y-2">
          {displayResponsibilities.map((resp, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
            >
              <span className="text-blue-500 mt-1" aria-hidden="true">•</span>
              <span>{resp}</span>
            </li>
          ))}
        </ul>
        {variant === 'compact' && remainingCount > 0 && (
          <button
            onClick={handleCardClick}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
          >
            +{remainingCount} more responsibilit{remainingCount > 1 ? 'ies' : 'y'}
          </button>
        )}
      </div>
    );
  };

  const renderTechnologies = () => {
    if (!experience.technologies || experience.technologies.length === 0) return null;

    const displayTech = experience.technologies.slice(0, maxTechnologiesDisplay);
    const remainingCount = experience.technologies.length - maxTechnologiesDisplay;

    return (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {displayTech.map((tech) => (
          <Badge key={tech} variant="default" size="sm">
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
    if (!experience.highlights || experience.highlights.length === 0) return null;

    return (
      <div className="mb-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">
          Highlights & Achievements
        </h4>
        <ul className="space-y-2">
          {experience.highlights.map((highlight, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
            >
              <span className="text-blue-500 mt-1" aria-hidden="true">✓</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderImageGallery = () => {
    if (!showImageGallery || !experience.images || experience.images.length === 0) return null;

    return (
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <MiniGallery
          images={experience.images}
          maxVisible={variant === 'compact' ? 3 : 4}
          onExpand={onClick ? () => handleCardClick() : undefined}
        />
      </div>
    );
  };

  const cardContent = (
    <Card
      hover={!!onClick}
      className={`flex flex-col h-full ${onClick ? 'cursor-pointer' : ''} relative`}
      onClick={onClick ? handleCardClick : undefined}
    >
      {/* Featured Badge for detailed variant */}
      {variant === 'detailed' && experience.featured && (
        <div className="absolute top-4 right-4">
          <Badge variant="warning" className="font-semibold">
            Featured
          </Badge>
        </div>
      )}

      {renderHeader()}
      {renderDescription()}
      {renderResponsibilities()}
      {renderTechnologies()}
      {variant === 'detailed' && renderHighlights()}
      {renderImageGallery()}
    </Card>
  );

  // Wrap with timeline if enabled
  if (showTimeline) {
    return (
      <div className={`relative mb-12 ${isEven && timelinePosition === 'center' ? 'md:pr-1/2' : ''} ${!isEven && timelinePosition === 'center' ? 'md:pl-1/2 md:ml-auto' : ''}`}>
        {/* Timeline Dot */}
        <div className={`absolute ${timelinePosition === 'center' ? 'left-8 md:left-1/2' : 'left-8'} w-5 h-5 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 -translate-x-1/2 z-10 top-8`}>
          {experience.current && (
            <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75" />
          )}
        </div>

        <div className={`ml-16 md:ml-0 ${isEven && timelinePosition === 'center' ? 'md:mr-16' : ''} ${!isEven && timelinePosition === 'center' ? 'md:ml-16' : ''} ${timelinePosition === 'left' ? 'md:ml-16' : ''}`}>
          {cardContent}
        </div>
      </div>
    );
  }

  return cardContent;
}

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    companyLogo: PropTypes.string,
    location: PropTypes.string.isRequired,
    type: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    current: PropTypes.bool,
    description: PropTypes.string,
    responsibilities: PropTypes.arrayOf(PropTypes.string),
    technologies: PropTypes.arrayOf(PropTypes.string),
    highlights: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string),
    featured: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'compact', 'detailed']),
  showFullDescription: PropTypes.bool,
  maxResponsibilitiesDisplay: PropTypes.number,
  maxTechnologiesDisplay: PropTypes.number,
  showImageGallery: PropTypes.bool,
  showTimeline: PropTypes.bool,
  timelinePosition: PropTypes.oneOf(['left', 'center']),
  index: PropTypes.number,
};

ExperienceCard.defaultProps = {
  onClick: null,
  variant: 'default',
  showFullDescription: false,
  maxResponsibilitiesDisplay: 3,
  maxTechnologiesDisplay: 5,
  showImageGallery: true,
  showTimeline: false,
  timelinePosition: 'left',
  index: 0,
};
