import { useState } from 'react'
import { wands } from '../store/wands'
import { Wand, CartItem, Alignment } from '../types'
import { WandDetailModal } from '../components/WandDetailModal'

type AlignmentFilter = 'All' | Alignment

interface CatalogPageProps {
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

function WandCard({
  wand,
  onViewDetails,
  onAddToCart,
}: {
  wand: Wand
  onViewDetails: (wand: Wand) => void
  onAddToCart: (wandId: string, quantity: number) => void
}) {
  const [shimmer, setShimmer] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart(wand.id, 1)
    setShimmer(true)
    setTimeout(() => setShimmer(false), 700)
  }

  return (
    <article
      className={`wand-card card ${shimmer ? 'wand-card--shimmer' : ''}`}
      onClick={() => onViewDetails(wand)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${wand.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onViewDetails(wand)
        }
      }}
    >
      {/* Image */}
      <div className="wand-card__image-wrap">
        <img
          src={wand.imageUrl}
          alt={wand.name}
          className="wand-card__image"
          width="200"
          height="240"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="wand-card__body">
        <h3 className="wand-card__name">{wand.name}</h3>

        <div className="wand-card__badges">
          <span className={`badge badge-${wand.alignment}`}>
            {ALIGNMENT_ICON[wand.alignment]} {wand.alignment}
          </span>
          <span
            className="badge wand-card__rarity"
            style={{ color: RARITY_COLOR[wand.rarity] }}
          >
            {wand.rarity}
          </span>
        </div>

        <p className="wand-card__price">
          <span aria-hidden="true">💰</span>
          {wand.price.toLocaleString()} gp
        </p>
      </div>

      {/* Actions */}
      <div className="wand-card__actions">
        <button
          className="btn btn-secondary wand-card__detail-btn"
          onClick={(e) => { e.stopPropagation(); onViewDetails(wand) }}
          tabIndex={-1}
          aria-hidden="true"
        >
          View Details
        </button>
        <button
          className="btn btn-primary wand-card__cart-btn"
          onClick={handleAddToCart}
          aria-label={`Add ${wand.name} to cart`}
        >
          + Cart
        </button>
      </div>
    </article>
  )
}

