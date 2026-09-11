import { useState } from 'react'
import MapScreen from './components/MapScreen.jsx'
import JoinScreen from './components/JoinScreen.jsx'
import LiveChatScreen from './components/LiveChatScreen.jsx'
import EventsScreen from './components/EventsScreen.jsx'
import StoryViewer from './components/StoryViewer.jsx'
import { liveChats, liveStories } from './data/mock.js'

// Лайв-чаты: карта → (диско-шар) приглашение → чат,
// плюс «события в городе» со сторис-лентой и списком всех событий.
export default function LiveApp() {
  const [view, setView] = useState('map') // 'map' | 'events' | 'join' | 'chat'
  const [from, setFrom] = useState('map') // откуда открыт join/chat: 'map' | 'events'
  const [storyIdx, setStoryIdx] = useState(null)
  const [seenStories, setSeenStories] = useState(() => new Set())
  const [dismissed, setDismissed] = useState(false)

  const openStory = (i) => {
    setSeenStories((prev) => new Set(prev).add(liveStories[i].id))
    setStoryIdx(i)
  }

  // событие там, где сейчас находится пользователь
  const chat = liveChats.find((c) => c.youHere) ?? liveChats[0]

  const openJoin = (origin) => {
    setFrom(origin)
    setView('join')
  }

  return (
    <div className="phone-frame">
      <MapScreen
        showEntry={!dismissed}
        onOpenEntry={() => openJoin('map')}
        onOpenEvents={() => setView('events')}
      />

      {/* события остаются под join/чатом, открытыми из них */}
      {(view === 'events' || (view !== 'map' && from === 'events')) && (
        <EventsScreen
          chats={liveChats}
          stories={liveStories}
          seenStories={seenStories}
          onOpenStory={openStory}
          onJoin={() => openJoin('events')}
          onBack={() => setView('map')}
        />
      )}

      {view === 'join' && (
        <JoinScreen
          chat={chat}
          onJoin={() => setView('chat')}
          onCancel={() => {
            // отказ из приглашения на карте — больше его не показываем
            if (from === 'map') setDismissed(true)
            setView(from)
          }}
        />
      )}

      {view === 'chat' && (
        <LiveChatScreen chat={chat} onBack={() => setView(from)} />
      )}

      {storyIdx != null && (
        <StoryViewer
          stories={liveStories}
          start={storyIdx}
          onSeen={(id) => setSeenStories((prev) => new Set(prev).add(id))}
          onClose={() => setStoryIdx(null)}
        />
      )}
    </div>
  )
}
