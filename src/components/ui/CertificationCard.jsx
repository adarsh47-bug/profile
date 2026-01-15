import PropTypes from 'prop-types';
import { FaCertificate, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';
import Card from './Card';
import Button from './Button';
import { formatDateShort } from '../../utils/dateUtils';
import { certificationIconMap, getIconComponent } from '../../utils/iconMap';

/**
 * CertificationCard - A reusable component for displaying certification information
 * 
 * Features:
 * - Consistent styling across all pages
 * - Support for credential URLs
 * - Configurable icon display based on issuer
 * - Accessibility-focused with proper ARIA labels
 * - Optimized for both light and dark themes
 * 
 * @component
 */
export default function CertificationCard({
  certification,
  onClick,
  showViewButton = true
}) {
  const Icon = getIconComponent(certification.icon, certificationIconMap, FaCertificate);

  const handleClick = () => {
    if (onClick) {
      onClick(certification);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  const isClickable = Boolean(onClick);

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
      aria-label={isClickable ? `View details for ${certification.title}` : undefined}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="shrink-0 w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">
            {certification.title}
          </h3>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {certification.issuer}
          </p>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
        {certification.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <FaCalendar className="w-3 h-3" aria-hidden="true" />
          <span>
            Issued: <time dateTime={certification.date}>{formatDateShort(certification.date)}</time>
          </span>
        </div>
        {showViewButton && certification.credentialUrl && (
          <div onClick={handleButtonClick}>
            <Button
              variant="ghost"
              size="sm"
              href={certification.credentialUrl}
              external
              icon={FaExternalLinkAlt}
              aria-label={`View credential for ${certification.title}`}
            >
              View
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

CertificationCard.propTypes = {
  certification: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    icon: PropTypes.string,
    credentialUrl: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  showViewButton: PropTypes.bool,
};

CertificationCard.defaultProps = {
  onClick: null,
  showViewButton: true,
};
