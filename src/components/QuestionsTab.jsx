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
