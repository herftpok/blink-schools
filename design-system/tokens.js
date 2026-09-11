// Blink design tokens for JS usage (inline styles, computed values).
// Mirrors tokens.css / tokens.md. Import { tokens } or specific groups.

export const color = {
  bg: '#000000',
  surface: '#1c1c1e',
  surface2: '#242424',
  surface3: '#2c2c2e',
  surface4: '#3a3a3c',
  frameBezel: '#18181b',
  frameBorder: '#1f1f22',

  text: '#ffffff',
  textMuted: '#808080',
  textTertiary: 'rgba(235, 235, 245, 0.6)',
  textPlaceholder: 'rgba(255, 255, 255, 0.35)',
  chevron: 'rgba(235, 235, 245, 0.3)',

  green: '#5ff780',
  greenGlow: 'rgba(95, 247, 128, 0.18)',
  greenTint: 'rgba(95, 247, 128, 0.16)',
  greenGradient: 'linear-gradient(135deg, #ccff39 0%, #a0ff65 100%)',
  pink: '#ff75e1',
  wallBorder: '#8e62ff',
  wallBorderHover: '#a685ff',

  hairline: 'rgba(255, 255, 255, 0.06)',
  borderSubtle: 'rgba(255, 255, 255, 0.1)',
  border: 'rgba(255, 255, 255, 0.14)',
  inputFill: 'rgba(255, 255, 255, 0.2)',
  inputBorder: 'rgba(255, 255, 255, 0.15)',
  iosControl: 'rgba(118, 118, 128, 0.24)',
  scrim: 'rgba(0, 0, 0, 0.5)',
}

// place type -> accent color (live stories)
export const placeType = {
  park: '#5ff780',
  club: '#c18cff',
  bar: '#ffb269',
  square: '#6ab2ff',
  rooftop: '#ff8a5e',
  cafe: '#e0a56a',
}

// per-campus gradient accents, cycled by building index
export const campusAccent = ['#ff6b5e', '#4d6bff', '#2fd89b', '#19c7c7']

// star tier color (school gamification) — matches starColor() in src/data/mock.js
export function starColor(stars) {
  if (stars >= 12) return '#faff69'
  if (stars <= 10) return '#ffb269'
  return 'rgba(255, 255, 255, 0.85)'
}

export const font = {
  ui: "'Montserrat', sans-serif",
  body: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif",
}

export const fontSize = {
  display: '28px',
  title: '20px',
  bubble: '18px',
  card: '16px',
  body: '15px',
  label: '14px',
  meta: '13px',
  small: '12px',
  tiny: '11px',
}

export const radius = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '18px',
  cta: '22px',
  cardXl: '28px',
  frame: '44px',
  pill: '999px',
}

export const space = { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px', 6: '24px' }

export const shadow = {
  sheet: '0 -20px 60px rgba(0, 0, 0, 0.4)',
  popover: '0 16px 40px rgba(0, 0, 0, 0.5)',
  avatar: '0 2px 8px rgba(0, 0, 0, 0.4)',
  blueIcon: '0 4px 12px rgba(51, 150, 255, 0.3)',
  ringUnseen: '0 0 0 2px #ff75e1',
}

export const motion = {
  easeEmphasized: 'cubic-bezier(0.32, 0.72, 0, 1)',
  durScreen: '0.28s',
  durSheet: '0.38s',
  durPress: '0.08s',
  durState: '0.15s',
}

export const tokens = {
  color, placeType, campusAccent, starColor,
  font, fontSize, radius, space, shadow, motion,
}

export default tokens
