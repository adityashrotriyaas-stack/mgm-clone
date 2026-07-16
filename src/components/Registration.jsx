import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Eyebrow, RevealBox } from './shared'
import { colors, gradients } from '../constants/colors'
import { visualOnlyCtaProps } from '../constants/visualOnlyCta'
import { passTypeOptions, registrationCategories } from '../data/siteData'
import MobileNumberField from './MobileNumberField'
import AadhaarNumberField from './AadhaarNumberField'

const categoryKeys = ['male', 'female', 'couple']

export default function Registration() {
  const [category, setCategory] = useState('male')
  const [passType, setPassType] = useState('')
  const [mobile, setMobile] = useState('')
  const [aadhaar, setAadhaar] = useState('')
  const selected = registrationCategories[category]

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Box component="section" id="register" sx={{ py: 6.25 }}>
      <RevealBox
        sx={{
          background: gradients.regWrap,
          borderRadius: '24px',
          mx: 2.25,
          px: { xs: 2.5, lg: 6.25 },
          py: { xs: 3.75, lg: 5.75 },
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,178,62,0.18), transparent 70%)',
            top: -90,
            right: -90,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', mb: 2.75 }}>
          <Eyebrow>Enquire Now</Eyebrow>
          <Typography
            variant="h2"
            sx={{ color: colors.ivory, fontSize: '1.6rem' }}
          >
            Reserve Your Spot
          </Typography>
          <Typography sx={{ fontSize: '0.87rem', color: colors.regBrown, mt: 0.75 }}>
            Pick a category — pricing and perks update instantly.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 4.5,
            alignItems: 'start',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1.3fr' },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                bgcolor: 'rgba(255,255,255,0.45)',
                borderRadius: '30px',
                p: 0.6,
                mb: 2.5,
                border: '1px solid rgba(139,107,46,0.18)',
              }}
            >
              {categoryKeys.map((key) => (
                <Button
                  key={key}
                  role="tab"
                  aria-selected={category === key}
                  onClick={() => setCategory(key)}
                  sx={{
                    flex: 1,
                    py: 1.25,
                    borderRadius: '24px',
                    color: category === key ? '#fff' : colors.regBrown,
                    background: category === key ? gradients.button : 'transparent',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'capitalize',
                    '&:hover': {
                      background: category === key ? gradients.button : 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  {key}
                </Button>
              ))}
            </Stack>

            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(139,107,46,0.18)',
                borderRadius: '18px',
                p: 2.5,
              }}
            >
              <Eyebrow>{selected.eyebrow}</Eyebrow>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: colors.ivory }}>
                {selected.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Unbounded", sans-serif',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: colors.regGold,
                  my: 1,
                }}
              >
                {selected.price}{' '}
                <Box
                  component="span"
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: colors.regBrown,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  {selected.priceUnit}
                </Box>
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.85rem', color: colors.regBrown }}>
                {selected.perks.map((perk) => (
                  <Box
                    component="li"
                    key={perk}
                    sx={{
                      py: 0.75,
                      pl: 2.75,
                      position: 'relative',
                      '&::before': {
                        content: '"✦"',
                        position: 'absolute',
                        left: 0,
                        color: colors.teal,
                        fontSize: '0.8rem',
                      },
                    }}
                  >
                    {perk}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'grid',
              gap: 1.5,
              '& .MuiOutlinedInput-root': {
                bgcolor: '#FFF9EA',
                color: colors.ivory,
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: 'rgba(139,107,46,0.25)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(139,107,46,0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.teal,
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: colors.regBrown,
                opacity: 1,
              },
              '& .MuiInputAdornment-root': { mr: 0.5 },
            }}
          >
            <TextField required placeholder="Full Name" fullWidth />
            <MobileNumberField value={mobile} onChange={(event) => setMobile(event.target.value)} />
            <TextField required placeholder="Email Address" type="email" fullWidth />
            <AadhaarNumberField value={aadhaar} onChange={(event) => setAadhaar(event.target.value)} />
            <FormControl fullWidth required>
              <Select
                value={passType}
                onChange={(event) => setPassType(event.target.value)}
                displayEmpty
                renderValue={(value) =>
                  value ? value : <Box sx={{ color: colors.regBrown }}>Select Pass Type</Box>
                }
                inputProps={{ 'aria-label': 'Select Pass Type' }}
                sx={{
                  bgcolor: '#FFF9EA',
                  color: passType ? colors.ivory : colors.regBrown,
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(139,107,46,0.25)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(139,107,46,0.4)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.teal,
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select Pass Type
                </MenuItem>
                {passTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              type="number"
              placeholder="Number of Tickets"
              inputProps={{ min: 1, max: 10 }}
              fullWidth
            />
            <Button
              type="button"
              {...visualOnlyCtaProps({
                mt: 1,
                py: 1.9,
                borderRadius: '14px',
                background: gradients.button,
                color: '#3A1C00',
                fontWeight: 800,
                fontSize: '1rem',
              })}
              fullWidth
            >
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      </RevealBox>
    </Box>
  )
}
