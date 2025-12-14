import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://devcult.io',
  integrations: [sitemap()],
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()]
  }
});
