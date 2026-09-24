import { useCallback, useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { useContent } from '@/hooks/useContent.js'
import { spring } from '@/theme/motion.js'
import WorkCard from './WorkCard.jsx'
import WorkModal from './WorkModal.jsx'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Work.module.css'

export default function Work() {
  const { data: projects } = useContent('projects')
  const { data: categories } = useContent('categories')
  const t = useT()
  const [filter, setFilter] = useState('all')
  const [activeId, setActiveId] = useState(null)

  const published = useMemo(
    () => projects.filter((p) => p.published).sort((a, b) => a.order - b.order),
    [projects]
  )

  const counts = useMemo(() => {
    const c = { all: published.length }
    for (const p of published) c[p.category] = (c[p.category] ?? 0) + 1
    return c
  }, [published])

  const visible = filter === 'all' ? published : published.filter((p) => p.category === filter)
  const active = published.find((p) => p.id === activeId)
  const close = useCallback(() => setActiveId(null), [])

  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <h2 className={styles.title}>{t('work.title')}</h2>

          <div className={styles.filters} role="group" aria-label={t('work.filterLabel')}>
            {categories
              .filter((c) => counts[c.id])
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={styles.filter}
                  aria-pressed={filter === c.id}
                  onClick={() => setFilter(c.id)}
                >
                  {filter === c.id && (
                    <motion.span layoutId="filter-pill" className={styles.pill} transition={spring.snappy} />
                  )}
                  {c.label}
                  <span className={styles.count}>{counts[c.id]}</span>
                </button>
              ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.ul layout className={styles.grid}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={spring.layout}
                >
                  <WorkCard project={project} onOpen={() => setActiveId(project.id)} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <AnimatePresence>{active && <WorkModal key={active.id} project={active} onClose={close} />}</AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  )
}
