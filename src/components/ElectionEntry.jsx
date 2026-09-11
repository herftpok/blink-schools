import s from './ElectionEntry.module.css'
import { Hand, Caption } from './ElectionUi.jsx'

// Вход в выборы — оторванный бумажный корешок под названием школы:
// перфорация слева, машинописная строка сверху, рукописная снизу.
const COPY = {
  pre: { cap: 'выборы президента', hand: 'старт 15 сентября' },
  voting: { cap: 'выборы президента', hand: 'осталось 13 дней' },
  results: { cap: 'итоги выборов', hand: 'президент — маша' }
}

export default function ElectionEntry({ phase = 'voting', onClick }) {
  const c = COPY[phase] ?? COPY.voting
  return (
    <button className={s.stub} type="button" onClick={onClick}>
      <span className={s.perf} aria-hidden />
      <span className={s.text}>
        <Caption>{c.cap}</Caption>
        <Hand>{c.hand}</Hand>
      </span>
      <span className={s.arrow} aria-hidden>→</span>
    </button>
  )
}
