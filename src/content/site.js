import { tr } from '@/i18n/locales.js'

// Everything about you. Text lives in src/i18n/translations.js; tr('key') points to it.
// Photos: drop files in /public/media and set `src`, e.g. '/media/nora-hero.jpg'.
export const site = {
  name: 'Nora Vale',
  role: tr('site.role'),
  availability: {
    open: true,
    label: tr('site.availability'),
  },
  headline: tr('hero.headline'),
  intro: tr('hero.intro'),
  portrait: { type: 'image', src: '', alt: tr('hero.portraitAlt') },
  sticker: tr('hero.sticker'),
  proof: { rating: tr('site.proofRating'), label: tr('site.proofLabel') },
  email: 'hello@noravale.com',
  socials: [
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/' },
    { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/' },
  ],
  about: {
    text: tr('about.text'),
    portrait: { type: 'image', src: '', alt: tr('about.portraitAlt') },
    stats: [
      { id: 'videos', value: '120+', label: tr('about.stat.videos') },
      { id: 'brands', value: '38', label: tr('about.stat.brands') },
      { id: 'views', value: tr('about.stat.viewsValue'), label: tr('about.stat.views') },
    ],
  },
  aboutPage: {
    heading: tr('aboutPage.heading'),
    intro: tr('aboutPage.intro'),
    portrait: { type: 'image', src: '', alt: tr('aboutPage.portraitAlt') },
    facts: [
      { id: 'base', label: tr('aboutPage.fact.base.label'), value: tr('aboutPage.fact.base.value') },
      { id: 'niches', label: tr('aboutPage.fact.niches.label'), value: tr('aboutPage.fact.niches.value') },
      { id: 'languages', label: tr('aboutPage.fact.languages.label'), value: tr('aboutPage.fact.languages.value') },
      { id: 'since', label: tr('aboutPage.fact.since.label'), value: '2021' },
    ],
    story: tr('aboutPage.storyText'),
    quote: tr('aboutPage.quote'),
    values: ['recipes', 'ads', 'light', 'reliable'].map((id) => ({
      id,
      title: tr(`aboutPage.value.${id}.title`),
      body: tr(`aboutPage.value.${id}.body`),
    })),
    gallery: [
      { id: 'studio', media: { type: 'image', src: '' }, tone: 'mist', kind: 'lifestyle' },
      { id: 'styling', media: { type: 'image', src: '' }, tone: 'dusk', kind: 'recipes' },
      { id: 'market', media: { type: 'image', src: '' }, tone: 'sky', kind: 'lifestyle' },
    ].map((shot) => ({
      ...shot,
      alt: tr(`aboutPage.gallery.${shot.id}.alt`),
      caption: tr(`aboutPage.gallery.${shot.id}.caption`),
    })),
  },
}
