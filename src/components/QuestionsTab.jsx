import s from './QuestionsTab.module.css'
import QuestionCard from './QuestionCard.jsx'
import Sticker from './Sticker.jsx'
import { sortQuestions } from '../data/questions.js'

// Стена вопросов: сверху кнопка «задать вопрос», затем карточки.
// Неотвеченные вопросы тебе всегда первые.
export default function QuestionsTab({ questions, person, faceOf, onReply, onReport, onAsk }) {
  const list = sortQuestions(questions)

  return (
    <div className={s.tab}>
      <button className={s.ask} type="button" onClick={onAsk}>
        <Sticker name="eyes" size={30} />
        задать вопрос
      </button>

      {list.length === 0 && (
        <div className={s.empty}>
          <Sticker name="star" size={96} />
          <span className={s.emptyTitle}>вопросов пока нет</span>
          <span className={s.emptySub}>спроси кого-нибудь первым — это анонимно</span>
        </div>
      )}

      <ul className={s.list}>
        {list.map((q) => (
          <li key={q.id}>
            <QuestionCard q={q} person={person} faceOf={faceOf} onReply={onReply} onReport={onReport} />
          </li>
        ))}
      </ul>
    </div>
  )
}
