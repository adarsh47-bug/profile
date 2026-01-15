# Images Folder Structure

This document outlines the organized structure of images used throughout the portfolio website.

## 📁 Directory Structure

```
images/
├── achievements/          # Achievement certificates and award photos
├── certifications/        # Professional certifications and badges
├── companies/            # Company logos and branding
├── education/            # Educational institution photos and logos
├── gallery/              # Personal/professional photo gallery
├── hero/                 # Hero section backgrounds and avatars
├── projects/             # Project screenshots and demos
│   ├── rtmnu/           # RTMNU Student Development App
│   ├── alumnet/         # Alumnet Platform
│   ├── nmc-skysign/     # NMC Sky Sign Department
│   ├── seva/            # SEVA Akola Project
│   ├── srpf/            # SRPF Tribal PWD
│   ├── spark/           # SPARK Hosting Platform
│   └── others/          # Other projects
└── experience/           # Work experience photos and events
    ├── embedded-creations/
    └── techthinkers/
```

## 📋 Current File Mapping

### Projects
- **RTMNU App**: `rtmnu_project/mobile_app_1.png` to `mobile_app_6.png`
- **Alumnet**: `alumnet_project/1.png` to `14.png`
- **NMC Sky Sign**: `nmc_project/nmc_project_1.jpg` to `nmc_project_4.jpg`
- **SEVA Akola**: `seva_project/seva_0.png` to `seva_7.jpg`
- **SRPF**: `srpf_project/srpf_1.jpg`, `srpf_2.jpg`
- **SPARK**: `spark_project/spark_1.jpeg` to `spark_5.jpg`

### Achievements
- **Ideathon 2024**: `ideathon/ideathon_1.jpg` to `ideathon_5.jpg`
- **Web Jam 2023**: `ycce_tech_fest23/web_jam_1_1.jpg` to `web_jam_1_3.jpg`
- **Web Jam 2024**: `ycce_tech_fest24/web_jam_2_1.jpg` to `web_jam_2_4.jpg`
- **T-Icon 2023**: `ycce_tech_fest23/t_icon_1.jpg` to `t_icon_3.jpg`
- **RTMNU Downloads**: `achievements/Rtmnu_downloads.png`

### Certifications
- **Postman**: `achievements/Postman_Student_Expert.png`
- **Java NPTEL**: `achievements/Programming_in_Java_.jpg`
- **JavaScript Udemy**: `achievements/Js_udemy.png`
- **Web Dev Udemy**: `achievements/Web_udemy.png`

### Experience
- **Embedded Creations**: `EC_internship/` (offer letters, certificates)
- **TechThinkers**: `TechThinkers Coding Club Seminar/seminar_1_1.jpg` to `seminar_1_6.jpg`

### Hero & Avatar
- `hero/avatar.jpg`, `avatar_2.png`, `avatar_3.jpg`

### Gallery/Others
- NMC AI Discussion: `others/npm_ai_discussion_1.jpg` to `npm_ai_discussion_4.jpg`
- Other Activities: `others/other_activities_1_1.jpg`, `other_activities_1_2.jpg`
- HOD Photo: `others/photo_with_it_hod.jpg`

## 🎨 Image Guidelines

### File Naming Convention
- Use **kebab-case**: `project-name-screenshot-1.jpg`
- Be descriptive: `rtmnu-app-home-screen.png` instead of `img1.png`
- Add sequence numbers for series: `-1`, `-2`, `-3`

### Recommended Formats
- **Screenshots/Photos**: WebP (best compression) or PNG (lossless quality)
- **Logos**: SVG (scalable) or PNG with transparent background
- **Thumbnails**: WebP or JPEG (optimized)

### Optimal Dimensions
- **Project screenshots**: 1920x1080px (16:9 ratio) or 1200x800px
- **Company logos**: 400x400px square, transparent background
- **Hero images**: 1920x1080px or larger
- **Avatar**: 400x400px square
- **Thumbnails**: 300x200px
- **Gallery images**: 1200x800px or maintain original aspect ratio

### Optimization Best Practices
1. **Compress images** before uploading (use tools like TinyPNG, Squoosh)
2. **Target file sizes**:
   - Screenshots: < 200KB
   - Logos: < 50KB
   - Hero images: < 300KB
3. **Use responsive images** with multiple sizes for different devices
4. **Add alt text** for accessibility (handled in components)

## 🔄 Migration Notes

Current structure needs reorganization:
- Move project-specific folders into `projects/` subdirectory
- Separate certifications from achievements
- Create `companies/` folder for logos
- Standardize naming conventions

## 📝 Usage in Code

Images are referenced relative to `/public/images/`:
```javascript
// Correct
<img src="/images/projects/rtmnu/screenshot-1.png" alt="RTMNU App" />

// Avoid
<img src="../images/rtmnu_project/mobile_app_1.png" />
```

## ✅ Checklist for Adding New Images

- [ ] Optimize image file size
- [ ] Use descriptive, kebab-case filename
- [ ] Place in appropriate category folder
- [ ] Update relevant JSON data file
- [ ] Verify image loads correctly in development
- [ ] Test responsive behavior on different screen sizes
