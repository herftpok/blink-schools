import { useEffect, useMemo, useState } from 'react'
import UniversityScreen from './components/UniversityScreen.jsx'
import WallScreen from './components/WallScreen.jsx'
import WallPicker from './components/WallPicker.jsx'
import ElectionScreen from './components/ElectionScreen.jsx'
import NominateSheet from './components/NominateSheet.jsx'
import ShareScreen from './components/ShareScreen.jsx'
import QuestionsTab from './components/QuestionsTab.jsx'
import AskSheet from './components/AskSheet.jsx'
import AnswerSheet from './components/AnswerSheet.jsx'
import ReportModal from './components/ReportModal.jsx'
import ClubsTab from './components/ClubsTab.jsx'
import ClubScreen from './components/ClubScreen.jsx'
import ClubChatScreen from './components/ClubChatScreen.jsx'
import CreateClubSheet from './components/CreateClubSheet.jsx'
import { university, buildings, students, me, wallPostsByBuilding, wallUnread } from './data/mock.js'
import { candidates as seedCandidates, meCandidate, byLikes } from './data/elections.js'
import { feedSeed, askedSeed, incomingAnswer } from './data/questions.js'
import { clubsSeed, clubChatsSeed } from './data/clubs.js'

// Все три фичи в одном прототипе: идут выборы (корешок под названием школы),
// вкладки «студенты · вопросы · клубы» в секции хаба.
export default function SchoolAllApp({ initialTab = 'students', initialView = 'university', initialClub = null, initialAsk = false, initialCreate = false }) {
  const [view, setView] = useState(initialView)
  const [tab, setTab] = useState(initialTab)
  const [wallBuildingId, setWallBuildingId] = useState(null)
  const [unread, setUnread] = useState(wallUnread)

  // ── выборы ──
  const [list, setList] = useState(() => byLikes(seedCandidates))
  const [reactions, setReactions] = useState({})
  const [nominateOpen, setNominateOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  useEffect(() => {
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
  }, [])

  const react = (id, kind) => {
    const current = reactions[id]
    setReactions((prev) => {
      const next = { ...prev }
      if (current === kind) delete next[id]
      else next[id] = kind
      return next
    })
    setList((prev) => byLikes(prev.map((c) => {
      if (c.id !== id) return c
      let { likes, dislikes } = c
      if (current === 'like') likes -= 1
      if (current === 'dislike') dislikes -= 1
      if (current !== kind) {
        if (kind === 'like') likes += 1
        else dislikes += 1
      }
      return { ...c, likes, dislikes }
    })))
  }

  const nominate = (promise) => {
    setList((prev) => byLikes([...prev, { ...meCandidate, promise }]))
    setNominateOpen(false)
  }
  const mineNow = list.find((c) => c.isMe)
  const myPlace = mineNow ? list.indexOf(mineNow) + 1 : list.length + 1

  // ── люди ──
  const fullList = useMemo(() => [me, ...students], [])
  const knownIds = useMemo(() => new Set(fullList.map((st) => st.id)), [fullList])
  const person = (id) => (id === 'me' ? me : fullList.find((st) => st.id === id) ?? me)
  const faceOf = (id) => fullList.findIndex((st) => st.id === id)

  // ── вопросы ──
  const [questions, setQuestions] = useState(feedSeed)
  const [askOpen, setAskOpen] = useState(initialAsk)
  const [replyId, setReplyId] = useState(null)
  const [reportId, setReportId] = useState(null) // вопрос, на который жалуются

  useEffect(() => {
    const t = setTimeout(() => {
      setQuestions((prev) => prev.map((q) => (q.id === askedSeed.id && !q.answer ? { ...q, answer: incomingAnswer } : q)))
    }, 6000)
    return () => clearTimeout(t)
  }, [])

  const forMe = questions.filter((q) => q.to === 'me' && !q.answer).length
  const STICKERS = ['star', 'fire', 'gem', 'eyes', 'gift', 'phone', 'sputnik']
  const ask = (text, to) => {
    const sticker = STICKERS[Math.floor(Math.random() * STICKERS.length)]
    setQuestions((prev) => [{ id: `q${Date.now()}`, to, text, time: 'только что', mine: true, sticker, answer: null }, ...prev])
    setAskOpen(false)
  }
  const answer = (qid, text) => {
    setQuestions((prev) => prev.map((q) => (q.id === qid ? { ...q, answer: { text, time: 'только что' } } : q)))
    setReplyId(null)
  }
  const replying = questions.find((q) => q.id === replyId) ?? null

  // ── клубы ──
  const [clubs, setClubs] = useState(clubsSeed)
  const [chats, setChats] = useState(clubChatsSeed)
  const [clubId, setClubId] = useState(initialClub)
  const [createOpen, setCreateOpen] = useState(initialCreate)

  const visibleClubs = clubs.map((c) => ({ ...c, members: c.members.filter((id) => id === 'me' || knownIds.has(id)) }))
  const club = visibleClubs.find((c) => c.id === clubId) ?? null
  const isMember = (id) => clubs.find((c) => c.id === id)?.members.includes('me') ?? false
  const join = (id) => setClubs((prev) => prev.map((c) => (c.id === id && !c.members.includes('me') ? { ...c, members: ['me', ...c.members] } : c)))
  const leave = (id) => setClubs((prev) => prev.map((c) => (c.id === id ? { ...c, members: c.members.filter((m) => m !== 'me') } : c)))
  const create = ({ name, photo }) => {
    const id = `club${Date.now()}`
    setClubs((prev) => [{ id, createdBy: 'me', name, photo, members: ['me'] }, ...prev])
    setChats((prev) => ({ ...prev, [id]: [] }))
    setCreateOpen(false)
  }
  const send = (text) => {
    if (!club) return
    setChats((prev) => ({ ...prev, [club.id]: [...(prev[club.id] ?? []), { id: `m${Date.now()}`, by: 'me', text }] }))
  }

  // ── стены ──
  const wallBuilding = wallBuildingId ? buildings.find((b) => b.id === wallBuildingId) ?? buildings[0] : buildings[0]
  const markRead = (id) => setUnread((u) => (u[id] ? { ...u, [id]: 0 } : u))
  const pickWall = (id) => { setWallBuildingId(id); markRead(id); setView('wall') }

  return (
    <div className="phone-frame">
      <UniversityScreen
        university={university}
        building={null}
        buildings={buildings}
        students={students}
        me={me}
        election={{ phase: 'voting', onOpen: () => setView('election') }}
        features={{
          tab,
          onTab: setTab,
          items: [
            {
              id: 'questions',
              label: 'вопросы',
              count: questions.length,
              hot: forMe,
              content: <QuestionsTab questions={questions} person={person} faceOf={faceOf} onReply={setReplyId} onReport={setReportId} onAsk={() => setAskOpen(true)} />
            },
            {
              id: 'clubs',
              label: 'клубы',
              count: clubs.length,
              hot: 0,
              content: (
                <ClubsTab
                  clubs={visibleClubs}
                  person={person}
                  faceOf={faceOf}
                  isMember={isMember}
                  onOpen={(id) => { setClubId(id); setView('club') }}
                  onJoin={join}
                  onLeave={leave}
                  onCreate={() => setCreateOpen(true)}
                />
              )
            }
          ]
        }}
        onClose={() => alert('закрыть экран университета')}
        onOpenWall={() => setView('wallPicker')}
      />

      {(view === 'wallPicker' || view === 'wall') && (
        <WallPicker buildings={buildings} onPick={pickWall} onBack={() => setView('university')} />
      )}
      {view === 'wall' && (
        <WallScreen university={university} building={wallBuilding} posts={wallPostsByBuilding[wallBuilding.id] ?? []} canPost={me.at === wallBuilding.id} onBack={() => setView('wallPicker')} />
      )}

      {view === 'election' && (
        <ElectionScreen
          phase="voting"
          candidates={list}
          reactions={reactions}
          isCandidate={!!mineNow}
          onReact={react}
          onNominate={() => setNominateOpen(true)}
          onInvite={() => setShareOpen(true)}
          onBack={() => setView('university')}
        />
      )}

      {(view === 'club' || view === 'chat') && club && (
        <ClubScreen
          club={club}
          person={person}
          faceOf={faceOf}
          member={isMember(club.id)}
          onJoin={() => join(club.id)}
          onLeave={() => leave(club.id)}
          onOpenChat={() => setView('chat')}
          onBack={() => setView('university')}
        />
      )}
      {view === 'chat' && club && (
        <ClubChatScreen club={club} messages={chats[club.id] ?? []} person={person} onSend={send} onBack={() => setView('club')} />
      )}

      <NominateSheet open={nominateOpen} me={meCandidate} onSubmit={nominate} onClose={() => setNominateOpen(false)} />
      <ShareScreen open={shareOpen} me={mineNow ?? meCandidate} place={myPlace} university={university} onShare={() => setShareOpen(false)} onClose={() => setShareOpen(false)} />
      <AskSheet open={askOpen} students={students} faceOf={faceOf} onSubmit={ask} onClose={() => setAskOpen(false)} />
      <AnswerSheet q={replying} open={!!replying} onSubmit={answer} onClose={() => setReplyId(null)} />
      <ReportModal open={reportId != null} what="вопрос" onConfirm={() => setReportId(null)} onClose={() => setReportId(null)} />
      <CreateClubSheet open={createOpen} onSubmit={create} onClose={() => setCreateOpen(false)} />
    </div>
  )
}
