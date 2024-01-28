export default {
  name: 'youtube',
  type: 'object',
  title: 'Youtube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'URL',
    },
  ],

  component: {
    select: {
      url: 'url',
    },
    preview: null,
  },
}
