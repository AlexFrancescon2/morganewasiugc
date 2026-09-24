/**
 * Content data layer
 * ------------------
 * Components never import from /content directly. They call useContent(key),
 * which reads from the active "source" defined here.
 *
 * Today: localSource serves the files in /content.
 * Iteration 2 (admin panel): write an apiSource with the same shape, e.g.
 *
 *   export const apiSource = {
 *     peek: () => undefined,                          // nothing cached yet
 *     get: (key) => fetch(`/api/content/${key}`).then(r => r.json()),
 *   }
 *   setContentSource(apiSource)
 *
 * and the whole site switches over with no UI changes.
 */
import { site } from '@/content/site.js'
import { projects, categories } from '@/content/projects.js'
import { services } from '@/content/services.js'
import { process } from '@/content/process.js'
import { brands } from '@/content/brands.js'
import { reviews } from '@/content/reviews.js'
import { tools, studio } from '@/content/tools.js'
import { faq } from '@/content/faq.js'

const localData = { site, projects, categories, services, process, brands, reviews, tools, studio, faq }

export const localSource = {
  /** Synchronous read, used for the first render so there's no loading flash. */
  peek: (key) => localData[key],
  /** Async read, the shape a real API will have. */
  get: async (key) => localData[key],
}

let activeSource = localSource

export function setContentSource(source) {
  activeSource = source
}

export function getContentSource() {
  return activeSource
}
