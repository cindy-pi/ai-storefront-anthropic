import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Page, CartItem } from '../types'

interface LayoutProps {
  children: React.ReactNode
  currentPage: Page
  onNavigate: (page: Page) => void
  cartItems: CartItem[]
  balance: number
}

export function Layout({ children, currentPage, onNavigate, cartItems, balance }: LayoutProps) {
  return (
    <div className="layout">
      <Navbar
        currentPage={currentPage}
        onNavigate={onNavigate}
        cartItems={cartItems}
        balance={balance}
      />
      <main id="main-content" className="layout__main">
        {children}
      </main>
      <Footer />

      <style>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .layout__main {
          flex: 1;
        }
      `}</style>
    </div>
  )
}
