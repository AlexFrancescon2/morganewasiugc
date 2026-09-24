import { useContent } from '@/hooks/useContent.js'
import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Contact.module.css'

export default function Contact() {
  const { data: site } = useContent('site')
  const t = useT()

  return (
    <footer id="contact" className={`theme-inverse ${styles.contact}`}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>{t('contact.title')}</h2>
        <p className={styles.lede}>
          {site.availability.label}. {t('contact.lede')}
        </p>

        <a className={styles.email} href={`mailto:${site.email}`}>
          {site.email}
        </a>

        <ul className={styles.socials}>
          {site.socials.map((social) => (
            <li key={social.id}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <a href="#top">{t('contact.backToTop')}</a>
        </div>
      </div>
    </footer>
  )
}
