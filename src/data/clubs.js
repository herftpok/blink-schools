// Клубы внутри школы. В универе это факультеты и кружки по интересам,
// в школе — просто клубы. Клуб создаёт любой участник, вступить может любой.
// Чат клуба видят только участники.

import squareUrl from '../assets/venues/square.jpg'
import rooftopUrl from '../assets/venues/rooftop.jpg'
import cafeUrl from '../assets/venues/cafe.jpg'
import parkUrl from '../assets/venues/park.jpg'
import barUrl from '../assets/venues/bar.jpg'
import clubUrl from '../assets/venues/club.jpg'

// members — id студентов из mock.js (именные 1–12 и заполнители 1000+, 2000+ …)
const range = (from, n) => Array.from({ length: n }, (_, i) => from + i)

export const clubsSeed = [
  { id: 'matmeh', createdBy: 8, name: 'мат-мех', photo: squareUrl, members: [8, 1, 4, 9, 12, ...range(1000, 14)] },
  { id: 'econ', createdBy: 3, name: 'экономический', photo: rooftopUrl, members: [3, 2, 5, 10, ...range(4000, 11)] },
  { id: 'east', createdBy: 6, name: 'восточный', photo: cafeUrl, members: [6, 7, ...range(3000, 6)] },
  { id: 'volley', createdBy: 11, name: 'волейбол по вторникам', photo: parkUrl, members: [11, 1, 5, 2001, 2002, 6003] },
  { id: 'cyber', createdBy: 2, name: 'киберспорт', photo: barUrl, members: [8, 2, 2010, 6000] },
  { id: 'cinema', createdBy: 3, name: 'кино по четвергам', photo: clubUrl, members: [3, 11, 2020] }
]

// Сообщения чатов клубов (by — id участника)
export const clubChatsSeed = {
  matmeh: [
    { id: 'c1', by: 8, text: 'кто идёт на консультацию по матану в среду?' },
    { id: 'c2', by: 1, text: 'я, если её не перенесут опять' },
    { id: 'c3', by: 4, text: 'перенесли. на четверг, 16:00, ауд. 305' },
    { id: 'c4', by: 8, text: 'спасибо, тогда встречаемся у входа в 15:40' }
  ],
  econ: [
    { id: 'c5', by: 3, text: 'скидываю конспект по макро, кому нужно' },
    { id: 'c6', by: 2, text: 'нужно всем' },
    { id: 'c7', by: 10, text: 'а семинар завтра в 9:30 или в 11:00?' },
    { id: 'c8', by: 3, text: 'в 11:00, первую пару отменили' }
  ],
  east: [
    { id: 'c9', by: 6, text: 'на кафедре открыли запись на стажировку в токио' },
    { id: 'c10', by: 7, text: 'сколько мест?' },
    { id: 'c11', by: 6, text: 'три. дедлайн в пятницу' }
  ],
  volley: [
    { id: 'c12', by: 11, text: 'во вторник зал наш с 19:00' },
    { id: 'c13', by: 5, text: 'мяч у меня' }
  ],
  cyber: [
    { id: 'c14', by: 8, text: 'турнир по cs в субботу, собираем пятёрку' }
  ],
  cinema: [
    { id: 'c15', by: 3, text: 'в четверг «начало», аудитория 12, 19:00' },
    { id: 'c16', by: 11, text: 'принесу попкорн' }
  ]
}

export function plural(n, forms) {
  const mod100 = Math.abs(n) % 100
  const mod10 = mod100 % 10
  if (mod100 > 10 && mod100 < 20) return forms[2]
  if (mod10 > 1 && mod10 < 5) return forms[1]
  if (mod10 === 1) return forms[0]
  return forms[2]
}

export const membersWord = (n) => plural(n, ['участник', 'участника', 'участников'])

export const CLUB_NAME_MAX = 24
