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

function showDemoPaymentPopup(options) {
  const amount = options.amount ? `₹${Number(options.amount).toLocaleString('en-IN')}` : '—'
  const orderId = options.order_id?.slice(-12) || '—'
  const currency = options.currency || 'INR'
  const name = options.name || 'MGM Cultural Navratri 2026'
  const description = options.description || 'Ticket purchase'
  const prefill = options.prefill || {}

  const overlay = document.createElement('div')
  overlay.id = 'razorpay-demo-overlay'
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', zIndex: '2147483647',
    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '24px', fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
    overflow: 'auto',
  })

  const modal = document.createElement('div')
  Object.assign(modal.style, {
    background: '#fff', borderRadius: '12px', padding: '0',
    maxWidth: '480px', width: '100%', maxHeight: '90vh',
    boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
    overflow: 'hidden', display: 'flex', flexDirection: 'column',
  })

  const headerColor = '#02042B'

  modal.innerHTML = `
    <style>
      .rzp-tab { padding: 12px 16px; font-size: 14px; font-weight: 500; color: #6B7280; background: transparent; border: none; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
      .rzp-tab.active { color: ${headerColor}; border-bottom-color: ${headerColor}; }
      .rzp-tab:hover:not(.active) { color: #374151; }
      .rzp-panel { display: none; padding: 20px; }
      .rzp-panel.active { display: block; animation: fadeIn 0.2s; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      .rzp-input { width: 100%; padding: 12px 14px; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 14px; font-family: inherit; outline: none; transition: border 0.2s; box-sizing: border-box; }
      .rzp-input:focus { border-color: ${headerColor}; box-shadow: 0 0 0 3px rgba(2,4,43,0.1); }
      .rzp-btn { width: 100%; padding: 14px; background: ${headerColor}; color: #fff; font-size: 15px; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: opacity 0.2s; }
      .rzp-btn:hover { opacity: 0.9; }
      .rzp-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      .rzp-row { display: flex; gap: 12px; }
      .rzp-row > * { flex: 1; }
      .rzp-label { font-size: 12px; color: #6B7280; margin-bottom: 4px; display: block; }
      .rzp-card-logos { display: flex; gap: 8px; margin-top: 12px; opacity: 0.6; }
      .rzp-card-logos img { height: 20px; }
      .rzp-upi-apps { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 16px; }
      .rzp-upi-app { padding: 12px 16px; border: 1px solid #E5E7EB; border-radius: 8px; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 72px; }
      .rzp-upi-app:hover { border-color: ${headerColor}; background: #F9FAFB; }
      .rzp-upi-app img { height: 28px; }
      .rzp-upi-app span { font-size: 12px; color: #374151; font-weight: 500; }
      .rzp-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #9CA3AF; }
      .rzp-secure { display: flex; align-items: center; gap: 4px; }
      .rzp-close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; background: #F3F4F6; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
      .rzp-close:hover { background: #E5E7EB; }
      .rzp-header { background: ${headerColor}; color: #fff; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
      .rzp-header-info h3 { margin: 0; font-size: 16px; font-weight: 600; }
      .rzp-header-info p { margin: 4px 0 0; font-size: 13px; opacity: 0.8; }
      .rzp-amount { font-size: 24px; font-weight: 700; }
      .rzp-body { flex: 1; overflow-y: auto; }
    </style>

    <div class="rzp-header">
      <div class="rzp-header-info">
        <h3>${name}</h3>
        <p>${description}</p>
      </div>
      <div class="rzp-amount">${amount}</div>
    </div>

    <button class="rzp-close" id="rzp-demo-close" aria-label="Close">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    <div class="rzp-body">
      <div class="rzp-tabs" style="display: flex; border-bottom: 1px solid #E5E7EB; background: #F9FAFB;">
        <button class="rzp-tab active" data-panel="upi">UPI</button>
        <button class="rzp-tab" data-panel="card">Card</button>
        <button class="rzp-tab" data-panel="netbanking">NetBanking</button>
        <button class="rzp-tab" data-panel="wallet">Wallet</button>
      </div>

      <div class="rzp-panel active" id="panel-upi">
        <div style="padding: 20px;">
          <label class="rzp-label">UPI ID</label>
          <input type="text" class="rzp-input" id="upi-id" placeholder="yourname@upi" value="demo@upi">
          <div class="rzp-upi-apps">
            <div class="rzp-upi-app" data-app="gpay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v8h-2zm0 10h2v2h-2z" fill="#4285F4"/><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="#34A853"/><path d="M8.5 12.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5z" fill="#FBBC05"/><path d="M15.5 12.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z" fill="#EA4335"/></svg><span>GPay</span></div>
            <div class="rzp-upi-app" data-app="phonepe"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#5F259F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path fill="#FFF" d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><path fill="#8B5CF6" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/><path fill="#FFF" d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg><span>PhonePe</span></div>
            <div class="rzp-upi-app" data-app="paytm"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#00BAF2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path fill="#FFF" d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><text x="12" y="16.5" font-size="8" font-weight="bold" fill="#00BAF2" text-anchor="middle" font-family="Arial">PTM</text></svg><span>Paytm</span></div>
            <div class="rzp-upi-app" data-app="bhim"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#007AFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path fill="#FFF" d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><text x="12" y="16.5" font-size="7" font-weight="bold" fill="#007AFF" text-anchor="middle" font-family="Arial">BHIM</text></svg><span>BHIM</span></div>
          </div>
        </div>
      </div>

      <div class="rzp-panel" id="panel-card">
        <div style="padding: 20px;">
          <div class="rzp-row">
            <div>
              <label class="rzp-label">Card Number</label>
              <input type="text" class="rzp-input" placeholder="1234 5678 9012 3456" value="4111 1111 1111 1111" maxlength="19" id="card-number">
            </div>
          </div>
          <div class="rzp-row" style="margin-top: 12px;">
            <div>
              <label class="rzp-label">Expiry</label>
              <input type="text" class="rzp-input" placeholder="MM/YY" value="12/30" maxlength="5" id="card-expiry">
            </div>
            <div>
              <label class="rzp-label">CVV</label>
              <input type="text" class="rzp-input" placeholder="CVV" value="123" maxlength="4" id="card-cvv">
            </div>
          </div>
          <div style="margin-top: 12px;">
            <label class="rzp-label">Name on Card</label>
            <input type="text" class="rzp-input" placeholder="Card Holder Name" value="${prefill.name || ''}" id="card-name">
          </div>
          <div class="rzp-card-logos">
            <svg width="40" height="24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#1A1F71" d="M0 48c0-26.5 21.5-48 48-48h64c26.5 0 48 21.5 48 48s-21.5 48-48 48H48C21.5 96 0 74.5 0 48z"/><path fill="#F7B600" d="M112 48c0-13.3-10.7-24-24-24H48c-13.3 0-24 10.7-24 24s10.7 24 24 24h40c13.3 0 24-10.7 24-24z"/><path fill="#1A1F71" d="M88 24c13.3 0 24 10.7 24 24s-10.7 24-24 24h-16c-13.3 0-24-10.7-24-24s10.7-24 24-24h16z"/><text x="80" y="62" font-family="Arial" font-size="32" font-weight="bold" fill="#FFF" text-anchor="middle">VISA</text></svg>
            <svg width="40" height="24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="48" r="40" fill="#EB001B"/><circle cx="120" cy="48" r="40" fill="#F79E1B"/><circle cx="80" cy="18" r="22" fill="#EB001B" opacity="0.5"/><circle cx="80" cy="78" r="22" fill="#F79E1B" opacity="0.5"/><text x="80" y="60" font-family="Arial" font-size="22" font-weight="bold" fill="#FFF" text-anchor="middle">Mastercard</text></svg>
            <svg width="40" height="24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="96" rx="8" fill="#0066CC"/><text x="80" y="58" font-family="Arial" font-size="26" font-weight="bold" fill="#FFF" text-anchor="middle">RuPay</text></svg>
            <svg width="40" height="24" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="96" rx="8" fill="#0066CC"/><text x="80" y="58" font-family="Arial" font-size="22" font-weight="bold" fill="#FFF" text-anchor="middle">American Express</text></svg>
          </div>
        </div>
      </div>

      <div class="rzp-panel" id="panel-netbanking">
        <div style="padding: 20px;">
          <label class="rzp-label">Select Bank</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 8px;">
            ${['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'BOB', 'PNB', 'Canara', 'Union'].map(bank => `
              <button type="button" class="rzp-upi-app" style="flex-direction: row; justify-content: flex-start; gap: 8px; padding: 14px; min-width: 0;" data-bank="${bank.toLowerCase()}">
                <strong style="font-size: 13px;">${bank}</strong>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="rzp-panel" id="panel-wallet">
        <div style="padding: 20px;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            ${['Paytm', 'Amazon Pay', 'Mobikwik', 'Freecharge'].map(wallet => `
              <button type="button" class="rzp-upi-app" data-wallet="${wallet.toLowerCase()}">
                <strong style="font-size: 13px;">${wallet}</strong>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <button type="button" class="rzp-btn" id="rzp-demo-pay">Pay ${amount}</button>

      <div class="rzp-footer">
        <div class="rzp-secure">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span>Secure Payment</span>
        </div>
        <span>Order: ${orderId}</span>
      </div>
    </div>
  `

  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  // Tab switching
  const tabs = modal.querySelectorAll('.rzp-tab')
  const panels = modal.querySelectorAll('.rzp-panel')
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'))
      panels.forEach(p => p.classList.remove('active'))
      tab.classList.add('active')
      modal.querySelector(`#panel-${tab.dataset.panel}`).classList.add('active')
    })
  })

  // Focus UPI input
  setTimeout(() => modal.querySelector('#upi-id')?.focus(), 50)

  return new Promise((resolve, reject) => {
    let closed = false

    const cleanup = () => {
      closed = true
      overlay.style.opacity = '0'
      overlay.style.transition = 'opacity 0.2s'
      setTimeout(() => overlay.remove(), 200)
    }

    const complete = () => {
      if (closed) return
      cleanup()
      resolve({
        razorpay_order_id: options.order_id,
        razorpay_payment_id: `pay_demo_${Date.now()}`,
        razorpay_signature: `demo_sig_${Date.now()}`,
      })
    }

    modal.querySelector('#rzp-demo-pay').addEventListener('click', complete)
    modal.querySelector('#rzp-demo-close').addEventListener('click', () => {
      if (closed) return
      cleanup()
      reject(new Error('Payment cancelled'))
    })
    overlay.addEventListener('click', (e) => {
      if (e.target !== overlay || closed) return
      cleanup()
      reject(new Error('Payment cancelled'))
    })
  })
}

export async function openRazorpayCheckout(options) {
  const isDemoKey = options.key?.startsWith('rzp_test_demo_')

  if (isDemoKey) {
    return showDemoPaymentPopup(options)
  }

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