import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

/**
 * Social media links configuration
 * Used across multiple components (Hero, Footer, Contact)
 * @param {Object} socialData - Social links data from profile.json
 * @returns {Array} Filtered array of social links with icons and styling
 */
export const getSocialLinks = (socialData) => [
  {
    icon: FaGithub,
    href: socialData.github,
    label: 'GitHub',
    color: 'hover:text-slate-900 dark:hover:text-white',
    platform: 'github'
  },
  {
    icon: FaLinkedin,
    href: socialData.linkedin,
    label: 'LinkedIn',
    color: 'hover:text-blue-600',
    platform: 'linkedin'
  },
  {
    icon: FaTwitter,
    href: socialData.twitter,
    label: 'Twitter',
    color: 'hover:text-blue-400',
    platform: 'twitter'
  },
  {
    icon: FaYoutube,
    href: socialData.youtube,
    label: 'YouTube',
    color: 'hover:text-red-600',
    platform: 'youtube'
  },
].filter((link) => link.href); // Only return links that have a URL
