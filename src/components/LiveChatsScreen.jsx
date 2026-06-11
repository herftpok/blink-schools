import { useState } from 'react'
import s from './LiveChatsScreen.module.css'

function formatDistance(meters) {
  if (meters == null) return ''
  if (meters === 0) return 'вы здесь'
  if (meters < 1000) return `${meters} м`
  const km = meters / 1000
  return `${km < 10 ? km.toFixed(1).replace('.', ',') : Math.round(km)} км`
}

export default function LiveChatsScreen({ chats, onOpen, onBack }) {
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
        <button className={s.headerBtn} onClick={close} aria-label="Назад">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div className={s.headerText}>
          <div className={s.headerTitle}>лайв-чаты</div>
          <div className={s.headerSub}>{chats.length} события рядом сейчас</div>
        </div>
        <div className={s.headerSpacer} />
      </header>

      <div className="scroll">
        <ul className={s.list}>
          {chats.map((c) => (
            <li key={c.id}>
              <div className={`${s.card} ${c.youHere ? s.cardHere : ''}`}>
                <div className={s.topRow}>
                  <span className={s.live}>
                    <span className={s.liveDot} /> live
                  </span>
                  <span className={s.place}>{c.place}</span>
                </div>

                <div className={s.metaRow}>
                  <svg className={s.pin} viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className={s.area}>{c.area}</span>
                  <span className={s.dot}>·</span>
                  <span className={s.trail}>{formatDistance(c.distance)}</span>
                </div>

                <div className={s.statsRow}>
                  <span className={s.people}>
                    <span className={s.greenDot} /> {c.people} человек
                  </span>
                  <span className={s.dot}>·</span>
                  <span className={s.ends}>заканчивается через {c.endsIn}</span>
                </div>

                <button className={s.openBtn} type="button" onClick={() => onOpen(c.id)}>
                  открыть чат
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
