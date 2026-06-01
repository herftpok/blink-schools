import s from './WallEntry.module.css'
import chatGlyphUrl from '../assets/chat-glyph.svg'
import facesUrl from '../assets/faces.png'
import starUrl from '../assets/star.svg'
import AvatarStack from './AvatarStack.jsx'

function Star({ count }) {
  return (
    <span className={s.starBadge} aria-label={`${count} непрочитанных`}>
      <img src={starUrl} alt="" className={s.starImg} />
      <span className={s.starCount}>{count}</span>
    </span>
  )
}

export default function WallEntry({ building, unreadTotal = 0, buildingUnread = 0, faceIndices, onClick }) {
  // Кнопка чата конкретного корпуса: композиция аватаров + «чатик {корпус}» + звезда
  if (building) {
    return (
      <button className={`${s.card} ${s.universa} ${s.campus}`} onClick={onClick}>
        <div className={s.left}>
          <span className={s.stackSlot}>
            <AvatarStack indices={faceIndices ?? [0, 1, 2]} />
          </span>
          <div className={s.text}>
            <div className={s.title}>чатик {building.faculty.toLowerCase()}</div>
          </div>
        </div>
        {buildingUnread > 0 && <Star count={buildingUnread} />}
      </button>
    )
  }

  // Кнопка «стена универа» (режим всех корпусов)
  const showStar = unreadTotal > 0
  return (
    <button className={`${s.card} ${s.universa}`} onClick={onClick}>
      <div className={s.left}>
        {showStar ? (
          <Star count={unreadTotal} />
        ) : (
          <div className={s.avatar}>
            <img src={chatGlyphUrl} alt="" className={s.glyph} />
          </div>
        )}
        <div className={s.text}>
          <div className={s.title}>стена универа</div>
        </div>
      </div>
      <img src={facesUrl} alt="" className={s.faces} />
    </button>
  )
}
