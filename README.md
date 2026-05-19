# KenaKata : E-Commerce Website

A full-featured e-commerce storefront built with Next.js 16 App Router, TypeScript, Tailwind CSS, and Redux Toolkit using [Platzi Fake Store API](https://fakeapi.platzi.com/).

---

## Deployment URL

> **Live Demo:** [https://assignment-kenakata.netlify.app/](https://assignment-kenakata.netlify.app/)

---

##  Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| State Management | Redux Toolkit 2 + React Redux 9 |
| Validation | Zod 4 |
| Icons | React Icons 5 |
| Unit Testing | Vitest 4  |
| Linting | ESLint 9 |

---

##  Features

### 🏠 Home Page
- Hero section with call-to-action
- Featured products showcase
- Categories section with navigation
- Light / Dark theme toggle
- Fully responsive layout

### 🛍️ Product Listing 
- Responsive product grid
- Search by product name
- Filter by category and price range
- Sort by price (ascending / descending) and name
- Pagination
- Loading skeletons, empty states, and error boundaries

### 📦 Product Details (`/products/[id]`)
- Product image gallery
- Full product information
- Related products section
- Add to cart functionality
- Dynamic route with SSR

### 🛒 Cart & Checkout
- Add, remove, and update item quantities
- Cart state persisted to `localStorage` via Redux
- Checkout form with full validation (Zod)
- Mock payment flow with order confirmation

### 🔐 Authentication
- Login and Register pages
- Protected routes 
- Session persistence using `localStorage`
- Logout and session clearing

---

## 📁 Project Folder Structure

```
assignment-4/
├── app/                        # Next.js App Router
│   ├── checkout/               # Checkout page (protected)
│   ├── login/                  # Login page
│   ├── products/               # Product listing + detail pages
│   │   └── [id]/               # Dynamic product detail route
│   ├── signup/                 # Registration page
│   ├── error.tsx               # Root error boundary
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout (providers, theme)
│   ├── loading.tsx             # Root loading UI
│   ├── not-found.tsx           # 404 page
│   ├── page.tsx                # Home page
│   └── providers.tsx           # Redux + Theme providers
│
├── components/                 # Reusable UI components
│   ├── auth/                   # Login, Register forms
│   ├── cart/                   # Cart drawer, cart item
│   ├── checkout/               # Checkout form, payment step
│   ├── layout/                 # Navbar, Footer, Sidebar
│   ├── product/                # ProductCard, ProductGrid, Gallery
│   └── tests/                  # Component-level test files
│
├── lib/                        # Utilities and schemas
│   ├── zod-schemas/
│   │   ├── auth-schema.ts      # Login / signup validation schemas
│   │   └── checkout-schema.ts  # Checkout form validation schema
│   ├── auth-storage.ts         # Auth session helpers
│   ├── cart-utils.ts           # Cart calculation helpers
│   └── product-utils.ts        # Product filtering / sorting helpers
│
├── store/                      # Redux Toolkit store
│   ├── auth-slice.ts           # Auth state (user, token)
│   ├── cart-slice.ts           # Cart state (items, quantities)
│   ├── hooks.ts                # Typed useAppDispatch / useAppSelector
│   ├── product-slice.ts        # Products, filters, pagination state
│   ├── store.ts                # Store configuration
│   └── ui-slice.ts             # UI state (theme, modal, sidebar)
│
├── public/                     # Static assets
├── .env                        # Environment variables (local only)
├── .env.d.ts                   # Env type declarations
├── .gitignore
└── package.json
```

---

## 🌐 API Endpoints Used
 
Base URL: `https://api.escuelajs.co/api/v1`
 
| Purpose | Method | Endpoint |
|---|---|---|
| Get all products | `GET` | `/products` |
| Get products with pagination | `GET` | `/products?offset=0&limit=10` |
| Get product by ID | `GET` | `/products/{id}` |
| Get all categories | `GET` | `/categories` |
| Register user | `POST` | `/users` |
| Login user | `POST` | `/auth/login` |
| Get user profile | `GET` | `/auth/profile` |
| Refresh token | `POST` | `/auth/refresh-token` |
 
---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18.17 or later
- npm / yarn / pnpm

### 1. Clone the repository

```bash
git clone https://github.com/Parisa-Reza/assignment-4.git
cd assignment-4
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the variable  to `.env` and fill in the values (see section below):

```
NEXT_PUBLIC_API_BASE_URL=https://api.escuelajs.co/api/v1
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run tests

```bash
npm run test
```



---

## 🔑 Environment Variable Documentation

Create a `.env` file in the root of the project with the following variables:

```env
# Base URL for the Platzi Fake Store API
NEXT_PUBLIC_API_BASE_URL=https://api.escuelajs.co/api/v1


```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ Yes | The base URL for all API requests |


> All `NEXT_PUBLIC_` variables are exposed to the browser.

---

## 🗺️ Rendering Strategy Decisions

###  Search — Debounced API Calls
 
The product search bar uses a **debounce pattern** (350ms delay) to avoid firing an API request on every keystroke.

### Pagination
Pagination improves performance by limiting the amount of data fetched and rendered at once, reducing memory usage and initial load time.
It also makes UI faster and more responsive by loading data in smaller, manageable chunks instead of rendering everything at once.
 
###  State Management — Redux Toolkit
 
All shared application state is managed with **Redux Toolkit (RTK)**. The store is split into focused slices:
 
| Slice | Responsibility |
|---|---|
| `cart-slice` | Cart items, quantities, totals |
| `auth-slice` | Current user, access token, login status |
| `product-slice` | Product list, active filters, search query, pagination |
| `ui-slice` | Theme (light/dark) |

 
---



## ⚖️ Tradeoffs Made

- **Redux Toolkit over React Context**
Redux Toolkit is preferred over React Context for complex apps because it provides structured state management with built-in async handling, better performance (avoids unnecessary re-renders), and powerful debugging tools like Redux DevTools.

- **No database / backend**
All data comes from the Platzi Fake Store API. The mock payment flow cannot process real transactions. In production, a real payment gateway (e.g. Stripe) and order persistence layer would be required.

- **localStorage for session persistence**
Simple and universally supported, but it means sessions are not shared across devices and are vulnerable to XSS. An HttpOnly cookie-based approach would be more secure in production.



- **Pagination over infinite scroll**
Pagination was implemented instead of infinite scroll for simplicity and accessibility. Infinite scroll would provide a smoother UX but complicates scroll restoration and screen reader support.

---

## ⚡ Performance Considerations

- **Next.js Image component**  automatically handles lazy loading.It also enforces width and height to prevent layout shift
- **Code splitting** is handled automatically by Next.js App Router — each route segment is a separate bundle.
- **Loading skeletons** (via `loading.tsx` boundaries) prevent layout shift and communicate progress to users.
- **Pagination** improves performance by limiting the amount of data fetched and rendered at once, reducing memory usage and initial load time.
It also makes UI faster and more responsive by loading data in smaller, manageable chunks instead of rendering everything at once.



---

## 🧩 Challenges Faced

- **Server vs. Client component boundaries**
Deciding where to place the `"use client"` directive was the most nuanced challenge. Components that use Redux, `useState`, or browser APIs must be client components, while data-fetching and SEO-critical markup benefits from staying on the server. 

- **Cherry picking commits**
Made 3 commits while being on  detached HEAD state
Then ran git checkout main, git switched branches, but those commits were not reachable from main. Then ran git cherry-pick commit ids in order (oldest to newest).


- **Server vs Client Environment Variables**
API_BASE_URL is server-only and cannot be accessed in the browser, making it safe for sensitive data.
NEXT_PUBLIC_API_BASE_URL is exposed to both server and client, so it can be used in frontend code.
Anything with NEXT_PUBLIC_ is public and visible in the browser bundle.

- **Searching for products**
Pagination was implemented to show 10 products per page, but filtering logic was applied only on the currently loaded page data.
This caused incorrect results because search/filter did not consider the full product dataset.
As a result, users were seeing incomplete and inconsistent filtered outputs across pages.


- **Localhost vs Netlify**
-  /cart and /checkout routes were protected by server-side middleware (proxy.ts) that checked for a cookie — but  auth lived in localStorage + Redux (client-side). On Netlify, the middleware ran before React loaded, saw no cookie, and redirected you to /login even though you were already logged in. This caused an infinite redirect loop in production but worked fine on localhost.
Solution
Removed the server middleware entirely. Added a client-side RequireAuth component that waits for Redux to finish restoring auth from localStorage , then decides to either show the page or redirect to login. 


---

## 🔭 Future Improvements
- **RTK Query over `createAsyncThunk`** for all data fetching — RTK Query provides built-in caching, automatic cache invalidation, loading/error states, and deduplication of requests out of the box, removing the need for manual `createAsyncThunk` boilerplate in `product-slice.ts`
- **More unit testing and Code coverage** — expand Vitest coverage to include Redux slices, Zod schemas, utility functions, and key components such as the cart and checkout form
- **Real payment integration** with Stripe or similar
- **Product reviews** — UI scaffolding exists; needs a backend endpoint
- **E2E tests** with Playwright covering critical user journeys (login → browse → checkout)
- **Admin dashboard** for product user and category management
