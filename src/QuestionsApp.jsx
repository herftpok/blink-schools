import { useEffect, useMemo, useState } from 'react'
import UniversityScreen from './components/UniversityScreen.jsx'
import WallScreen from './components/WallScreen.jsx'
import WallPicker from './components/WallPicker.jsx'
import QuestionsTab from './components/QuestionsTab.jsx'
import AnswerSheet from './components/AnswerSheet.jsx'
import ReportModal from './components/ReportModal.jsx'
import AskSheet from './components/AskSheet.jsx'
import { university, buildings, students, me, wallPostsByBuilding, wallUnread } from './data/mock.js'
import { feedSeed, askedSeed, incomingAnswer } from './data/questions.js'

// Одна лента: вопросы тебе, твой вопрос маше и вопросы другим.
export default function QuestionsApp({ initialView = 'university', initialTab = 'questions', initialAsk = false, initialAnswer = null, initialReport = null, initialEmpty = false }) {
  const [view, setView] = useState(initialView)
  const [tab, setTab] = useState(initialTab)
  const [wallBuildingId, setWallBuildingId] = useState(null)
  const [unread, setUnread] = useState(wallUnread)
  const [askOpen, setAskOpen] = useState(initialAsk)
  const [replyId, setReplyId] = useState(initialAnswer)
  const [reportId, setReportId] = useState(initialReport) // вопрос, на который жалуются

  const [questions, setQuestions] = useState(initialEmpty ? [] : feedSeed)

  // Люди: ты и студенты школы. Фото — по позиции в общем списке, как на хабе.
  const fullList = useMemo(() => [me, ...students], [])
  const person = (id) => (id === 'me' ? me : fullList.find((st) => st.id === id) ?? me)
  const faceOf = (id) => fullList.findIndex((st) => st.id === id)

  // Ответ на твой вопрос приходит через несколько секунд
  useEffect(() => {
    const t = setTimeout(() => {
      setQuestions((prev) => prev.map((q) => (q.id === askedSeed.id && !q.answer ? { ...q, answer: incomingAnswer } : q)))
    }, 6000)
    return () => clearTimeout(t)
  }, [])

  const forMe = questions.filter((q) => q.to === 'me' && !q.answer).length

  const STICKERS = ['star', 'fire', 'gem', 'eyes', 'gift', 'phone', 'sputnik']
  const ask = (text, to) => {
    const sticker = STICKERS[Math.floor(Math.random() * STICKERS.length)]
    setQuestions((prev) => [{ id: `q${Date.now()}`, to, text, time: 'только что', mine: true, sticker, answer: null }, ...prev])
    setAskOpen(false)
  }

  const answer = (qid, text) => {
    setQuestions((prev) => prev.map((q) => (q.id === qid ? { ...q, answer: { text, time: 'только что' } } : q)))
    setReplyId(null)
  }


  const wallBuilding = wallBuildingId ? buildings.find((b) => b.id === wallBuildingId) ?? buildings[0] : buildings[0]
  const markRead = (id) => setUnread((u) => (u[id] ? { ...u, [id]: 0 } : u))
  const pickWall = (id) => { setWallBuildingId(id); markRead(id); setView('wall') }
  const replying = questions.find((q) => q.id === replyId) ?? null

  return (
    <div className="phone-frame">
      <UniversityScreen
        university={university}
        building={null}
        buildings={buildings}
        students={students}
        me={me}
        feature={{
          id: 'questions',
          label: 'вопросы',
          tab,
          onTab: setTab,
          count: questions.length,
          hot: forMe,
          content: (
            <QuestionsTab
              questions={questions}
              person={person}
              faceOf={faceOf}
              onReply={setReplyId} onReport={setReportId}
              onAsk={() => setAskOpen(true)}
            />
          )
        }}
        onClose={() => alert('закрыть экран университета')}
        onOpenWall={() => setView('wallPicker')}
      />

      {(view === 'wallPicker' || view === 'wall') && (
        <WallPicker buildings={buildings} onPick={pickWall} onBack={() => setView('university')} />
      )}
      {view === 'wall' && (
        <WallScreen university={university} building={wallBuilding} posts={wallPostsByBuilding[wallBuilding.id] ?? []} canPost={me.at === wallBuilding.id} onBack={() => setView('wallPicker')} />
      )}

      <AnswerSheet q={replying} open={!!replying} onSubmit={answer} onClose={() => setReplyId(null)} />
      <ReportModal open={reportId != null} what="вопрос" onConfirm={() => setReportId(null)} onClose={() => setReportId(null)} />

      <AskSheet open={askOpen} students={students} faceOf={faceOf} onSubmit={ask} onClose={() => setAskOpen(false)} />

    </div>
  )
}
