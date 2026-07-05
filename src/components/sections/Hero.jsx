import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import { Button } from '../ui';
import { profileData } from '../../data';
import { getSocialLinks } from '../../constants';

export default function Hero() {
  const socialLinks = getSocialLinks(profileData.social);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-5rem)] flex items-center relative overflow-hidden z-10"
    >
      {/* Extra hero-scoped orbs for depth */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)',
          top: -200,
          right: -200,
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
          bottom: -100,
          left: -100,
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating grid lines (hero-level perspective) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 80% at 30% 50%, black 40%, transparent 100%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Status pill */}
          <motion.div variants={itemVariants} className="mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: 'rgba(0,245,255,0.07)',
                border: '1px solid rgba(0,245,255,0.2)',
                color: '#00f5ff',
                letterSpacing: '0.08em',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#00f5ff',
                  boxShadow: '0 0 8px #00f5ff',
                  display: 'inline-block',
                  animation: 'pulse 2s infinite',
                }}
              />
              AVAILABLE FOR WORK
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="font-medium mb-3 text-base"
            style={{
              color: '#a855f7',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.05em',
            }}
          >
            // Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(135deg, #f0f4ff 0%, #00f5ff 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(0,245,255,0.15))',
            }}
          >
            {profileData.name}
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(90deg, #00f5ff, #a855f7, #e879f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {profileData.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed"
            style={{ color: 'var(--color-text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {profileData.tagline}
          </motion.p>

          {/* Highlight pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 mb-8"
          >
            {profileData.highlights.slice(0, 3).map((highlight, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(0,245,255,0.06)',
                  border: '1px solid rgba(0,245,255,0.18)',
                  color: 'var(--color-text-secondary)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  borderColor: 'rgba(0,245,255,0.5)',
                  color: '#00f5ff',
                  boxShadow: '0 0 15px rgba(0,245,255,0.15)',
                }}
              >
                ⬡ {highlight}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <Button href="#projects" icon={FaArrowRight} iconPosition="right">
              View Projects
            </Button>
            <Button
              href={profileData.resumeUrl}
              variant="secondary"
              icon={FaDownload}
              external
            >
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-3 mt-8"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(0,245,255,0.05)',
                  border: '1px solid rgba(0,245,255,0.15)',
                  color: 'var(--color-text-secondary)',
                  backdropFilter: 'blur(8px)',
                }}
                aria-label={social.label}
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  borderColor: 'rgba(0,245,255,0.5)',
                  boxShadow: '0 0 20px rgba(0,245,255,0.25)',
                  color: '#00f5ff',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          style={{
            width: 24,
            height: 40,
            borderRadius: 12,
            border: '1px solid rgba(0,245,255,0.3)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '6px 0',
          }}
        >
          <motion.div
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              background: 'linear-gradient(180deg, #00f5ff, transparent)',
              boxShadow: '0 0 6px rgba(0,245,255,0.6)',
            }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
