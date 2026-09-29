import { useMemo, useState } from 'react'
import UniversityScreen from './components/UniversityScreen.jsx'
import WallScreen from './components/WallScreen.jsx'
import WallPicker from './components/WallPicker.jsx'
import QuestionsTab from './components/QuestionsTab.jsx'
import AnswerSheet from './components/AnswerSheet.jsx'
import ConfirmModal from './components/ConfirmModal.jsx'
import AskSheet from './components/AskSheet.jsx'
import { university, buildings, students, me, wallPostsByBuilding, wallUnread } from './data/mock.js'
import { useQuestions } from './hooks/useQuestions.js'

// Лента: отвеченные вопросы, вопросы тебе и твои вопросы. Стартуем на «студентах»,
// чтобы был виден розовый счётчик непрочитанных на вкладке «вопросы».
export default function QuestionsApp({ initialView = 'university', initialTab = 'students', initialAsk = false, initialAnswer = null, initialDelete = null, initialEmpty = false }) {
  const [view, setView] = useState(initialView)
  const [tab, setTab] = useState(initialTab)
  const [wallBuildingId, setWallBuildingId] = useState(null)
  const [unread, setUnread] = useState(wallUnread)
  const [askOpen, setAskOpen] = useState(initialAsk)
  const [replyId, setReplyId] = useState(initialAnswer)
  const [deleteId, setDeleteId] = useState(initialDelete) // вопрос, который удаляют
  const feed = useQuestions({ active: tab === 'questions', empty: initialEmpty })

  // Люди: ты и студенты школы. Фото — по позиции в общем списке, как на хабе.
  const fullList = useMemo(() => [me, ...students], [])
  const person = (id) => (id === 'me' ? me : fullList.find((st) => st.id === id) ?? me)
  const faceOf = (id) => fullList.findIndex((st) => st.id === id)

  const ask = (text, to) => { feed.ask(text, to); setAskOpen(false) }
  const answer = (qid, text) => { feed.answer(qid, text); setReplyId(null) }
  const remove = () => { feed.remove(deleteId); setDeleteId(null) }

  const wallBuilding = wallBuildingId ? buildings.find((b) => b.id === wallBuildingId) ?? buildings[0] : buildings[0]
  const markRead = (id) => setUnread((u) => (u[id] ? { ...u, [id]: 0 } : u))
  const pickWall = (id) => { setWallBuildingId(id); markRead(id); setView('wall') }
  const replying = replyId ? feed.byId(replyId) : null

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
          count: feed.visible.length,
          hot: feed.unreadCount,
          content: (
            <QuestionsTab
              questions={feed.visible}
              person={person}
              faceOf={faceOf}
              onReply={setReplyId} onDelete={setDeleteId}
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
      <ConfirmModal open={deleteId != null} text="удалить вопрос? он пропадёт у всех" confirmLabel="удалить" onConfirm={remove} onClose={() => setDeleteId(null)} />

      <AskSheet open={askOpen} students={students} faceOf={faceOf} onSubmit={ask} onClose={() => setAskOpen(false)} />

    </div>
  )
}
