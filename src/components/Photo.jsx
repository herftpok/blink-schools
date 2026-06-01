import { useState } from 'react'
import { faceAt } from '../utils/faces.js'

// Накладывается поверх контейнера-аватара (который рендерит инициал как фолбэк).
// index — позиция в пуле локальных фото. Если фото нет (пул кончился) или
// картинка не загрузилась — рендерит null, остаётся инициал на градиенте.
export default function Photo({ index }) {
  const [broken, setBroken] = useState(false)
  const src = faceAt(index)
  if (src == null || broken) return null
  return (
    <img
      className="avatar-photo"
      src={src}
      alt=""
      loading="lazy"
      onError={() => setBroken(true)}
    />
  )
}
