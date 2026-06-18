import { useEffect, useMemo } from 'react'
import s from './CampusSheet.module.css'
import AvatarStack from './AvatarStack.jsx'
import collegeUrl from '../assets/college.svg'
import chevronUrl from '../assets/chevron.png'
import closeUrl from '../assets/close.png'

// 3 индекса пула фото для композиции корпуса (стабильно по позиции корпуса)
function faceTrio(base) {
  const b = (base < 0 ? 0 : base) * 3
  return [b, b + 1, b + 2]
}

// «38 человек сейчас тут» / «1 человек сейчас тут» / «2 человека сейчас тут»
function peopleHere(n) {
  if (!n || n <= 0) return 'сейчас тут никого нет'
  const m10 = n % 10
  const m100 = n % 100
  let word = 'человек'
  if (m10 === 1 && m100 !== 11) word = 'человек'
  else if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) word = 'человека'
  return `${n} ${word} сейчас тут`
}

function Chevron() {
  return (
    <img className={s.chev} src={chevronUrl} alt="" aria-hidden />
  )
}

function Check() {
  return (
    <span className={s.check} aria-hidden>
      <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5l3.2 3.2L12.5 5" />
      </svg>
    </span>
  )
}

export default function CampusSheet({
  open,
  onClose,
  buildings,
  current,
  universityName = 'все корпусы',
  studentsByBuilding,
  totalStudents,
  onSelect
}) {
  const sorted = useMemo(() => {
    return [...buildings].sort(
      (a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)
    )
  }, [buildings])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <div
        className={`${s.backdrop} ${open ? s.open : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <div
        className={`${s.sheet} ${open ? s.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Выбрать корпус"
        aria-hidden={!open}
      >
        <div className={s.grabber} />

        <div className={s.head}>
          <h2 className={s.title}>выбери корпус</h2>
          <button className={s.close} onClick={onClose} aria-label="Закрыть">
            <img className={s.closeIcon} src={closeUrl} alt="" />
          </button>
        </div>

        <div className={s.list}>
          <button
            className={`${s.allRow} ${current === null ? s.selected : ''}`}
            onClick={() => onSelect(null)}
            aria-pressed={current === null}
          >
            <span className={s.iconAll} aria-hidden>
              <img src={collegeUrl} alt="" className={s.iconAllGlyph} />
            </span>
            <div className={s.rowMain}>
              <span className={s.rowTitle}>{universityName.toLowerCase()}</span>
              <span className={s.rowSub}>тут все студенты</span>
            </div>
            {current === null ? <Check /> : <Chevron />}
          </button>

          <div className={s.sectionLabel}>
            корпусы <span className={s.secCount}>{sorted.length}</span>
          </div>

          {sorted.map((b) => {
            const selected = current?.id === b.id
            const n = studentsByBuilding?.[b.id] ?? 0
            const idx = buildings.findIndex((x) => x.id === b.id)
            return (
              <button
                key={b.id}
                className={`${s.row} ${selected ? s.selected : ''}`}
                onClick={() => onSelect(b.id)}
                aria-pressed={selected}
              >
                <span className={s.icon} aria-hidden>
                  {n > 0 ? (
                    <AvatarStack indices={faceTrio(idx)} />
                  ) : (
                    <span className={s.placeholder}>
                      <img src={collegeUrl} alt="" className={s.placeholderGlyph} />
                    </span>
                  )}
                </span>
                <div className={s.rowMain}>
                  <span className={s.rowTitle}>{b.faculty.toLowerCase()}</span>
                  <span className={s.rowSub}>
                    {b.youArePresent ? 'ты сейчас тут' : b.address.toLowerCase()}
                  </span>
                  <span className={`${s.people} ${n > 0 ? s.peopleActive : ''}`}>
                    {peopleHere(n)}
                  </span>
                </div>
                {selected ? <Check /> : <Chevron />}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
