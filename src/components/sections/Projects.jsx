import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaArrowRight, FaTag, FaCalendar, FaStar, FaUsers } from 'react-icons/fa';
import { Section, Button, ImagePreviewSidebar } from '../ui';
import { projectsData } from '../../data';
import { useImagePreview } from '../../hooks/usePreview';
import { formatDateLong } from '../../utils/dateUtils';

// Star display
function Stars({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} style={{ color: i < count ? '#FFD700' : '#333', width: 10, height: 10 }} />
      ))}
    </div>
  );
}

// Roblox-style game card
function GameCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const randomStars = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
  const randomPlays = `${(Math.floor(Math.random() * 90) + 10)}K`;

  // Generate a gradient thumbnail based on project category
  const gradients = {
    'Mobile': 'linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #1E88E5 100%)',
    'Web': 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)',
    'Full-Stack': 'linear-gradient(135deg, #4A148C 0%, #6A1B9A 50%, #8E24AA 100%)',
    'API': 'linear-gradient(135deg, #B71C1C 0%, #C62828 50%, #E53935 100%)',
    'default': 'linear-gradient(135deg, #37474F 0%, #455A64 50%, #546E7A 100%)',
  };

  const gradient = gradients[project.category] || gradients.default;

  return (
    <motion.div
      className="game-card"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(project)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {/* Thumbnail */}
      <div className="game-card-thumbnail" style={{ background: gradient, minHeight: 140 }}>
        {/* Game title overlay on thumbnail */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          padding: '1rem',
          textAlign: 'center',
        }}>
          <span className="fredoka" style={{ color: '#fff', fontSize: '1.4rem', textShadow: '2px 2px 8px rgba(0,0,0,0.8)', lineHeight: 1.2 }}>
            {project.title}
          </span>
        </div>

        {/* Play button overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <div style={{
                background: '#00A400',
                border: '3px solid #007300',
                borderRadius: 10,
                padding: '10px 24px',
                boxShadow: '0 5px 0 #004000',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <FaPlay style={{ color: '#fff', width: 14, height: 14 }} />
                <span className="fredoka" style={{ color: '#fff', fontSize: '1rem' }}>View Details</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category badge */}
        <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 3 }}>
          <span className="rb-badge rb-badge-grey" style={{ fontSize: '0.6rem' }}>{project.category}</span>
        </div>

        {/* Status badge */}
        {project.status === 'Live' && (
          <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }}>
            <span className="rb-badge rb-badge-green" style={{ fontSize: '0.6rem' }}>● LIVE</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '12px' }}>
        {/* Stats row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Stars count={randomStars} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <FaUsers style={{ color: '#555', width: 10, height: 10 }} />
            <span className="pixel" style={{ color: '#555', fontSize: '0.42rem' }}>{randomPlays}</span>
          </div>
        </div>

        {/* Description */}
        <p className="nunito" style={{ color: '#ABABAB', fontSize: '0.8rem', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>

        {/* Tech stack chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className="rb-badge rb-badge-grey" style={{ fontSize: '0.55rem' }}>{tech}</span>
          ))}
          {project.techStack.length > 3 && (
            <span className="rb-badge rb-badge-grey" style={{ fontSize: '0.55rem' }}>+{project.techStack.length - 3}</span>
          )}
        </div>

        {/* Links row */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, borderTop: '1px solid #2A2A2A', paddingTop: 10 }}>
          {project.links?.github?.trim() && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-md"
              style={{
                fontFamily: "'Nunito', sans-serif",
                background: '#242424',
                border: '1px solid #3A3A3A',
                color: '#ABABAB',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#F2F2F2'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#3A3A3A'; e.currentTarget.style.color = '#ABABAB'; }}
            >
              <FaGithub className="w-3 h-3" /> Code
            </a>
          )}
          {project.links?.live?.trim() && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-md"
              style={{
                fontFamily: "'Nunito', sans-serif",
                background: '#00A400',
                border: '2px solid #007300',
                color: '#fff',
                boxShadow: '0 2px 0 #004000',
                textDecoration: 'none',
              }}
            >
              <FaPlay className="w-3 h-3" /> Play
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const { previewData, isOpen, openPreview, closePreview } = useImagePreview();

  const filteredProjects = activeFilter === 'All'
    ? projectsData.projects
    : projectsData.projects.filter(p => p.category === activeFilter);

  const displayedProjects = filteredProjects.slice(0, 6);

  const handleProjectClick = (project) => {
    openPreview({
      title: project.title,
      description: project.longDescription || project.description,
      images: project.images || [project.image],
      metadata: [
        { label: 'Category', value: project.category, icon: FaTag },
        { label: 'Date', value: formatDateLong(project.date), icon: FaCalendar },
        { label: 'Status', value: project.status },
      ],
      tags: project.techStack,
      highlights: project.highlights,
      links: [
        project.links?.github?.trim() && { label: 'View Code', url: project.links.github, icon: FaGithub },
        project.links?.live?.trim()   && { label: 'Live Demo', url: project.links.live, icon: FaExternalLinkAlt },
        project.links?.demo?.trim()   && { label: 'Watch Demo', url: project.links.demo, icon: FaPlay },
      ].filter(Boolean),
    });
  };

  return (
    <Section
      id="projects"
      label="GAME BROWSER"
      title="Featured Projects"
      subtitle="Select a game to view details"
    >
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {projectsData.categories.map(category => (
          <motion.button
            key={category}
            onClick={() => setActiveFilter(category)}
            className="px-4 py-2 rounded-lg font-bold text-sm transition-all"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              color: activeFilter === category ? '#fff' : '#ABABAB',
              background: activeFilter === category ? '#E8192C' : '#1A1A1A',
              border: `2px solid ${activeFilter === category ? '#B8131F' : '#3A3A3A'}`,
              boxShadow: activeFilter === category ? '0 4px 0 #8B0D16' : '0 3px 0 rgba(0,0,0,0.5)',
            }}
            whileHover={activeFilter !== category ? { background: '#242424', borderColor: '#555' } : {}}
            whileTap={{ y: 2, boxShadow: '0 1px 0 rgba(0,0,0,0.4)' }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Game browser grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map(project => (
            <motion.div
              key={project.id}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <GameCard project={project} onClick={handleProjectClick} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View All */}
      <div className="text-center mt-10">
        <Button onClick={() => navigate('/projects')} icon={FaArrowRight} iconPosition="right">
          View All Games
        </Button>
      </div>

      <ImagePreviewSidebar isOpen={isOpen} onClose={closePreview} data={previewData} />
    </Section>
  );
}
