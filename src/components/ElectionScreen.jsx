import { useLayoutEffect, useRef, useState } from 'react'
import s from './ElectionScreen.module.css'
import { Reaction, Btn, CloseX } from './ElectionUi.jsx'
import AboutSheet from './AboutSheet.jsx'
import { faceAt } from '../utils/faces.js'
import { electionInfo, daysWord } from '../data/elections.js'

// Рисованный фон. Формы разного рода и размера, каждая со своим поворотом:
// вокруг заголовка — мелкое, по правому полю — редкие метки, внизу, где список
// кончается, — крупное. Два элемента медленно крутятся. Живёт за списком.
function Doodles() {
  return (
    <svg className={s.doodles} viewBox="0 0 390 844" aria-hidden>
      {/* у заголовка */}
      <path className={s.spin} d="M250 66l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" transform="rotate(15 250 82)" />
      <path className={s.pink} d="M206 60l2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5z" transform="rotate(-20 206 70)" />
      <circle className={s.ring} cx="228" cy="110" r="6" />
      <path className={s.thin} d="M314 52l8 8M322 52l-8 8" />
      <circle cx="286" cy="130" r="2" />

      {/* правое поле — у самой кромки, за текст не заходит */}
      <circle className={s.faint} cx="381" cy="190" r="2" />
      <path className={`${s.pinkSoft} ${s.thin}`} d="M380 268l1.6 5 5 1.6-5 1.6-1.6 5-1.6-5-5-1.6 5-1.6z" transform="rotate(30 380 274.6)" />
      <circle className={`${s.ring} ${s.faint}`} cx="381" cy="356" r="3.2" />
      <path className={`${s.thin} ${s.faint}`} d="M378 428l4 6-4 6 4 6" />
      <circle className={s.faint} cx="382" cy="508" r="2" />

      {/* внизу — доска и парта: формулы и надписи, разного кегля и наклона */}
      <text className={s.formula} x="26" y="614" fontSize="30" transform="rotate(-8 26 614)">E = mc²</text>
      <text className={s.formula} x="186" y="602" fontSize="22" transform="rotate(6 186 602)">a² + b² = c²</text>
      <text className={s.formula} x="312" y="596" fontSize="17" transform="rotate(-8 312 596)">ваня лох</text>
      <g transform="rotate(4 30 660)">
        <text className={s.formula} x="30" y="660" fontSize="21">лена + коля =</text>
        <path d="M154 651c-2.5-6-12-4-10 3 1 5 7 8 10 11 3-3 9-6 10-11 2-7-7.5-9-10-3z" />
      </g>
      <text className={s.formula} x="226" y="652" fontSize="20" transform="rotate(10 226 652)">∫ x dx = x²/2</text>
      <text className={`${s.formula} ${s.formulaFaint}`} x="40" y="716" fontSize="44" transform="rotate(-14 40 716)">π</text>
      <path className={`${s.thin} ${s.pinkSoft}`} d="M368 636l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" transform="rotate(20 368 644)" />
      <circle cx="176" cy="628" r="2.5" />
      <path d="M300 668c12 8 18 24 12 42" />
      <path d="M306 704l7 7 5-10" />
    </svg>
  )
}

// Строка кандидата: фото, имя, обещание, справа реакции «за» и «против».
function Row({ c, pre, first, mine, onReact, rowRef }) {
  const src = faceAt(c.face)
  return (
    <li ref={rowRef} className={`${s.row} ${first ? s.rowFirst : ''}`}>
      <span className={s.avatarWrap}>
        <span className={s.avatar}>{src && <img src={src} alt="" loading="lazy" />}</span>
        {first && (
          <svg className={s.seat} viewBox="0 0 28 22" aria-hidden>
            <path d="M3 8l5 5 6-9 6 9 5-5-2 11H5z" />
          </svg>
        )}
      </span>
      <span className={s.body}>
        <span className={s.name}>
          {c.name}
        </span>
        <span className={s.promise}>{c.promise || 'обещание ещё пишется'}</span>
      </span>
      {!pre && (
        <span className={s.reactions}>
          <Reaction kind="like" count={c.likes} active={mine === 'like'} onClick={() => onReact(c.id, 'like')} label={`за ${c.name}`} />
          <Reaction kind="dislike" count={c.dislikes} active={mine === 'dislike'} onClick={() => onReact(c.id, 'dislike')} label={`против ${c.name}`} />
        </span>
      )}
    </li>
  )
}

export default function ElectionScreen({ phase = 'voting', candidates, reactions = {}, isCandidate, onReact, onNominate, onInvite, onBack }) {
  const [closing, setClosing] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const close = () => setClosing(true)
  const pre = phase === 'pre'

  // FLIP по offsetTop: строки доезжают на новые места при смене порядка
  const rowRefs = useRef(new Map())
  const prevTop = useRef(new Map())
  useLayoutEffect(() => {
    rowRefs.current.forEach((node, id) => {
      if (!node) return
      const prev = prevTop.current.get(id)
      const next = node.offsetTop
      if (prev != null && Math.abs(prev - next) > 1) {
        node.animate(
          [{ transform: `translateY(${prev - next}px)` }, { transform: 'translateY(0)' }],
          { duration: 420, easing: 'cubic-bezier(0.2, 0.9, 0.25, 1)' }
        )
      }
      prevTop.current.set(id, next)
    })
  })

  return (
    <div
      className={`screen ${s.screen} ${closing ? s.closing : ''}`}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && closing) onBack()
      }}
    >
      <Doodles />

      <header className={s.header}>
        <div className={s.headText}>
          <h1 className={s.title}>
            выборы
            <button className={s.q} type="button" onClick={() => setAboutOpen(true)} aria-label="Что такое выборы">?</button>
          </h1>
          <div className={s.sub}>
            {pre ? <>старт {electionInfo.startsAt}</> : <>осталось {electionInfo.daysLeft} {daysWord(electionInfo.daysLeft)}</>}
          </div>
        </div>
        <CloseX onClick={close} />
      </header>

      <div className={`scroll ${s.scroll}`}>
        <div className={s.sectionHead}>
          <span className={s.sectionTitle}>{pre ? 'кандидаты' : 'топ кандидатов'}</span>
        </div>

        <ul className={s.list}>
          {candidates.map((c, i) => (
            <Row
              key={c.id}
              c={c}
              pre={pre}
              first={!pre && i === 0}
              mine={reactions[c.id]}
              onReact={onReact}
              rowRef={(node) => rowRefs.current.set(c.id, node)}
            />
          ))}
        </ul>
        <div className={s.tail} />
      </div>

      <AboutSheet open={aboutOpen} onClose={() => setAboutOpen(false)} />

      <div className={s.footer}>
        {isCandidate ? <Btn onClick={onInvite}>мой плакат</Btn> : <Btn onClick={onNominate}>выдвинуть себя</Btn>}
      </div>
    </div>
  )
}
