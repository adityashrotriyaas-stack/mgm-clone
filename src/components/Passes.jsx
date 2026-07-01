import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { RevealBox, SectionHead } from './shared'
import { colors, gradients } from '../constants/colors'
import { passOptions } from '../data/siteData'

function PassCard({ type, data, cardRef, onBook }) {
  const isFeatured = data.featured

  return (
    <Box
      ref={cardRef}
      sx={{
        bgcolor: colors.bgSoft,
        border: isFeatured ? `1px solid ${colors.marigold}` : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        p: 3,
        position: 'relative',
        background: isFeatured ? gradients.featuredPass : colors.bgSoft,
        transition: '0.3s',
        '&:hover': {
          borderColor: isFeatured ? colors.marigold : 'rgba(30,217,197,0.4)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {data.ribbon && (
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            right: 18,
            background: gradients.primary,
            color: colors.bg,
            fontSize: '0.68rem',
            fontWeight: 800,
            px: 1.75,
            py: 0.75,
            borderRadius: '14px',
          }}
        >
          {data.ribbon}
        </Box>
      )}
      <Typography variant="h3" sx={{ fontSize: '1.1rem', mb: 1, color: colors.ivory }}>
        {data.title}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Unbounded", sans-serif',
          fontSize: '2rem',
          fontWeight: 700,
          color: isFeatured ? colors.regGold : colors.marigoldSoft,
          textShadow: isFeatured ? '0 1px 0 rgba(255,255,255,0.35)' : 'none',
          my: 1,
        }}
      >
        {data.price}{' '}
        <Box
          component="span"
          sx={{
            fontSize: '0.85rem',
            fontWeight: 400,
            color: isFeatured ? colors.ivory : colors.muted,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          }}
        >
          {data.priceUnit}
        </Box>
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, my: 1.75, fontSize: '0.85rem', color: colors.muted }}>
        {data.perks.map((perk) => (
          <Box
            component="li"
            key={perk}
            sx={{
              py: 0.75,
              pl: 2.75,
              position: 'relative',
              '&::before': {
                content: '"✓"',
                position: 'absolute',
                left: 0,
                color: colors.teal,
                fontWeight: 700,
              },
            }}
          >
            {perk}
          </Box>
        ))}
      </Box>
      <Button
        onClick={() => onBook()}
        fullWidth
        sx={{
          py: 1.6,
          ...(data.ghost
            ? {
                bgcolor: 'rgba(255,255,255,0.06)',
                color: colors.ivory,
                border: '1.5px solid rgba(255,255,255,0.18)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }
            : {
                background: gradients.primary,
                color: colors.bg,
                boxShadow: '0 10px 28px rgba(255,94,126,0.32)',
                '&:hover': { background: gradients.primary },
              }),
        }}
      >
        {data.cta}
      </Button>
    </Box>
  )
}

export default function Passes() {
  const navigate = useNavigate()
  const [activePass, setActivePass] = useState('daily')
  const dailyRef = useRef(null)
  const seasonalRef = useRef(null)

  const scrollToPass = (type) => {
    setActivePass(type)
    const target = type === 'daily' ? dailyRef.current : seasonalRef.current
    target?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <Box component="section" id="passes" sx={{ py: 6.25 }}>
      <Container maxWidth="lg">
        <SectionHead
          eyebrow="Choose Your Pass"
          title="Daily or Seasonal"
          description="Drop in for one special night, or lock in all ten for the best value."
        />
      </Container>

      <Box sx={{ px: 2.25 }}>
        <RevealBox
          sx={{
            display: 'flex',
            maxWidth: 320,
            mx: 'auto',
            mb: 3.5,
            bgcolor: colors.bgSoft,
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '30px',
            p: 0.6,
          }}
        >
          {['daily', 'seasonal'].map((type) => (
            <Button
              key={type}
              onClick={() => scrollToPass(type)}
              sx={{
                flex: 1,
                py: 1.4,
                borderRadius: '24px',
                color: activePass === type ? colors.bg : colors.muted,
                background: activePass === type ? gradients.primary : 'transparent',
                fontWeight: 700,
                fontSize: '0.85rem',
                '&:hover': {
                  background: activePass === type ? gradients.primary : 'rgba(255,255,255,0.04)',
                },
              }}
            >
              {type === 'daily' ? 'Daily Pass' : 'Seasonal Pass'}
            </Button>
          ))}
        </RevealBox>

        <RevealBox
          sx={{
            display: 'grid',
            gap: 2,
            maxWidth: 920,
            mx: 'auto',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          }}
        >
          <PassCard type="daily" data={passOptions.daily} cardRef={dailyRef} onBook={() => navigate('/event/1')} />
          <PassCard type="seasonal" data={passOptions.seasonal} cardRef={seasonalRef} onBook={() => navigate('/event/1')} />
        </RevealBox>
      </Box>
    </Box>
  )
}
