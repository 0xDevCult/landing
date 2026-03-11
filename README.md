# DevCult.io

The official website for DevCult - a developer experience consultancy specializing in blockchain and Web3 ecosystems.

## About

DevCult helps blockchain projects build thriving developer ecosystems through:

- Documentation developers want to use
- Developer events, workshops, and community building
- Strategic developer outreach and relations

## Tech Stack

- **Framework:** [Astro 5.16.5](https://astro.build) - Modern static site generator
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) - Utility-first CSS framework
- **TypeScript:** Strict mode enabled for type safety
- **Deployment:** GitHub Pages via GitHub Actions

## Project Structure

```
/
├── public/              # Static assets
│   ├── fonts/          # Coconat font family
│   ├── favicon.png
│   └── robots.txt
├── src/
│   ├── assets/         # Images and media
│   ├── components/     # Astro components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── Clients.astro
│   │   ├── BlogCarousel.astro
│   │   └── ContactSection.astro
│   ├── layouts/        # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/          # File-based routing
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── legal.astro
│   │   └── 404.astro
│   └── styles/
│       └── global.css  # Global styles and theme
├── .github/
│   └── workflows/
│       └── deploy.yml  # CI/CD pipeline
└── astro.config.mjs    # Astro configuration
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/0xDevCult/devcult.io-2.git
cd devcult.io-2
```

2. Install dependencies:

```bash
npm install
```

3. Install the pre-commit hook:

```bash
prek install
```

4. Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

## Available Commands

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start development server         |
| `npm run build`        | Build for production             |
| `npm run preview`      | Preview production build locally |
| `npm run astro check`  | Run TypeScript and Astro checks  |
| `npm run lint`         | Run ESLint                       |
| `npm run format`       | Format code with Prettier        |
| `npm run format:check` | Check code formatting            |

## Features

### Performance

- ⚡ Static site generation for fast TTFB
- 🎨 Minimal JavaScript bundle
- 🖼️ Optimized images with Astro's Image component
- 📦 Font preloading for improved LCP

### SEO

- 🔍 Open Graph and Twitter Card meta tags
- 🗺️ Automatic sitemap generation
- 🤖 robots.txt configuration
- 📊 Schema.org structured data (Organization)
- 🔗 Canonical URLs

### Accessibility

- ♿ ARIA labels and roles
- ⌨️ Keyboard navigation support
- 🎯 Focus management and focus trap in mobile menu
- 🚫 Skip to main content link
- 🌗 Reduced motion support

### Security

- 🔒 Input validation and sanitization
- 🛡️ XSS prevention in contact form
- 📡 Safe RSS feed parsing with timeout
- 🔐 Security headers ready for deployment

### Developer Experience

- 📝 TypeScript with strict mode
- 🎨 Tailwind CSS v4 with custom theme
- 🔄 Hot module replacement
- ✅ ESLint and Prettier configured
- 🧪 Automated CI/CD pipeline

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

The CI/CD pipeline:

1. Runs security audit (`npm audit`)
2. Checks code formatting
3. Runs ESLint
4. Performs Astro type checking
5. Builds the site
6. Deploys to GitHub Pages

## Color System

The site uses a consistent color system defined in `src/styles/global.css`:

- **Brand Colors:** Orange accent (`#ff6a00` and variants)
- **CSS Variables:** All colors use CSS variables for easy theming
- **Dark Theme:** Optimized for dark mode with proper contrast ratios

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all checks pass: `npm run astro check && npm run lint && npm run format:check`
4. Build and test: `npm run build && npm run preview`
5. Submit a pull request

## License

© 2025 DevCult. All rights reserved.

## Contact

- Website: [https://devcult.io](https://devcult.io)
- Email: info@devcult.io

---

Built with ❤️ using [Astro](https://astro.build)
