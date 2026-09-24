import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { LOCALES, DEFAULT_LOCALE, translate } from '@/i18n/locales.js'

const STORAGE_KEY = 'locale'
const LocaleContext = createContext({ locale: DEFAULT_LOCALE, setLocale: () => {} })

function isSupported(code) {
  return LOCALES.some((l) => l.code === code)
}

function initialLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isSupported(saved)) return saved
  } catch {
    // Storage can be blocked (private mode); fall through to the browser language.
  }
  const preferred = (navigator.languages ?? [navigator.language]).map((l) => l?.slice(0, 2).toLowerCase())
  return preferred.find(isSupported) ?? DEFAULT_LOCALE
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(initialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  function setLocale(code) {
    if (!isSupported(code)) return
    setLocaleState(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // Not persisting is fine; the choice still applies for this visit.
    }
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}

/** const t = useT(); t('nav.work') or t('work.open', { title, brand }) */
export function useT() {
  const { locale } = useLocale()
  return useCallback((key, vars) => translate(key, locale, vars), [locale])
}
