import TextField from '@mui/material/TextField'

export function sanitizeAadhaar(value) {
  return String(value ?? '').replace(/\D/g, '').slice(0, 12)
}

const aadhaarSlotProps = {
  htmlInput: {
    inputMode: 'numeric',
    maxLength: 12,
    pattern: '[0-9]{12}',
  },
}

export default function AadhaarNumberField({ value, onChange, name, ...props }) {
  const handleChange = (event) => {
    const nextValue = sanitizeAadhaar(event.target.value)
    onChange?.({
      ...event,
      target: { ...event.target, value: nextValue, name: event.target.name || name },
    })
  }

  return (
    <TextField
      required
      name={name}
      placeholder="Aadhaar Card Number"
      value={value ?? ''}
      onChange={handleChange}
      fullWidth
      slotProps={aadhaarSlotProps}
      {...props}
    />
  )
}
