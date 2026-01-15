/**
 * EmailJS Configuration
 * Used in Contact form for sending messages
 * 
 * Configuration is loaded from environment variables for security.
 * 
 * Setup Instructions:
 * 1. Create account at https://www.emailjs.com/
 * 2. Get your Service ID, Template ID, and Public Key from dashboard
 * 3. Copy .env.example to .env
 * 4. Update the EMAILJS_* variables in .env with your credentials
 * 
 * Note: Never commit .env file to version control
 * 
 * Environment Variables Required:
 * - EMAILJS_SERVICE_ID: Your EmailJS service ID
 * - EMAILJS_TEMPLATE_ID: Your EmailJS template ID
 * - EMAILJS_PUBLIC_KEY: Your EmailJS public key
 */

// Validate that required environment variables are set
const validateEnvVars = () => {
  const required = {
    serviceId: import.meta.env.EMAILJS_SERVICE_ID,
    templateId: import.meta.env.EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.EMAILJS_PUBLIC_KEY,
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => `EMAILJS_${key.toUpperCase().replace(/([A-Z])/g, '_$1')}`);

  if (missing.length > 0) {
    console.warn(
      '⚠️ EmailJS Configuration Warning:\n' +
      `Missing environment variables: ${missing.join(', ')}\n` +
      'Contact form will not work until these are configured.\n' +
      'Please check .env.example for setup instructions.'
    );
  }

  return required;
};

export const EMAILJS_CONFIG = validateEnvVars();

// Export individual values for easier testing and mocking
export const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;

// Helper to check if EmailJS is properly configured
export const isEmailJSConfigured = () => {
  return !!(EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey);
};

