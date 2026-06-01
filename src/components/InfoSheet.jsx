import { useEffect } from 'react'
import s from './InfoSheet.module.css'

export default function InfoSheet({ open, onClose, showMe, onToggleShowMe }) {
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
        aria-label="это как?"
        aria-hidden={!open}
      >
        <div className={s.grabber} />

        <div className={s.head}>
          <span className={s.title}>это как?</span>
          <button className={s.close} onClick={onClose} aria-label="Закрыть">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        <div className={s.body}>
          <p className={s.text}>
            здесь видно, кто из студентов сейчас на территории корпуса. можно
            посмотреть, кто рядом, и познакомиться — добавить в друзья или написать.
          </p>

          <button
            className={s.toggle}
            role="switch"
            aria-checked={showMe}
            onClick={onToggleShowMe}
          >
            <span className={s.toggleText}>
              <span className={s.toggleTitle}>показывать меня в списке</span>
              <span className={s.toggleSub}>другие увидят, что ты на территории</span>
            </span>
            <span className={`${s.switch} ${showMe ? s.switchOn : ''}`}>
              <span className={s.knob} />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
