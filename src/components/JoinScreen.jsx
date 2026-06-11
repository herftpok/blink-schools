import { useState } from 'react'
import Photo from './Photo.jsx'
import s from './JoinScreen.module.css'
import discoUrl from '../assets/disco.png'

export default function JoinScreen({ chat, onJoin, onCancel }) {
  const [closing, setClosing] = useState(false)
  const people = chat.here ?? []
  const names = people.slice(0, 5).map((p) => p.name)

  const cancel = () => setClosing(true)

  return (
    <div
      className={`screen ${s.screen} ${closing ? s.closing : ''}`}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && closing) onCancel()
      }}
    >
      <div className={s.grabber} />

      <div className={s.body}>
        <div className={s.icon}>
          <img src={discoUrl} alt="" />
        </div>

        <div className={s.title}>{chat.place}</div>
        <div className={s.count}>{chat.people} человек</div>

        <div className={s.avatars}>
          {people.slice(0, 5).map((p) => (
            <span key={p.id} className={s.av} aria-hidden>
              {p.initial}
              <Photo index={p.face} />
            </span>
          ))}
        </div>

        <div className={s.names}>
          в чатике уже есть <span className={s.namesHi}>{names.join(', ')}</span> и другие
        </div>
      </div>

      <div className={s.actions}>
        <button className={s.join} type="button" onClick={onJoin}>
          вступить в чатик
        </button>
        <button className={s.cancel} type="button" onClick={cancel}>
          отмена
        </button>
      </div>
    </div>
  )
}
