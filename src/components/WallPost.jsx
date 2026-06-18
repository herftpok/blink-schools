import { useState } from 'react'
import ChatMessage from './ChatMessage.jsx'
import s from './WallPost.module.css'

function ReactionIcon({ img, emoji }) {
  const [broken, setBroken] = useState(false)
  if (broken || !img) {
    return <span className={s.reactionEmoji}>{emoji}</span>
  }
  return (
    <img
      className={s.reactionImg}
      src={img}
      alt=""
      onError={() => setBroken(true)}
    />
  )
}

export default function WallPost({ post, isMine, showHeader, sameAuthor, quickReactions, onReact, onOpenComments, showComments = true }) {
  const comments = post.comments ?? []
  const hasComments = comments.length > 0
  const commentsLabel = hasComments
    ? `${comments.length} ${plural(comments.length, ['комментарий', 'комментария', 'комментариев'])}`
    : 'прокомментировать'

  const activeReactions = quickReactions.filter(
    (r) => (post.reactions?.[r.key] || 0) > 0 || post.myReaction === r.key
  )

  return (
    <li className={`${s.group} ${isMine ? s.groupMine : ''} ${sameAuthor ? s.sameAuthor : ''}`}>
      <ChatMessage
        name={post.author?.name}
        initial={post.author?.initial}
        avatar={post.author?.avatar}
        anon={post.anon}
        text={post.text}
        mine={isMine}
        showHeader={showHeader}
      >
        {activeReactions.length > 0 && (
          <div className={s.reactionsRow}>
            {activeReactions.map((r) => {
              const count = post.reactions?.[r.key] || 0
              const active = post.myReaction === r.key
              return (
                <button
                  key={r.key}
                  className={`${s.reaction} ${active ? s.reactionActive : ''}`}
                  onClick={() => onReact(r.key)}
                >
                  <ReactionIcon img={r.img} emoji={r.emoji} />
                  {count > 0 && <span className={s.reactionCount}>{count}</span>}
                </button>
              )
            })}
          </div>
        )}

        {showComments && (
          <button className={s.commentsBtn} onClick={onOpenComments} type="button">
            {hasComments ? (
              <div className={s.stackedAvatars}>
                {comments.slice(0, 3).map((c) => (
                  <span
                    key={c.id}
                    className={s.stackedAv}
                    style={{ background: c.author.avatar }}
                    aria-hidden
                  >
                    {c.author.initial}
                  </span>
                ))}
              </div>
            ) : (
              <svg className={s.replyIcon} viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3.5 4.5h13a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H8l-3.5 3v-3H3.5A1.5 1.5 0 0 1 2 12V6a1.5 1.5 0 0 1 1.5-1.5z" />
                <circle cx="7" cy="9" r="0.7" fill="currentColor" stroke="none" />
                <circle cx="10" cy="9" r="0.7" fill="currentColor" stroke="none" />
                <circle cx="13" cy="9" r="0.7" fill="currentColor" stroke="none" />
              </svg>
            )}
            <span className={s.commentsText}>{commentsLabel}</span>
          </button>
        )}
      </ChatMessage>
    </li>
  )
}

function plural(n, [one, few, many]) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}
