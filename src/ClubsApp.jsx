import { useMemo, useState } from 'react'
import UniversityScreen from './components/UniversityScreen.jsx'
import WallScreen from './components/WallScreen.jsx'
import WallPicker from './components/WallPicker.jsx'
import ClubsTab from './components/ClubsTab.jsx'
import ClubScreen from './components/ClubScreen.jsx'
import ClubChatScreen from './components/ClubChatScreen.jsx'
import CreateClubSheet from './components/CreateClubSheet.jsx'
import { university, buildings, students, me, wallPostsByBuilding, wallUnread } from './data/mock.js'
import { clubsSeed, clubChatsSeed } from './data/clubs.js'

// Клубы школы: вкладка в хабе, экран клуба, чат для участников, создание.
export default function ClubsApp({ initialTab = 'clubs', initialView = 'university', initialClub = null, initialJoined = [], initialCreate = false }) {
  const [view, setView] = useState(initialView)
  const [tab, setTab] = useState(initialTab)
  const [wallBuildingId, setWallBuildingId] = useState(null)
  const [unread, setUnread] = useState(wallUnread)
  const [createOpen, setCreateOpen] = useState(initialCreate)
  const [clubId, setClubId] = useState(initialClub)
  const [chats, setChats] = useState(clubChatsSeed)

  const [clubs, setClubs] = useState(() =>
    clubsSeed.map((c) => (initialJoined.includes(c.id) ? { ...c, members: ['me', ...c.members] } : c))
  )

  const fullList = useMemo(() => [me, ...students], [])
  const knownIds = useMemo(() => new Set(fullList.map((st) => st.id)), [fullList])
  const person = (id) => (id === 'me' ? me : fullList.find((st) => st.id === id) ?? me)
  const faceOf = (id) => fullList.findIndex((st) => st.id === id)

  // Только участники, которые есть в школе
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
        feature={{
          id: 'clubs',
          label: 'клубы',
          tab,
          onTab: setTab,
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

      <CreateClubSheet open={createOpen} onSubmit={create} onClose={() => setCreateOpen(false)} />
    </div>
  )
}
