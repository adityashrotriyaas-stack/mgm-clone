import { colors, gradients } from './colors'

const patternMandalaDark = `
  radial-gradient(circle at 50% 50%, transparent 58px, rgba(234, 90, 0, 0.10) 59px, transparent 60px),
  radial-gradient(circle at 50% 50%, transparent 98px, rgba(192, 78, 0, 0.08) 99px, transparent 100px),
  repeating-radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 24px)
`

export const patternMandala = patternMandalaDark

export const patternBandhani = `
  radial-gradient(circle, rgba(234, 90, 0, 0.12) 1px, transparent 1.5px),
  radial-gradient(circle, rgba(192, 78, 0, 0.10) 1px, transparent 1.5px)
`

export const patternDiya = `
  radial-gradient(circle at 8% 18%, rgba(234, 90, 0, 0.18), transparent 28%),
  radial-gradient(circle at 92% 12%, rgba(255, 138, 48, 0.14), transparent 24%),
  radial-gradient(circle at 78% 88%, rgba(234, 90, 0, 0.16), transparent 26%),
  radial-gradient(circle at 15% 82%, rgba(192, 78, 0, 0.12), transparent 22%)
`

export const patternGarland = `
  repeating-linear-gradient(45deg, rgba(234, 90, 0, 0.08) 0 2px, transparent 2px 18px),
  repeating-linear-gradient(-45deg, rgba(192, 78, 0, 0.06) 0 2px, transparent 2px 18px)
`

export const patternNight = `
  radial-gradient(circle at 18% 22%, rgba(234, 90, 0, 0.18), transparent 24%),
  radial-gradient(circle at 82% 14%, rgba(255, 138, 48, 0.16), transparent 22%),
  radial-gradient(circle at 65% 78%, rgba(234, 90, 0, 0.12), transparent 20%),
  repeating-radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0 2px, transparent 2px 30px)
`

export const patternSizes = {
  bandhani: '14px 14px, 14px 14px',
  bandhaniOffset: '0 0, 7px 7px',
}

const darkBase = {
  color: colors.textLight,
  accent: `linear-gradient(90deg, transparent, ${colors.gold}, ${colors.maroon}, ${colors.gold}, transparent)`,
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
    background: `linear-gradient(180deg, #7A4200 0%, #3A1C00 100%)`,
    pattern: `${patternMandala}, ${patternGarland}`,
  },
  transition: {
    ...darkBase,
    background: `linear-gradient(180deg, ${colors.night} 0%, #3C1C00 8%, ${colors.bgSoft} 100%)`,
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
  bgcolor: colors.bgCard,
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
    '&:hover fieldset': { borderColor: 'rgba(234, 90, 0, 0.35)' },
    '&.Mui-focused fieldset': { borderColor: colors.maroon, borderWidth: '1.5px' },
  },
  '& .MuiInputBase-input::placeholder': {
    color: colors.muted,
    opacity: 1,
  },
}
