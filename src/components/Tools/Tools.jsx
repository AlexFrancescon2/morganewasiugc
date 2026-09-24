import { motion } from 'motion/react'
import { useContent } from '@/hooks/useContent.js'
import { ease, stagger } from '@/theme/motion.js'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Tools.module.css'

const ICONS = {
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <path d="M8.5 7l1.5-3h4l1.5 3" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </>
  ),
  audio: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21M8.5 21h7" />
    </>
  ),
  edit: (
    <>
      <circle cx="6" cy="7" r="3" />
      <circle cx="6" cy="17" r="3" />
      <path d="M8.5 8.8L20 18M8.5 15.2L20 6" />
    </>
  ),
  plan: (
    <>
      <rect x="4" y="4" width="16" height="17" rx="3" />
      <path d="M8 2.5v3M16 2.5v3M4 9.5h16M8.5 14l2.2 2.2 4.8-4.7" />
    </>
  ),
}

export default function Tools() {
  const { data: tools } = useContent('tools')
  const { data: studio } = useContent('studio')
  const t = useT()

  return (
    <section id="tools" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <h2 className={styles.title}>{t('tools.title')}</h2>
          <p className={styles.lede}>{t('tools.lede')}</p>
        </div>

        <ul className={styles.grid}>
          {tools.map((group, i) => (
            <motion.li
              key={group.id}
              className={styles.group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: ease.out, delay: i * stagger.base }}
            >
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                {ICONS[group.icon]}
              </svg>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemNote}>{item.note}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}

          <motion.li
            className={`${styles.group} ${styles.studio}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: ease.out, delay: tools.length * stagger.base }}
          >
            <h3 className={styles.studioTitle}>{studio.title}</h3>
            <p className={styles.studioBody}>{studio.body}</p>
          </motion.li>
        </ul>
      </div>
    </section>
  )
}
