import { Cart, CartItem, Wand } from '../types'

const CART_KEY = 'fizban_cart'

function loadCart(): Cart {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return { items: [] }
    return JSON.parse(raw) as Cart
  } catch {
    return { items: [] }
  }
}

function saveCart(cart: Cart): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  } catch {
    // ignore write errors (e.g. private mode quota)
  }
}

export function getCart(): Cart {
  return loadCart()
}

export function addToCart(wandId: string, quantity: number = 1): void {
  const cart = loadCart()
  const existing = cart.items.find(item => item.wandId === wandId)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.items.push({ wandId, quantity })
  }
  saveCart(cart)
}

export function removeFromCart(wandId: string): void {
  const cart = loadCart()
  cart.items = cart.items.filter(item => item.wandId !== wandId)
  saveCart(cart)
}

export function updateQuantity(wandId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(wandId)
    return
  }
  const cart = loadCart()
  const existing = cart.items.find(item => item.wandId === wandId)
  if (existing) {
    existing.quantity = quantity
  } else {
    cart.items.push({ wandId, quantity })
  }
  saveCart(cart)
}

export function clearCart(): void {
  saveCart({ items: [] })
}

export function getCartTotal(wands: Wand[]): number {
  const cart = loadCart()
  return cart.items.reduce((total, cartItem) => {
    const wand = wands.find(w => w.id === cartItem.wandId)
    return total + (wand ? wand.price * cartItem.quantity : 0)
  }, 0)
}

export function getCartItemCount(): number {
  const cart = loadCart()
  return cart.items.reduce((sum, item) => sum + item.quantity, 0)
}

export type { CartItem, Cart }
