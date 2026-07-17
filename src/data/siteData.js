import pastNight01 from '../assets/past-nights/past-night-01.webp'
import pastNight02 from '../assets/past-nights/past-night-02.webp'
import pastNight03 from '../assets/past-nights/past-night-03.webp'
import pastNight04 from '../assets/past-nights/past-night-04.webp'
import pastNight05 from '../assets/past-nights/past-night-05.webp'
import pastNight06 from '../assets/past-nights/past-night-06.webp'
import pastNight07 from '../assets/past-nights/past-night-07.webp'

export const navLinks = [
  { label: 'Home', href: '#home', active: true },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#past' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Contact', href: '#contact' },
]

export const aboutContent = {
  eyebrow: 'About MGM Cultural',
  titleLine1: 'MGM CULTURAL',
  titleLine2: 'Navratri 2026',
  subtitle: 'Leading Event Management Since 2023',
  paragraphs: [
    'MGM Cultural is a leading event management firm delivering top cultural and entertainment experiences.',
    'We organize large-scale events and platforms for renowned artists.',
    'Since 2023, we have been successfully hosting Navratri celebrations at Seasons Hotel, Rajkot, and live shows across Gujarat with a secure and seamless online booking system.',
  ],
  highlights: [
    '10-Day Cultural Festival',
    'Amit Dhorda & Team',
    'Renowned Artists Daily',
    'Mandli Garba Nights',
  ],
  footerTagline:
    'A 10-day cultural festival in Rajkot — Garba, devotion, and India\'s finest artists, led by Amit Dhorda.',
  featuredSummary:
    'A spectacular 10-day cultural festival celebrating Gujarat through music, devotion, and tradition—with live Garba from 9:00 PM, star performers each evening, and Mandli Garba late into the night.',
}

export const heroFeatures = [
  {
    icon: 'calendar',
    title: '10 Days',
    subtitle: 'Cultural Festival',
  },
  {
    icon: 'location',
    title: 'Seasons Hotel',
    subtitle: 'Rajkot, Gujarat',
  },
  {
    icon: 'people',
    title: 'Amit Dhorda & Team',
    subtitle: 'Live Garba from 9 PM',
  },
  {
    icon: 'star',
    title: 'Star Artists',
    subtitle: 'A new performer each night',
  },
]

export const stats = [
  { value: 25000, label: 'Dancers · 2025' },
  { value: 10, label: 'Days' },
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
  { id: 1, label: 'Night 1', date: 'Oct 10, Sat', theme: 'MGM CULTURAL NAVRATRI', male: 2000, female: 1500, couple: 3000 },
  { id: 2, label: 'Night 2', date: 'Oct 11, Sun', theme: 'MGM CULTURAL NAVRATRI', male: 2000, female: 1500, couple: 3000 },
  { id: 3, label: 'Night 3', date: 'Oct 12, Mon', theme: 'MGM CULTURAL NAVRATRI', male: 1500, female: 1000, couple: 2000 },
  { id: 4, label: 'Night 4', date: 'Oct 13, Tue', theme: 'MGM CULTURAL NAVRATRI', male: 3000, female: 2000, couple: 4000 },
  { id: 5, label: 'Night 5', date: 'Oct 14, Wed', theme: 'MGM CULTURAL NAVRATRI', male: 1500, female: 1000, couple: 2000 },
  { id: 6, label: 'Night 6', date: 'Oct 15, Thu', theme: 'MGM CULTURAL NAVRATRI', male: 1500, female: 1000, couple: 2000 },
  { id: 7, label: 'Night 7', date: 'Oct 16, Fri', theme: 'MGM CULTURAL NAVRATRI', male: 1500, female: 1000, couple: 2000 },
  { id: 8, label: 'Night 8', date: 'Oct 17, Sat', theme: 'MGM CULTURAL NAVRATRI', male: 2000, female: 1500, couple: 3000 },
  { id: 9, label: 'Night 9', date: 'Oct 18, Sun', theme: 'MGM CULTURAL NAVRATRI', male: 2000, female: 1500, couple: 3000 },
  { id: 10, label: 'Night 10', date: 'Oct 19, Mon', theme: 'MGM CULTURAL NAVRATRI', male: 1500, female: 1000, couple: 2000 },
]

