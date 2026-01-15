import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import siteData from '../../data/site.json';
import profileData from '../../data/profile.json';

export default function SEO({
  title,
  description,
  keywords,
  image,
  type = 'website',
  author = profileData.name,
}) {
  const location = useLocation();
  const baseUrl = siteData.siteUrl || window.location.origin;
  const currentUrl = `${baseUrl}${location.pathname}`;

  // Default values
  const siteTitle = title
    ? `${title} | ${profileData.name}`
    : siteData.siteTitle || `${profileData.name} - ${profileData.title}`;

  const siteDescription = description || siteData.siteDescription || profileData.tagline;
  const siteKeywords = keywords || siteData.siteKeywords?.join(', ') || '';
  const siteImage = image || `${baseUrl}/images/hero/avatar.jpg`;

  useEffect(() => {
    // Update document title
    document.title = siteTitle;

    // Helper function to update or create meta tag
    const setMetaTag = (name, content, isProperty = false) => {
      if (!content) return;

      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Basic Meta Tags
    setMetaTag('description', siteDescription);
    setMetaTag('keywords', siteKeywords);
    setMetaTag('author', author);

    // Open Graph / Facebook
    setMetaTag('og:type', type, true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:title', siteTitle, true);
    setMetaTag('og:description', siteDescription, true);
    setMetaTag('og:image', siteImage, true);
    setMetaTag('og:site_name', profileData.name, true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:url', currentUrl);
    setMetaTag('twitter:title', siteTitle);
    setMetaTag('twitter:description', siteDescription);
    setMetaTag('twitter:image', siteImage);

    if (profileData.social?.twitter) {
      setMetaTag('twitter:creator', `@${profileData.social.twitter.split('/').pop()}`);
    }

    // Additional Meta Tags
    setMetaTag('robots', 'index, follow');
    setMetaTag('language', 'English');
    setMetaTag('theme-color', '#3b82f6');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

  }, [siteTitle, siteDescription, siteKeywords, siteImage, currentUrl, author, type]);

  return null;
}

/**
 * Structured Data (JSON-LD) Component for SEO
 */
export function StructuredData({ type = 'Person' }) {
  useEffect(() => {
    const getPersonSchema = () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": profileData.name,
      "jobTitle": profileData.title,
      "description": profileData.bio?.long || profileData.tagline,
      "url": siteData.siteUrl,
      "image": `${siteData.siteUrl}/images/hero/avatar.jpg`,
      "email": profileData.email,
      "telephone": profileData.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": profileData.location
      },
      "sameAs": [
        profileData.social?.github,
        profileData.social?.linkedin,
        profileData.social?.twitter,
        profileData.social?.youtube
      ].filter(Boolean)
    });

    const getWebSiteSchema = () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteData.siteTitle,
      "description": siteData.siteDescription,
      "url": siteData.siteUrl,
      "author": {
        "@type": "Person",
        "name": profileData.name
      }
    });

    const schema = type === 'Person' ? getPersonSchema() : getWebSiteSchema();

    // Check if script already exists
    let scriptElement = document.querySelector('script[type="application/ld+json"]');

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(schema);

    return () => {
      // Cleanup on unmount
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [type]);

  return null;
}

