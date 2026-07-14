import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { colors } from '../constants/colors'

export default function NonRefundableCheckbox({ checked, onChange }) {
  return (
    <Box
      sx={{
        p: 1.75,
        borderRadius: '14px',
        bgcolor: 'rgba(30, 18, 16, 0.55)',
        border: `1px solid ${colors.border}`,
        backgroundImage: 'linear-gradient(135deg, rgba(255, 179, 0, 0.06), transparent 60%)',
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            sx={{
              color: 'rgba(255, 179, 0, 0.45)',
              pt: 0.25,
              '&.Mui-checked': {
                color: colors.gold,
              },
              '&.Mui-checked .MuiSvgIcon-root': {
                filter: 'drop-shadow(0 0 6px rgba(255, 179, 0, 0.45))',
              },
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: '0.88rem', color: colors.muted, lineHeight: 1.65 }}>
            I agree that after payment, my ticket amount{' '}
            <Box component="span" sx={{ fontWeight: 800, color: colors.gold }}>
              cannot be refunded
            </Box>
            .
          </Typography>
        }
        sx={{ alignItems: 'flex-start', m: 0, gap: 0.75 }}
      />
    </Box>
  )
}
