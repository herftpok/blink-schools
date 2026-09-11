import { useEffect, useState } from 'react'
import SchoolApp from './SchoolApp.jsx'
import s from './ElectionsDoc.module.css'

const MODES = [
  { id: 'pre', label: 'до выборов' },
  { id: 'voting', label: 'идут выборы' },
  { id: 'president', label: 'ты президент' }
]

// Развёртка: каждый экран фичи и одна-две строки о том, что в нём неочевидно.
const SCREENS = [
  { title: 'хаб · до старта', mode: 'pre', view: 'university', note: 'вход — корешок под названием школы; надпись меняется по фазе' },
  { title: 'кандидаты · до старта', mode: 'pre', view: 'election', note: 'список заявок без реакций; «?» у заголовка открывает шит «что такое выборы»' },
  { title: 'хаб · идут выборы', mode: 'voting', view: 'university', note: 'корешок: «осталось 13 дней»' },
  { title: 'голосование', mode: 'voting', view: 'election', note: 'реакция ставится в строке, одна на человека: повтор снимает, другая заменяет. порядок по «за», у первого пунктирная корона' },
  { title: 'анкета кандидата', mode: 'voting', view: 'election', nominate: true, note: 'одно рукописное поле и подпись; после отправки плакат не навязывается' },
  { title: 'плакат кандидата', mode: 'voting', view: 'election', share: true, note: 'крупно школа, фото на скотче, обещание на линейках, печать с номером; имя не склоняется' },
  { title: 'итоги', mode: 'results', view: 'results', note: 'победитель с печатью «выбран», таблица остальных, строка «ты за»' },
  { title: 'хаб · ты президент', mode: 'president', view: 'university', note: 'первая строка списка с короной и подписью «президент школы»; корешка нет; шестерёнка слева вверху' },
  { title: 'настройки школы', mode: 'president', view: 'panel', note: 'имя, закреп и цвет: три точки на кольце дают градиент хаба, кнопка в центре — случайное сочетание' }
]

// высота полоски-переключателя над страницей (SchoolDoc задаёт --doc-bar на body)
const docBar = () => parseInt(getComputedStyle(document.body).getPropertyValue('--doc-bar')) || 0

const K = 0.36

function Frame({ mode, view, nominate, share, title, note }) {
  return (
    <figure className={s.frame}>
      <div className={s.frameBox} style={{ width: 390 * K, height: 844 * K }}>
        <div className={s.frameScale} style={{ transform: `scale(${K})` }}>
          <SchoolApp mode={mode} initialView={view} initialNominate={!!nominate} initialShare={!!share} />
        </div>
      </div>
      <figcaption>
        <b>{title}</b>
        <span>{note}</span>
      </figcaption>
    </figure>
  )
}

export default function ElectionsDoc() {
  const [mode, setMode] = useState(() => window.location.hash.match(/\/(pre|voting|president)$/)?.[1] ?? 'voting')
  const [run, setRun] = useState(0)
  const [scale, setScale] = useState(1)

  // прототип целиком помещается в высоту окна
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 56 - docBar()) / 844))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const jump = (next) => { setMode(next); setRun((n) => n + 1) }

  return (
    <div className={s.page}>
      <aside className={s.docs}>
        <h1 className={s.title}>выборы президента школы</h1>
        <p className={s.sub}>развёртка экранов · блинк, школы</p>
        <div className={s.grid}>
          {SCREENS.map((sc) => <Frame key={sc.title} {...sc} />)}
        </div>
      </aside>

      <main className={s.stage}>
        <div className={s.protoBox} style={{ width: 390 * scale, height: 844 * scale }}>
          <div className={s.protoScale} style={{ transform: `scale(${scale})` }}>
            <SchoolApp key={`${mode}-${run}`} mode={mode} />
          </div>
        </div>
        <div className={s.modes}>
          {MODES.map((m) => (
            <button key={m.id} className={`${s.mode} ${mode === m.id ? s.modeActive : ''}`} type="button" onClick={() => jump(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
