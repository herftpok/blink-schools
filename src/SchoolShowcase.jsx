import UniversityScreen from './components/UniversityScreen.jsx'
import WallScreen from './components/WallScreen.jsx'
import WallPicker from './components/WallPicker.jsx'
import CampusSheet from './components/CampusSheet.jsx'
import InfoSheet from './components/InfoSheet.jsx'
import NoticeSheet from './components/NoticeSheet.jsx'
import CommentsScreen from './components/CommentsScreen.jsx'
import { university, buildings, students, me, wallPostsByBuilding, wallUnread } from './data/mock.js'
import s from './SchoolShowcase.module.css'

const noop = () => {}
const econ = buildings.find((b) => b.id === 'econ')
const mathmech = buildings.find((b) => b.id === 'math-mech')

// счётчики «сколько сейчас в корпусе» (как считает UniversityScreen)
const fullList = [me, ...students]
const studentsByBuilding = {}
for (const b of buildings) studentsByBuilding[b.id] = 0
for (const st of fullList) if (st.at && studentsByBuilding[st.at] != null) studentsByBuilding[st.at] += 1

const commentedPost = (wallPostsByBuilding['math-mech'] || []).find((p) => (p.comments || []).length > 0)

function Frame({ label, children }) {
  return (
    <div className={s.cell}>
      <div className={s.frameBox}>
        <div className={s.frameScale}>
          <div className="phone-frame">{children}</div>
        </div>
      </div>
      <div className={s.label}>{label}</div>
    </div>
  )
}

export default function SchoolShowcase() {
  return (
    <div className={s.showcase}>
      <div className={s.head}>
        <h1 className={s.title}>школы — все экраны</h1>
        <p className={s.subtitle}>развёртка для дизайнера · 9 экранов</p>
      </div>

      <div className={s.grid}>
        <Frame label="универ · все корпусы">
          <UniversityScreen
            university={university}
            building={null}
            buildings={buildings}
            students={students}
            me={me}
            wallUnreadTotal={5}
            wallUnread={wallUnread}
            onBuildingChange={noop}
            onClose={noop}
            onOpenWall={noop}
          />
        </Frame>

        <Frame label="универ · выбран корпус">
          <UniversityScreen
            university={university}
            building={econ}
            buildings={buildings}
            students={students}
            me={me}
            wallUnreadTotal={5}
            wallUnread={wallUnread}
            onBuildingChange={noop}
            onClose={noop}
            onOpenWall={noop}
          />
        </Frame>

        <Frame label="выбор корпуса">
          <UniversityScreen
            university={university}
            building={null}
            buildings={buildings}
            students={students}
            me={me}
            wallUnread={wallUnread}
            onBuildingChange={noop}
            onClose={noop}
            onOpenWall={noop}
          />
          <CampusSheet
            open
            current={null}
            buildings={buildings}
            studentsByBuilding={studentsByBuilding}
            totalStudents={fullList.length}
            onClose={noop}
            onSelect={noop}
          />
        </Frame>

        <Frame label="это как?">
          <UniversityScreen
            university={university}
            building={econ}
            buildings={buildings}
            students={students}
            me={me}
            wallUnread={wallUnread}
            onBuildingChange={noop}
            onClose={noop}
            onOpenWall={noop}
          />
          <InfoSheet open showMe onToggleShowMe={noop} onClose={noop} />
        </Frame>

        <Frame label="стена универа · список">
          <WallPicker
            buildings={buildings}
            wallsByBuilding={wallPostsByBuilding}
            unread={wallUnread}
            onPick={noop}
            onBack={noop}
          />
        </Frame>

        <Frame label="стена корпуса · можно писать">
          <WallScreen
            university={university}
            building={econ}
            posts={wallPostsByBuilding['econ'] || []}
            canPost
            onBack={noop}
          />
        </Frame>

        <Frame label="стена корпуса · нельзя писать">
          <WallScreen
            university={university}
            building={mathmech}
            posts={wallPostsByBuilding['math-mech'] || []}
            canPost={false}
            onBack={noop}
          />
        </Frame>

        <Frame label="обсуждение поста">
          {commentedPost && (
            <CommentsScreen post={commentedPost} onBack={noop} onAddComment={noop} />
          )}
        </Frame>

        <Frame label="почему нельзя писать">
          <WallScreen
            university={university}
            building={mathmech}
            posts={wallPostsByBuilding['math-mech'] || []}
            canPost={false}
            onBack={noop}
          />
          <NoticeSheet
            open
            title="почему нельзя писать?"
            text="посты на стене корпуса могут создавать только те, кто сейчас находится на его территории. зайди в корпус, чтобы написать. комментировать посты и ставить реакции можно откуда угодно."
            onClose={noop}
          />
        </Frame>
      </div>
    </div>
  )
}
