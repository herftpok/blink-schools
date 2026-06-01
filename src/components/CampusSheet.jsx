import { useEffect, useMemo } from 'react'
import s from './CampusSheet.module.css'
import AvatarStack from './AvatarStack.jsx'
import collegeUrl from '../assets/college.svg'

// 3 индекса пула фото для композиции корпуса (стабильно по позиции корпуса)
function faceTrio(base) {
  const b = (base < 0 ? 0 : base) * 3
  return [b, b + 1, b + 2]
}

function formatDistance(meters) {
  if (meters == null) return ''
  if (meters < 1000) return `${meters} м`
  const km = meters / 1000
  return `${km < 10 ? km.toFixed(1).replace('.', ',') : Math.round(km)} км`
}

export default function CampusSheet({
  open,
  onClose,
  buildings,
  current,
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
          <span className={s.title}>выбрать корпус</span>
          <button className={s.close} onClick={onClose} aria-label="Закрыть">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        <div className={s.list}>
          <button
            className={`${s.row} ${current === null ? s.rowSelected : ''}`}
            onClick={() => onSelect(null)}
            aria-pressed={current === null}
          >
            <span className={s.iconAll} aria-hidden>
              <img src={collegeUrl} alt="" className={s.iconAllGlyph} />
            </span>
            <div className={s.rowMain}>
              <span className={s.rowTitle}>все корпусы</span>
              <span className={s.rowSub}>все студенты универа</span>
            </div>
            <span className={s.rowTrail}>
              <span className={s.count}>{totalStudents}</span>
            </span>
            <SelectionMark active={current === null} />
          </button>

          <div className={s.sectionLabel}>корпусы</div>

          {sorted.map((b) => {
            const selected = current?.id === b.id
            return (
              <button
                key={b.id}
                className={`${s.row} ${selected ? s.rowSelected : ''}`}
                onClick={() => onSelect(b.id)}
                aria-pressed={selected}
              >
                <span className={s.icon} aria-hidden>
                  <AvatarStack indices={faceTrio(buildings.findIndex((x) => x.id === b.id))} />
                </span>
                <div className={s.rowMain}>
                  <span className={s.rowTitle}>{b.faculty.toLowerCase()}</span>
                  <span className={s.rowSub}>{b.address}</span>
                </div>
                <span className={s.rowTrail}>
                  {b.distance > 0 && (
                    <span className={s.distance}>{formatDistance(b.distance)}</span>
                  )}
                  <span className={s.count}>
                    <span className={s.greenDot} /> {studentsByBuilding?.[b.id] ?? 0}
                  </span>
                </span>
                <SelectionMark active={selected} />
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

function SelectionMark({ active }) {
  return (
    <span className={`${s.mark} ${active ? s.markActive : ''}`} aria-hidden>
      {active && (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 8.5l3.2 3.2L12.5 5" />
        </svg>
      )}
    </span>
  )
}
