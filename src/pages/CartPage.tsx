import { CartItem, Wand } from '../types'
import { wands } from '../store/wands'

interface CartPageProps {
  cartItems: CartItem[]
  balance: number
  onUpdateQuantity: (wandId: string, quantity: number) => void
  onRemoveItem: (wandId: string) => void
  onNavigate: (page: 'home' | 'catalog' | 'cart' | 'checkout' | 'confirmation') => void
}

function getAlignmentIcon(alignment: Wand['alignment']): string {
  if (alignment === 'Good') return '✦'
  if (alignment === 'Evil') return '✸'
  return '◈'
}

export function CartPage({ cartItems, balance, onUpdateQuantity, onRemoveItem, onNavigate }: CartPageProps) {
  const cartWithWands = cartItems
    .map(item => ({ item, wand: wands.find(w => w.id === item.wandId) }))
    .filter((entry): entry is { item: CartItem; wand: Wand } => entry.wand !== undefined)

  const subtotal = cartWithWands.reduce((sum, { item, wand }) => sum + wand.price * item.quantity, 0)
  const insufficientFunds = subtotal > balance
  const shortfall = subtotal - balance

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty container animate-fade-in">
        <div className="cart-empty__card card">
          <div className="cart-empty__icon" aria-hidden="true">🛒</div>
          <h1 className="cart-empty__title">Your Cart is Empty</h1>
          <p className="cart-empty__msg">
            No magical wands selected yet. Browse our enchanted collection and find the perfect wand for your adventures.
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate('catalog')}>
            Browse the Wand Catalog
          </button>
        </div>

        <style>{`
          .cart-empty {
            padding: var(--space-3xl) var(--space-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
          }
          .cart-empty__card {
            padding: var(--space-3xl) var(--space-2xl);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-lg);
            max-width: 480px;
            width: 100%;
          }
          .cart-empty__icon {
            font-size: 4rem;
            animation: floatGlow 3s ease-in-out infinite;
            filter: drop-shadow(0 0 12px rgba(212,175,55,0.4));
          }
          .cart-empty__title {
            font-size: 1.8rem;
          }
          .cart-empty__msg {
            color: var(--color-text-muted);
            line-height: 1.7;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="cart-page container animate-fade-in">
      <header className="cart-page__header">
        <h1 className="cart-page__title">Your Magical Selections</h1>
        <p className="cart-page__subtitle">{cartItems.reduce((s, i) => s + i.quantity, 0)} item{cartItems.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''} awaiting purchase</p>
      </header>

      <div className="cart-page__layout">
        {/* Item list */}
        <section className="cart-items" aria-label="Cart items">
          <ul className="cart-items__list" role="list">
            {cartWithWands.map(({ item, wand }) => {
              const lineTotal = wand.price * item.quantity
              return (
                <li key={wand.id} className="cart-item card">
                  <div className="cart-item__image-wrap">
                    <img
                      src={wand.imageUrl}
                      alt={wand.name}
                      className="cart-item__image"
                      width={80}
                      height={96}
                    />
                  </div>

                  <div className="cart-item__details">
                    <div className="cart-item__name-row">
                      <h2 className="cart-item__name">{wand.name}</h2>
                      <span className={`badge badge-${wand.alignment}`} aria-label={`Alignment: ${wand.alignment}`}>
                        <span aria-hidden="true">{getAlignmentIcon(wand.alignment)}</span>
                        {wand.alignment}
                      </span>
                    </div>
                    <p className="cart-item__unit-price">{wand.price.toLocaleString()} gp each</p>
                  </div>

                  <div className="cart-item__controls">
                    <div className="qty-control" role="group" aria-label={`Quantity for ${wand.name}`}>
                      <button
                        className="qty-control__btn"
                        onClick={() => {
                          if (item.quantity > 1) {
                            onUpdateQuantity(wand.id, item.quantity - 1)
                          } else {
                            onRemoveItem(wand.id)
                          }
                        }}
                        aria-label={item.quantity > 1 ? `Decrease quantity of ${wand.name}` : `Remove ${wand.name} from cart`}
                      >
                        {item.quantity > 1 ? '−' : '🗑'}
                      </button>
                      <span className="qty-control__value" aria-live="polite" aria-atomic="true">
                        {item.quantity}
                      </span>
                      <button
                        className="qty-control__btn"
                        onClick={() => onUpdateQuantity(wand.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${wand.name}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-item__line-total">{lineTotal.toLocaleString()} gp</p>
                    <button
                      className="cart-item__remove"
                      onClick={() => onRemoveItem(wand.id)}
                      aria-label={`Remove ${wand.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Summary panel */}
        <aside className="cart-summary card" aria-label="Order summary">
          <h2 className="cart-summary__title">Order Summary</h2>

          <div className="cart-summary__row">
            <span>Items subtotal</span>
            <span className="cart-summary__value">{subtotal.toLocaleString()} gp</span>
          </div>

          <div className="cart-summary__row">
            <span>Your Gold Balance</span>
            <span className="cart-summary__value cart-summary__balance">{balance.toLocaleString()} gp</span>
          </div>

          <div className="cart-summary__divider" role="separator" />

          <div className="cart-summary__row cart-summary__row--total">
            <span>Total Cost</span>
            <span className="cart-summary__value">{subtotal.toLocaleString()} gp</span>
          </div>

          {insufficientFunds && (
            <div className="cart-summary__warning" role="alert" aria-live="polite">
              <span aria-hidden="true">⚠</span>
              <span>Insufficient gold! You need {shortfall.toLocaleString()} more gp.</span>
            </div>
          )}

          <button
            className="btn btn-primary cart-summary__checkout-btn"
            onClick={() => onNavigate('checkout')}
            disabled={insufficientFunds || subtotal === 0}
            aria-disabled={insufficientFunds || subtotal === 0}
          >
            Proceed to Checkout
          </button>

          <button
            className="btn btn-secondary cart-summary__shop-btn"
            onClick={() => onNavigate('catalog')}
          >
            ← Continue Shopping
          </button>
        </aside>
      </div>

      <style>{`
        .cart-page {
          padding: var(--space-2xl) var(--space-lg);
        }
        .cart-page__header {
          margin-bottom: var(--space-2xl);
        }
        .cart-page__title {
          font-size: 2rem;
          margin-bottom: var(--space-xs);
        }
        .cart-page__subtitle {
          color: var(--color-text-muted);
        }

        .cart-page__layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: var(--space-2xl);
          align-items: start;
        }

        /* Cart items list */
        .cart-items__list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .cart-item {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: var(--space-lg);
          padding: var(--space-lg);
          align-items: center;
        }

        .cart-item__image-wrap {
          width: 80px;
          height: 96px;
          border-radius: var(--radius-md);
          overflow: hidden;
          flex-shrink: 0;
          background: var(--color-bg);
        }
        .cart-item__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item__details {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .cart-item__name-row {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          flex-wrap: wrap;
        }
        .cart-item__name {
          font-size: 1rem;
          color: var(--color-text-heading);
          font-family: var(--font-display);
        }
        .cart-item__unit-price {
          color: var(--color-gold);
          font-family: var(--font-display);
          font-size: 0.9rem;
        }

        .cart-item__controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: var(--space-sm);
        }

        /* Qty controls */
        .qty-control {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          background: rgba(123, 79, 255, 0.1);
          border: 1px solid rgba(123, 79, 255, 0.3);
          border-radius: var(--radius-md);
          padding: var(--space-xs) var(--space-sm);
        }
        .qty-control__btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          background: rgba(123, 79, 255, 0.2);
          border: 1px solid rgba(123, 79, 255, 0.4);
          color: var(--color-text);
          font-size: 1rem;
          transition: all var(--transition-fast);
          font-family: var(--font-body);
        }
        .qty-control__btn:hover {
          background: rgba(123, 79, 255, 0.4);
          color: #fff;
        }
        .qty-control__value {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text);
          min-width: 24px;
          text-align: center;
        }

        .cart-item__line-total {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-gold);
        }
        .cart-item__remove {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--color-evil);
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity var(--transition-fast);
          padding: 0;
          text-decoration: underline;
        }
        .cart-item__remove:hover {
          opacity: 1;
        }

        /* Summary panel */
        .cart-summary {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          position: sticky;
          top: calc(var(--nav-height) + var(--space-md));
        }
        .cart-summary__title {
          font-size: 1.2rem;
          margin-bottom: var(--space-sm);
        }
        .cart-summary__row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }
        .cart-summary__row--total {
          color: var(--color-text);
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.05rem;
        }
        .cart-summary__value {
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--color-text);
        }
        .cart-summary__balance {
          color: var(--color-gold);
        }
        .cart-summary__divider {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--color-border), transparent);
          margin: var(--space-xs) 0;
        }
        .cart-summary__warning {
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
        .cart-summary__checkout-btn {
          width: 100%;
          margin-top: var(--space-sm);
        }
        .cart-summary__shop-btn {
          width: 100%;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .cart-page__layout {
            grid-template-columns: 1fr;
          }
          .cart-summary {
            position: static;
          }
        }

        @media (max-width: 600px) {
          .cart-item {
            grid-template-columns: 64px 1fr;
            grid-template-rows: auto auto;
          }
          .cart-item__controls {
            grid-column: 1 / -1;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  )
}
