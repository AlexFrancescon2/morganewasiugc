import { useEffect, useRef } from 'react'
import { cx } from '@/lib/cx.js'
import styles from './Media.module.css'

/**
 * Renders a video, an image, or (when there's no src yet) a styled placeholder
 * whose shape hints at the category: a plate, a bottle, a book.
 */
export default function Media({ media = {}, alt = '', tone = 'sky', kind, label, playing = false, eager = false, className }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (playing) video.play().catch(() => {})
    else video.pause()
  }, [playing])

  if (media.type === 'video' && media.src) {
    return (
      <video
        ref={videoRef}
        className={cx(styles.media, className)}
        src={media.src}
        poster={media.poster || undefined}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    )
  }

  if (media.src) {
    return (
      <img
        className={cx(styles.media, className)}
        src={media.src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    )
  }

  return (
    <div className={cx(styles.placeholder, className)} data-tone={tone} data-kind={kind} role="img" aria-label={alt}>
      {media.type === 'video' && (
        <svg className={styles.play} viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="23" fill="currentColor" opacity="0.18" />
          <path d="M19 15.5v17l14-8.5z" fill="currentColor" />
        </svg>
      )}
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}
