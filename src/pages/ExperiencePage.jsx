import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaMapMarkerAlt, FaCalendar, FaClock, FaArrowLeft } from 'react-icons/fa';
import { SEO } from '../components/common';
import { Button, ExperienceCard, ImagePreviewSidebar } from '../components/ui';
import experienceData from '../data/experience.json';
import { useImagePreview } from '../hooks/usePreview';
import { formatDateLong } from '../utils/dateUtils';

export default function ExperiencePage() {
  const navigate = useNavigate();
  const { previewData, isOpen, openPreview, closePreview } = useImagePreview();

  const sortedExperiences = [...experienceData.experiences].sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );

  const handleExpClick = (exp) => {
    openPreview({
      title: `${exp.title} at ${exp.company}`,
      description: exp.description,
      images: exp.images || [],
      metadata: [
        { label: 'Location', value: exp.location, icon: FaMapMarkerAlt },
        { label: 'Type', value: exp.type, icon: FaBriefcase },
        { label: 'Period', value: `${formatDateLong(exp.startDate)} - ${exp.endDate ? formatDateLong(exp.endDate) : 'Present'}`, icon: FaCalendar },
      ],
      tags: exp.technologies || [],
      highlights: [
        ...(exp.responsibilities || []),
        ...(exp.highlights || [])
      ],
      links: []
    });
  };

  return (
    <>
      <SEO
        title="Work Experience - Professional Journey"
        description="My professional work experience, internships, and leadership roles."
      />

      <div className="min-h-screen bg-white dark:bg-slate-900 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              icon={FaArrowLeft}
              className="mb-6"
            >
              Back to Home
            </Button>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Work Experience
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Professional journey, internships, and leadership roles
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900/30 -translate-x-1/2" />

            {sortedExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ExperienceCard
                  experience={exp}
                  onClick={handleExpClick}
                  variant="detailed"
                  showTimeline={true}
                  timelinePosition="center"
                  index={index}
                  showFullDescription={true}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <ImagePreviewSidebar
        isOpen={isOpen}
        onClose={closePreview}
        data={previewData}
      />
    </>
  );
}
