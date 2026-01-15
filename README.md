# 🚀 Portfolio Website - Adarsh Kadam

A modern, responsive, and production-ready portfolio website built with React, Tailwind CSS, and Framer Motion. Features smooth animations, dark mode, dedicated pages for better UX, comprehensive SEO optimization, and modular component architecture following industry best practices.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

## ✨ Features

### 🎨 Design & User Experience
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode** - System preference detection with manual toggle
- **Smooth Animations** - Delightful interactions using Framer Motion
- **Modern UI** - Clean, professional design with Tailwind CSS 4
- **Accessible** - WCAG compliant with keyboard navigation support
- **Intuitive Navigation** - Multi-page routing for better content organization

### 🏗️ Architecture & Code Quality
- **Modular Components** - Reusable UI components (ProjectCard, EducationCard, ExperienceCard)
- **Environment Variables** - Secure configuration management with `.env` files
- **Type Safety** - PropTypes validation throughout the codebase
- **Code Splitting** - Route-based lazy loading with React.lazy()
- **Error Boundaries** - Graceful error handling throughout the app
- **Clean Code** - Following React and JavaScript best practices

### 🚄 Performance & Optimization
- **Image Optimization** - Lazy loading with Intersection Observer API
- **Code Splitting** - Optimized bundle sizes with manual chunks
- **SEO Ready** - Meta tags, Open Graph, Twitter Cards, Structured Data
- **Fast Build Times** - Powered by Vite for lightning-fast development
- **Production Ready** - Optimized builds with tree-shaking and minification

### 📱 Content Sections
- **Hero** - Eye-catching introduction with animated elements
- **About** - Personal bio with highlights and gallery
- **Skills** - Interactive skill categories with detailed project usage
- **Education** - Academic timeline with achievements and image gallery
- **Experience** - Professional journey with detailed role information
- **Projects** - Portfolio showcase with filtering and image galleries
- **Achievements** - Awards, competitions, and recognitions
- **Certifications** - Professional certifications and badges
- **Contact** - Functional contact form with EmailJS integration

### 🛣️ Multi-Page Architecture
- **Dedicated Pages** - Separate pages for Projects, Achievements, Education, and Experience
- **Smooth Navigation** - Hash routing for section navigation on homepage
- **Back Navigation** - Easy navigation between pages
- **404 Page** - Custom not-found page with helpful quick links
- **Image Preview Sidebar** - Interactive image preview for projects, education, and experience

## 🛠️ Tech Stack

### Core
- **React 19.2** - Latest React with concurrent features
- **Vite 7** - Next generation frontend tooling with optimized build
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM 7** - Client-side routing

### Libraries
- **Framer Motion 12** - Production-ready motion library
- **React Icons 5** - Popular icon packs as React components
- **EmailJS 4** - Email service for contact form

### Development Tools
- **ESLint** - Code linting and formatting
- **PropTypes** - Runtime type checking for React props

## 📁 Project Structure

