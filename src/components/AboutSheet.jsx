import { useEffect } from 'react'
import s from './AboutSheet.module.css'
import likeUrl from '../assets/reactions/like.png'
import crownUrl from '../assets/crown.png'
import { electionInfo, daysWord } from '../data/elections.js'
import { Btn } from './ElectionUi.jsx'

// Коротко: что происходит и что получит первый.
export default function AboutSheet({ open, onClose }) {
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
        <span className={s.grab} />
        <div className={s.title}>что такое выборы</div>
        <ul className={s.list}>
          <li>
            <img src={likeUrl} alt="" className={s.icon} aria-hidden />
            <span>ближайшие {electionInfo.daysLeft} {daysWord(electionInfo.daysLeft)} вся школа ставит реакции кандидатам. чей рейтинг окажется выше к концу выборов — станет президентом</span>
          </li>
          <li>
            <img src={crownUrl} alt="" className={s.icon} aria-hidden />
            <span>президент полностью управляет школой — может менять название, цвета, аватарку, запускать интерактивы и многое другое</span>
          </li>
        </ul>
        <Btn className={s.btn} onClick={onClose}>понятно</Btn>
      </div>
    </>
  )
}
