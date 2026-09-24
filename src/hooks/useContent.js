import { useEffect, useMemo, useState } from 'react'
import { getContentSource } from '@/lib/content.js'
import { useLocale } from '@/i18n/LocaleProvider.jsx'
import { localize } from '@/i18n/locales.js'

/**
 * Read a content collection: useContent('projects') → { data, status, error }
 * Translated fields ({ en, it, fr }) come back already resolved to the active locale.
 */
export function useContent(key) {
  const source = getContentSource()
  const { locale } = useLocale()

  const [state, setState] = useState(() => {
    const cached = source.peek?.(key)
    return {
      data: cached ?? null,
      status: cached !== undefined ? 'ready' : 'loading',
      error: null,
    }
  })

  useEffect(() => {
    let alive = true
    source
      .get(key)
      .then((data) => {
        if (!alive) return
        setState((prev) =>
          prev.data === data && prev.status === 'ready'
            ? prev
            : { data, status: 'ready', error: null }
        )
      })
      .catch((error) => {
        if (alive) setState((prev) => ({ ...prev, status: 'error', error }))
      })
    return () => {
      alive = false
    }
  }, [key, source])

  const data = useMemo(() => (state.data == null ? state.data : localize(state.data, locale)), [state.data, locale])

  return { ...state, data }
}
