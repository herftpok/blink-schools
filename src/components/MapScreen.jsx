import s from './MapScreen.module.css'
import refUrl from '../assets/map/ref.png'
import discoUrl from '../assets/disco.png'

export default function MapScreen({ showEntry = true, onOpenEntry }) {
  return (
    <div className={`screen ${s.screen}`}>
      <img src={refUrl} alt="" className={s.bg} aria-hidden />

      {showEntry && (
        <button className={s.entry} onClick={onOpenEntry} aria-label="Открыть лайв-чат">
          <img src={discoUrl} alt="" className={s.disco} />
        </button>
      )}
    </div>
  )
}
