import Photo from './Photo.jsx'
import { starColor } from '../data/mock.js'
import s from './StudentCard.module.css'

export default function StudentCard({ student, photoIndex, onAdd, onCancel }) {
  const { name, friends, stars, state, avatar, initial } = student

  return (
    <div className={s.row}>
      <div className={s.profile}>
        <div className={s.avatar} style={{ background: avatar }}>
          <span className={s.initial}>{initial}</span>
          <Photo index={photoIndex} />
        </div>

        <div className={s.text}>
          <div className={s.name}>{name}</div>
          <div className={s.info}>
            {stars > 0 && (
              <>
                <span className={s.stars} style={{ color: starColor(stars) }}>{stars} старсов</span>
                <span className={s.sep}> · </span>
              </>
            )}
            <span className={s.friends}>{friends} друзей</span>
          </div>
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
