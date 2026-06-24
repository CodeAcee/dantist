import {defineType, defineField} from 'sanity'
import {UserIcon} from '@sanity/icons'
import {localeFieldsets} from './shared/localeFieldset'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UserIcon,
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
      title: "Ім'я (однакове для обох мов / same for both languages)",
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleUk',
      title: 'Посада',
      type: 'string',
      fieldset: 'uk',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Role / title',
      type: 'string',
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bioUk',
      title: 'Біографія',
      type: 'text',
      rows: 4,
      fieldset: 'uk',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bioEn',
      title: 'Bio',
      type: 'text',
      rows: 4,
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'years',
      title: 'Роки досвіду / Years of experience',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'yearsLabelUk',
      title: 'Підпис до років',
      type: 'string',
      fieldset: 'uk',
      description: 'Напр. "років досвіду"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'yearsLabelEn',
      title: 'Years label',
      type: 'string',
      fieldset: 'en',
      description: 'e.g. "years experience"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'titleUk', media: 'photo', order: 'order'},
    prepare({title, subtitle, media, order}) {
      return {title: `${order ?? '–'}. ${title}`, subtitle, media}
    },
  },
})
