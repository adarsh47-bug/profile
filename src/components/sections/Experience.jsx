import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { Section, ImagePreviewSidebar, Button, ExperienceCard } from '../ui';
import { experienceData } from '../../data';
import { useImagePreview } from '../../hooks/usePreview';
import { formatDateLong } from '../../utils/dateUtils';

export default function Experience() {
  const navigate = useNavigate();
  const { previewData, isOpen, openPreview, closePreview } = useImagePreview();

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
      <Section
        id="experience"
        title="Experience"
        subtitle="My professional journey and work experience"
        className="bg-white dark:bg-slate-900"
      >
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />

            {experienceData.experiences.slice(0, 2).map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 md:gap-8 mb-10"
              >
                {/* Timeline dot */}
                <div className="relative shrink-0">
                  <div className="absolute left-8 md:left-12 top-6 transform -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 z-10" />
                </div>

                {/* Content */}
                <div className="flex-1 ml-8 md:ml-12">
                  <ExperienceCard
                    experience={exp}
                    onClick={handleExpClick}
                    variant="compact"
                    maxResponsibilitiesDisplay={3}
                    showImageGallery={true}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="primary"
            onClick={() => navigate('/experience')}
            icon={FaArrowRight}
            iconPosition="right"
          >
            View Complete Experience
          </Button>
        </div>
      </Section>

      {/* Image Preview Sidebar */}
      <ImagePreviewSidebar
        isOpen={isOpen}
        onClose={closePreview}
        data={previewData}
      />
    </>
  );
}
