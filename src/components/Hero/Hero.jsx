import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useContent } from '@/hooks/useContent.js'
import { ease, spring, stagger } from '@/theme/motion.js'
import Media from '@/components/Media/Media.jsx'
import Stars from '@/components/Stars/Stars.jsx'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Hero.module.css'

// How each floating card settles next to the portrait.
const POSES = [
  { className: styles.slotA, rotate: -8, depth: 26 },
  { className: styles.slotB, rotate: 7, depth: 34 },
]

export default function Hero() {
  const { data: site } = useContent('site')
  const { data: projects } = useContent('projects')
  const t = useT()

  const featured = projects
    .filter((p) => p.published && p.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, POSES.length)

  // Pointer position within the hero, -0.5 → 0.5, smoothed with a spring.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, spring.pointer)
  const sy = useSpring(my, spring.pointer)
  const portraitX = useTransform(sx, (v) => v * -10)
  const portraitY = useTransform(sy, (v) => v * -10)

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width - 0.5)
    my.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function handlePointerLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <section id="top" className={styles.hero} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <div className={styles.copy}>
        {site.availability.open && (
          <motion.p
            className={styles.status}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span className={styles.dot} aria-hidden="true" />
            {site.availability.label}
          </motion.p>
        )}

        <h1 className={styles.title}>
          {site.headline.map((line, i) => (
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
          transition={{ delay: 0.65, duration: 0.7, ease: ease.out }}
        >
          {site.intro}
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.7, ease: ease.out }}
        >
          <a href="#work" className={styles.primary}>
            {t('hero.seeWork')}
          </a>
          <a href="#contact" className={styles.secondary}>
            {t('nav.cta')}
          </a>
        </motion.div>

        <motion.a
          href="#reviews"
          className={styles.proof}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.6 }}
        >
          <Stars rating={5} />
          <span>
            <strong>{site.proof.rating}</strong> {site.proof.label}
          </span>
        </motion.a>
      </div>

      <div className={styles.visual}>
        <motion.figure
          className={styles.portrait}
          style={{ x: portraitX, y: portraitY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: ease.out, delay: 0.2 }}
        >
          <Media media={site.portrait} alt={site.portrait.alt} tone="dusk" kind="portrait" label={t('hero.photoPlaceholder')} eager />
        </motion.figure>

        <Sticker text={site.sticker} />

        {featured.map((project, i) => (
          <HeroCard key={project.id} project={project} pose={POSES[i]} index={i} sx={sx} sy={sy} />
        ))}
      </div>
    </section>
  )
}

function Sticker({ text }) {
  return (
    <motion.div
      className={styles.sticker}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...spring.soft, delay: 0.9 }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      >
        <defs>
          <path id="sticker-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text>
          <textPath href="#sticker-circle" textLength="232">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <svg className={styles.stickerMark} viewBox="0 0 20 20">
        <path d="M10 0c.6 5.3 4.1 9 10 10-5.9 1-9.4 4.7-10 10C9.4 14.7 5.9 11 0 10c5.9-1 9.4-4.7 10-10z" fill="currentColor" />
      </svg>
    </motion.div>
  )
}

function HeroCard({ project, pose, index, sx, sy }) {
  const x = useTransform(sx, (v) => v * pose.depth)
  const y = useTransform(sy, (v) => v * pose.depth)
  const rotateY = useTransform(sx, (v) => v * 14)
  const rotateX = useTransform(sy, (v) => v * -14)
  const delay = 0.55 + index * stagger.loose

  return (
    <motion.div
      className={`${styles.slot} ${pose.className}`}
      aria-hidden="true"
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: pose.rotate }}
      transition={{ ...spring.soft, delay, opacity: { duration: 0.35, delay } }}
    >
      <motion.div className={styles.card} style={{ x, y, rotateX, rotateY }}>
        <Media media={project.media} tone={project.tone} kind={project.category} eager />
        <div className={styles.overlay}>
          <span className={styles.handle}>
            <span className={styles.avatar} />
            {project.brand}
          </span>
          <span className={styles.caption}>{project.title}</span>
          {index === 0 && (
            <span className={styles.progress}>
              <motion.span
                className={styles.progressFill}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 7, ease: 'linear', repeat: Infinity, delay: 1.2 }}
              />
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
