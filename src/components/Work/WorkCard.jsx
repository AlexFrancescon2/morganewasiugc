import { useState } from 'react'
import { motion } from 'motion/react'
import Media from '@/components/Media/Media.jsx'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Work.module.css'

export default function WorkCard({ project, onOpen }) {
  const [active, setActive] = useState(false)
  const t = useT()

  return (
    <button
      type="button"
      className={styles.card}
      onClick={onOpen}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      aria-label={t('work.open', { title: project.title, brand: project.brand })}
    >
      {/* Same layoutId as the modal frame: the tile grows into the detail view. */}
      <motion.div layoutId={`media-${project.id}`} className={styles.frame} style={{ borderRadius: 22 }}>
        <Media media={project.media} tone={project.tone} kind={project.category} alt={project.title} playing={active} />
      </motion.div>
      <span className={styles.meta}>
        <span className={styles.brand}>{project.brand}</span>
        <span className={styles.cardTitle}>{project.title}</span>
      </span>
    </button>
  )
}
