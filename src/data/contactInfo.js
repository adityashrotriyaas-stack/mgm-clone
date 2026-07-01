export const contactInfo = {
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsappNumber: '919876543210',
  whatsappMessage: 'Hi, I would like to know more about MGM Cultural Navratri passes and event details.',
  email: 'hello@mgmcultural.in',
  venue: 'Seasons Hotel, Rajkot',
  gatesOpen: 'Gates Open 7:30 PM',
}

export function getWhatsAppUrl(message = contactInfo.whatsappMessage) {
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`
}
