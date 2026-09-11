# Architecture & Conventions

## Stack
- **React 18 + Vite 5.** No router, no CSS framework, no state library.
- **CSS Modules**, one `Component.module.css` co-located next to each
  `Component.jsx`. Global primitives live in `src/styles/global.css`.
- Fonts: Montserrat via Google Fonts `<link>` in `index.html`; SF Pro Text is the
  system font.

## Routing — `src/App.jsx`
Hand-rolled, no library:

| URL | Renders |
|-----|---------|
| path ends with `/showcase` | `SchoolShowcase` (static grid of all school screens, for handoff) |
| hash `#school` | `SchoolApp` (interactive school feature) |
| anything else | `LiveApp` (live map / events / chats) |

`LiveApp` and `SchoolApp` are **two decoupled feature apps** that share the
primitives in this design system. Each owns its own `useState` view machine
(e.g. `view: 'map' | 'events' | 'join' | 'chat'`) and renders screens as a stack —
there's no shared router. A new feature is typically a third app or a new view in
an existing one.

## Feature app shape
A feature app holds the current view + transient UI state and conditionally
renders `.screen` components:

```jsx
const [view, setView] = useState('map')      // which screen
const [seen, setSeen] = useState(new Set())  // transient UI state
// render <MapScreen/> always; overlay <EventsScreen/> when view==='events'; etc.
```

Screens animate in/out themselves (slide), and call an `onBack`/`onClose` callback
after their close animation (`onAnimationEnd`).

## Data — `src/data/mock.js`
Single source of mock data. Exports:
`university, buildings, students, me, wallUnread, wallPostsByBuilding` (school) and
`liveChats, liveStories` (live). Helper `starColor(stars)` lives here too.

Conventions in the data:
- Buildings carry `faculty, short, address, distance, youArePresent`.
- Live stories carry `name, face, type, address, img, time`.
- Keep data and view-logic separate; components receive data via props from the
  feature app, never import `mock.js` deep in the tree (the feature app does).

## Assets
- **Faces pool:** `src/assets/faces/*.{jpg,png}` loaded with `import.meta.glob`
  in `src/utils/faces.js`. Use `faceAt(index)` → URL or `null` (caller shows a
  fallback). Avatars reference a pool index, so a person's photo is stable.
- **Venues:** `src/assets/venues/*.jpg` — place preview photos for live stories.
- **Gradients:** `src/assets/gradients/g0…g3.png` — per-campus headers.
- **SVGs:** `src/assets/*.svg` (logo, wings, star, glyphs) imported as URLs.
- **Reaction PNGs:** in `public/reactions/`, referenced at runtime via
  `` `${import.meta.env.BASE_URL}reactions/heart.png` `` so they work under the
  GitHub Pages base path.

## The phone frame — `src/styles/global.css`
Everything renders inside `.phone-frame` (390×844, `radius 44`, bezel shadow,
notch via `::before`). `#root` centers it on a dark radial background. Below
`480px` a media query drops the frame and goes fullscreen (`100%` / `100dvh`).
When screenshotting on desktop, render at a window ≥ 520px wide so the frame fits.

## Build & deploy
- `npm run dev` → Vite dev server (`localhost:5173`).
- `npm run build` → `vite build && cp dist/index.html dist/404.html` (the 404 copy
  is the SPA fallback for GitHub Pages).
- `vite.config.*` sets `base: command === 'build' ? '/blink-schools/' : '/'`.
- **Deploy:** push to `main` → `.github/workflows/deploy.yml` builds and publishes
  to GitHub Pages. The live URL serves `LiveApp` at `/` and `SchoolApp` at `#school`.

## House style (do these by default)
- All UI copy **lowercase** (`text-transform: lowercase`) in Montserrat.
- Numbers/counts in SF Pro Text with `font-variant-numeric: tabular-nums`.
- **Green = presence/live/online/you. Pink = unseen stories.**
- Russian grammar matters: use a plural helper for counts and a genitive helper
  for declined names — see [`recipes.md`](./recipes.md).
- Press feedback on every tappable: `:active { transform: scale(0.96–0.99) }`.
- Respect safe areas on footers: `calc(16px + env(safe-area-inset-bottom))`.
