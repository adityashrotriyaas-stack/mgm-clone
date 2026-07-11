export const contactInfo = {
  phone: '+91 89800 09014',
  phoneHref: 'tel:+918980009014',
  whatsappNumber: '918980009014',
  whatsappMessage: 'Hi, I would like to know more about MGM Cultural Navratri passes and event details.',
  email: 'mgmculturalnavratri23@gmail.com',
  venue: 'Seasons Hotel, Rajkot',
  venueHref: 'https://www.google.com/maps/search/?api=1&query=Seasons+Hotel+Rajkot+Gujarat',
  gatesOpen: 'Gates Open 7:30 PM',
}

export function getWhatsAppUrl(message = contactInfo.whatsappMessage) {
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`
}
