export const colors = {
  bg: '#FFFDF8',
  bgSoft: '#FFF6E8',
  bgWarm: '#FFF8ED',
  violet: '#C98B2E',
  violetLight: '#E8B85A',
  marigold: '#C4A035',
  marigoldSoft: '#D4AF37',
  gold: '#B8860B',
  coral: '#B85C3A',
  coralLight: '#D97A56',
  teal: '#8B6B2E',
  ivory: '#2C1F10',
  muted: '#6B5A45',
  mutedLight: '#8C7B66',
  regBrown: '#6F5734',
  regGold: '#B77900',
  heroCream: '#FFFDF5',
  glass: 'rgba(255, 247, 230, 0.85)',
  glassBorder: 'rgba(184, 134, 11, 0.10)',
  glow: 'rgba(212, 175, 55, 0.20)',
  glowStrong: 'rgba(212, 175, 55, 0.35)',
  shadow: 'rgba(44, 31, 16, 0.08)',
  shadowStrong: 'rgba(44, 31, 16, 0.18)',
  success: '#22c55e',
  successBg: 'rgba(34, 197, 94, 0.10)',
}

export const gradients = {
  primary: `linear-gradient(135deg, ${colors.marigold}, ${colors.coral})`,
  primaryReversed: `linear-gradient(135deg, ${colors.coral}, ${colors.marigold})`,
  heroText: `linear-gradient(135deg, ${colors.marigoldSoft}, ${colors.coral} 55%, ${colors.teal})`,
  progress: `linear-gradient(90deg, ${colors.marigold}, ${colors.coral}, ${colors.teal})`,
  brand: `linear-gradient(135deg, ${colors.marigold}, ${colors.coral})`,
  regWrap: 'linear-gradient(165deg, #FFF4D6, #F8E7B8)',
  featuredPass: `linear-gradient(160deg, ${colors.violet}, ${colors.bgSoft})`,
  warmGlow: `radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)`,
  heroBg: `linear-gradient(180deg, ${colors.heroCream} 0%, ${colors.bgWarm} 50%, ${colors.bg} 100%)`,
}

export const keyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes rotateSlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes equalizer {
    0% { height: 4px; }
    100% { height: 16px; }
  }
  @keyframes confettiFall {
    0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes scaleIn {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`
