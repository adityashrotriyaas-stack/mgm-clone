export const navLinks = [
  { label: 'Home', href: '#home', active: true },
  { label: 'About', href: '#about' },
  { label: 'Schedule', href: '#upcoming', mobileLabel: 'Schedule' },
  { label: 'Highlights', href: '#past' },
  { label: 'Gallery', href: '#past', mobileLabel: 'Gallery' },
  { label: 'Contact', href: '#contact', mobileLabel: 'Contact' },
]

export const heroFeatures = [
  {
    icon: 'calendar',
    title: '10 Nights',
    subtitle: 'Non-stop Garba',
  },
  {
    icon: 'location',
    title: 'Premium Venue',
    subtitle: 'Spacious & Safe',
  },
  {
    icon: 'people',
    title: 'Live Performances',
    subtitle: 'Top Artists',
  },
  {
    icon: 'food',
    title: 'Food & Stalls',
    subtitle: 'Delicious Bites',
  },
]

export const stats = [
  { value: 25000, label: 'Dancers · 2025' },
  { value: 10, label: 'Nights' },
  { value: 50, label: 'Artists On Stage' },
]

export const nightTracker = [
  { night: 1, status: 'done' },
  { night: 2, status: 'done' },
  { night: 3, status: 'today' },
  { night: 4, status: 'upcoming' },
  { night: 5, status: 'upcoming' },
  { night: 6, status: 'upcoming' },
  { night: 7, status: 'upcoming' },
  { night: 8, status: 'upcoming' },
  { night: 9, status: 'upcoming' },
  { night: 10, status: 'upcoming' },
]

export const navratriNights = [
  { id: 1, label: 'Night 1', date: 'Oct 11, Sat', theme: 'Grand Opening' },
  { id: 2, label: 'Night 2', date: 'Oct 12, Sun', theme: 'Traditional Raas' },
  { id: 3, label: 'Night 3', date: 'Oct 13, Tue', theme: 'Rangeeli Raat' },
  { id: 4, label: 'Night 4', date: 'Oct 14, Wed', theme: 'Dhoom Dhamaka' },
  { id: 5, label: 'Night 5', date: 'Oct 15, Thu', theme: 'Bollywood Beats' },
  { id: 6, label: 'Night 6', date: 'Oct 16, Fri', theme: 'Folk Fusion' },
  { id: 7, label: 'Night 7', date: 'Oct 17, Sat', theme: 'Dandiya Dhamal' },
  { id: 8, label: 'Night 8', date: 'Oct 18, Sun', theme: 'Celebration Night' },
  { id: 9, label: 'Night 9', date: 'Oct 19, Mon', theme: 'Rhythm of Raas' },
  { id: 10, label: 'Night 10', date: 'Oct 20, Tue', theme: 'Maha Aarti & Finale' },
]

export const upcomingEvents = [
  {
    id: 1,
    title: 'Rangeeli Raat',
    badge: 'Selling Fast',
    night: 'Night 3',
    date: '🗓️ Oct 13, Tue',
    time: '🕰️ 7:30 PM',
    price: '₹499',
    priceUnit: '/ stag',
    image: 'https://images.unsplash.com/photo-1604608672516-f1a8f9b94c6f?w=600',
  },
  {
    id: 2,
    title: 'Dhoom Dhamaka',
    badge: 'Couple Special',
    night: 'Night 4',
    date: '🗓️ Oct 14, Wed',
    time: '🕰️ 7:30 PM',
    price: '₹899',
    priceUnit: '/ couple',
    image: 'https://images.unsplash.com/photo-1576487248805-cf45f6bdc67c?w=600',
  },
  {
    id: 3,
    title: 'Bollywood Beats',
    badge: 'Live DJ',
    night: 'Night 5',
    date: '🗓️ Oct 15, Thu',
    time: '🕰️ 7:30 PM',
    price: '₹599',
    priceUnit: '/ stag',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600',
  },
  {
    id: 4,
    title: 'Maha Aarti & Finale',
    badge: 'Grand Finale',
    night: 'Night 10',
    date: '🗓️ Oct 20, Tue',
    time: '🕰️ 7:00 PM',
    price: '₹1299',
    priceUnit: '/ stag',
    image: 'https://images.unsplash.com/photo-1572014652523-cb71e1f5e5d4?w=600',
  },
]

