import { useState } from 'react'
import { Order } from '../types'
import { wands } from '../store/wands'

interface OrderConfirmationPageProps {
  currentOrder: Order
  pastOrders: Order[]
  onNavigate: (page: 'home' | 'catalog' | 'cart' | 'checkout' | 'confirmation') => void
}

function FizbanSeal() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width="80"
      height="80"
      aria-label="Seal of Fizban"
      role="img"
      className="fizban-seal"
    >
      <defs>
        <radialGradient id="sealBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#a08020" stopOpacity="0.05" />
        </radialGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="60" cy="60" r="55" fill="url(#sealBg)" stroke="#d4af37" strokeWidth="2" opacity="0.8" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
      {/* Star */}
      <polygon
        points="60,18 65.9,42.6 91.4,42.6 70.8,57.4 78.5,82 60,67.2 41.5,82 49.2,57.4 28.6,42.6 54.1,42.6"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.5"
        opacity="0.9"
      />
      {/* Wand in center */}
      <rect x="58" y="44" width="4" height="30" fill="#d4af37" rx="2" opacity="0.8" />
      <circle cx="60" cy="42" r="4" fill="#d4af37" opacity="0.9" />
      {/* Text arc */}
      <path id="sealTextArc" d="M 12,60 A 48,48 0 0 1 108,60" fill="none" />
      <text fontSize="7" fill="#d4af37" opacity="0.8" fontFamily="serif" letterSpacing="2">
        <textPath href="#sealTextArc" startOffset="10%">FIZBAN'S WANDS ✦ EST. 1372 DR</textPath>
      </text>
    </svg>
  )
}

