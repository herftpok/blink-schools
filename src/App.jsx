import { useEffect, useState } from 'react'
import LiveApp from './LiveApp.jsx'
import SchoolApp from './SchoolApp.jsx'
import SchoolShowcase from './SchoolShowcase.jsx'
import ElectionsDoc from './ElectionsDoc.jsx'
import QuestionsDoc from './QuestionsDoc.jsx'
import ClubsDoc from './ClubsDoc.jsx'
import SchoolDoc from './SchoolDoc.jsx'

// Роутинг:
//   /showcase  → развёртка всех школьных экранов (для дизайнера)
//   /elections → документация фичи выборов + кликабельный прототип
//   /questions → анонимные вопросы: развёртка + прототип
//   /clubs → клубы и группы: развёртка + прототип
//   /all → все три фичи: переключатель и общий прототип
//   #school    → школьная часть (интерактивная)
//   (иначе)    → лайв-чаты (карта)
function endsWith(segment) {
  return window.location.pathname.replace(/\/+$/, '').endsWith(segment)
}

function getRoute() {
  return window.location.hash.replace(/^#\/?/, '')
}

export default function App() {
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (endsWith('/questions') || route === 'questions') return <QuestionsDoc />
  if (endsWith('/all') || route === 'all' || route.startsWith('all/')) return <SchoolDoc />
  if (endsWith('/clubs') || route === 'clubs') return <ClubsDoc />
  if (endsWith('/elections')) return <ElectionsDoc />
  if (endsWith('/showcase')) return <SchoolShowcase />
  if (route === 'elections') return <ElectionsDoc />
  return route === 'school' ? <SchoolApp /> : <LiveApp />
}
