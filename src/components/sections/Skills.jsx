import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCode, FaDesktop, FaServer, FaDatabase, FaMobile, FaTools,
  FaReact, FaNodeJs, FaJava, FaPhp, FaGitAlt, FaAws, FaDocker,
  FaHtml5, FaCss3Alt, FaFigma, FaPython
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiMongodb, SiMysql, SiPostgresql,
  SiFirebase, SiTailwindcss, SiExpress, SiPostman, SiExpo
} from 'react-icons/si';
import { Section, Card, Badge, ImagePreviewSidebar } from '../ui';
import { skillsData, projectsData } from '../../data';

// Icon mapping for skills
const skillIconMap = {
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Java': FaJava,
  'PHP': FaPhp,
  'Python': FaPython,
  'React.js': FaReact,
  'React Native': FaReact,
  'HTML5': FaHtml5,
  'CSS3': FaCss3Alt,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': FaNodeJs,
  'Express.js': SiExpress,
  'Firebase': SiFirebase,
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'PostgreSQL': SiPostgresql,
  'Git': FaGitAlt,
  'Figma': FaFigma,
  'Postman': SiPostman,
  'Expo': SiExpo,
  'AWS': FaAws,
  'Docker': FaDocker,
};

// Category icon mapping
const categoryIconMap = {
  FaCode,
  FaDesktop,
  FaServer,
  FaDatabase,
  FaMobile,
  FaTools,
};

// Find projects that use a specific skill
const getProjectsUsingSkill = (skillName) => {
  return projectsData.projects.filter(project =>
    project.techStack.some(tech =>
      tech.toLowerCase().includes(skillName.toLowerCase()) ||
      skillName.toLowerCase().includes(tech.toLowerCase())
    )
  );
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillsData.categories[0].name);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const activeSkills = skillsData.categories.find(
    (cat) => cat.name === activeCategory
  )?.skills || [];

  const handleSkillClick = (skill) => {
    const relatedProjects = getProjectsUsingSkill(skill.name);
    setSelectedSkill({
      title: skill.name,
      description: `Projects and experience with ${skill.name}`,
      tags: [activeCategory],
      highlights: relatedProjects.length > 0
        ? relatedProjects.map(p => p.title)
        : ['No specific projects yet - learning in progress'],
      stats: {
        Projects: relatedProjects.length,
        Category: activeCategory
      },
      relatedProjects
    });
  };

  return (
    <Section
      id="skills"
      title="Skills & Technologies"
      subtitle="Technologies I work with to build amazing products"
    >
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {skillsData.categories.map((category) => {
          const Icon = categoryIconMap[category.icon] || FaCode;
          const isActive = activeCategory === category.name;

          return (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200
                ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </motion.button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {activeSkills.map((skill, index) => {
            const SkillIcon = skillIconMap[skill.name] || FaCode;
            const projectCount = getProjectsUsingSkill(skill.name).length;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <button
                  onClick={() => handleSkillClick(skill)}
                  className="w-full group"
                >
                  <Card
                    className="h-full hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                    padding="md"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      {/* Skill Icon */}
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors">
                        <SkillIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>

                      {/* Skill Name */}
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                        {skill.name}
                      </h3>

                      {/* Project Count Badge */}
                      {projectCount > 0 && (
                        <Badge size="sm" variant="primary">
                          {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
                        </Badge>
                      )}
                    </div>
                  </Card>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* All Skills Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700"
      >
        <h3 className="text-center text-lg font-semibold text-slate-900 dark:text-white mb-6">
          Full Tech Stack
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {skillsData.categories.flatMap((cat) => cat.skills).map((skill) => {
            const SkillIcon = skillIconMap[skill.name];
            return (
              <motion.button
                key={skill.name}
                onClick={() => handleSkillClick(skill)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {SkillIcon && <SkillIcon className="w-4 h-4" />}
                {skill.name}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Skill Detail Sidebar */}
      <SkillDetailSidebar
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        skill={selectedSkill}
      />
    </Section>
  );
}

// Skill Detail Sidebar Component
function SkillDetailSidebar({ isOpen, onClose, skill }) {
  if (!skill) return null;

  const SkillIcon = skillIconMap[skill.title] || FaCode;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <SkillIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {skill.title}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {skill.stats?.Category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {skill.stats?.Projects || 0}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Projects</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {skill.stats?.Category}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Category</p>
                </div>
              </div>

              {/* Related Projects */}
              {skill.relatedProjects && skill.relatedProjects.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Projects Using {skill.title}
                  </h3>
                  <div className="space-y-3">
                    {skill.relatedProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                              {project.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.techStack.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          {project.links?.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <SkillIcon className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    No projects using this skill yet.
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    Check back soon for updates!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
