import { useEffect } from 'react'
import s from './NoticeSheet.module.css'

export default function NoticeSheet({ open, onClose, title, text }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <div
        className={`${s.backdrop} ${open ? s.open : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <div
        className={`${s.sheet} ${open ? s.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
      >
        <div className={s.grabber} />

        <div className={s.head}>
          <span className={s.title}>{title}</span>
          <button className={s.close} onClick={onClose} aria-label="Закрыть">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        <div className={s.body}>
          <p className={s.text}>{text}</p>
        </div>
      </div>
    </>
  )
}
