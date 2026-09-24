import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useContent } from '@/hooks/useContent.js'
import { ease } from '@/theme/motion.js'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Services.module.css'

export default function Services() {
  const { data: services } = useContent('services')
  const t = useT()
  const sorted = [...services].sort((a, b) => a.order - b.order)
  const [openId, setOpenId] = useState(sorted[0]?.id ?? null)

  return (
    <section id="rates" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <h2 className={styles.title}>{t('services.title')}</h2>
          <p className={styles.note}>{t('services.note')}</p>
        </div>

        <ul className={styles.list}>
          {sorted.map((service) => {
            const isOpen = openId === service.id
            const panelId = `service-${service.id}`
            return (
              <li key={service.id} className={styles.row}>
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : service.id)}
                >
                  <span className={styles.name}>{service.title}</span>
                  <span className={styles.price}>{service.price}</span>
                  <motion.span
                    className={styles.icon}
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: ease.out }}
                  >
                    <svg viewBox="0 0 16 16">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      className={styles.panel}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: ease.out }}
                    >
                      <div className={styles.panelInner}>
                        <p className={styles.summary}>{service.summary}</p>
                        <ul className={styles.includes}>
                          {service.includes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <p className={styles.turnaround}>{t('services.turnaround')} {service.turnaround}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
