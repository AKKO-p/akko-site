import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://akko-ai.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
