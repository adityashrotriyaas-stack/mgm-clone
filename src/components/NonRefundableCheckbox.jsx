import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

export default function NonRefundableCheckbox({ checked, onChange }) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: '10px',
        bgcolor: '#FFF9EA',
        border: '1px solid rgba(184, 134, 11, 0.2)',
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            sx={{
              color: '#B8860B',
              pt: 0.25,
              '&.Mui-checked': { color: '#B8860B' },
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: '0.88rem', color: '#444', lineHeight: 1.6 }}>
            I agree that after payment, my ticket amount{' '}
            <Box component="span" sx={{ fontWeight: 700, color: '#1F1F1F' }}>
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
