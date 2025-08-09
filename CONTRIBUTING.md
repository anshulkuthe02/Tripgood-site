# Contributing to TripGood 🌴

Thank you for your interest in contributing to TripGood! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Tripgood-site.git
   cd Tripgood-site
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style
- Follow existing code formatting
- Use ESLint configuration provided
- Write meaningful component and variable names
- Add comments for complex logic

### Component Structure
```jsx
// Standard component template
import React, { useState, useEffect } from 'react';
import './ComponentName.css'; // if needed

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### CSS/Styling Guidelines
- Use Tailwind CSS utility classes
- Follow glass morphism design pattern
- Ensure responsive design (mobile-first)
- Use consistent spacing and colors

### Commit Message Format
```
type(scope): brief description

- feat: new feature
- fix: bug fix
- docs: documentation changes
- style: formatting changes
- refactor: code refactoring
- test: adding tests
- chore: maintenance tasks

Examples:
feat(maps): add fullscreen mode to bike rentals map
fix(auth): resolve login form validation issue
docs(readme): update installation instructions
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, Node version
6. **Screenshots**: If applicable

### Bug Report Template
```markdown
**Bug Description**
A clear and concise description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows 10]
 - Browser: [e.g. Chrome 91]
 - Node Version: [e.g. 16.14.0]
```

## ✨ Feature Requests

For new features:

1. **Check existing issues** to avoid duplicates
2. **Describe the feature** clearly
3. **Explain the use case** and benefits
4. **Provide mockups** if applicable

### Feature Request Template
```markdown
**Feature Description**
A clear and concise description of the feature.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
Describe your solution.

**Additional Context**
Add any other context, screenshots, or examples.
```

## 🔄 Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clean, readable code
   - Follow existing patterns
   - Add comments where necessary

3. **Test your changes**:
   ```bash
   npm run dev
   npm run build
   npm run preview
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**:
   - Go to GitHub and create a PR
   - Fill in the PR template
   - Link any related issues

### Pull Request Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Responsive design verified
- [ ] Cross-browser compatibility checked

## Screenshots (if applicable)
Add screenshots of changes.

## Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] Comments added where necessary
- [ ] Documentation updated
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Shared/         # Shared components
│   ├── maps/           # Map-related components
│   └── ...
├── pages/              # Page components
├── api/                # API functions and mock data
├── data/               # Static data files
├── context/            # React context providers
├── routes/             # Application routing
├── assets/             # Static assets
└── styles/             # Global styles
```

## 🎨 Design Guidelines

### Colors
- Primary: Blue gradient (#1fa2ff to #12d8fa)
- Secondary: Green (#059669)
- Background: Glass morphism with backdrop blur
- Text: Gray scales for hierarchy

### Typography
- Headers: Long Cang font
- Body: Work Sans font
- Code: Monospace fonts

### Components
- Use glass morphism effects
- Smooth transitions (0.3s ease)
- Hover states for interactive elements
- Mobile-first responsive design

## 🧪 Testing

Currently, the project uses manual testing. Future testing strategy:

- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Cypress
- Visual regression tests

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet Maps](https://leafletjs.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 💬 Community

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Email**: anshulkuthe02@gmail.com for direct contact

## 📄 Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Maintain a positive environment

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub repository insights
- Release notes for significant contributions

Thank you for contributing to TripGood! 🎉
