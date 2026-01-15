/**
 * Date utility functions for consistent date formatting across the application
 */

/**
 * Formats a date string to a readable format
 * @param {string} dateString - ISO date string or any valid date format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(dateString, options = { month: 'short', year: 'numeric' }) {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Formats a date string to a long format (Month Year)
 * @param {string} dateString - ISO date string or any valid date format
 * @returns {string} Formatted date string
 */
export function formatDateLong(dateString) {
  return formatDate(dateString, { month: 'long', year: 'numeric' });
}

/**
 * Formats a date string to a short format (MMM YYYY)
 * @param {string} dateString - ISO date string or any valid date format
 * @returns {string} Formatted date string
 */
export function formatDateShort(dateString) {
  return formatDate(dateString, { month: 'short', year: 'numeric' });
}
