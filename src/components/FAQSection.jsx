import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import { SectionHead } from './shared'
import { colors, gradients } from '../constants/colors'

const faqs = [
  {
    q: 'What are the event dates and timings?',
    a: 'MGM Cultural Navratri runs from October 11 to October 20, 2026. Gates open at 7:30 PM every night, and the celebrations continue until 1:00 AM.',
  },
  {
    q: 'Where is the event held?',
    a: 'The event takes place at Seasons Hotel, Rajkot, Gujarat. The venue features a dedicated Garba ground, VIP lounge, food court, and ample parking.',
  },
  {
    q: 'What types of passes are available?',
    a: 'We offer Daily Passes (₹499/stag) for individual nights and a Seasonal Pass (₹2,999/person) that grants entry to all 10 nights with priority access and reserved seating.',
  },
  {
    q: 'Can I buy a pass at the venue?',
    a: 'Yes, but passes often sell out in advance — especially for themed nights like Rangeeli Raat and the Grand Finale. Online booking is recommended.',
  },
  {
    q: 'Is there a couple pass?',
    a: 'Yes! The Couple Pass (₹899/night) includes entry for two, reserved couple seating, and a complimentary mocktail coupon.',
  },
  {
    q: 'What should I bring to the event?',
    a: 'Your QR pass (digital or printed), a valid ID for verification, and comfortable clothing for dancing. Dandiya sticks are available at the venue or you can bring your own.',
  },
  {
    q: 'Is food available inside?',
    a: 'Yes — the Food Court offers a variety of snacks, meals, beverages, and traditional Gujarati fare. Handicraft stalls are also set up around the venue.',
  },
  {
    q: 'Is the venue wheelchair accessible?',
    a: 'Yes, Seasons Hotel is equipped with ramps and accessible pathways. Please contact us in advance so we can assist with seating arrangements.',
  },
]

function AccordionItem({ question, answer, open, onToggle }) {
  return (
    <Box
      sx={{
        borderBottom: '1px solid rgba(255, 179, 0, 0.08)',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Box
        onClick={onToggle}
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2,
          py: { xs: 1.75, md: 2 },
          cursor: 'pointer',
          transition: 'color 0.2s ease, padding-left 0.2s ease',
          pl: open ? 1 : 0,
          '&:hover': { color: colors.gold, pl: 1 },
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '0.92rem', color: 'inherit', flex: 1, lineHeight: 1.4 }}>
          {question}
        </Typography>
        <Box sx={{ width: 30, height: 30, borderRadius: '50%', bgcolor: open ? gradients.primary : 'rgba(255, 179, 0, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.25s ease', boxShadow: open ? '0 4px 14px rgba(234, 90, 0, 0.35)' : 'none' }}>
          {open ? <RemoveRoundedIcon sx={{ color: '#fff', fontSize: '0.85rem' }} /> : <AddRoundedIcon sx={{ color: colors.gold, fontSize: '0.85rem' }} />}
        </Box>
      </Box>
      <Box
        sx={{
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, opacity 0.25s ease, padding 0.3s ease',
          maxHeight: open ? 300 : 0,
          opacity: open ? 1 : 0,
          pb: open ? 1.5 : 0,
        }}
      >
        <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255, 248, 240, 0.72)', lineHeight: 1.7 }}>
          {answer}
        </Typography>
      </Box>
    </Box>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <Box component="section" id="faq" sx={{ py: { xs: 5, md: 7 }, position: 'relative', overflow: 'hidden', bgcolor: colors.bgSoft }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 2.5, md: 3 }, position: 'relative', zIndex: 1 }}>
        <SectionHead
          eyebrow="FAQs"
          title="Frequently Asked Questions"
          description="Everything you need to know about MGM Cultural Navratri 2026."
        />
        <Box sx={{ bgcolor: 'rgba(26, 8, 0, 0.85)', borderRadius: '16px', border: '1px solid rgba(255, 179, 0, 0.15)', boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25), 0 0 20px rgba(255, 179, 0, 0.04)', px: { xs: 2, md: 3 }, backdropFilter: 'blur(8px)' }}>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} question={faq.q} answer={faq.a} open={openIndex === i} onToggle={() => toggle(i)} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}
