# Jyo'zz Burger

A static, menu-only website for **Jyo'zz Burger** — a cloud kitchen in Kathmandu. Customers browse the menu on the left, pick an item to see the big photo + details on the right, choose **base** or **mealdeal** (+ fries + drink), and place orders **via WhatsApp**. No accounts, no payments, no backend.

## Stack

- **Next.js 14 (App Router)** + **TypeScript**
- **Tailwind CSS** + a minimal **shadcn/ui** primitive set (`Button`, `Dialog`, `Badge`, `Input`)
- Menu and brand info in typed TS modules — `data/menu.ts`, `data/config.ts`
- Order state in React Context — `context/OrderContext.tsx` (no DB, no localStorage)
- Deploys statically to Vercel with zero config

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

The repo is a stock Next.js project — Vercel will auto-detect it. To deploy:

1. Push to GitHub (this repo).
2. In Vercel, **New Project → Import** this repo.
3. Vercel auto-fills: Framework = Next.js, Build = `next build`, Output = `.next`. No env vars needed.
4. Click **Deploy**. First deploy takes ~1 min.

When you push to `main` thereafter, Vercel re-deploys automatically.

## Editing the menu

[`data/menu.ts`](data/menu.ts) — each `MenuItem`:

```ts
{
  id: "single-patty-buff",
  name: "Single Patty Buff Burger",
  category: "buff",            // buff | chicken | pork | rolls | combo | veg | sides | drinks
  price: 309.99,               // Rs.
  mealdealPrice: 379.99,       // optional — burger + fries + drink tier
  shortDesc: "...",
  longDesc: "...",
  photo: "/menu/single-patty-buff.jpg",
  isVeg: false,
  spiceLevel: 1,               // 0–3
  isBestseller: true,
  isHalal: true,
  ingredients: ["..."],
  layers: ["Top bun", "...", "Bottom bun"],
  addOns: [{ name: "Extra cheese", price: 40 }]
}
```

Photos go in `public/menu/<id>.jpg`. Missing photos render a warm gradient + initials fallback automatically.

## Editing brand / hours / numbers

[`data/config.ts`](data/config.ts) — brand name, WhatsApp/Viber numbers, kitchen hours (24h), delivery zones, ETA, minimum order, Family Pack discount.

The Open/Closed badge in the left panel is computed live from `config.hours`.

## WhatsApp deep-link

[`lib/whatsapp.ts`](lib/whatsapp.ts) builds an `encodeURIComponent`'d message and opens `https://wa.me/<number>?text=<message>`. Each order line becomes one row:

```
• 2 × Single Patty Buff Burger [Mealdeal] (Extra cheese) — Rs. 879.98
```

…with a total, then placeholders for name / address / notes the customer fills in inside WhatsApp.

## Structure

```
app/             # Next.js routes
  layout.tsx     # Fonts, providers, metadata
  page.tsx       # Single-page split layout
components/
  MenuList.tsx   # Left mustard panel: brand + family pack + item rows w/ Base + Mealdeal prices
  ItemShowcase.tsx # Right cream panel: big photo, description, mealdeal toggle, addons, Add to order
  Header.tsx     # Brand + My Order pill + WhatsApp button
  OrderBar.tsx   # Cart drawer (right slide-out / mobile bottom-sheet)
  MenuImage.tsx  # Image with gradient fallback when missing
  ui/            # shadcn primitives
context/
  OrderContext.tsx
data/
  menu.ts        # 15 items: 8 burgers + 6 rolls + 1 family pack
  config.ts      # Brand + WhatsApp + hours + family-pack offer
lib/
  utils.ts       # cn, formatNpr (Rs. 309.99 / Rs. 550)
  hours.ts       # Live open/closed status
  whatsapp.ts    # Order line subtotal, total, message builder, wa.me URL
public/menu/     # 15 product photos (Unsplash placeholders, swap with your own)
```

## Note on Next.js version

`next@14.2.15` carries an image-optimization advisory — once deployed, run `npm install next@latest` to pull the latest 14.2.x patch and redeploy.
