import { colors, gradients } from './colors'

const patternMandalaDark = `
  radial-gradient(circle at 50% 50%, transparent 58px, rgba(232, 184, 74, 0.06) 59px, transparent 60px),
  radial-gradient(circle at 50% 50%, transparent 98px, rgba(168, 50, 72, 0.05) 99px, transparent 100px),
  repeating-radial-gradient(circle at center, rgba(255, 245, 230, 0.02) 0 1px, transparent 1px 24px)
`

export const patternMandala = patternMandalaDark

export const patternBandhani = `
  radial-gradient(circle, rgba(232, 184, 74, 0.08) 1px, transparent 1.5px),
  radial-gradient(circle, rgba(168, 50, 72, 0.06) 1px, transparent 1.5px)
`

export const patternDiya = `
  radial-gradient(circle at 8% 18%, rgba(255, 180, 60, 0.14), transparent 28%),
  radial-gradient(circle at 92% 12%, rgba(255, 140, 26, 0.1), transparent 24%),
  radial-gradient(circle at 78% 88%, rgba(232, 184, 74, 0.12), transparent 26%),
  radial-gradient(circle at 15% 82%, rgba(168, 50, 72, 0.08), transparent 22%)
`

export const patternGarland = `
  repeating-linear-gradient(45deg, rgba(232, 184, 74, 0.05) 0 2px, transparent 2px 18px),
  repeating-linear-gradient(-45deg, rgba(168, 50, 72, 0.04) 0 2px, transparent 2px 18px)
`

export const patternNight = `
  radial-gradient(circle at 18% 22%, rgba(255, 180, 60, 0.14), transparent 24%),
  radial-gradient(circle at 82% 14%, rgba(255, 120, 50, 0.12), transparent 22%),
  radial-gradient(circle at 65% 78%, rgba(232, 184, 74, 0.08), transparent 20%),
  repeating-radial-gradient(circle at center, rgba(255, 245, 230, 0.025) 0 2px, transparent 2px 30px)
`

export const patternSizes = {
  bandhani: '14px 14px, 14px 14px',
  bandhaniOffset: '0 0, 7px 7px',
}

const darkBase = {
  color: colors.textLight,
  accent: `linear-gradient(90deg, transparent, ${colors.gold}, ${colors.saffron}, ${colors.gold}, transparent)`,
}

export const sectionVariants = {
  cream: {
    ...darkBase,
    background: gradients.brown,
    pattern: `${patternDiya}, ${patternMandala}, ${patternGarland}`,
  },
  warm: {
    ...darkBase,
    background: gradients.brownWarm,
    pattern: `${patternDiya}, ${patternBandhani}`,
    patternSize: patternSizes.bandhani,
    patternPosition: patternSizes.bandhaniOffset,
  },
  saffron: {
    ...darkBase,
    background: `linear-gradient(180deg, ${colors.bgWarm} 0%, ${colors.bg} 100%)`,
    pattern: `${patternMandala}, ${patternGarland}`,
  },
  transition: {
    ...darkBase,
    background: `linear-gradient(180deg, ${colors.night} 0%, ${colors.nightMid} 8%, ${colors.bgSoft} 100%)`,
    pattern: `${patternDiya}, ${patternMandala}`,
  },
  night: {
    ...darkBase,
    background: gradients.night,
    pattern: patternNight,
  },
}

export const festiveCardSx = {
  bgcolor: colors.bgCard,
  borderRadius: '20px',
  border: `1px solid ${colors.border}`,
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)',
  backdropFilter: 'blur(8px)',
  color: colors.textLight,
}

export const festiveCardSoftSx = {
  bgcolor: 'rgba(46, 31, 24, 0.92)',
  borderRadius: '20px',
  border: `1px solid ${colors.border}`,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.22)',
  color: colors.textLight,
}

export const darkFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: colors.bgWarm,
    color: colors.textLight,
    borderRadius: '12px',
    '& fieldset': { borderColor: colors.border },
    '&:hover fieldset': { borderColor: 'rgba(232, 184, 74, 0.35)' },
    '&.Mui-focused fieldset': { borderColor: colors.gold, borderWidth: '1.5px' },
  },
  '& .MuiInputBase-input::placeholder': {
    color: colors.muted,
    opacity: 1,
  },
}
