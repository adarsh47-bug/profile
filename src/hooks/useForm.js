import { useState, useCallback } from 'react';
import { FORM_VALIDATION, ERROR_MESSAGES } from '../constants';

/**
 * Custom hook for form handling with validation
 * Reduces boilerplate in form components
 * Supports custom validation rules
 * @param {Object} initialValues - Initial form values
 * @param {Function} onSubmit - Submit handler function
 * @param {Object} customValidation - Custom validation rules
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialValues = {}, onSubmit, customValidation = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Merge default and custom validation rules
  const validationRules = { ...FORM_VALIDATION, ...customValidation };

  // Validate single field
  const validateField = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    // Check required
    if (rules.required && (!value || value.trim() === '')) {
      return ERROR_MESSAGES[`${fieldName}Required`] || 'This field is required';
    }

    // Check minLength
    if (rules.minLength && value.length < rules.minLength) {
      return ERROR_MESSAGES[`${fieldName}Invalid`] || `Minimum length is ${rules.minLength} characters`;
    }

    // Check maxLength
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    // Check pattern (regex)
    if (rules.pattern && !rules.pattern.test(value)) {
      return ERROR_MESSAGES[`${fieldName}Invalid`] || 'Invalid format';
    }

    return null;
  }, [validationRules]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
      }
    });
    return newErrors;
  }, [formData, validationRules, validateField]);

  // Handle field change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear error when user starts fixing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  }, [errors]);

  // Handle field blur (mark as touched)
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate on blur
    const error = validateField(name, formData[name] || '');
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  }, [formData, validateField]);

  // Handle form submit
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit(formData);
        setSubmitStatus({ type: 'success', message: 'Success!' });
      } catch (error) {
        setSubmitStatus({ type: 'error', message: error.message || 'An error occurred' });
      }
    }

    setIsSubmitting(false);
  }, [formData, validateForm, onSubmit]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    setSubmitStatus({ type: '', message: '' });
  }, [initialValues]);

  // Set field value programmatically
  const setFieldValue = useCallback((fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }, []);

  // Set field error programmatically
  const setFieldError = useCallback((fieldName, error) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  }, []);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    submitStatus,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    validateField,
    validateForm,
  };
};

export default useForm;
