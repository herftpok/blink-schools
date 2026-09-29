import { useEffect, useState } from 'react'
import { feedSeed, askedSeed, incomingAnswer, visibleQuestions } from '../data/questions.js'

const STICKERS = ['star', 'fire', 'gem', 'eyes', 'gift', 'phone', 'sputnik']

// Состояние ленты вопросов для прототипов: видимые вопросы, непрочитанные,
// спросить / ответить / удалить. active — открыта ли сейчас вкладка «вопросы».
export function useQuestions({ active, empty = false }) {
  const [questions, setQuestions] = useState(empty ? [] : feedSeed)

  // Ответ на твой вопрос приходит через несколько секунд и становится непрочитанным
  useEffect(() => {
    const t = setTimeout(() => {
      setQuestions((prev) => prev.map((q) => (q.id === askedSeed.id && !q.answer ? { ...q, answer: incomingAnswer, unread: true } : q)))
    }, 6000)
    return () => clearTimeout(t)
  }, [])

  const visible = visibleQuestions(questions)
  const unreadCount = visible.filter((q) => q.unread).length

  // Пока вкладка открыта, всё в ленте считается прочитанным
  useEffect(() => {
    if (active && unreadCount > 0) setQuestions((prev) => prev.map((q) => (q.unread ? { ...q, unread: false } : q)))
  }, [active, unreadCount])

  const ask = (text, to) => {
    const sticker = STICKERS[Math.floor(Math.random() * STICKERS.length)]
    setQuestions((prev) => [{ id: `q${Date.now()}`, to, text, time: 'только что', mine: true, sticker, answer: null }, ...prev])
  }
  const answer = (qid, text) => setQuestions((prev) => prev.map((q) => (q.id === qid ? { ...q, answer: { text, time: 'только что' } } : q)))
  const remove = (qid) => setQuestions((prev) => prev.filter((q) => q.id !== qid))
  const byId = (qid) => questions.find((q) => q.id === qid) ?? null

  return { visible, unreadCount, ask, answer, remove, byId }
}
