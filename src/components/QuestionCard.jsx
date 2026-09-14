import s from './QuestionCard.module.css'
import Photo from './Photo.jsx'
import Sticker from './Sticker.jsx'
import { colorFor, ago } from '../data/questions.js'

// Карточка на стене. Адресат — отметка @имя в начале вопроса,
// как в соцсетях. Ниже — его ответ. Карточка не кликается.
export default function QuestionCard({ q, person, faceOf, onReply, onReport }) {
  const target = person(q.to)
  const toMe = q.to === 'me' && !q.answer

  return (
    <article className={s.card} style={{ '--glow': colorFor(q.id) }}>
      <div className={s.top}>
        {q.sticker && <Sticker name={q.sticker} size={64} className={s.sticker} />}
        <span className={s.meta}>
          <button className={s.report} type="button" onClick={() => onReport(q.id)} aria-label="Пожаловаться на вопрос">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </button>
          <span className={s.time}>{ago(q.time)}</span>
        </span>
        <p className={s.text}>
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
      </div>
    </article>
  )
}
