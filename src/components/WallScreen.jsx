import { useEffect, useMemo, useRef, useState } from 'react'
import WallPost from './WallPost.jsx'
import CommentsScreen from './CommentsScreen.jsx'
import s from './WallScreen.module.css'

// key — ключ в post.reactions; img — картинка 32×32 из /public/reactions;
// emoji — фолбэк, пока картинка не подложена.
const BASE = import.meta.env.BASE_URL // '/' в dev, '/blink-schools/' в проде
const QUICK_REACTIONS = [
  { key: 'heart',  img: `${BASE}reactions/heart.png`,  emoji: '❤️' },
  { key: 'cat',    img: `${BASE}reactions/cat.png`,    emoji: '🐱' },
  { key: 'smiley', img: `${BASE}reactions/smiley.png`, emoji: '🙂' },
  { key: 'flower', img: `${BASE}reactions/flower.png`, emoji: '🌹' }
]
const ME_AVATAR = 'linear-gradient(135deg, hsl(150 70% 55%), hsl(180 70% 35%))'

// «1 запись» / «2 записи» / «5 записей»
function recordsWord(n) {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'запись'
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'записи'
  return 'записей'
}

export default function WallScreen({ university, building, posts, canPost = true, onBack }) {
  const initial = useMemo(() => [...posts].reverse(), [posts])
  const [list, setList] = useState(initial)
  const [text, setText] = useState('')
  const [anon, setAnon] = useState(false)
  const [openPostId, setOpenPostId] = useState(null)
  const [closing, setClosing] = useState(false)
  const close = () => setClosing(true)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  const openPost = openPostId != null ? list.find((p) => p.id === openPostId) : null

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [list])

  const submit = () => {
    const value = text.trim()
    if (!value) return
    const post = {
      id: Date.now(),
      anon,
      author: anon
        ? null
        : { name: 'иван', avatar: ME_AVATAR, initial: 'и' },
      time: 'только что',
      text: value,
      reactions: {},
      myReaction: null,
      comments: []
    }
    setList([...list, post])
    setText('')
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }
  }

  const toggleReaction = (postId, emoji) => {
    setList((arr) =>
      arr.map((p) => {
        if (p.id !== postId) return p
        const reactions = { ...(p.reactions || {}) }
        let myReaction = p.myReaction

        if (myReaction === emoji) {
          reactions[emoji] = Math.max(0, (reactions[emoji] || 1) - 1)
          if (reactions[emoji] === 0) delete reactions[emoji]
          myReaction = null
        } else {
          if (myReaction) {
            reactions[myReaction] = Math.max(0, (reactions[myReaction] || 1) - 1)
            if (reactions[myReaction] === 0) delete reactions[myReaction]
          }
          reactions[emoji] = (reactions[emoji] || 0) + 1
          myReaction = emoji
        }

        return { ...p, reactions, myReaction }
      })
    )
  }

  const addComment = (postId, value) => {
    setList((arr) =>
      arr.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...(p.comments ?? []),
                {
                  id: 'c' + Date.now(),
                  author: { name: 'иван', initial: 'и', avatar: ME_AVATAR },
                  text: value,
                  time: 'только что'
                }
              ]
            }
          : p
      )
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
          <div className={s.headerText}>
            <div className={s.headerTitle}>{building.faculty.toLowerCase()}</div>
            <div className={s.headerSub}>
              стена · {list.length} {recordsWord(list.length)}
            </div>
          </div>
        </div>

        <button className={s.headerBtn} aria-label="Уведомления">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </header>

      <div className="scroll" ref={scrollRef}>
        <ul className={s.feed}>
          {list.map((post, i) => {
            const prev = i > 0 ? list[i - 1] : null
            const isMine = !post.anon && post.author?.name === 'иван'
            const prevIsMine = prev && !prev.anon && prev.author?.name === 'иван'
            const sameAuthorAsPrev =
              Boolean(prev) &&
              !post.anon &&
              !prev.anon &&
              prev.author?.name === post.author?.name &&
              isMine === prevIsMine
            return (
              <WallPost
                key={post.id}
                post={post}
                isMine={isMine}
                showHeader={!sameAuthorAsPrev}
                sameAuthor={sameAuthorAsPrev}
                quickReactions={QUICK_REACTIONS}
                onReact={(emoji) => toggleReaction(post.id, emoji)}
                onOpenComments={() => setOpenPostId(post.id)}
              />
            )
          })}
        </ul>
      </div>

      {canPost ? (
        <footer className={s.composer}>
          <div className={s.inputWrap}>
            <button
              className={`${s.anonToggle} ${anon ? s.anonToggleActive : ''}`}
              onClick={() => setAnon((v) => !v)}
              aria-label={anon ? 'Писать от себя' : 'Писать анонимно'}
              aria-pressed={anon}
              type="button"
            >
              {anon ? (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
            <textarea
              ref={inputRef}
              className={s.input}
              placeholder={anon ? 'написать анонимно...' : 'написать'}
              value={text}
              onChange={onTextareaChange}
              onKeyDown={onKeyDown}
              rows={1}
            />
          </div>

          {text.trim() ? (
            <button className={s.sendBtn} onClick={submit} aria-label="Отправить" type="button">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          ) : (
            <button className={s.photoBtn} aria-label="Фото" type="button">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="8.5" cy="9" r="1.6" />
                <path d="M20 16l-4.5-4.5L5 21" />
              </svg>
            </button>
          )}
        </footer>
      ) : (
        <footer className={s.lockedNote}>
          <svg className={s.lockedIcon} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="11" width="16" height="9" rx="2.5" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <p className={s.lockedText}>
            пиши комменты где угодно! а на стене<br />
            оставлять записи можно только из корпуса
          </p>
        </footer>
      )}

      {openPost && (
        <CommentsScreen
          post={openPost}
          quickReactions={QUICK_REACTIONS}
          onReact={(emoji) => toggleReaction(openPost.id, emoji)}
          onBack={() => setOpenPostId(null)}
          onAddComment={(value) => addComment(openPost.id, value)}
        />
      )}
    </div>
  )
}