export function OrderConfirmationPage({ currentOrder, pastOrders, onNavigate }: OrderConfirmationPageProps) {
  const [historyOpen, setHistoryOpen] = useState(false)

  const currentWithWands = currentOrder.items
    .map(item => ({ item, wand: wands.find(w => w.id === item.wandId) }))
    .filter((e): e is { item: typeof currentOrder.items[0]; wand: NonNullable<ReturnType<typeof wands.find>> } => !!e.wand)

  const purchaseDate = new Date(currentOrder.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="confirm-page container animate-fade-in">
      {/* Celebratory heading */}
      <header className="confirm-page__header">
        <div className="confirm-page__stars" aria-hidden="true">⭐</div>
        <h1 className="confirm-page__title">Order Received!</h1>
        <div className="confirm-page__stars" aria-hidden="true">⭐</div>
      </header>

      <div className="confirm-page__layout">
        {/* Order details */}
        <section className="confirm-order card" aria-labelledby="confirm-order-heading">
          <h2 id="confirm-order-heading" className="confirm-section-title">Order Details</h2>
          <p className="confirm-order__id">
            <span className="confirm-order__id-label">Order ID:</span>
            <span className="confirm-order__id-value" aria-label={`Order ID ${currentOrder.id}`}>{currentOrder.id}</span>
          </p>
          <p className="confirm-order__owl">
            🦉 A magical messenger owl has been dispatched with your wands. Expected delivery: 3–5 enchanted moments.
          </p>
        </section>

        {/* Magical Delivery Receipt — styled as parchment scroll */}
        <section className="receipt card" aria-labelledby="receipt-heading">
          <div className="receipt__scroll-top" aria-hidden="true" />

          <div className="receipt__inner">
            <header className="receipt__header">
              <div className="receipt__seal-wrap">
                <FizbanSeal />
              </div>
              <h2 id="receipt-heading" className="receipt__title">
                📜 Magical Delivery Manifest
              </h2>
              <p className="receipt__shop">— From Fizban's Wands —</p>
            </header>

            <div className="receipt__meta">
              <div className="receipt__meta-row">
                <span className="receipt__meta-label">To:</span>
                <span className="receipt__meta-value">{currentOrder.recipientName}</span>
              </div>
              <div className="receipt__meta-row">
                <span className="receipt__meta-label">Via:</span>
                <span className="receipt__meta-value">Enchanted Owl Post</span>
              </div>
              <div className="receipt__meta-row">
                <span className="receipt__meta-label">Date:</span>
                <span className="receipt__meta-value">{purchaseDate}</span>
              </div>
              <div className="receipt__meta-row">
                <span className="receipt__meta-label">Deliver to:</span>
                <span className="receipt__meta-value">{currentOrder.deliveryAddress}</span>
              </div>
            </div>

            <div className="receipt__divider receipt__divider--rune" aria-hidden="true">✦ ✦ ✦</div>

            <h3 className="receipt__items-heading">Enchanted Items Dispatched</h3>
            <ul className="receipt__items" role="list">
              {currentWithWands.map(({ item, wand }) => (
                <li key={wand.id} className="receipt__item">
                  <div className="receipt__item-image-wrap">
                    <img
                      src={wand.imageUrl}
                      alt={wand.name}
                      className="receipt__item-image"
                      width={48}
                      height={58}
                    />
                  </div>
                  <div className="receipt__item-details">
                    <span className="receipt__item-name">{wand.name}</span>
                    <span className="receipt__item-qty-price">
                      {item.quantity} × {wand.price.toLocaleString()} gp
                    </span>
                  </div>
                  <span className="receipt__item-total">
                    {(wand.price * item.quantity).toLocaleString()} gp
                  </span>
                </li>
              ))}
            </ul>

            <div className="receipt__total-row">
              <span className="receipt__total-label">Grand Total:</span>
              <span className="receipt__total-value">{currentOrder.total.toLocaleString()} gp</span>
            </div>

            <div className="receipt__divider receipt__divider--rune" aria-hidden="true">✦ ✦ ✦</div>

            <div className="receipt__signoff">
              <p className="receipt__signoff-text">
                "May your wand serve you faithfully in all magical endeavours. Should your wand misfire, simply wave it
                more dramatically. Works every time."
              </p>
              <p className="receipt__signoff-name">— Fizban the Fabulous</p>
              <p className="receipt__signoff-title">Grand Enchanter & Purveyor of Fine Wands</p>
            </div>

            <div className="receipt__seal-footer" aria-hidden="true">
              <FizbanSeal />
            </div>
          </div>

          <div className="receipt__scroll-bottom" aria-hidden="true" />
        </section>

        {/* Navigation */}
        <div className="confirm-page__actions">
          <button className="btn btn-primary" onClick={() => onNavigate('catalog')}>
            🪄 Shop for More Wands
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setHistoryOpen(!historyOpen)}
            aria-expanded={historyOpen}
            aria-controls="purchase-history"
          >
            📚 {historyOpen ? 'Hide' : 'View'} Purchase History
          </button>
        </div>

        {/* Purchase History */}
        {historyOpen && (
          <section id="purchase-history" className="history card animate-fade-in" aria-label="Purchase history">
            <h2 className="confirm-section-title">Purchase History</h2>
            {pastOrders.length === 0 ? (
              <p className="history__empty">No past orders found.</p>
            ) : (
              <ul className="history__list" role="list">
                {[...pastOrders].reverse().map(order => {
                  const orderWithWands = order.items
                    .map(item => ({ item, wand: wands.find(w => w.id === item.wandId) }))
                    .filter((e): e is { item: typeof order.items[0]; wand: NonNullable<ReturnType<typeof wands.find>> } => !!e.wand)

                  return (
                    <li key={order.id} className="history__order">
                      <div className="history__order-header">
                        <span className="history__order-id">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                        <span className="history__order-date">
                          {new Date(order.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="history__order-total">{order.total.toLocaleString()} gp</span>
                      </div>
                      <div className="history__order-items">
                        {orderWithWands.map(({ item, wand }) => (
                          <div key={wand.id} className="history__order-item">
                            <img
                              src={wand.imageUrl}
                              alt={wand.name}
                              className="history__order-thumb"
                              width={36}
                              height={44}
                              title={`${wand.name} ×${item.quantity}`}
                            />
                          </div>
                        ))}
                      </div>
                      <ul className="history__order-item-names" aria-label="Items in this order">
                        {orderWithWands.map(({ item, wand }) => (
                          <li key={wand.id} className="history__order-item-name">
                            {wand.name} ×{item.quantity} — {(wand.price * item.quantity).toLocaleString()} gp
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        )}
      </div>

      <style>{`
        .confirm-page {
          padding: var(--space-2xl) var(--space-lg);
        }

        .confirm-page__header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-lg);
          margin-bottom: var(--space-2xl);
        }
        .confirm-page__stars {
          font-size: 2rem;
          animation: floatGlow 3s ease-in-out infinite;
        }
        .confirm-page__title {
          font-size: 2.4rem;
          text-align: center;
        }

        .confirm-page__layout {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          max-width: 720px;
          margin: 0 auto;
        }

        .confirm-section-title {
          font-size: 1.1rem;
          margin-bottom: var(--space-lg);
          color: var(--color-text-heading);
        }

        /* Order details card */
        .confirm-order {
          padding: var(--space-xl);
        }
        .confirm-order__id {
          display: flex;
          gap: var(--space-sm);
          align-items: center;
          margin-bottom: var(--space-md);
          flex-wrap: wrap;
        }
        .confirm-order__id-label {
          color: var(--color-text-muted);
          font-size: 0.85rem;
          font-family: var(--font-display);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .confirm-order__id-value {
          font-family: monospace;
          font-size: 0.9rem;
          color: var(--color-gold);
          background: rgba(212,175,55,0.08);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          word-break: break-all;
        }
        .confirm-order__owl {
          color: var(--color-text-muted);
          font-style: italic;
          line-height: 1.6;
        }

        /* Receipt — parchment scroll */
        .receipt {
          background: linear-gradient(180deg, #2a1f0a 0%, #1e1608 30%, #1e1608 70%, #2a1f0a 100%);
          border-color: rgba(212,175,55,0.5);
          box-shadow: 0 4px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.4), inset 0 0 40px rgba(212,175,55,0.04);
          overflow: hidden;
          position: relative;
        }
        .receipt::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 28px,
              rgba(212,175,55,0.03) 28px,
              rgba(212,175,55,0.03) 29px
            );
          pointer-events: none;
        }

        .receipt__scroll-top,
        .receipt__scroll-bottom {
          height: 20px;
          background: linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(160,128,32,0.1) 50%, rgba(212,175,55,0.2) 100%);
          border-bottom: 2px solid rgba(212,175,55,0.4);
        }
        .receipt__scroll-bottom {
          border-bottom: none;
          border-top: 2px solid rgba(212,175,55,0.4);
        }

        .receipt__inner {
          padding: var(--space-2xl) var(--space-2xl);
          position: relative;
        }

        .receipt__header {
          text-align: center;
          margin-bottom: var(--space-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
        }
        .receipt__seal-wrap {
          margin-bottom: var(--space-sm);
        }
        .receipt__title {
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: #f0d060;
          letter-spacing: 0.05em;
        }
        .receipt__shop {
          color: #c8a840;
          font-style: italic;
          font-family: var(--font-body);
          font-size: 1rem;
        }

        .receipt__meta {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--space-xs) var(--space-md);
          margin-bottom: var(--space-lg);
          font-size: 0.95rem;
        }
        .receipt__meta-label {
          font-family: var(--font-display);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #a08030;
          white-space: nowrap;
          align-self: start;
          padding-top: 2px;
        }
        .receipt__meta-value {
          color: #e8d080;
        }

        .receipt__divider {
          text-align: center;
          color: #c8a840;
          opacity: 0.6;
          letter-spacing: 0.5em;
          margin: var(--space-lg) 0;
          font-size: 0.9rem;
        }

        .receipt__items-heading {
          font-family: var(--font-display);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #a08030;
          margin-bottom: var(--space-md);
        }

        .receipt__items {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
        }
        .receipt__item {
          display: grid;
          grid-template-columns: 48px 1fr auto;
          gap: var(--space-md);
          align-items: center;
          padding-bottom: var(--space-md);
          border-bottom: 1px solid rgba(212,175,55,0.15);
        }
        .receipt__item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .receipt__item-image-wrap {
          width: 48px;
          height: 58px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: rgba(0,0,0,0.3);
          flex-shrink: 0;
          border: 1px solid rgba(212,175,55,0.2);
        }
        .receipt__item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .receipt__item-details {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }
        .receipt__item-name {
          font-family: var(--font-display);
          font-size: 0.9rem;
          color: #e8d080;
        }
        .receipt__item-qty-price {
          color: #a08030;
          font-size: 0.85rem;
          font-family: var(--font-body);
        }
        .receipt__item-total {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 600;
          color: #f0d060;
        }

        .receipt__total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md) 0;
          border-top: 2px solid rgba(212,175,55,0.3);
          margin-top: var(--space-sm);
        }
        .receipt__total-label {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: #e8d080;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .receipt__total-value {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          color: #f0d060;
        }

        .receipt__signoff {
          margin-top: var(--space-lg);
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }
        .receipt__signoff-text {
          color: #c8a840;
          font-style: italic;
          line-height: 1.7;
          font-size: 1rem;
        }
        .receipt__signoff-name {
          font-family: var(--font-display);
          font-size: 1rem;
          color: #f0d060;
          margin-top: var(--space-sm);
        }
        .receipt__signoff-title {
          color: #a08030;
          font-size: 0.85rem;
          font-style: italic;
        }

        .receipt__seal-footer {
          display: flex;
          justify-content: center;
          margin-top: var(--space-xl);
          opacity: 0.7;
        }

        .fizban-seal {
          filter: drop-shadow(0 0 8px rgba(212,175,55,0.3));
        }

        /* Navigation actions */
        .confirm-page__actions {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        /* History */
        .history {
          padding: var(--space-xl);
        }
        .history__empty {
          color: var(--color-text-muted);
          text-align: center;
          padding: var(--space-xl);
        }
        .history__list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }
        .history__order {
          border-bottom: 1px solid var(--color-border);
          padding-bottom: var(--space-xl);
        }
        .history__order:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .history__order-header {
          display: flex;
          gap: var(--space-md);
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: var(--space-md);
        }
        .history__order-id {
          font-family: monospace;
          font-size: 0.85rem;
          color: var(--color-gold);
          background: rgba(212,175,55,0.08);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
        }
        .history__order-date {
          color: var(--color-text-muted);
          font-size: 0.85rem;
        }
        .history__order-total {
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--color-gold);
          margin-left: auto;
        }
        .history__order-items {
          display: flex;
          gap: var(--space-sm);
          flex-wrap: wrap;
          margin-bottom: var(--space-sm);
        }
        .history__order-item {
          width: 36px;
          height: 44px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--color-border);
          background: var(--color-bg);
        }
        .history__order-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .history__order-item-names {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .history__order-item-name {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  )
}
