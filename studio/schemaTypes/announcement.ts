import {defineType, defineField} from 'sanity'
import {BellIcon} from '@sanity/icons'
import {localeFieldsets} from './shared/localeFieldset'

// A site-wide announcement (news, a promotion, changed hours): a glass bar under the nav on every page.
// The newest active one in its date window is shown; a visitor who closes it does not see it again
// until a new one is published.
export const announcement = defineType({
  name: 'announcement',
  title: 'Оголошення / Announcement',
  type: 'document',
  icon: BellIcon,
  fieldsets: localeFieldsets,
  fields: [
    defineField({
      name: 'active',
      title: 'Показувати на сайті / Show on the site',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'tone',
      title: 'Тип / Tone',
      type: 'string',
      options: {
        list: [
          {title: 'Новина / News', value: 'news'},
          {title: 'Акція / Promotion', value: 'promo'},
          {title: 'Важливо / Important', value: 'important'},
        ],
        layout: 'radio',
      },
      initialValue: 'news',
    }),
    defineField({name: 'textUk', title: 'Текст', type: 'string', fieldset: 'uk', validation: (r) => r.required().max(140)}),
    defineField({name: 'textEn', title: 'Text', type: 'string', fieldset: 'en', validation: (r) => r.required().max(140)}),
    defineField({name: 'linkLabelUk', title: 'Текст посилання (необовʼязково)', type: 'string', fieldset: 'uk'}),
    defineField({name: 'linkLabelEn', title: 'Link label (optional)', type: 'string', fieldset: 'en'}),
    defineField({
      name: 'link',
      title: 'Посилання / Link',
      type: 'string',
      description: 'Повна адреса (https://…) або розділ сайту, напр. #booking чи /viniry',
    }),
    defineField({name: 'startsAt', title: 'Показувати з / Show from', type: 'datetime'}),
    defineField({name: 'endsAt', title: 'Показувати до / Show until', type: 'datetime'}),
  ],
  orderings: [{title: 'Newest first', name: 'createdDesc', by: [{field: '_createdAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'textUk', active: 'active', tone: 'tone', endsAt: 'endsAt'},
    prepare({title, active, tone, endsAt}) {
      return {title, subtitle: `${active ? '● on' : '○ off'} · ${tone ?? 'news'}${endsAt ? ' · until ' + String(endsAt).slice(0, 10) : ''}`}
    },
  },
})
