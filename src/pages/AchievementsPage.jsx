import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaCertificate, FaExternalLinkAlt, FaArrowLeft, FaCalendar, FaTag, FaUsers } from 'react-icons/fa';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import ImagePreviewSidebar from '../components/ui/ImagePreviewSidebar';
import AchievementCard from '../components/ui/AchievementCard';
import CertificationCard from '../components/ui/CertificationCard';
import { useImagePreview } from '../hooks/usePreview';
import achievementsData from '../data/achievements.json';
import activitiesData from '../data/activities.json';
import certificationsData from '../data/certifications.json';
import { formatDateShort } from '../utils/dateUtils';

export default function AchievementsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('achievements');
  const { previewData, isOpen, openPreview, closePreview } = useImagePreview();

  const sortedAchievements = [...achievementsData.achievements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const sortedCertifications = [...certificationsData.certifications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const sortedActivities = [...activitiesData.activities].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleItemClick = (item, type) => {
    openPreview({
      title: item.title,
      description: item.description,
      images: item.images || (item.image ? [item.image] : []),
      metadata: [
        { label: 'Date', value: formatDateShort(item.date), icon: FaCalendar },
        type === 'achievement' && item.category
          ? { label: 'Category', value: item.category, icon: FaTag }
          : { label: 'Issuer', value: item.issuer },
      ].filter(Boolean),
      links: item.link || item.credentialUrl
        ? [{
          label: type === 'achievement' ? 'View Achievement' : 'View Credential',
          url: item.link || item.credentialUrl,
          icon: FaExternalLinkAlt
        }]
        : []
    });
  };

  return (
    <>
      <Section
        title="Achievements & Certifications"
        subtitle="Recognition, awards, and professional certifications earned throughout my journey"
        className="bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      >
        {/* Back Button & Responsive Tabs */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Back Button */}
            <div className="w-full md:w-auto">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                icon={FaArrowLeft}
                className="w-full md:w-auto justify-center"
              >
                Back to Home
              </Button>
            </div>

            {/* Tabs: wrap on small screens instead of horizontal scroll */}
            <div className="w-full md:w-auto">
              <div
                role="tablist"
                aria-label="Achievements Tabs"
                className="flex flex-wrap gap-3 md:gap-4 items-center justify-center px-2 md:px-0 py-1"
              >
                <button
                  type="button"
                  aria-pressed={activeTab === 'achievements'}
                  onClick={() => setActiveTab('achievements')}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 justify-center
                    ${activeTab === 'achievements'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                >
                  <FaTrophy className="w-5 h-5" />
                  <span className="whitespace-nowrap">Achievements ({sortedAchievements.length})</span>
                </button>

                <button
                  type="button"
                  aria-pressed={activeTab === 'activities'}
                  onClick={() => setActiveTab('activities')}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 justify-center
                    ${activeTab === 'activities'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                >
                  <FaUsers className="w-5 h-5" />
                  <span className="whitespace-nowrap">Activities ({sortedActivities.length})</span>
                </button>

                <button
                  type="button"
                  aria-pressed={activeTab === 'certifications'}
                  onClick={() => setActiveTab('certifications')}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 justify-center
                    ${activeTab === 'certifications'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                >
                  <FaCertificate className="w-5 h-5" />
                  <span className="whitespace-nowrap">Certifications ({sortedCertifications.length})</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'achievements' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onClick={() => handleItemClick(achievement, 'achievement')}
              />
            ))}
          </div>
        ) : activeTab === 'activities' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedActivities.map((activity) => (
              <AchievementCard
                key={activity.id}
                achievement={activity}
                onClick={() => handleItemClick(activity, 'achievement')}
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCertifications.map((cert) => (
              <CertificationCard
                key={cert.id}
                certification={cert}
                onClick={() => handleItemClick(cert, 'certification')}
              />
            ))}
          </div>
        )}
      </Section>

      <ImagePreviewSidebar
        isOpen={isOpen}
        onClose={closePreview}
        data={previewData}
      />
    </>
  );
}
