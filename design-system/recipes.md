# Recipes

Copy-paste starting points for common tasks. Pair with [`components.md`](./components.md).

---

## Add a new full-screen view
1. Create `MyScreen.jsx` + `MyScreen.module.css` in `src/components/`.
2. Use the screen shell:

```jsx
import { useState } from 'react'
import s from './MyScreen.module.css'

export default function MyScreen({ onBack }) {
  const [closing, setClosing] = useState(false)
  return (
    <div
      className={`screen ${s.screen} ${closing ? s.closing : ''}`}
      onAnimationEnd={(e) => { if (e.target === e.currentTarget && closing) onBack() }}
    >
      <header className={s.header}>
        <button className={s.headerBtn} onClick={() => setClosing(true)} aria-label="Назад">{/* ‹ */}</button>
        <div className={s.headerTitle}>заголовок</div>
        <div className={s.headerSpacer} />
      </header>
      <div className="scroll">{/* content */}</div>
      {/* optional <footer> */}
    </div>
  )
}
```

3. In the `.module.css`, copy the `.screen`/`.closing`/`@keyframes slideIn|slideOut`
   block from any existing screen, and the `.header`/`.headerBtn`/`.headerTitle`
   styles. Render `<MyScreen/>` from the feature app behind a `view` flag.

---

## Add a bottom sheet
Copy `CampusSheet.jsx` wholesale and replace the body. Keep: the backdrop, the
`.sheet` transform/visibility transitions, the grabber, and the `Escape` handler.
Tokens: `--scrim`, `--shadow-sheet`, radius `18px 18px 0 0`, `--ease-emphasized`.

---

## A tappable card/row
```css
.row { display: flex; align-items: center; gap: 12px; padding: 12px 16px; }
.row:active { transform: scale(0.99); transition: transform .08s ease; }
```
Left: icon/avatar. Middle: `flex: 1; min-width: 0` text column (title `--text` +
sub `--text-muted`, both `text-overflow: ellipsis`). Right: chevron in `--chevron`.

---

## Russian pluralization (counts)
Used for "N человек / N комментариев / N записей". Pattern from `WallPost.jsx`:

```js
function plural(n, [one, few, many]) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}
// plural(n, ['комментарий', 'комментария', 'комментариев'])
// people: 1 человек / 2 человека / 5 человек  → ['человек','человека','человек']
```

## Russian genitive declension (names → "стена {X}")
From `WallEntry.jsx` — declines adjective+noun place/faculty names:

```js
function declineWord(w) {
  const l = w.toLowerCase()
  if (/(ий|ый|ой)$/.test(l)) return w.slice(0, -2) + 'ого'
  if (/ое$/.test(l)) return w.slice(0, -2) + 'ого'
  if (/(ая|яя)$/.test(l)) return w.slice(0, -2) + 'ой'
  if (/ие$/.test(l)) return w.slice(0, -2) + 'ия'
  if (/ь$/.test(l)) return w.slice(0, -1) + 'я'
  if (/е$/.test(l)) return w.slice(0, -1) + 'я'
  if (/[бвгджзйклмнпрстфхцчшщ]$/.test(l)) return w + 'а'
  return w
}
const toGenitive = (name) => name.split(/(\s+)/).map(p => /^\s+$/.test(p) ? p : declineWord(p)).join('')
// "Экономический факультет" → "экономического факультета"
```

---

## Use the green accent correctly
Green (`--green` / `#5FF780`) is reserved for **presence, live, online, and "you"**
(your own bubble uses the `--green-gradient`). Don't use it as a generic accent —
for that reach for the place-type or per-campus accents.

---

## Sourcing imagery
- **People:** drop files into `src/assets/faces/` named `…avatar-NN.jpg`; they're
  auto-indexed by `faces.js`. Reference by pool index.
- **Places:** drop into `src/assets/venues/`. The current set was fetched with
  `curl https://loremflickr.com/440/560/<keywords>?lock=<n>` (themed real photos,
  `lock` keeps them stable). Swap for curated/licensed shots before anything
  public-facing.

---

## Using these tokens in a new feature
- CSS: `@import` `design-system/tokens.css` (or paste its `:root` into
  `src/styles/global.css`) and write `background: var(--surface)`, etc.
- JS: `import { color, radius, starColor } from '../../design-system/tokens.js'`
  for inline styles / computed colors.
- Existing components still use literal values — migrate opportunistically; don't
  do a big-bang refactor.
