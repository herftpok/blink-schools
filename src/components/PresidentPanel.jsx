import { useState } from 'react'
import s from './PresidentPanel.module.css'
import { CloseX } from './ElectionUi.jsx'
import crownUrl from '../assets/crown.png'
import ColorWheel from './ColorWheel.jsx'

// Настройки школы, доступные президенту: имя школы, три точки цвета, закреп.
// Открываются шестерёнкой слева вверху хаба. Всё применяется сразу.
export default function PresidentPanel({ settings, onChange, onBack }) {
  const [closing, setClosing] = useState(false)
  const close = () => setClosing(true)
  const set = (patch) => onChange({ ...settings, ...patch })

  return (
    <div
      className={`screen ${s.screen} ${closing ? s.closing : ''}`}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && closing) onBack()
      }}
    >
      <header className={s.header}>
        <div className={s.headText}>
          <h1 className={s.title}>настройки школы</h1>
          <div className={s.sub}><img src={crownUrl} alt="" className={s.crown} aria-hidden />права президента до сентября</div>
        </div>
        <CloseX onClick={close} className={s.x} />
      </header>

      <div className={s.scroll}>
        <section className={s.sec}>
          <span className={s.label}>название</span>
          <input
            className={s.input}
            value={settings.customName}
            onChange={(e) => set({ customName: e.target.value.slice(0, 40) })}
            placeholder="как зовут школу"
          />
        </section>

        <section className={s.sec}>
          <span className={s.label}>цвет</span>
          <ColorWheel points={settings.colors} onChange={(colors) => set({ colors })} />
        </section>

        <section className={s.sec}>
          <span className={s.label}>закреп</span>
          <input
            className={s.input}
            value={settings.pinned}
            onChange={(e) => set({ pinned: e.target.value.slice(0, 60) })}
            placeholder="объявление для всех"
          />
        </section>

        <section className={s.sec}>
          <span className={s.label}>скоро</span>
          <div className={s.chips}>
            <span>эмодзи школы</span>
            <span>помощники</span>
            <span>обложка чатов</span>
          </div>
        </section>

        <div className={s.tail} />
      </div>
    </div>
  )
}
