import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaImages } from 'react-icons/fa';
import { Section, Card, Badge, Button, ImagePreviewSidebar } from '../ui';
import { projectsData } from '../../data';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === 'All'
    ? projectsData.projects
    : projectsData.projects.filter((p) => p.category === activeFilter);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  const handleProjectClick = (project) => {
    setSelectedProject({
      image: project.image || project.images?.[0],
      title: project.title,
      description: project.longDescription || project.description,
      allImages: project.images || [project.image],
      currentIndex: 0,
      tags: project.techStack,
      links: project.links,
      highlights: project.highlights,
      stats: {
        Category: project.category,
        Status: project.status
      }
    });
  };

  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="A showcase of my recent work and side projects"
      className="bg-slate-50 dark:bg-slate-800/50"
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
            className={`
              px-4 py-2 rounded-lg font-medium text-sm
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
              <Card
                className="h-full flex flex-col group cursor-pointer hover:shadow-xl transition-shadow duration-300"
                padding="none"
                onClick={() => handleProjectClick(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-xl overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <>
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                        <span className="text-6xl opacity-30">💻</span>
                      </div>
                      {project.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs">
                          <FaImages className="w-3 h-3" />
                          {project.images.length}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-30">💻</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 px-4 py-2 rounded-lg">
                      View Details
                    </span>
                  </div>

                  {project.featured && (
                    <Badge variant="primary" className="absolute top-3 right-3">
                      Featured
                    </Badge>
                  )}
                  <Badge
                    variant={project.status === 'Completed' ? 'success' : 'warning'}
                    className="absolute top-3 left-3"
                  >
                    {project.status}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6 grow flex flex-col">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 grow line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech} size="sm">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge size="sm">+{project.techStack.length - 4}</Badge>
                    )}
                  </div>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-4">
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        {project.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-blue-500">✓</span> {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-2 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-700 rounded-lg transition-colors"
                      >
                        <FaGithub className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <FaExternalLinkAlt className="w-3 h-3" /> Live
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-700 rounded-lg transition-colors"
                      >
                        <FaPlay className="w-3 h-3" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More Button */}
      {filteredProjects.length > 6 && (
        <div className="text-center mt-10">
          <Button
            variant="secondary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show All (${filteredProjects.length})`}
          </Button>
        </div>
      )}

      {/* Project Detail Sidebar */}
      <ImagePreviewSidebar
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        data={selectedProject}
      />
    </Section>
  );
}
