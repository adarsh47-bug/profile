import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from '../ui';
import { siteData } from '../../data';
import Logo from './Logo';
import { useActiveSection, useSmoothScroll } from '../../hooks';
import { SCROLL_CONFIG } from '../../constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeSection = useActiveSection(SCROLL_CONFIG.offsetNavbar);
  const smoothScroll = useSmoothScroll(SCROLL_CONFIG.offsetNavbar);
  const navItems = useMemo(() => siteData.navigation, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, path, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setTimeout(() => smoothScroll(id), 150);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={isScrolled ? {
        background: '#1A1A1A',
        borderBottom: '3px solid #E8192C',
        boxShadow: '0 4px 0 rgba(0,0,0,0.6)',
      } : {
        background: 'rgba(15,15,15,0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid #2A2A2A',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[70px]">
          <Logo size="sm" />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (activeSection === '' && item.id === 'home');
              return (
                <motion.a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path, item.id)}
                  className="relative px-4 py-2 rounded-lg font-bold text-sm transition-all duration-150"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 700,
                    color: isActive ? '#fff' : '#ABABAB',
                    background: isActive ? '#E8192C' : 'transparent',
                    boxShadow: isActive ? '0 3px 0 #B8131F' : 'none',
                  }}
                  whileHover={!isActive ? { background: '#242424', color: '#F2F2F2', y: -1 } : {}}
                  whileTap={{ y: isActive ? 2 : 0 }}
                  transition={{ duration: 0.1 }}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </motion.a>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-all"
              style={{
                background: '#242424',
                border: '2px solid #3A3A3A',
                color: '#ABABAB',
                boxShadow: '0 3px 0 rgba(0,0,0,0.5)',
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen
                ? <FaTimes className="w-5 h-5" style={{ color: '#E8192C' }} />
                : <FaBars className="w-5 h-5" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
              style={{
                background: '#1A1A1A',
                borderTop: '2px solid #E8192C',
                borderBottom: '2px solid #3A3A3A',
              }}
            >
              <div className="py-3 space-y-1 px-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id || (activeSection === '' && item.id === 'home');
                  return (
                    <motion.a
                      key={item.name}
                      href={item.path}
                      onClick={(e) => handleNavClick(e, item.path, item.id)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-sm"
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 700,
                        color: isActive ? '#fff' : '#ABABAB',
                        background: isActive ? '#E8192C' : 'transparent',
                        boxShadow: isActive ? '0 3px 0 #B8131F' : 'none',
                      }}
                      whileHover={!isActive ? { background: '#242424', x: 4 } : {}}
                      aria-label={item.ariaLabel}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.name}
                    </motion.a>
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
