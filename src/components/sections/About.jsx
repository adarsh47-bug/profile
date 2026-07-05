import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaStar, FaShieldAlt } from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { Section, Badge } from '../ui';
import { profileData, educationData, skillsData } from '../../data';

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

export default function About() {
  const topSkills = skillsData.topSkills;
  const education = educationData.education[0];

  const infoRows = [
    { Icon: FaMapMarkerAlt, color: '#22A7E0', label: 'Location', value: profileData.location },
    { Icon: FaBriefcase,    color: '#E8192C', label: 'Role',     value: profileData.currentRole?.title || 'Developer' },
    { Icon: FaGraduationCap,color: '#FFD700', label: 'College',  value: education ? `${education.degree} — ${education.institution}` : '' },
  ];

  const stats = [
    { value: '10K+', label: 'App Downloads',     color: '#FFD700' },
    { value: '650+', label: 'Hoardings Managed', color: '#22A7E0' },
    { value: '27+',  label: 'Stations Trained',  color: '#00CC00' },
    { value: '130+', label: 'Schools Served',    color: '#E8192C' },
  ];

  return (
    <Section
      id="about"
      label="PLAYER INFO"
      title="About Me"
      subtitle="My background, skills and stats"
    >
      <div className="grid gap-8 md:grid-cols-2">

        {/* Left: Player bio + info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          {/* Bio panel */}
          <div className="rb-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <FaShieldAlt style={{ color: '#E8192C', width: 16, height: 16 }} />
              <span className="fredoka" style={{ color: '#F2F2F2', fontSize: '1.1rem' }}>Player Description</span>
            </div>
            <p className="nunito" style={{ color: '#ABABAB', lineHeight: 1.7, margin: 0, fontSize: '0.9rem' }}>
              {profileData.bio.long}
            </p>
          </div>

          {/* Info rows */}
          <div className="rb-panel" style={{ padding: '1.25rem' }}>
            <span className="pixel" style={{ color: '#E8192C', fontSize: '0.5rem', display: 'block', marginBottom: 12, letterSpacing: '0.1em' }}>
              PLAYER DETAILS
            </span>
            <div className="space-y-3">
              {infoRows.map(({ Icon, color, label, value }) => value && (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    background: `${color}22`,
                    border: `2px solid ${color}44`,
                    borderRadius: 6,
                    padding: '6px',
                    flexShrink: 0,
                  }}>
                    <Icon style={{ color, width: 14, height: 14 }} />
                  </div>
                  <div>
                    <p className="pixel" style={{ color: '#555', fontSize: '0.42rem', marginBottom: 2 }}>{label}</p>
                    <p className="nunito" style={{ color: '#F2F2F2', fontWeight: 700, margin: 0, fontSize: '0.88rem' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="rb-panel" style={{ padding: '1.25rem' }}>
            <span className="pixel" style={{ color: '#E8192C', fontSize: '0.5rem', display: 'block', marginBottom: 10, letterSpacing: '0.1em' }}>
              LANGUAGES
            </span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {profileData.languages.map(lang => (
                <span key={lang} className="rb-badge rb-badge-grey nunito">{lang}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Equipped skills + stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-5"
        >
          {/* Equipped items (top skills) */}
          <div className="rb-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <FaStar style={{ color: '#FFD700', width: 16, height: 16 }} />
              <span className="fredoka" style={{ color: '#F2F2F2', fontSize: '1.1rem' }}>Equipped Skills</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {topSkills.map(skill => {
                const Icon = iconMap[skill.icon];
                return (
                  <motion.div
                    key={skill.name}
                    className="item-slot"
                    style={{ padding: '12px 8px', textAlign: 'center' }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {Icon && <Icon style={{ width: 24, height: 24, color: '#22A7E0', margin: '0 auto 6px', display: 'block' }} />}
                    <p className="nunito" style={{ color: '#F2F2F2', fontSize: '0.72rem', fontWeight: 700, margin: 0 }}>
                      {skill.name}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Achievement Stats */}
          <div className="rb-panel" style={{ padding: '1.25rem' }}>
            <span className="pixel" style={{ color: '#E8192C', fontSize: '0.5rem', display: 'block', marginBottom: 12, letterSpacing: '0.1em' }}>
              ACHIEVEMENT STATS
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {stats.map(stat => (
                <motion.div
                  key={stat.label}
                  style={{
                    background: '#111',
                    border: `2px solid ${stat.color}33`,
                    borderRadius: 8,
                    padding: '14px 10px',
                    textAlign: 'center',
                    boxShadow: '0 3px 0 rgba(0,0,0,0.5)',
                  }}
                  whileHover={{ borderColor: stat.color, boxShadow: `0 0 12px ${stat.color}33, 0 3px 0 rgba(0,0,0,0.5)` }}
                >
                  <p className="fredoka" style={{ color: stat.color, fontSize: '1.8rem', margin: 0, lineHeight: 1, textShadow: '1px 1px 0 #000' }}>
                    {stat.value}
                  </p>
                  <p className="pixel" style={{ color: '#555', fontSize: '0.42rem', marginTop: 4, lineHeight: 1.6 }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
