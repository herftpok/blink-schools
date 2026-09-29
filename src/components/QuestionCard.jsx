import s from './QuestionCard.module.css'
import Photo from './Photo.jsx'
import Sticker from './Sticker.jsx'
import { colorFor, ago, canDelete } from '../data/questions.js'

// Карточка на стене. Адресат — отметка @имя в начале вопроса,
// как в соцсетях. Ниже — его ответ. Карточка не кликается.
export default function QuestionCard({ q, person, faceOf, onReply, onDelete }) {
  const target = person(q.to)
  const toMe = q.to === 'me' && !q.answer

  return (
    <article className={s.card} style={{ '--glow': colorFor(q.id) }}>
      <div className={s.top}>
        {q.sticker && <Sticker name={q.sticker} size={64} className={s.sticker} />}
        <span className={s.meta}>
          <span className={s.time}>{ago(q.time)}</span>
        </span>
        <p className={`${s.text} ${q.text.length > 80 ? s.textLong : ''}`}>
          <span className={s.mention}>@{target.name}</span>{' '}{q.text}
        </p>
      </div>

      <div className={s.bottom}>
        {q.answer ? (
          <div className={s.answer}>
            <span className={s.avatar} style={{ background: target.avatar }}>
              <span>{target.initial}</span>
              <Photo index={faceOf(q.to)} />
            </span>
            <span className={s.answerBody}>
              <span className={s.name}>{target.name}</span>
              <span className={s.answerText}>{q.answer.text}</span>
            </span>
          </div>
        ) : (
          <span className={s.wait}>ответа пока нет</span>
        )}
        {toMe && <button className={s.reply} type="button" onClick={() => onReply(q.id)}>ответить</button>}
        {canDelete(q) && (
          <button className={s.del} type="button" onClick={() => onDelete(q.id)} aria-label="Удалить вопрос">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
        )}
      </div>
    </article>
  )
}
