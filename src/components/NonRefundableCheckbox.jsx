import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { colors } from '../constants/colors'

export default function NonRefundableCheckbox({ checked, onChange }) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: '10px',
        bgcolor: colors.bgWarm,
        border: `1px solid ${colors.border}`,
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            sx={{
              color: colors.gold,
              pt: 0.25,
              '&.Mui-checked': { color: colors.gold },
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: '0.88rem', color: colors.muted, lineHeight: 1.6 }}>
            I agree that after payment, my ticket amount{' '}
            <Box component="span" sx={{ fontWeight: 700, color: colors.textLight }}>
              cannot be refunded
            </Box>
            .
          </Typography>
        }
        sx={{ alignItems: 'flex-start', m: 0, gap: 0.5 }}
      />
    </Box>
  )
}
