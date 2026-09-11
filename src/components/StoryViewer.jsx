import { useEffect, useState } from 'react'
import { faceAt } from '../utils/faces.js'
import s from './StoryViewer.module.css'

export default function StoryViewer({ stories, start = 0, onSeen, onClose }) {
  const [idx, setIdx] = useState(start)
  const st = stories[idx]
  const src = st.img ?? faceAt(st.face)
  const avatarSrc = faceAt(st.face)

  useEffect(() => {
    onSeen?.(stories[idx].id)
  }, [idx])

  const next = () => (idx < stories.length - 1 ? setIdx(idx + 1) : onClose())
  const prev = () => idx > 0 && setIdx(idx - 1)

  return (
    <div className={s.viewer}>
      {src ? (
        <img src={src} alt="" className={s.photo} />
      ) : (
        <div className={s.photoFallback} />
      )}
      <div className={s.shadeTop} />
      <div className={s.shadeBottom} />

      <div className={s.progress}>
        {stories.map((story, i) => (
          <span key={story.id} className={s.seg}>
            <span
              // key по idx перезапускает анимацию при переключении
              key={`${story.id}-${i === idx ? 'a' : 'p'}`}
              className={`${s.fill} ${i < idx ? s.done : ''} ${i === idx ? s.active : ''}`}
              onAnimationEnd={i === idx ? next : undefined}
            />
          </span>
        ))}
      </div>

      <div className={s.meta}>
        {avatarSrc && (
          <span className={s.metaAvatar}>
            <img src={avatarSrc} alt="" />
          </span>
        )}
        <span className={s.metaText}>
          <span className={s.name}>{st.name}</span>
          <span className={s.place}>{st.address} · {st.time}</span>
        </span>
      </div>

      <button className={s.close} onClick={onClose} aria-label="Закрыть">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>

      <button className={s.zoneLeft} onClick={prev} aria-label="Предыдущий" />
      <button className={s.zoneRight} onClick={next} aria-label="Следующий" />
    </div>
  )
}