export function CatalogPage({ cartItems, onAddToCart }: CatalogPageProps) {
  const [filter, setFilter] = useState<AlignmentFilter>('All')
  const [selectedWand, setSelectedWand] = useState<Wand | null>(null)

  const filteredWands = filter === 'All'
    ? wands
    : wands.filter(w => w.alignment === filter)

  const filters: AlignmentFilter[] = ['All', 'Good', 'Neutral', 'Evil']

  const handleAddToCart = (wandId: string, quantity: number) => {
    onAddToCart(wandId, quantity)
  }

  return (
    <div className="catalog-page container">
      {/* Heading */}
      <header className="catalog-header">
        <div className="rune-divider" aria-hidden="true">⟡</div>
        <h1 className="catalog-title">The Wand Collection</h1>
        <div className="rune-divider" aria-hidden="true">⟡</div>
      </header>

      {/* Filter bar */}
      <div className="catalog-filters" role="group" aria-label="Filter wands by alignment">
        {filters.map(f => (
          <button
            key={f}
            className={`catalog-filter-btn ${filter === f ? 'catalog-filter-btn--active' : ''} ${f !== 'All' ? `catalog-filter-btn--${f.toLowerCase()}` : ''}`}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f !== 'All' && <span aria-hidden="true">{ALIGNMENT_ICON[f]}</span>}
            {f}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="catalog-count" aria-live="polite" aria-atomic="true">
        Showing <strong>{filteredWands.length}</strong> of <strong>{wands.length}</strong> wands
      </p>

      {/* Grid */}
      <div className="catalog-grid" role="list" aria-label="Wand catalog">
        {filteredWands.map(wand => (
          <div key={wand.id} role="listitem">
            <WandCard
              wand={wand}
              onViewDetails={setSelectedWand}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedWand && (
        <WandDetailModal
          wand={selectedWand}
          onClose={() => setSelectedWand(null)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
        />
      )}

      <style>{`
        .catalog-page {
          padding: var(--space-2xl) var(--space-lg);
        }

        .catalog-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-2xl);
          text-align: center;
        }

        .catalog-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          letter-spacing: 0.06em;
        }

        /* Filter bar */
        .catalog-filters {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
          flex-wrap: wrap;
        }

        .catalog-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-sm) var(--space-lg);
          border-radius: var(--radius-xl);
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          background: transparent;
          border: 1px solid var(--color-border);
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        .catalog-filter-btn:hover {
          color: var(--color-text);
          border-color: var(--color-border-hover);
          background: rgba(212,175,55,0.06);
        }
        .catalog-filter-btn--active {
          color: var(--color-gold);
          border-color: var(--color-gold);
          background: rgba(212,175,55,0.1);
          box-shadow: 0 0 12px rgba(212,175,55,0.2);
          position: relative;
        }
        .catalog-filter-btn--active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 20%;
          width: 60%;
          height: 2px;
          background: var(--color-gold);
          border-radius: 1px;
        }
        .catalog-filter-btn--good.catalog-filter-btn--active {
          color: var(--color-good);
          border-color: var(--color-good);
          background: var(--color-good-bg);
          box-shadow: 0 0 12px rgba(79,195,247,0.2);
        }
        .catalog-filter-btn--good.catalog-filter-btn--active::after {
          background: var(--color-good);
        }
        .catalog-filter-btn--neutral.catalog-filter-btn--active {
          color: var(--color-neutral);
          border-color: var(--color-neutral);
          background: var(--color-neutral-bg);
          box-shadow: 0 0 12px rgba(129,199,132,0.2);
        }
        .catalog-filter-btn--neutral.catalog-filter-btn--active::after {
          background: var(--color-neutral);
        }
        .catalog-filter-btn--evil.catalog-filter-btn--active {
          color: var(--color-evil);
          border-color: var(--color-evil);
          background: var(--color-evil-bg);
          box-shadow: 0 0 12px rgba(239,83,80,0.2);
        }
        .catalog-filter-btn--evil.catalog-filter-btn--active::after {
          background: var(--color-evil);
        }

        /* Count */
        .catalog-count {
          text-align: center;
          color: var(--color-text-muted);
          font-size: 0.9rem;
          margin-bottom: var(--space-xl);
        }
        .catalog-count strong {
          color: var(--color-gold);
        }

        /* Grid */
        .catalog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-lg);
        }
        @media (min-width: 480px) {
          .catalog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .catalog-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1100px) {
          .catalog-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Wand card */
        .wand-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          overflow: hidden;
          transition: all var(--transition-base);
          height: 100%;
        }

        .wand-card__image-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.2);
          padding: var(--space-md);
          border-bottom: 1px solid var(--color-border);
        }

        .wand-card__image {
          width: 120px;
          height: auto;
          border-radius: var(--radius-sm);
          transition: transform var(--transition-base);
        }
        .wand-card:hover .wand-card__image {
          transform: scale(1.05);
        }

        .wand-card__body {
          flex: 1;
          padding: var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .wand-card__name {
          font-size: 1rem;
          color: var(--color-text-heading);
          line-height: 1.3;
        }

        .wand-card__badges {
          display: flex;
          gap: var(--space-xs);
          flex-wrap: wrap;
          margin-top: var(--space-xs);
        }

        .wand-card__rarity {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .wand-card__price {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-gold);
          margin-top: var(--space-xs);
        }

        /* Actions */
        .wand-card__actions {
          display: flex;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md) var(--space-md);
        }
        .wand-card__detail-btn {
          flex: 1;
          font-size: 0.75rem;
          padding: var(--space-xs) var(--space-sm);
        }
        .wand-card__cart-btn {
          font-size: 0.75rem;
          padding: var(--space-xs) var(--space-sm);
          white-space: nowrap;
        }

        /* Shimmer/glow effect on add to cart */
        @keyframes cardShimmer {
          0% { box-shadow: var(--shadow-card); }
          40% { box-shadow: 0 0 30px rgba(212,175,55,0.6), 0 0 60px rgba(212,175,55,0.3), var(--shadow-card-hover); }
          100% { box-shadow: var(--shadow-card); }
        }
        .wand-card--shimmer {
          animation: cardShimmer 0.7s ease;
        }
      `}</style>
    </div>
  )
}
