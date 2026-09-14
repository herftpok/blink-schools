import { useEffect, useState } from 'react'
import QuestionsApp from './QuestionsApp.jsx'
import s from './ElectionsDoc.module.css'


// Развёртка: каждый экран фичи и одна-две строки о том, что в нём неочевидно.
const SCREENS = [
  { title: 'хаб · точка входа', tab: 'students', note: 'вход — вторая вкладка секции рядом со «студентами»; кнопка «позвать друзей» остаётся' },
  { title: 'стена вопросов', note: 'одна лента: адресат — отметка @имя в начале вопроса, под ним его ответ; неотвеченные вопросы тебе всегда первые с кнопкой «ответить»' },
  { title: 'ответить', answer: 'm1', note: 'боттомшит: вопрос, строка ввода со счётчиком до 140 символов и кнопка отправки' },
  { title: 'пожаловаться', report: 'q1', note: 'пиктограмма рядом со временем; модалка как в чатах блинка: «пожаловаться» и «отменить»' },
  { title: 'спросить', ask: true, note: 'сначала кому — поиск по школе, потом текст; без адресата отправить нельзя' }
]

// высота полоски-переключателя над страницей (SchoolDoc задаёт --doc-bar на body)
const docBar = () => parseInt(getComputedStyle(document.body).getPropertyValue('--doc-bar')) || 0

const K = 0.36

function Frame({ answer, ask, report, tab, title, note }) {
  return (
    <figure className={s.frame}>
      <div className={s.frameBox} style={{ width: 390 * K, height: 844 * K }}>
        <div className={s.frameScale} style={{ transform: `scale(${K})` }}>
          <QuestionsApp initialAnswer={answer ?? null} initialReport={report ?? null} initialAsk={!!ask} initialTab={tab ?? 'questions'} />
        </div>
      </div>
      <figcaption>
        <b>{title}</b>
        <span>{note}</span>
      </figcaption>
    </figure>
  )
}

export default function QuestionsDoc() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 56 - docBar()) / 844))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div className={s.page}>
      <aside className={s.docs}>
        <h1 className={s.title}>анонимные вопросы</h1>
        <p className={s.sub}>развёртка экранов · блинк, школы</p>
        <div className={s.grid}>
          {SCREENS.map((sc) => <Frame key={sc.title} {...sc} />)}
        </div>
      </aside>

      <main className={s.stage}>
        <div className={s.protoBox} style={{ width: 390 * scale, height: 844 * scale }}>
          <div className={s.protoScale} style={{ transform: `scale(${scale})` }}>
            <QuestionsApp />
          </div>
        </div>
      </main>
    </div>
  )
}
