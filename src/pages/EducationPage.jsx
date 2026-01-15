import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendar, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/common';
import { Button, EducationCard, ImagePreviewSidebar } from '../components/ui';
import educationData from '../data/education.json';
import { useImagePreview } from '../hooks/usePreview';
import { formatDateLong } from '../utils/dateUtils';

export default function EducationPage() {
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
      <SEO
        title="Education - Academic Journey"
        description="My academic background, qualifications, and educational achievements."
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
              Education
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              My academic journey and qualifications
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-200 dark:bg-green-900/30 -translate-x-1/2" />

            {sortedEducation.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EducationCard
                  education={edu}
                  onClick={handleEducationClick}
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

      {/* Education Detail Sidebar */}
      <ImagePreviewSidebar
        isOpen={isOpen}
        onClose={closePreview}
        data={previewData}
      />
    </>
  );
}
