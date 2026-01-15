/**
 * Form Validation & Navigation Constants
 */

// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form field validation rules
export const FORM_VALIDATION = {
  name: {
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  email: {
    pattern: EMAIL_REGEX,
    required: true,
  },
  message: {
    minLength: 10,
    maxLength: 5000,
    required: true,
  },
  phone: {
    minLength: 10,
    maxLength: 15,
  },
};

// Error messages
export const ERROR_MESSAGES = {
  nameRequired: 'Please enter your name',
  nameInvalid: 'Name must be at least 2 characters long',
  emailRequired: 'Please enter your email',
  emailInvalid: 'Please enter a valid email address',
  messageRequired: 'Please enter your message',
  messageInvalid: 'Message must be at least 10 characters long',
  phoneInvalid: 'Please enter a valid phone number',
  submissionFailed: 'Failed to send message. Please try again.',
  serverError: 'Server error. Please try again later.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  submitSuccess: 'Message sent successfully! 🎉',
  formReset: 'Form has been reset.',
};

// Navigation paths
export const NAVIGATION_PATHS = {
  home: '/',
  about: '/#about',
  skills: '/#skills',
  projects: '/#projects',
  experience: '/#experience',
  achievements: '/#achievements',
  contact: '/#contact',
  education: '/#education',
  notFound: '/404',
};

// API status codes
export const STATUS_CODES = {
  success: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
  serviceUnavailable: 503,
};

export default {
  EMAIL_REGEX,
  FORM_VALIDATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  NAVIGATION_PATHS,
  STATUS_CODES,
};
