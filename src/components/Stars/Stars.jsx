import { useT } from '@/i18n/LocaleProvider.jsx'
import styles from './Stars.module.css'

export default function Stars({ rating = 5, max = 5 }) {
  const t = useT()

  return (
    <span className={styles.stars} role="img" aria-label={t('stars.label', { rating, max })}>
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" data-on={i < rating} aria-hidden="true">
          <path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L10 14.8l-5.4 2.9 1.2-5.9L1.4 7.7l6-.7z" fill="currentColor" />
        </svg>
      ))}
    </span>
  )
}
