import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined'
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined'
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import InputAdornment from '@mui/material/InputAdornment'
import { Eyebrow, RevealBox } from './shared'
import { colors, gradients } from '../constants/colors'
import { passTypeOptions, registrationCategories } from '../data/siteData'

const categoryKeys = ['male', 'female', 'couple']

const categoryIcons = {
  male: MaleOutlinedIcon,
  female: FemaleOutlinedIcon,
  couple: GroupsOutlinedIcon,
}

const categoryLabels = {
  male: 'Male',
  female: 'Female',
  couple: 'Couple',
}

function DecorativeOrb({ size, top, left, right, bottom, delay = 0 }) {
  return (
    <Box sx={{ position: 'absolute', width: size, height: size, borderRadius: '50%', top, left, right, bottom, background: `radial-gradient(circle, ${colors.marigold}10, transparent 70%)`, animation: `float ${7}s ease-in-out infinite`, animationDelay: `${delay}s`, pointerEvents: 'none', zIndex: 0 }} />
  )
}

function RangoliDot({ top, left, right, size = 6, delay = 0 }) {
  return (
    <Box sx={{ position: 'absolute', width: size, height: size, borderRadius: '50%', top, left, right, background: colors.glow, animation: `pulseGlow ${3 + delay}s ease-in-out infinite`, animationDelay: `${delay}s`, pointerEvents: 'none', zIndex: 0 }} />
  )
}

