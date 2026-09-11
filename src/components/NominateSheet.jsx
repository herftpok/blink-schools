import { useEffect, useState } from 'react'
import s from './NominateSheet.module.css'
import { Paper, PhotoTile, Hand, Caption, Btn } from './ElectionUi.jsx'
import wordmarkUrl from '../assets/blink-wordmark-ink.png'

// Анкета кандидата: бланк с одним рукописным полем и подписью.
export default function NominateSheet({ open, me, onSubmit, onClose }) {
  const [promise, setPromise] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <div className={`${s.back} ${open ? s.open : ''}`} onClick={onClose} aria-hidden={!open} />
      <div className={`${s.sheet} ${open ? s.open : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <Paper className={s.form} ruled={false}>
          <div className={s.formHead}>
            <img src={wordmarkUrl} alt="блинк" className={s.logo} />
            <PhotoTile face={me.face} size={54} rotate={3} tape />
          </div>
          <p className={s.text}>
            я, <Hand className={s.inline}>{me.name}</Hand>, иду в президенты школы и обещаю:
          </p>
          <input
            className={s.input}
            value={promise}
            onChange={(e) => setPromise(e.target.value.slice(0, 48))}
            placeholder="напиши от руки"
          />
          <div className={s.sign}>
            <Caption>подпись</Caption>
            <span className={s.signLine}><Hand className={s.signature}>{me.name}</Hand></span>
          </div>
          <Btn ink className={s.submit} onClick={() => { onSubmit(promise.trim()); setPromise('') }}>участвовать</Btn>
        </Paper>
      </div>
    </>
  )
}
