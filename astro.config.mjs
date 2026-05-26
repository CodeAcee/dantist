import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://naturasmile.ua',
  integrations: [react()],
  output: 'hybrid',
  adapter: node({ mode: 'standalone' }),
});
