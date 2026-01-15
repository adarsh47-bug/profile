import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaGraduationCap, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import { Section, Button, EducationCard, ImagePreviewSidebar } from '../ui';
import educationData from '../../data/education.json';
import { useImagePreview } from '../../hooks/usePreview';
import { formatDateLong } from '../../utils/dateUtils';

export default function Education() {
  const navigate = useNavigate();
  const { previewData, isOpen, openPreview, closePreview } = useImagePreview();

  // Sort by start date (most recent first)
  const sortedEducation = [...educationData.education].sort(
    (a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0)
  );

  const handleEducationClick = (education) => {
    openPreview({
      title: `${education.degree}${education.field ? ` in ${education.field}` : ''}`,
      description: education.description,
      images: education.images || [],
      metadata: [
        { label: 'Institution', value: education.institution, icon: FaGraduationCap },
        { label: 'Location', value: education.location, icon: FaMapMarkerAlt },
        {
          label: 'Duration',
          value: `${formatDateLong(education.startDate)} - ${education.current ? 'Present' : formatDateLong(education.endDate)}`,
          icon: FaCalendar
        },
        ...(education.grade ? [{ label: 'Grade', value: education.grade }] : []),
        ...(education.current ? [{ label: 'Status', value: 'Currently Pursuing' }] : [])
      ],
      tags: [],
      highlights: education.achievements || [],
      links: []
    });
  };

  return (
    <>
      <Section
        id="education"
        title="Education"
        subtitle="Academic background and qualifications"
        className="bg-slate-50 dark:bg-slate-800/50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-200 dark:bg-green-900/30 -translate-x-1/2" />

            {sortedEducation.slice(0, 2).map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EducationCard
                  education={edu}
                  onClick={handleEducationClick}
                  variant="compact"
                  showTimeline={true}
                  timelinePosition="center"
                  index={index}
                  maxAchievementsDisplay={2}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="primary"
            onClick={() => navigate('/education')}
            icon={FaArrowRight}
            iconPosition="right"
          >
            View All Education
          </Button>
        </div>
      </Section>

      {/* Education Detail Sidebar */}
      <ImagePreviewSidebar
        isOpen={isOpen}
        onClose={closePreview}
        data={previewData}
      />
    </>
  );
}
