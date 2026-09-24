import { tr } from '@/i18n/locales.js'

// Packages. All text (including prices) lives in translations.js under 'service.<id>.*'.
export const services = ['single-video', 'series', 'photo-set', 'monthly'].map((id, i) => ({
  id,
  title: tr(`service.${id}.title`),
  price: tr(`service.${id}.price`),
  turnaround: tr(`service.${id}.turnaround`),
  summary: tr(`service.${id}.summary`),
  includes: tr(`service.${id}.includes`),
  order: i + 1,
}))
