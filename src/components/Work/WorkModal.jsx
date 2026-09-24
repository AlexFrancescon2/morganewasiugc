import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ease } from '@/theme/motion.js'
import Media from '@/components/Media/Media.jsx'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './WorkModal.module.css'

export default function WorkModal({ project, onClose }) {
  const closeRef = useRef(null)
  const t = useT()

  useEffect(() => {
    const opener = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      opener?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  const titleId = `project-title-${project.id}`

  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <motion.div
        className={styles.backdrop}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />

      <div className={styles.panel}>
        <motion.div layoutId={`media-${project.id}`} className={styles.frame} style={{ borderRadius: 28 }}>
          <Media media={project.media} tone={project.tone} kind={project.category} alt={project.title} playing />
        </motion.div>

        <motion.div
          className={styles.details}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.18, duration: 0.5, ease: ease.out } }}
          exit={{ opacity: 0, x: 16, transition: { duration: 0.15 } }}
        >
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
            {t('nav.close')}
          </button>

          <p className={styles.brand}>
            {project.brand}, {project.year}
          </p>
          <h3 id={titleId} className={styles.title}>
            {project.title}
          </h3>
          <p className={styles.summary}>{project.summary}</p>

          <dl className={styles.facts}>
            {project.result && (
              <div>
                <dt>{t('work.result')}</dt>
                <dd>{project.result}</dd>
              </div>
            )}
            <div>
              <dt>{t('work.delivered')}</dt>
              <dd>
                <ul>
                  {project.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <a href="#contact" className={styles.cta} onClick={onClose}>
            {t('work.bookSimilar')}
          </a>
        </motion.div>
      </div>
    </div>
  )
}
