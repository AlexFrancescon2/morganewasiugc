import { useContent } from '@/hooks/useContent.js'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Process.module.css'

export default function Process() {
  const { data: steps } = useContent('process')
  const t = useT()

  return (
    <section id="process" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <h2 className={styles.title}>{t('process.title')}</h2>
          <p className={styles.lede}>{t('process.lede')}</p>
        </div>
        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <li key={step.id} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
              <p className={styles.when}>{step.duration}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
