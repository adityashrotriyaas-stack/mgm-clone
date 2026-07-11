const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js'

export function loadRazorpayScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Razorpay is only available in the browser'))
  }

  if (window.Razorpay) {
    return Promise.resolve(window.Razorpay)
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Razorpay))
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay')))
      return
    }

    const script = document.createElement('script')
    script.src = RAZORPAY_SCRIPT_URL
    script.async = true
    script.onload = () => resolve(window.Razorpay)
    script.onerror = () => reject(new Error('Failed to load Razorpay'))
    document.body.appendChild(script)
  })
}

/** Razorpay allows max 15 keys, 256 chars per value */
export function sanitizeNotesForRazorpay(notes = {}) {
  const sanitized = {}
  Object.entries(notes)
    .slice(0, 15)
    .forEach(([key, value]) => {
      sanitized[key] = String(value ?? '').slice(0, 256)
    })
  return sanitized
}

export async function openRazorpayCheckout(options) {
  const Razorpay = await loadRazorpayScript()

  return new Promise((resolve, reject) => {
    const instance = new Razorpay({
      ...options,
      handler: (response) => resolve(response),
      modal: {
        ondismiss: () => reject(new Error('Payment cancelled')),
        ...(options.modal || {}),
      },
    })

    instance.on('payment.failed', (response) => {
      reject(new Error(response.error?.description || 'Payment failed'))
    })

    instance.open()
  })
}
