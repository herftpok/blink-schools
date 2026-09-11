import venuePark from '../assets/venues/park.jpg'
import venueClub from '../assets/venues/club.jpg'
import venueBar from '../assets/venues/bar.jpg'
import venueSquare from '../assets/venues/square.jpg'
import venueRooftop from '../assets/venues/rooftop.jpg'
import venueCafe from '../assets/venues/cafe.jpg'

export const university = {
  shortName: 'СПбГУ',
  fullName: 'Санкт-Петербургский государственный университет',
  city: 'санкт-петербург',
  logoBg: 'linear-gradient(135deg, #1e3a8a 0%, #0f1e4d 100%)',
  logoMark: 'У'
}

// short — короткое название корпуса в локативе (для подписи «в …»)
// distance — расстояние до пользователя в метрах. У того корпуса, где пользователь
// сейчас находится (youArePresent), distance = 0.
export const buildings = [
  {
    id: 'math-mech',
    members: 200,
    faculty: 'Мат-мех',
    short: 'мат-мехе',
    address: 'Университетский пр., 28, Петергоф',
    distance: 27000,
    youArePresent: false
  },
  {
    id: 'main',
    members: 170,
    faculty: 'Главное здание',
    short: 'главном',
    address: 'Университетская наб., 7–9',
    distance: 4500,
    youArePresent: false
  },
  {
    id: 'eastern',
    members: 95,
    faculty: 'Восточный факультет',
    short: 'восточном',
    address: 'Университетская наб., 11',
    distance: 4800,
    youArePresent: false
  },
  {
    id: 'econ',
    members: 150,
    faculty: 'Экономический факультет',
    short: 'экономе',
    address: 'ул. Чайковского, 62',
    distance: 0,
    youArePresent: true
  },
  {
    id: 'bio',
    members: 110,
    faculty: 'Биологический факультет',
    short: 'биофаке',
    address: 'Ораниенбаумское шоссе, 2, Петергоф',
    distance: 25000,
    youArePresent: false
  }
]

const av = (hue, hue2) =>
  `linear-gradient(135deg, hsl(${hue} 70% 55%) 0%, hsl(${hue2} 70% 35%) 100%)`

// Цвет числа старсов (геймификация): золото / нейтральный / бронза.
export function starColor(stars) {
  if (stars >= 12) return '#FAFF69'
  if (stars <= 10) return '#FFB269'
  return 'rgba(255, 255, 255, 0.85)'
}

// Наблюдатель — сам пользователь. Прямо сейчас находится на экономе.
export const me = {
  id: 'me',
  name: 'иван',
  friends: 25,
  stars: 14,
  at: 'econ',
  state: 'me',
  avatar: av(265, 215),
  initial: 'и'
}

// Именованные студенты. Все в состоянии «добавить» (без друзей/pending).
const namedStudents = [
  { id: 3,  name: 'маша',      friends: 25, stars: 12, at: 'main',      state: 'add', avatar: av(330, 290), initial: 'м' },
  { id: 6,  name: 'паша',      friends: 25, stars: 15, at: 'eastern',   state: 'add', avatar: av(280, 320), initial: 'п' },
  { id: 8,  name: 'тимур',     friends: 25, stars: 9,  at: 'math-mech', state: 'add', avatar: av(100, 140), initial: 'т' },
  { id: 11, name: 'настя',     friends: 25, stars: 13, at: 'bio',       state: 'add', avatar: av(80,  50),  initial: 'н' },
  { id: 1,  name: 'витёк',     friends: 25, stars: 11, at: 'math-mech', state: 'add', avatar: av(20,  350), initial: 'в' },
  { id: 2,  name: 'александр', friends: 25, stars: 10, at: 'math-mech', state: 'add', avatar: av(210, 260), initial: 'а' },
  { id: 4,  name: 'кирилл',    friends: 25, stars: 0,  at: 'math-mech', state: 'add', avatar: av(160, 200), initial: 'к' },
  { id: 5,  name: 'даша',      friends: 25, stars: 8,  at: null,        state: 'add', avatar: av(40,  10),  initial: 'д' },
  { id: 7,  name: 'лена',      friends: 25, stars: 0,  at: null,        state: 'add', avatar: av(180, 220), initial: 'л' },
  { id: 9,  name: 'оля',       friends: 25, stars: 12, at: 'econ',      state: 'add', avatar: av(310, 0),   initial: 'о' },
  { id: 10, name: 'артём',     friends: 25, stars: 10, at: 'main',      state: 'add', avatar: av(220, 180), initial: 'а' },
  { id: 12, name: 'игорь',     friends: 25, stars: 0,  at: null,        state: 'add', avatar: av(0,   340), initial: 'и' }
]

