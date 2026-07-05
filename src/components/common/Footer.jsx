import { FaHeart, FaCode } from 'react-icons/fa';
import { profileData, siteData } from '../../data';
import { getSocialLinks } from '../../constants';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = getSocialLinks(profileData.social);

  return (
    <footer
      className="relative z-10"
      style={{
        background: 'rgba(3, 7, 18, 0.8)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0, 245, 255, 0.1)',
        boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Neon top glow line */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4), rgba(168,85,247,0.4), transparent)',
          marginBottom: -1,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <Logo size="md" />
            <p
              className="mt-3 text-sm"
              style={{ color: 'var(--color-text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {profileData.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#00f5ff', fontFamily: "'JetBrains Mono', monospace", textShadow: '0 0 8px rgba(0,245,255,0.4)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {siteData.navigation.slice(0, 5).map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-sm transition-all duration-200 link-underline"
                    style={{ color: 'var(--color-text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#a855f7', fontFamily: "'JetBrains Mono', monospace", textShadow: '0 0 8px rgba(168,85,247,0.4)' }}
            >
              Connect
            </h3>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{
                    background: 'rgba(0,245,255,0.06)',
                    border: '1px solid rgba(0,245,255,0.15)',
                    color: 'var(--color-text-secondary)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,245,255,0.5)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(0,245,255,0.2)';
                    e.currentTarget.style.color = '#00f5ff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,245,255,0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}
            >
              {profileData.email}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-8 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-xs"
              style={{ color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              © {currentYear} {profileData.name}. All rights reserved.
            </p>
            <p
              className="text-xs flex items-center gap-1.5"
              style={{ color: 'var(--color-text-muted)', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Built with <FaHeart className="w-3 h-3" style={{ color: '#e879f9' }} />
              using React &amp;{' '}
              <FaCode className="w-3 h-3" style={{ color: '#00f5ff' }} />
              Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
