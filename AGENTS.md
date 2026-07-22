# Foxy ID — Project Context

## Project Overview

- **Nama:** Foxy ID (`foxyid` v0.0.0)
- **Tipe:** Front-end SPA (E-commerce landing page)
- **Purpose:** Cetak poster & polaroid kustom (print-on-demand)
- **Target:** Pasar Indonesia (full bahasa Indonesia)
- **Entry:** `index.html` → `src/main.jsx` → `src/App.jsx`
- **No TypeScript**, pure JavaScript (`.js` / `.jsx`)

---

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Language | JavaScript (JSX) |
| UI | React 19 |
| Build | Vite 8, `@vitejs/plugin-react` 6 |
| State | Zustand 5 |
| Router | React Router DOM 7 |
| Animasi | Framer Motion 12 |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer |
| Icons | `react-icons` (Heroicons `hi`, Font Awesome `fa6`) |
| Linter | Oxlint 1.71 (no ESLint, no Prettier) |
| Path alias | `@` → `./src` (vite.config.js + jsconfig.json) |
| Package manager | npm |

---

## Project Structure

```
src/
├── main.jsx                   # Entry: BrowserRouter + StrictMode
├── App.jsx                    # Root: routes, loading, scroll-to-top, cursor
├── index.css                  # Tailwind directives + custom CSS
├── constants.js               # Produk, testimonial, nav, workflow, dll.
│
├── pages/
│   ├── HomePage.jsx           # Landing page layout
│   ├── ProdukPage.jsx         # Listing produk (search, filter, grid)
│   └── TentangKamiPage.jsx    # About Us
│
├── components/
│   ├── Navbar.jsx             # Top nav, mobile menu, cart badge
│   ├── Hero.jsx               # Full-screen hero + FlipWords + dot grid
│   ├── InteractiveDots.jsx    # Canvas dot background (mouse repel)
│   ├── Statistics.jsx         # Animated counters
│   ├── LogoScroller.jsx       # Infinite logo carousel
│   ├── KategoriSection.jsx    # Category cards
│   ├── ProductCatalog.jsx     # Homepage product grid (8 items)
│   ├── ProductDetail.jsx      # Product detail + add-to-cart
│   ├── Workflow.jsx           # 3-step process
│   ├── ValueProps.jsx         # Value propositions
│   ├── AestheticSection.jsx   # Scroll word reveal
│   ├── Testimonials.jsx       # Infinite testimonial scroll
│   ├── CartDrawer.jsx         # Slide-out cart + promo
│   ├── CheckoutForm.jsx       # Multi-step checkout
│   ├── LoadingScreen.jsx      # Loading spinner
│   ├── SmoothFollower.jsx     # Custom cursor
│   └── Reveal.jsx             # IntersectionObserver reveal wrapper
│
├── components/ui/
│   ├── flip-words.jsx         # Animated word flip
│   ├── GradualBlur/           # Edge blur overlay
│   └── LogoLoop/              # Infinite marquee (resize-aware, RAF)
│
├── store/
│   └── cartStore.js           # Zustand: cart items, promo, totals
│
├── assets/
│   └── 2.png                  # Brand logo
│
└── lib/                       # Kosong (shadcn scaffolding artifact)
```

---

## Routing (React Router v7)

| Path | Komponen | Deskripsi |
|------|----------|-----------|
| `/` | `HomePage` | Landing page all sections |
| `/produk` | `ProdukPage` | Product listing + search/filter |
| `/tentang-kami` | `TentangKamiPage` | About us |
| `/product/:productId` | `ProductDetail` | Detail produk + add-to-cart |

---

## State Management (Zustand)

- **Store file:** `src/store/cartStore.js`
- **State:** `items[]`, `promoCode`, `isPromoApplied`
- **Actions:** `addItem`, `removeItem`, `updateQuantity`, `applyPromo`, `clearCart`
- **Computed:** `subtotal`, `discount`, `total`, `itemCount`
- **Promo:** `FOXY10` → 10% off
- **Selector pattern:** `useCartStore((s) => s.addItem)` untuk hindari re-render

