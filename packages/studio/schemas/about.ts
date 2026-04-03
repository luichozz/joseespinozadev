import { defineField, defineType } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Greeting / Title',
      type: 'string',
      description: 'e.g. "Hello!"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'profileImageId',
      title: 'Cloudinary Image ID',
      type: 'string',
      description: 'The public_id from Cloudinary (e.g. v1763586054/photo_abc.jpg)',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'linkedInUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'e.g. https://linkedin.com/in/your-name',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'e.g. you@example.com',
    }),
  ],
});
