import { Page } from '../types'

interface HomePageProps {
  onNavigate: (page: Page) => void
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="feature-card card" aria-label={title}>
      <div className="feature-card__icon" aria-hidden="true">{icon}</div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>

      <style>{`
        .feature-card {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--space-md);
        }
        .feature-card__icon {
          font-size: 2.5rem;
          line-height: 1;
        }
        .feature-card__title {
          font-size: 1rem;
          color: var(--color-gold);
          letter-spacing: 0.04em;
        }
        .feature-card__desc {
          color: var(--color-text-muted);
          font-size: 1rem;
          line-height: 1.6;
        }
      `}</style>
    </article>
  )
}

interface AlignmentCardProps {
  alignment: 'Good' | 'Neutral' | 'Evil'
  icon: string
  description: string
  onNavigate: (page: Page) => void
}

function AlignmentCard({ alignment, icon, description, onNavigate }: AlignmentCardProps) {
  return (
    <article
      className={`alignment-card card alignment-card--${alignment}`}
      aria-label={`${alignment} alignment wands`}
    >
      <div className="alignment-card__icon" aria-hidden="true">{icon}</div>
      <h3 className="alignment-card__title">{alignment}</h3>
      <p className="alignment-card__desc">{description}</p>
      <button
        className="btn btn-secondary alignment-card__btn"
        onClick={() => onNavigate('catalog')}
        aria-label={`Browse ${alignment} alignment wands`}
      >
        Browse Wands
      </button>

      <style>{`
        .alignment-card {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
          text-align: center;
        }
        .alignment-card__icon {
          font-size: 3rem;
          line-height: 1;
          animation: floatGlow 3s ease-in-out infinite;
        }
        .alignment-card--Good .alignment-card__icon {
          filter: drop-shadow(0 0 12px var(--color-good));
        }
        .alignment-card--Neutral .alignment-card__icon {
          filter: drop-shadow(0 0 12px var(--color-neutral));
          animation-delay: 1s;
        }
        .alignment-card--Evil .alignment-card__icon {
          filter: drop-shadow(0 0 12px var(--color-evil));
          animation-delay: 2s;
        }
        .alignment-card__title {
          font-size: 1.1rem;
          letter-spacing: 0.06em;
        }
        .alignment-card--Good .alignment-card__title { color: var(--color-good); }
        .alignment-card--Neutral .alignment-card__title { color: var(--color-neutral); }
        .alignment-card--Evil .alignment-card__title { color: var(--color-evil); }

        .alignment-card__desc {
          color: var(--color-text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          flex: 1;
        }
        .alignment-card__btn {
          margin-top: var(--space-sm);
        }
        .alignment-card--Good .alignment-card__btn {
          color: var(--color-good);
          border-color: rgba(79, 195, 247, 0.3);
        }
        .alignment-card--Good .alignment-card__btn:hover {
          background: rgba(79, 195, 247, 0.08);
          border-color: var(--color-good);
          box-shadow: 0 0 20px rgba(79, 195, 247, 0.3);
        }
        .alignment-card--Neutral .alignment-card__btn {
          color: var(--color-neutral);
          border-color: rgba(129, 199, 132, 0.3);
        }
        .alignment-card--Neutral .alignment-card__btn:hover {
          background: rgba(129, 199, 132, 0.08);
          border-color: var(--color-neutral);
          box-shadow: 0 0 20px rgba(129, 199, 132, 0.3);
        }
        .alignment-card--Evil .alignment-card__btn {
          color: var(--color-evil);
          border-color: rgba(239, 83, 80, 0.3);
        }
        .alignment-card--Evil .alignment-card__btn:hover {
          background: rgba(239, 83, 80, 0.08);
          border-color: var(--color-evil);
          box-shadow: 0 0 20px rgba(239, 83, 80, 0.3);
        }
      `}</style>
    </article>
  )
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features: FeatureCardProps[] = [
    {
      icon: '✨',
      title: 'Enchanted Craftsmanship',
      description: 'Each wand is hand-crafted from rare magical woods and imbued with powerful arcane cores sourced from across the planes.',
    },
    {
      icon: '⚖️',
      title: 'Three Alignments',
      description: 'Browse our curated collections of Good, Neutral, and Evil alignment wands — the right wand chooses its wielder.',
    },
    {
      icon: '💰',
      title: '1,000 gp Starting Balance',
      description: 'Every adventurer begins with 1,000 gold pieces. Spend wisely — the finest wands command the finest prices.',
    },
    {
      icon: '📜',
      title: 'Magical Delivery Receipts',
      description: 'Upon purchase, receive an enchanted parchment receipt delivered by magical means directly to your consciousness.',
    },
    {
      icon: '🔮',
      title: '36 Unique Wands',
      description: 'Our catalog features 36 extraordinary wands — 12 per alignment — each with a unique wood, core, and magical effect.',
    },
    {
      icon: '🛡️',
      title: 'Satisfaction Guaranteed',
      description: 'If your wand fails to petrify your enemies or heal your allies, Fizban himself will personally investigate the matter.',
    },
  ]

  const alignments: AlignmentCardProps[] = [
    {
      alignment: 'Good',
      icon: '☀️',
      description: 'Wands of light and healing, wielded by paladins, clerics, and those who protect the innocent. Crafted from Phoenix Feather and Unicorn Hair.',
      onNavigate,
    },
    {
      alignment: 'Neutral',
      icon: '🌿',
      description: 'Wands of balance and nature, favored by druids, rangers, and those who walk the path between light and shadow.',
      onNavigate,
    },
    {
      alignment: 'Evil',
      icon: '💀',
      description: 'Wands of shadow and death, sought by necromancers, warlocks, and those who bend reality to their darkest will.',
      onNavigate,
    },
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__bg-runes" aria-hidden="true">
          <span className="hero__rune hero__rune--1">ᚠ</span>
          <span className="hero__rune hero__rune--2">ᚱ</span>
          <span className="hero__rune hero__rune--3">ᚦ</span>
          <span className="hero__rune hero__rune--4">ᚢ</span>
          <span className="hero__rune hero__rune--5">ᚲ</span>
        </div>

        <div className="container hero__content animate-fade-in">
          <div className="hero__icon" aria-hidden="true">🪄</div>
          <h1 id="hero-heading" className="hero__title">
            Fizban's Wands
          </h1>
          <p className="hero__subtitle">
            Emporium of Magical Implements &amp; Arcane Curiosities
          </p>
          <p className="hero__desc">
            Welcome, adventurer. You have found the finest purveyor of magical wands in all the realms.
            Whether you seek the light of the heavens or the darkness of the abyss, Fizban has the
            perfect wand waiting for you. But choose wisely — the wand chooses the wizard.
          </p>

          <div className="hero__actions">
            <button
              className="btn btn-primary hero__cta"
              onClick={() => onNavigate('catalog')}
              aria-label="Browse the wand catalog"
            >
              <span aria-hidden="true">✨</span>
              Browse the Catalog
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate('cart')}
              aria-label="View your cart"
            >
              <span aria-hidden="true">🛒</span>
              View Cart
            </button>
          </div>

          <div className="hero__stats" aria-label="Shop statistics">
            <div className="hero__stat">
              <span className="hero__stat-value">36</span>
              <span className="hero__stat-label">Unique Wands</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-value">3</span>
              <span className="hero__stat-label">Alignments</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-value">1,000</span>
              <span className="hero__stat-label">Starting Gold</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quote / Lore Section */}
      <section className="lore-section" aria-labelledby="lore-heading">
        <div className="container">
          <blockquote className="lore-quote">
            <p className="lore-quote__text">
              "I have forgotten more about magic than most wizards will ever learn. The secret is not
              in the spell — it is in the wand. A poor wand in the hands of a great wizard produces
              mediocre magic. But the right wand… the right wand makes even a clumsy apprentice
              capable of miracles."
            </p>
            <footer className="lore-quote__attribution">
              — Fizban the Fabulous, Archmage Emeritus
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Alignment Selection */}
      <section className="alignments-section" aria-labelledby="alignments-heading">
        <div className="container">
          <div className="rune-divider" aria-hidden="true">✦</div>
          <h2 id="alignments-heading" className="section-title">Shop by Alignment</h2>
          <p className="section-subtitle">
            Every wand carries an alignment that resonates with its wielder's nature.
            Which path do you walk?
          </p>
          <div className="alignments-grid">
            {alignments.map((a) => (
              <AlignmentCard key={a.alignment} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" aria-labelledby="features-heading">
        <div className="container">
          <div className="rune-divider" aria-hidden="true">✦</div>
          <h2 id="features-heading" className="section-title">Why Choose Fizban's?</h2>
          <p className="section-subtitle">
            Generations of adventurers have trusted Fizban's Wands for their most perilous quests.
          </p>
          <div className="features-grid">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner" aria-labelledby="cta-heading">
        <div className="container cta-banner__inner">
          <div>
            <h2 id="cta-heading" className="cta-banner__title">
              Your Adventure Awaits
            </h2>
            <p className="cta-banner__desc">
              Start with 1,000 gold pieces and find your perfect wand.
            </p>
          </div>
          <button
            className="btn btn-primary cta-banner__btn"
            onClick={() => onNavigate('catalog')}
          >
            <span aria-hidden="true">🪄</span>
            Enter the Emporium
          </button>
        </div>
      </section>

      <style>{`
        /* ---- Hero ---- */
        .hero {
          position: relative;
          overflow: hidden;
          padding: var(--space-3xl) 0;
          text-align: center;
          background: radial-gradient(ellipse at 50% 0%, rgba(123, 79, 255, 0.15) 0%, transparent 70%);
        }

        .hero__bg-runes {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .hero__rune {
          position: absolute;
          font-size: 6rem;
          color: var(--color-arcane);
          opacity: 0.04;
          font-family: serif;
          animation: shimmer 4s ease-in-out infinite;
        }
        .hero__rune--1 { top: 5%; left: 5%; font-size: 8rem; animation-delay: 0s; }
        .hero__rune--2 { top: 10%; right: 8%; font-size: 10rem; animation-delay: 0.8s; }
        .hero__rune--3 { bottom: 10%; left: 12%; font-size: 7rem; animation-delay: 1.6s; }
        .hero__rune--4 { bottom: 5%; right: 5%; font-size: 9rem; animation-delay: 2.4s; }
        .hero__rune--5 { top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 14rem; animation-delay: 3.2s; }

        .hero__content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-lg);
        }

        .hero__icon {
          font-size: 5rem;
          line-height: 1;
          animation: floatGlow 3s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(212,175,55,0.6));
        }

        .hero__title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          letter-spacing: 0.04em;
          background: linear-gradient(135deg, var(--color-gold-dark), var(--color-gold-light), var(--color-gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .hero__subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          font-style: italic;
          color: var(--color-arcane-light);
          letter-spacing: 0.05em;
        }

        .hero__desc {
          max-width: 640px;
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: var(--color-text-muted);
          line-height: 1.7;
        }

        .hero__actions {
          display: flex;
          gap: var(--space-md);
          flex-wrap: wrap;
          justify-content: center;
          margin-top: var(--space-sm);
        }

        .hero__cta {
          padding: var(--space-md) var(--space-xl);
          font-size: 1rem;
        }

        .hero__stats {
          display: flex;
          align-items: center;
          gap: var(--space-xl);
          margin-top: var(--space-xl);
          padding: var(--space-lg) var(--space-2xl);
          background: rgba(212, 175, 55, 0.06);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero__stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xs);
        }

        .hero__stat-value {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-gold);
          line-height: 1;
        }

        .hero__stat-label {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero__stat-divider {
          width: 1px;
          height: 40px;
          background: var(--color-border);
        }

        /* ---- Lore / Quote ---- */
        .lore-section {
          padding: var(--space-2xl) 0;
          background: rgba(123, 79, 255, 0.04);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }

        .lore-quote {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
        }

        .lore-quote::before {
          content: '"';
          position: absolute;
          top: -2rem;
          left: -1rem;
          font-size: 8rem;
          color: var(--color-arcane);
          opacity: 0.15;
          font-family: Georgia, serif;
          line-height: 1;
        }

        .lore-quote__text {
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          font-style: italic;
          color: var(--color-text);
          line-height: 1.8;
          position: relative;
          z-index: 1;
        }

        .lore-quote__attribution {
          margin-top: var(--space-md);
          font-family: var(--font-display);
          font-size: 0.85rem;
          color: var(--color-gold);
          letter-spacing: 0.05em;
        }

        /* ---- Shared Section Styles ---- */
        .section-title {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          text-align: center;
          letter-spacing: 0.04em;
          margin-bottom: var(--space-sm);
        }

        .section-subtitle {
          text-align: center;
          color: var(--color-text-muted);
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto var(--space-2xl);
          line-height: 1.7;
        }

        /* ---- Alignments Section ---- */
        .alignments-section {
          padding: var(--space-2xl) 0 var(--space-3xl);
        }

        .alignments-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }

        /* ---- Features Section ---- */
        .features-section {
          padding: var(--space-2xl) 0 var(--space-3xl);
          background: radial-gradient(ellipse at 50% 100%, rgba(123, 79, 255, 0.06) 0%, transparent 60%);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }

        /* ---- CTA Banner ---- */
        .cta-banner {
          padding: var(--space-2xl) 0;
          background: linear-gradient(135deg, rgba(123, 79, 255, 0.15), rgba(212, 175, 55, 0.08));
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }

        .cta-banner__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-xl);
          flex-wrap: wrap;
        }

        .cta-banner__title {
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          margin-bottom: var(--space-sm);
        }

        .cta-banner__desc {
          color: var(--color-text-muted);
          font-size: 1.05rem;
        }

        .cta-banner__btn {
          padding: var(--space-md) var(--space-xl);
          font-size: 1rem;
          flex-shrink: 0;
        }

        /* ---- Responsive ---- */
        @media (max-width: 900px) {
          .alignments-grid {
            grid-template-columns: 1fr;
          }
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .hero {
            padding: var(--space-2xl) 0;
          }
          .hero__icon {
            font-size: 3.5rem;
          }
          .hero__stats {
            gap: var(--space-lg);
            padding: var(--space-md);
          }
          .hero__stat-divider {
            display: none;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
          .cta-banner__inner {
            text-align: center;
            justify-content: center;
          }
          .lore-quote::before {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
