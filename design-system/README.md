# Blink — Design System

Reusable design tokens, patterns and conventions extracted from this app so new
features look and behave like the existing ones.

This is **reference documentation + opt-in token files**. Nothing here is wired
into the build yet — the existing components still use hard-coded values. When
you build a new feature, pull from here instead of eyeballing.

## Files

| File | What it is |
|------|------------|
| [`tokens.md`](./tokens.md) | The canonical token reference (colors, type, radii, spacing, shadows, motion) with the meaning of each. |
| [`tokens.css`](./tokens.css) | The same tokens as CSS custom properties. `@import` it (or paste into `global.css`) and use `var(--…)`. |
| [`tokens.js`](./tokens.js) | The same tokens as a JS object, for inline styles / computed values. |
| [`components.md`](./components.md) | Catalog of the reusable building blocks (screen shell, header, bottom sheet, cards, chat bubble, avatar stack, buttons, story card…) with the recipe for each. |
| [`architecture.md`](./architecture.md) | How the app is wired: routing, CSS-Modules convention, data layer, assets, build & deploy. |
| [`recipes.md`](./recipes.md) | Step-by-step guides: add a screen, add a bottom sheet, Russian plural/declension helpers, sourcing imagery. |

## The 10-second summary

- **Stack:** React 18 + Vite 5, **CSS Modules** co-located per component. No router lib, no CSS framework, no state lib.
- **Surface:** pure black `#000` background; elevated surfaces are near-black greys (`#1C1C1E` / `#242424` / `#2C2C2E`).
- **Type:** **Montserrat** for everything UI (almost always `text-transform: lowercase`), **SF Pro Text** (system) for message bodies and numbers (`tabular-nums`).
- **Accent:** **green `#5FF780`** = presence / live / online / "you". **pink `#FF75E1`** = unseen stories.
- **Shape:** rounded everything — pills (`999px`), sheets/bubbles (`18px`), cards (`16px`), CTAs (`22px`).
- **Frame:** the whole app renders inside a `.phone-frame` (390×844) that goes fullscreen below 480px.

Start in [`components.md`](./components.md) if you're building UI, [`architecture.md`](./architecture.md) if you're wiring a feature.
