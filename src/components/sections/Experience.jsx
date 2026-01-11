import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaImages } from 'react-icons/fa';
import { Section, Badge, MiniGallery, ImagePreviewSidebar } from '../ui';
import { experienceData } from '../../data';

function formatDate(dateString) {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState(null);

  const handleExpClick = (exp) => {
    if (exp.images && exp.images.length > 0) {
      setSelectedExp({
        image: exp.companyLogo || exp.images[0],
        title: `${exp.title} at ${exp.company}`,
        description: exp.description,
        allImages: exp.images,
        currentIndex: 0,
        tags: exp.technologies,
        highlights: exp.highlights || exp.responsibilities,
        stats: {
          Duration: `${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`,
          Location: exp.location,
          Type: exp.type
        }
      });
    }
  };

  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="My professional journey and work experience"
    >
      <div className="max-w-4xl mx-auto">
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />

          {experienceData.experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-6 md:gap-8 mb-10"
            >
              {/* Timeline dot */}
              <div className="relative flex-shrink-0">
                <div className="absolute left-8 md:left-12 top-6 transform -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 z-10" />
              </div>

              {/* Content */}
              <div className="flex-1 ml-8 md:ml-12">
                <div
                  className={`bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 ${exp.images?.length > 0 ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-600' : ''}`}
                  onClick={() => handleExpClick(exp)}
                >
                  {/* Header with Company Logo */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      {exp.companyLogo && (
                        <img
                          src={exp.companyLogo}
                          alt={exp.company}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-600"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                          {exp.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <Badge variant={exp.current ? 'success' : 'default'}>
                      {exp.type}
                    </Badge>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="w-3 h-3" />
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <ul className="space-y-2 mb-4">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="text-blue-500 mt-1">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Image Gallery Preview */}
                  {exp.images && exp.images.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <MiniGallery
                        images={exp.images}
                        maxVisible={3}
                        onExpand={() => handleExpClick(exp)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Preview Sidebar */}
      <ImagePreviewSidebar
        isOpen={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        data={selectedExp}
      />
    </Section>
  );
}
