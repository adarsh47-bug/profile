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
        background: '#242424',
        border: '2px solid #3A3A3A',
        color: '#ABABAB',
        boxShadow: '0 3px 0 rgba(0,0,0,0.5)',
      }}
      whileHover={{ scale: 1.05, borderColor: '#E8192C' }}
      whileTap={{ scale: 0.95, y: 2, boxShadow: '0 1px 0 rgba(0,0,0,0.5)' }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <FaSun className="w-4 h-4" style={{ color: '#FFD700' }} />
        ) : (
          <FaMoon className="w-4 h-4" style={{ color: '#ABABAB' }} />
        )}
      </motion.div>
    </motion.button>
  );
});

export default ThemeToggle;
