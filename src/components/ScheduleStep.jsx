import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import { colors } from '../constants/colors'
import { registrationBackButtonSx } from '../constants/registrationFormTheme'
import { buildDefaultSlotSelection, buildSlotSelection, formatShowTimeRange } from '../utils/schedule'

const accentFestive = '#E05040'
const ui = {
  card: colors.bgCard,
  surfaceMuted: colors.bgWarm,
  text: colors.textLight,
  muted: colors.muted,
  border: colors.border,
}

function SelectionSummary({ selection }) {
  const chips = [selection?.dateLabel, selection?.venueName, selection?.showLabel].filter(Boolean)

  return (
    <Box
      sx={{
        bgcolor: 'rgba(255, 236, 179, 0.35)',
        border: `1px solid ${accentFestive}55`,
        borderRadius: '12px',
        p: 1.5,
        mb: 2.5,
      }}
    >
      <Typography
        sx={{
          fontSize: '0.68rem',
          fontWeight: 800,
          letterSpacing: '0.08em',
          color: ui.muted,
          mb: 1,
        }}
      >
        YOUR SELECTION
      </Typography>
      <Stack direction="row" useFlexGap gap={0.75} sx={{ mb: selection?.timeLabel ? 0.75 : 0, flexWrap: 'wrap' }}>
        {chips.map((chip) => (
          <Box
            key={chip}
            sx={{
              px: 1.1,
              py: 0.45,
              borderRadius: '50px',
              bgcolor: ui.card,
              border: `1px solid ${ui.border}`,
              fontSize: '0.78rem',
              fontWeight: 600,
              color: ui.text,
            }}
          >
            {chip}
          </Box>
        ))}
      </Stack>
      {selection?.timeLabel && (
        <Typography sx={{ fontSize: '0.82rem', color: ui.muted, fontWeight: 600 }}>
          {selection.timeLabel}
        </Typography>
      )}
    </Box>
  )
}

function SectionLabel({ children }) {
  return (
    <Typography
      sx={{
        fontSize: '0.68rem',
        fontWeight: 800,
        letterSpacing: '0.08em',
        color: ui.muted,
        mb: 1,
      }}
    >
      {children}
    </Typography>
  )
}

function SelectableCard({ selected, onClick, disabled, children, sx = {} }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        width: '100%',
        px: 1.5,
        py: 1.35,
        borderRadius: '12px',
        border: selected ? `2px solid ${accentFestive}` : `1px solid ${ui.border}`,
        bgcolor: selected ? 'rgba(201, 139, 46, 0.12)' : ui.card,
        color: ui.text,
        textTransform: 'none',
        boxShadow: selected ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          bgcolor: selected ? 'rgba(201, 139, 46, 0.16)' : ui.surfaceMuted,
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  )
}

