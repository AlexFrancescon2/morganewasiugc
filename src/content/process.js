import { tr } from '@/i18n/locales.js'

// Steps in order. Text lives in translations.js under 'process.<id>.*'.
export const process = ['brief', 'recipe', 'shoot', 'deliver'].map((id) => ({
  id,
  title: tr(`process.${id}.title`),
  body: tr(`process.${id}.body`),
  duration: tr(`process.${id}.duration`),
}))
