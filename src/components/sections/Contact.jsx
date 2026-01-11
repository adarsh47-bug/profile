import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin,
  FaTwitter, FaYoutube, FaDownload, FaPaperPlane, FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';
import { Section, Button, Card } from '../ui';
import { profileData } from '../../data';

// EmailJS Configuration - Replace with your own credentials
const EMAILJS_CONFIG = {
  serviceId: 'service_ai5b86p',     // Get from EmailJS dashboard
  templateId: 'template_xzcos4m',   // Get from EmailJS dashboard  
  publicKey: 'gYqGt_9UhBNaoWu83',     // Get from EmailJS dashboard
};

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.from_name.trim()) {
      newErrors.from_name = 'Name is required';
    } else if (formData.from_name.trim().length < 2) {
      newErrors.from_name = 'Name must be at least 2 characters';
    }

    if (!formData.from_email.trim()) {
      newErrors.from_email = 'Email is required';
    } else if (!validateEmail(formData.from_email)) {
      newErrors.from_email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear any previous status when user starts typing
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Please fix the errors above before submitting.'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID') {
      // Fallback to mailto if EmailJS not configured
      const subject = encodeURIComponent('Portfolio Contact: New Message');
      const body = encodeURIComponent(
        `Name: ${formData.from_name}\nEmail: ${formData.from_email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;
      setStatus({
        type: 'info',
        message: 'Opening your email client...'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Dynamic import EmailJS when needed
      const emailjs = await import('@emailjs/browser');

      // Add hidden fields to form before sending
      const form = formRef.current;

      // Add to_name (recipient name)
      const toNameInput = document.createElement('input');
      toNameInput.type = 'hidden';
      toNameInput.name = 'to_name';
      toNameInput.value = profileData.name;
      form.appendChild(toNameInput);

      // Add reply_to (same as from_email)
      const replyToInput = document.createElement('input');
      replyToInput.type = 'hidden';
      replyToInput.name = 'reply_to';
      replyToInput.value = formData.from_email;
      form.appendChild(replyToInput);

      // Add sent_time (current timestamp)
      const sentTimeInput = document.createElement('input');
      sentTimeInput.type = 'hidden';
      sentTimeInput.name = 'sent_time';
      sentTimeInput.value = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
      form.appendChild(sentTimeInput);

      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        form,
        EMAILJS_CONFIG.publicKey
      );

      // Clean up hidden fields
      form.removeChild(toNameInput);
      form.removeChild(replyToInput);
      form.removeChild(sentTimeInput);

      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      setFormData({ from_name: '', from_email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or use direct email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
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
      href: `tel:${profileData.phone.replace(/\s/g, '')}`,
      color: 'text-green-500',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: profileData.location,
      href: null,
      color: 'text-blue-500',
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: profileData.social.github, label: 'GitHub', color: 'hover:text-slate-900 dark:hover:text-white' },
    { icon: FaLinkedin, href: profileData.social.linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FaYoutube, href: profileData.social.youtube, label: 'YouTube', color: 'hover:text-red-600' },
    { icon: FaTwitter, href: profileData.social.twitter, label: 'Twitter', color: 'hover:text-blue-400' },
  ].filter((s) => s.href);

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Have a project in mind or want to collaborate? Feel free to reach out!"
    >
      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
            Let's Connect
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision. Feel free to reach out through any of the following channels.
          </p>

          {/* Contact Details */}
          <div className="space-y-4 mb-8">
            {contactInfo.map((info) => (
              <motion.div
                key={info.label}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className={`p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm ${info.color}`}>
                  <info.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-medium text-slate-900 dark:text-white">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mb-8">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
              Connect on social media
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 ${social.color} hover:bg-slate-200 dark:hover:bg-slate-700 transition-all`}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Resume Download */}
          <Button
            href={profileData.resumeUrl}
            variant="secondary"
            icon={FaDownload}
            external
          >
            Download Resume
          </Button>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card padding="lg" className="border-2 border-transparent hover:border-blue-100 dark:hover:border-slate-700 transition-colors">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Send a Message
            </h3>

            {/* Status Message */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                  flex items-center gap-2 p-4 rounded-lg mb-6
                  ${status.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : ''}
                  ${status.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : ''}
                  ${status.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : ''}
                `}
              >
                {status.type === 'success' && <FaCheckCircle className="w-5 h-5" />}
                {status.type === 'error' && <FaExclamationCircle className="w-5 h-5" />}
                <span className="text-sm">{status.message}</span>
              </motion.div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="from_name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border ${errors.from_name
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-200 dark:border-slate-700'
                      } rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.from_name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.from_name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="from_email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border ${errors.from_email
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-200 dark:border-slate-700'
                      } rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.from_email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.from_email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border ${errors.message
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-slate-200 dark:border-slate-700'
                    } rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                  placeholder="Tell me about your project or idea..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                icon={FaPaperPlane}
                iconPosition="right"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Your message will be sent directly to my email inbox.
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
