import { tr } from '@/i18n/locales.js'

// What brands say. Quote, role and the optional result chip live in translations.js under 'review.<id>.*'.
const review = (id, { name, brand, hasResult = true, order }) => ({
  id,
  quote: tr(`review.${id}.quote`),
  name,
  role: tr(`review.${id}.role`),
  brand,
  result: hasResult ? tr(`review.${id}.result`) : undefined,
  rating: 5,
  published: true,
  order,
})

export const reviews = [
  review('mill-mortar', { name: 'Sofia Lindqvist', brand: 'Mill & Mortar', order: 1 }),
  review('nordic-pantry', { name: 'Jonas Berg', brand: 'Nordic Pantry', order: 2 }),
  review('lumen-skin', { name: 'Amara Okafor', brand: 'Lumen Skin', order: 3 }),
  review('kettle-house', { name: 'Marco Rossi', brand: 'Kettle House', order: 4 }),
  review('oliva-brava', { name: 'Inês Carvalho', brand: 'Oliva Brava', hasResult: false, order: 5 }),
  review('paperlight', { name: 'Hannah Moore', brand: 'Paperlight Books', order: 6 }),
]