export default function ScheduleStep({
  schedule,
  loading,
  error,
  selection,
  onSelectionChange,
  defaultNightId,
  onBack,
  onContinue,
}) {
  useEffect(() => {
    if (!schedule || selection?.eventSlotId) return
    const defaults = buildDefaultSlotSelection(schedule, defaultNightId)
    if (defaults) onSelectionChange(defaults)
  }, [schedule, selection?.eventSlotId, defaultNightId, onSelectionChange])

  const handleDateSelect = (date) => {
    if (!schedule || date.registration_disabled || date.status !== 'active') return
    const venueId = selection?.eventVenueId ?? schedule.venues[0]?.id
    const showId = selection?.eventShowId ?? schedule.shows[0]?.id
    if (!venueId || !showId) return
    onSelectionChange(
      buildSlotSelection(schedule, {
        eventDateId: date.id,
        eventVenueId: venueId,
        eventShowId: showId,
      }),
    )
  }

  const handleVenueSelect = (venue) => {
    if (!schedule || !selection?.eventDateId) return
    const showId = selection?.eventShowId ?? schedule.shows[0]?.id
    if (!showId) return
    onSelectionChange(
      buildSlotSelection(schedule, {
        eventDateId: selection.eventDateId,
        eventVenueId: venue.id,
        eventShowId: showId,
      }),
    )
  }

  const handleShowSelect = (show) => {
    if (!schedule || !selection?.eventDateId || !selection?.eventVenueId) return
    onSelectionChange(
      buildSlotSelection(schedule, {
        eventDateId: selection.eventDateId,
        eventVenueId: selection.eventVenueId,
        eventShowId: show.id,
      }),
    )
  }

  if (loading) {
    return (
      <Stack spacing={2} sx={{ py: 4, alignItems: 'center' }}>
        <CircularProgress size={28} sx={{ color: accentFestive }} />
        <Typography sx={{ fontSize: '0.88rem', color: ui.muted }}>Loading schedule…</Typography>
      </Stack>
    )
  }

  if (error) {
    return (
      <Stack spacing={2}>
        <Typography sx={{ fontSize: '0.88rem', color: '#ef4444', textAlign: 'center' }}>{error}</Typography>
        <Button onClick={onBack} startIcon={<ChevronLeftRoundedIcon />} sx={registrationBackButtonSx}>
          Back
        </Button>
      </Stack>
    )
  }

  if (!schedule) return null

  const canContinue = Boolean(selection?.eventSlotId)

  return (
    <Stack spacing={2.5}>
      <SelectionSummary selection={selection} />

      <Box>
        <SectionLabel>DATE</SectionLabel>
        <Grid container spacing={1}>
          {schedule.dates.map((date) => {
            const isSelected = selection?.eventDateId === date.id
            const isDisabled = date.registration_disabled || date.status !== 'active'
            return (
              <Grid key={date.id} size={{ xs: 6, sm: 4, md: 2.4 }}>
                <SelectableCard
                  selected={isSelected}
                  disabled={isDisabled}
                  onClick={() => handleDateSelect(date)}
                  sx={{ minHeight: 74, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: ui.text, lineHeight: 1.3 }}>
                    {date.label}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: ui.muted, mt: 0.35 }}>
                    {date.date}
                  </Typography>
                </SelectableCard>
              </Grid>
            )
          })}
        </Grid>
      </Box>

      <Box>
        <SectionLabel>VENUE</SectionLabel>
        <Stack spacing={1}>
          {schedule.venues.map((venue) => (
            <SelectableCard
              key={venue.id}
              selected={selection?.eventVenueId === venue.id}
              onClick={() => handleVenueSelect(venue)}
            >
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: ui.text }}>
                {venue.venue?.name}
              </Typography>
              <Typography sx={{ fontSize: '0.78rem', color: ui.muted, mt: 0.35, whiteSpace: 'pre-line' }}>
                {[venue.venue?.address, venue.venue?.city].filter(Boolean).join(', ')}
              </Typography>
            </SelectableCard>
          ))}
        </Stack>
      </Box>

      <Box>
        <SectionLabel>SHOW / TIME</SectionLabel>
        <Stack spacing={1}>
          {schedule.shows.map((show) => (
            <SelectableCard
              key={show.id}
              selected={selection?.eventShowId === show.id}
              onClick={() => handleShowSelect(show)}
            >
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: ui.text }}>
                {show.show_name || show.name}
              </Typography>
              <Typography sx={{ fontSize: '0.78rem', color: ui.muted, mt: 0.35 }}>
                {formatShowTimeRange(show)}
              </Typography>
            </SelectableCard>
          ))}
        </Stack>
      </Box>

      <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1.5} sx={{ pt: 0.5 }}>
        <Button
          onClick={onBack}
          startIcon={<ChevronLeftRoundedIcon />}
          sx={registrationBackButtonSx}
        >
          Back
        </Button>
        <Button
          onClick={onContinue}
          disabled={!canContinue}
          sx={{
            flex: { xs: 1, sm: 2 },
            py: 1.5,
            minHeight: 48,
            borderRadius: '8px',
            background: accentFestive,
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9375rem',
            textTransform: 'none',
            '&:hover': { background: '#b07a28' },
            '&.Mui-disabled': { bgcolor: '#ccc', color: '#fff' },
          }}
        >
          Continue
        </Button>
      </Stack>
    </Stack>
  )
}
