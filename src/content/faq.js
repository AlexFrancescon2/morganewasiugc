import { tr } from '@/i18n/locales.js'

// Questions brands ask before booking, in order. Text lives in translations.js under 'faq.<id>.*'.
export const faq = ['usage', 'whitelisting', 'product', 'raw', 'revisions', 'niche'].map((id) => ({
  id,
  question: tr(`faq.${id}.question`),
  answer: tr(`faq.${id}.answer`),
}))
