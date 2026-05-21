import { useState } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './components/HomePage'
import { CatalogPage } from './pages/CatalogPage'
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

  const handleAddToCart = (wandId: string, quantity: number) => {
    const existing = cartItems.find(item => item.wandId === wandId)
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.wandId === wandId ? { ...item, quantity: item.quantity + quantity } : item
      ))
    } else {
      setCartItems([...cartItems, { wandId, quantity }])
    }
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
          <CatalogPage
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
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


export default App
