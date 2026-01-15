import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaExternalLinkAlt, FaArrowRight, FaTag, FaCalendar
} from 'react-icons/fa';
import { Section, ImagePreviewSidebar, Button, AchievementCard, CertificationCard } from '../ui';
import { achievementsData, activitiesData, certificationsData } from '../../data';
import { useImagePreview } from '../../hooks/usePreview';
import { formatDateShort } from '../../utils/dateUtils';

export default function Achievements() {
  const navigate = useNavigate();
  const { previewData, isOpen, openPreview, closePreview } = useImagePreview();

  // Sort achievements by date (newest first)
  const sortedAchievements = [...achievementsData.achievements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const sortedCertifications = [...certificationsData.certifications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const sortedActivities = [...activitiesData.activities].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleAchievementClick = (achievement) => {
    const images = achievement.images && achievement.images.length > 0
      ? achievement.images
      : achievement.image ? [achievement.image] : [];

    if (images.length > 0) {
      openPreview({
        title: achievement.title,
        description: achievement.description,
        images: images,
        metadata: [
          { label: 'Category', value: achievement.category, icon: FaTag },
          { label: 'Date', value: formatDateShort(achievement.date), icon: FaCalendar }
        ],
        links: (achievement.link && achievement.link.trim()) ? [
          { label: 'View Achievement', url: achievement.link, icon: FaExternalLinkAlt }
        ] : undefined
      });
    }
  };

  const handleCertificationClick = (certification) => {
    openPreview({
      title: certification.title,
      description: certification.description,
      images: certification.images,
      metadata: [
        { label: 'Issuer', value: certification.issuer },
        { label: 'Date', value: formatDateShort(certification.date), icon: FaCalendar }
      ],
      links: (certification.credentialUrl && certification.credentialUrl.trim()) ? [
        { label: 'View Credential', url: certification.credentialUrl, icon: FaExternalLinkAlt }
      ] : undefined
    });
  };

  return (
    <Section
      id="achievements"
      title="Achievements & Certifications"
      subtitle="Recognitions, awards, and professional certifications"
      className="bg-slate-50 dark:bg-slate-800/50"
    >
      {/* Achievements */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8 text-center">
          🏆 Achievements & Activities
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAchievements.slice(0, 3).map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <AchievementCard
                achievement={achievement}
                onClick={handleAchievementClick}
              />
            </motion.div>
          ))}
          {sortedActivities.slice(0, 3).map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index + 3) * 0.1 }}
            >
              <AchievementCard
                achievement={activity}
                onClick={handleAchievementClick}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8 text-center">
          📜 Certifications
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCertifications.slice(0, 3).map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CertificationCard
                certification={cert}
                onClick={handleCertificationClick}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-10">
        <Button
          variant="primary"
          onClick={() => navigate('/achievements')}
          icon={FaArrowRight}
          iconPosition="right"
        >
          View All Achievements & Certifications
        </Button>
      </div>

      {/* Image Preview Sidebar */}
      <ImagePreviewSidebar
        isOpen={isOpen}
        onClose={closePreview}
        data={previewData}
      />
    </Section>
  );
}
