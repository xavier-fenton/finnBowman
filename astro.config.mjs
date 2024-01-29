import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { sanityIntegration } from '@sanity/astro';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [tailwind(), sanityIntegration({
    projectId: 'gdu2whhg',
    dataset: 'production',
    apiVersion: '2023-02-08',
    useCdn: false,
    studioBasePath: '/admin',
    perspective: 'previewDrafts' // 'raw' | 'published' | 'previewDrafts'
  }), react()],
  adapter: vercel()
});