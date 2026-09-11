import fire from '../assets/stickers/fire.png'
import star from '../assets/stickers/star.png'
import eyes from '../assets/stickers/eyes.png'
import gift from '../assets/stickers/gift.png'
import phone from '../assets/stickers/phone.png'
import gem from '../assets/stickers/gem.png'
import sputnik from '../assets/stickers/sputnik.png'

export const STICKERS = { fire, star, eyes, gift, phone, gem, sputnik }

// 3D-стикер: декоративный, без альтернативного текста.
export default function Sticker({ name, size = 72, style, className }) {
  const src = STICKERS[name]
  if (!src) return null
  return <img src={src} alt="" aria-hidden className={className} style={{ width: size, height: size, objectFit: 'contain', pointerEvents: 'none', ...style }} />
}
