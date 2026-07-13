import { colors, gradients } from './colors'

export const registrationUi = {
  card: colors.bgCard,
  surface: colors.bgSoft,
  surfaceMuted: colors.bgWarm,
  inputBg: 'rgba(26, 14, 0, 0.92)',
  text: colors.textLight,
  muted: colors.muted,
  border: colors.border,
  accent: colors.goldDeep,
  accentSoft: 'rgba(255, 184, 0, 0.14)',
}

export const registrationFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: registrationUi.inputBg,
    color: registrationUi.text,
    borderRadius: '12px',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    '& fieldset': { borderColor: registrationUi.border },
    '&:hover fieldset': { borderColor: 'rgba(255, 179, 0, 0.55)' },
    '&.Mui-focused fieldset': {
      borderColor: colors.gold,
      borderWidth: '2px',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 4px rgba(255, 179, 0, 0.20)',
    },
  },
  '& .MuiInputBase-input': {
    color: registrationUi.text,
    py: 1.35,
    '&::placeholder': { color: registrationUi.muted, opacity: 1 },
  },
  '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus': {
    WebkitBoxShadow: `0 0 0 1000px ${registrationUi.inputBg} inset`,
    WebkitTextFillColor: `${registrationUi.text} !important`,
    caretColor: registrationUi.text,
    transition: 'background-color 9999s ease-out 0s',
  },
  '& .MuiInputAdornment-root': { mr: 0.5 },
  '& .MuiSelect-select': { textAlign: 'left' },
  '& .MuiSelect-icon': { color: registrationUi.muted },
}

export const registrationCardSx = {
  border: `1px solid ${registrationUi.border}`,
  borderRadius: '20px',
  p: { xs: 2, sm: 2.25, md: 3 },
  bgcolor: registrationUi.card,
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 235, 210, 0.06)',
  backdropFilter: 'blur(8px)',
}

export const registrationSummarySx = {
  bgcolor: registrationUi.accentSoft,
   border: `1px solid rgba(255, 184, 0, 0.28)`,
  borderRadius: '14px',
  p: 1.75,
  mb: 2.5,
  textAlign: 'center',
}

export const registrationBackButtonSx = {
  flex: 1,
  py: 1.5,
  minHeight: 50,
  borderRadius: '12px',
  border: `1.5px solid ${registrationUi.border}`,
  color: registrationUi.text,
  bgcolor: 'rgba(26, 14, 0, 0.55)',
  fontWeight: 600,
  fontSize: '0.9375rem',
  textTransform: 'none',
  transition: 'all 0.2s ease',
  '& .MuiButton-startIcon': { color: 'inherit' },
  '&.MuiButton-root:hover': {
    bgcolor: 'rgba(42, 22, 0, 0.92)',
    borderColor: 'rgba(255, 179, 0, 0.70)',
    color: colors.gold,
    boxShadow: '0 0 0 2px rgba(255, 179, 0, 0.10)',
  },
}

export const registrationSubmitButtonSx = {
  flex: { xs: 1, sm: 2 },
  py: 1.5,
  minHeight: 50,
  borderRadius: '12px',
  background: gradients.primary,
  color: colors.night,
  fontWeight: 800,
  fontSize: '0.9375rem',
  textTransform: 'none',
  boxShadow: '0 10px 24px rgba(255, 179, 0, 0.30)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    background: gradients.primaryHover,
    transform: 'scale(1.02)',
    boxShadow: '0 14px 32px rgba(255, 179, 0, 0.45)',
  },
  '&.Mui-disabled': {
    bgcolor: 'rgba(60, 40, 0, 0.5)',
    background: 'rgba(60, 40, 0, 0.5)',
    color: 'rgba(255, 248, 240, 0.35)',
    boxShadow: 'none',
  },
}

export const personSectionSx = {
  p: { xs: 1.75, sm: 2 },
  borderRadius: '16px',
  bgcolor: 'rgba(20, 10, 0, 0.55)',
  border: `1px solid ${registrationUi.border}`,
  boxShadow: 'inset 0 1px 0 rgba(255, 235, 210, 0.04)',
}

export const personTitleSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 800,
  color: registrationUi.text,
  fontSize: '0.98rem',
  mb: 1.25,
  '&::before': {
    content: '""',
    width: 4,
    height: 18,
    borderRadius: '4px',
    background: gradients.primary,
    flexShrink: 0,
  },
}