---

## Data Constants

Semua data statis di `src/constants.js`:
- `PRODUCTS` — 8 produk dengan id, nama, kategori, harga, gambar
- `WORKFLOW_STEPS` — 3 langkah proses order
- `VALUE_PROPS` — 3 value propositions
- `TESTIMONIALS` — 9 testimonial entries
- `PAYMENT_METHODS` — 5 metode pembayaran
- `NAV_LINKS` — 3 navigasi link
- `SHIPPING_COST` — biaya ongkir
- Warna: `FOXY_PINK`, `FOXY_GOLD`, `FOXY_BROWN`, `FOXY_CREAM`

---

## Coding Conventions

### Ekspor
- **Default export** untuk komponen halaman & section (`export default function Navbar()`)
- **Named export** untuk UI primitives di `components/ui/` (`export function FlipWords()`)

### Naming
- File: PascalCase untuk komponen, camelCase untuk non-komponen
- Komponen: PascalCase
- Fungsi: camelCase
- Konstanta ekspor: UPPER_SNAKE_CASE
- CSS custom: kebab-case

### Imports
- React hooks: `import { useState, useEffect, useRef } from 'react'`
- Relative imports (belum pakai `@/`): `import Navbar from '../components/Navbar'`
- Library imports di atas, local imports di bawah

### Styling
- Tailwind utility classes inline via `className`
- Dynamic classes: template literals + ternary
- Custom CSS di `index.css` untuk animasi kompleks
- Colocated `.css` untuk UI primitives (GradualBlur, LogoLoop)

### Patterns
- Functional components with hooks only (no class)
- `useCallback` / `useMemo` untuk performance (LogoLoop)
- `React.memo` hanya di GradualBlur
- Cleanup di `useEffect` return
- `passive: true` untuk scroll/touch listeners
- `loading="lazy"` pada gambar
- `aria-label` pada elemen interaktif

---

## Animation Patterns

| Pattern | Lokasi |
|---------|--------|
| CSS `@keyframes` | Spinner loader, scroll marquee, gradient shift |
| Framer Motion | FlipWords, sparkles |
| IntersectionObserver | Reveal.jsx wrapper |
| requestAnimationFrame | InteractiveDots canvas, SmoothFollower, AestheticSection scroll reveal, LogoLoop |
| AnimatePresence | CartDrawer, transitions |
| prefers-reduced-motion | Dihormati di LogoLoop |

---

## NPM Scripts

| Script | Command |
|--------|---------|
| `npm run dev` | `vite` (HMR dev server) |
| `npm run build` | `vite build` (produksi ke `dist/`) |
| `npm run lint` | `oxlint` (lint semua `.js`/`.jsx`) |
| `npm run preview` | `vite preview` (preview build) |

**Tidak ada test runner / test files.**

---

## Configuration Files

| File | Fungsi |
|------|--------|
| `vite.config.js` | Vite config + React plugin + `@` alias |
| `tailwind.config.js` | Tailwind theme (content paths, extensions) |
| `postcss.config.js` | PostCSS (tailwindcss + autoprefixer) |
| `jsconfig.json` | JS language config + `@` path alias untuk IDE |
| `.oxlintrc.json` | Oxlint rules (react, oxc plugins) |
| `components.json` | Shadcn/ui registry (artifact, belum dipakai penuh) |

---

## Catatan Penting

- **Pre-release:** v0.0.0, belum publish
- **No backend:** Cart & order hanya localStorage, tidak ada API call
- **No tests / CI:** Tidak ada test runner, tidak ada CI config
- **No formatter:** Hanya linter (Oxlint), tidak ada Prettier
- **`react-dropzone`** terinstall di package.json tapi belum dipakai di komponen manapun (rencana: upload foto custom)
- **`src/lib/`** kosong — artifact shadcn/ui yang belum diisi
- **Custom cursor:** `body { cursor: none }` di desktop via SmoothFollower
- **Gambar produk:** dari Shopee CDN (`down-id.img.susercontent.com`) dan Unsplash
- **Avatar testimonial:** `ui-avatars.com`
