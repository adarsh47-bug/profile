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
  const siteImage = image || `${baseUrl}/og-image.png`;

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
    setMetaTag('robots', 'index, follow');
    setMetaTag('language', 'English');

    // Open Graph / Facebook
    setMetaTag('og:type', type, true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:title', siteTitle, true);
    setMetaTag('og:description', siteDescription, true);
    setMetaTag('og:image', siteImage, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:image:alt', `${profileData.name} - Software Engineer Portfolio`, true);
    setMetaTag('og:locale', 'en_US', true);
    setMetaTag('og:site_name', profileData.name, true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:url', currentUrl);
    setMetaTag('twitter:title', siteTitle);
    setMetaTag('twitter:description', siteDescription);
    setMetaTag('twitter:image', siteImage);
    setMetaTag('twitter:image:alt', `${profileData.name} - Software Engineer Portfolio`);

    if (profileData.social?.twitter) {
      setMetaTag('twitter:creator', `@${profileData.social.twitter.split('/').pop()}`);
    }

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
 * Injects both Person and WebSite schemas for maximum search engine coverage.
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
      "telephone": profileData.phone || undefined,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nagpur",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "knowsAbout": [
        "React", "React Native", "Node.js", "TypeScript", "JavaScript",
        "MERN Stack", "Firebase", "MongoDB", "Expo", "Full-Stack Development",
        "Mobile App Development", "Web Development"
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Priyadarshini College of Engineering, Nagpur"
      },
      "sameAs": [
        profileData.social?.github,
        profileData.social?.linkedin,
        profileData.social?.youtube
      ].filter(Boolean)
    });

    const getWebSiteSchema = () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteData.siteTitle,
      "description": siteData.siteDescription,
      "url": siteData.siteUrl,
      "inLanguage": "en-US",
      "author": {
        "@type": "Person",
        "name": profileData.name
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteData.siteUrl}/projects?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });

    // Inject Person schema
    const personSchemaId = 'ld-json-person';
    let personScript = document.getElementById(personSchemaId);
    if (!personScript) {
      personScript = document.createElement('script');
      personScript.setAttribute('type', 'application/ld+json');
      personScript.setAttribute('id', personSchemaId);
      document.head.appendChild(personScript);
    }
    personScript.textContent = JSON.stringify(getPersonSchema());

    // Inject WebSite schema
    const websiteSchemaId = 'ld-json-website';
    let websiteScript = document.getElementById(websiteSchemaId);
    if (!websiteScript) {
      websiteScript = document.createElement('script');
      websiteScript.setAttribute('type', 'application/ld+json');
      websiteScript.setAttribute('id', websiteSchemaId);
      document.head.appendChild(websiteScript);
    }
    websiteScript.textContent = JSON.stringify(getWebSiteSchema());

    return () => {
      // Cleanup on unmount
      [personSchemaId, websiteSchemaId].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, [type]);

  return null;
}
