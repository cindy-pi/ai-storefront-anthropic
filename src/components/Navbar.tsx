import { useState } from 'react'
import { Page, CartItem } from '../types'

interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  cartItems: CartItem[]
  balance: number
}

export function Navbar({ currentPage, onNavigate, cartItems, balance }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Wand Catalog', page: 'catalog' },
  ]

  const handleNav = (page: Page) => {
    onNavigate(page)
    setMenuOpen(false)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__inner container">
        {/* Logo / Brand */}
        <button
          className="navbar__brand"
          onClick={() => handleNav('home')}
          aria-label="Fizban's Wands — Home"
        >
          <span className="navbar__brand-icon" aria-hidden="true">🪄</span>
          <span className="navbar__brand-name">Fizban's Wands</span>
        </button>

        {/* Desktop Nav Links */}
        <ul className="navbar__links" role="list">
          {navLinks.map(({ label, page }) => (
            <li key={page}>
              <button
                className={`navbar__link ${currentPage === page ? 'navbar__link--active' : ''}`}
                onClick={() => handleNav(page)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: balance + cart */}
        <div className="navbar__actions">
          {/* Gold Balance */}
          <div className="navbar__balance" aria-label={`Balance: ${balance} gold pieces`}>
            <span className="navbar__balance-icon" aria-hidden="true">💰</span>
            <span className="navbar__balance-amount">{balance.toLocaleString()} gp</span>
          </div>

          {/* Cart Button */}
          <button
            className="navbar__cart-btn"
            onClick={() => handleNav('cart')}
            aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          >
            <span className="navbar__cart-icon" aria-hidden="true">🛒</span>
            {totalItems > 0 && (
              <span className="navbar__cart-badge" aria-hidden="true">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`navbar__hamburger-bar ${menuOpen ? 'navbar__hamburger-bar--open' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div id="mobile-menu" className="navbar__mobile-menu">
          <ul role="list">
            {navLinks.map(({ label, page }) => (
              <li key={page}>
                <button
                  className={`navbar__mobile-link ${currentPage === page ? 'navbar__mobile-link--active' : ''}`}
                  onClick={() => handleNav(page)}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button
                className="navbar__mobile-link"
                onClick={() => handleNav('cart')}
              >
                Cart {totalItems > 0 && <span>({totalItems})</span>}
              </button>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--color-bg-nav);
          border-bottom: 1px solid var(--color-border);
          box-shadow: var(--shadow-nav);
          backdrop-filter: blur(8px);
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          height: var(--nav-height);
          gap: var(--space-lg);
        }

        /* Brand */
        .navbar__brand {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }
        .navbar__brand:hover {
          background: rgba(212, 175, 55, 0.08);
        }
        .navbar__brand-icon {
          font-size: 1.5rem;
          animation: floatGlow 3s ease-in-out infinite;
        }
        .navbar__brand-name {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-gold);
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        /* Desktop links */
        .navbar__links {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          list-style: none;
          flex: 1;
        }

        .navbar__link {
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          position: relative;
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: calc(100% - 1.5rem);
          height: 2px;
          background: var(--color-gold);
          border-radius: 1px;
          transition: transform var(--transition-fast);
        }
        .navbar__link:hover {
          color: var(--color-text);
          background: rgba(212, 175, 55, 0.06);
        }
        .navbar__link--active {
          color: var(--color-gold);
        }
        .navbar__link--active::after {
          transform: translateX(-50%) scaleX(1);
        }

        /* Actions */
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-left: auto;
        }

        /* Balance */
        .navbar__balance {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-md);
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
        }
        .navbar__balance-icon {
          font-size: 1rem;
        }
        .navbar__balance-amount {
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-gold);
          white-space: nowrap;
        }

        /* Cart */
        .navbar__cart-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: rgba(123, 79, 255, 0.15);
          border: 1px solid rgba(123, 79, 255, 0.3);
          transition: all var(--transition-fast);
          font-size: 1.2rem;
        }
        .navbar__cart-btn:hover {
          background: rgba(123, 79, 255, 0.3);
          box-shadow: var(--shadow-glow-arcane);
        }
        .navbar__cart-icon {
          line-height: 1;
        }
        .navbar__cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--color-gold);
          color: #1a0e00;
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          padding: 0 4px;
        }

        /* Hamburger */
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: transparent;
          border: 1px solid var(--color-border);
          cursor: pointer;
          transition: all var(--transition-fast);
          padding: 0;
        }
        .navbar__hamburger:hover {
          background: rgba(212, 175, 55, 0.08);
        }
        .navbar__hamburger-bar {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--color-text);
          border-radius: 1px;
          box-shadow:
            0 -6px 0 var(--color-text),
            0 6px 0 var(--color-text);
          transition: all var(--transition-fast);
        }
        .navbar__hamburger-bar--open {
          background: transparent;
          box-shadow: none;
          position: relative;
        }
        .navbar__hamburger-bar--open::before,
        .navbar__hamburger-bar--open::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 2px;
          background: var(--color-gold);
          border-radius: 1px;
          left: 0;
        }
        .navbar__hamburger-bar--open::before {
          transform: rotate(45deg);
        }
        .navbar__hamburger-bar--open::after {
          transform: rotate(-45deg);
        }

        /* Mobile menu */
        .navbar__mobile-menu {
          background: var(--color-bg-nav);
          border-top: 1px solid var(--color-border);
          padding: var(--space-md);
          animation: fadeIn 150ms ease;
        }
        .navbar__mobile-menu ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }
        .navbar__mobile-link {
          display: block;
          width: 100%;
          text-align: left;
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-md);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }
        .navbar__mobile-link:hover {
          color: var(--color-text);
          background: rgba(212, 175, 55, 0.08);
        }
        .navbar__mobile-link--active {
          color: var(--color-gold);
          background: rgba(212, 175, 55, 0.06);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .navbar__links {
            display: none;
          }
          .navbar__hamburger {
            display: flex;
          }
          .navbar__brand-name {
            font-size: 1rem;
          }
          .navbar__balance-amount {
            display: none;
          }
          .navbar__balance {
            padding: var(--space-xs) var(--space-sm);
          }
          .navbar__balance-icon {
            font-size: 1.1rem;
          }
        }

        @media (min-width: 769px) {
          .navbar__mobile-menu {
            display: none;
          }
        }
      `}</style>
    </nav>
  )
}
