import { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage.jsx'
import WallPost from './WallPost.jsx'
import s from './CommentsScreen.module.css'

export default function CommentsScreen({ post, quickReactions = [], onReact, onBack, onAddComment }) {
  const comments = post?.comments ?? []
  const [text, setText] = useState('')
  const [closing, setClosing] = useState(false)
  const close = () => setClosing(true)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [comments.length])

  if (!post) return null

  const postIsMine = !post.anon && post.author?.name === 'иван'

  const submit = () => {
    const value = text.trim()
    if (!value) return
    onAddComment(value)
    setText('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
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
      onAnimationEnd={() => closing && onBack()}
    >
      <header className={s.header}>
        <button className={s.headerBtn} onClick={close} aria-label="Назад">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div className={s.headerTitle}>
          {comments.length} {plural(comments.length, ['комментарий', 'комментария', 'комментариев'])}
        </div>
      </header>

      <div className="scroll" ref={scrollRef}>
        <div className={s.threadInner}>
          <ul className={s.feed}>
            <WallPost
              post={post}
              isMine={postIsMine}
              showHeader
              quickReactions={quickReactions}
              onReact={onReact}
              showComments={false}
            />
          </ul>

          <div className={s.divider}>
            <span>начало обсуждения</span>
          </div>

          {comments.length === 0 ? (
            <div className={s.empty}>
              пока без комментариев — будь первым
            </div>
          ) : (
            <ul className={s.thread}>
              {comments.map((c, i) => {
                const isMine = c.author?.name === 'иван'
                const prev = i > 0 ? comments[i - 1] : null
                const sameAsPrev = prev && prev.author?.name === c.author?.name
                return (
                  <li key={c.id} className={sameAsPrev ? s.tight : ''}>
                    <ChatMessage
                      name={isMine ? 'вы' : c.author?.name}
                      initial={c.author?.initial}
                      avatar={c.author?.avatar}
                      text={c.text}
                      mine={false}
                      green={isMine}
                      showHeader={!sameAsPrev}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <footer className={s.composer}>
        <button className={s.attachBtn} aria-label="Прикрепить">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </button>
        <div className={s.inputWrap}>
          <textarea
            ref={inputRef}
            className={s.input}
            placeholder="комментарий"
            value={text}
            onChange={onTextareaChange}
            onKeyDown={onKeyDown}
            rows={1}
          />
        </div>
        <button
          className={s.sendBtn}
          onClick={submit}
          disabled={!text.trim()}
          aria-label="Отправить"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </footer>
    </div>
  )
}

function plural(n, [one, few, many]) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}
