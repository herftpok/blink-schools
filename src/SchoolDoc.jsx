import { useEffect, useState } from 'react'
import SchoolAllApp from './SchoolAllApp.jsx'
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

export default function SchoolDoc() {
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
