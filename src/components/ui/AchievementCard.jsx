import PropTypes from 'prop-types';
import { FaTrophy, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';
import Card from './Card';
import Badge from './Badge';
import ImageGallery from './ImageGallery';
import { formatDateShort } from '../../utils/dateUtils';
import { achievementIconMap, getIconComponent } from '../../utils/iconMap';

/**
 * AchievementCard - A reusable component for displaying achievement information
 * 
 * Features:
 * - Consistent styling across all pages
 * - Support for single or multiple images
 * - Configurable icon display
 * - Accessibility-focused with proper ARIA labels
 * - Optimized for both light and dark themes
 * 
 * @component
 */
export default function AchievementCard({
  achievement,
  onClick,
  showCategory = true,
  showImages = true,
  maxImagesDisplay = 3
}) {
  const Icon = getIconComponent(achievement.icon, achievementIconMap, FaTrophy);

  const handleClick = () => {
    if (onClick) {
      onClick(achievement);
    }
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const hasImages = achievement.images && achievement.images.length > 0;
  const hasSingleImage = achievement.image && !hasImages;
  const isClickable = onClick && (hasImages || hasSingleImage);

  return (
    <Card
      hover={isClickable}
      className={isClickable ? 'cursor-pointer' : ''}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      } : undefined}
      aria-label={isClickable ? `View details for ${achievement.title}` : undefined}
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Achievement Image or Icon */}
        {hasSingleImage ? (
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-600">
            <img
              src={achievement.image}
              alt={achievement.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                const iconContainer = e.target.parentElement;
                iconContainer.classList.add('bg-gradient-to-br', 'from-yellow-400', 'to-orange-500', 'flex', 'items-center', 'justify-center');
                const iconElement = document.createElement('div');
                iconElement.className = 'text-white text-2xl';
                iconElement.innerHTML = '🏆';
                iconContainer.appendChild(iconElement);
              }}
            />
            {hasImages && achievement.images.length > 1 && (
              <div className="absolute bottom-0 right-0 px-1 bg-black/70 text-white text-xs rounded-tl">
                +{achievement.images.length - 1}
              </div>
            )}
          </div>
        ) : (
          <div className="shrink-0 w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
              {achievement.title}
            </h3>
            {achievement.link && achievement.link.trim() && (
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 shrink-0 transition-colors"
                onClick={handleLinkClick}
                aria-label={`External link for ${achievement.title}`}
              >
                <FaExternalLinkAlt className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <FaCalendar className="w-3 h-3" aria-hidden="true" />
            <time dateTime={achievement.date}>{formatDateShort(achievement.date)}</time>
          </div>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
        {achievement.description}
      </p>

      {showCategory && achievement.category && (
        <div className="mb-4">
          <Badge variant="primary" size="sm">
            {achievement.category}
          </Badge>
        </div>
      )}

      {showImages && hasImages && (
        <div className="mt-4">
          <ImageGallery
            images={achievement.images}
            maxDisplay={maxImagesDisplay}
            size="sm"
          />
        </div>
      )}
    </Card>
  );
}

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string,
    icon: PropTypes.string,
    image: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  showCategory: PropTypes.bool,
  showImages: PropTypes.bool,
  maxImagesDisplay: PropTypes.number,
};

AchievementCard.defaultProps = {
  onClick: null,
  showCategory: true,
  showImages: true,
  maxImagesDisplay: 3,
};