const NAMES = [
  'маша','даша','лена','настя','оля','катя','лиза','аня','поля','варя',
  'вера','юля','света','кира','ника','соня','рита','ася','тая','зина',
  'галя','инна','лиля','наташа','нина','оксана','полина','тоня','эля','яна',
  'алина','ангелина','рая','ульяна','фая','альбина','злата','маргоша','саша','влада',
  'витёк','александр','кирилл','паша','тимур','артём','игорь','миша','женя','петя',
  'дима','гриша','антон','рома','серёжа','костя','лёха','толя','ваня','олег',
  'илья','макс','влад','гоша','боря','федя','кеша','юра','валера','саня',
  'лёша','коля','глеб','степан','марк','давид','матвей','назар','родион','тёма',
  'захар','платон','герман','лука','остап','артур','тимоха','санёк','витя','шурик'
]

// Детерминированный псевдослучайный — чтобы данные не прыгали между рендерами
function rnd(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function makeFiller(startId, count, at) {
  const out = []
  for (let i = 0; i < count; i++) {
    const seed = startId + i
    const name = NAMES[Math.floor(rnd(seed * 1.7 + 0.3) * NAMES.length)]
    const friends = 4 + Math.floor(rnd(seed + 9.1) * 240)
    const sr = rnd(seed * 2.1 + 3)
    const stars = sr < 0.35 ? 0 : Math.floor(sr * 16)
    const h1 = Math.floor(rnd(seed * 0.7 + 1) * 360)
    const h2 = (h1 + 80 + Math.floor(rnd(seed * 1.3 + 5) * 140)) % 360
    out.push({
      id: seed,
      name,
      friends,
      stars,
      at,
      state: 'add',
      avatar: av(h1, h2),
      initial: name[0]
    })
  }
  return out
}

// state: 'add' | 'pending' | 'friend' | 'me'
// at: id корпуса, где студент сейчас находится; null = не в универе.
// Итого с me: math-mech 52 + main 84 + eastern 16 + econ 31 + bio 17 + null 47 = 247
export const students = [
  ...namedStudents,
  ...makeFiller(1000, 48, 'math-mech'),
  ...makeFiller(2000, 82, 'main'),
  ...makeFiller(3000, 15, 'eastern'),
  ...makeFiller(4000, 29, 'econ'),
  ...makeFiller(5000, 16, 'bio'),
  ...makeFiller(6000, 44, null)
]

// Непрочитанные посты на стене корпуса (для списка «стены корпусов»).
export const wallUnread = {
  'math-mech': 2,
  main: 1,
  eastern: 1,
  econ: 2,
  bio: 1
}

// У каждого корпуса своя стена со своими постами.
export const wallPostsByBuilding = {
  'math-mech': [
    {
      id: 'mm1',
      anon: false,
      author: { name: 'витёк', avatar: av(20, 350), initial: 'в' },
      time: 'сегодня, 14:23',
      text: 'в 405-й аудитории забыли проектор включить, лекция идёт уже 20 минут в темноте 💀 кто-нибудь помогите Семёну Андреевичу',
      reactions: { heart: 24, cat: 41, smiley: 6, flower: 12 },
      myReaction: 'cat',
      comments: [
        { id: 'mm1c1', author: { name: 'паша', avatar: av(280, 320), initial: 'п' }, text: 'я в соседней — щас зайду включу', time: '14:31' },
        { id: 'mm1c2', author: { name: 'оля', avatar: av(310, 0), initial: 'о' }, text: 'семён андреевич — топ, лучшая лекция', time: '14:42' }
      ]
    },
    {
      id: 'mm2',
      anon: false,
      author: { name: 'маша', avatar: av(330, 290), initial: 'м' },
      time: 'сегодня, 11:47',
      text: 'кто на матане у Иванова — он сегодня в духе, отпускает после первой пары если решите задачу со звёздочкой',
      reactions: { heart: 300, cat: 46, smiley: 29, flower: 7 },
      myReaction: 'heart',
      comments: [
        { id: 'mm2c1', author: { name: 'тимур', avatar: av(100, 140), initial: 'т' }, text: 'вчера так же было, ушёл в 10:30', time: '11:55' },
        { id: 'mm2c2', author: { name: 'кирилл', avatar: av(160, 200), initial: 'к' }, text: 'а задачу скиньте пж', time: '12:02' },
        { id: 'mm2c3', author: { name: 'александр', avatar: av(210, 260), initial: 'а' }, text: 'там через интеграл проще, не парься', time: '12:10' }
      ]
    }
  ],
  main: [
    {
      id: 'mn1',
      anon: false,
      author: { name: 'артём', avatar: av(220, 180), initial: 'а' },
      time: 'сегодня, 13:05',
      text: 'в гардеробе опять очередь на весь холл, приходите за курткой пораньше 🧥',
      reactions: { heart: 18, cat: 9, smiley: 22, flower: 3 },
      myReaction: null,
      comments: [
        { id: 'mn1c1', author: { name: 'лена', avatar: av(180, 220), initial: 'л' }, text: 'я просто куртку с собой на пару беру', time: '13:20' }
      ]
    },
    {
      id: 'mn2',
      anon: true,
      time: 'сегодня, 9:40',
      text: 'лифт в правом крыле снова застрял между 2 и 3, идите по лестнице',
      reactions: { cat: 14, smiley: 5 },
      myReaction: null,
      comments: []
    }
  ],
  eastern: [
    {
      id: 'es1',
      anon: false,
      author: { name: 'паша', avatar: av(280, 320), initial: 'п' },
      time: 'сегодня, 12:30',
      text: 'нашёл клуб разговорного японского по средам в 312, носители приходят 🇯🇵 заходите',
      reactions: { heart: 41, cat: 7, smiley: 19, flower: 11 },
      myReaction: 'heart',
      comments: [
        { id: 'es1c1', author: { name: 'настя', avatar: av(80, 50), initial: 'н' }, text: 'оо давно искала, спасибо!', time: '12:48' },
        { id: 'es1c2', author: { name: 'игорь', avatar: av(0, 340), initial: 'и' }, text: 'а по корейскому есть такое?', time: '13:01' }
      ]
    }
  ],
  econ: [
    {
      id: 'ec1',
      anon: false,
      author: { name: 'оля', avatar: av(310, 0), initial: 'о' },
      time: 'сегодня, 15:10',
      text: 'в столовой опять очередь до выхода, берите кофе из автомата на 2 этаже — там пусто ☕',
      reactions: { heart: 12, cat: 28, smiley: 33, flower: 4 },
      myReaction: 'smiley',
      comments: [
        { id: 'ec1c1', author: { name: 'даша', avatar: av(40, 10), initial: 'д' }, text: 'и булочки там свежее', time: '15:22' }
      ]
    },
    {
      id: 'ec2',
      anon: false,
      author: { name: 'игорь', avatar: av(0, 340), initial: 'и' },
      time: 'вчера, 18:02',
      text: 'кто шарит за эконометрику — нужна помощь с лабой до пятницы, скинемся на пиццу 🍕',
      reactions: { heart: 7, smiley: 9 },
      myReaction: null,
      comments: [
        { id: 'ec2c1', author: { name: 'артём', avatar: av(220, 180), initial: 'а' }, text: 'я помогу, пиши в лс', time: '18:30' }
      ]
    }
  ],
  bio: [
    {
      id: 'bi1',
      anon: false,
      author: { name: 'настя', avatar: av(80, 50), initial: 'н' },
      time: 'сегодня, 10:15',
      text: 'в лаборатории на 1 этаже опять сбежал хомяк из вивария 🐹 если увидите — ловите аккуратно',
      reactions: { heart: 56, cat: 18, smiley: 41, flower: 9 },
      myReaction: 'heart',
      comments: [
        { id: 'bi1c1', author: { name: 'маша', avatar: av(330, 290), initial: 'м' }, text: 'видела его у кофемашины 😭', time: '10:30' },
        { id: 'bi1c2', author: { name: 'тимур', avatar: av(100, 140), initial: 'т' }, text: 'это уже третий раз за месяц', time: '10:41' }
      ]
    }
  ]
}

// Лайв-чаты — создаются автоматически, когда вечером/ночью в точке города
// скапливается много людей (значит там событие). Список виден всем в городе,
// но читать/писать и видеть, кто внутри, можно только находясь на месте.
// here[].face — индекс в пуле фото; youHere — находишься ли ты там сейчас.
export const liveChats = [
  {
    id: 'park',
    place: 'туса в парке',
    area: 'таврический сад',
    distance: 0,
    youHere: true,
    people: 12,
    endsIn: '01:15:12',
    formedAgo: 'собралось 40 мин назад',
    here: [
      { id: 1, name: 'лена', initial: 'л', face: 3 },
      { id: 2, name: 'тюбик', initial: 'т', face: 8 },
      { id: 3, name: 'васян', initial: 'в', face: 11 },
      { id: 4, name: 'татьяныч', initial: 'т', face: 14 },
      { id: 5, name: 'пётр', initial: 'п', face: 5 },
      { id: 6, name: 'кира', initial: 'к', face: 13 }
    ],
    messages: [
      { id: 'lm1', anon: false, author: { name: 'лена', avatar: av(20, 350), initial: 'л' }, text: 'мы у фонтана, тащите плед и колонку 🎶', reactions: { heart: 18, smiley: 5 }, myReaction: null, comments: [] },
      { id: 'lm2', anon: false, author: { name: 'тюбик', avatar: av(310, 0), initial: 'т' }, text: 'васян уже придумал во что играем, го быстрее', reactions: { heart: 9, flower: 4 }, myReaction: 'heart', comments: [] },
      { id: 'lm3', anon: false, author: { name: 'татьяныч', avatar: av(100, 140), initial: 'т' }, text: 'кто-нибудь захватит ещё стаканчики?', reactions: {}, myReaction: null, comments: [] },
      { id: 'lm4', anon: false, author: { name: 'иван', avatar: 'linear-gradient(135deg, hsl(150 70% 55%), hsl(180 70% 35%))', initial: 'и' }, text: 'я рядом, минут через пять буду', reactions: { smiley: 7 }, myReaction: null, comments: [] },
      { id: 'lm5', anon: false, author: { name: 'пётр', avatar: av(80, 50), initial: 'п' }, text: 'тут так атмосферно вечером 🌳', reactions: { heart: 14, cat: 3, smiley: 8 }, myReaction: 'heart', comments: [] }
    ]
  },
  {
    id: 'rubinshteina',
    place: 'двор на рубинштейна',
    area: 'ул. рубинштейна, 23',
    distance: 1200,
    youHere: false,
    people: 64,
    endsIn: '00:42:03',
    formedAgo: 'собралось 1 ч назад',
    here: [],
    messages: []
  },
  {
    id: 'sennaya',
    place: 'сенная площадь',
    area: 'сенная пл.',
    distance: 2600,
    youHere: false,
    people: 37,
    endsIn: '00:18:44',
    formedAgo: 'собралось 25 мин назад',
    here: [],
    messages: []
  }
]

// Лайв-лента сторисов с мест событий. Смотреть может кто угодно.
// face — индекс фото в пуле (контент сториса-заглушки).
// type — тип места (для иконки), address — адрес публикации, img — превью места
export const liveStories = [
  { id: 's1', name: 'лена',  face: 3,  type: 'park',    address: 'таврический сад', img: venuePark,    time: '2 мин назад' },
  { id: 's2', name: 'тюбик', face: 8,  type: 'club',    address: 'ул. рубинштейна', img: venueClub,    time: '7 мин назад' },
  { id: 's3', name: 'катя',  face: 17, type: 'bar',     address: 'ул. рубинштейна', img: venueBar,     time: '12 мин назад' },
  { id: 's4', name: 'миша',  face: 21, type: 'square',  address: 'сенная площадь',  img: venueSquare,  time: '19 мин назад' },
  { id: 's5', name: 'соня',  face: 25, type: 'rooftop', address: 'наб. фонтанки',   img: venueRooftop, time: '26 мин назад' },
  { id: 's6', name: 'аня',   face: 30, type: 'cafe',    address: 'ул. жуковского',  img: venueCafe,    time: '34 мин назад' }
]