```
profile/
├── .env.example               # 🆕 Environment variables template
├── .gitignore                 # Git ignore patterns
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── vite.config.js            # 🆕 Vite configuration with optimizations
├── eslint.config.js          # ESLint configuration
├── public/
│   ├── images/               # Organized image assets
│   │   ├── achievements/     # Achievement photos and certificates
│   │   ├── blog/            # Blog post images
│   │   ├── education/       # 🆕 Education-related images
│   │   ├── experience/      # Work photos and company logos
│   │   ├── gallery/         # Personal gallery
│   │   ├── hero/            # Hero section and avatars
│   │   ├── projects/        # Project screenshots
│   │   │   ├── rtmnu_project/
│   │   │   ├── alumnet_project/
│   │   │   ├── nmc_project/
│   │   │   └── ...
│   │   └── others/          # Miscellaneous images
│   └── resume/              # Resume PDF
└── src/
    ├── components/
    │   ├── common/          # Shared layout components
    │   │   ├── ErrorBoundary.jsx    # Error handling
    │   │   ├── Footer.jsx           # Site footer
    │   │   ├── Layout.jsx           # Page layout wrapper
    │   │   ├── Logo.jsx             # Brand logo
    │   │   ├── Navbar.jsx           # Navigation bar
    │   │   ├── ScrollToTop.jsx      # Scroll restoration
    │   │   ├── SEO.jsx              # SEO meta tags
    │   │   └── SkipNavigation.jsx   # Accessibility helper
    │   ├── sections/        # Homepage sections
    │   │   ├── About.jsx
    │   │   ├── Achievements.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Education.jsx
    │   │   ├── Experience.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Projects.jsx
    │   │   └── Skills.jsx
    │   └── ui/              # 🆕 Modular reusable UI components
    │       ├── AchievementCard.jsx
    │       ├── Badge.jsx
    │       ├── Button.jsx
    │       ├── Card.jsx
    │       ├── CertificationCard.jsx
    │       ├── EducationCard.jsx    # 🆕 Modular education display
    │       ├── ExperienceCard.jsx   # 🆕 Modular experience display
    │       ├── ImageGallery.jsx
    │       ├── ImagePreviewSidebar.jsx
    │       ├── LazyImage.jsx
    │       ├── ProjectCard.jsx
    │       ├── Section.jsx
    │       └── ThemeToggle.jsx
    ├── constants/           # 🆕 Configuration constants
    │   ├── accessibilityConfig.js
    │   ├── contactInfo.js
    │   ├── emailConfig.js   # 🆕 EmailJS config with env vars
    │   ├── navigationConfig.js
    │   ├── socialLinks.js
    │   ├── uiConfig.js
    │   ├── validationConfig.js
    │   └── index.js         # Centralized exports
    ├── context/
    │   └── ThemeContext.jsx # Theme state management
    ├── data/                # JSON data files (data-driven)
    │   ├── achievements.json
    │   ├── activities.json
    │   ├── blogs.json
    │   ├── certifications.json
    │   ├── education.json
    │   ├── experience.json
    │   ├── index.js         # Centralized data exports
    │   ├── profile.json
    │   ├── projects.json
    │   ├── site.json
    │   └── skills.json
    ├── hooks/               # Custom React hooks
    │   ├── index.js
    │   ├── useActiveSection.js
    │   ├── useForm.js
    │   ├── usePreview.js
    │   ├── useSmoothScroll.js
    │   └── useWindowSize.js
    ├── pages/               # Route pages
    │   ├── AchievementsPage.jsx
    │   ├── EducationPage.jsx        # 🆕 Education timeline page
    │   ├── ExperiencePage.jsx
    │   ├── Home.jsx
    │   ├── NotFound.jsx
    │   ├── ProjectsPage.jsx
    │   └── index.js
    ├── utils/               # Utility functions
    │   ├── dateUtils.js
    │   ├── iconMap.js
    │   └── index.js
    ├── App.jsx              # Root component with routing
    ├── App.css
    ├── index.css            # Global styles + Tailwind
    └── main.jsx             # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **EmailJS Account** (for contact form functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adarsh47-bug/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables** 🆕
   
   a. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   b. Sign up at [EmailJS](https://www.emailjs.com/)
   
   c. Get your credentials from EmailJS dashboard:
      - Service ID
      - Template ID
      - Public Key
   
   d. Update `.env` with your credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
   
   ⚠️ **Important**: Never commit the `.env` file to version control!

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser** at `http://localhost:3000`

## 🎨 Customization

## 🎨 Customization

### Personal Information

Update [src/data/profile.json](src/data/profile.json):

```json
{
  "name": "Your Name",
  "title": "Your Professional Title",
  "tagline": "A brief tagline about yourself",
  "bio": "Your professional bio",
  "email": "your.email@example.com",
  "phone": "+1234567890",
  "location": "City, Country",
  "resumeUrl": "/resume/your-resume.pdf",
  "avatar": "/images/hero/your-avatar.png",
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "twitter": "https://twitter.com/yourhandle"
  }
}
```

### Projects

Add/edit projects in [src/data/projects.json](src/data/projects.json):