export default function Registration() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('male')
  const [passType, setPassType] = useState('')
  const selected = registrationCategories[category]

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/event/1')
  }

  return (
    <Box component="section" id="register" sx={{ py: 7.5, px: { xs: 2, sm: 2.5, md: 0 }, position: 'relative', overflow: 'hidden', background: `linear-gradient(180deg, ${colors.heroCream} 0%, ${colors.bg} 100%)` }}>
      <DecorativeOrb size={500} top="-150px" left="-100px" delay={0} />
      <DecorativeOrb size={350} bottom="-120px" right="-80px" delay={1.5} />
      <RangoliDot top="12%" left="8%" delay={0} />
      <RangoliDot top="35%" right="12%" delay={0.8} size={8} />
      <RangoliDot bottom="25%" left="18%" delay={1.6} size={5} />
      <RangoliDot top="60%" right="5%" delay={2.4} />
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.03, backgroundImage: `radial-gradient(circle at 20% 30%, ${colors.gold} 1px, transparent 1px), radial-gradient(circle at 80% 70%, ${colors.gold} 1px, transparent 1px)`, backgroundSize: '60px 60px, 80px 80px', backgroundPosition: '0 0, 40px 20px' }} />

      <RevealBox
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          background: gradients.regWrap,
          borderRadius: '28px',
          px: { xs: 2.5, lg: 5 },
          py: { xs: 3.75, lg: 5.5 },
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(184,134,11,0.12)',
          boxShadow: '0 20px 60px rgba(44,31,16,0.10)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: gradients.primary,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,178,62,0.15), transparent 70%)',
            bottom: -100,
            right: -80,
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ position: 'absolute', top: -40, right: 40, width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(184,134,11,0.10)', pointerEvents: 'none', zIndex: 0 }} />
        <Box sx={{ position: 'absolute', bottom: 60, left: 30, width: 50, height: 50, borderRadius: '50%', border: '2px solid rgba(184,134,11,0.08)', pointerEvents: 'none', zIndex: 0 }} />

        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', mb: 3 }}>
          <Eyebrow>Book Now</Eyebrow>
          <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: colors.ivory, fontSize: { xs: '1.5rem', md: '1.8rem' }, mt: 0.5 }}>
            Reserve Your Spot
          </Typography>
          <Typography sx={{ fontSize: '0.87rem', color: colors.regBrown, mt: 0.75, maxWidth: 400, mx: 'auto' }}>
            Pick a category and pass type — pricing updates instantly.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gap: 4, alignItems: 'start', gridTemplateColumns: { xs: '1fr', lg: '1fr 1.25fr' }, position: 'relative', zIndex: 1 }}>
          <Box>
            <Stack direction="row" spacing={0.75} sx={{ bgcolor: 'rgba(255,255,255,0.50)', borderRadius: '30px', p: 0.5, mb: 2.5, border: '1px solid rgba(139,107,46,0.15)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)' }}>
              {categoryKeys.map((key) => {
                const Icon = categoryIcons[key]
                return (
                  <Button
                    key={key}
                    role="tab"
                    aria-selected={category === key}
                    onClick={() => setCategory(key)}
                    startIcon={<Icon sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />}
                    sx={{
                      flex: 1,
                      py: 1.15,
                      borderRadius: '24px',
                      color: category === key ? '#fff' : colors.ivory,
                      background: category === key ? gradients.primary : 'transparent',
                      fontWeight: 700,
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      textTransform: 'capitalize',
                      boxShadow: category === key ? '0 4px 14px rgba(184,134,11,0.25)' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                      '&:hover': { background: category === key ? gradients.primary : 'rgba(255,255,255,0.5)', transform: category === key ? 'none' : 'translateY(-1px)' },
                    }}
                  >
                    {categoryLabels[key]}
                  </Button>
                )
              })}
            </Stack>

            <Box sx={{
              bgcolor: 'rgba(255,255,255,0.50)',
              border: '1px solid rgba(139,107,46,0.15)',
              borderRadius: '20px',
              p: 2.5,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(44,31,16,0.04)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `radial-gradient(ellipse at 30% 0%, ${colors.coral}08, transparent 60%)`,
                pointerEvents: 'none',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: gradients.primary,
                borderRadius: '0 0 3px 3px',
              },
            }}>
              <Box sx={{ position: 'absolute', top: -8, right: -8, width: 60, height: 60, borderRadius: '50%', background: `radial-gradient(circle, ${colors.marigold}12, transparent 70%)` }} />
              <Eyebrow>{selected.eyebrow}</Eyebrow>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: colors.ivory, mb: 1.5 }}>{selected.title}</Typography>
              <Box sx={{
                display: 'inline-block',
                background: `linear-gradient(135deg, ${colors.regGold}, ${colors.marigoldSoft})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: '"Unbounded", sans-serif',
                fontSize: '2rem',
                fontWeight: 800,
                mb: 1.5,
              }}>
                {selected.price}
              </Box>
              <Box component="span" sx={{ fontSize: '0.8rem', fontWeight: 500, color: colors.regBrown, fontFamily: '"Plus Jakarta Sans", sans-serif', ml: 0.5 }}>
                {selected.priceUnit}
              </Box>
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, fontSize: '0.85rem', color: colors.regBrown }}>
                {selected.perks.map((perk) => (
                  <Stack key={perk} direction="row" spacing={0.75} alignItems="center" sx={{ py: 0.65 }}>
                    <StarRoundedIcon sx={{ fontSize: '0.8rem', color: colors.gold, flexShrink: 0 }} />
                    <Box component="li">{perk}</Box>
                  </Stack>
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
              position: 'relative',
              bgcolor: 'rgba(255,255,255,0.35)',
              borderRadius: '20px',
              p: { xs: 2, md: 2.5 },
              border: '1px solid rgba(139,107,46,0.10)',
              backdropFilter: 'blur(4px)',
              '& .MuiOutlinedInput-root': {
                bgcolor: colors.bg,
                color: colors.ivory,
                borderRadius: '12px',
                transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                '& fieldset': { borderColor: 'rgba(139,107,46,0.20)' },
                '&:hover fieldset': { borderColor: 'rgba(139,107,46,0.35)' },
                '&.Mui-focused fieldset': { borderColor: colors.gold, borderWidth: '2px' },
                '&.Mui-focused': { boxShadow: '0 0 0 4px rgba(184,134,11,0.08)' },
              },
              '& .MuiInputBase-input::placeholder': { color: colors.regBrown, opacity: 1 },
            }}
          >
            <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: colors.ivory, fontSize: '1.05rem', mb: 0.25 }}>
              Your Details
            </Typography>
            <TextField required placeholder="Full Name" fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonOutlineOutlinedIcon sx={{ color: colors.gold, fontSize: '1.1rem' }} /></InputAdornment> } }} />
            <TextField required placeholder="Mobile Number" type="tel" fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon sx={{ color: colors.gold, fontSize: '1.1rem' }} /></InputAdornment> } }} />
            <TextField required placeholder="Email Address" type="email" fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ color: colors.gold, fontSize: '1.1rem' }} /></InputAdornment> } }} />
            <TextField required placeholder="Aadhaar Card Number" fullWidth slotProps={{ htmlInput: { inputMode: 'numeric', pattern: '[0-9]{12}', maxLength: 12 }, input: { startAdornment: <InputAdornment position="start"><BadgeOutlinedIcon sx={{ color: colors.gold, fontSize: '1.1rem' }} /></InputAdornment> } }} />

            <Box sx={{ height: '1px', background: `linear-gradient(90deg, transparent, ${colors.glassBorder}, transparent)`, my: 0.25 }} />

            <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: colors.ivory, fontSize: '1.05rem' }}>Pass Details</Typography>
            <FormControl fullWidth required>
              <Select
                value={passType}
                onChange={(event) => setPassType(event.target.value)}
                displayEmpty
                renderValue={(value) => value ? value : <Box sx={{ color: colors.regBrown }}>Select Pass Type</Box>}
                inputProps={{ 'aria-label': 'Select Pass Type' }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><ConfirmationNumberOutlinedIcon sx={{ color: colors.gold, fontSize: '1.1rem' }} /></InputAdornment> } }}
                sx={{
                  bgcolor: colors.bg,
                  color: passType ? colors.ivory : colors.regBrown,
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(139,107,46,0.20)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(139,107,46,0.35)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.gold, borderWidth: '2px' },
                }}
              >
                <MenuItem value="" disabled>Select Pass Type</MenuItem>
                {passTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField required type="number" placeholder="Number of Tickets" slotProps={{ htmlInput: { min: 1, max: 10 }, input: { startAdornment: <InputAdornment position="start"><NumbersOutlinedIcon sx={{ color: colors.gold, fontSize: '1.1rem' }} /></InputAdornment> } }} fullWidth />

            <Button
              type="submit"
              fullWidth
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                mt: 1,
                py: 1.9,
                borderRadius: '14px',
                background: gradients.primary,
                color: '#fff',
                fontWeight: 800,
                fontSize: '1rem',
                letterSpacing: '0.3px',
                boxShadow: '0 8px 24px rgba(184,134,11,0.25)',
                transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease',
                '&:hover': {
                  background: gradients.primaryReversed,
                  transform: 'translateY(-3px)',
                  boxShadow: '0 14px 32px rgba(184,134,11,0.35)',
                },
                '&:active': { transform: 'translateY(-1px)' },
              }}
            >
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      </RevealBox>
    </Box>
  )
}
