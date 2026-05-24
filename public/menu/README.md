# Menu photos

These placeholder photos were sourced from [Unsplash](https://unsplash.com/license) (free to use, no attribution required, but credit-where-possible is good practice). Swap them for your real product photography when ready — keep the same filenames so `data/menu.ts` keeps working.

## Files

Each file corresponds to a menu item ID in [`data/menu.ts`](../../data/menu.ts):

| File | Item |
| --- | --- |
| `classic-buff.jpg` | Classic Buff Burger |
| `double-buff-cheese.jpg` | Double Buff Cheese |
| `sekuwa-buff.jpg` | Sekuwa Buff Burger |
| `momo-burger.jpg` | Momo Burger |
| `crispy-chicken.jpg` | Crispy Chicken Burger |
| `piro-chicken.jpg` | Spicy Chicken (Piro) Burger |
| `grilled-chicken.jpg` | Grilled Chicken Burger |
| `aloo-tikki.jpg` | Aloo Tikki Burger |
| `paneer-burger.jpg` | Paneer Burger |
| `student-combo.jpg` | Student Combo |
| `family-combo.jpg` | Family Feast Combo |
| `fries.jpg` | Crispy Fries |
| `wings.jpg` | Chicken Wings |
| `coke.jpg` | Coca-Cola |
| `lassi.jpg` | Sweet Lassi |

## Replacing a photo

1. Take/edit a square-ish 4:3 or 1:1 crop at ~1200px wide.
2. Drop it in this folder with the matching filename above.
3. No code changes needed.

If a photo goes missing, [`components/MenuImage.tsx`](../../components/MenuImage.tsx) renders a warm gradient + initials fallback automatically — no broken-image icons.
