export const colors = {
  bg: '#FFFDF8',
  bgSoft: '#FFF6E8',
  violet: '#C98B2E',
  violetLight: '#E8B85A',
  marigold: '#C4A035',
  marigoldSoft: '#D4AF37',
  gold: '#B8860B',
  coral: '#B85C3A',
  teal: '#8B6B2E',
  ivory: '#2C1F10',
  muted: '#6B5A45',
  regBrown: '#6F5734',
  regGold: '#B77900',
  heroCream: '#FFFDF5',
}

export const gradients = {
  primary: `linear-gradient(135deg, ${colors.marigold}, ${colors.coral})`,
  heroText: `linear-gradient(135deg, ${colors.marigoldSoft}, ${colors.coral} 55%, ${colors.teal})`,
  progress: `linear-gradient(90deg, ${colors.marigold}, ${colors.coral}, ${colors.teal})`,
  brand: `linear-gradient(135deg, ${colors.marigold}, ${colors.coral})`,
  regWrap: 'linear-gradient(165deg, #FFF4D6, #F8E7B8)',
  featuredPass: `linear-gradient(160deg, ${colors.violet}, ${colors.bgSoft})`,
}
