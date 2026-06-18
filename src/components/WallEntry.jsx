import s from './WallEntry.module.css'
import starUrl from '../assets/star.svg'
import AvatarStack from './AvatarStack.jsx'

function Star({ count, big }) {
  return (
    <span className={big ? s.bigStar : s.starBadge} aria-hidden>
      <img src={starUrl} alt="" className={big ? s.bigStarImg : s.starImg} />
      <span className={big ? s.bigStarCount : s.starCount}>{count}</span>
    </span>
  )
}

const WALL_FACES = [1, 5, 9]

// Родительный падеж названия корпуса: «стена экономического факультета»
function declineWord(w) {
  const l = w.toLowerCase()
  if (/(ий|ый|ой)$/.test(l)) return w.slice(0, -2) + 'ого'
  if (/ое$/.test(l)) return w.slice(0, -2) + 'ого'
  if (/(ая|яя)$/.test(l)) return w.slice(0, -2) + 'ой'
  if (/ие$/.test(l)) return w.slice(0, -2) + 'ия'
  if (/ь$/.test(l)) return w.slice(0, -1) + 'я'
  if (/е$/.test(l)) return w.slice(0, -1) + 'я'
  if (/[бвгджзйклмнпрстфхцчшщ]$/.test(l)) return w + 'а'
  return w
}

function toGenitive(name) {
  return name
    .split(/(\s+)/)
    .map((part) => (/^\s+$/.test(part) ? part : declineWord(part)))
    .join('')
}

export default function WallEntry({ building, buildingUnread = 0, faceIndices, activity = 9, accent, onClick }) {
  // Кнопка чата конкретного корпуса: композиция аватаров + «стена {корпус}» + звезда.
  // Обводка подстраивается под акцентный цвет градиента корпуса (--wall-accent).
  if (building) {
    return (
      <button
        className={`${s.card} ${s.universa} ${s.campus}`}
        style={accent ? { '--wall-accent': accent } : undefined}
        onClick={onClick}
      >
        <div className={s.left}>
          <span className={s.stackSlot}>
            <AvatarStack indices={faceIndices ?? [0, 1, 2]} />
          </span>
          <div className={s.text}>
            <div className={s.title}>стена {toGenitive(building.faculty)}</div>
            <div className={s.sub}>посмотри что пишут</div>
          </div>
        </div>
        <Star count={buildingUnread} big />
      </button>
    )
  }

  // Кнопка «стена универа» (режим всех корпусов)
  return (
    <button className={`${s.card} ${s.universa}`} onClick={onClick}>
      <div className={s.left}>
        <span className={s.stackSlot}>
          <AvatarStack indices={WALL_FACES} />
        </span>
        <div className={s.text}>
          <div className={s.title}>посмотри, что пишут студенты</div>
        </div>
      </div>
      <Star count={activity} big />
    </button>
  )
}
