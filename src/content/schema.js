/**
 * Content schema. This is the contract between the site and the future admin
 * panel: the admin will create/edit exactly these shapes and save them to a
 * database or CMS. Keep ids stable; use `order` to sort and `published` to hide.
 *
 * Any text field can be a plain string (same in every language) or tr('key'),
 * which points to an entry in src/i18n/translations.js. useContent() resolves
 * it to the visitor's language. The types below show `string`; read each one
 * as `string | Translated`.
 *
 * @typedef {{ $t: string }} Translated
 * @typedef {'recipes'|'beauty'|'books'|'lifestyle'} Category
 * @typedef {'sky'|'dusk'|'night'|'mist'} Tone   Placeholder colour when there's no media yet
 *
 * @typedef {Object} Media
 * @property {'video'|'image'} type
 * @property {string} src       e.g. '/media/pancakes.mp4' or a CDN url. Empty = placeholder.
 * @property {string} [poster]  still frame for videos
 *
 * @typedef {Object} Project
 * @property {string}   id
 * @property {string}   title
 * @property {string}   brand
 * @property {Category} category
 * @property {Media}    media
 * @property {Tone}     tone
 * @property {string}   summary
 * @property {string[]} deliverables
 * @property {string}   [result]    headline outcome, e.g. '2.1× ROAS'
 * @property {number}   year
 * @property {boolean}  featured    shows in the hero stack (first 3 by order)
 * @property {boolean}  published
 * @property {number}   order
 *
 * @typedef {Object} Service
 * @property {string}   id
 * @property {string}   title
 * @property {string}   price        display string, e.g. 'from €350'
 * @property {string}   turnaround
 * @property {string}   summary
 * @property {string[]} includes
 * @property {number}   order
 *
 * @typedef {Object} ProcessStep
 * @property {string} id
 * @property {string} title
 * @property {string} body
 * @property {string} duration
 *
 * @typedef {Object} Review
 * @property {string}  id
 * @property {string}  quote
 * @property {string}  name
 * @property {string}  role
 * @property {string}  brand
 * @property {string}  [result]   highlight chip, e.g. '2.1× ROAS'
 * @property {number}  rating     1–5
 * @property {boolean} published
 * @property {number}  order
 *
 * @typedef {Object} ToolGroup
 * @property {string} id
 * @property {string} title
 * @property {'camera'|'light'|'audio'|'edit'|'plan'} icon
 * @property {{ name: string, note: string }[]} items
 *
 * @typedef {Object} FaqItem
 * @property {string} id
 * @property {string} question
 * @property {string} answer
 */
export {}
