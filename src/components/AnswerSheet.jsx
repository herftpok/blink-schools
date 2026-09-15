import { useEffect, useState } from 'react'
import s from './AnswerSheet.module.css'
import planeUrl from '../assets/send-plane.png'

export const ANSWER_MAX = 140

// Боттомшит ответа: вопрос, строка ввода с лимитом и кнопка отправки.
export default function AnswerSheet({ q, open, onSubmit, onClose }) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!open) return undefined
    setText('')
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const left = ANSWER_MAX - text.length
  const send = () => {
    const t = text.trim()
    if (!t || !q) return
    onSubmit(q.id, t)
  }

  return (
    <>
      <div className={`${s.back} ${open ? s.open : ''}`} onClick={onClose} aria-hidden={!open} />
      <div className={`${s.sheet} ${open ? s.open : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <span className={s.grab} />
        <span className={s.title}>твой ответ</span>
        {q && <p className={s.question}>{q.text}</p>}

        <div className={s.row}>
          <div className={s.inputWrap}>
            <input
              className={s.input}
              value={text}
              maxLength={ANSWER_MAX}
              onChange={(e) => setText(e.target.value.slice(0, ANSWER_MAX))}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="написать"
            />
            <span className={`${s.counter} ${left <= 10 ? s.counterLow : ''}`}>{left}</span>
          </div>
          <button className={s.sendBtn} type="button" disabled={!text.trim()} onClick={send} aria-label="Отправить ответ">
            <img src={planeUrl} alt="" className={s.plane} />
          </button>
        </div>
      </div>
    </>
  )
}
