export type Alignment = 'Good' | 'Neutral' | 'Evil'

export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary'

export interface Wand {
  id: string
  name: string
  alignment: Alignment
  description: string
  price: number
  magicalProperties: string[]
  rarity: Rarity
  imageUrl: string
  specialEffect: string
}

export interface CartItem {
  wandId: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  date: string
  recipientName: string
  deliveryAddress: string
}

export interface Customer {
  goldBalance: number
  purchaseHistory: Order[]
}

export type Page = 'home' | 'catalog' | 'cart' | 'checkout' | 'confirmation'
