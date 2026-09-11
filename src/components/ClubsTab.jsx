import s from './ClubsTab.module.css'
import Photo from './Photo.jsx'
import ClubTile from './ClubTile.jsx'
import addUrl from '../assets/add.svg'
import { membersWord } from '../data/clubs.js'

// Вкладка «клубы»: кнопка «создать клуб» и список клубов.
// В строке — аватар клуба, название, число участников, три лица.
export default function ClubsTab({ clubs, person, faceOf, isMember, onOpen, onJoin, onLeave, onCreate }) {
  return (
    <div className={s.tab}>
      <button className={s.create} type="button" onClick={onCreate}>
        <img src={addUrl} alt="" className={s.createIcon} />
        создать клуб
      </button>

      <ul className={s.list}>
        {clubs.map((club) => {
          const member = isMember(club.id)
          const faces = club.members.filter((id) => id !== 'me').slice(0, 3)
          return (
            <li key={club.id} className={s.row}>
              <button className={s.main} type="button" onClick={() => onOpen(club.id)}>
                <ClubTile club={club} />
                <span className={s.text}>
                  <span className={s.name}>{club.name}</span>
                  <span className={s.meta}>
                    <span className={s.faces}>
                      {faces.map((id) => {
                        const p = person(id)
                        return (
                          <span key={id} className={s.face} style={{ background: p.avatar }}>
                            <span>{p.initial}</span>
                            <Photo index={faceOf(id)} />
                          </span>
                        )
                      })}
                    </span>
                    {club.members.length} {membersWord(club.members.length)}
                  </span>
                </span>
              </button>

              {member ? (
                <button className={`${s.btn} ${s.btnFilled}`} type="button" onClick={() => onLeave(club.id)}>выйти</button>
              ) : (
                <button className={`${s.btn} ${s.btnOutline}`} type="button" onClick={() => onJoin(club.id)}>вступить</button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
