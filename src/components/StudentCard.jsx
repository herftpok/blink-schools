import Photo from './Photo.jsx'
import { starColor } from '../data/mock.js'
import crownUrl from '../assets/crown.png'
import s from './StudentCard.module.css'

export default function StudentCard({ student, photoIndex, president = false, role = null, onAdd, onCancel }) {
  const { name, friends, stars, state, avatar, initial } = student

  return (
    <div className={`${s.row} ${president ? s.rowPresident : ''}`}>
      <div className={s.profile}>
        <div className={s.avatarWrap}>
          <div className={`${s.avatar} ${president ? s.avatarLg : ''}`} style={{ background: avatar }}>
            <span className={s.initial}>{initial}</span>
            <Photo index={photoIndex} />
          </div>
          {president && <img src={crownUrl} alt="" className={s.crown} aria-hidden />}
        </div>

        <div className={s.text}>
          <div className={s.name}>
            {president ? <span className={s.nameUnderlined}>{name}</span> : name}
            {president && <span className={s.roleNote}>выбран 22.09</span>}
          </div>
          {president ? (
            <div className={s.role}>президент школы</div>
          ) : role ? (
            <div className={s.roleMuted}>{role}</div>
          ) : (
            <div className={s.info}>
              {stars > 0 && (
                <>
                  <span className={s.stars} style={{ color: starColor(stars) }}>{stars} старсов</span>
                  <span className={s.sep}> · </span>
                </>
              )}
              <span className={s.friends}>{friends} друзей</span>
            </div>
          )}
        </div>
      </div>

      {state === 'add' && (
        <button className={`${s.btn} ${s.btnOutline}`} onClick={onAdd}>
          добавить
        </button>
      )}
      {state === 'pending' && (
        <button className={`${s.btn} ${s.btnFilled}`} onClick={onCancel}>
          отменить
        </button>
      )}
      {state === 'friend' && <span className={`${s.btn} ${s.btnFriend}`}>друг</span>}
    </div>
  )
}
