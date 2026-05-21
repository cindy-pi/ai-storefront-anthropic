import { useState } from 'react'
import { CartItem, Wand } from '../types'
import { wands } from '../store/wands'

interface CheckoutPageProps {
  cartItems: CartItem[]
  balance: number
  onPurchase: (deliveryAddress: string, recipientName: string) => void
  onNavigate: (page: 'home' | 'catalog' | 'cart' | 'checkout' | 'confirmation') => void
}

function getAlignmentIcon(alignment: Wand['alignment']): string {
  if (alignment === 'Good') return '✦'
  if (alignment === 'Evil') return '✸'
  return '◈'
}

export function CheckoutPage({ cartItems, balance, onPurchase, onNavigate }: CheckoutPageProps) {
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [addressError, setAddressError] = useState('')
  const [nameError, setNameError] = useState('')
  const [purchaseError, setPurchaseError] = useState('')

  const cartWithWands = cartItems
    .map(item => ({ item, wand: wands.find(w => w.id === item.wandId) }))
    .filter((entry): entry is { item: CartItem; wand: Wand } => entry.wand !== undefined)

  const subtotal = cartWithWands.reduce((sum, { item, wand }) => sum + wand.price * item.quantity, 0)
  const balanceAfter = Math.max(0, balance - subtotal)
  const insufficientFunds = subtotal > balance

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let valid = true

    if (!deliveryAddress.trim()) {
      setAddressError('Please enter your magical delivery address.')
      valid = false
    } else {
      setAddressError('')
    }

    if (!recipientName.trim()) {
      setNameError('Please enter a recipient name.')
      valid = false
    } else {
      setNameError('')
    }

    if (!valid) return

    // Belt-and-suspenders check
    if (subtotal > balance) {
      setPurchaseError('Insufficient gold balance. Please remove some items.')
      return
    }

    setPurchaseError('')
    onPurchase(deliveryAddress.trim(), recipientName.trim())
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty container animate-fade-in">
        <div className="checkout-empty__card card">
          <div className="checkout-empty__icon" aria-hidden="true">🛒</div>
          <h1>Your cart is empty</h1>
          <p>Add some wands to your cart before checking out.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('catalog')}>
            Browse the Wand Catalog
          </button>
        </div>
        <style>{`
          .checkout-empty {
            padding: var(--space-3xl) var(--space-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
          }
          .checkout-empty__card {
            padding: var(--space-3xl) var(--space-2xl);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-lg);
            max-width: 480px;
            width: 100%;
          }
          .checkout-empty__icon { font-size: 4rem; animation: floatGlow 3s ease-in-out infinite; }
        `}</style>
      </div>
    )
  }

  return (
    <div className="checkout-page container animate-fade-in">
      <header className="checkout-page__header">
        <h1 className="checkout-page__title">Complete Your Order</h1>
        <p className="checkout-page__subtitle">Review your selections and provide delivery details</p>
      </header>

      <div className="checkout-page__layout">
        {/* Left column: order summary + form */}
        <div className="checkout-main">
          {/* Order Summary */}
          <section className="checkout-order card" aria-labelledby="order-summary-heading">
            <h2 id="order-summary-heading" className="checkout-section-title">Order Summary</h2>
            <ul className="checkout-order__list" role="list">
              {cartWithWands.map(({ item, wand }) => (
                <li key={wand.id} className="checkout-order__item">
                  <div className="checkout-order__image-wrap">
                    <img
                      src={wand.imageUrl}
                      alt={wand.name}
                      className="checkout-order__image"
                      width={56}
                      height={68}
                    />
                  </div>
                  <div className="checkout-order__details">
                    <span className="checkout-order__name">{wand.name}</span>
                    <span className={`badge badge-${wand.alignment}`}>
                      <span aria-hidden="true">{getAlignmentIcon(wand.alignment)}</span>
                      {wand.alignment}
                    </span>
                  </div>
                  <div className="checkout-order__pricing">
                    <span className="checkout-order__qty">×{item.quantity}</span>
                    <span className="checkout-order__line-total">{(wand.price * item.quantity).toLocaleString()} gp</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Delivery Details Form */}
          <section className="checkout-form-section card" aria-labelledby="delivery-heading">
            <h2 id="delivery-heading" className="checkout-section-title">Delivery Details</h2>
            <form id="checkout-form" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="recipient-name" className="form-label">
                  Recipient Name <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="recipient-name"
                  type="text"
                  className={`form-input${nameError ? ' form-input--error' : ''}`}
                  value={recipientName}
                  onChange={e => { setRecipientName(e.target.value); if (nameError) setNameError('') }}
                  placeholder="e.g. Elminster Aumar"
                  aria-required="true"
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? 'name-error' : undefined}
                />
                {nameError && (
                  <span id="name-error" className="form-error" role="alert">{nameError}</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="delivery-address" className="form-label">
                  Magical Delivery Address <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="delivery-address"
                  type="text"
                  className={`form-input${addressError ? ' form-input--error' : ''}`}
                  value={deliveryAddress}
                  onChange={e => { setDeliveryAddress(e.target.value); if (addressError) setAddressError('') }}
                  placeholder="e.g. Tower of Sorcery, Realm of Mystra"
                  aria-required="true"
                  aria-invalid={!!addressError}
                  aria-describedby={addressError ? 'address-error' : undefined}
                />
                {addressError && (
                  <span id="address-error" className="form-error" role="alert">{addressError}</span>
                )}
              </div>
            </form>
          </section>
        </div>

        {/* Right column: cost breakdown */}
        <aside className="checkout-summary card" aria-label="Cost breakdown">
          <h2 className="checkout-section-title">Cost Breakdown</h2>

          <div className="checkout-summary__row">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString()} gp</span>
          </div>
          <div className="checkout-summary__row">
            <span>Magical handling fee</span>
            <span className="checkout-summary__free">0 gp</span>
          </div>
          <div className="checkout-summary__divider" role="separator" />
          <div className="checkout-summary__row checkout-summary__row--total">
            <span>Total</span>
            <span>{subtotal.toLocaleString()} gp</span>
          </div>
          <div className="checkout-summary__row">
            <span>Current Balance</span>
            <span className="checkout-summary__balance">{balance.toLocaleString()} gp</span>
          </div>
          <div className="checkout-summary__row">
            <span>Balance After Purchase</span>
            <span className={insufficientFunds ? 'checkout-summary__negative' : 'checkout-summary__after'}>
              {insufficientFunds ? '—' : `${balanceAfter.toLocaleString()} gp`}
            </span>
          </div>

          {insufficientFunds && (
            <div className="checkout-summary__warning" role="alert">
              <span aria-hidden="true">⚠</span>
              <span>Insufficient gold to complete this purchase.</span>
            </div>
          )}

          {purchaseError && (
            <div className="checkout-summary__warning" role="alert">
              <span aria-hidden="true">⚠</span>
              <span>{purchaseError}</span>
            </div>
          )}

          <button
            type="submit"
            form="checkout-form"
            className="btn btn-primary checkout-summary__buy-btn"
            disabled={insufficientFunds}
            aria-disabled={insufficientFunds}
          >
            ✨ Complete Purchase
          </button>

          <button
            type="button"
            className="btn btn-secondary checkout-summary__back-btn"
            onClick={() => onNavigate('cart')}
          >
            ← Back to Cart
          </button>
        </aside>
      </div>

      <style>{`
        .checkout-page {
          padding: var(--space-2xl) var(--space-lg);
        }
        .checkout-page__header {
          margin-bottom: var(--space-2xl);
        }
        .checkout-page__title {
          font-size: 2rem;
          margin-bottom: var(--space-xs);
        }
        .checkout-page__subtitle {
          color: var(--color-text-muted);
        }

        .checkout-page__layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: var(--space-2xl);
          align-items: start;
        }

        .checkout-main {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        .checkout-section-title {
          font-size: 1.1rem;
          margin-bottom: var(--space-lg);
          color: var(--color-text-heading);
        }

        /* Order list */
        .checkout-order {
          padding: var(--space-xl);
        }
        .checkout-order__list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .checkout-order__item {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          gap: var(--space-md);
          align-items: center;
        }
        .checkout-order__image-wrap {
          width: 56px;
          height: 68px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: var(--color-bg);
          flex-shrink: 0;
        }
        .checkout-order__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .checkout-order__details {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }
        .checkout-order__name {
          font-family: var(--font-display);
          font-size: 0.9rem;
          color: var(--color-text-heading);
        }
        .checkout-order__pricing {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: var(--space-xs);
        }
        .checkout-order__qty {
          color: var(--color-text-muted);
          font-size: 0.85rem;
        }
        .checkout-order__line-total {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-gold);
        }

        /* Form */
        .checkout-form-section {
          padding: var(--space-xl);
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          margin-bottom: var(--space-lg);
        }
        .form-field:last-child {
          margin-bottom: 0;
        }
        .form-label {
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .form-input {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--space-sm) var(--space-md);
          color: var(--color-text);
          font-family: var(--font-body);
          font-size: 1rem;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
          outline: none;
        }
        .form-input:focus {
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.15);
        }
        .form-input--error {
          border-color: var(--color-evil);
        }
        .form-input--error:focus {
          box-shadow: 0 0 0 3px rgba(239,83,80,0.15);
        }
        .form-input::placeholder {
          color: var(--color-text-muted);
          opacity: 0.7;
        }
        .form-error {
          color: var(--color-evil);
          font-size: 0.85rem;
          font-family: var(--font-body);
        }

        /* Summary panel */
        .checkout-summary {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          position: sticky;
          top: calc(var(--nav-height) + var(--space-md));
        }
        .checkout-summary__row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }
        .checkout-summary__row--total {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--color-text);
        }
        .checkout-summary__free {
          color: var(--color-neutral);
          font-family: var(--font-display);
          font-size: 0.85rem;
        }
        .checkout-summary__balance {
          color: var(--color-gold);
          font-family: var(--font-display);
          font-weight: 600;
        }
        .checkout-summary__after {
          color: var(--color-good);
          font-family: var(--font-display);
          font-weight: 600;
        }
        .checkout-summary__negative {
          color: var(--color-evil);
          font-family: var(--font-display);
          font-weight: 600;
        }
        .checkout-summary__divider {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-border), transparent);
        }
        .checkout-summary__warning {
          display: flex;
          align-items: flex-start;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: rgba(239, 83, 80, 0.12);
          border: 1px solid rgba(239, 83, 80, 0.35);
          border-radius: var(--radius-md);
          color: var(--color-evil);
          font-size: 0.9rem;
        }
        .checkout-summary__buy-btn {
          width: 100%;
          margin-top: var(--space-sm);
        }
        .checkout-summary__back-btn {
          width: 100%;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .checkout-page__layout {
            grid-template-columns: 1fr;
          }
          .checkout-summary {
            position: static;
          }
        }
      `}</style>
    </div>
  )
}
