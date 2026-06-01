import { useState } from 'react'
import s from './WallPicker.module.css'
import starUrl from '../assets/star.svg'
import AvatarStack from './AvatarStack.jsx'

function lastPost(posts) {
  return posts && posts.length ? posts[posts.length - 1] : null
}

function lastTime(post) {
  if (!post) return ''
  const m = post.time.match(/(\d{1,2}:\d{2})/)
  return m ? m[1] : post.time
}

export default function WallPicker({ buildings, wallsByBuilding, unread, onPick, onBack }) {
  const [closing, setClosing] = useState(false)
  const close = () => setClosing(true)

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
        <div className={s.headerTitle}>стена универа</div>
        <div className={s.headerSpacer} />
      </header>

      <div className="scroll">
        <ul className={s.list}>
          {buildings.map((b, i) => {
            const posts = wallsByBuilding[b.id] ?? []
            const last = lastPost(posts)
            const count = unread?.[b.id] ?? 0
            const isUnread = count > 0
            return (
              <li key={b.id}>
                <button className={s.row} onClick={() => onPick(b.id)}>
                  <span className={s.avatar} aria-hidden>
                    <AvatarStack indices={[i * 3, i * 3 + 1, i * 3 + 2]} />
                  </span>

                  <div className={s.body}>
                    <div className={s.name}>{b.faculty.toLowerCase()}</div>
                    <div className={s.previewLine}>
                      <span className={`${s.preview} ${isUnread ? s.unread : ''}`}>
                        {last ? last.text : 'пока пусто'}
                      </span>
                      <span className={s.time}>· {lastTime(last)}</span>
                    </div>
                  </div>

                  {isUnread && (
                    <span
                      className={s.badge}
                      style={{ transform: `rotate(${i % 2 === 1 ? 12 : -12}deg)` }}
                      aria-label={`${count} непрочитанных`}
                    >
                      <img src={starUrl} alt="" className={s.badgeStar} />
                      <span className={s.badgeCount}>{count}</span>
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
