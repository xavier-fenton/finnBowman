import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'link',
  title: 'InstaLink',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Handle @:',
      type: 'string',
    }),
    defineField({
      name: 'instaLink',
      title: 'Instagram Link: Copy & Paste handle from link and put in title',
      type: 'url',
    }),
  ],
})
