import { FaHeart, FaGamepad } from 'react-icons/fa';
import { profileData, siteData } from '../../data';
import { getSocialLinks } from '../../constants';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = getSocialLinks(profileData.social);

  return (
    <footer className="relative z-10" style={{
      background: '#111111',
      borderTop: '3px solid #E8192C',
      boxShadow: '0 -4px 0 rgba(0,0,0,0.5)',
    }}>
      {/* Red pixel border accent */}
      <div style={{
        height: 3,
        background: 'repeating-linear-gradient(90deg, #E8192C 0px, #E8192C 20px, #B8131F 20px, #B8131F 40px)',
        marginBottom: 0,
      }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <Logo size="md" />
            <p className="mt-3 text-sm" style={{ color: '#666', fontFamily: "'Nunito', sans-serif" }}>
              {profileData.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 pixel" style={{ color: '#E8192C' }}>
              Navigation
            </h3>
            <ul className="space-y-2">
              {siteData.navigation.slice(0, 5).map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-sm font-bold link-underline transition-colors duration-200"
                    style={{ color: '#ABABAB', fontFamily: "'Nunito', sans-serif" }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 pixel" style={{ color: '#E8192C' }}>
              Connect
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all duration-150"
                  style={{
                    background: '#242424',
                    border: '2px solid #3A3A3A',
                    color: '#ABABAB',
                    boxShadow: '0 3px 0 rgba(0,0,0,0.5)',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#E8192C';
                    e.currentTarget.style.color = '#F2F2F2';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#3A3A3A';
                    e.currentTarget.style.color = '#ABABAB';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs pixel" style={{ color: '#555' }}>
              {profileData.email}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6" style={{ borderTop: '2px solid #2A2A2A' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs pixel" style={{ color: '#444' }}>
              © {currentYear} {profileData.name}. All rights reserved.
            </p>
            <p className="text-xs flex items-center gap-1.5 nunito" style={{ color: '#555', fontWeight: 600 }}>
              Built with <FaHeart className="w-3 h-3" style={{ color: '#E8192C' }} />
              &amp; <FaGamepad className="w-3 h-3" style={{ color: '#FFD700' }} />
              using React &amp; Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
