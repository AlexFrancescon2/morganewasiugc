import { translations } from '@/i18n/translations.js'

export const LOCALES = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'it', short: 'IT', label: 'Italiano' },
  { code: 'fr', short: 'FR', label: 'Français' },
]

export const DEFAULT_LOCALE = 'en'

/** Marks a content field as translated: title: tr('project.pasta.title') */
export function tr(key) {
  return { $t: key }
}

/** Look up a key for a locale, falling back to English, then to the key itself so gaps are visible. */
export function translate(key, locale, vars) {
  const entry = translations[key]
  if (!entry && import.meta.env.DEV) console.warn(`[i18n] Missing translation key: ${key}`)
  const value = entry?.[locale] ?? entry?.[DEFAULT_LOCALE] ?? key
  return vars && typeof value === 'string' ? format(value, vars) : value
}

/** Deep-resolve every tr() marker in a content value to the given locale. */
export function localize(value, locale) {
  if (Array.isArray(value)) return value.map((v) => localize(v, locale))
  if (value && typeof value === 'object') {
    if (typeof value.$t === 'string') return translate(value.$t, locale)
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v, locale)]))
  }
  return value
}

/** format('Open {title}', { title: 'Pasta' }) → 'Open Pasta' */
export function format(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '')
}
