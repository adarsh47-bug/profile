/**
 * Centralized icon mapping for consistent icon usage across the application
 */
import {
  FaTrophy,
  FaMedal,
  FaDownload,
  FaLightbulb,
  FaUsers,
  FaCertificate,
} from 'react-icons/fa';
import { SiPostman, SiUdemy } from 'react-icons/si';

/**
 * Achievement icon mapping
 */
export const achievementIconMap = {
  FaTrophy,
  FaMedal,
  FaDownload,
  FaLightbulb,
  FaUsers,
  FaCertificate,
};

/**
 * Certification icon mapping
 */
export const certificationIconMap = {
  SiPostman,
  SiUdemy,
  FaJava: FaCertificate,
  FaCertificate,
};

/**
 * Get icon component from icon name
 * @param {string} iconName - Name of the icon
 * @param {Object} iconMap - Icon mapping object
 * @param {Component} defaultIcon - Default icon component
 * @returns {Component} Icon component
 */
export function getIconComponent(iconName, iconMap, defaultIcon) {
  return iconMap[iconName] || defaultIcon;
}
