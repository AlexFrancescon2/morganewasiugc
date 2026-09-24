import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useContent } from '@/hooks/useContent.js'
import Media from '@/components/Media/Media.jsx'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './About.module.css'

export default function About() {
  const { data: site } = useContent('site')
  const t = useT()
  const { about } = site

  return (
    <section id="about" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <figure className={styles.portrait}>
          <Media media={about.portrait} alt={about.portrait.alt} tone="dusk" kind="lifestyle" />
        </figure>

        <div className={styles.copy}>
          <h2 className="visually-hidden">{t('about.title')}</h2>
          <RevealText text={about.text} />

          <dl className={styles.stats}>
            {about.stats.map((stat) => (
              <div key={stat.id} className={styles.stat}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>

          <Link to="/about" className={styles.more}>
            {t('about.more')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

/** Words fade from faint to full as the paragraph scrolls through the viewport. */
function RevealText({ text }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })

  if (reduce) return <p ref={ref} className={styles.text}>{text}</p>

  const words = text.split(' ')
  return (
    <p ref={ref} className={styles.text}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}
