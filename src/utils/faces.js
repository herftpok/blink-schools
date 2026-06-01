// Пул локальных фото-аватаров из src/assets/faces.
// Используются по порядку; когда заканчиваются — вызывающий показывает плейсхолдер.
const modules = import.meta.glob('../assets/faces/*.{jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default'
})

function num(path) {
  const m = path.match(/avatar(?:-(\d+))?\.\w+$/)
  return m && m[1] ? parseInt(m[1], 10) : 1
}

export const FACES = Object.entries(modules)
  .sort((a, b) => num(a[0]) - num(b[0]))
  .map(([, url]) => url)

// URL фото по индексу пула либо null, если фото закончились.
export function faceAt(index) {
  return index >= 0 && index < FACES.length ? FACES[index] : null
}
