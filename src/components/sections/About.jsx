import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaStar } from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { Section, Badge } from '../ui';
import { profileData, educationData, skillsData } from '../../data';

// Icon mapping for skill icons
const iconMap = {
  'SiJavascript': SiIcons.SiJavascript,
  'SiTypescript': SiIcons.SiTypescript,
  'SiReact': SiIcons.SiReact,
  'SiNodedotjs': SiIcons.SiNodedotjs,
  'SiExpo': SiIcons.SiExpo,
  'SiFirebase': SiIcons.SiFirebase,
  'SiMysql': SiIcons.SiMysql,
  'SiMongodb': SiIcons.SiMongodb,
  'SiAndroid': SiIcons.SiAndroid,
};

const ANIMATION_CONFIG = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
};

export default function About() {
  const topSkills = skillsData.topSkills;

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Get to know more about my background and what drives me"
    >
      <div className="grid gap-12">
        {/* Bio */}
        <motion.div {...ANIMATION_CONFIG} transition={{ duration: 0.5 }}>
          <p
            className="text-lg text-center leading-relaxed"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {profileData.bio.long}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-12 md:grid-cols-2">
          <LeftColumn topSkills={topSkills} />
          <RightColumn />
        </div>
      </div>
    </Section>
  );
}

function LeftColumn({ topSkills }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <TopSkillsCard topSkills={topSkills} />
      <div className="mt-6 space-y-4">
        <LocationCard />
        <CurrentRoleCard />
        <EducationCard />
      </div>
    </motion.div>
  );
}

function RightColumn() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <LanguagesCard />
      <StatsGrid />
    </motion.div>
  );
}

function TopSkillsCard({ topSkills }) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: 'rgba(0,245,255,0.04)',
        border: '1px solid rgba(0,245,255,0.12)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <h3
        className="mb-4 flex items-center gap-2 text-lg font-semibold"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#00f5ff' }}
      >
        <FaStar className="h-4 w-4" style={{ color: '#e879f9' }} />
        Top Skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {topSkills.map(skill => {
          const Icon = iconMap[skill.icon];
          return (
            <Badge key={skill.name} variant="primary" size="md" icon={Icon}>
              {skill.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

function LocationCard() {
  return (
    <InfoCard
      icon={<FaMapMarkerAlt className="h-4 w-4" style={{ color: '#00f5ff' }} />}
      iconColor="rgba(0,245,255,0.15)"
      label="Location"
      value={profileData.location}
    />
  );
}

function CurrentRoleCard() {
  if (!profileData.currentRole) return null;
  return (
    <InfoCard
      icon={<FaBriefcase className="h-4 w-4" style={{ color: '#a855f7' }} />}
      iconColor="rgba(168,85,247,0.15)"
      label="Current Role"
      value={`${profileData.currentRole.title}${profileData.currentRole.company ? ' at ' + profileData.currentRole.company : ''}`}
    />
  );
}

function EducationCard() {
  const education = educationData.education[0];
  if (!education) return null;

  return (
    <div
      className="flex items-start gap-4 rounded-lg p-4"
      style={{
        background: 'rgba(34,211,238,0.04)',
        border: '1px solid rgba(34,211,238,0.12)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="rounded-lg p-2.5 flex-shrink-0"
        style={{ background: 'rgba(34,211,238,0.12)' }}
      >
        <FaGraduationCap className="h-4 w-4" style={{ color: '#22d3ee' }} />
      </div>
      <div>
        <p className="text-xs mb-0.5" style={{ color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
          Education
        </p>
        <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
          {education.degree} in {education.field}
        </p>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {education.institution}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ icon, iconColor, label, value }) {
  return (
    <div
      className="flex items-center gap-4 rounded-lg p-4"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="rounded-lg p-2.5 flex-shrink-0"
        style={{ background: iconColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
          {label}
        </p>
        <p className="font-medium" style={{ color: 'var(--color-text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function LanguagesCard() {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: 'rgba(168,85,247,0.04)',
        border: '1px solid rgba(168,85,247,0.12)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <h3
        className="mb-4 text-lg font-semibold"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#a855f7' }}
      >
        Languages I Speak
      </h3>
      <div className="flex flex-wrap gap-2">
        {profileData.languages.map(lang => (
          <span
            key={lang}
            className="rounded-full px-4 py-2 text-sm font-medium"
            style={{
              background: 'rgba(168,85,247,0.08)',
              border: '1px solid rgba(168,85,247,0.2)',
              color: '#c084fc',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatsGrid() {
  const stats = [
    {
      value: '10K+',
      label: 'App Downloads',
      color: '#00f5ff',
      bg: 'rgba(0,245,255,0.06)',
      border: 'rgba(0,245,255,0.2)',
    },
    {
      value: '650+',
      label: 'Hoardings Managed',
      color: '#a855f7',
      bg: 'rgba(168,85,247,0.06)',
      border: 'rgba(168,85,247,0.2)',
    },
    {
      value: '27+',
      label: 'Stations Trained',
      color: '#22d3ee',
      bg: 'rgba(34,211,238,0.06)',
      border: 'rgba(34,211,238,0.2)',
    },
    {
      value: '130+',
      label: 'Schools Served',
      color: '#fb923c',
      bg: 'rgba(251,146,60,0.06)',
      border: 'rgba(251,146,60,0.2)',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map(stat => (
        <motion.div
          key={stat.label}
          className="rounded-xl p-6 text-center"
          style={{
            background: stat.bg,
            border: `1px solid ${stat.border}`,
            backdropFilter: 'blur(12px)',
          }}
          whileHover={{
            scale: 1.04,
            boxShadow: `0 0 25px ${stat.border}`,
          }}
          transition={{ duration: 0.2 }}
        >
          <p
            className="text-3xl font-bold mb-1"
            style={{
              color: stat.color,
              fontFamily: "'Space Grotesk', sans-serif",
              textShadow: `0 0 15px ${stat.color}50`,
            }}
          >
            {stat.value}
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)', fontFamily: "'JetBrains Mono', monospace" }}>
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
