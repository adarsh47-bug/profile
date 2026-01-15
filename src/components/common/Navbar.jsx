import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from '../ui';
import { siteData } from '../../data';
import Logo from './Logo';
import { useActiveSection, useSmoothScroll } from '../../hooks';
import {
  SCROLL_CONFIG,
  ACTIVE_INDICATOR_CONFIG,
  MOBILE_MENU_CONFIG,
} from '../../constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use custom hooks for scroll detection and smooth scrolling
  const activeSection = useActiveSection(SCROLL_CONFIG.offsetNavbar);
  const smoothScroll = useSmoothScroll(SCROLL_CONFIG.offsetNavbar);

  // Memoize navigation items to avoid unnecessary re-renders
  const navItems = useMemo(() => siteData.navigation, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, path, id) => {
    e.preventDefault();
    // Trigger smooth scroll immediately
    smoothScroll(id);
    // Close mobile menu
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
        }
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo size="sm" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (activeSection === '' && item.id === 'home');
              return (
                <div
                  key={item.name}
                  className="relative"
                >
                  <motion.a
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path, item.id)}
                    className={`
                      block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                      ${isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }
                    `}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    aria-label={item.ariaLabel}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </motion.a>
                  {/* Desktop active indicator: animated bottom border */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-500"
                      layoutId="desktopIndicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-b-xl"
            >
              <div className="py-4 space-y-1 border-t border-slate-200 dark:border-slate-700">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id || (activeSection === '' && item.id === 'home');
                  return (
                    <div
                      key={item.name}
                      className="relative px-4"
                    >
                      <motion.a
                        href={item.path}
                        onClick={(e) => handleNavClick(e, item.path, item.id)}
                        className={`
                          block py-3 text-base font-medium rounded-lg transition-colors duration-200
                          ${isActive
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                          }
                        `}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        aria-label={item.ariaLabel}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.name}
                      </motion.a>
                      {/* Mobile active indicator: left border */}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-500 rounded-r-full"
                          layoutId="mobileIndicator"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
