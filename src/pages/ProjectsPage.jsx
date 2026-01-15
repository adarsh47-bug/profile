import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendar, FaTag, FaArrowLeft, FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import ProjectCard from '../components/ui/ProjectCard';
import { useImagePreview } from '../hooks/usePreview';
import ImagePreviewSidebar from '../components/ui/ImagePreviewSidebar';
import projectsData from '../data/projects.json';
import { formatDateLong } from '../utils/dateUtils';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const { previewData, isOpen, openPreview, closePreview } = useImagePreview();

  const filteredProjects = activeFilter === 'All'
    ? projectsData.projects
    : projectsData.projects.filter((p) => p.category === activeFilter);

  const handleImageClick = (project) => {
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
    <>
      <Section
        title="All Projects"
        subtitle="Explore my complete portfolio of web applications, mobile apps, and software projects"
        className="bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      >
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            icon={FaArrowLeft}
            className="mb-6"
          >
            Back to Home
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {projectsData.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                px-6 py-2.5 rounded-full font-medium transition-all duration-200
                ${activeFilter === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant='detailed'
              onClick={handleImageClick}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No projects found in this category
            </p>
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
