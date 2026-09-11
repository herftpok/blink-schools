import { useEffect, useRef, useState } from 'react'
import s from './ClubChatScreen.module.css'
import ChatMessage from './ChatMessage.jsx'
import ClubTile from './ClubTile.jsx'
import squareCloseUrl from '../assets/square-close.svg'
import { membersWord } from '../data/clubs.js'

// Чат клуба: видят и пишут только участники.
export default function ClubChatScreen({ club, messages, person, onSend, onBack }) {
  const [text, setText] = useState('')
  const [closing, setClosing] = useState(false)
  const scrollRef = useRef(null)
  const close = () => {
    setClosing(true)
    setTimeout(onBack, 320)
  }

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages.length])

  const send = () => {
    const t = text.trim()
    if (!t) return
    onSend(t)
    setText('')
  }

  return (
    <div className={`screen ${s.screen} ${closing ? s.closing : ''}`} onAnimationEnd={(e) => e.target === e.currentTarget && closing && onBack()}>
      <header className={s.header}>
        <ClubTile club={club} size={44} radius={14} />
        <div className={s.headText}>
          <div className={s.title}>{club.name}</div>
          <div className={s.sub}>{club.members.length} {membersWord(club.members.length)} · только для участников</div>
        </div>
        <button className={s.x} type="button" onClick={close} aria-label="Закрыть"><img src={squareCloseUrl} alt="" /></button>
      </header>

      <div className="scroll" ref={scrollRef}>
        <div className={s.threadInner}>
          <ul className={s.thread}>
            {messages.map((m, i) => {
              const mine = m.by === 'me'
              const p = person(m.by)
              const prev = messages[i - 1]
              const same = prev && prev.by === m.by
              return (
                <li key={m.id} className={same ? s.tight : ''}>
                  <ChatMessage name={p.name} initial={p.initial} avatar={p.avatar} text={m.text} mine={mine} showHeader={!same} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <footer className={s.composer}>
        <div className={s.inputWrap}>
          <input
            className={s.input}
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 500))}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="сообщение"
          />
        </div>
        <button className={s.sendBtn} type="button" disabled={!text.trim()} onClick={send} aria-label="Отправить">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </button>
      </footer>
    </div>
  )
}
