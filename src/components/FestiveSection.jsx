import Box from '@mui/material/Box'
import { sectionVariants } from '../constants/navratriTheme'

export default function FestiveSection({
  variant = 'cream',
  id,
  children,
  showAccent = true,
  component = 'section',
  sx,
  ...props
}) {
  const theme = sectionVariants[variant] || sectionVariants.cream

  return (
    <Box
      component={component}
      id={id}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: theme.color,
        background: theme.background,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: theme.pattern,
          backgroundSize: theme.patternSize,
          backgroundPosition: theme.patternPosition,
          pointerEvents: 'none',
        },
        ...(showAccent && {
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: theme.accent,
            opacity: variant === 'night' ? 0.5 : 0.7,
            pointerEvents: 'none',
          },
        }),
        ...sx,
      }}
      {...props}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  )
}
