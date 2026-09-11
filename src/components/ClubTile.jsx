import s from './ClubTile.module.css'

// Аватар клуба: фото, а если его нет — первая буква на тёмной плитке.
export default function ClubTile({ club, size = 56, radius = 20, className = '' }) {
  return (
    <span className={`${s.tile} ${className}`} style={{ width: size, height: size, borderRadius: radius, fontSize: size * 0.43 }}>
      {club.photo ? <img src={club.photo} alt="" className={s.photo} /> : club.name[0]}
    </span>
  )
}
