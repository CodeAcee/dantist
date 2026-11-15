import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import {localeFieldsets} from './shared/localeFieldset'

// A service landing page (/viniry, /implantaciya, ...): SEO texts, benefits, steps and FAQ in both
// languages. Prices come from the linked price category (the same list as the home page); a page with
// no category in the price list carries its own prices.
const uk = (name: string, title: string, type: 'string' | 'text' = 'string', required = true) =>
  defineField({name: `${name}Uk`, title, type, fieldset: 'uk', ...(type === 'text' ? {rows: 3} : {}), validation: (r) => (required ? r.required() : r)})
const en = (name: string, title: string, type: 'string' | 'text' = 'string', required = true) =>
  defineField({name: `${name}En`, title, type, fieldset: 'en', ...(type === 'text' ? {rows: 3} : {}), validation: (r) => (required ? r.required() : r)})

const pairItem = (title: string, a: [string, string], b: [string, string]) =>
  defineArrayMember({
    type: 'object',
    name: 'item',
    title,
    fields: [
      defineField({name: `${a[0]}Uk`, title: `${a[1]} (UA)`, type: 'string', validation: (r) => r.required()}),
      defineField({name: `${a[0]}En`, title: `${a[1]} (EN)`, type: 'string', validation: (r) => r.required()}),
      defineField({name: `${b[0]}Uk`, title: `${b[1]} (UA)`, type: 'text', rows: 3, validation: (r) => r.required()}),
      defineField({name: `${b[0]}En`, title: `${b[1]} (EN)`, type: 'text', rows: 3, validation: (r) => r.required()}),
    ],
    preview: {select: {title: `${a[0]}Uk`, subtitle: `${b[0]}Uk`}},
  })

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: localeFieldsets,
  fields: [
    defineField({name: 'order', title: 'Display order', type: 'number', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      description: 'Адреса сторінки, напр. "viniry" → /viniry',
      options: {source: 'nameEn'},
      validation: (r) => r.required(),
    }),
    uk('name', 'Назва послуги'),
    en('name', 'Service name'),
    uk('eyebrow', 'Надзаголовок'),
    en('eyebrow', 'Eyebrow'),
    uk('metaTitle', 'SEO title'),
    en('metaTitle', 'SEO title'),
    uk('metaDescription', 'SEO description', 'text'),
    en('metaDescription', 'SEO description', 'text'),
    uk('keywords', 'SEO keywords', 'string', false),
    en('keywords', 'SEO keywords', 'string', false),
    uk('h1', 'Заголовок H1'),
    en('h1', 'Heading H1'),
    uk('intro', 'Вступ', 'text'),
    en('intro', 'Intro', 'text'),
    uk('benefitsTitle', 'Заголовок переваг'),
    en('benefitsTitle', 'Benefits heading'),
    defineField({name: 'benefits', title: 'Переваги / Benefits', type: 'array', of: [pairItem('Benefit', ['title', 'Заголовок'], ['text', 'Текст'])]}),
    uk('processTitle', 'Заголовок етапів'),
    en('processTitle', 'Steps heading'),
    defineField({name: 'process', title: 'Етапи / Steps', type: 'array', of: [pairItem('Step', ['title', 'Заголовок'], ['text', 'Текст'])]}),
    uk('priceTitle', 'Заголовок цін'),
    en('priceTitle', 'Prices heading'),
    defineField({
      name: 'priceCategory',
      title: 'Категорія прайсу / Price category',
      type: 'reference',
      to: [{type: 'service'}],
      description: 'Ціни сторінки беруться з цієї категорії прайсу (як на головній). Якщо категорії немає, заповніть "Власні ціни".',
    }),
    defineField({
      name: 'prices',
      title: 'Власні ціни / Own prices',
      type: 'array',
      of: [defineArrayMember({type: 'priceItem'})],
      description: 'Лише якщо не обрано категорію прайсу.',
      hidden: ({document}) => Boolean(document?.priceCategory),
    }),
    uk('faqTitle', 'Заголовок FAQ'),
    en('faqTitle', 'FAQ heading'),
    defineField({name: 'faq', title: 'FAQ', type: 'array', of: [pairItem('Question', ['q', 'Питання'], ['a', 'Відповідь'])]}),
    uk('ctaTitle', 'Заклик: заголовок'),
    en('ctaTitle', 'CTA heading'),
    uk('ctaText', 'Заклик: текст', 'text'),
    en('ctaText', 'CTA text', 'text'),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'nameUk', slug: 'slug.current', order: 'order'},
    prepare({title, slug, order}) {
      return {title: `${order ?? '–'}. ${title}`, subtitle: `/${slug ?? ''}`}
    },
  },
})
