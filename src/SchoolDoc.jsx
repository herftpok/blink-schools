import { useEffect, useState } from 'react'
import SchoolAllApp from './SchoolAllApp.jsx'
import SchoolApp from './SchoolApp.jsx'
import QuestionsApp from './QuestionsApp.jsx'
import ClubsApp from './ClubsApp.jsx'
import ElectionsDoc from './ElectionsDoc.jsx'
import QuestionsDoc from './QuestionsDoc.jsx'
import ClubsDoc from './ClubsDoc.jsx'
import s from './ElectionsDoc.module.css'
import d from './SchoolDoc.module.css'

// Одна страница на три фичи: переключатель справа вверху,
// «все вместе» — компиляция фич в одном прототипе.
const FEATURES = [
  { id: 'all', label: 'все вместе' },
  { id: 'elections', label: 'выборы' },
  { id: 'questions', label: 'вопросы' },
  { id: 'clubs', label: 'клубы' }
]

// Режимы выборов — на мобильном вторая полоска под основной
const ELECTION_MODES = [
  { id: 'pre', label: 'до выборов' },
  { id: 'voting', label: 'идут выборы' },
  { id: 'president', label: 'ты президент' }
]

const MOBILE = '(max-width: 700px)'

function useMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE).matches)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE)
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

// Мобильная версия: полоски переключения сверху, прототип во весь экран
function MobileDoc({ feature, onFeature }) {
  const [mode, setMode] = useState('voting')
  const [run, setRun] = useState(0)
  const jump = (next) => { setMode(next); setRun((n) => n + 1) }

  return (
    <div className={d.mobile}>
      <nav className={d.mBar} aria-label="Фича">
        {FEATURES.map((f) => (
          <button key={f.id} className={`${d.mItem} ${feature === f.id ? d.mItemOn : ''}`} type="button" onClick={() => onFeature(f.id)}>
            {f.label}
          </button>
        ))}
      </nav>
      {feature === 'elections' && (
        <nav className={`${d.mBar} ${d.mBarSub}`} aria-label="Фаза выборов">
          {ELECTION_MODES.map((m) => (
            <button key={m.id} className={`${d.mItem} ${mode === m.id ? d.mItemOn : ''}`} type="button" onClick={() => jump(m.id)}>
              {m.label}
            </button>
          ))}
        </nav>
      )}
      <div className={d.mStage}>
        {feature === 'all' && <SchoolAllApp key="all" />}
        {feature === 'elections' && <SchoolApp key={`e-${mode}-${run}`} mode={mode} />}
        {feature === 'questions' && <QuestionsApp key="q" />}
        {feature === 'clubs' && <ClubsApp key="c" />}
      </div>
    </div>
  )
}

const SCREENS = [
  { title: 'хаб', tab: 'students', note: 'корешок выборов под названием школы; вкладки «студенты · вопросы · клубы»; на неактивных вкладках счётчик скрыт, кроме розового «вопросы тебе»' },
  { title: 'выборы', view: 'election', note: 'открывается с корешка; реакции «за» и «против» в строке' },
  { title: 'вопросы', tab: 'questions', note: 'стена с вопросами тебе вверху; «задать вопрос» внутри вкладки' },
  { title: 'клубы', tab: 'clubs', note: '«создать клуб» и список; «вступить» в строке' },
  { title: 'клуб', tab: 'clubs', view: 'club', club: 'matmeh', note: 'экран клуба открывается поверх хаба, вкладка остаётся' }
]

// высота полоски-переключателя над страницей (SchoolDoc задаёт --doc-bar на body)
const docBar = () => parseInt(getComputedStyle(document.body).getPropertyValue('--doc-bar')) || 0

const K = 0.36

function Frame({ tab, view, club, title, note }) {
  return (
    <figure className={s.frame}>
      <div className={s.frameBox} style={{ width: 390 * K, height: 844 * K }}>
        <div className={s.frameScale} style={{ transform: `scale(${K})` }}>
          <SchoolAllApp initialTab={tab ?? 'students'} initialView={view ?? 'university'} initialClub={club ?? null} />
        </div>
      </div>
      <figcaption>
        <b>{title}</b>
        <span>{note}</span>
      </figcaption>
    </figure>
  )
}

function AllDoc() {
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
        <h1 className={s.title}>школы · все фичи</h1>
        <p className={s.sub}>выборы, вопросы и клубы в одном прототипе · блинк</p>
        <div className={s.grid}>
          {SCREENS.map((sc) => <Frame key={sc.title} {...sc} />)}
        </div>
      </aside>

      <main className={s.stage}>
        <div className={s.protoBox} style={{ width: 390 * scale, height: 844 * scale }}>
          <div className={s.protoScale} style={{ transform: `scale(${scale})` }}>
            <SchoolAllApp />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SchoolDoc() {
  const mobile = useMobile()

  // полоска занимает 48px сверху: страницы фич сдвигаются и ужимаются под неё.
  // Переменную ставим ещё в инициализаторе — эффекты детей сработали бы раньше нашего.
  const [feature, setFeature] = useState(() => {
    document.body.style.setProperty('--doc-bar', '48px')
    const m = window.location.hash.match(/^#all\/(\w+)/)
    return m && FEATURES.some((f) => f.id === m[1]) ? m[1] : 'all'
  })

  // В StrictMode эффекты перезапускаются: после cleanup ставим переменную снова
  // и просим страницы пересчитать масштаб прототипа
  useEffect(() => {
    document.body.style.setProperty('--doc-bar', '48px')
    window.dispatchEvent(new Event('resize'))
    return () => document.body.style.removeProperty('--doc-bar')
  }, [])

  const pick = (id) => {
    setFeature(id)
    window.history.replaceState(null, '', id === 'all' ? '#all' : `#all/${id}`)
  }

  if (mobile) return <MobileDoc feature={feature} onFeature={pick} />

  return (
    <>
      <nav className={d.bar} aria-label="Фича">
        <div className={d.switcher}>
          {FEATURES.map((f) => (
            <button key={f.id} className={`${d.item} ${feature === f.id ? d.itemOn : ''}`} type="button" onClick={() => pick(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </nav>
      {feature === 'all' && <AllDoc />}
      {feature === 'elections' && <ElectionsDoc key="e" />}
      {feature === 'questions' && <QuestionsDoc key="q" />}
      {feature === 'clubs' && <ClubsDoc key="c" />}
    </>
  )
}
