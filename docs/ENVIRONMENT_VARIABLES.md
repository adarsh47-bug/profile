# Environment Variables Configuration

This document provides comprehensive information about environment variables used in the portfolio website.

## Overview

The application uses environment variables to manage sensitive configuration data and API credentials. This approach follows security best practices by:

- ✅ Keeping sensitive data out of source code
- ✅ Preventing accidental exposure in version control
- ✅ Enabling different configurations for different environments
- ✅ Making deployment easier across platforms

## Required Environment Variables

### EmailJS Configuration

These variables are **required** for the contact form to function:

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service identifier | `service_abc123` | Yes |
| `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS email template ID | `template_xyz789` | Yes |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public API key | `user_123abcXYZ` | Yes |

## Setup Instructions

### 1. Create Environment File

Copy the example file to create your local environment configuration:

```bash
cp .env.example .env
```

### 2. Get EmailJS Credentials

#### Step 2.1: Create EmailJS Account

1. Visit [EmailJS Website](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

#### Step 2.2: Set Up Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - Gmail (recommended for personal use)
   - Outlook
   - Yahoo
   - Custom SMTP
4. Follow the provider-specific setup
5. Copy the **Service ID** (e.g., `service_abc123`)

#### Step 2.3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```html
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
Sent via Portfolio Contact Form
```

4. Save the template
5. Copy the **Template ID** (e.g., `template_xyz789`)

#### Step 2.4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called User ID)
3. Copy the key (e.g., `user_123abcXYZ`)

### 3. Update .env File

Open your `.env` file and add your credentials:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_123abcXYZ
```

**Important Notes:**
- No quotes needed around values
- No spaces around the `=` sign
- Must use `VITE_` prefix for Vite to expose variables
- Restart dev server after changes

### 4. Verify Configuration

The application will automatically validate configuration on startup:

```javascript
// Validation happens in src/constants/emailConfig.js
if (missing environment variables) {
  console.warn('Missing environment variables...');
}
```

Check browser console for any configuration warnings.

## Environment Files

### .env (Local Development)

**Location**: Project root  
**Purpose**: Local development configuration  
**Git Status**: ❌ Ignored (never commit!)

```env
# Local development configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_123abcXYZ
```

### .env.example (Template)

**Location**: Project root  
**Purpose**: Template for other developers  
**Git Status**: ✅ Committed

```env
# Example configuration - Replace with actual values
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Deployment Configuration

### Vercel

1. Go to **Project Settings** → **Environment Variables**
2. Add each variable:
   - Name: `VITE_EMAILJS_SERVICE_ID`
   - Value: `service_abc123`
   - Environment: `Production`, `Preview`, `Development`
3. Repeat for all variables
4. Redeploy the application

### Netlify

1. Go to **Site Settings** → **Build & Deploy** → **Environment**
2. Click **Edit variables**
3. Add variables:
   ```
   VITE_EMAILJS_SERVICE_ID = service_abc123
   VITE_EMAILJS_TEMPLATE_ID = template_xyz789
   VITE_EMAILJS_PUBLIC_KEY = user_123abcXYZ
   ```
4. Click **Save**
5. Trigger a new deployment

### GitHub Pages

Environment variables are not directly supported. You have two options:

**Option 1**: Use GitHub Actions
```yaml
# .github/workflows/deploy.yml
env:
  VITE_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
  VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
  VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
```

**Option 2**: Hard-code in build (not recommended)
```javascript
// Only for GitHub Pages if needed
const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',
  // ... rest of config
};
```

### Other Platforms

**Firebase Hosting:**
```bash
firebase functions:config:set emailjs.service_id="service_abc123"
```

**AWS Amplify:**
Add in **Build Settings** → **Environment Variables**

**DigitalOcean App Platform:**
Add in **Settings** → **App-Level Environment Variables**

## Security Best Practices

### ✅ DO

- Store credentials in `.env` file
- Add `.env` to `.gitignore`
- Use environment-specific values
- Rotate keys periodically
- Use EmailJS rate limiting
- Monitor usage in EmailJS dashboard

### ❌ DON'T

- Commit `.env` file to Git
- Hard-code credentials in source files
- Share credentials publicly
- Use production keys in development
- Store credentials in client-side code (except via env vars)

## Troubleshooting

### "Missing environment variables" Warning

**Cause**: Environment variables not loaded

**Solutions**:
1. Verify `.env` file exists in project root
2. Check variable names match exactly (including `VITE_` prefix)
3. Restart development server
4. Clear browser cache

### Contact Form Not Sending Emails

**Cause**: Incorrect or missing credentials

**Solutions**:
1. Verify credentials in `.env` match EmailJS dashboard
2. Check EmailJS service is active
3. Verify template variables match form fields
4. Check browser console for errors
5. Test EmailJS in their dashboard

### Variables Undefined in Production

**Cause**: Environment variables not set in hosting platform

**Solutions**:
1. Add variables in hosting platform settings
2. Redeploy application
3. Check build logs for errors
4. Verify variable names match

### EmailJS 401 Unauthorized Error

**Cause**: Invalid public key

**Solutions**:
1. Verify public key in EmailJS dashboard
2. Regenerate public key if needed
3. Update `.env` with new key
4. Restart server

## Additional Configuration (Optional)

### Analytics

Add analytics tracking IDs:

```env
# Google Analytics
VITE_GA_TRACKING_ID=UA-XXXXX-X

# Google Tag Manager
VITE_GTM_ID=GTM-XXXXX
```

Usage in code:
```javascript
const GA_ID = import.meta.env.VITE_GA_TRACKING_ID;
```

### Feature Flags

Control feature availability:

```env
# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANIMATIONS=true
```

### API Configuration

Add external API URLs:

```env
# External APIs
VITE_API_BASE_URL=https://api.example.com
VITE_API_KEY=your_api_key_here
```

## Accessing Environment Variables

### In JavaScript/React

```javascript
// Access environment variables
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const isDev = import.meta.env.DEV; // Built-in Vite variable
const mode = import.meta.env.MODE; // 'development' or 'production'

// Check if variable exists
if (!import.meta.env.VITE_EMAILJS_SERVICE_ID) {
  console.warn('EmailJS not configured');
}
```

### Built-in Vite Variables

Vite provides these automatically:

| Variable | Description |
|----------|-------------|
| `import.meta.env.MODE` | App mode: `'development'` or `'production'` |
| `import.meta.env.DEV` | Boolean: `true` in development |
| `import.meta.env.PROD` | Boolean: `true` in production |
| `import.meta.env.BASE_URL` | Base URL of the app |

## References

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)

---

**Last Updated**: January 2026  
**Version**: 3.0.0
