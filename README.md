# Fizban's Wands — ai-storefront-anthropic

A fantasy e-commerce storefront built with React + Vite, featuring an enchanted wand shop run by the legendary wizard Fizban.

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

Fizban's Wands is a fantasy-themed storefront demonstration built with React, TypeScript, and Vite. Customers browse a catalogue of magical wands, add items to their cart, and complete a checkout flow using a simulated gold-piece (gp) balance. The site showcases a full client-side shopping experience — catalogue, cart, checkout, and order confirmation — with no backend required.

---

## Seed Data

Wand data lives in `src/store/wands.ts` as a typed TypeScript array.

The catalogue contains **36 wands** organised into **3 alignment categories** of **12 wands each**:

| Alignment | Theme |
|-----------|-------|
| Good | Holy, radiant, and protective magic |
| Neutral | Balanced, natural, and arcane magic |
| Evil | Dark, cursed, and destructive magic |

Each wand has a **rarity tier** that reflects its power and price:

| Rarity | Price range |
|--------|-------------|
| Common | ~60–140 gp |
| Uncommon | ~200–480 gp |
| Rare | ~420–750 gp |
| Very Rare | ~850–1,900 gp |
| Legendary | ~1,800–2,500 gp |

To add or modify wands, edit the `wands` array in `src/store/wands.ts`. Each entry requires: `id`, `name`, `alignment`, `description`, `price`, `rarity`, `magicalProperties` (string array), `specialEffect`, and `imageUrl` (use `getWandSvg(id)` to generate a procedural SVG image).

---

## Customer Credits

- New customers start with **1,000 gp**.
- The balance (and order history) is stored in `localStorage` under the key `fizban_customer`.
- The balance is deducted automatically on a successful purchase.
- To reset your balance and clear order history, open browser DevTools → Application → Local Storage → delete the `fizban_customer` key, then refresh the page.

---

## Checkout

The full purchase flow:

1. **Cart** — review items and quantities, see the running total against your current balance.
2. **Checkout** — enter a recipient name and delivery address. The form is disabled if the cart total exceeds your balance.
3. **Confirmation** — after purchase, the cart is cleared and the gp cost is deducted from your balance. An on-screen receipt is displayed (see below).

If the cart total exceeds the available balance, the purchase button is disabled and the shortfall is shown to the customer.

---

## Simulated Email Receipt

No real email is sent — this is a fully static site with no backend.

After a successful checkout, an on-screen **Magical Delivery Manifest** is displayed on the order confirmation page. It includes:

- Wand images for every item purchased
- Itemised costs and quantities
- Order total in gold pieces
- A personalised sign-off from Fizban himself

The manifest serves as the "email receipt" equivalent for the simulated purchase.

---

## Deploying to GitHub Pages

1. Fork or clone this repository.
2. Update `base` in `vite.config.ts` to match your repository name:
   ```ts
   base: '/<your-repo-name>/',
   ```
3. This app uses custom page-state routing (not React Router), so no `basename` change is needed in `src/main.tsx`.
4. Push to `main` — GitHub Actions automatically builds and deploys via `.github/workflows/deploy.yml`.
5. In your GitHub repository go to **Settings → Pages → Source** and set it to **GitHub Actions**.
6. Visit `https://{username}.github.io/{repo-name}/` once the Actions workflow completes.

---

## Required GitHub Settings

- **Pages source** must be set to **GitHub Actions** (not a branch or `gh-pages` branch).
- **GitHub Actions** must be enabled for the repository (Settings → Actions → General → Allow all actions).
