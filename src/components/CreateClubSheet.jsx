import { useEffect, useRef, useState } from 'react'
import s from './CreateClubSheet.module.css'
import ClubTile from './ClubTile.jsx'
import { CLUB_NAME_MAX } from '../data/clubs.js'

// «Новый клуб»: аватар и название.
// Создатель сразу становится участником.
export default function CreateClubSheet({ open, onSubmit, onClose }) {
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState(null)
  const fileRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    setName(''); setPhoto(null)
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const trimmed = name.trim()
  const submit = () => {
    if (!trimmed) return
    onSubmit({ name: trimmed.toLowerCase(), photo })
  }

  const pickPhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div className={`${s.back} ${open ? s.open : ''}`} onClick={onClose} aria-hidden={!open} />
      <div className={`${s.sheet} ${open ? s.open : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <span className={s.grab} />
        <span className={s.title}>новый клуб</span>

        <div className={s.row}>
          <button className={s.photoBtn} type="button" onClick={() => fileRef.current?.click()} aria-label="Загрузить аватар клуба">
            {photo || trimmed ? (
              <ClubTile club={{ name: trimmed || ' ', photo }} size={72} radius={24} />
            ) : (
              <span className={s.photoEmpty}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
              </span>
            )}
            <span className={s.photoBadge} aria-hidden>+</span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className={s.file} onChange={pickPhoto} tabIndex={-1} />

          <div className={s.fields}>
            <div className={s.field}>
              <input
                className={s.input}
                value={name}
                maxLength={CLUB_NAME_MAX}
                onChange={(e) => setName(e.target.value.slice(0, CLUB_NAME_MAX))}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                placeholder="название"
              />
              <span className={s.counter}>{CLUB_NAME_MAX - name.length}</span>
            </div>
          </div>
        </div>


        <button className={s.submit} type="button" disabled={!trimmed} onClick={submit}>создать клуб</button>
      </div>
    </>
  )
}
