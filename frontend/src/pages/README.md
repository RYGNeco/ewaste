# Pages Directory Structure

This directory contains all the page components organized by functionality and access level.

## Directory Structure

```
pages/
├── auth/           # Authentication pages
│   ├── Login.jsx
│   ├── Register.jsx
│   └── ForgotPassword.jsx
├── admin/          # Admin-only pages
│   └── AdminPage.tsx
├── public/         # Public-facing pages
│   ├── HomePage.tsx
│   ├── AboutUsPage.tsx
│   ├── ContactPage.tsx
│   ├── EducationPage.tsx
│   ├── HowItWorksPage.tsx
│   ├── JoinUsPage.tsx
│   └── AboutUs.tsx
├── styles/         # CSS files for styling
│   ├── HomePage.css
│   ├── AboutUsPage.css
│   ├── ContactPage.css
│   ├── EducationPage.css
│   ├── HowItWorksPage.css
│   └── JoinUsPage.css
└── index.ts        # Clean exports for all pages
```

## Usage

### Importing Pages

Instead of importing directly from individual files, use the index file for clean imports:

```typescript
// ✅ Good - Use index exports
import { HomePage, Login, AdminPage } from './pages';

// ❌ Avoid - Direct file imports
import HomePage from './pages/public/HomePage';
```

### Adding New Pages

1. **Public Pages**: Add to `public/` directory
2. **Authentication Pages**: Add to `auth/` directory  
3. **Admin Pages**: Add to `admin/` directory
4. **Styles**: Add CSS files to `styles/` directory
5. **Update Exports**: Add export to `index.ts`

### File Naming Conventions

- Use PascalCase for component files (e.g., `HomePage.tsx`)
- Use kebab-case for CSS files (e.g., `home-page.css`)
- Use descriptive names that indicate the page purpose

## Benefits

- **Clear Separation**: Authentication, admin, and public pages are clearly separated
- **Easy Navigation**: Developers can quickly find relevant pages
- **Scalable**: Easy to add new pages without cluttering the root directory
- **Maintainable**: Related files are grouped together
- **Clean Imports**: Single import point through index.ts 