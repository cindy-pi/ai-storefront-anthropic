export type Alignment = 'Good' | 'Neutral' | 'Evil'

export interface Wand {
  id: string
  name: string
  alignment: Alignment
  wood: string
  core: string
  length: number // inches
  flexibility: string
  price: number // gold pieces
  description: string
  imageUrl: string
  effect: string
}

export interface CartItem {
  wand: Wand
  quantity: number
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  balanceAfter: number
}

export type Page = 'home' | 'catalog' | 'cart' | 'checkout' | 'confirmation'
