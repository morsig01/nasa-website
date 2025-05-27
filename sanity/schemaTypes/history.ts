export default {
  name: 'nasaEvent',
  title: 'NASA Event',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Event ID',
      type: 'string',
      description: 'Unique identifier for the event',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'media',
      title: 'Media',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image', // Allow image upload/paste
          options: {
            hotspot: true
          }
        },
        {
          name: 'video',
          title: 'Video URL',
          type: 'url'
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'importance',
      title: 'Importance',
      type: 'number',
      description: 'Importance level (1-5)',
      validation: (Rule: any) => Rule.min(1).max(5)
    }
  ]
}