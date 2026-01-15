import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaArrowRight, FaTag, FaCalendar } from 'react-icons/fa';
import { Section, Button, ImagePreviewSidebar, ProjectCard } from '../ui';
import { projectsData } from '../../data';
import { useImagePreview } from '../../hooks/usePreview';
import { formatDateLong } from '../../utils/dateUtils';

export default function Projects() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const { previewData, isOpen, openPreview, closePreview } = useImagePreview();

  const filteredProjects = activeFilter === 'All'
    ? projectsData.projects
    : projectsData.projects.filter((p) => p.category === activeFilter);

  const displayedProjects = filteredProjects.slice(0, 6);

  const handleProjectClick = (project) => {
    openPreview({
      title: project.title,
      description: project.longDescription || project.description,
      images: project.images || [project.image],
      metadata: [
        { label: 'Category', value: project.category, icon: FaTag },
        { label: 'Date', value: formatDateLong(project.date), icon: FaCalendar },
        { label: 'Status', value: project.status }
      ],
      tags: project.techStack,
      highlights: project.highlights,
      links: [
        (project.links?.github && project.links.github.trim()) && { label: 'View Code', url: project.links.github, icon: FaGithub },
        (project.links?.live && project.links.live.trim()) && { label: 'Live Demo', url: project.links.live, icon: FaExternalLinkAlt },
        (project.links?.demo && project.links.demo.trim()) && { label: 'Watch Demo', url: project.links.demo, icon: FaPlay }
      ].filter(Boolean)
    });
  };

  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="A showcase of my recent work and side projects"
      className="bg-white dark:bg-slate-900"
    >
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {projectsData.categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => {
              setActiveFilter(category);
              setShowAll(false);
            }}
            className={` px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-200
              ${activeFilter === category
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProjectCard
                project={project}
                onClick={handleProjectClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View All Button */}
      <div className="text-center mt-10">
        <Button
          variant="primary"
          onClick={() => navigate('/projects')}
          icon={FaArrowRight}
          iconPosition="right"
        >
          View All Projects
        </Button>
      </div>

      {/* Project Detail Sidebar */}
      <ImagePreviewSidebar
        isOpen={isOpen}
        onClose={closePreview}
        data={previewData}
      />
    </Section>
  );
}
