import { useEffect, useState } from 'react'
import LiveApp from './LiveApp.jsx'
import SchoolApp from './SchoolApp.jsx'
import SchoolShowcase from './SchoolShowcase.jsx'

// Роутинг:
//   /showcase  → развёртка всех школьных экранов (для дизайнера)
//   #school    → школьная часть (интерактивная)
//   (иначе)    → лайв-чаты (карта)
function isShowcase() {
  return window.location.pathname.replace(/\/+$/, '').endsWith('/showcase')
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

  if (isShowcase()) return <SchoolShowcase />
  return route === 'school' ? <SchoolApp /> : <LiveApp />
}
