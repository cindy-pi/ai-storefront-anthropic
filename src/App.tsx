import { useState } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './components/HomePage'
import { useLocalStorage } from './hooks/useLocalStorage'
import { CartItem, Order, Page } from './types'
import './styles/global.css'

const STARTING_BALANCE = 1000

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('fizban-cart', [])
  const [balance, setBalance] = useLocalStorage<number>('fizban-balance', STARTING_BALANCE)
  const [orders, setOrders] = useLocalStorage<Order[]>('fizban-orders', [])

  // Expose setters for child pages (catalog, cart, checkout will use these)
  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Placeholder renderers for pages not yet built (issues #4 and #5)
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />

      case 'catalog':
        return (
          <PlaceholderPage
            icon="📚"
            title="Wand Catalog"
            message="The catalog is being assembled by our enchanters. Coming in issue #4."
            onBack={() => handleNavigate('home')}
          />
        )

      case 'cart':
        return (
          <PlaceholderPage
            icon="🛒"
            title="Shopping Cart"
            message="The cart enchantment is being woven. Coming in issue #5."
            onBack={() => handleNavigate('home')}
          />
        )

      case 'checkout':
        return (
          <PlaceholderPage
            icon="💰"
            title="Checkout"
            message="The checkout ritual is being prepared. Coming in issue #5."
            onBack={() => handleNavigate('cart')}
          />
        )

      case 'confirmation':
        return (
          <PlaceholderPage
            icon="📜"
            title="Order Confirmation"
            message="Your magical delivery receipt is being inscribed. Coming in issue #5."
            onBack={() => handleNavigate('home')}
          />
        )

      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  // Suppress unused variable warnings for state used by future issues
  void orders
  void setOrders
  void setBalance
  void setCartItems

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      cartItems={cartItems}
      balance={balance}
    >
      {renderPage()}
    </Layout>
  )
}

// Temporary placeholder until issues #4 and #5 implement those pages
interface PlaceholderPageProps {
  icon: string
  title: string
  message: string
  onBack: () => void
}

function PlaceholderPage({ icon, title, message, onBack }: PlaceholderPageProps) {
  return (
    <div className="placeholder-page container">
      <div className="placeholder-page__card card animate-fade-in">
        <div className="placeholder-page__icon" aria-hidden="true">{icon}</div>
        <h1 className="placeholder-page__title">{title}</h1>
        <p className="placeholder-page__msg">{message}</p>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Return
        </button>
      </div>

      <style>{`
        .placeholder-page {
          padding: var(--space-3xl) var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }
        .placeholder-page__card {
          padding: var(--space-3xl) var(--space-2xl);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-lg);
          max-width: 480px;
          width: 100%;
        }
        .placeholder-page__icon {
          font-size: 4rem;
          animation: floatGlow 3s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(212,175,55,0.4));
        }
        .placeholder-page__title {
          font-size: 1.8rem;
        }
        .placeholder-page__msg {
          color: var(--color-text-muted);
          line-height: 1.7;
        }
      `}</style>
    </div>
  )
}

export default App
