import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './studio/schemas'
import { presentationTool } from 'sanity/presentation'
// import { locate } from './locate'

const SANITY_STUDIO_PREVIEW_URL = 'http://localhost:4321/'

export default defineConfig({
  name: 'default',
  title: 'studio',

  projectId: 'gdu2whhg',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      // Required: set the base URL to the preview location in the front end
      previewUrl: SANITY_STUDIO_PREVIEW_URL,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
