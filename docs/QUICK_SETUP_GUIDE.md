# Quick Setup Guide

This guide will help you get the portfolio website up and running in minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- EmailJS account (free tier is fine)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/adarsh47-bug/portfolio.git
cd portfolio

# Install dependencies
npm install
```

## Step 2: Configure Environment Variables

### 2.1 Create .env file

```bash
# Copy the example file
cp .env.example .env
```

### 2.2 Get EmailJS Credentials

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Create an Email Service:
   - Go to Email Services → Add New Service
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Copy the **Service ID**

4. Create an Email Template:
   - Go to Email Templates → Create New Template
   - Design your template or use this basic one:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Message: {{message}}
     ```
   - Save and copy the **Template ID**

5. Get your Public Key:
   - Go to Account → API Keys
   - Copy your **Public Key**

### 2.3 Update .env file

Open `.env` and add your credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 3: Customize Your Data

### Personal Information

Edit `src/data/profile.json`:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "email": "your.email@example.com",
  "phone": "+1234567890",
  "location": "City, Country",
  ...
}
```

### Projects

Add your projects in `src/data/projects.json`:

```json
{
  "projects": [
    {
      "id": "project-1",
      "title": "Project Name",
      "description": "Description",
      "techStack": ["React", "Node.js"],
      ...
    }
  ]
}
```

### Skills, Experience, Education

Update the respective JSON files in `src/data/`:
- `skills.json`
- `experience.json`
- `education.json`
- `achievements.json`

## Step 4: Add Your Images

1. Place images in `public/images/` following the folder structure
2. Update image paths in your JSON data files
3. Optimize images before adding (use [TinyPNG](https://tinypng.com/))

**Recommended folder structure:**
```
public/images/
├── hero/           # Your profile photos
├── projects/       # Project screenshots
├── experience/     # Company logos
├── education/      # Certificates
└── achievements/   # Award photos
```

## Step 5: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Step 6: Test Contact Form

1. Navigate to the Contact section
2. Fill out the form with test data
3. Submit and check if you receive the email
4. If not working, verify:
   - Environment variables are set correctly
   - EmailJS service and template are active
   - No console errors in browser DevTools

## Step 7: Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

The optimized files will be in the `dist/` folder.

## Common Issues

### Contact form not working

**Problem**: Form submits but no email received

**Solution**:
1. Check browser console for errors
2. Verify environment variables in `.env`
3. Check EmailJS dashboard for service status
4. Ensure template variables match: `from_name`, `from_email`, `message`

### Environment variables not loading

**Problem**: `undefined` errors for EmailJS config

**Solution**:
1. Restart dev server after changing `.env`
2. Verify variables start with `VITE_` prefix
3. Check `.env` is in project root directory
4. No quotes needed around values in `.env`

### Images not loading

**Problem**: Broken image links

**Solution**:
1. Verify images are in `public/images/`
2. Check paths start with `/images/` in JSON files
3. Ensure filenames match exactly (case-sensitive)
4. Check image file extensions (.png, .jpg, .svg)

### Build errors

**Problem**: Build fails with errors

**Solution**:
1. Run `npm run lint` to check for code issues
2. Verify all imports are correct
3. Check for missing dependencies: `npm install`
4. Clear cache: `rm -rf node_modules dist && npm install`

## Next Steps

1. **Customize Design**: Modify colors in Tailwind config
2. **Add Analytics**: Set up Google Analytics (see `.env.example`)
3. **Deploy**: Follow deployment guide in README.md
4. **SEO**: Update meta tags in `src/data/site.json`
5. **Performance**: Run Lighthouse audit and optimize

## Need Help?

- 📖 Read the full [README.md](../README.md)
- 🤝 Check [CONTRIBUTING.md](../CONTRIBUTING.md)
- 🐛 [Open an issue](https://github.com/adarsh47-bug/portfolio/issues)
- 📧 Email: adarshkadam5977@gmail.com

---

**Estimated Setup Time**: 15-20 minutes

Happy coding! 🚀
