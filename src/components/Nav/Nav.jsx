import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { useContent } from '@/hooks/useContent.js'
import { ease, stagger } from '@/theme/motion.js'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher.jsx'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Nav.module.css'

const LINKS = [
  { to: '/#work', key: 'work' },
  { to: '/#reviews', key: 'reviews' },
  { to: '/#rates', key: 'rates' },
  { to: '/#faq', key: 'faq' },
  { to: '/about', key: 'about' },
]

// Contact lives in the footer of every page, so this stays on the current page.
const CTA = { to: '#contact', key: 'cta' }

export default function Nav() {
  const { data: site } = useContent('site')
  const t = useT()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 280 && !open)
    setScrolled(y > 24)
  })

  const close = () => setOpen(false)

  return (
    <motion.header
      className={styles.header}
      data-scrolled={scrolled || open}
      animate={{ y: hidden ? '-130%' : '0%' }}
      transition={{ duration: 0.4, ease: ease.out }}
    >
      <nav className={styles.bar} aria-label={t('nav.label')}>
        <Link to="/" className={styles.logo} onClick={close}>
          {site.name}
        </Link>
        <ul className={styles.links}>
          {LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{t(`nav.${link.key}`)}</Link>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <LanguageSwitcher />
          <Link to={CTA.to} className={styles.cta}>
            {t(`nav.${CTA.key}`)}
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.sheet}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: ease.out }}
          >
            <ul>
              {[...LINKS, CTA].map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * stagger.base, duration: 0.4, ease: ease.out }}
                >
                  <Link to={link.to} onClick={close}>
                    {t(`nav.${link.key}`)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
