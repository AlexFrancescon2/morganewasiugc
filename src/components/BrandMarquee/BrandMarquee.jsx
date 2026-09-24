import { motion } from 'motion/react'
import { useContent } from '@/hooks/useContent.js'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './BrandMarquee.module.css'

export default function BrandMarquee() {
  const { data: brands } = useContent('brands')
  const t = useT()

  // The list is rendered twice so the loop is seamless at -50%.
  const loop = [...brands, ...brands]

  return (
    <section className={`theme-inverse ${styles.band}`} aria-labelledby="brands-title">
      <h2 id="brands-title" className="visually-hidden">
        {t('brands.title')}
      </h2>
      <ul className="visually-hidden">
        {brands.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
      <div className={styles.viewport} aria-hidden="true">
        <motion.div
          className={styles.track}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
        >
          {loop.map((brand, i) => (
            <span className={styles.item} key={`${brand.id}-${i}`}>
              {brand.name}
              <svg className={styles.mark} viewBox="0 0 20 20">
                <path d="M10 0c.6 5.3 4.1 9 10 10-5.9 1-9.4 4.7-10 10C9.4 14.7 5.9 11 0 10c5.9-1 9.4-4.7 10-10z" fill="currentColor" />
              </svg>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
