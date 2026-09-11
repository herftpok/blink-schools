# Component Patterns

The reusable building blocks. Each lists the source file to copy from and the
rules that make it look "Blink". Values reference [`tokens.md`](./tokens.md).

---

## Screen shell
Every full-screen view is a `.screen` (global class) — `position: absolute; inset: 0;
display: flex; flex-direction: column; background: #000; overflow: hidden`. It lives
inside `.phone-frame` and pushes onto the stack with a horizontal slide.

```
.screen → animation: slideIn 0.28s var(--ease-emphasized)   (translateX 100% → 0)
.closing → slideOut (forwards), then onAnimationEnd fires onBack()
```

Layout inside a screen is always: **`<header>` → `<div className="scroll">` → optional `<footer>`**.
`.scroll` is `flex: 1; overflow-y: auto` with the scrollbar hidden. Footers are
pinned to the bottom because `.screen` is a flex column.

Reference: `WallScreen.jsx`, `CommentsScreen.jsx`, `EventsScreen.jsx`, `WallPicker.jsx`.

---

## Header
Back button + title (+ optional trailing action), `padding: 56px 12px 12px`,
bottom hairline.

- **Icon button:** 44×44, `radius 14`, `background: var(--surface)`, hover `--surface-3`, `:active scale(0.96)`.
- **Title:** Montserrat. Either centered (with a 44px spacer to balance the back button) or left-aligned right after it. Lowercase.
- **Two-line header** (e.g. wall): title (Montserrat 600 15px) + sub (`--text-muted` 13px, "стена · N записей").

Reference: `WallScreen.jsx` header, `CommentsScreen.jsx` header.

---

## Bottom sheet
Backdrop + sheet that rises from the bottom. Reference: `CampusSheet.jsx`.

- **Backdrop:** `position: absolute; inset: 0; background: var(--scrim); backdrop-filter: blur(3px)`. Fades opacity/visibility 0.28s. Click closes.
- **Sheet:** `position: absolute; left/right/bottom: 0; border-radius: 18px 18px 0 0; background: #000; box-shadow: var(--shadow-sheet)`. Closed `transform: translateY(102%)`, open `translateY(0)`, `0.38s var(--ease-emphasized)`. `visibility` flips to hidden **after** the slide-out (so it animates).
- **Grabber:** 36×5 pill, `rgba(235,235,245,0.3)`, centered at top.
- Add an `Escape` key handler while open.
- Open height ≈ 87% (top ≈ Y110) when you want a tall sheet regardless of content.

---

## Buttons
| Kind | Spec | Where |
|------|------|-------|
| **Primary CTA** | full-width, height 60, `radius 22`, `background: #fff; color: #000`, Montserrat 700 15px **UPPERCASE**, `:active scale(0.97)`. | "позвать друзей" (`UniversityScreen`) |
| **Secondary CTA** | full-width, height 56, `radius 20`, `background: var(--surface-2)`, white uppercase. | "добавить как папку в чаты" (`WallPicker`) |
| **Green action** | `background: var(--green); color: #000`, used for send / join. | composer send, "вступить в чатик" |
| **Pill chip** | gradient/translucent fill, `radius 18`, 1px border `--border`, vertical white gradient fill. | building selector (`BuildingSelector`) |
| **Icon button** | 44×44 `radius 14` `--surface`, or 32×32 `radius 8` translucent. | headers, close buttons |
| **Tiny uppercase text button** | no fill, Montserrat 700 11px uppercase, `--text-muted` → white on hover. | (legacy "это как?" — now a `?` circle) |

CTAs sit in a footer with `padding: … calc(16px + env(safe-area-inset-bottom))` and a
top gradient-to-black fade when overlaying scroll content.

---

## List row / card
- **List row:** `display: flex; align-items: center; gap: 12–14; padding: 8–12px 16–24px`. Left icon/avatar, flex-1 text column (title + sub), trailing chevron or check.
- **Framed card** (campus "all" row): fixed height 60, `padding 9px`, `radius 16`, `background: #1C1C1C`, `border: 1px solid var(--border-subtle)`. Icon gets **equal inset on all sides** (left padding = vertical centering gap).
- **Trailing affordance:** chevron `viewBox 0 0 20 20; path "M7.5 4.5l5.5 5.5-5.5 5.5"` in `--chevron`; or a selected check in a 20×20 `radius 8` white square (black check).

Reference: `CampusSheet.jsx`, `StudentCard.jsx`.

---

## Chat bubble — `ChatMessage.jsx`
The shared bubble for wall posts and comments.

- Props: `name, initial, avatar, anon, text, mine, showHeader, green, children`.
- Layout: avatar (32×32 `radius 9.6`, bottom-aligned, hidden when `mine`) + column (optional name + bubble).
- **Bubble:** `width: fit-content; display: flex; flex-direction: column; gap: 10px; padding: 6px 12px 8px; radius 18; background: #242424`; body text SF Pro Text 18px/400. Extra content (reactions, comment pill) is passed as `children` and stacks inside.
- `mine` **or** `green` → `background: var(--green-gradient); color: #000`. Use `green` (not `mine`) when you want the green bubble but still left-aligned with avatar (e.g. "вы" in comments).

---

## Avatar stack — `AvatarStack.jsx`
Organic 1–3 photo cluster. `indices` are positions in the local face pool
(`faceAt`); missing → gradient fallback tile. For 3 photos it's a deliberately
scattered composition (different sizes 18/24/32, small rotations, overlapping
z-order). Tiles are squircles (`border-radius: 30%`), no border.

---

## Story card (live) — `EventsScreen.jsx`
Horizontal-scrolling check-in cards.

- **Thumb:** 132×168, `radius 16`, venue photo `object-fit: cover`. Unseen → `box-shadow: var(--ring-unseen)` (pink ring); seen → image `opacity: 0.5`.
- **Author avatar:** 34×34 circle, 2px white border, `--shadow-avatar`, absolutely placed bottom-left, overlapping the photo.
- **Caption:** place-type icon (colored per `placeType` token) + lowercase address, Montserrat 600 13px.

Place types & icons live in `EventsScreen.jsx` (`PLACE_TYPES`, `PlaceIcon`): park 🌲, club 🎵, bar 🍸, square 🏛, rooftop 🏢, cafe ☕.

---

## Story viewer — `StoryViewer.jsx`
Fullscreen tappable story: segmented progress bar at top (each segment animates,
`onAnimationEnd` advances), left/right tap zones, meta = round author avatar +
name + "address · time", close button.

---

## Reactions — `WallPost.jsx`
Emoji-image reactions (PNGs from `/public/reactions` via `import.meta.env.BASE_URL`).
Inside the bubble, only **non-zero** reactions render: 40px image with the count
below in white. Active (your) reaction colors the count green. Reaction images:
`heart / cat / smiley / flower`.

---

## Small accents
- **Online / live dot:** small circle `background: var(--green)` with a pulsing
  `box-shadow` glow (`--green-glow` → far). "live" label uses the same green.
- **Pill badge / counter:** rounded `999px` chip, translucent white fill, tabular-nums.
- **Star "sticker":** `star.svg` with a count overlaid, slightly rotated
  (`rotate(-12deg)`), pink fill — used for wall activity counts.
- **Section label:** Montserrat 800 12px uppercase, `--text-muted`, `letter-spacing 0.6`.
