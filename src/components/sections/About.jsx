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
      className="bg-slate-50 dark:bg-slate-800/50"
    >
      <div className="grid gap-12">
        {/* Bio Section */}
        <motion.div
          {...ANIMATION_CONFIG}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-center leading-relaxed text-slate-600 dark:text-slate-400">
            {profileData.bio.long}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Column */}
          <LeftColumn topSkills={topSkills} />

          {/* Right Column */}
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
      {/* Top Skills */}
      <TopSkillsCard topSkills={topSkills} />

      {/* Info Cards */}
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
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
        <FaStar className="h-5 w-5 text-yellow-500" />
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
      icon={<FaMapMarkerAlt className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
      iconBgColor="bg-blue-100 dark:bg-blue-900/30"
      label="Location"
      value={profileData.location}
    />
  );
}

function CurrentRoleCard() {
  if (!profileData.currentRole) return null;

  return (
    <InfoCard
      icon={<FaBriefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
      iconBgColor="bg-purple-100 dark:bg-purple-900/30"
      label="Current Role"
      value={`${profileData.currentRole.title} at ${profileData.currentRole.company}`}
    />
  );
}

function EducationCard() {
  const education = educationData.education[0];

  if (!education) return null;

  return (
    <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
        <FaGraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Education</p>
        <p className="font-medium text-slate-900 dark:text-white">
          {education.degree} in {education.field}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{education.institution}</p>
      </div>
    </div>
  );
}

function InfoCard({ icon, iconBgColor, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className={`rounded-lg p-3 ${iconBgColor}`}>{icon}</div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="font-medium text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function LanguagesCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Languages I Speak
      </h3>
      <div className="flex flex-wrap gap-2">
        {profileData.languages.map(lang => (
          <span
            key={lang}
            className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300"
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
    { value: '10K+', label: 'App Downloads', gradient: 'from-blue-500 to-blue-600', textAccent: 'text-blue-100' },
    { value: '650+', label: 'Hoardings Managed', gradient: 'from-purple-500 to-purple-600', textAccent: 'text-purple-100' },
    { value: '27+', label: 'Stations Trained', gradient: 'from-green-500 to-green-600', textAccent: 'text-green-100' },
    { value: '130+', label: 'Schools Served', gradient: 'from-orange-500 to-orange-600', textAccent: 'text-orange-100' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map(stat => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

function StatCard({ value, label, gradient, textAccent }) {
  return (
    <div className={`rounded-xl bg-linear-to-br ${gradient} p-6 text-center text-white`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className={textAccent}>{label}</p>
    </div>
  );
}
