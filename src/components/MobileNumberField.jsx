import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { colors } from '../constants/colors'

export function sanitizeMobile(value) {
  return String(value ?? '').replace(/\D/g, '').slice(0, 10)
}

function buildMobileSlotProps(tone = 'default') {
  const isFestive = tone === 'festive'
  const codeColor = isFestive ? colors.gold : '#333'
  const dividerColor = isFestive ? colors.border : '#D8D8D8'

  return {
    input: {
      startAdornment: (
        <InputAdornment position="start" disablePointerEvents sx={{ mr: 1.25, height: 'auto', maxHeight: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Typography
              component="span"
              sx={{ fontWeight: 800, color: codeColor, fontSize: '0.95rem', lineHeight: 1 }}
            >
              +91
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: dividerColor, height: 22, alignSelf: 'center' }}
            />
          </Box>
        </InputAdornment>
      ),
    },
    htmlInput: {
      inputMode: 'numeric',
      maxLength: 10,
    },
  }
}

export default function MobileNumberField({ value, onChange, name, tone = 'default', ...props }) {
  const handleChange = (event) => {
    const nextValue = sanitizeMobile(event.target.value)
    onChange?.({
      ...event,
      target: { ...event.target, value: nextValue, name: event.target.name || name },
    })
  }

  return (
    <TextField
      required
      name={name}
      placeholder="Mobile Number"
      type="tel"
      value={value ?? ''}
      onChange={handleChange}
      fullWidth
      slotProps={buildMobileSlotProps(tone)}
      {...props}
    />
  )
}
