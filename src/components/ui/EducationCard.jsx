import PropTypes from 'prop-types';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendar, FaTrophy } from 'react-icons/fa';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import ImageGallery from './ImageGallery';

/**
 * Utility function to format date strings
 */
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Utility function to calculate duration between two dates
 */
function calculateDuration(startDate, endDate) {
  if (!startDate) return '';

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  const totalMonths = years * 12 + months;

  if (totalMonths < 1) return '< 1 month';
  if (totalMonths < 12) return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;

  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;

  let result = `${displayYears} year${displayYears > 1 ? 's' : ''}`;
  if (displayMonths > 0) {
    result += ` ${displayMonths} month${displayMonths > 1 ? 's' : ''}`;
  }

  return result;
}

/**
 * EducationCard - A reusable, modular component for displaying education information
 * 
 * Features:
 * - Consistent styling and layout across all pages
 * - Responsive design with timeline support
 * - Support for multiple display variants (default, compact, detailed)
 * - Accessibility-focused with proper ARIA labels
 * - Optimized for both light and dark themes
 * - Image gallery support for certificates and achievements
 * 
 * @component
 */
export default function EducationCard({
  education,
  onClick,
  variant = 'default',
  showFullDescription = false,
  maxAchievementsDisplay = 3,
  showImageGallery = true,
  showTimeline = false,
  timelinePosition = 'left',
  index = 0
}) {
  const handleCardClick = (e) => {
    if (onClick) {
      onClick(education);
    }
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const isEven = index % 2 === 0;

  const renderHeader = () => (
    <div className="flex items-start gap-4 mb-4">
      <div className="shrink-0 w-16 h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
        <FaGraduationCap className="w-8 h-8 text-white" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          {education.degree}
          {education.field && ` in ${education.field}`}
        </h3>
        <p className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
          {education.institution}
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="w-3 h-3" aria-hidden="true" />
            {education.location}
          </span>
          {education.startDate && (
            <span className="flex items-center gap-1">
              <FaCalendar className="w-3 h-3" aria-hidden="true" />
              {formatDate(education.startDate)} - {education.current ? 'Present' : formatDate(education.endDate)}
            </span>
          )}
          {education.startDate && (
            <span className="text-slate-500 dark:text-slate-500">
              ({calculateDuration(education.startDate, education.endDate)})
            </span>
          )}
        </div>
      </div>
      {education.current && (
        <Badge variant="success" className={variant === 'compact' ? '' : 'animate-pulse'}>
          Pursuing
        </Badge>
      )}
    </div>
  );

  const renderDescription = () => {
    if (!education.description) return null;

    return (
      <p className={`text-slate-600 dark:text-slate-400 mb-4 leading-relaxed ${showFullDescription ? '' : 'line-clamp-3'}`}>
        {education.description}
      </p>
    );
  };

  const renderGrade = () => {
    if (!education.grade) return null;

    return (
      <div className="mb-4">
        <Badge variant="primary">
          Grade: {education.grade}
        </Badge>
      </div>
    );
  };

  const renderAchievements = () => {
    if (!education.achievements || education.achievements.length === 0) return null;

    const displayAchievements = variant === 'compact'
      ? education.achievements.slice(0, maxAchievementsDisplay)
      : education.achievements;
    const remainingCount = education.achievements.length - maxAchievementsDisplay;

    return (
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-3">
          <FaTrophy className="w-4 h-4 text-yellow-500" aria-hidden="true" />
          Key Achievements
        </h4>
        <ul className="space-y-2">
          {displayAchievements.map((achievement, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
            >
              <span className="text-green-500 mt-1" aria-hidden="true">✓</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
        {variant === 'compact' && remainingCount > 0 && (
          <button
            onClick={handleCardClick}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
          >
            +{remainingCount} more achievement{remainingCount > 1 ? 's' : ''}
          </button>
        )}
      </div>
    );
  };

  const renderImageGallery = () => {
    if (!showImageGallery || !education.images || education.images.length === 0) return null;

    return (
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <ImageGallery
          images={education.images}
          onImageClick={onClick ? () => handleCardClick() : undefined}
          maxDisplay={variant === 'compact' ? 3 : 4}
          size="sm"
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
      {variant === 'detailed' && education.featured && (
        <div className="absolute top-4 right-4">
          <Badge variant="warning" className="font-semibold">
            Featured
          </Badge>
        </div>
      )}

      {renderHeader()}
      {renderDescription()}
      {renderGrade()}
      {renderAchievements()}
      {renderImageGallery()}
    </Card>
  );

  // Wrap with timeline if enabled
  if (showTimeline) {
    return (
      <div className={`relative mb-12 ${isEven && timelinePosition === 'center' ? 'md:pr-1/2' : ''} ${!isEven && timelinePosition === 'center' ? 'md:pl-1/2 md:ml-auto' : ''}`}>
        {/* Timeline Dot */}
        <div className={`absolute ${timelinePosition === 'center' ? 'left-8 md:left-1/2' : 'left-8'} w-5 h-5 bg-green-600 rounded-full border-4 border-white dark:border-slate-900 -translate-x-1/2 z-10 top-8`}>
          {education.current && (
            <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-75" />
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

EducationCard.propTypes = {
  education: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    degree: PropTypes.string.isRequired,
    field: PropTypes.string,
    institution: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    current: PropTypes.bool,
    description: PropTypes.string,
    grade: PropTypes.string,
    achievements: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string),
    featured: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'compact', 'detailed']),
  showFullDescription: PropTypes.bool,
  maxAchievementsDisplay: PropTypes.number,
  showImageGallery: PropTypes.bool,
  showTimeline: PropTypes.bool,
  timelinePosition: PropTypes.oneOf(['left', 'center']),
  index: PropTypes.number,
};

EducationCard.defaultProps = {
  onClick: null,
  variant: 'default',
  showFullDescription: false,
  maxAchievementsDisplay: 3,
  showImageGallery: true,
  showTimeline: false,
  timelinePosition: 'left',
  index: 0,
};
