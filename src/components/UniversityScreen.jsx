import { useMemo, useState } from 'react'
import InfoSheet from './InfoSheet.jsx'
import ElectionEntry from './ElectionEntry.jsx'
import StudentCard from './StudentCard.jsx'
import WallEntry from './WallEntry.jsx'
import s from './UniversityScreen.module.css'
import auroraUrl from '../assets/aurora.svg'
import schoolIconUrl from '../assets/school-icon.png'
import addUrl from '../assets/add.svg'
import shareUrl from '../assets/share.svg'
import grad0 from '../assets/gradients/g0.png'
import grad1 from '../assets/gradients/g1.png'
import grad2 from '../assets/gradients/g2.png'
import grad3 from '../assets/gradients/g3.png'

// Каждому корпусу — свой градиент фона.
// Экран «все корпуса» оставляет общую aurora.
const GRADIENTS = [grad0, grad1, grad2, grad3]

function themeFor(building, buildings) {
  if (!building) return null
  const i = buildings.findIndex((b) => b.id === building.id)
  const idx = ((i % GRADIENTS.length) + GRADIENTS.length) % GRADIENTS.length
  return { gradient: GRADIENTS[idx] }
}

export default function UniversityScreen({
  university,
  building,
  buildings,
  students,
  me,
  displayName = null,
  theme: customTheme = null,
  presidentId = null,
  pinned = null,
  election = null,
  feature = null, // { id, label, count, hot, tab, onTab, content } — одна вкладка фичи
  features = null, // { tab, onTab, items: [{ id, label, count, hot, content }] } — несколько
  onOpenSettings = null,
  onClose,
  onOpenWall
}) {
  const [studentList, setStudentList] = useState(students)
  const [infoOpen, setInfoOpen] = useState(false)
  const [showMe, setShowMe] = useState(true)

  const fullList = useMemo(() => [me, ...studentList], [me, studentList])

  // Фото привязано к человеку, а не к позиции в отфильтрованном списке:
  // стабильный индекс по месту в полном списке (первые получают фото из пула,
  // дальше — плейсхолдеры).
  // Вкладки фич: одна (feature) или несколько (features) — приводим к одному виду
  const tabs = features
    ? features
    : feature
      ? { tab: feature.tab, onTab: feature.onTab, items: [feature] }
      : null
  const activeFeature = tabs ? tabs.items.find((f) => f.id === tabs.tab) ?? null : null

  const faceIndexById = useMemo(() => {
    const map = new Map()
    fullList.forEach((st, idx) => map.set(st.id, idx))
    return map
  }, [fullList])

  const visible = useMemo(() => {
    let list = building ? fullList.filter((st) => st.at === building.id) : fullList
    if (!showMe) list = list.filter((st) => st.state !== 'me')
    return [...list].sort((a, b) => {
      if (a.id === presidentId) return -1
      if (b.id === presidentId) return 1
      if (a.state === 'me') return -1
      if (b.state === 'me') return 1
      return Number(Boolean(b.at)) - Number(Boolean(a.at))
    })
  }, [fullList, building, showMe, presidentId])

  const setState = (id, state) =>
    setStudentList((list) => list.map((s) => (s.id === id ? { ...s, state } : s)))

  const subtitle = building ? building.address : university.city
  const sectionCount = visible.length
  const sectionTitle = building ? 'сейчас тут' : 'студенты'
  const theme = themeFor(building, buildings)

  return (
    <div className="screen">
      {onOpenSettings && (
        <button className={s.settingsBtn} onClick={onOpenSettings} aria-label="Настройки школы">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3.2" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
          </svg>
        </button>
      )}
      <button className={s.closeBtn} onClick={onClose} aria-label="Закрыть">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
        </svg>
      </button>

      <div className="scroll">
        <div className={s.scrollInner}>
          {customTheme ? (
            <div
              className={s.themeGlow}
              style={{ '--c1': customTheme.colors[0], '--c2': customTheme.colors[1], '--c3': customTheme.colors[2] }}
              aria-hidden
            />
          ) : theme ? (
            <div className={s.heroGradient} aria-hidden>
              <img src={theme.gradient} alt="" />
            </div>
          ) : (
            <div className={s.aurora} aria-hidden>
              <img src={auroraUrl} alt="" />
            </div>
          )}

          <section className={s.hero}>
            <span className={s.visits}>{building?.youArePresent ? 'ты сейчас здесь' : 'ты был тут 242 раза'}</span>
            <img src={schoolIconUrl} alt="" className={s.logoImg} aria-hidden />

            <h1 className={s.title}>{displayName || university.fullName}</h1>
            <p className={s.subtitle}>{displayName ? university.fullName : subtitle}</p>
            {election && <ElectionEntry phase={election.phase} onClick={election.onOpen} />}
          </section>

          <WallEntry building={building} onClick={onOpenWall} />

          {pinned && (
            <div className={s.pinned}>
              <span className={s.pinnedText}>{pinned}</span>
            </div>
          )}

          <section className={s.studentsSection}>
            {tabs ? (
              <div className={`${s.sectionHead} ${tabs.items.length > 1 ? s.sectionHeadMany : ''}`}>
                <button className={`${s.tabBtn} ${tabs.tab === 'students' ? s.tabOn : ''}`} type="button" onClick={() => tabs.onTab('students')}>
                  {sectionTitle}
                  {(tabs.items.length === 1 || tabs.tab === 'students') && <span className={s.counter}>{sectionCount}</span>}
                </button>
                {tabs.items.map((f) => {
                  const on = tabs.tab === f.id
                  const showCount = tabs.items.length === 1 || on || f.hot > 0
                  return (
                    <button key={f.id} className={`${s.tabBtn} ${on ? s.tabOn : ''}`} type="button" onClick={() => tabs.onTab(f.id)}>
                      {f.label}
                      {showCount && <span className={`${s.counter} ${f.hot > 0 ? s.counterHot : ''}`}>{f.hot > 0 ? f.hot : f.count}</span>}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className={s.sectionHead}>
                <span className={s.sectionTitle}>
                  {building && <span className={s.onlineDot} aria-hidden />}
                  {sectionTitle}
                </span>
                <span className={s.counter}>{sectionCount}</span>
                {building && (
                  <button className={s.howBtn} type="button" onClick={() => setInfoOpen(true)} aria-label="Это как?">
                    ?
                  </button>
                )}
              </div>
            )}

            {activeFeature ? (
              activeFeature.content
            ) : visible.length === 0 ? (
              <div className={s.empty}>сейчас в этом кампусе никого нет</div>
            ) : (
              <ul className={s.list}>
                {visible.map((student) => (
                  <li key={student.id}>
                    <StudentCard
                      student={student}
                      photoIndex={faceIndexById.get(student.id)}
                      president={student.id === presidentId}
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

      <InfoSheet
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        showMe={showMe}
        onToggleShowMe={() => setShowMe((v) => !v)}
      />
    </div>
  )
}
