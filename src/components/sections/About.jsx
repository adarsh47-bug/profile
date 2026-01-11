import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { Section } from '../ui';
import { profileData, educationData } from '../../data';

export default function About() {
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Get to know more about my background and what drives me"
      className="bg-slate-50 dark:bg-slate-800/50"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            {profileData.bio.long}
          </p>

          {/* Info cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
                <p className="font-medium text-slate-900 dark:text-white">{profileData.location}</p>
              </div>
            </div>

            {profileData.currentRole && (
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <FaBriefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Current Role</p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {profileData.currentRole.title} at {profileData.currentRole.company}
                  </p>
                </div>
              </div>
            )}

            {educationData.education[0] && (
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <FaGraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Education</p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {educationData.education[0].degree} in {educationData.education[0].field}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {educationData.education[0].institution}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Languages & Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Languages */}
          <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Languages I Speak
            </h3>
            <div className="flex flex-wrap gap-2">
              {profileData.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white text-center">
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-blue-100">App Downloads</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white text-center">
              <p className="text-3xl font-bold">650+</p>
              <p className="text-purple-100">Hoardings Managed</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white text-center">
              <p className="text-3xl font-bold">27+</p>
              <p className="text-green-100">Stations Trained</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white text-center">
              <p className="text-3xl font-bold">130+</p>
              <p className="text-orange-100">Schools Served</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
