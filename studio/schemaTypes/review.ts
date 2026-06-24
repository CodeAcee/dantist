import {defineType, defineField} from 'sanity'
import {CommentIcon} from '@sanity/icons'
import {localeFieldsets} from './shared/localeFieldset'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: CommentIcon,
  fieldsets: localeFieldsets,
  fields: [
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: "Ім'я клієнта / Client name",
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'initials',
      title: 'Інціали (для аватарки)',
      type: 'string',
      description: 'Напр. "ОК" — буде показано замість фото',
      validation: (rule) => rule.required().max(3),
    }),
    defineField({
      name: 'since',
      title: 'Клієнт з якого року / Client since (year)',
      type: 'number',
    }),
    defineField({
      name: 'textUk',
      title: 'Текст відгуку',
      type: 'text',
      rows: 4,
      fieldset: 'uk',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'textEn',
      title: 'Review text',
      type: 'text',
      rows: 4,
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'textUk', order: 'order'},
    prepare({title, subtitle, order}) {
      return {title: `${order ?? '–'}. ${title}`, subtitle}
    },
  },
})
