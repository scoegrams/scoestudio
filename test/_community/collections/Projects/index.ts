import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

export const projectsSlug = 'projects'

export const ProjectsCollection: CollectionConfig = {
  slug: projectsSlug,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'updatedAt'],
    enableListViewSelectAPI: true,
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => {
      if (user) {
        return true
      }
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Short project title (e.g., "South Station Mural")',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Murals',
          value: 'murals',
        },
        {
          label: 'Digital',
          value: 'digital',
        },
        {
          label: 'Sports',
          value: 'sports',
        },
        {
          label: 'Applied',
          value: 'applied',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Project category for filtering',
      },
    },
    {
      name: 'services',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Sites',
          value: 'sites',
        },
        {
          label: 'Branding',
          value: 'branding',
        },
        {
          label: 'Illustration',
          value: 'illustration',
        },
        {
          label: 'Print Design',
          value: 'print-design',
        },
        {
          label: 'Packaging',
          value: 'packaging',
        },
        {
          label: 'Environmental',
          value: 'environmental',
        },
        {
          label: 'Motion',
          value: 'motion',
        },
        {
          label: 'Photography',
          value: 'photography',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Services provided for this project',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main image for the project grid',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Brief notes about the project',
                rows: 4,
              },
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Project Gallery',
              admin: {
                description: 'Images for the project detail page',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  admin: {
                    description: 'Optional caption for the image',
                  },
                },
              ],
            },
            {
              name: 'processImages',
              type: 'array',
              label: 'Process Images',
              admin: {
                description: 'Optional process/work-in-progress captures',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  admin: {
                    description: 'Optional caption for the process image',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              name: 'client',
              type: 'text',
              admin: {
                description: 'Client or organization name (optional)',
              },
            },
            {
              name: 'location',
              type: 'text',
              admin: {
                description: 'Project location (optional)',
              },
            },
            {
              name: 'year',
              type: 'number',
              admin: {
                description: 'Year the project was completed',
                position: 'sidebar',
              },
            },
            {
              name: 'tags',
              type: 'array',
              admin: {
                description: 'Optional tags for additional categorization',
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField({
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (auto-generated from title)',
      },
    }),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
