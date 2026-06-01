import s from './BuildingSelector.module.css'

export default function BuildingSelector({ current, onOpen }) {
  const label = current ? current.faculty.toLowerCase() : 'все корпусы'

  return (
    <button
      className={s.trigger}
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label="Выбрать кампус"
    >
      <span className={s.label}>{label}</span>
      <svg className={s.chev} viewBox="0 0 16 16" width="14" height="14">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