export const passOptions = {
  daily: {
    title: 'Daily Pass',
    price: '₹499',
    priceUnit: '/ person / night',
    perks: [
      'Entry to any single night',
      'Welcome tilak & kalash blessing',
      'Access to food & handicraft stalls',
      'Choose your night at checkout',
    ],
    cta: 'Book a Single Night',
    ghost: true,
  },
  seasonal: {
    title: 'Seasonal Pass',
    price: '₹2,999',
    priceUnit: '/ person / all 10 nights',
    perks: [
      'Entry to all ten nights — no rebooking',
      'Priority entry lane, every night',
      'Reserved seating zone access',
      'Save ~33% vs booking nightly',
    ],
    cta: 'Get Seasonal Pass',
    featured: true,
    ribbon: 'Best Value',
  },
}

export const registrationCategories = {
  male: {
    title: 'Male Pass',
    eyebrow: 'Stag Entry',
    price: '₹499',
    priceUnit: '/ night',
    perks: [
      'Entry to Rangeeli Raat grounds',
      'Welcome tilak & kalash blessing',
      'Access to food & handicraft stalls',
    ],
  },
  female: {
    title: 'Female Pass',
    eyebrow: 'Stag Entry',
    price: '₹399',
    priceUnit: '/ night',
    perks: [
      'Entry to Rangeeli Raat grounds',
      'Welcome tilak & kalash blessing',
      'Priority queue at entry gates',
    ],
  },
  couple: {
    title: 'Couple Pass',
    eyebrow: 'Couple Entry',
    price: '₹899',
    priceUnit: '/ night',
    perks: [
      'Entry for 2 guests',
      'Reserved couple seating zone',
      'Welcome tilak & kalash blessing',
      'Complimentary mocktail coupon',
    ],
  },
}

export const passTypeOptions = [
  'Daily — Night 3, Rangeeli Raat (Oct 13)',
  'Daily — Night 4, Dhoom Dhamaka (Oct 14)',
  'Daily — Night 5, Bollywood Beats (Oct 15)',
  'Daily — Night 10, Grand Finale (Oct 20)',
  'Seasonal Pass — All 10 Nights',
]

export const legacyMoments = [
  {
    year: '2023',
    title: 'The First Grand Gathering',
    description:
      'The celebration began with its first vibrant season, bringing together local Garba lovers for four unforgettable nights of music, devotion, and dance.',
    highlight: 'Where the journey started',
  },
  {
    year: '2024',
    title: 'Growing with the Community',
    description:
      'With bigger crowds, richer decor, and stronger word of mouth, MGM Cultural Navratri became a festive destination families and friends looked forward to every year.',
    highlight: 'A stronger festive identity',
  },
  {
    year: '2025',
    title: 'A Bigger Stage, A Bigger Energy',
    description:
      'Live performances, premium arrangements, and thousands of dancers made the festival feel more elevated, polished, and truly city-wide in spirit.',
    highlight: 'Momentum turned into tradition',
  },
  {
    year: '2026',
    title: 'The Fourth Celebration Season',
    description:
      'Now entering its fourth season, MGM Cultural Navratri returns with even more excitement, offering a complete experience of Garba, Dandiya, hospitality, and community.',
    highlight: 'Four seasons of celebration',
  },
]

export const pastHighlights = [
  { label: 'Opening Night', image: 'https://images.unsplash.com/photo-1601122210027-a3082d6f9a99?w=400' },
  { label: 'Garba Circle', image: 'https://images.unsplash.com/photo-1604608672516-f1a8f9b94c6f?w=400' },
  { label: 'Dandiya Raas', image: 'https://images.unsplash.com/photo-1576487248805-cf45f6bdc67c?w=400' },
  { label: 'Couples Night', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400' },
  { label: 'Aarti Ceremony', image: 'https://images.unsplash.com/photo-1572014652523-cb71e1f5e5d4?w=400' },
  { label: 'Finale Fireworks', image: 'https://images.unsplash.com/photo-1601122210027-a3082d6f9a99?w=400' },
]
