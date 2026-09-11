import { useState } from 'react'
import s from './ClubScreen.module.css'
import StudentCard from './StudentCard.jsx'
import ClubTile from './ClubTile.jsx'
import squareCloseUrl from '../assets/square-close.svg'
import bubbleUrl from '../assets/chat-bubble-3d.png'
import { membersWord } from '../data/clubs.js'

// Экран клуба: плитка и название, вход в чат клуба (только участникам),
// список участников. Внизу — «вступить» или «выйти».
export default function ClubScreen({ club, person, faceOf, member, onJoin, onLeave, onOpenChat, onBack }) {
  const [closing, setClosing] = useState(false)
  const close = () => {
    setClosing(true)
    setTimeout(onBack, 320)
  }
  // Создатель первым, с подписью «создатель»
  const people = [...club.members].sort((a, b) => (a === club.createdBy ? -1 : b === club.createdBy ? 1 : 0)).map(person)

  return (
    <div className={`screen ${s.screen} ${closing ? s.closing : ''}`} onAnimationEnd={(e) => e.target === e.currentTarget && closing && onBack()}>
      <button className={s.x} type="button" onClick={close} aria-label="Закрыть"><img src={squareCloseUrl} alt="" /></button>

      <div className="scroll">
        <div className={s.hero}>
          <ClubTile club={club} size={72} radius={24} className={s.tile} />
          <h1 className={s.name}>{club.name}</h1>
          <div className={s.count}>{club.members.length} {membersWord(club.members.length)}</div>
        </div>

        <button className={`${s.chat} ${member ? '' : s.chatLocked}`} type="button" onClick={member ? onOpenChat : undefined} disabled={!member}>
          <img src={bubbleUrl} alt="" className={s.chatIcon} aria-hidden />
          <span className={s.chatText}>
            <span className={s.chatTitle}>чат клуба</span>
            <span className={s.chatSub}>{member ? 'видят только участники' : 'откроется после вступления'}</span>
          </span>
          {!member && (
            <svg className={s.lock} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="4" y="11" width="16" height="10" rx="3" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          )}
        </button>

        <div className={s.sectionHead}>участники</div>
        <ul className={s.list}>
          {people.map((p) => (
            <li key={p.id}>
              <StudentCard student={{ ...p, state: 'none' }} photoIndex={faceOf(p.id)} role={p.id === club.createdBy ? 'создатель' : null} />
            </li>
          ))}
        </ul>
        <div className={s.tail} />
      </div>

      <div className={s.bottomBar}>
        {member ? (
          <button className={`${s.btn} ${s.btnDark}`} type="button" onClick={onLeave}>выйти из клуба</button>
        ) : (
          <button className={`${s.btn} ${s.btnWhite}`} type="button" onClick={onJoin}>вступить</button>
        )}
      </div>
    </div>
  )
}
