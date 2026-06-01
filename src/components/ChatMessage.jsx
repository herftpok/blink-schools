import s from './ChatMessage.module.css'

// Единый пузырь сообщения: имя над пузырём, аватар-квадрат снизу слева.
// Используется и для постов на стене, и для комментариев в обсуждении.
export default function ChatMessage({ name, initial, avatar, anon, text, mine, showHeader }) {
  return (
    <div className={`${s.bubbleRow} ${mine ? s.bubbleRowMine : ''}`}>
      {!mine && (
        <span
          className={`${s.avatar} ${anon ? s.avatarAnon : ''}`}
          style={!anon ? { background: avatar } : undefined}
          aria-hidden
        >
          {anon ? '?' : initial}
        </span>
      )}
      <div className={s.bubbleCol}>
        {showHeader && !mine && <div className={s.name}>{anon ? 'аноним' : name}</div>}
        <div className={`${s.bubble} ${mine ? s.bubbleMine : ''}`}>{text}</div>
      </div>
    </div>
  )
}
