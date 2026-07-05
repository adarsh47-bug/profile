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

  const activeSection = useActiveSection(SCROLL_CONFIG.offsetNavbar);
  const smoothScroll = useSmoothScroll(SCROLL_CONFIG.offsetNavbar);

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
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      smoothScroll(id);
    }, 150);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={isScrolled ? {
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(0, 245, 255, 0.05)',
      } : {
        background: 'transparent',
      }}
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
                <div key={item.name} className="relative">
                  <motion.a
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path, item.id)}
                    className="block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: isActive ? '#00f5ff' : 'var(--color-text-secondary)',
                      textShadow: isActive ? '0 0 12px rgba(0,245,255,0.5)' : 'none',
                      background: isActive ? 'rgba(0,245,255,0.05)' : 'transparent',
                    }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    aria-label={item.ariaLabel}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </motion.a>
                  {/* Neon active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      layoutId="desktopIndicator"
                      style={{
                        background: 'linear-gradient(90deg, #00f5ff, #a855f7)',
                        boxShadow: '0 0 8px rgba(0,245,255,0.8)',
                      }}
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
              className="lg:hidden p-2 rounded-lg transition-all duration-200"
              style={{
                color: 'var(--color-text-secondary)',
                background: 'rgba(0,245,255,0.05)',
                border: '1px solid rgba(0,245,255,0.15)',
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" style={{ color: '#00f5ff' }} />
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
              className="lg:hidden overflow-hidden rounded-b-xl"
              style={{
                background: 'rgba(3, 7, 18, 0.95)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(0,245,255,0.1)',
                borderRight: '1px solid rgba(0,245,255,0.1)',
                borderBottom: '1px solid rgba(0,245,255,0.1)',
              }}
            >
              <div className="py-4 space-y-1" style={{ borderTop: '1px solid rgba(0,245,255,0.08)' }}>
                {navItems.map((item) => {
                  const isActive = activeSection === item.id || (activeSection === '' && item.id === 'home');
                  return (
                    <div key={item.name} className="relative px-4">
                      <motion.a
                        href={item.path}
                        onClick={(e) => handleNavClick(e, item.path, item.id)}
                        className="block py-3 px-3 text-base font-medium rounded-lg transition-all duration-200"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: isActive ? '#00f5ff' : 'var(--color-text-secondary)',
                          background: isActive ? 'rgba(0,245,255,0.07)' : 'transparent',
                          textShadow: isActive ? '0 0 10px rgba(0,245,255,0.4)' : 'none',
                        }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        aria-label={item.ariaLabel}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.name}
                      </motion.a>
                      {/* Left neon indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-r-full"
                          layoutId="mobileIndicator"
                          style={{
                            background: 'linear-gradient(180deg, #00f5ff, #a855f7)',
                            boxShadow: '0 0 8px rgba(0,245,255,0.8)',
                          }}
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