```json
{
  "id": "unique-project-id",
  "title": "Project Name",
  "description": "Brief description for card display",
  "longDescription": "Detailed description for project page",
  "techStack": ["React", "Node.js", "MongoDB"],
  "category": "Web App",
  "status": "Completed",
  "featured": true,
  "image": "/images/projects/project-folder/cover.png",
  "images": [
    "/images/projects/project-folder/screenshot-1.png",
    "/images/projects/project-folder/screenshot-2.png"
  ],
  "links": {
    "github": "https://github.com/user/repo",
    "live": "https://project-demo.com",
    "demo": "https://youtube.com/watch?v=demo-video"
  },
  "date": "2024-01-01"
}
```

### Skills

Update [src/data/skills.json](src/data/skills.json):

```json
{
  "categories": [
    {
      "id": "frontend",
      "name": "Frontend",
      "icon": "FaDesktop",
      "skills": [
        {
          "name": "React.js",
          "level": "Advanced",
          "icon": "SiReact",
          "projects": ["Project 1", "Project 2"]
        }
      ]
    }
  ]
}
```

### Education & Experience

Update [src/data/education.json](src/data/education.json) and [src/data/experience.json](src/data/experience.json) with your academic and professional information. Both support:
- Timeline displays
- Image galleries
- Achievements/Highlights
- Current status indicators

### Adding Images

1. **Organize images** in [public/images/](public/images/) following the folder structure
2. **Naming convention**: Use kebab-case (`project-name-screenshot-1.png`)
3. **Optimize before adding**: Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
4. **Recommended dimensions**:
   - Project screenshots: 1920x1080px (16:9)
   - Company logos: 400x400px (square, transparent)
   - Hero/Avatar: 400x400px or 1920x1080px
   - Certificates: Original size, optimized

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload (runs on port 3000)
npm run dev

# Build for production (optimized bundle in dist/)
npm run build

# Preview production build locally (runs on port 4173)
npm run preview

# Lint code with ESLint
npm run lint
```

### Environment Variables

The application uses environment variables for sensitive configuration:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | Yes (for contact form) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | Yes (for contact form) |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | Yes (for contact form) |

**Note**: All environment variables must be prefixed with `VITE_` to be accessible in the application.

### Code Structure Guidelines

- **Components**: Small, focused, reusable, with clear responsibilities
- **Props Validation**: Use PropTypes for all component props
- **Data-driven**: Content in JSON files, not hardcoded in components
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Performance**: Lazy loading, code splitting, optimized images
- **SEO**: Meta tags, structured data, semantic markup
- **Modularity**: Reusable UI components exported from `components/ui`
- **Constants**: Configuration values in `constants/` directory

### Component Architecture

The project follows a modular component architecture:

```
components/
├── common/        # Layout and structural components
├── sections/      # Page sections (About, Projects, etc.)
└── ui/           # Reusable UI components
    ├── ProjectCard.jsx      # Modular project display
    ├── EducationCard.jsx    # Modular education display
    ├── ExperienceCard.jsx   # Modular experience display
    └── ...
```

All card components share a consistent API:
- `variant` prop: `'default'`, `'compact'`, `'detailed'`
- `onClick` handler for interactive previews
- `showTimeline` for timeline layouts
- Proper PropTypes validation

## 📦 Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder with:
- ✅ Minified and compressed JS/CSS
- ✅ Optimized assets with hashed filenames
- ✅ Tree-shaken bundles (unused code removed)
- ✅ Code splitting for optimal loading
- ✅ Vendor chunks for better caching

### Build Optimizations

The `vite.config.js` includes:
- **Manual Chunks**: Vendor code split for better caching
  - `react-vendor`: React core libraries
  - `animation-vendor`: Framer Motion
  - `icons-vendor`: React Icons
- **Port Configuration**: Dev server on 3000, preview on 4173
- **Auto-open**: Browser automatically opens on server start

## 🌐 Deployment

### Environment Variables in Production

When deploying, make sure to set environment variables in your hosting platform:

**Vercel/Netlify:**
1. Go to Project Settings → Environment Variables
2. Add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
3. Redeploy the application

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub/GitLab/Bitbucket
2. Import repository in Vercel
3. Add environment variables in project settings
4. Deploy automatically on every push

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Push code to GitHub
2. Connect repository to Netlify  
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Add environment variables in site settings
5. Deploy automatically on push

### GitHub Pages

```bash
npm install -g gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**Note**: Update `base` in `vite.config.js` for GitHub Pages:
```javascript
export default defineConfig({
  base: '/repository-name/',
  // ... other config
})
```

