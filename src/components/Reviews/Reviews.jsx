import { motion } from 'motion/react'
import { useContent } from '@/hooks/useContent.js'
import { ease, stagger } from '@/theme/motion.js'
import Stars from '@/components/Stars/Stars.jsx'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Reviews.module.css'

export default function Reviews() {
  const { data: reviews } = useContent('reviews')
  const { data: site } = useContent('site')
  const t = useT()
  const list = reviews.filter((r) => r.published).sort((a, b) => a.order - b.order)

  return (
    <section id="reviews" className={`theme-inverse ${styles.section}`}>
      <div className="container">
        <div className={styles.head}>
          <h2 className={styles.title}>{t('reviews.title')}</h2>
          <p className={styles.summary}>
            <Stars rating={5} />
            <span>
              <strong>{site.proof.rating}</strong> {site.proof.label}
            </span>
          </p>
        </div>

        <ul className={styles.grid}>
          {list.map((review, i) => (
            <motion.li
              key={review.id}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: ease.out, delay: (i % 3) * stagger.base }}
            >
              <figure className={styles.figure}>
                <div className={styles.top}>
                  <Stars rating={review.rating} />
                  {review.result && <span className={styles.result}>{review.result}</span>}
                </div>
                <blockquote className={styles.quote}>
                  <p>“{review.quote}”</p>
                </blockquote>
                <figcaption className={styles.author}>
                  <span className={styles.initials} aria-hidden="true">
                    {initials(review.name)}
                  </span>
                  <span>
                    <span className={styles.name}>{review.name}</span>
                    <span className={styles.role}>
                      {review.role}, {review.brand}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
}
