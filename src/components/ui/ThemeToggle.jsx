import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = memo(function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-200 ${className}`}
      style={{
        background: 'rgba(0,245,255,0.06)',
        border: '1px solid rgba(0,245,255,0.15)',
        color: isDark ? '#e879f9' : '#64748b',
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 12px rgba(0,245,255,0.2)',
        borderColor: 'rgba(0,245,255,0.4)',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <FaSun className="w-4 h-4" style={{ color: '#fbbf24' }} />
        ) : (
          <FaMoon className="w-4 h-4" style={{ color: '#a855f7' }} />
        )}
      </motion.div>
    </motion.button>
  );
});

export default ThemeToggle;