### Other Platforms

The site can be deployed to any static hosting service:
- **Firebase Hosting** - `firebase deploy`
- **AWS S3 + CloudFront** - Static website hosting
- **DigitalOcean App Platform** - Automatic deploys from Git
- **Render** - Static site hosting with auto-deploy
- **Surge** - Quick static hosting: `surge dist/`

## 📊 Performance

### Optimization Features

- ✅ **Route-based code splitting** - Pages loaded on demand
- ✅ **Image lazy loading** - Images load only when visible
- ✅ **Component lazy loading** - React.lazy() for heavy components
- ✅ **Tree shaking** - Unused code eliminated
- ✅ **Minification** - JS, CSS, and HTML minified
- ✅ **Cache optimization** - Efficient browser caching with hashed filenames
- ✅ **Vendor chunking** - Third-party libraries cached separately

### Performance Targets

| Metric | Target | Description |
|--------|--------|-------------|
| **First Contentful Paint (FCP)** | < 1.5s | When first content appears |
| **Largest Contentful Paint (LCP)** | < 2.5s | When main content loads |
| **Time to Interactive (TTI)** | < 3.0s | When page becomes interactive |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Visual stability score |
| **Lighthouse Score** | 90+ | Overall performance rating |

## 🎯 SEO Features

- ✅ **Dynamic meta tags** - Title, description, keywords per page
- ✅ **Open Graph tags** - Rich social media previews
- ✅ **Twitter Cards** - Optimized Twitter sharing
- ✅ **Structured data** - Schema.org JSON-LD for rich snippets
- ✅ **Canonical URLs** - Prevent duplicate content issues
- ✅ **Semantic HTML** - Proper heading hierarchy (h1 → h6)
- ✅ **Alt text** - Descriptive alt text for all images
- ✅ **Mobile-friendly** - Responsive and touch-optimized
- ✅ **Fast loading** - Optimized for Core Web Vitals

## 🔒 Security Best Practices

- ✅ **Environment Variables** - Sensitive data in `.env` files
- ✅ **Git Ignore** - `.env` files excluded from version control
- ✅ **No Hardcoded Secrets** - All credentials via environment variables
- ✅ **Validation** - Runtime validation for configuration
- ✅ **HTTPS Only** - Enforced in production deployments

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📝 Changelog

### Version 3.0.0 (Latest) 🆕
- ✨ **Environment Variables**: Implemented `.env` configuration for EmailJS
- ✨ **Modular Components**: Created EducationCard and ExperienceCard components
- ✨ **Enhanced Documentation**: Comprehensive README with setup instructions
- ✨ **Build Optimizations**: Configured Vite with vendor chunking
- ✨ **Image Preview Sidebar**: Added interactive image previews for all sections
- ✨ **Security**: Moved sensitive configuration to environment variables
- 🎨 **Improved Architecture**: Consistent component API across the app
- ⚡ **Performance**: Optimized bundle sizes and caching strategies

### Version 2.0.0
- ✨ Added multi-page routing (Projects, Achievements, Experience, Education pages)
- ✨ Implemented lazy loading for images and routes
- ✨ Added Error Boundaries for graceful error handling
- ✨ Enhanced SEO with custom meta tags and structured data
- 🎨 Improved UI/UX with dedicated pages
- ⚡ Performance optimizations

### Version 1.0.0
- Initial release with all core sections
- Dark mode support
- Responsive design
- Contact form integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Adarsh Kadam**
- 🌐 Website: [adarshkadam.is-a.dev](https://adarshkadam.is-a.dev)
- 💼 LinkedIn: [Adarsh Kadam](https://linkedin.com/in/adarsh-kadam-3aa5b7248)
- 🐱 GitHub: [@adarsh47-bug](https://github.com/adarsh47-bug)  
- 📧 Email: adarshkadam5977@gmail.com

## 🙏 Acknowledgments

- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Email service by [EmailJS](https://www.emailjs.com/)
- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">

**Made with ❤️ by Adarsh Kadam**

</div>
