import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Nav from '@/components/Nav/Nav.jsx'
import Media from '@/components/Media/Media.jsx'
import Contact from '@/components/Contact/Contact.jsx'
import { useContent } from '@/hooks/useContent.js'
import { ease, stagger } from '@/theme/motion.js'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './AboutPage.module.css'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export default function AboutPage() {
  const { data: site } = useContent('site')
  const t = useT()
  const page = site.aboutPage

  useEffect(() => {
    document.title = `${t('aboutPage.pageTitle')} · ${site.name}`
  }, [t('aboutPage.pageTitle'), site.name])

  return (
    <>
      <Nav />
      <main>
        <section id="top" className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{t('aboutPage.eyebrow')}</p>
            <h1 className={styles.title}>
              {page.heading.map((line, i) => (
                <span className={styles.lineMask} key={line}>
                  <motion.span
                    className={styles.line}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1, ease: ease.out, delay: 0.1 + i * stagger.loose }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className={styles.intro}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: ease.out }}
            >
              {page.intro}
            </motion.p>

            <motion.dl
              className={styles.facts}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: ease.out }}
            >
              {page.facts.map((fact) => (
                <div key={fact.id} className={styles.fact}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.figure
            className={styles.portrait}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: ease.out, delay: 0.2 }}
          >
            <Media media={page.portrait} alt={page.portrait.alt} tone="dusk" kind="portrait" label={t('hero.photoPlaceholder')} eager />
          </motion.figure>
        </section>

        <section className={styles.story}>
          <div className={`container ${styles.storyLayout}`}>
            <motion.blockquote className={styles.quote} {...reveal} transition={{ duration: 0.8, ease: ease.out }}>
              <p>“{page.quote}”</p>
            </motion.blockquote>
            <div className={styles.storyText}>
              <h2 className="visually-hidden">{t('aboutPage.story')}</h2>
              {page.story.map((paragraph, i) => (
                <motion.p key={i} {...reveal} transition={{ duration: 0.7, ease: ease.out, delay: i * stagger.base }}>
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.values}>
          <div className="container">
            <h2 className={styles.sectionTitle}>{t('aboutPage.values')}</h2>
            <ol className={styles.valueGrid}>
              {page.values.map((value, i) => (
                <motion.li
                  key={value.id}
                  className={styles.value}
                  {...reveal}
                  transition={{ duration: 0.6, ease: ease.out, delay: i * stagger.base }}
                >
                  <span className={styles.valueNumber} aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueBody}>{value.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.gallery}>
          <div className="container">
            <h2 className={styles.sectionTitle}>{t('aboutPage.gallery')}</h2>
            <ul className={styles.galleryGrid}>
              {page.gallery.map((shot, i) => (
                <motion.li
                  key={shot.id}
                  className={styles.shot}
                  {...reveal}
                  transition={{ duration: 0.7, ease: ease.out, delay: i * stagger.base }}
                >
                  <figure>
                    <div className={styles.shotMedia}>
                      <Media media={shot.media} alt={shot.alt} tone={shot.tone} kind={shot.kind} />
                    </div>
                    <figcaption className={styles.caption}>{shot.caption}</figcaption>
                  </figure>
                </motion.li>
              ))}
            </ul>

            <div className={styles.cta}>
              <Link to="/#work" className={styles.primary}>
                {t('hero.seeWork')}
              </Link>
              <Link to="#contact" className={styles.secondary}>
                {t('nav.cta')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Contact />
    </>
  )
}
