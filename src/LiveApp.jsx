import { useState } from 'react'
import MapScreen from './components/MapScreen.jsx'
import JoinScreen from './components/JoinScreen.jsx'
import LiveChatScreen from './components/LiveChatScreen.jsx'
import { liveChats } from './data/mock.js'

// Лайв-чаты: карта → стартовый экран события → сам чат.
export default function LiveApp() {
  const [view, setView] = useState('map') // 'map' | 'join' | 'chat'
  const [dismissed, setDismissed] = useState(false)

  // событие там, где сейчас находится пользователь
  const chat = liveChats.find((c) => c.youHere) ?? liveChats[0]

  return (
    <div className="phone-frame">
      <MapScreen showEntry={!dismissed} onOpenEntry={() => setView('join')} />

      {view === 'join' && (
        <JoinScreen
          chat={chat}
          onJoin={() => setView('chat')}
          onCancel={() => {
            setDismissed(true)
            setView('map')
          }}
        />
      )}

      {view === 'chat' && (
        <LiveChatScreen chat={chat} onBack={() => setView('map')} />
      )}
    </div>
  )
}
