import {defineType, defineField, defineArrayMember} from 'sanity'
import {StarIcon} from '@sanity/icons'
import {localeFieldsets} from './shared/localeFieldset'

export const priceItem = defineType({
  name: 'priceItem',
  title: 'Price Item',
  type: 'object',
  fieldsets: localeFieldsets,
  fields: [
    defineField({
      name: 'nameUk',
      title: 'Назва',
      type: 'string',
      fieldset: 'uk',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Name',
      type: 'string',
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceUk',
      title: 'Ціна',
      type: 'string',
      fieldset: 'uk',
      description: 'Напр. "від 8 000 грн" або "Безкоштовно"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceEn',
      title: 'Price',
      type: 'string',
      fieldset: 'en',
      description: 'e.g. "from ₴8,000" or "Free"',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'nameUk', subtitle: 'priceUk'},
  },
})

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: StarIcon,
  fieldsets: localeFieldsets,
  fields: [
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first (01, 02, 03...)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameUk',
      title: 'Назва послуги',
      type: 'string',
      fieldset: 'uk',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Service name',
      type: 'string',
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descUk',
      title: 'Короткий опис',
      type: 'text',
      rows: 2,
      fieldset: 'uk',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descEn',
      title: 'Short description',
      type: 'text',
      rows: 2,
      fieldset: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startingPriceUk',
      title: 'Ціна на картці (від)',
      type: 'string',
      fieldset: 'uk',
      description: 'Показується на картці послуги, напр. "від 4 500 грн"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startingPriceEn',
      title: 'Card price (starting from)',
      type: 'string',
      fieldset: 'en',
      description: 'Shown on the service card, e.g. "from ₴4,500"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceItems',
      title: 'Full price list (shown in the popup)',
      type: 'array',
      of: [defineArrayMember({type: 'priceItem'})],
      validation: (rule) => rule.min(1).error('Add at least one price line'),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'nameUk', subtitle: 'startingPriceUk', order: 'order'},
    prepare({title, subtitle, order}) {
      return {title: `${order ?? '–'}. ${title}`, subtitle}
    },
  },
})
