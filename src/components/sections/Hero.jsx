import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight, FaStar, FaUserFriends, FaMedal, FaGamepad } from 'react-icons/fa';
import { Button } from '../ui';
import { profileData } from '../../data';
import { getSocialLinks } from '../../constants';

// XP bar component
function XPBar({ value = 78, label = 'Level 12' }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold pixel" style={{ color: '#FFD700', fontSize: '0.5rem' }}>{label}</span>
        <span className="text-xs pixel" style={{ color: '#666', fontSize: '0.5rem' }}>{value}/100 XP</span>
      </div>
      <div className="xp-bar-track">
        <motion.div
          className="xp-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Star rating display
function StarRating({ rating = 5, max = 5 }) {
  return (
    <div className="star-rating">
      {Array.from({ length: max }).map((_, i) => (
        <FaStar key={i} style={{ opacity: i < rating ? 1 : 0.25 }} />
      ))}
    </div>
  );
}

export default function Hero() {
  const socialLinks = getSocialLinks(profileData.social);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const stats = [
    { icon: FaStar,        value: '10K+',  label: 'Downloads', color: '#FFD700' },
    { icon: FaUserFriends, value: '650+',  label: 'Managed',   color: '#22A7E0' },
    { icon: FaMedal,       value: '2×',    label: 'Web Jam 1st',color: '#E8192C' },
    { icon: FaGamepad,     value: '27+',   label: 'Trained',   color: '#00CC00' },
  ];

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center relative z-10 py-12 px-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        {/* ── PLAYER PROFILE CARD ── */}
        <motion.div
          variants={itemVariants}
          className="rb-panel-red rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 8px 0 #8B0D16, 0 0 40px rgba(232,25,44,0.2)' }}
        >
          {/* Card Header Bar */}
          <div style={{
            background: '#E8192C',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span className="pixel" style={{ color: '#fff', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
              👤 PLAYER PROFILE
            </span>
            {/* Online status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="online-dot" />
              <span className="pixel" style={{ color: '#fff', fontSize: '0.45rem' }}>ONLINE</span>
            </div>
          </div>

          <div style={{ padding: '1.5rem' }}>
            {/* Username row */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1rem' }}>
              <p className="pixel" style={{ color: '#ABABAB', fontSize: '0.55rem', marginBottom: 4, letterSpacing: '0.08em' }}>
                // DISPLAY NAME
              </p>
              <h1
                className="fredoka"
                style={{
                  fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
                  color: '#F2F2F2',
                  margin: 0,
                  lineHeight: 1.1,
                  textShadow: '2px 2px 0 #000',
                }}
              >
                {profileData.name}
              </h1>
              <p
                className="fredoka"
                style={{ color: '#E8192C', fontSize: '1.2rem', marginTop: 4, textShadow: '1px 1px 0 #000' }}
              >
                {profileData.title}
              </p>
            </motion.div>

            {/* XP Bar */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1.25rem' }}>
              <XPBar value={78} label="Developer Level 12" />
            </motion.div>

            {/* Bio */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1.25rem' }}>
              <div style={{
                background: '#111',
                border: '2px solid #2A2A2A',
                borderRadius: 8,
                padding: '10px 14px',
              }}>
                <p className="nunito" style={{ color: '#ABABAB', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                  {profileData.bio.short}
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: '#111',
                      border: '2px solid #2A2A2A',
                      borderRadius: 8,
                      padding: '10px 6px',
                      textAlign: 'center',
                      boxShadow: '0 3px 0 rgba(0,0,0,0.6)',
                    }}
                  >
                    <stat.icon style={{ color: stat.color, width: 16, height: 16, margin: '0 auto 4px' }} />
                    <p className="fredoka" style={{ color: '#F2F2F2', fontSize: '1.1rem', margin: 0, lineHeight: 1 }}>
                      {stat.value}
                    </p>
                    <p className="pixel" style={{ color: '#555', fontSize: '0.38rem', marginTop: 2, lineHeight: 1.4 }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Badges / Highlights */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {profileData.highlights.map((h, i) => {
                  const colors = ['rb-badge-gold', 'rb-badge-blue', 'rb-badge-green', 'rb-badge-purple'];
                  return (
                    <span key={i} className={`rb-badge ${colors[i % colors.length]}`}>
                      {h}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: '1.25rem' }}>
              <Button href="#projects" icon={FaArrowRight} iconPosition="right" size="lg">
                View Projects
              </Button>
              <Button href={profileData.resumeUrl} variant="secondary" icon={FaDownload} external size="lg">
                Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg transition-all"
                  style={{
                    background: '#1A1A1A',
                    border: '2px solid #3A3A3A',
                    color: '#ABABAB',
                    boxShadow: '0 3px 0 rgba(0,0,0,0.5)',
                    display: 'flex',
                  }}
                  aria-label={social.label}
                  whileHover={{ borderColor: '#E8192C', color: '#F2F2F2', y: -2, boxShadow: '0 5px 0 rgba(0,0,0,0.5)' }}
                  whileTap={{ y: 2, boxShadow: '0 1px 0 rgba(0,0,0,0.5)' }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Card Footer */}
          <div style={{
            background: '#111',
            borderTop: '2px solid #2A2A2A',
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span className="pixel" style={{ color: '#444', fontSize: '0.4rem' }}>
              🌍 {profileData.location}
            </span>
            <StarRating rating={5} />
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="text-center mt-6"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="pixel" style={{ color: '#444', fontSize: '0.45rem' }}>▼ SCROLL TO EXPLORE ▼</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
