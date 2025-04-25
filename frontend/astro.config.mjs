import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react({
      include: ['**/*.tsx'],
    }),
    tailwind({
      config: { path: './tailwind.config.js' },
    })
  ],
  server: {
    port: 4000,
  },
});