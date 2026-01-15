# 📦 Project Constants & Modularity - Quick Reference Guide

## 🗂️ Directory Structure

```
src/
├── constants/                          ← All centralized constants
│   ├── index.js                       ← Export hub (21 exports)
│   ├── socialLinks.js                 ← Social media config
│   ├── contactInfo.js                 ← Contact display config
│   ├── emailConfig.js                 ← EmailJS credentials
│   ├── uiConfig.js                    ← UI/Animation config (NEW)
│   └── validationConfig.js            ← Form validation (NEW)
│
├── components/
│   ├── common/
│   │   ├── Logo.jsx                   ← Responsive logo (NEW)
│   │   ├── Navbar.jsx                 ← Uses <Logo size="sm" />
│   │   ├── Footer.jsx                 ← Uses <Logo size="md" /> + getSocialLinks
│   │   └── index.js                   ← Updated exports
│   │
│   └── sections/
│       ├── Hero.jsx                   ← Uses getSocialLinks
│       └── Contact.jsx                ← Uses all constants

├── data/
│   ├── profile.json                   ← Contains domain, social, etc.
│   └── ...

└── ...
```

---

## 🚀 Quick Import Guide

### Import All Constants (Recommended)
```javascript
import { 
  getSocialLinks, 
  getContactInfo,
  EMAILJS_CONFIG,
  COLORS,
  STAGGER_ANIMATIONS,
  FORM_VALIDATION,
  ERROR_MESSAGES
} from '../../constants';
```

### Import by Category
```javascript
// UI & Animations
import { COLORS, STAGGER_ANIMATIONS } from '../../constants/uiConfig';

// Validation
import { FORM_VALIDATION, EMAIL_REGEX } from '../../constants/validationConfig';

// Functions
import { getSocialLinks } from '../../constants/socialLinks';
```

---

## 🎨 Using Logo Component

### In Navbar (Compact)
```jsx
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav>
      <Logo size="sm" />
    </nav>
  );
}
```

### In Footer (Standard)
```jsx
import Logo from './Logo';

export default function Footer() {
  return (
    <footer>
      <Logo size="md" animated={false} />
    </footer>
  );
}
```

### Size Variants
```jsx
<Logo size="sm" />   // Mobile-friendly, text-lg md:text-xl
<Logo size="md" />   // Default, text-xl md:text-2xl (RECOMMENDED)
<Logo size="lg" />   // Large, text-2xl md:text-3xl
```

### With Custom Styling
```jsx
<Logo 
  size="md" 
  className="tracking-wider"
  animated={true}
/>
```

---

## 📱 Responsive Behavior

### Mobile Display (<640px)
```
[adarshkadam]. [dev]
└─ truncated ────┬─────┘ └─ color-coded ─┘
              max-w-[150px]
```

### Desktop Display (≥640px)
```
[adarshkadam].[is-a].[dev]
└─────────────┬────────────┘
        Full domain display
```

---

## 🎯 Constants Overview

### Social Links
```javascript
const socialLinks = getSocialLinks(profileData.social);
// Returns: [
//   { icon: FaGithub, href: "...", label: "GitHub", color: "...", platform: "github" },
//   { icon: FaLinkedin, href: "...", label: "LinkedIn", color: "...", platform: "linkedin" },
//   ...
// ]
```

### Contact Info
```javascript
const contactInfo = getContactInfo(profileData);
// Returns: [
//   { icon: FaEnvelope, label: "Email", value: "...", href: "...", color: "..." },
//   { icon: FaPhone, label: "Phone", value: "...", href: "...", color: "..." },
//   { icon: FaMapMarkerAlt, label: "Location", value: "...", color: "..." }
// ]
```

### UI Config
```javascript
// Animations
ANIMATION_DURATION.fast      // 0.2s
ANIMATION_DURATION.normal    // 0.3s
STAGGER_ANIMATIONS.container // Framer Motion variants

// Colors
COLORS.primary      // #3b82f6
COLORS.slate[900]   // #0f172a

// Sizing
BREAKPOINTS.sm      // 640
BREAKPOINTS.md      // 768
SPACING.md          // 1rem (16px)
```

### Validation Config
```javascript
// Rules
FORM_VALIDATION.email.pattern    // EMAIL_REGEX
FORM_VALIDATION.message.minLength // 10

// Messages
ERROR_MESSAGES.emailInvalid      // "Please enter a valid email address"
SUCCESS_MESSAGES.submitSuccess   // "Message sent successfully! 🎉"

// Navigation
NAVIGATION_PATHS.about           // "/#about"
```

