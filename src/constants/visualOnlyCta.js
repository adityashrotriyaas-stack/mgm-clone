/** Keep CTA appearance; block navigation / registration actions. */
export function visualOnlyCtaProps(extraSx = {}) {
  return {
    component: 'div',
    role: 'presentation',
    tabIndex: -1,
    'aria-disabled': true,
    sx: {
      cursor: 'default',
      pointerEvents: 'none',
      ...extraSx,
    },
  }
}
