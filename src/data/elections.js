// Выборы президента школы.
// Две недели, реакции «за» и «против» каждому кандидату, выдвинуться может
// любой. Победитель год управляет оформлением школы.
//
// face — индекс фото в пуле школы (utils/faces.js): тот же снимок, что и в
// списке учеников. promise — обещание, единственное, что кандидат заполняет
// сам; на анкете оно написано от руки.

export const electionInfo = {
  duration: '2 недели',
  startsAt: '15 сентября',
  daysLeft: 13,
  endsAt: '22 сентября',
  electorate: 247,
  term: '2026/27'
}

export const candidates = [
  { id: 'masha', studentId: 3, face: 1, name: 'маша', promise: 'перенесу первую пару на два часа дня', likes: 300, dislikes: 46 },
  { id: 'pasha', studentId: 6, face: 2, name: 'паша', promise: 'кофейный автомат в каждом лифте', likes: 214, dislikes: 71 },
  { id: 'nastya', studentId: 11, face: 4, name: 'настя', promise: 'объявлю понедельник выходным', likes: 188, dislikes: 23 },
  { id: 'timur', studentId: 8, face: 3, name: 'тимур', promise: 'звонок заменю на трек по голосованию', likes: 97, dislikes: 58 }
]

// Ты — на случай самовыдвижения
export const meCandidate = {
  id: 'me',
  studentId: 'me',
  face: 0,
  name: 'иван',
  promise: '',
  likes: 0,
  dislikes: 0,
  isMe: true
}

// Оформление школы, которым управляет президент. Цвет — три точки на
// цветовом кольце: угол по часовой от верха (это же оттенок) и радиус 0…1.
export const presidentDefaults = {
  customName: 'спбгу 67',
  pinned: 'в понедельник не учимся!!!',
  colors: [
    { a: 292, r: 0.92 },
    { a: 322, r: 0.88 },
    { a: 346, r: 0.8 }
  ]
}

export function wheelColor({ a, r }) {
  const sat = Math.round(45 + 55 * r)
  const light = Math.round(72 - 26 * r)
  return `hsl(${Math.round(a)} ${sat}% ${light}%)`
}

// 1 день / 2 дня / 5 дней
export function plural(n, forms) {
  const mod100 = Math.abs(n) % 100
  const mod10 = mod100 % 10
  if (mod100 > 10 && mod100 < 20) return forms[2]
  if (mod10 > 1 && mod10 < 5) return forms[1]
  if (mod10 === 1) return forms[0]
  return forms[2]
}

export const daysWord = (n) => plural(n, ['день', 'дня', 'дней'])

// Места считаются по «за»; при равенстве выше тот, у кого меньше «против»
export function byLikes(list) {
  return [...list].sort((a, b) => b.likes - a.likes || a.dislikes - b.dislikes || a.name.localeCompare(b.name))
}

export function totalLikes(list) {
  return list.reduce((sum, c) => sum + c.likes, 0)
}
