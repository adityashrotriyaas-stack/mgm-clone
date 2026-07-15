import { lazy, Suspense } from 'react'
import Box from '@mui/material/Box'

export function SectionFallback({ minHeight = 1 }) {
  return <Box sx={{ minHeight }} aria-hidden />
}

export function lazySection(importFn) {
  const LazyComponent = lazy(importFn)
  return function LazySection(props) {
    return (
      <Suspense fallback={<SectionFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

export const LazyUpcomingNightsTimeline = lazySection(() => import('./UpcomingNightsTimeline'))
export const LazyAboutSection = lazySection(() => import('./AboutSection'))
export const LazyBookingWorkflowSection = lazySection(() => import('./BookingWorkflowSection'))
export const LazyLegacySection = lazySection(() => import('./LegacySection'))
export const LazyPastNightsBlock = lazy(async () => {
  const mod = await import('./PastNights')
  return {
    default: function PastNightsBlock() {
      return (
        <>
          <mod.default />
          <mod.Footer />
        </>
      )
    },
  }
})
export const LazyContactSection = lazySection(() => import('./ContactSection'))
