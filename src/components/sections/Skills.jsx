import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCode, FaDesktop, FaServer, FaDatabase, FaMobile, FaTools,
  FaJava, FaGitAlt, FaAws, FaDocker, FaFigma, FaPython, FaPlug
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiMongodb, SiMysql, SiPostgresql,
  SiFirebase, SiTailwindcss, SiExpress, SiPostman, SiExpo,
  SiBootstrap, SiGit, SiGithub, SiGooglechrome,
  SiC, SiPwa, SiHtml5, SiCss3, SiPhp, SiReact, SiNodedotjs
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { Section, Card, Badge, ImagePreviewSidebar } from '../ui';
import { skillsData, projectsData } from '../../data';

const skillIconMap = {
  'JavaScript': SiJavascript, 'TypeScript': SiTypescript, 'Java': FaJava,
  'PHP': SiPhp, 'Python': FaPython, 'C': SiC, 'React.js': SiReact,
  'React Native': SiReact, 'HTML5': SiHtml5, 'CSS3': SiCss3,
  'Tailwind CSS': SiTailwindcss, 'Bootstrap': SiBootstrap,
  'Node.js': SiNodedotjs, 'Express.js': SiExpress, 'Firebase': SiFirebase,
  'Azure': VscAzure, 'MongoDB': SiMongodb, 'MySQL': SiMysql,
  'PostgreSQL': SiPostgresql, 'Git': SiGit, 'GitHub': SiGithub,
  'Figma': FaFigma, 'Postman': SiPostman, 'Expo': SiExpo,
  'PWA': SiPwa, 'REST APIs': FaPlug, 'Chrome DevTools': SiGooglechrome,
  'AWS': FaAws, 'Docker': FaDocker,
};

const categoryIconMap = { FaCode, FaDesktop, FaServer, FaDatabase, FaMobile, FaTools };

const getProjectsUsingSkill = (skillName) =>
  projectsData.projects.filter(project =>
    project.techStack.some(tech =>
      tech.toLowerCase().includes(skillName.toLowerCase()) ||
      skillName.toLowerCase().includes(tech.toLowerCase())
    )
  );

// Rarity tier mapping for item slots
const rarityMap = { 0: 'grey', 1: 'blue', 2: 'green', 3: 'gold', 4: 'red' };
function getRarity(count) {
  if (count >= 4) return 'red';
  if (count >= 3) return 'gold';
  if (count >= 2) return 'green';
  if (count >= 1) return 'blue';
  return 'grey';
}

