import { useState } from 'react'
import { faceAt } from '../utils/faces.js'
import s from './EventsScreen.module.css'

function formatDistance(meters) {
  if (meters == null) return ''
  if (meters < 1000) return `${meters} м`
  const km = meters / 1000
  return `${km < 10 ? km.toFixed(1).replace('.', ',') : Math.round(km)} км`
}

// Типы мест: цвет + иконка для подписи под сторисом
const PLACE_TYPES = {
  park:    { color: '#5FF780' },
  club:    { color: '#C18CFF' },
  bar:     { color: '#FFB269' },
  square:  { color: '#6AB2FF' },
  rooftop: { color: '#FF8A5E' },
  cafe:    { color: '#E0A56A' }
}

function PlaceIcon({ type, color }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 16,
    height: 16,
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true
  }
  switch (type) {
    case 'park':
      return <svg {...common}><path d="M12 4l-4 6h8l-4-6z" /><path d="M12 9l-5 7h10l-5-7z" /><path d="M12 16v4" /></svg>
    case 'club':
      return <svg {...common}><path d="M9 17V6l9-2v9" /><circle cx="6.5" cy="17" r="2.5" /><circle cx="15.5" cy="15" r="2.5" /></svg>
    case 'bar':
      return <svg {...common}><path d="M5 4h14l-7 8-7-8z" /><path d="M12 12v6" /><path d="M8 20h8" /></svg>
    case 'square':
      return <svg {...common}><path d="M12 3l8 5H4l8-5z" /><path d="M6 8v9M10 8v9M14 8v9M18 8v9" /><path d="M3 21h18" /></svg>
    case 'rooftop':
      return <svg {...common}><circle cx="17.5" cy="6.5" r="2.5" /><path d="M3 21V10l6-4 6 4v11" /><path d="M3 21h18" /><path d="M7 21v-4h4v4" /></svg>
    case 'cafe':
      return <svg {...common}><path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z" /><path d="M16 9h2.5a2.5 2.5 0 0 1 0 5H16" /><path d="M8 3v2M12 3v2" /></svg>
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8" /></svg>
  }
}

function Checkin({ story, seen, onOpen }) {
  const avatar = faceAt(story.face)
  const meta = PLACE_TYPES[story.type] ?? PLACE_TYPES.bar
  return (
    <button className={`${s.story} ${seen ? s.seen : ''}`} onClick={onOpen}>
      <span className={`${s.storyThumb} ${seen ? '' : s.unseen}`}>
        <img src={story.img} alt="" className={s.storyImg} />
        <span className={s.storyAvatar}>
          {avatar ? <img src={avatar} alt="" /> : <span className={s.avatarFallback} />}
        </span>
      </span>
      <span className={s.storyMeta}>
        <PlaceIcon type={story.type} color={meta.color} />
        <span className={s.storyAddress}>{story.address}</span>
      </span>
    </button>
  )
}

export default function EventsScreen({ chats, stories, seenStories, onOpenStory, onJoin, onBack }) {
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
        <div className={s.headerTitle}>лайв события</div>
        <div className={s.headerSpacer} />
      </header>

      <div className="scroll">
        <div className={s.sectionLabel}>чекины</div>
        <div className={s.checkins}>
          {stories.map((st, i) => (
            <Checkin key={st.id} story={st} seen={seenStories?.has(st.id)} onOpen={() => onOpenStory(i)} />
          ))}
        </div>

        <div className={s.sectionLabel}>сейчас в городе</div>
        <ul className={s.list}>
          {chats.map((c) => (
            <li key={c.id}>
              <div className={`${s.card} ${c.youHere ? s.cardHere : ''}`}>
                <div className={s.cardTop}>
                  <span className={s.live}>
                    <span className={s.liveDot} /> live
                  </span>
                  <span className={s.place}>{c.place}</span>
                </div>

                <div className={s.meta}>
                  {c.area} · {c.youHere ? 'вы здесь' : formatDistance(c.distance)}
                </div>

                {c.youHere ? (
                  <>
                    <div className={s.peopleRow}>
                      <span className={s.people}>
                        <span className={s.greenDot} /> {c.people} человек
                      </span>
                    </div>
                    <button className={s.joinBtn} type="button" onClick={() => onJoin(c.id)}>
                      вступить в чатик
                    </button>
                  </>
                ) : (
                  <div className={s.peopleRow}>
                    <span className={s.people}>
                      <span className={s.greenDot} /> {c.people} человек
                    </span>
                    <button className={s.routeBtn} type="button" aria-label="Построить маршрут">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 11l19-8-8 19-2.5-8.5L3 11z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
