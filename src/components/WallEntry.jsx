import s from './WallEntry.module.css'
import bubbleUrl from '../assets/chat-bubble-3d.png'

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

// Вход в чаты универа: белая карточка, пузырь слева, заголовок в две строки.
export default function WallEntry({ building, onClick }) {
  const title = building ? `стена ${toGenitive(building.faculty)}` : 'посмотри, о чём говорят студенты'

  return (
    <button className={s.card} type="button" onClick={onClick}>
      <img src={bubbleUrl} alt="" className={s.icon} aria-hidden />
      <span className={s.title}>{title}</span>
    </button>
  )
}
