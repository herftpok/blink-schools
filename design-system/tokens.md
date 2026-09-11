# Design Tokens

Canonical values used across the app. Machine-readable copies live in
[`tokens.css`](./tokens.css) and [`tokens.js`](./tokens.js).

> House rule: **UI text is lowercase.** Almost every text style sets
> `text-transform: lowercase` and uses Montserrat. Numbers/counts use SF Pro Text
> with `font-variant-numeric: tabular-nums`.

---

## Color

### Background & surfaces
| Token | Value | Use |
|-------|-------|-----|
| `bg` | `#000000` | App / screen background |
| `surface` | `#1C1C1E` | Primary elevated surface: header buttons, cards, inputs |
| `surface-2` | `#242424` | Friend chat bubble, secondary button, campus-frame card (`#1C1C1C` is the same family) |
| `surface-3` | `#2C2C2E` | Hover state of surface, lighter chips |
| `surface-4` | `#3A3A3C` | Pill sitting *on top of* a bubble (e.g. comment pill), hover `#444446` |
| `frame-bezel` | `#18181B` | Phone-frame outer ring (`box-shadow`) |
| `frame-border` | `#1F1F22` | Phone-frame 1px border |
| `root-bg-1 / -2` | `#1B1B1F` / `#16161A` over `#0C0C0D` | Radial accents behind the phone frame on desktop |

### Text
| Token | Value | Use |
|-------|-------|-----|
| `text` | `#FFFFFF` | Primary text |
| `text-muted` | `#808080` | Secondary text, addresses, captions (most common muted) |
| `text-tertiary` | `rgba(235,235,245,0.6)` | Faint footnotes |
| `text-placeholder` | `rgba(255,255,255,0.35)` | Input placeholders |
| `chevron` | `rgba(235,235,245,0.3)` | iOS-style list chevrons |

### Brand & accents
| Token | Value | Use |
|-------|-------|-----|
| `green` | `#5FF780` | **Presence / live / online / "you".** The brand accent. |
| `green-glow` | `rgba(95,247,128,0.18)` → `rgba(95,247,128,0.05)` | Pulsing ring around online dots |
| `green-tint` | `rgba(95,247,128,0.16)` / `0.14` | Tinted backgrounds for green controls |
| `green-gradient` | `linear-gradient(135deg, #CCFF39 0%, #A0FF65 100%)` | **Your own** chat/comment bubble |
| `pink` | `#FF75E1` | **Unseen stories** ring, playful accent |
| `wall-border` | `#8E62FF` (hover `#A685FF`) | Default wall-entry card border (overridden per-campus, see below) |
| `blue-icon` | radial `#A1CFFF → #6AB2FF → #4FA4FF → #3396FF`, linear `#64AFFF → #3396FF` | University / "all campuses" badge icon |

### Place-type accents (live stories)
Each story's place type has an icon tinted with its color:

| Type | Color |
|------|-------|
| `park` | `#5FF780` |
| `club` | `#C18CFF` |
| `bar` | `#FFB269` |
| `square` | `#6AB2FF` |
| `rooftop` | `#FF8A5E` |
| `cafe` | `#E0A56A` |

### Per-campus gradient accents (school)
Each building gets a gradient header + matching wall-entry border. Cycle of 4:

| Index | Accent (border) | Gradient asset |
|-------|-----------------|----------------|
| 0 | `#FF6B5E` | `g0.png` (orange) |
| 1 | `#4D6BFF` | `g1.png` (purple→blue) |
| 2 | `#2FD89B` | `g2.png` (green) |
| 3 | `#19C7C7` | `g3.png` (blue→teal) |

"All campuses" keeps the original purple-pink `aurora.svg` + `#8E62FF` border.

### Star tiers (school gamification — `starColor()` in `mock.js`)
| Condition | Color |
|-----------|-------|
| `stars >= 12` | `#FAFF69` (gold) |
| `stars <= 10` | `#FFB269` (bronze) |
| otherwise (11) | `rgba(255,255,255,0.85)` (neutral) |

