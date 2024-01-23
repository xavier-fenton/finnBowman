import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import { sanityIntegration } from '@sanity/astro'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [
    tailwind(),
    sanityIntegration({
      projectId: 'gdu2whhg',
      dataset: 'production',
      apiVersion: '2023-02-08',
      useCdn: false,
      studioBasePath: '/admin',
      perspective: 'previewDrafts', // 'raw' | 'published' | 'previewDrafts'
      token: import.meta.env.SECRET_SANITY_API_READ_TOKEN,
    }),
    react(),
  ],
})
