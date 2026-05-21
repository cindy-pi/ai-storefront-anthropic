# Fizban's Wands — AI Storefront

A fantasy wand shop built with React, Vite, and TypeScript. Browse 36 magical wands, add them to your cart, and complete a purchase using your gold balance — no backend required.

**Live Demo:** https://cindy-pi.github.io/ai-storefront-anthropic/

---

## Running Locally

```bash
npm install
npm run dev
# Open http://localhost:5173/ai-storefront-anthropic/
```

---

## About the Shop

Fizban's Wands is a fantasy-themed e-commerce demo set in a D&D-inspired world. Customers browse a catalog of magical wands aligned to Good, Neutral, or Evil, add items to a cart, and check out using an in-world gold (gp) currency. The site demonstrates a complete shopping flow — catalog, cart, checkout, and a simulated order confirmation — built entirely as a static React SPA with no backend.

---

## Seed Data

Wand data lives in `src/store/wands.ts`.

The catalog contains **36 wands** across **3 alignment categories** — Good, Neutral, and Evil — with **12 wands each**.

Rarity tiers and approximate price ranges:

| Rarity    | Approx. Price Range |
|-----------|---------------------|
| Common    | ~60–140 gp          |
| Uncommon  | ~175–380 gp         |
| Rare      | ~420–750 gp         |
| Very Rare | ~850–1,350 gp       |
| Legendary | ~1,650–2,500 gp     |

To add or modify wands, edit the `wands` array in `src/store/wands.ts`. Each wand object requires: `id`, `name`, `alignment`, `description`, `price`, `rarity`, `magicalProperties`, `specialEffect`, and `imageUrl`.

---

## Customer Credits

New customers start with **1,000 gp**.

Customer state is stored in `localStorage` under three keys (set by `src/App.tsx`):

| Key              | Contents                         |
|------------------|----------------------------------|
| `fizban-balance` | Current gold balance (number)    |
| `fizban-cart`    | Cart items array                 |
| `fizban-orders`  | Order history array              |

To reset your balance and cart, clear these keys from localStorage:

```js
// In browser DevTools console:
localStorage.removeItem('fizban-balance')
localStorage.removeItem('fizban-cart')
localStorage.removeItem('fizban-orders')
// Refresh the page — balance resets to 1,000 gp
```

Or use **Application → Storage → Local Storage** in Chrome/Firefox DevTools to delete the keys manually.

---

## Checkout

The full checkout flow:

1. **Cart** — review items and quantities; total cost shown against current balance
2. **Checkout** — enter recipient name and delivery address; balance is checked before the order is accepted
3. **Confirmation** — cart is cleared, balance is deducted, and the order is saved to history

If the cart total exceeds the available balance, the checkout button is disabled and the purchase cannot proceed.

---

## Simulated Email Receipt

This is a fully static site with no backend — no real email is sent.

After a successful checkout, an on-screen **"Magical Delivery Manifest"** is displayed on the order confirmation page. It includes:

- Wand images and names for each item purchased
- Itemized quantities and costs
- Order total in gp
- A Fizban-styled sign-off

The receipt is only shown on the confirmation page immediately after purchase. Past orders are accessible from order history but do not re-show the full manifest.

---

## Deploying to GitHub Pages

1. Fork or clone this repository
2. Update `base` in `vite.config.ts` to match your repo name:
   ```ts
   base: '/your-repo-name/',
   ```
3. Update the `useLocalStorage` keys in `src/App.tsx` if desired (optional)
4. Push to `main` — GitHub Actions builds and deploys automatically
5. In your GitHub repo: **Settings → Pages → Source** — set to **"GitHub Actions"**
6. Visit `https://{username}.github.io/{repo-name}/`

---

## Required GitHub Settings

- **Pages source** must be set to **GitHub Actions** (not a branch deploy)
- **GitHub Actions** must be enabled for the repository

The workflow file at `.github/workflows/deploy.yml` builds with `npm run build` and uploads the `dist/` directory as a Pages artifact using `actions/upload-pages-artifact@v3`.