---

## 💡 Usage Examples

### Hero Component
```jsx
import { getSocialLinks } from '../../constants';

export default function Hero() {
  const socialLinks = getSocialLinks(profileData.social);
  
  return (
    <motion.div className="flex gap-3">
      {socialLinks.map((social) => (
        <motion.a
          key={social.platform}
          href={social.href}
          className={`p-3 rounded-xl ${social.color}`}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </motion.div>
  );
}
```

### Footer Component
```jsx
import Logo from './Logo';
import { getSocialLinks } from '../../constants';

export default function Footer() {
  const socialLinks = getSocialLinks(profileData.social);
  
  return (
    <footer>
      <Logo size="md" />
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <a key={social.platform} href={social.href}>
            <social.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </footer>
  );
}
```

### Contact Form Validation
```jsx
import { FORM_VALIDATION, ERROR_MESSAGES } from '../../constants';

function validateForm(formData) {
  const errors = {};
  
  if (formData.name.length < FORM_VALIDATION.name.minLength) {
    errors.name = ERROR_MESSAGES.nameInvalid;
  }
  
  if (!FORM_VALIDATION.email.pattern.test(formData.email)) {
    errors.email = ERROR_MESSAGES.emailInvalid;
  }
  
  return errors;
}
```

---

## 🔍 Finding Constants

### Q: Where are animation durations defined?
**A:** `src/constants/uiConfig.js` → `ANIMATION_DURATION`

### Q: How do I add a new social network?
**A:** Edit `src/data/profile.json` → Add to `social` object, then update `src/constants/socialLinks.js`

### Q: How do I change the primary color?
**A:** `src/constants/uiConfig.js` → `COLORS.primary`

### Q: Where are form error messages?
**A:** `src/constants/validationConfig.js` → `ERROR_MESSAGES`

### Q: How do I make the Logo bigger on mobile?
**A:** Update `Logo.jsx` → `sizeClasses` object's `sm` variant

---

## ✅ Verification Checklist

- [x] All constants exported from `src/constants/index.js`
- [x] Logo component works on all devices
- [x] Components use `getSocialLinks` not individual icons
- [x] Footer uses Logo component
- [x] Navbar uses Logo component
- [x] Hero uses social links from constants
- [x] Build succeeds without errors
- [x] No hardcoded values in components

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| **Constants Files** | 6 |
| **Exported Constants** | 21 |
| **Total Constant Lines** | 369 |
| **Components Using Constants** | 4 |
| **New Components** | 1 (Logo) |
| **Responsive Breakpoints** | 5 |
| **Build Size** | ~40KB (gzipped) |
| **Build Time** | ~9 seconds |

---

## 🎓 Best Practices

### DO ✅
```javascript
// Import from constants index
import { getSocialLinks, COLORS } from '../../constants';

// Use constants in components
const colors = COLORS;

// Group related constants
const sizes = COMPONENT_SIZES.button;

// Create new constants when needed
export const MY_CONFIG = { ... };
```

### DON'T ❌
```javascript
// Don't hardcode values
className="text-blue-600"  // Use COLORS.primary

// Don't create constants in components
const socialLinks = getSocialLinks(...); // OK, but put logic in constants

// Don't import from specific files
import { COLORS } from '../../constants/uiConfig'; // Use index.js instead
```

---

## 🚨 Troubleshooting

### Error: "FaGithub is not defined"
**Solution:** Import from constants, not component
```javascript
// ❌ Wrong
import { FaGithub } from 'react-icons/fa';

// ✅ Right
import { getSocialLinks } from '../../constants';
const socialLinks = getSocialLinks(profileData.social);
```

### Error: "socialLinks is not defined"
**Solution:** Initialize in component
```javascript
export default function MyComponent() {
  const socialLinks = getSocialLinks(profileData.social); // ADD THIS
  return (
    {socialLinks.map(...)}
  );
}
```

### Logo not responsive on mobile
**Solution:** Check if class is applied correctly
```javascript
// Verify these classes are present:
"truncate max-w-[150px] sm:max-w-none"
"hidden sm:inline"
```

---

## 📞 Support

For questions about constants or the Logo component, check:
1. [CONSTANTS_DOCUMENTATION.md](./CONSTANTS_DOCUMENTATION.md) - Full reference
2. [COMPLETION_REPORT.md](./COMPLETION_REPORT.md) - Implementation details
3. Source files in `src/constants/` directory

---

**Last Updated:** January 2026
**Build Status:** ✅ Success
**Constants Total:** 21 exported items
