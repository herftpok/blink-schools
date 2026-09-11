import s from './ShareScreen.module.css'
import { Paper, Stamp, PhotoTile, Hand, Caption, CloseX, PaperDoodles, Btn } from './ElectionUi.jsx'
import wordmarkUrl from '../assets/blink-wordmark-ink.png'

// Плакат кандидата, приклеенный куском скотча: сверху крупно школа, ниже фото на
// скотче, имя, обещание от руки, печать с номером. Имя не склоняем.
export default function ShareScreen({ open, me, place, university, onShare, onClose }) {
  if (!open) return null
  return (
    <div className={s.share}>
      <div className={s.top}>
        <CloseX onClick={onClose} />
      </div>

      <Paper className={s.poster} ruled={false}>
        <PaperDoodles variant="poster" />
        <span className={s.tapeTop} aria-hidden />

        <div className={s.head}>
          <Caption>выборы президента</Caption>
          <img src={wordmarkUrl} alt="блинк" className={s.logo} />
        </div>
        <h2 className={s.school}>{university.shortName}</h2>
        <Caption className={s.schoolFull}>{university.fullName}</Caption>

        <div className={s.middle}>
          <PhotoTile face={me.face} size={118} rotate={-3} tape />
          <div className={s.who}>
            <Caption>кандидат</Caption>
            <h1 className={s.name}>{me.name}</h1>
          </div>
        </div>

        <div className={s.lines}>
          <Caption>обещаю</Caption>
          <Hand className={s.promise}>{me.promise || 'не обещать лишнего'}</Hand>
          <span className={s.line} aria-hidden />
          <span className={s.line} aria-hidden />
        </div>

        <Stamp className={s.stamp} rotate={9}>кандидат № {place}</Stamp>
        <Caption className={s.foot}>{university.city}</Caption>
      </Paper>

      <div className={s.actions}>
        <Btn onClick={() => onShare('story')}>поделиться</Btn>
        <Btn dark onClick={() => onShare('link')}>скопировать ссылку</Btn>
      </div>
    </div>
  )
}
