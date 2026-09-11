import { useRef, useState } from 'react'
import s from './ColorWheel.module.css'
import wheelUrl from '../assets/color-wheel.png'
import { wheelColor } from '../data/elections.js'

const SIZE = 240
const R = SIZE / 2

// Три точки на цветовом кольце, из них собирается градиент школы.
// Угол считается по часовой от верха и совпадает с оттенком; радиус — насыщенность.
// Кнопка в центре подбирает случайное сочетание.
export default function ColorWheel({ points, onChange }) {
  const ref = useRef(null)
  const dragRef = useRef(null) // индекс точки живёт в ref: касание идёт без перерисовки
  const [drag, setDragState] = useState(null)
  const setDrag = (i) => { dragRef.current = i; setDragState(i) }

  const toPoint = (e) => {
    const box = ref.current.getBoundingClientRect()
    const dx = e.clientX - (box.left + box.width / 2)
    const dy = e.clientY - (box.top + box.height / 2)
    const a = (Math.atan2(dx, -dy) * 180) / Math.PI
    const r = Math.min(1, Math.hypot(dx, dy) / (box.width / 2))
    return { a: (a + 360) % 360, r: Math.max(0.15, r) }
  }

  const move = (e) => {
    const i = dragRef.current
    if (i == null) return
    onChange(points.map((p, k) => (k === i ? toPoint(e) : p)))
  }

  const shuffle = () => {
    const base = Math.random() * 360
    const spread = 24 + Math.random() * 60
    onChange([0, 1, 2].map((i) => ({ a: (base + i * spread) % 360, r: 0.6 + Math.random() * 0.4 })))
  }

  return (
    <div
      ref={ref}
      className={s.wheel}
      style={{ width: SIZE, height: SIZE }}
      onPointerMove={move}
      onPointerUp={() => setDrag(null)}
      onPointerLeave={() => setDrag(null)}
    >
      <img src={wheelUrl} alt="" draggable="false" />
      {points.map((p, i) => {
        const rad = (p.a * Math.PI) / 180
        const x = R + p.r * (R - 14) * Math.sin(rad)
        const y = R - p.r * (R - 14) * Math.cos(rad)
        return (
          <span
            key={i}
            className={`${s.handle} ${drag === i ? s.dragging : ''}`}
            style={{ left: x, top: y, '--c': wheelColor(p) }}
            onPointerDown={(e) => { try { e.currentTarget.setPointerCapture(e.pointerId) } catch {} setDrag(i) }}
            onPointerUp={() => setDrag(null)}
            role="slider"
            aria-label={`цвет ${i + 1}`}
            aria-valuenow={Math.round(p.a)}
          />
        )
      })}
      <button className={s.center} type="button" onClick={shuffle} aria-label="Случайное сочетание">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" /><path d="M4 4v4h4" />
          <path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" /><path d="M20 20v-4h-4" />
        </svg>
      </button>
    </div>
  )
}
