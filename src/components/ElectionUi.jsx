import s from './ElectionUi.module.css'
import { faceAt } from '../utils/faces.js'
import likeUrl from '../assets/reactions/like.png'
import dislikeUrl from '../assets/reactions/dislike.png'
import squareCloseUrl from '../assets/square-close.svg'

// Кит выборов. Бумажный стиль: лист, печать, фото как на документ, отрывные
// язычки плаката. Плюс реакции «за» и «против» с числом под картинкой.
// для заголовков документа, Caveat для всего, что «написано от руки».

// Лист кремовой бумаги в линейку. stub — отрывной корешок сверху.
export function Paper({ children, className = '', stub = null, ruled = true, ...rest }) {
  return (
    <div className={`${s.paper} ${ruled ? s.ruled : ''} ${className}`} {...rest}>
      {stub && (
        <div className={s.stub}>
          {stub}
          <span className={s.tear} aria-hidden><i>✂</i></span>
        </div>
      )}
      {children}
    </div>
  )
}

// Прямоугольная печать розовыми чернилами
export function Stamp({ children, rotate = -12, className = '', style }) {
  return (
    <span className={`${s.stamp} ${className}`} style={{ '--rot': `${rotate}deg`, ...style }}>
      {children}
    </span>
  )
}

// Круглая гербовая печать: текст по кругу и слово в центре
export function Seal({ ring, center, size = 118, className = '' }) {
  return (
    <svg className={`${s.seal} ${className}`} viewBox="0 0 120 120" width={size} height={size} aria-hidden>
      <defs>
        <path id="sealRing" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="56" />
      <circle cx="60" cy="60" r="52" className={s.sealThin} />
      <circle cx="60" cy="60" r="34" className={s.sealThin} />
      <text className={s.sealRing}><textPath href="#sealRing" startOffset="0">{ring}</textPath></text>
      <text x="60" y="66" textAnchor="middle" className={s.sealCenter}>{center}</text>
    </svg>
  )
}

// Число с чёрной обводкой — под реакцией
export function OutlineNum({ children, className = '' }) {
  const text = String(children)
  return <span className={`${s.onum} ${className}`} data-t={text}>{text}</span>
}

// Реакция «за» или «против»: картинка и число под ней
export function Reaction({ kind = 'like', count = 0, active = false, onClick, label, className = '' }) {
  return (
    <button
      className={`${s.reaction} ${active ? s.reactionOn : ''} ${className}`}
      type="button"
      aria-pressed={active}
      aria-label={label}
      onClick={onClick}
    >
      <img src={kind === 'like' ? likeUrl : dislikeUrl} alt="" />
      <OutlineNum>{count}</OutlineNum>
    </button>
  )
}

// Фото как на документ: белая рамка, тонкая чернильная обводка
export function PhotoTile({ face, size = 44, rotate = 0, tape = false, className = '' }) {
  const src = faceAt(face)
  return (
    <span className={`${s.photo} ${className}`} style={{ width: size, height: size, '--rot': `${rotate}deg` }}>
      {src ? <img src={src} alt="" /> : <i />}
      {tape && <span className={s.tape} aria-hidden />}
    </span>
  )
}

// Чернильные штрихи на бумаге: подчёркивания, звёздочки, стрелка. Живут за
// содержимым, чтобы лист не выглядел пустым прямоугольником.
export function PaperDoodles({ variant = 'poster', className = '' }) {
  const poster = variant === 'poster'
  return (
    <svg className={`${s.pdoodles} ${className}`} viewBox="0 0 362 560" preserveAspectRatio="xMinYMin meet" aria-hidden>
      {poster ? (
        <>
          <path d="M22 118c14-6 26-6 40 0s26 6 40 0 26-6 40 0" />
          <path d="M300 96l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" transform="rotate(12 300 108)" />
          <path className={s.pdThin} d="M330 150l6 6M336 150l-6 6" />
          <circle className={s.pdDot} cx="320" cy="238" r="3" />
          <path d="M40 388l4.6 9.3 10.3 1.5-7.4 7.2 1.7 10.2L40 411.4l-9.2 4.8 1.7-10.2-7.4-7.2 10.3-1.5z" transform="rotate(-14 40 402)" />
          <path className={s.pdThin} d="M296 420c-8-2-14 5-11 12s13 8 17 1-2-16-10-15-14 9-10 18 15 11 21 3" />
          <path className={s.pdThin} d="M60 480c10-7 20-7 30 0s20 7 30 0" />
          <text className={s.pdYear} x="24" y="536" transform="rotate(-6 24 536)">2026</text>
        </>
      ) : (
        <>
          <path className={s.pdThin} d="M328 40l6 6M334 40l-6 6" />
          <path d="M334 88l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" transform="rotate(14 334 100)" />
          <circle className={s.pdDot} cx="346" cy="136" r="2.5" />
        </>
      )}
    </svg>
  )
}

// Рукописная строка
export function Hand({ children, className = '', pink = false }) {
  return <span className={`${s.hand} ${pink ? s.handPink : ''} ${className}`}>{children}</span>
}

// Мелкая надпись документа вразрядку
export function Caption({ children, className = '' }) {
  return <span className={`${s.caption} ${className}`}>{children}</span>
}

// Кнопка как «позвать друзей» на хабе: 60px, радиус 22, набор вразрядку
export function Btn({ children, dark = false, ink = false, className = '', ...rest }) {
  return (
    <button className={`${s.btn} ${dark ? s.btnDark : ''} ${ink ? s.btnInk : ''} ${className}`} type="button" {...rest}>
      {children}
    </button>
  )
}

export function CloseX({ onClick, className = '' }) {
  return (
    <button className={`${s.x} ${className}`} type="button" onClick={onClick} aria-label="Закрыть">
      <img src={squareCloseUrl} alt="" />
    </button>
  )
}
