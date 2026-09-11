import SchoolAllApp from './SchoolAllApp.jsx'
import SchoolApp from './SchoolApp.jsx'
import QuestionsApp from './QuestionsApp.jsx'
import ClubsApp from './ClubsApp.jsx'
import s from './MobileProto.module.css'

// На телефоне — прототип во весь экран, без табов и галереи.
// Переключение между фичами и фазами — отдельными ссылками:
//   #all · #elections/pre · #elections/voting · #elections/president · #questions · #clubs
export default function MobileProto({ route }) {
  const parts = route.replace(/^all\//, '').split('/')
  const feature = parts[0] === '' || parts[0] === 'all' ? 'all' : parts[0]
  const mode = ['pre', 'voting', 'president'].includes(parts[1]) ? parts[1] : 'voting'

  return (
    <div className={s.stage}>
      {feature === 'elections' ? <SchoolApp key={mode} mode={mode} />
        : feature === 'questions' ? <QuestionsApp />
          : feature === 'clubs' ? <ClubsApp />
            : <SchoolAllApp />}
    </div>
  )
}
