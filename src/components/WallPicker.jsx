import { useState } from 'react'
import s from './WallPicker.module.css'
import avatarUrl from '../assets/avatar.svg'

// Список чатов универа: аватар корпуса, название и число участников.
export default function WallPicker({ buildings, onPick, onBack }) {
  const [closing, setClosing] = useState(false)
  const close = () => setClosing(true)

  return (
    <div
      className={`screen ${s.screen} ${closing ? s.closing : ''}`}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && closing) onBack()
      }}
    >
      <header className={s.header}>
        <h1 className={s.headerTitle}>чаты универа</h1>
        <button className={s.headerBtn} onClick={close} aria-label="Закрыть">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div className="scroll">
        <ul className={s.list}>
          {buildings.map((b) => (
            <li key={b.id}>
              <button className={s.row} onClick={() => onPick(b.id)}>
                <img src={avatarUrl} alt="" className={s.avatar} aria-hidden />
                <span className={s.body}>
                  <span className={s.name}>{b.faculty.toLowerCase()}</span>
                  <span className={s.members}>{b.members} участников</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={s.footer}>
        <button className={s.createBtn} type="button">
          создать чатик
        </button>
      </div>
    </div>
  )
}
