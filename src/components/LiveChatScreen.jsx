import { useEffect, useRef, useState } from 'react'
import WallPost from './WallPost.jsx'
import Photo from './Photo.jsx'
import NoticeSheet from './NoticeSheet.jsx'
import s from './LiveChatScreen.module.css'

const QUICK_REACTIONS = [
  { key: 'heart',  img: `${import.meta.env.BASE_URL}reactions/heart.png`,  emoji: '❤️' },
  { key: 'cat',    img: `${import.meta.env.BASE_URL}reactions/cat.png`,    emoji: '🐱' },
  { key: 'smiley', img: `${import.meta.env.BASE_URL}reactions/smiley.png`, emoji: '🙂' },
  { key: 'flower', img: `${import.meta.env.BASE_URL}reactions/flower.png`, emoji: '🌹' }
]
const ME_AVATAR = 'linear-gradient(135deg, hsl(150 70% 55%), hsl(180 70% 35%))'

export default function LiveChatScreen({ chat, onBack }) {
  const [list, setList] = useState(chat.messages ?? [])
  const [text, setText] = useState('')
  const [closing, setClosing] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const close = () => setClosing(true)
  const here = chat.youHere

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [list])

  const submit = () => {
    const value = text.trim()
    if (!value) return
    setList([
      ...list,
      {
        id: 'l' + Date.now(),
        anon: false,
        author: { name: 'иван', avatar: ME_AVATAR, initial: 'и' },
        text: value,
        reactions: {},
        myReaction: null,
        comments: []
      }
    ])
    setText('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
  }

  const toggleReaction = (id, emoji) => {
    setList((arr) =>
      arr.map((p) => {
        if (p.id !== id) return p
        const reactions = { ...(p.reactions || {}) }
        let my = p.myReaction
        if (my === emoji) {
          reactions[emoji] = Math.max(0, (reactions[emoji] || 1) - 1)
          if (!reactions[emoji]) delete reactions[emoji]
          my = null
        } else {
          if (my) {
            reactions[my] = Math.max(0, (reactions[my] || 1) - 1)
            if (!reactions[my]) delete reactions[my]
          }
          reactions[emoji] = (reactions[emoji] || 0) + 1
          my = emoji
        }
        return { ...p, reactions, myReaction: my }
      })
    )
  }

  const onTextareaChange = (e) => {
    setText(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div
      className={`screen ${s.screen} ${closing ? s.closing : ''}`}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && closing) onBack()
      }}
    >
      <header className={s.header}>
        <button className={s.headerBtn} onClick={close} aria-label="Назад">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div className={s.headerCenter}>
          <div className={s.headerTitle}>{chat.place}</div>
          <div className={s.headerSub}>
            <span className={s.liveMini}>live</span> {chat.people} человек
          </div>
        </div>
        <div className={s.headerSpacer} />
      </header>

      <div className={s.endsBanner}>чат закончится через {chat.endsIn}</div>

      {here ? (
        <>
          <div className={s.hereStrip}>
            <div className={s.hereAvatars}>
              {chat.here.slice(0, 6).map((p) => (
                <span key={p.id} className={s.hereAv} style={{ background: 'linear-gradient(135deg,#3a3a3a,#1c1c1e)' }} aria-hidden>
                  {p.initial}
                  <Photo index={p.face} />
                </span>
              ))}
            </div>
            <span className={s.hereLabel}>{chat.people} человек здесь сейчас</span>
          </div>

          <div className="scroll" ref={scrollRef}>
            <ul className={s.feed}>
              {list.map((post, i) => {
                const prev = i > 0 ? list[i - 1] : null
                const isMine = post.author?.name === 'иван'
                const prevIsMine = prev && prev.author?.name === 'иван'
                const sameAuthorAsPrev = Boolean(prev) && prev.author?.name === post.author?.name && isMine === prevIsMine
                return (
                  <WallPost
                    key={post.id}
                    post={post}
                    isMine={isMine}
                    showHeader={!sameAuthorAsPrev}
                    sameAuthor={sameAuthorAsPrev}
                    showComments={false}
                    quickReactions={QUICK_REACTIONS}
                    onReact={(emoji) => toggleReaction(post.id, emoji)}
                  />
                )
              })}
            </ul>
          </div>

          <footer className={s.composer}>
            <div className={s.inputWrap}>
              <textarea
                ref={inputRef}
                className={s.input}
                placeholder="написать..."
                value={text}
                onChange={onTextareaChange}
                onKeyDown={onKeyDown}
                rows={1}
              />
            </div>
            <button className={s.sendBtn} onClick={submit} disabled={!text.trim()} aria-label="Отправить">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </footer>
        </>
      ) : (
        <>
          <div className={s.lockedBody}>
            <div className={s.lockIcon}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
            </div>
            <div className={s.lockedTitle}>чат доступен только на месте</div>
            <div className={s.lockedText}>
              отсюда видно, что здесь сейчас {chat.people} человек, но прочитать чат
              и увидеть, кто внутри, можно только находясь на {chat.place}.
            </div>
            <div className={s.lockedStat}>
              <span className={s.greenDot} /> {chat.people} человек · {chat.area}
            </div>
          </div>

          <footer className={s.lockedBar}>
            <button className={s.lockedBtn} type="button" onClick={() => setNoticeOpen(true)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              ты не на месте
            </button>
          </footer>
        </>
      )}

      <NoticeSheet
        open={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        title="почему чат закрыт?"
        text="лайв-чат создаётся для тех, кто сейчас в этом месте города. читать сообщения, писать и видеть, кто здесь, можно только находясь на месте события. список лайв-чатов и число людей видны всем."
      />
    </div>
  )
}
