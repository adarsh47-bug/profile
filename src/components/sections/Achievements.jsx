import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaTrophy, FaMedal, FaDownload, FaLightbulb, FaUsers, FaCertificate, FaExternalLinkAlt, FaImages
} from 'react-icons/fa';
import { Section, Card, Badge, MiniGallery, ImagePreviewSidebar } from '../ui';
import { achievementsData, certificationsData } from '../../data';

const iconMap = {
  FaTrophy,
  FaMedal,
  FaDownload,
  FaLightbulb,
  FaUsers,
  FaCertificate,
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Achievements() {
  const [selectedItem, setSelectedItem] = useState(null);

  // Sort achievements by date (newest first)
  const sortedAchievements = [...achievementsData.achievements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const sortedCertifications = [...certificationsData.certifications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleAchievementClick = (achievement) => {
    if (achievement.images && achievement.images.length > 0) {
      setSelectedItem({
        image: achievement.image || achievement.images[0],
        title: achievement.title,
        description: achievement.description,
        allImages: achievement.images,
        currentIndex: 0,
        tags: [achievement.category],
        links: achievement.link ? { view: achievement.link } : null,
        stats: {
          Category: achievement.category,
          Date: formatDate(achievement.date)
        }
      });
    } else if (achievement.image) {
      setSelectedItem({
        image: achievement.image,
        title: achievement.title,
        description: achievement.description,
        allImages: [achievement.image],
        currentIndex: 0,
        tags: [achievement.category],
        links: achievement.link ? { view: achievement.link } : null,
        stats: {
          Category: achievement.category,
          Date: formatDate(achievement.date)
        }
      });
    }
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
          🏆 Achievements & Awards
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAchievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || FaTrophy;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full ${achievement.images?.length > 0 || achievement.image ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-600' : ''}`}
                  onClick={() => handleAchievementClick(achievement)}
                >
                  <div className="flex items-start gap-4">
                    {/* Achievement Image or Icon */}
                    {achievement.image ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-600">
                        <img
                          src={achievement.image}
                          alt={achievement.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('bg-gradient-to-br', 'from-yellow-400', 'to-orange-500', 'flex', 'items-center', 'justify-center');
                            const icon = document.createElement('span');
                            icon.innerHTML = '<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 00-1 1v1.323l-3.954 1.582 1.599-.8a1 1 0 10-.894-1.79l-3 1.5A1 1 0 002 5v10a1 1 0 001.447.894L10 12.618l6.553 3.276A1 1 0 0018 15V5a1 1 0 00-.553-.894l-3-1.5a1 1 0 00-.894 1.79l1.599.8L11.2 3.613V3a1 1 0 00-1-1z"/></svg>';
                            e.target.parentElement.appendChild(icon);
                          }}
                        />
                        {achievement.images && achievement.images.length > 1 && (
                          <div className="absolute bottom-0 right-0 px-1 bg-black/70 text-white text-xs rounded-tl">
                            +{achievement.images.length - 1}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg text-white shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        {achievement.link && (
                          <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge size="sm" variant="secondary">
                          {achievement.category}
                        </Badge>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDate(achievement.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8 text-center">
          📜 Certifications
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCertifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white shrink-0">
                    <FaCertificate className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {cert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Issued: {formatDate(cert.date)}
                      </span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
                        >
                          View <FaExternalLinkAlt className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Preview Sidebar */}
      <ImagePreviewSidebar
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        data={selectedItem}
      />
    </Section>
  );
}
