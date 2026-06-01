import { useMemo, useState } from 'react'
import BuildingSelector from './BuildingSelector.jsx'
import CampusSheet from './CampusSheet.jsx'
import InfoSheet from './InfoSheet.jsx'
import StudentCard from './StudentCard.jsx'
import WallEntry from './WallEntry.jsx'
import s from './UniversityScreen.module.css'
import auroraUrl from '../assets/aurora.svg'
import wingsLeftUrl from '../assets/wings-left.svg'
import wingsRightUrl from '../assets/wings-right.svg'
import collegeUrl from '../assets/college.svg'
import addUrl from '../assets/add.svg'
import shareUrl from '../assets/share.svg'

// 3 индекса пула фото для композиции корпуса (как в боттомшите выбора)
function faceTrio(base) {
  const b = (base < 0 ? 0 : base) * 3
  return [b, b + 1, b + 2]
}

export default function UniversityScreen({
  university,
  building,
  buildings,
  students,
  me,
  wallUnreadTotal = 0,
  wallUnread = {},
  onBuildingChange,
  onClose,
  onOpenWall
}) {
  const [studentList, setStudentList] = useState(students)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [showMe, setShowMe] = useState(true)

  const fullList = useMemo(() => [me, ...studentList], [me, studentList])

  // Фото привязано к человеку, а не к позиции в отфильтрованном списке:
  // стабильный индекс по месту в полном списке (первые получают фото из пула,
  // дальше — плейсхолдеры).
  const faceIndexById = useMemo(() => {
    const map = new Map()
    fullList.forEach((st, idx) => map.set(st.id, idx))
    return map
  }, [fullList])

  const studentsByBuilding = useMemo(() => {
    const acc = {}
    for (const b of buildings) acc[b.id] = 0
    for (const st of fullList) if (st.at && acc[st.at] != null) acc[st.at] += 1
    return acc
  }, [fullList, buildings])

  const visible = useMemo(() => {
    let list = building ? fullList.filter((st) => st.at === building.id) : fullList
    if (!showMe) list = list.filter((st) => st.state !== 'me')
    return [...list].sort((a, b) => {
      if (a.state === 'me') return -1
      if (b.state === 'me') return 1
      return Number(Boolean(b.at)) - Number(Boolean(a.at))
    })
  }, [fullList, building, showMe])

  const setState = (id, state) =>
    setStudentList((list) => list.map((s) => (s.id === id ? { ...s, state } : s)))

  const subtitle = building ? building.address : university.city
  const showPresence = building?.youArePresent
  const sectionCount = visible.length
  const sectionTitle = building ? 'сейчас в универе' : 'студенты'

  const handleSelectCampus = (id) => {
    onBuildingChange(id)
    setSheetOpen(false)
  }

  return (
    <div className="screen">
      <button className={s.closeBtn} onClick={onClose} aria-label="Закрыть">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
        </svg>
      </button>

      <div className="scroll">
        <div className={s.scrollInner}>
          <div className={s.aurora} aria-hidden>
            <img src={auroraUrl} alt="" />
          </div>

          <section className={s.hero}>
            <div className={s.logoRow}>
              <img src={wingsLeftUrl} alt="" className={s.wing} aria-hidden />
              <div className={s.logo}>
                <img src={collegeUrl} alt="" className={s.logoGlyph} />
              </div>
              <img src={wingsRightUrl} alt="" className={`${s.wing} ${s.wingRight}`} aria-hidden />
            </div>

            <h1 className={s.title}>{university.fullName}</h1>
            <p className={s.subtitle}>{subtitle}</p>

            <BuildingSelector current={building} onOpen={() => setSheetOpen(true)} />

            {showPresence && (
              <span className={s.presence}>
                <span className={s.presenceDot} /> вы на территории корпуса
              </span>
            )}
          </section>

          <WallEntry
            building={building}
            unreadTotal={wallUnreadTotal}
            buildingUnread={building ? (wallUnread[building.id] ?? 0) : 0}
            faceIndices={building ? faceTrio(buildings.findIndex((b) => b.id === building.id)) : null}
            onClick={onOpenWall}
          />

          <section className={s.studentsSection}>
            <div className={s.sectionHead}>
              <span className={s.sectionTitle}>
                {building && <span className={s.onlineDot} aria-hidden />}
                {sectionTitle}
              </span>
              <span className={s.counter}>{sectionCount}</span>
              {building && (
                <button className={s.howBtn} type="button" onClick={() => setInfoOpen(true)}>
                  это как?
                </button>
              )}
            </div>

            {visible.length === 0 ? (
              <div className={s.empty}>сейчас в этом кампусе никого нет</div>
            ) : (
              <ul className={s.list}>
                {visible.map((student) => (
                  <li key={student.id}>
                    <StudentCard
                      student={student}
                      photoIndex={faceIndexById.get(student.id)}
                      onAdd={() => setState(student.id, 'pending')}
                      onCancel={() => setState(student.id, 'add')}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className={s.bottomSpacer} />
        </div>
      </div>

      <div className={s.bottomBar}>
        <button className={s.inviteBtn} type="button">
          <img src={addUrl} alt="" className={s.btnIcon} />
          позвать друзей
        </button>
        <button className={s.shareBtn} type="button" aria-label="Поделиться">
          <img src={shareUrl} alt="" className={s.btnIcon} />
        </button>
      </div>

      <CampusSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        buildings={buildings}
        current={building}
        studentsByBuilding={studentsByBuilding}
        totalStudents={fullList.length}
        onSelect={handleSelectCampus}
      />

      <InfoSheet
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        showMe={showMe}
        onToggleShowMe={() => setShowMe((v) => !v)}
      />
    </div>
  )
}
