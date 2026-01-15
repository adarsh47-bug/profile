# Contributing to Portfolio Website

First off, thank you for considering contributing to this project! 🎉

The following is a set of guidelines for contributing to this portfolio website. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Guidelines](#development-guidelines)
  - [Project Structure](#project-structure)
  - [Coding Standards](#coding-standards)
  - [Component Guidelines](#component-guidelines)
  - [Git Commit Messages](#git-commit-messages)
- [Setting Up Development Environment](#setting-up-development-environment)
- [Testing](#testing)

## Code of Conduct

This project and everyone participating in it is governed by a code of respect and professionalism. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
## Bug Description
A clear and concise description of what the bug is.

## Steps To Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
- OS: [e.g. Windows 10, macOS 12.0]
- Browser: [e.g. Chrome 96, Firefox 95]
- Node Version: [e.g. 18.0.0]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

**Enhancement Request Template:**
```markdown
## Feature Description
A clear description of the enhancement.

## Use Case
Explain why this enhancement would be useful.

## Proposed Solution
How you think this should be implemented.

## Alternatives Considered
Any alternative solutions or features you've considered.
```

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages** following our guidelines
6. **Submit a pull request** with a comprehensive description

**Pull Request Template:**
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- List of specific changes

## Testing
- [ ] Tested locally
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Works in dark mode

## Screenshots
If applicable, add screenshots.
```

## Development Guidelines

### Project Structure

```
src/
├── components/
│   ├── common/      # Shared layout components
│   ├── sections/    # Homepage sections
│   └── ui/          # Reusable UI components
├── constants/       # Configuration constants
├── data/           # JSON data files
├── hooks/          # Custom React hooks
├── pages/          # Route pages
└── utils/          # Utility functions
```

**Guidelines:**
- Keep components in appropriate directories
- Create new UI components in `components/ui/`
- Store configuration in `constants/`
- Keep all content in `data/` JSON files

### Coding Standards

#### JavaScript/React

```javascript
// ✅ Good - Descriptive names, proper formatting
export function EducationCard({ education, onClick, variant = 'default' }) {
  const handleClick = () => {
    onClick?.(education);
  };

  return (
    <Card onClick={handleClick}>
      {/* Component content */}
    </Card>
  );
}

// ❌ Bad - Poor naming, missing validation
export function EC({ e, o, v }) {
  return <div onClick={o}>{e.name}</div>;
}
```

**Best Practices:**
- Use functional components with hooks
- Add PropTypes for all components
- Use descriptive variable and function names
- Keep functions small and focused
- Extract reusable logic into custom hooks
- Use optional chaining (`?.`) for safe property access

#### CSS/Tailwind

```jsx
// ✅ Good - Organized, responsive, semantic classes
<div className="flex items-center gap-4 p-6 rounded-lg bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
    Title
  </h2>
</div>

// ❌ Bad - Unorganized, hard to read
<div className="flex gap-4 items-center bg-white p-6 rounded-lg dark:bg-slate-800 hover:shadow-lg transition-shadow">
  <h2 className="font-bold text-xl text-slate-900 dark:text-white md:text-2xl">
    Title
  </h2>
</div>
```

**Tailwind Class Order:**
1. Layout (flex, grid, block)
2. Positioning (relative, absolute)
3. Sizing (w-, h-)
4. Spacing (m-, p-, gap-)
5. Typography (text-, font-)
6. Visual (bg-, border-, shadow-)
7. Effects (transition-, hover:, dark:)

### Component Guidelines

#### Creating New Components

1. **Use the template structure:**

```javascript
import PropTypes from 'prop-types';

/**
 * ComponentName - Brief description
 * 
 * Features:
 * - List key features
 * - Explain purpose
 * 
 * @component
 */
export default function ComponentName({ 
  requiredProp, 
  optionalProp = 'default' 
}) {
  // Component logic here
  
  return (
    // JSX here
  );
}

ComponentName.propTypes = {
  requiredProp: PropTypes.string.isRequired,
  optionalProp: PropTypes.string,
};

ComponentName.defaultProps = {
  optionalProp: 'default',
};
```

2. **Follow naming conventions:**
   - Components: PascalCase (`EducationCard.jsx`)
   - Functions/variables: camelCase (`handleClick`)
   - Constants: UPPER_SNAKE_CASE (`EMAILJS_CONFIG`)
   - Files: Match component name

3. **Component responsibilities:**
   - Single responsibility principle
   - Maximum 300 lines per file
   - Extract complex logic to hooks
   - Keep JSX readable

#### Accessibility Requirements

```jsx
// ✅ Good - Accessible
<button
  onClick={handleClick}
  aria-label="Close modal"
  className="..."
>
  <FaTimes aria-hidden="true" />
</button>

<img
  src="/image.jpg"
  alt="Descriptive text about the image"
  loading="lazy"
/>

// ❌ Bad - Not accessible
<div onClick={handleClick}>
  <FaTimes />
</div>

<img src="/image.jpg" />
```

**Requirements:**
- Add ARIA labels to interactive elements
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Provide alt text for images
- Support keyboard navigation
- Ensure proper heading hierarchy

### Git Commit Messages

Use conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```bash
# Good commits
feat(ui): add EducationCard component with timeline support
fix(contact): resolve EmailJS configuration validation
docs(readme): update environment variables setup
refactor(components): extract common card logic to base component
perf(images): implement lazy loading for project screenshots

# Bad commits
fixed stuff
update
changes
wip
```

## Setting Up Development Environment

1. **Clone and install:**
   ```bash
   git clone https://github.com/adarsh47-bug/portfolio.git
   cd portfolio
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your EmailJS credentials
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the site:**
   - Development: http://localhost:3000
   - Preview build: `npm run preview` → http://localhost:4173

## Testing

### Manual Testing Checklist

Before submitting a PR, ensure:

- [ ] ✅ Tested on Chrome, Firefox, Safari
- [ ] ✅ Responsive on mobile (375px), tablet (768px), desktop (1920px)
- [ ] ✅ Dark mode works correctly
- [ ] ✅ No console errors or warnings
- [ ] ✅ All links work correctly
- [ ] ✅ Images load properly
- [ ] ✅ Animations are smooth
- [ ] ✅ Contact form works (if modified)
- [ ] ✅ Accessibility: keyboard navigation works
- [ ] ✅ Build succeeds: `npm run build`

### Performance Testing

- Run Lighthouse audit (target score: 90+)
- Check bundle size: `npm run build` and review `dist/` size
- Verify images are optimized
- Test on slow 3G connection

## Code Review Process

1. **Automated checks** will run on your PR
2. **Maintainer review** - usually within 2-3 days
3. **Feedback** - address any requested changes
4. **Approval** - once approved, PR will be merged
5. **Celebration** 🎉

## Questions?

Feel free to open an issue with the "question" label or reach out to:
- Email: adarshkadam5977@gmail.com
- GitHub: [@adarsh47-bug](https://github.com/adarsh47-bug)

---

Thank you for contributing! 🙏
