import { useId } from 'react'
import styles from './Flag.module.css'

export default function Flag({ code, size = 22 }) {
  return (
    <span className={styles.flag} style={{ width: size, height: size }} aria-hidden="true">
      {code === 'it' && <Tricolour colours={['#009246', '#FFFFFF', '#CE2B37']} />}
      {code === 'fr' && <Tricolour colours={['#0055A4', '#FFFFFF', '#EF4135']} />}
      {code === 'en' && <UnionJack />}
    </span>
  )
}

function Tricolour({ colours }) {
  return (
    <svg viewBox="0 0 3 3" preserveAspectRatio="none">
      {colours.map((fill, i) => (
        <rect key={fill} x={i} width="1" height="3" fill={fill} />
      ))}
    </svg>
  )
}

function UnionJack() {
  // Each flag instance needs its own clip ids, or the switcher and its menu clash.
  const id = 'uj' + useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg viewBox="15 0 30 30">
      <clipPath id={`${id}t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}t)`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}
