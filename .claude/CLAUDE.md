# DevCult Landing Page

Astro 5 static site with Tailwind CSS 4 for devcult.io.

## Commands

```bash
npm run dev          # Dev server (localhost:4321)
npm run build        # Production build to dist/
npm run preview      # Preview production build

npm run test         # Unit tests (vitest)
npm run test:e2e     # E2E tests (playwright)

npm run lint         # ESLint check
npm run lint:fix     # ESLint autofix
npm run format       # Prettier format
npm run format:check # Prettier check
```

## Architecture

```
src/
├── components/      # Astro components (.astro)
├── layouts/         # BaseLayout.astro
├── pages/           # Routes: index, about, contact, legal, 404
├── data/            # navigation.ts
├── utils/           # validation.ts
├── styles/          # global.css
├── assets/images/   # Static images
└── __tests__/       # Vitest unit tests
e2e/                 # Playwright E2E tests
public/              # Static assets (copied as-is)
```

## Path Aliases

Use `@/` for src imports:

- `@/components/*`, `@/layouts/*`, `@/assets/*`, `@/styles/*`, `@/data/*`

## Key Files

- `astro.config.mjs` - Astro config, sitemap integration
- `tailwind.config.mjs` - Tailwind config
- `tsconfig.json` - TypeScript strict mode
- `CNAME` - Custom domain (devcult.io)

## Tech Stack

- Astro 5 (static site generator)
- Tailwind CSS 4 (via @tailwindcss/vite)
- TypeScript (strict)
- Vitest (unit tests)
- Playwright (E2E tests)
- ESLint + Prettier

## Gotchas

- Uses Tailwind CSS 4 with Vite plugin, not PostCSS
- Site URL is `https://devcult.io` (configured in astro.config.mjs)
- E2E tests excluded from vitest config (separate playwright runner)

## Token Efficiency

- **Don't pre-read files** - Only read files when actively needed for the task
- **Git: use --stat first** - Run `git diff --stat` before full diff to gauge size
- **Skills: invoke only when needed** - Don't load skills speculatively
- **Concise responses** - Avoid repeating file contents or verbose explanations
