import {defineType, defineField} from 'sanity'
import {PlayIcon} from '@sanity/icons'
import {localeFieldsets} from './shared/localeFieldset'

export const clinicMedia = defineType({
  name: 'clinicMedia',
  title: 'Clinic Photo / Video',
  type: 'document',
  icon: PlayIcon,
  fieldsets: localeFieldsets,
  fields: [
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Тип / Type',
      type: 'string',
      options: {list: [{title: 'Photo', value: 'image'}, {title: 'Video', value: 'video'}], layout: 'radio'},
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video file',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'captionUk',
      title: 'Підпис (необов\'язково)',
      type: 'string',
      fieldset: 'uk',
    }),
    defineField({
      name: 'captionEn',
      title: 'Caption (optional)',
      type: 'string',
      fieldset: 'en',
    }),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'captionUk', media: 'image', order: 'order', mediaType: 'mediaType'},
    prepare({title, media, order, mediaType}) {
      return {title: `${order ?? '–'}. ${title || mediaType}`, media}
    },
  },
})
