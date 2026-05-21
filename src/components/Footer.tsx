export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__icon" aria-hidden="true">🪄</span>
          <span className="footer__title">Fizban's Wands</span>
        </div>

        <p className="footer__tagline">
          Purveyor of Magical Wands &amp; Arcane Implements since the Third Age
        </p>

        <div className="footer__runes" aria-hidden="true">
          ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ
        </div>

        <p className="footer__copy">
          &copy; {year} Fizban's Wands. All spells reserved.{' '}
          <span className="footer__disclaimer">
            No actual magical wands are sold — this is a fantasy demo shop.
          </span>
        </p>
      </div>

      <style>{`
        .footer {
          margin-top: auto;
          padding: var(--space-2xl) 0 var(--space-xl);
          border-top: 1px solid var(--color-border);
          background: var(--color-bg-nav);
        }

        .footer__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
          text-align: center;
        }

        .footer__brand {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .footer__icon {
          font-size: 1.5rem;
        }

        .footer__title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-gold);
          letter-spacing: 0.05em;
        }

        .footer__tagline {
          color: var(--color-text-muted);
          font-style: italic;
          font-size: 0.95rem;
        }

        .footer__runes {
          font-size: 1.2rem;
          color: var(--color-arcane-light);
          letter-spacing: 0.3em;
          opacity: 0.5;
        }

        .footer__copy {
          color: var(--color-text-muted);
          font-size: 0.85rem;
        }

        .footer__disclaimer {
          opacity: 0.7;
        }
      `}</style>
    </footer>
  )
}
