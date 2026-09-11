import { useEffect, useState } from 'react'
import ClubsApp from './ClubsApp.jsx'
import s from './ElectionsDoc.module.css'

// Развёртка: каждый экран фичи и одна-две строки о том, что в нём неочевидно.
const SCREENS = [
  { title: 'хаб · точка входа', tab: 'students', note: 'вход — вкладка «клубы» рядом со «студентами»; кнопка «позвать друзей» остаётся' },
  { title: 'клубы', note: 'кнопка «создать клуб» и список: аватар клуба, название, лица и число участников; «вступить» прямо в строке, у своих клубов — «выйти»' },
  { title: 'клуб · не участник', view: 'club', club: 'matmeh', note: 'чат закрыт замком, внизу белая «вступить»' },
  { title: 'клуб · участник', view: 'club', club: 'matmeh', joined: ['matmeh'], note: 'создатель первым с подписью «создатель»; чат открыт, внизу тёмная «выйти из клуба»' },
  { title: 'чат клуба', view: 'chat', club: 'matmeh', joined: ['matmeh'], note: 'видят и пишут только участники; свои сообщения зелёным справа' },
  { title: 'новый клуб', create: true, note: 'аватар с загрузкой и название до 24 символов' }
]

// высота полоски-переключателя над страницей (SchoolDoc задаёт --doc-bar на body)
const docBar = () => parseInt(getComputedStyle(document.body).getPropertyValue('--doc-bar')) || 0

const K = 0.36

function Frame({ tab, view, club, joined, create, title, note }) {
  return (
    <figure className={s.frame}>
      <div className={s.frameBox} style={{ width: 390 * K, height: 844 * K }}>
        <div className={s.frameScale} style={{ transform: `scale(${K})` }}>
          <ClubsApp initialTab={tab ?? 'clubs'} initialView={view ?? 'university'} initialClub={club ?? null} initialJoined={joined ?? []} initialCreate={!!create} />
        </div>
      </div>
      <figcaption>
        <b>{title}</b>
        <span>{note}</span>
      </figcaption>
    </figure>
  )
}

export default function ClubsDoc() {
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
        <h1 className={s.title}>клубы и группы</h1>
        <p className={s.sub}>развёртка экранов · блинк, школы</p>
        <div className={s.grid}>
          {SCREENS.map((sc) => <Frame key={sc.title} {...sc} />)}
        </div>
      </aside>

      <main className={s.stage}>
        <div className={s.protoBox} style={{ width: 390 * scale, height: 844 * scale }}>
          <div className={s.protoScale} style={{ transform: `scale(${scale})` }}>
            <ClubsApp />
          </div>
        </div>
      </main>
    </div>
  )
}
