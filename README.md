# Adarsh Kadam - Portfolio Website

A modern, scalable, and future-proof personal portfolio website built with React, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Tech Stack**: React 19, Vite, Tailwind CSS v4
- **Dark/Light Mode**: System preference detection + manual toggle
- **Data-Driven**: All content managed through JSON files
- **Smooth Animations**: Framer Motion for subtle, purposeful animations
- **Mobile-First**: Responsive design that works on all devices
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Fast Performance**: Vite for lightning-fast development and builds

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Layout components (Navbar, Footer, Layout)
│   ├── sections/        # Page sections (Hero, About, Skills, etc.)
│   └── ui/              # Reusable UI components (Button, Card, Badge)
├── context/             # React context providers (Theme)
├── data/                # JSON data files for all content
│   ├── profile.json     # Personal info, bio, social links
│   ├── skills.json      # Skills by category with levels
│   ├── projects.json    # Projects with details, links, tech stack
│   ├── experience.json  # Work experience timeline
│   ├── achievements.json # Awards and achievements
│   ├── certifications.json # Professional certifications
│   ├── education.json   # Educational background
│   ├── blogs.json       # Blog posts (future-ready)
│   └── site.json        # Site-wide config (nav, SEO, theme)
├── App.jsx              # Main app component
├── main.jsx             # Entry point with providers
└── index.css            # Global styles with Tailwind

public/
├── images/              # Project and blog images
├── resume/              # Resume PDF
└── favicon.svg          # Site favicon
```

## 🎨 Customization Guide

### Adding a New Project

Edit `src/data/projects.json`:

```json
{
  "id": "unique-project-id",
  "title": "Project Name",
  "description": "Short description for cards",
  "longDescription": "Detailed description for project page",
  "techStack": ["React", "Node.js", "MongoDB"],
  "category": "Web App",
  "status": "Completed",
  "featured": true,
  "image": "/images/projects/project-name.png",
  "links": {
    "live": "https://example.com",
    "github": "https://github.com/user/repo",
    "demo": "https://youtube.com/watch?v=..."
  },
  "highlights": [
    "Key achievement 1",
    "Key achievement 2"
  ],
  "date": "2024-01-01"
}
```

### Adding a New Achievement

Edit `src/data/achievements.json`:

```json
{
  "id": "unique-achievement-id",
  "title": "Achievement Title",
  "description": "Description of the achievement",
  "date": "2024-01-01",
  "category": "Competition",
  "icon": "FaTrophy",
  "link": "https://optional-link.com"
}
```

### Adding a New Certification

Edit `src/data/certifications.json`:

```json
{
  "id": "unique-cert-id",
  "title": "Certification Name",
  "issuer": "Issuing Organization",
  "date": "2024-01-01",
  "credentialUrl": "https://credential-verification-url.com",
  "icon": "FaCertificate",
  "description": "Brief description of the certification"
}
```

### Adding a New Blog Post

Edit `src/data/blogs.json`:

```json
{
  "id": "unique-blog-id",
  "title": "Blog Post Title",
  "slug": "blog-post-slug",
  "excerpt": "Short excerpt for listing",
  "content": "Full markdown content or empty for external",
  "coverImage": "/images/blog/cover.png",
  "date": "2024-01-01",
  "readTime": "5 min read",
  "tags": ["React", "JavaScript"],
  "published": true
}
```

### Updating Personal Information

Edit `src/data/profile.json` for:
- Name, title, tagline
- Contact information
- Social media links
- Bio (short and long versions)
- Highlights
- Languages

### Modifying Skills

Edit `src/data/skills.json`:
- Add/remove skill categories
- Update skill levels (0-100)
- Change category icons

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to Vercel
3. Deploy automatically

### Netlify

1. Push code to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🎯 Future Enhancements

- [ ] Blog page with Markdown rendering
- [ ] Project detail pages
- [ ] Contact form with backend
- [ ] Analytics integration
- [ ] PWA support
- [ ] CMS integration (Contentful/Sanity)

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

---

Built with ❤️ by Adarsh Kadam
