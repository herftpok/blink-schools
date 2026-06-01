import { useState } from 'react'
import { faceAt } from '../utils/faces.js'
import s from './AvatarStack.module.css'

function Tile({ index, className }) {
  const [broken, setBroken] = useState(false)
  const src = faceAt(index)
  if (src == null || broken) {
    return <span className={`${className} ${s.fallback}`} />
  }
  return (
    <img
      className={className}
      src={src}
      alt=""
      loading="lazy"
      onError={() => setBroken(true)}
    />
  )
}

// Композиция из 1–3 фото участников. indices — позиции в пуле фото;
// если фото нет — тайл становится градиентным плейсхолдером.
export default function AvatarStack({ indices }) {
  const list = indices.slice(0, 3)
  const n = list.length
  return (
    <span className={`${s.stack} ${s['n' + n]}`} aria-hidden>
      {list.map((index, i) => (
        <Tile key={i} index={index} className={`${s.tile} ${s['tile' + i]}`} />
      ))}
    </span>
  )
}
