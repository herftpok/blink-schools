import { useEffect, useState } from 'react'
import LiveApp from './LiveApp.jsx'
import SchoolApp from './SchoolApp.jsx'
import SchoolShowcase from './SchoolShowcase.jsx'
import ElectionsDoc from './ElectionsDoc.jsx'
import QuestionsDoc from './QuestionsDoc.jsx'
import ClubsDoc from './ClubsDoc.jsx'
import SchoolDoc from './SchoolDoc.jsx'
import MobileProto from './MobileProto.jsx'

// Роутинг:
//   /showcase  → развёртка всех школьных экранов (для дизайнера)
//   /elections → документация фичи выборов + кликабельный прототип
//   /questions → анонимные вопросы: развёртка + прототип
//   /clubs → клубы и группы: развёртка + прототип
//   /all → все три фичи: переключатель и общий прототип
//   на телефоне (≤700px) #all, #elections/<pre|voting|president>, #questions, #clubs → прототип во весь экран
//   #school    → школьная часть (интерактивная)
//   (иначе)    → лайв-чаты (карта)
function endsWith(segment) {
  return window.location.pathname.replace(/\/+$/, '').endsWith(segment)
}

function getRoute() {
  return window.location.hash.replace(/^#\/?/, '')
}

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

export default function App() {
  const [route, setRoute] = useState(getRoute())
  const mobile = useMobile()

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Телефон: фичи без документации, прототип во весь экран
  const featureRoute = /^(all|elections|questions|clubs)(\/|$)/.test(route)
  if (mobile && featureRoute) return <MobileProto key={route} route={route} />

  if (endsWith('/questions') || route === 'questions' || route.startsWith('questions/')) return <QuestionsDoc />
  if (endsWith('/all') || route === 'all' || route.startsWith('all/')) return <SchoolDoc />
  if (endsWith('/clubs') || route === 'clubs') return <ClubsDoc />
  if (endsWith('/elections') || route.startsWith('elections/')) return <ElectionsDoc />
  if (endsWith('/showcase')) return <SchoolShowcase />
  if (route === 'elections') return <ElectionsDoc />
  return route === 'school' ? <SchoolApp /> : <LiveApp />
}