const rarityColors = {
  red:   { bg: 'rgba(232,25,44,0.12)',   border: '#E8192C', label: 'EPIC',   color: '#ff4060' },
  gold:  { bg: 'rgba(255,215,0,0.1)',    border: '#E6A817', label: 'RARE',   color: '#FFD700' },
  green: { bg: 'rgba(0,164,0,0.1)',      border: '#00A400', label: 'UNCOMMON',color: '#00CC00' },
  blue:  { bg: 'rgba(0,119,212,0.1)',    border: '#0077D4', label: 'COMMON', color: '#22A7E0' },
  grey:  { bg: 'rgba(90,90,90,0.15)',    border: '#555',    label: 'BASIC',  color: '#ABABAB' },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillsData.categories[0].name);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const activeSkills = skillsData.categories.find(c => c.name === activeCategory)?.skills || [];

  const handleSkillClick = (skill) => {
    const relatedProjects = getProjectsUsingSkill(skill.name);
    setSelectedSkill({
      title: skill.name,
      description: `Projects and experience with ${skill.name}`,
      tags: [activeCategory],
      highlights: relatedProjects.length > 0
        ? relatedProjects.map(p => p.title)
        : ['No specific projects yet — learning in progress'],
      stats: { Projects: relatedProjects.length, Category: activeCategory },
      relatedProjects,
    });
  };

  return (
    <Section
      id="skills"
      label="INVENTORY"
      title="Skills & Technologies"
      subtitle="Your equipped tools and technologies"
    >
      {/* Category Tabs — styled as Roblox inventory category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {skillsData.categories.map((category) => {
          const Icon = categoryIconMap[category.icon] || FaCode;
          const isActive = activeCategory === category.name;
          return (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-150"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                color: isActive ? '#fff' : '#ABABAB',
                background: isActive ? '#E8192C' : '#1A1A1A',
                border: `2px solid ${isActive ? '#B8131F' : '#3A3A3A'}`,
                boxShadow: isActive ? '0 4px 0 #8B0D16' : '0 3px 0 rgba(0,0,0,0.5)',
              }}
              whileHover={!isActive ? { background: '#242424', borderColor: '#555' } : {}}
              whileTap={{ y: isActive ? 3 : 0, boxShadow: isActive ? '0 1px 0 #8B0D16' : '0 1px 0 rgba(0,0,0,0.5)' }}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </motion.button>
          );
        })}
      </div>

      {/* Inventory Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto"
        >
          {activeSkills.map((skill, index) => {
            const SkillIcon = skillIconMap[skill.name] || FaCode;
            const projectCount = getProjectsUsingSkill(skill.name).length;
            const rarity = getRarity(projectCount);
            const r = rarityColors[rarity];

            return (
              <motion.button
                key={skill.name}
                onClick={() => handleSkillClick(skill)}
                className="item-slot w-full text-center"
                style={{
                  padding: '16px 8px',
                  background: r.bg,
                  borderColor: r.border,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Rarity label */}
                <span className="pixel" style={{ color: r.color, fontSize: '0.38rem', letterSpacing: '0.08em' }}>
                  {r.label}
                </span>
                {/* Icon */}
                <SkillIcon style={{ width: 28, height: 28, color: r.color }} />
                {/* Name */}
                <span className="nunito" style={{ color: '#F2F2F2', fontSize: '0.72rem', fontWeight: 700, lineHeight: 1.2 }}>
                  {skill.name}
                </span>
                {/* Project count */}
                {projectCount > 0 && (
                  <span className="pixel" style={{ color: '#555', fontSize: '0.38rem' }}>
                    ×{projectCount} USES
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Full Tech Stack */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 pt-8"
        style={{ borderTop: '2px solid #2A2A2A' }}
      >
        <p className="pixel text-center mb-6" style={{ color: '#E8192C', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
          FULL TECH STACK
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {skillsData.categories.flatMap(cat => cat.skills).map(skill => {
            const SkillIcon = skillIconMap[skill.name];
            return (
              <motion.button
                key={skill.name}
                onClick={() => handleSkillClick(skill)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  background: '#1A1A1A',
                  border: '2px solid #2A2A2A',
                  color: '#ABABAB',
                  boxShadow: '0 2px 0 rgba(0,0,0,0.4)',
                }}
                whileHover={{ borderColor: '#E8192C', color: '#F2F2F2', background: '#242424' }}
                whileTap={{ y: 1 }}
              >
                {SkillIcon && <SkillIcon className="w-3 h-3" />}
                {skill.name}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Skill Detail Sidebar */}
      <SkillDetailSidebar isOpen={!!selectedSkill} onClose={() => setSelectedSkill(null)} skill={selectedSkill} />
    </Section>
  );
}

function SkillDetailSidebar({ isOpen, onClose, skill }) {
  if (!skill) return null;
  const SkillIcon = skillIconMap[skill.title] || FaCode;
  const projectCount = skill.stats?.Projects || 0;
  const rarity = getRarity(projectCount);
  const r = rarityColors[rarity];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 z-50 overflow-y-auto"
            style={{ background: '#1A1A1A', borderLeft: `3px solid ${r.border}`, boxShadow: '-8px 0 0 rgba(0,0,0,0.5)' }}
          >
            {/* Header */}
            <div style={{ background: '#111', borderBottom: '2px solid #2A2A2A', padding: '1rem 1.25rem' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div style={{ background: r.bg, border: `2px solid ${r.border}`, borderRadius: 8, padding: 10 }}>
                    <SkillIcon style={{ width: 24, height: 24, color: r.color }} />
                  </div>
                  <div>
                    <h2 className="fredoka" style={{ color: '#F2F2F2', fontSize: '1.4rem', margin: 0 }}>
                      {skill.title}
                    </h2>
                    <span className="pixel" style={{ color: r.color, fontSize: '0.45rem' }}>{r.label} ITEM</span>
                  </div>
                </div>
                <button onClick={onClose} style={{ background: '#242424', border: '2px solid #3A3A3A', borderRadius: 6, padding: 8, color: '#ABABAB' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div style={{ padding: '1.25rem' }}>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '1.25rem' }}>
                <div style={{ background: '#111', border: '2px solid #2A2A2A', borderRadius: 8, padding: '14px', textAlign: 'center' }}>
                  <p className="fredoka" style={{ color: '#FFD700', fontSize: '2rem', margin: 0 }}>{projectCount}</p>
                  <p className="pixel" style={{ color: '#555', fontSize: '0.45rem', marginTop: 2 }}>PROJECTS</p>
                </div>
                <div style={{ background: '#111', border: '2px solid #2A2A2A', borderRadius: 8, padding: '14px', textAlign: 'center' }}>
                  <p className="fredoka" style={{ color: r.color, fontSize: '1.1rem', margin: 0 }}>{skill.stats?.Category}</p>
                  <p className="pixel" style={{ color: '#555', fontSize: '0.45rem', marginTop: 2 }}>CATEGORY</p>
                </div>
              </div>

              {/* Related projects */}
              {skill.relatedProjects?.length > 0 ? (
                <div>
                  <p className="pixel" style={{ color: '#E8192C', fontSize: '0.5rem', marginBottom: 10, letterSpacing: '0.08em' }}>
                    GAMES USING THIS SKILL
                  </p>
                  <div className="space-y-3">
                    {skill.relatedProjects.map(project => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ background: '#111', border: '2px solid #2A2A2A', borderRadius: 8, padding: '12px' }}
                        whileHover={{ borderColor: '#3A3A3A' }}
                      >
                        <p className="fredoka" style={{ color: '#F2F2F2', margin: 0, fontSize: '1rem' }}>{project.title}</p>
                        <p className="nunito" style={{ color: '#666', fontSize: '0.8rem', margin: '4px 0', lineHeight: 1.5 }}>
                          {project.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {project.techStack.slice(0, 3).map(tech => (
                            <span key={tech} className="rb-badge rb-badge-grey" style={{ fontSize: '0.6rem' }}>{tech}</span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <SkillIcon style={{ width: 40, height: 40, color: '#3A3A3A', margin: '0 auto 12px' }} />
                  <p className="nunito" style={{ color: '#555' }}>No projects using this skill yet.</p>
                  <p className="pixel" style={{ color: '#3A3A3A', fontSize: '0.45rem', marginTop: 6 }}>STILL LEVELING UP!</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
