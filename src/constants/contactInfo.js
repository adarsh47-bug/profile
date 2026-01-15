import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

/**
 * Contact information configuration
 * Used in Contact section
 * @param {Object} profileData - Profile data from profile.json
 * @returns {Array} Array of contact information items
 */
export const getContactInfo = (profileData) => [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: profileData.email,
    href: `mailto:${profileData.email}`,
    color: 'text-red-500',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: profileData.phone,
    href: profileData.phone ? `tel:${profileData.phone}` : null,
    color: 'text-green-500',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: profileData.location,
    href: null,
    color: 'text-blue-500',
  },
].filter((info) => info.value); // Only return items with values
