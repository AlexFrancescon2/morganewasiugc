import { useContent } from '@/hooks/useContent.js'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Faq.module.css'

export default function Faq() {
  const { data: faq } = useContent('faq')
  const { data: site } = useContent('site')
  const t = useT()

  return (
    <section id="faq" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <h2 className={styles.title}>{t('faq.title')}</h2>
          <p className={styles.note}>
            {t('faq.note')} <a href={`mailto:${site.email}`}>{t('faq.emailMe')}</a>, {t('faq.reply')}
          </p>
        </div>

        <div className={styles.list}>
          {faq.map((item) => (
            <details key={item.id} className={styles.item} name="faq">
              <summary className={styles.question}>
                {item.question}
                <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
