import { Customer, Order } from '../types'

const CUSTOMER_KEY = 'fizban_customer'
const STARTING_GOLD = 1000

function defaultCustomer(): Customer {
  return {
    goldBalance: STARTING_GOLD,
    purchaseHistory: [],
  }
}

function loadCustomer(): Customer {
  try {
    const raw = localStorage.getItem(CUSTOMER_KEY)
    if (!raw) return defaultCustomer()
    return JSON.parse(raw) as Customer
  } catch {
    return defaultCustomer()
  }
}

function saveCustomer(customer: Customer): void {
  try {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer))
  } catch {
    // ignore write errors (e.g. private mode quota)
  }
}

export function getCustomer(): Customer {
  return loadCustomer()
}

/**
 * Deducts the given amount from the customer's gold balance.
 * Returns `true` on success, `false` if the balance is insufficient.
 */
export function deductGold(amount: number): boolean {
  const customer = loadCustomer()
  if (customer.goldBalance < amount) {
    return false
  }
  customer.goldBalance -= amount
  saveCustomer(customer)
  return true
}

export function addOrder(order: Order): void {
  const customer = loadCustomer()
  customer.purchaseHistory.push(order)
  saveCustomer(customer)
}

export function getOrders(): Order[] {
  return loadCustomer().purchaseHistory
}

/**
 * Resets the customer to a fresh state with the default gold balance.
 * Intended for testing / development use.
 */
export function resetCustomer(): void {
  saveCustomer(defaultCustomer())
}