### Hairlines, overlays, controls
| Token | Value | Use |
|-------|-------|-----|
| `hairline` | `rgba(255,255,255,0.06)` | Dividers, faint surfaces, header bottom border |
| `border-subtle` | `rgba(255,255,255,0.10)` | 1px card borders (e.g. campus frame) |
| `border` | `rgba(255,255,255,0.12)–0.15` | Stronger borders (chips, inputs) |
| `input-fill` | `rgba(255,255,255,0.2)` | Comment input fill (≈ white 20–25%) |
| `input-border` | `rgba(255,255,255,0.15)` | Comment input / photo button border (2px) |
| `ios-control` | `rgba(118,118,128,0.24)` (hover `0.36`) | iOS translucent control gray |
| `scrim` | `rgba(0,0,0,0.5)` + `backdrop-filter: blur(3px)` | Bottom-sheet backdrop |

---

## Typography

- **UI font:** `'Montserrat', sans-serif` — loaded in `index.html` (Google Fonts, weights 500/600/700/800/900).
- **Body / numeric font:** `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif` — message bodies, counts, addresses-as-numbers.

### Size scale (px)
| px | Typical use |
|----|-------------|
| 28 | Bottom-sheet title ("выбери корпус") |
| 20 | Big section title; university name (weight 900) |
| 18 | Chat bubble text (weight 400); some headers |
| 16 | Card title |
| 15 | Button label / body |
| 14 | Sub-labels, comment pill, list meta |
| 13 | Meta, addresses, counts |
| 12 | Small uppercase section label |
| 11 | Uppercase pill button |

### Weights
`900` university name · `800` headers & names · `700` buttons/titles · `600` labels/sub · `500` input · `400` chat-bubble body.

### Letter-spacing
`-0.408 / -0.4 / -0.3 / -0.2` on tight headings; `+0.2 … +0.6` on uppercase labels/buttons.

---

## Radius
| px | Use |
|----|-----|
| 8 | Small square icon button |
| 12 | Close button, small icon container |
| 14 | 44px icon button |
| 16 | Cards, icon tiles |
| 18 | **Bottom sheets, pills, chat bubbles** (the default "rounded" radius) |
| 20 | Secondary full-width button |
| 22 | Primary CTA |
| 28 | Wall-entry card |
| 44 | Phone frame |
| 999 | Pills, avatars, dots |

---

## Spacing
Base scale (px): **4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24**.
- Screen horizontal padding: **16**.
- Header top padding: **56** (clears the status bar / notch).
- Footers add `env(safe-area-inset-bottom)`.

---

## Elevation (shadows)
| Token | Value |
|-------|-------|
| `sheet` | `0 -20px 60px rgba(0,0,0,0.4)` |
| `popover` | `0 16px 40px rgba(0,0,0,0.5)` |
| `avatar` | `0 2px 8px rgba(0,0,0,0.4)` |
| `blue-icon` | `0 4px 12px rgba(51,150,255,0.3)` |
| `green-pulse` | `0 0 0 4px rgba(95,247,128,0.18)` → `0 0 0 7px rgba(95,247,128,0.05)` |
| `ring-unseen` | `0 0 0 2px #FF75E1` (story preview unseen ring) |

---

## Motion
| Token | Value | Use |
|-------|-------|-----|
| `ease-emphasized` | `cubic-bezier(0.32, 0.72, 0, 1)` | The signature easing for screen/sheet transitions |
| `screen-slide` | `transform: translateX(100% → 0)` over `0.28s` | Push/pop full-screen routes |
| `sheet-rise` | `transform: translateY(102% → 0)` over `0.38s` (+ `visibility` delayed on close) | Bottom sheets |
| `press` | `transform: scale(0.96–0.99)` over `0.08s ease` | Button/row tap feedback |
| `color/bg` | `0.12–0.15s ease` | Hover & state changes |
| `pulse` | `1.6–1.8s ease-in-out infinite` | Online-dot glow |
