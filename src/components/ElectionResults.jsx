import { useState } from 'react'
import s from './ElectionResults.module.css'
import { Paper, Seal, PhotoTile, Hand, Caption, CloseX, PaperDoodles, Btn } from './ElectionUi.jsx'
import { electionInfo } from '../data/elections.js'

// Итоги на бумаге: победитель, круглая печать, таблица с отточиями, подпись.
// Проигравшему — своя строка в таблице.
export default function ElectionResults({ candidates, reactions = {}, onBack, onShare }) {
  const [closing, setClosing] = useState(false)
  const close = () => setClosing(true)

  const [winner, ...rest] = candidates
  const mine = candidates.find((c) => c.isMe)
  const liked = candidates.find((c) => reactions[c.id] === 'like')

  return (
    <div
      className={`screen ${s.screen} ${closing ? s.closing : ''}`}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && closing) onBack()
      }}
    >
      <div className={s.top}>
        <span className={s.topText}>итоги выборов</span>
        <CloseX onClick={close} />
      </div>

      <div className={s.scroll}>
        <Paper className={s.protocol} ruled={false}>
          <div className={s.frame} aria-hidden />
          <PaperDoodles variant="results" />
          <Caption className={s.center}>выборы президента школы · {electionInfo.term}</Caption>
          <div className={s.hero}>
            <PhotoTile face={winner.face} size={92} rotate={-3} tape />
            <div className={s.heroText}>
              <Caption>президент школы</Caption>
              <h1 className={s.name}>{winner.name}</h1>
              <span className={s.meta}>{winner.likes} за · {winner.dislikes} против</span>
            </div>
          </div>
          <Seal ring="президент школы · спбгу · 2026/27 · " center="выбран" className={s.seal} />

          <Hand className={s.quote}>«{winner.promise}»</Hand>

          <table className={s.table}>
            <tbody>
              {rest.map((c, i) => (
                <tr key={c.id} className={c.isMe ? s.trMe : undefined}>
                  <td className={s.tdN}>{i + 2}.</td>
                  <td className={s.tdName}><span>{c.name}</span><i /></td>
                  <td className={s.tdV}>{c.likes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={s.footRow}>
            <span className={s.you}>
              <Caption>{mine ? 'твой результат' : 'ты за'}</Caption>
              <Hand pink className={s.youHand}>
                {mine
                  ? `${candidates.indexOf(mine) + 1} место`
                  : liked
                    ? `${liked.name}${liked === winner ? ' ✓' : ''}`
                    : 'никого'}
              </Hand>
            </span>
            <span className={s.sig}>
              <Caption>подпись</Caption>
              <Hand className={s.sigHand}>блинк</Hand>
            </span>
          </div>
        </Paper>
      </div>

      <div className={s.footer}>
        <Btn onClick={onShare}>поделиться</Btn>
      </div>
    </div>
  )
}
