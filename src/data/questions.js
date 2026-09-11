// Анонимные вопросы внутри школы. Вопрос всегда анонимный и всегда адресован
// одному участнику (to — id студента или 'me'). Ответить может только он.
// answer: { text, time, likes } | null.

export const questionsSeed = [
  { id: 'q1', to: 3, text: 'правда что ты поступила без экзаменов?', time: '12 мин', sticker: 'gem',
    answer: { text: 'олимпиада, да. но пересдала бы всё ради общаги поближе', time: '5 мин', likes: 14 } },
  { id: 'q2', to: 8, text: 'признайся, бот с дедлайнами уже написан?', time: '40 мин', sticker: 'fire',
    answer: { text: 'написан. дедлайн его запуска я пропустил', time: '30 мин', likes: 27 } },
  { id: 'q3', to: 6, text: 'кофейный автомат в лифте — это серьёзно или ты просто хочешь кофе?', time: '1 ч', sticker: null, answer: null },
  { id: 'q4', to: 11, text: 'в каких наушниках ты сидишь на лекциях? выглядят дорого', time: '2 ч', sticker: 'star',
    answer: { text: 'с алиэкспресса за 900 рублей, но с наклейкой', time: '1 ч', likes: 32 } },
  { id: 'q5', to: 1, text: 'ты правда ходишь на первую пару в понедельник?', time: '3 ч', sticker: 'eyes',
    answer: { text: 'один. в пустой аудитории. препод тоже удивляется', time: '2 ч', likes: 21 } },
  { id: 'q6', to: 2, text: 'у тебя можно списать матан, только честно', time: '5 ч', sticker: null,
    answer: { text: 'можно, но беру пирожками', time: '4 ч', likes: 11 } },
  { id: 'q7', to: 3, text: 'какой у тебя любимый мем про универ?', time: 'вчера', sticker: 'phone', answer: null }
]

// Вопросы, адресованные тебе — для режима «тебе задали»
export const forMeSeed = [
  { id: 'm1', to: 'me', text: 'зачем тебе пирожки по пятницам?', time: '7 мин', sticker: 'gift', answer: null },
  { id: 'm2', to: 'me', text: 'ты правда был в универе 242 раза?', time: '1 ч', sticker: 'sputnik', answer: null }
]

// Твой вопрос — для режима «ты спросил»
export const askedSeed = { id: 'a1', to: 3, text: 'ты пойдёшь на сходку в четверг?', time: 'только что', mine: true, sticker: 'star', answer: null }

// Ответ, который «приходит» на твой вопрос через несколько секунд
export const incomingAnswer = { text: 'пойду, если ты принесёшь те самые пирожки', time: 'только что', likes: 0 }

// Цвета стены: у каждой карточки свой цвет свечения и градиент экрана
export const CARD_COLORS = ['#FF75E1', '#FF5C7A', '#3DC9FF', '#5FF780', '#FFB65C', '#8A5CFF']

export const CARD_GRADIENTS = [
  'linear-gradient(135deg, #FF75E1 0%, #8A5CFF 100%)',
  'linear-gradient(135deg, #FF8A5C 0%, #FF3D7F 100%)',
  'linear-gradient(135deg, #3DC9FF 0%, #6A5CFF 100%)',
  'linear-gradient(135deg, #5FF780 0%, #16A88E 100%)',
  'linear-gradient(135deg, #FFB65C 0%, #FF5CA8 100%)',
  'linear-gradient(135deg, #8A5CFF 0%, #2E1A78 100%)'
]

function hash(id) {
  let h = 0
  for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) % 9973
  return h
}

export const colorFor = (id) => CARD_COLORS[hash(id) % CARD_COLORS.length]
export const gradientFor = (id) => CARD_GRADIENTS[hash(id) % CARD_GRADIENTS.length]

// Единая лента: сначала неотвеченные вопросы тебе, потом всё остальное
export const feedSeed = [...forMeSeed, askedSeed, ...questionsSeed]

export function plural(n, forms) {
  const mod100 = Math.abs(n) % 100
  const mod10 = mod100 % 10
  if (mod100 > 10 && mod100 < 20) return forms[2]
  if (mod10 > 1 && mod10 < 5) return forms[1]
  if (mod10 === 1) return forms[0]
  return forms[2]
}

// «12 мин» → «12 мин назад»; «только что» и даты («вчера») не трогаем
export const ago = (t) => (/\d/.test(t) ? `${t} назад` : t)

export const questionsWord = (n) => plural(n, ['вопрос', 'вопроса', 'вопросов'])

// Неотвеченные вопросы тебе — всегда вверху, затем остальные по времени
export function sortQuestions(list) {
  const mineOpen = list.filter((q) => q.to === 'me' && !q.answer)
  const rest = list.filter((q) => !(q.to === 'me' && !q.answer))
  return [...mineOpen, ...rest]
}
