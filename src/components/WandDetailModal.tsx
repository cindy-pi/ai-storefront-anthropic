import { useEffect, useRef, useState } from 'react'
import { Wand, CartItem } from '../types'

interface WandDetailModalProps {
  wand: Wand
  onClose: () => void
  cartItems: CartItem[]
  onAddToCart: (wandId: string, quantity: number) => void
}

const ALIGNMENT_ICON: Record<string, string> = {
  Good: '✦',
  Neutral: '◈',
  Evil: '⬡',
}

const RARITY_COLOR: Record<string, string> = {
  Common: '#c0c0c0',
  Uncommon: '#81c784',
  Rare: '#4fc3f7',
  'Very Rare': '#ce93d8',
  Legendary: '#d4af37',
}

export function WandDetailModal({ wand, onClose, onAddToCart }: WandDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  // Focus trap + ESC key close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const modal = overlayRef.current
        if (!modal) return
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  const handleAddToCart = () => {
    onAddToCart(wand.id, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const decrement = () => setQuantity(q => Math.max(1, q - 1))
  const increment = () => setQuantity(q => Math.min(10, q + 1))

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${wand.name} — Product Details`}
    >
      <div className="modal-content animate-fade-in">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Image */}
        <div className="modal-image-wrap">
          <img
            src={wand.imageUrl}
            alt={wand.name}
            className="modal-image"
            width="200"
            height="240"
          />
        </div>

        {/* Details */}
        <div className="modal-body">
          <h2 className="modal-wand-name">{wand.name}</h2>

          {/* Badges */}
          <div className="modal-badges">
            <span className={`badge badge-${wand.alignment}`}>
              {ALIGNMENT_ICON[wand.alignment]} {wand.alignment}
            </span>
            <span className="badge modal-rarity-badge" style={{ color: RARITY_COLOR[wand.rarity] }}>
              {wand.rarity}
            </span>
          </div>

          {/* Price */}
          <p className="modal-price">
            <span className="modal-price-icon" aria-hidden="true">💰</span>
            {wand.price.toLocaleString()} gold pieces
          </p>

          {/* Description */}
          <p className="modal-description">{wand.description}</p>

          {/* Magical Properties */}
          <section className="modal-section">
            <h3 className="modal-section-title">Magical Properties</h3>
            <ul className="modal-properties-list">
              {wand.magicalProperties.map((prop, i) => (
                <li key={i}>{prop}</li>
              ))}
            </ul>
          </section>

          {/* Special Effect */}
          <section className="modal-section">
            <h3 className="modal-section-title">Special Effect</h3>
            <div className="modal-special-effect">
              <span className="modal-special-icon" aria-hidden="true">✨</span>
              {wand.specialEffect}
            </div>
          </section>

          {/* Quantity + Add to Cart */}
          <div className="modal-purchase">
            <div className="modal-quantity" role="group" aria-label="Quantity selector">
              <button
                className="modal-qty-btn"
                onClick={decrement}
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="modal-qty-value" aria-live="polite" aria-atomic="true">
                {quantity}
              </span>
              <button
                className="modal-qty-btn"
                onClick={increment}
                aria-label="Increase quantity"
                disabled={quantity >= 10}
                ref={firstFocusableRef}
              >
                +
              </button>
            </div>

            <button
              className={`btn btn-primary modal-add-btn ${added ? 'modal-add-btn--added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ Added!' : '🛒 Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: var(--color-overlay);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: var(--space-md);
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: var(--color-bg-modal);
          border: 1px solid var(--color-border-hover);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card-hover), 0 0 60px var(--color-arcane-glow);
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          display: flex;
          flex-direction: row;
          gap: 0;
        }

        .modal-close {
          position: absolute;
          top: var(--space-md);
          right: var(--space-md);
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.07);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          z-index: 1;
        }
        .modal-close:hover {
          background: rgba(239,83,80,0.2);
          color: #ef5350;
          border-color: rgba(239,83,80,0.4);
        }

        .modal-image-wrap {
          flex-shrink: 0;
          width: 200px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: var(--space-xl) var(--space-md) var(--space-xl) var(--space-xl);
        }

        .modal-image {
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }

        .modal-body {
          flex: 1;
          padding: var(--space-xl) var(--space-xl) var(--space-xl) var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          padding-top: calc(var(--space-xl) + 8px);
        }

        .modal-wand-name {
          font-size: 1.6rem;
          line-height: 1.2;
          padding-right: 40px;
        }

        .modal-badges {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          flex-wrap: wrap;
        }

        .modal-rarity-badge {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
        }

        .modal-price {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-gold);
        }
        .modal-price-icon {
          font-size: 1.2rem;
        }

        .modal-description {
          color: var(--color-text-muted);
          font-style: italic;
          line-height: 1.7;
          font-size: 1rem;
        }

        .modal-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .modal-section-title {
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-gold);
          font-weight: 700;
        }

        .modal-properties-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }
        .modal-properties-list li {
          color: var(--color-text);
          font-size: 0.95rem;
          padding-left: var(--space-md);
          position: relative;
          line-height: 1.5;
        }
        .modal-properties-list li::before {
          content: '◆';
          position: absolute;
          left: 0;
          color: var(--color-arcane-light);
          font-size: 0.6rem;
          top: 0.4em;
        }

        .modal-special-effect {
          background: rgba(123, 79, 255, 0.1);
          border: 1px solid rgba(123, 79, 255, 0.3);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          color: var(--color-arcane-light);
          font-size: 0.95rem;
          line-height: 1.6;
          display: flex;
          gap: var(--space-sm);
        }
        .modal-special-icon {
          flex-shrink: 0;
        }

        .modal-purchase {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding-top: var(--space-sm);
          flex-wrap: wrap;
          margin-top: auto;
        }

        .modal-quantity {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--space-xs) var(--space-sm);
        }

        .modal-qty-btn {
          width: 30px;
          height: 30px;
          border-radius: var(--radius-sm);
          background: rgba(212,175,55,0.1);
          border: 1px solid var(--color-border);
          color: var(--color-gold);
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          font-family: var(--font-body);
        }
        .modal-qty-btn:hover:not(:disabled) {
          background: rgba(212,175,55,0.25);
          border-color: var(--color-gold);
        }
        .modal-qty-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .modal-qty-value {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text);
          min-width: 24px;
          text-align: center;
        }

        .modal-add-btn {
          flex: 1;
          min-width: 140px;
          padding: var(--space-sm) var(--space-lg);
          font-size: 0.9rem;
          transition: all var(--transition-base);
        }
        .modal-add-btn--added {
          background: linear-gradient(135deg, #2e7d32, #43a047) !important;
          box-shadow: 0 0 20px rgba(67,160,71,0.4) !important;
        }

        @media (max-width: 600px) {
          .modal-content {
            flex-direction: column;
          }
          .modal-image-wrap {
            width: 100%;
            padding: var(--space-xl) var(--space-xl) 0;
            justify-content: center;
          }
          .modal-image {
            max-width: 160px;
          }
          .modal-body {
            padding: var(--space-md) var(--space-lg) var(--space-xl);
          }
        }
      `}</style>
    </div>
  )
}
