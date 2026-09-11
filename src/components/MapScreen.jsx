import s from './MapScreen.module.css'
import refUrl from '../assets/map/ref.png'
import discoUrl from '../assets/disco.png'

export default function MapScreen({ showEntry = true, onOpenEntry, onOpenEvents }) {
  return (
    <div className={`screen ${s.screen}`}>
      <img src={refUrl} alt="" className={s.bg} aria-hidden />

      {showEntry && (
        <button className={s.entry} onClick={onOpenEntry} aria-label="Открыть лайв-чат">
          <img src={discoUrl} alt="" className={s.disco} />
        </button>
      )}

      {/* события в городе + лайв-лента сторисов */}
      <button className={s.eventsBtn} onClick={onOpenEvents} aria-label="События в городе">
        <svg className={s.eventsIcon} viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
          <path d="M12 2.5l1.9 4.9 4.9 1.9-4.9 1.9L12 16.1l-1.9-4.9L5.2 9.3l4.9-1.9L12 2.5z" />
          <path d="M18.5 14.5l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3z" />
        </svg>
        <span className={s.eventsDot} />
      </button>
    </div>
  )
}
