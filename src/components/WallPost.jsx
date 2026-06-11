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
      />

      <div className={s.reactionsRow}>
        {quickReactions.map((r) => {
          const count = post.reactions?.[r.key] || 0
          const active = post.myReaction === r.key
          return (
            <button
              key={r.key}
              className={`${s.reaction} ${active ? s.reactionActive : ''} ${count === 0 ? s.reactionEmpty : ''}`}
              onClick={() => onReact(r.key)}
            >
              <ReactionIcon img={r.img} emoji={r.emoji} />
              {count > 0 && <span className={s.reactionCount}>{count}</span>}
            </button>
          )
        })}
      </div>

      {showComments && (
        <button
          className={`${s.commentsBtn} ${!hasComments ? s.commentsBtnEmpty : ''}`}
          onClick={onOpenComments}
          type="button"
        >
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
            <svg className={s.replyIcon} viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h8a3 3 0 0 1 3 3v2M3 8l3-3M3 8l3 3" />
            </svg>
          )}
          <span className={s.commentsText}>{commentsLabel}</span>
          <svg className={s.commentsChev} viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>
      )}
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
