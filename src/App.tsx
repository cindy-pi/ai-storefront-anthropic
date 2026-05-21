import { useState } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './components/HomePage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderConfirmationPage } from './pages/OrderConfirmationPage'
import { useLocalStorage } from './hooks/useLocalStorage'
import { CartItem, Order, Page } from './types'
import { wands } from './store/wands'
import './styles/global.css'

const STARTING_BALANCE = 1000

function generateOrderId(): string {
  // UUID-style random string
  return 'xxxx-xxxx-xxxx'.replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  ) + '-' + Date.now().toString(36)
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('fizban-cart', [])
  const [balance, setBalance] = useLocalStorage<number>('fizban-balance', STARTING_BALANCE)
  const [orders, setOrders] = useLocalStorage<Order[]>('fizban-orders', [])
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleUpdateQuantity = (wandId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(item => item.wandId !== wandId))
      return
    }
    const existing = cartItems.find(item => item.wandId === wandId)
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.wandId === wandId ? { ...item, quantity } : item
      ))
    }
  }

  const handleRemoveItem = (wandId: string) => {
    setCartItems(cartItems.filter(item => item.wandId !== wandId))
  }

  const handlePurchase = (deliveryAddress: string, recipientName: string) => {
    const total = cartItems.reduce((sum, cartItem) => {
      const wand = wands.find(w => w.id === cartItem.wandId)
      return sum + (wand ? wand.price * cartItem.quantity : 0)
    }, 0)

    // Belt-and-suspenders: do not proceed if balance is insufficient
    if (total > balance) return

    const newBalance = Math.max(0, balance - total)
    const order: Order = {
      id: generateOrderId(),
      items: [...cartItems],
      total,
      date: new Date().toISOString(),
      recipientName,
      deliveryAddress,
    }

    setBalance(newBalance)
    setOrders([...orders, order])
    setLastOrder(order)
    setCartItems([])
    handleNavigate('confirmation')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />

      case 'catalog':
        return (
          <PlaceholderPage
            icon="📚"
            title="Wand Catalog"
            message="The catalog is being assembled by our enchanters. Coming soon."
            onBack={() => handleNavigate('home')}
          />
        )

      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            balance={balance}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={handleNavigate}
          />
        )

      case 'checkout':
        return (
          <CheckoutPage
            cartItems={cartItems}
            balance={balance}
            onPurchase={handlePurchase}
            onNavigate={handleNavigate}
          />
        )

      case 'confirmation':
        if (!lastOrder) {
          return <HomePage onNavigate={handleNavigate} />
        }
        return (
          <OrderConfirmationPage
            currentOrder={lastOrder}
            pastOrders={orders}
            onNavigate={handleNavigate}
          />
        )

      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

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

// Temporary placeholder for catalog (issue #4 feature not yet implemented)
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