export const upcomingEvents = [
  {
    id: 1,
    title: 'MGM Cultural Navratri',
    badge: 'Opening Night',
    night: 'Night 1',
    date: 'Oct 10, Sat',
    time: '9:00 PM',
    price: '₹2,000',
    priceUnit: '/ stag',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600',
  },
  {
    id: 2,
    title: 'Dhoom Dhamaka',
    badge: 'Couple Special',
    night: 'Night 4',
    date: 'Oct 13, Tue',
    time: '9:00 PM',
    price: '₹4,000',
    priceUnit: '/ couple',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
  },
  {
    id: 3,
    title: 'Bollywood Beats',
    badge: 'Live DJ',
    night: 'Night 5',
    date: 'Oct 14, Wed',
    time: '9:00 PM',
    price: '₹1,500',
    priceUnit: '/ stag',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600',
  },
  {
    id: 4,
    title: 'Maha Aarti & Finale',
    badge: 'Grand Finale',
    night: 'Night 10',
    date: 'Oct 19, Mon',
    time: '9:00 PM',
    price: '₹1,500',
    priceUnit: '/ stag',
    image: 'https://images.unsplash.com/photo-1514320291840-75f0a710a6ad?w=600',
  },
]

export const passOptions = {
  daily: {
    title: 'Daily Pass',
    price: '₹1,500',
    priceUnit: '/ person / night',
    perks: [
      'Entry to any single night',
      'Welcome tilak & kalash blessing',
      'Access to food & handicraft stalls',
      'Choose your night at checkout',
    ],
    cta: 'Get Your Pass',
    ghost: true,
  },
  seasonal: {
    title: 'Seasonal Pass',
    price: '₹5,000',
    priceUnit: '/ person / all 10 nights',
    perks: [
      'Entry to all ten nights — no rebooking',
      'Priority entry lane, every night',
      'Reserved seating zone access',
      'Save ~60% vs booking nightly',
    ],
    cta: 'Get Seasonal Pass',
    featured: true,
    ribbon: 'Best Value',
  },
}

export const seasonalPhases = [
  { id: 1, label: 'Phase 1', dateRange: '15 Jul – 14 Aug', male: 5000, female: 4000, couple: 8000 },
  { id: 2, label: 'Phase 2', dateRange: '15 Aug – 14 Sep', male: 7000, female: 6000, couple: 10000 },
  { id: 3, label: 'Phase 3', dateRange: '15 Sep – 9 Oct', male: 9000, female: 8000, couple: 12000 },
]

export const registrationCategories = {
  male: {
    title: 'Male Pass',
    eyebrow: 'Stag Entry',
    price: '₹1,500',
    priceUnit: '/ night',
    perks: [
      'Entry to Garba grounds',
      'Welcome tilak & kalash blessing',
      'Access to food & handicraft stalls',
    ],
  },
  female: {
    title: 'Female Pass',
    eyebrow: 'Stag Entry',
    price: '₹1,000',
    priceUnit: '/ night',
    perks: [
      'Entry to Garba grounds',
      'Welcome tilak & kalash blessing',
      'Priority queue at entry gates',
    ],
  },
  couple: {
    title: 'Couple Pass',
    eyebrow: 'Couple Entry',
    price: '₹2,000',
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
  'Daily — Night 1, Opening Night (Oct 10)',
  'Daily — Night 4, Dhoom Dhamaka (Oct 13)',
  'Daily — Night 5, Bollywood Beats (Oct 14)',
  'Daily — Night 10, Grand Finale (Oct 19)',
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
    title: 'A Grand Celebration Beyond Navratri',
    description:
      'Led by Amit Dhorda, this fourth season brings 10 days of live Garba, renowned artists, and Mandli nights to Rajkot.',
    highlight: 'Culture, devotion & artistry united',
  },
]

export const pastHighlights = [
  { label: 'Live Performance', date: 'Oct 14, 2025', image: pastNight01, imagePosition: 'center 30%' },
  { label: 'Garba Ground', date: 'Oct 15, 2025', image: pastNight02, imagePosition: 'center center' },
  { label: 'Grand Stage', date: 'Oct 16, 2025', image: pastNight03, imagePosition: 'center center' },
  { label: 'Mandli Night', date: 'Oct 17, 2025', image: pastNight04, imagePosition: 'center 20%' },
  { label: 'Crowd Energy', date: 'Oct 18, 2025', image: pastNight05, imagePosition: 'center 35%' },
  { label: 'Devotional Night', date: 'Oct 19, 2025', image: pastNight06, imagePosition: 'center 25%' },
  { label: 'Traditional Evening', date: 'Oct 20, 2025', image: pastNight07, imagePosition: 'center top' },
]
