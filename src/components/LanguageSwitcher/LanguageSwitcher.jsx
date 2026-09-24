import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLocale } from '@/i18n/LocaleProvider.jsx'
import { LOCALES } from '@/i18n/locales.js'
import { ease } from '@/theme/motion.js'
import Flag from '@/components/Flag/Flag.jsx'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const t = useT()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const itemRefs = useRef([])

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

  useEffect(() => {
    if (!open) return
    itemRefs.current[LOCALES.findIndex((l) => l.code === locale)]?.focus()

    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, locale])

  function choose(code) {
    setLocale(code)
    setOpen(false)
    buttonRef.current?.focus()
  }

  function onMenuKeyDown(e) {
    const items = itemRefs.current
    const index = items.indexOf(document.activeElement)
    const move = { ArrowDown: 1, ArrowUp: -1 }[e.key]
    if (move) {
      e.preventDefault()
      items[(index + move + items.length) % items.length]?.focus()
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t('nav.language')}: ${current.label}`}
        onClick={() => setOpen((o) => !o)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={current.code}
            className={styles.triggerFlag}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
          >
            <Flag code={current.code} size={22} />
          </motion.span>
        </AnimatePresence>
        <span className={styles.code}>{current.short}</span>
        <motion.svg
          className={styles.chevron}
          viewBox="0 0 12 12"
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: ease.out }}
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className={styles.menu}
            role="menu"
            aria-label={t('nav.language')}
            onKeyDown={onMenuKeyDown}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.22, ease: ease.out }}
          >
            {LOCALES.map((l, i) => {
              const active = l.code === locale
              return (
                <li key={l.code} role="none">
                  <button
                    ref={(el) => (itemRefs.current[i] = el)}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    lang={l.code}
                    className={styles.item}
                    onClick={() => choose(l.code)}
                  >
                    <Flag code={l.code} size={26} />
                    <span className={styles.label}>{l.label}</span>
                    <span className={styles.short}>{l.short}</span>
                    {active && (
                      <motion.span layoutId="locale-check" className={styles.check} aria-hidden="true">
                        <svg viewBox="0 0 12 12">
                          <path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.span>
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
