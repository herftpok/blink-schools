import { useEffect, useMemo, useState } from 'react'
import UniversityScreen from './components/UniversityScreen.jsx'
import WallScreen from './components/WallScreen.jsx'
import WallPicker from './components/WallPicker.jsx'
import ElectionScreen from './components/ElectionScreen.jsx'
import ElectionResults from './components/ElectionResults.jsx'
import PresidentPanel from './components/PresidentPanel.jsx'
import NominateSheet from './components/NominateSheet.jsx'
import ShareScreen from './components/ShareScreen.jsx'
import s from './SchoolApp.module.css'
import { university, buildings, students, me, wallPostsByBuilding, wallUnread } from './data/mock.js'
import {
  candidates as seedCandidates,
  meCandidate,
  presidentDefaults,
  wheelColor,
  byLikes
} from './data/elections.js'

const SHARE_TOAST = { story: 'плакат ушёл в сторис', link: 'ссылка скопирована' }

// mode: 'pre' — до старта · 'voting' — идут выборы ·
//       'results' — итоги · 'president' — ты победил
export default function SchoolApp({ mode = 'voting', initialView = 'university', initialNominate = false, initialShare = false }) {
  const [view, setView] = useState(initialView)
  const [wallBuildingId, setWallBuildingId] = useState(null)
  const [unread, setUnread] = useState(wallUnread)

  const [list, setList] = useState(() => byLikes(initialShare ? [...seedCandidates, { ...meCandidate, promise: 'бесплатные пирожки по пятницам' }] : seedCandidates))
  // реакции: { [id]: 'like' | 'dislike' }
  const [reactions, setReactions] = useState(() => (mode === 'results' || mode === 'president' ? { masha: 'like' } : {}))
  const [nominateOpen, setNominateOpen] = useState(initialNominate)
  const [shareOpen, setShareOpen] = useState(initialShare)
  const [toast, setToast] = useState(null)

  const [settings, setSettings] = useState({
    customName: presidentDefaults.customName,
    colors: presidentDefaults.colors,
    pinned: mode === 'president' ? presidentDefaults.pinned : ''
  })

  // В «ты президент» победил ты, в «итогах» — маша
  const finalList = useMemo(() => {
    if (mode !== 'president') return list
    const withMe = list.some((c) => c.isMe) ? list : [...list, { ...meCandidate, promise: 'бесплатные пирожки по пятницам' }]
    return byLikes(withMe.map((c) => (c.isMe ? { ...c, likes: 340, dislikes: 31 } : c)))
  }, [list, mode])

  const isCandidate = list.some((c) => c.isMe)
  const president = mode === 'results' || mode === 'president' ? finalList[0] : null
  const theme = { colors: settings.colors.map(wheelColor) }

  // Реакции капают в реальном времени, пока идут выборы
  useEffect(() => {
    if (mode !== 'voting') return undefined
    const id = setInterval(() => {
      setList((prev) => {
        const order = prev.map((c) => c.id)
        const i = Math.floor(Math.random() * prev.length)
        const dislike = Math.random() < 0.25
        const bumped = prev.map((c, idx) =>
          idx === i
            ? { ...c, likes: c.likes + (dislike ? 0 : 1 + Math.floor(Math.random() * 3)), dislikes: c.dislikes + (dislike ? 1 : 0) }
            : { ...c, move: undefined }
        )
        return byLikes(bumped).map((c, idx) => {
          const was = order.indexOf(c.id)
          if (was === idx || was === -1) return { ...c, move: undefined }
          return { ...c, move: idx < was ? 'up' : 'down' }
        })
      })
    }, 2600)
    return () => clearInterval(id)
  }, [mode])

  useEffect(() => {
    if (!toast) return undefined
    const id = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(id)
  }, [toast])

  const wallBuilding = wallBuildingId
    ? buildings.find((b) => b.id === wallBuildingId) ?? buildings[0]
    : buildings[0]

  const markRead = (id) => setUnread((u) => (u[id] ? { ...u, [id]: 0 } : u))

  const pickWall = (id) => {
    setWallBuildingId(id)
    markRead(id)
    setView('wall')
  }

  // Одна реакция на человека: повтор снимает её, другая — заменяет
  const react = (id, kind) => {
    const current = reactions[id]
    setReactions((prev) => {
      const next = { ...prev }
      if (current === kind) delete next[id]
      else next[id] = kind
      return next
    })
    setList((prev) =>
      byLikes(
        prev.map((c) => {
          if (c.id !== id) return c
          let { likes, dislikes } = c
          if (current === 'like') likes -= 1
          if (current === 'dislike') dislikes -= 1
          if (current !== kind) {
            if (kind === 'like') likes += 1
            else dislikes += 1
          }
          return { ...c, likes, dislikes }
        })
      )
    )
  }

  // Плакат после заявления не навязываем: он открывается только по кнопке
  const nominate = (promise) => {
    setList((prev) => byLikes([...prev, { ...meCandidate, promise }]))
    setNominateOpen(false)
    setToast('ты в списке')
  }

  const share = (channel) => setToast(SHARE_TOAST[channel] ?? 'отправлено')

  const entryPhase = mode === 'president' ? 'president' : mode === 'results' ? 'results' : mode

  const openElection = () => {
    if (mode === 'president' || mode === 'results') setView('results')
    else setView('election')
  }

  const mineNow = list.find((c) => c.isMe)
  const myPlace = mineNow ? list.indexOf(mineNow) + 1 : list.length + 1

  return (
    <div className="phone-frame">
      <UniversityScreen
        university={university}
        building={null}
        buildings={buildings}
        students={students}
        me={me}
        displayName={mode === 'president' && settings.customName.trim() ? settings.customName : null}
        theme={mode === 'president' ? theme : null}
        presidentId={president ? president.studentId : null}
        pinned={mode === 'president' && settings.pinned ? settings.pinned : null}
        election={mode === 'president' ? null : { phase: entryPhase, onOpen: openElection }}
        onOpenSettings={mode === 'president' ? () => setView('panel') : null}
        onClose={() => alert('закрыть экран университета')}
        onOpenWall={() => setView('wallPicker')}
      />

      {(view === 'wallPicker' || view === 'wall') && (
        <WallPicker buildings={buildings} onPick={pickWall} onBack={() => setView('university')} />
      )}

      {view === 'wall' && (
        <WallScreen
          university={university}
          building={wallBuilding}
          posts={wallPostsByBuilding[wallBuilding.id] ?? []}
          canPost={me.at === wallBuilding.id}
          onBack={() => setView('wallPicker')}
        />
      )}

      {view === 'election' && (
        <ElectionScreen
          phase={mode === 'pre' ? 'pre' : 'voting'}
          candidates={list}
          reactions={reactions}
          isCandidate={isCandidate}
          onReact={react}
          onNominate={() => setNominateOpen(true)}
          onInvite={() => setShareOpen(true)}
          onBack={() => setView('university')}
        />
      )}

      {view === 'results' && (
        <ElectionResults
          candidates={finalList}
          reactions={reactions}
          onBack={() => setView('university')}
          onShare={() => share('story')}
        />
      )}

      {view === 'panel' && (
        <PresidentPanel settings={settings} onChange={setSettings} onBack={() => setView('university')} />
      )}

      <NominateSheet open={nominateOpen} me={meCandidate} onSubmit={nominate} onClose={() => setNominateOpen(false)} />

      <ShareScreen
        open={shareOpen}
        me={mineNow ?? meCandidate}
        place={myPlace}
        university={university}
        onShare={share}
        onClose={() => setShareOpen(false)}
      />

      {toast && !shareOpen && <div className={s.toast}>{toast}</div>}
    </div>
  )
}
