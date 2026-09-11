import { useEffect, useState } from 'react'
import s from './AskSheet.module.css'
import Photo from './Photo.jsx'
import Sticker from './Sticker.jsx'

export const QUESTION_MAX = 140

// «Спросить»: выбрать человека из школы и написать вопрос. Без адресата
// вопроса нет — ответить может только тот, кому он задан.
export default function AskSheet({ open, students, faceOf, onSubmit, onClose }) {
  const [text, setText] = useState('')
  const [to, setTo] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Подсказки только после ввода имени, иначе список выглядит как «все участники»
  const q = query.trim().toLowerCase()
  const found = q ? students.filter((st) => st.name.startsWith(q)).slice(0, 8) : []
  const target = to != null ? students.find((st) => st.id === to) : null

  const submit = () => {
    const t = text.trim()
    if (!t || to == null) return
    onSubmit(t, to)
    setText(''); setTo(null); setQuery('')
  }

  return (
    <>
      <div className={`${s.back} ${open ? s.open : ''}`} onClick={onClose} aria-hidden={!open} />
      <div className={`${s.sheet} ${open ? s.open : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <span className={s.grab} />
        <div className={s.head}>
          <span className={s.title}>спросить</span>
          <Sticker name="eyes" size={40} />
        </div>

        {target ? (
          <div className={s.toRow}>
            <span className={s.chipAvatar} style={{ background: target.avatar }}>
              <span>{target.initial}</span>
              <Photo index={faceOf(target.id)} />
            </span>
            <span className={s.toName}>{target.name}</span>
            <button className={s.change} type="button" onClick={() => setTo(null)}>изменить</button>
          </div>
        ) : (
          <div className={s.picker}>
            <input
              className={s.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="кому — имя из школы"
            />
            {found.length > 0 && <ul className={s.people}>
              {found.map((st) => (
                <li key={st.id}>
                  <button className={s.person} type="button" onClick={() => setTo(st.id)}>
                    <span className={s.chipAvatar} style={{ background: st.avatar }}>
                      <span>{st.initial}</span>
                      <Photo index={faceOf(st.id)} />
                    </span>
                    {st.name}
                  </button>
                </li>
              ))}
            </ul>}
          </div>
        )}

        <div className={s.field}>
          <textarea
            className={s.textarea}
            value={text}
            maxLength={QUESTION_MAX}
            onChange={(e) => setText(e.target.value.slice(0, QUESTION_MAX))}
            placeholder="твой вопрос"
            rows={3}
          />
          <span className={`${s.counter} ${QUESTION_MAX - text.length <= 10 ? s.counterLow : ''}`}>{QUESTION_MAX - text.length}</span>
        </div>

        <button className={s.submit} type="button" disabled={!text.trim() || to == null} onClick={submit}>спросить анонимно</button>
      </div>
    </>
  )
}
