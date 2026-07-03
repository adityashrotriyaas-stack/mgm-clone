import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { RevealBox, SectionHead } from './shared'
import { colors, gradients } from '../constants/colors'
import { passOptions } from '../data/siteData'

function PassCard({ data, cardRef, onBook }) {
  const isFeatured = data.featured
  return (
    <Box ref={cardRef} sx={{ bgcolor: colors.bgSoft, border: isFeatured ? `1px solid ${colors.marigold}` : '1px solid rgba(184,134,11,0.10)', borderRadius: '20px', p: { xs: 2, md: 2.5 }, position: 'relative', overflow: 'hidden', transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.35s ease', '@media (hover: hover)': { '&:hover': { transform: 'translateY(-4px)', borderColor: isFeatured ? colors.marigold : 'rgba(184,134,11,0.25)', boxShadow: '0 20px 40px rgba(44,31,16,0.10)' } } }}>
      {isFeatured && (
        <Box sx={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, borderRadius: '0 0 0 100%', background: 'radial-gradient(circle at top right, rgba(212,175,55,0.20), transparent 68%)' }} />
      )}
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: isFeatured ? colors.marigold : colors.muted, mb: 0.75 }}>{data.eyebrow}</Typography>
      <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.15rem', md: '1.25rem' }, color: colors.ivory, mb: 1.5 }}>{data.title}</Typography>
      <Typography sx={{ fontFamily: '"Unbounded", sans-serif', fontWeight: 800, fontSize: '2rem', color: isFeatured ? colors.gold : colors.ivory, mb: 0.75, lineHeight: 1 }}>
        {data.price}
        <Box component="span" sx={{ fontSize: '0.8rem', fontWeight: 500, color: colors.muted, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{data.priceUnit}</Box>
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, my: 1.75, fontSize: '0.85rem', color: colors.muted }}>
        {data.perks.map((perk) => (
          <Stack key={perk} direction="row" spacing={0.75} sx={{ py: 0.5, alignItems: 'center' }}>
            <CheckRoundedIcon sx={{ fontSize: '0.85rem', color: colors.teal, flexShrink: 0 }} />
            <Box component="li">{perk}</Box>
          </Stack>
        ))}
      </Box>
      <Button onClick={() => onBook()} fullWidth sx={{
        py: 1.6, borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
        ...(data.ghost
          ? { border: `1px solid ${colors.gold}`, color: colors.gold, bgcolor: 'transparent', '&:hover': { bgcolor: 'rgba(184,134,11,0.06)' } }
          : { background: gradients.primary, color: '#fff', boxShadow: '0 8px 20px rgba(184,134,11,0.22)', '&:hover': { background: gradients.primaryReversed, transform: 'translateY(-1px)' } }
        ),
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
      }}>
        {data.cta}
      </Button>
    </Box>
  )
}

export default function Passes() {
  const navigate = useNavigate()
  const featuredRef = useRef(null)
  const [activeTab, setActiveTab] = useState('daily')
  const passData = passOptions[activeTab] || passOptions.daily
  const passes = [passData]

  return (
    <Box component="section" id="passes" sx={{ py: { xs: 5, md: 6.25 }, background: `linear-gradient(180deg, ${colors.heroCream} 0%, ${colors.bg} 100%)` }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4 } }}>
        <SectionHead eyebrow="Choose Your Pass" title="Plans & Pricing" description="Pick the pass that fits your Navratri plans — daily entry or the full 10-night experience." />
        <Stack direction="row" spacing={0.75} sx={{ mb: 3, justifyContent: 'center' }}>
          {Object.keys(passOptions).map((key) => (
            <Button key={key} onClick={() => setActiveTab(key)} sx={{
              px: 2.5, py: 0.9, borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'capitalize',
              background: activeTab === key ? gradients.primary : 'transparent',
              color: activeTab === key ? '#fff' : colors.muted,
              border: activeTab === key ? 'none' : `1px solid ${colors.glassBorder}`,
              transition: 'all 0.2s',
              '&:hover': { background: activeTab === key ? gradients.primary : colors.bgSoft },
            }}>
              {key === 'daily' ? 'Daily Pass' : 'Seasonal Pass'}
            </Button>
          ))}
        </Stack>
        <RevealBox sx={{ display: 'grid', gap: 2.25, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, alignItems: 'stretch' }}>
          {passes.map((pass, index) => (
            <PassCard key={pass.title} data={pass} cardRef={pass.featured ? featuredRef : null} onBook={() => navigate('/event/1')} />
          ))}
        </RevealBox>
      </Container>
    </Box>
  )
}
