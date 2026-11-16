import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

// A photo of the clinic for the "About the clinic" slider on the home page.
export const clinicPhoto = defineType({
  name: 'clinicPhoto',
  title: 'Clinic Photo',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({name: 'order', title: 'Display order', type: 'number', validation: (r) => r.required()}),
    defineField({
      name: 'image',
      title: 'Фото / Photo',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'altUk',
      title: 'Що на фото (для незрячих та Google)',
      type: 'string',
      description: 'Напр. «Кабінет клініки» чи «Зона очікування». Не показується на сторінці.',
    }),
    defineField({name: 'altEn', title: 'What the photo shows (alt text)', type: 'string'}),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'altUk', media: 'image', order: 'order'},
    prepare: ({title, media, order}) => ({title: `${order ?? '–'}. ${title || 'Фото'}`, media}),
  },
})
