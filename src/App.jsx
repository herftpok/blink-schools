import { useState } from 'react'
import UniversityScreen from './components/UniversityScreen.jsx'
import WallScreen from './components/WallScreen.jsx'
import WallPicker from './components/WallPicker.jsx'
import { university, buildings, students, me, wallPostsByBuilding, wallUnread } from './data/mock.js'

export default function App() {
  const [view, setView] = useState('university') // 'university' | 'wallPicker' | 'wall'
  const [buildingId, setBuildingId] = useState(null) // null = все корпуса
  const [wallBuildingId, setWallBuildingId] = useState(null)
  const [wallFromPicker, setWallFromPicker] = useState(false)
  const [unread, setUnread] = useState(wallUnread)

  const building = buildingId ? buildings.find((b) => b.id === buildingId) ?? null : null
  const unreadTotal = Object.values(unread).reduce((sum, n) => sum + n, 0)
  const wallBuilding = wallBuildingId
    ? buildings.find((b) => b.id === wallBuildingId) ?? buildings[0]
    : buildings[0]

  const markRead = (id) => setUnread((u) => (u[id] ? { ...u, [id]: 0 } : u))

  const openWall = () => {
    if (building) {
      setWallBuildingId(building.id)
      setWallFromPicker(false)
      markRead(building.id)
      setView('wall')
    } else {
      setView('wallPicker')
    }
  }

  const pickWall = (id) => {
    setWallBuildingId(id)
    setWallFromPicker(true)
    markRead(id)
    setView('wall')
  }

  return (
    <div className="phone-frame">
      {/* Базовый слой — всегда смонтирован, чтобы оверлеи стены уезжали,
          открывая экран универа, а не пустой чёрный фон. */}
      <UniversityScreen
        university={university}
        building={building}
        buildings={buildings}
        students={students}
        me={me}
        wallUnreadTotal={unreadTotal}
        wallUnread={unread}
        onBuildingChange={setBuildingId}
        onClose={() => alert('закрыть экран университета')}
        onOpenWall={openWall}
      />

      {/* picker остаётся смонтированным под чатом корпуса, если чат открыт из него —
          тогда закрытие чата просто открывает его без повторной анимации */}
      {(view === 'wallPicker' || (view === 'wall' && wallFromPicker)) && (
        <WallPicker
          buildings={buildings}
          wallsByBuilding={wallPostsByBuilding}
          unread={unread}
          onPick={pickWall}
          onBack={() => setView('university')}
        />
      )}

      {view === 'wall' && (
        <WallScreen
          university={university}
          building={wallBuilding}
          posts={wallPostsByBuilding[wallBuilding.id] ?? []}
          canPost={me.at === wallBuilding.id}
          onBack={() => setView(wallFromPicker ? 'wallPicker' : 'university')}
        />
      )}
    </div>
  )
}
