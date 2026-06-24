import {defineType, defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'
import {localeFieldsets} from './shared/localeFieldset'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Before / After Case',
  type: 'document',
  icon: ImagesIcon,
  fieldsets: localeFieldsets,
  fields: [
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'treatmentUk',
      title: 'Лікування',
      type: 'string',
      fieldset: 'uk',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'treatmentEn',
      title: 'Treatment',
      type: 'string',
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'durationUk',
      title: 'Тривалість',
      type: 'string',
      fieldset: 'uk',
      description: 'Напр. "3 візити" або "6 тижнів"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'durationEn',
      title: 'Duration',
      type: 'string',
      fieldset: 'en',
      description: 'e.g. "3 visits" or "6 weeks"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beforeDescUk',
      title: 'Підпис "До"',
      type: 'string',
      fieldset: 'uk',
      description: 'Напр. "Жовтий, нерівний прикус"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beforeDescEn',
      title: '"Before" caption',
      type: 'string',
      fieldset: 'en',
      description: 'e.g. "Yellow, uneven bite"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'afterDescUk',
      title: 'Підпис "Після"',
      type: 'string',
      fieldset: 'uk',
      description: 'Напр. "Білі, рівні зуби"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'afterDescEn',
      title: '"After" caption',
      type: 'string',
      fieldset: 'en',
      description: 'e.g. "White, even teeth"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before photo',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'After photo',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'treatmentUk', media: 'afterImage', order: 'order'},
    prepare({title, media, order}) {
      return {title: `${order ?? '–'}. ${title}`, media}
    },
  },
})
