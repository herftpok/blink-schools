import { useEffect } from 'react'
import s from './ReportModal.module.css'

// Модалка жалобы: как в чатах блинка — чёрная плашка по центру, две кнопки.
export default function ReportModal({ open, what = 'вопрос', onConfirm, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div className={`${s.back} ${open ? s.open : ''}`} onClick={onClose} aria-hidden={!open}>
      <div className={s.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <p className={s.text}>пожаловаться на {what}? модераторы проверят и разберутся</p>
        <button className={`${s.btn} ${s.btnDark}`} type="button" onClick={onConfirm}>пожаловаться</button>
        <button className={`${s.btn} ${s.btnWhite}`} type="button" onClick={onClose}>отменить</button>
      </div>
    </div>
  )
}
