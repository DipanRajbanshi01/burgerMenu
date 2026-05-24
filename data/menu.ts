export type Category =
  | "buff"
  | "chicken"
  | "pork"
  | "rolls"
  | "combo"
  | "veg"
  | "sides"
  | "drinks";

export interface AddOn {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  nameNp?: string;
  category: Category;
  price: number;
  /** Optional second price tier — burger + fries + drink. */
  mealdealPrice?: number;
  /** Original price before a discount (used by the Family Pack). */
  originalPrice?: number;
  shortDesc: string;
  longDesc: string;
  photo: string;
  isVeg: boolean;
  spiceLevel: 0 | 1 | 2 | 3;
  isBestseller?: boolean;
  isNew?: boolean;
  isHalal?: boolean;
  /** Already includes fries + drink? Show no mealdeal toggle. */
  comesWithCombo?: boolean;
  ingredients: string[];
  layers: string[];
  addOns?: AddOn[];
  comboOptions?: string[];
}

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "buff", label: "Buff" },
  { id: "chicken", label: "Chicken" },
  { id: "pork", label: "Pork" },
  { id: "rolls", label: "Rolls" },
  { id: "combo", label: "Combos" },
];

export const menu: MenuItem[] = [
  // ─── Burgers ────────────────────────────────────────────────
  {
    id: "single-patty-buff",
    name: "Single Patty Buff Burger",
    category: "buff",
    price: 309.99,
    mealdealPrice: 379.99,
    shortDesc: "One smashed buff patty, the OG.",
    longDesc:
      "Our signature smashed buffalo patty with crisp lettuce, tomato, onion and house sauce in a toasted brioche bun. Simple and proper.",
    photo: "/menu/single-patty-buff.jpg",
    isVeg: false,
    spiceLevel: 1,
    isBestseller: true,
    isHalal: true,
    ingredients: ["Buff patty", "Brioche bun", "Lettuce", "Tomato", "Onion", "House sauce"],
    layers: ["Top bun", "House sauce", "Lettuce", "Buff patty", "Tomato & onion", "Bottom bun"],
    addOns: [
      { name: "Extra cheese", price: 40 },
      { name: "Extra patty", price: 120 },
      { name: "Jalapeños", price: 30 },
    ],
  },
  {
    id: "chicken-garlic-mayo",
    name: "Chicken Burger + Garlic Mayo",
    category: "chicken",
    price: 319.99,
    mealdealPrice: 389.99,
    shortDesc: "Crispy chicken, punchy garlic mayo.",
    longDesc:
      "Buttermilk-brined fried chicken thigh, slathered in garlic mayo, with crunchy slaw and pickles.",
    photo: "/menu/chicken-garlic-mayo.jpg",
    isVeg: false,
    spiceLevel: 1,
    isBestseller: true,
    isHalal: true,
    ingredients: ["Fried chicken thigh", "Garlic mayo", "Slaw", "Pickles", "Bun"],
    layers: ["Top bun", "Garlic mayo", "Slaw", "Crispy chicken", "Pickles", "Bottom bun"],
    addOns: [
      { name: "Extra cheese", price: 40 },
      { name: "Extra hot sauce", price: 20 },
    ],
  },
  {
    id: "double-bacon-cheese",
    name: "Double Bacon Cheese Burger",
    category: "buff",
    price: 550,
    mealdealPrice: 630,
    shortDesc: "Double bacon, smoked mayo, double patty.",
    longDesc:
      "Two buff patties smashed and salted with cheese, double smoked bacon and our smoked mayo. Big, messy, perfect.",
    photo: "/menu/double-bacon-cheese.jpg",
    isVeg: false,
    spiceLevel: 1,
    isHalal: true,
    ingredients: [
      "2× Buff patty smashed",
      "Cheese",
      "Smoked bacon ×2",
      "Smoked mayo",
      "Bun",
    ],
    layers: [
      "Top bun",
      "Smoked mayo",
      "Bacon",
      "Cheese",
      "Buff patty",
      "Cheese",
      "Buff patty",
      "Bacon",
      "Bottom bun",
    ],
    addOns: [
      { name: "Extra bacon", price: 80 },
      { name: "Extra cheese", price: 40 },
    ],
  },
  {
    id: "spicy-fried-chicken",
    name: "Spicy Fried Chicken Burger",
    category: "chicken",
    price: 414.99,
    mealdealPrice: 484.99,
    shortDesc: "Fried chicken, secret mayo, slaw, fried onion.",
    longDesc:
      "Fiery fried chicken thigh with our secret spicy mayo, cool coleslaw and crispy fried onion. The piro one.",
    photo: "/menu/spicy-fried-chicken.jpg",
    isVeg: false,
    spiceLevel: 3,
    isHalal: true,
    ingredients: ["Fried chicken", "Secret mayo", "Coleslaw", "Fried onion", "Bun"],
    layers: [
      "Top bun",
      "Secret mayo",
      "Crispy chicken",
      "Coleslaw",
      "Fried onion",
      "Bottom bun",
    ],
    addOns: [{ name: "Extra spicy mayo", price: 30 }],
  },
  {
    id: "layered-smash",
    name: "Layered Smash Burger",
    category: "buff",
    price: 364.99,
    mealdealPrice: 434.99,
    shortDesc: "Layered smashed buff patties & coleslaw.",
    longDesc:
      "Thin, crisp-edged smashed buff patties stacked tall with melted cheese between each layer and a tangle of slaw.",
    photo: "/menu/layered-smash.jpg",
    isVeg: false,
    spiceLevel: 1,
    isNew: true,
    isHalal: true,
    ingredients: ["3× Buff patty smashed", "Cheese", "Coleslaw", "Bun"],
    layers: [
      "Top bun",
      "Coleslaw",
      "Cheese",
      "Buff patty",
      "Cheese",
      "Buff patty",
      "Cheese",
      "Buff patty",
      "Bottom bun",
    ],
    addOns: [{ name: "Extra patty", price: 120 }],
  },
  {
    id: "pork-o-clock",
    name: "Pork O' Clock Burger",
    category: "pork",
    price: 439.99,
    mealdealPrice: 509.99,
    shortDesc: "Smoked bacon, BBQ sauce, slaw, crispy.",
    longDesc:
      "Pulled-style pork with smoked bacon, smoky BBQ sauce, fresh slaw and crispy fried onions. Sweet, smoky, indulgent.",
    photo: "/menu/pork-o-clock.jpg",
    isVeg: false,
    spiceLevel: 1,
    isNew: true,
    ingredients: ["Pulled pork", "Smoked bacon", "BBQ sauce", "Slaw", "Crispy onion", "Bun"],
    layers: [
      "Top bun",
      "BBQ sauce",
      "Pulled pork",
      "Bacon",
      "Slaw",
      "Crispy onion",
      "Bottom bun",
    ],
    addOns: [{ name: "Extra bacon", price: 80 }],
  },
  {
    id: "cheese-big",
    name: "Cheese Big Burger",
    category: "buff",
    price: 574.99,
    mealdealPrice: 644.99,
    shortDesc: "Triple cheese, big buff patty.",
    longDesc:
      "A big-format buff patty drowning in three kinds of melted cheese with a hint of mustard and pickled jalapeños.",
    photo: "/menu/cheese-big.jpg",
    isVeg: false,
    spiceLevel: 1,
    isHalal: true,
    ingredients: ["Big buff patty", "Cheddar", "Mozzarella", "American cheese", "Mustard", "Bun"],
    layers: [
      "Top bun",
      "Mustard",
      "Cheddar",
      "Big buff patty",
      "Mozzarella",
      "American cheese",
      "Bottom bun",
    ],
    addOns: [
      { name: "Jalapeños", price: 30 },
      { name: "Extra cheese", price: 40 },
    ],
  },
  {
    id: "wild-west",
    name: "Wild West Burger",
    category: "buff",
    price: 579.99,
    mealdealPrice: 649.99,
    shortDesc: "Comes with large fries and drinks.",
    longDesc:
      "BBQ-glazed buff patty stacked with onion rings, smoked cheddar and chipotle mayo — served with large fries and a drink standard.",
    photo: "/menu/wild-west.jpg",
    isVeg: false,
    spiceLevel: 2,
    isHalal: true,
    comesWithCombo: true,
    ingredients: [
      "BBQ buff patty",
      "Onion rings",
      "Smoked cheddar",
      "Chipotle mayo",
      "Lettuce",
      "Bun",
    ],
    layers: [
      "Top bun",
      "Chipotle mayo",
      "Onion rings",
      "BBQ patty",
      "Smoked cheddar",
      "Lettuce",
      "Bottom bun",
    ],
  },

  // ─── Family pack ────────────────────────────────────────────
  {
    id: "family-pack",
    name: "Family Pack",
    category: "combo",
    price: 1500,
    originalPrice: 1800,
    shortDesc: "Feed the whole crew. 15% off.",
    longDesc:
      "2× crispy chicken burgers, 1× chicken shawarma, 500ml drinks, 1× egg + bacon roll, and fries. Bundled and discounted.",
    photo: "/menu/family-pack.jpg",
    isVeg: false,
    spiceLevel: 1,
    isBestseller: true,
    isHalal: true,
    comesWithCombo: true,
    ingredients: [
      "2× Crispy chicken burger",
      "1× Chicken shawarma",
      "500ml drinks",
      "1× Egg + bacon roll",
      "Fries",
    ],
    layers: [],
  },

  // ─── Rolls ──────────────────────────────────────────────────
  {
    id: "chicken-shawarma",
    name: "Chicken Shawarma & Large Fries",
    category: "rolls",
    price: 314.99,
    shortDesc: "Spit-roasted chicken, garlic sauce, large fries.",
    longDesc:
      "Marinated chicken shaved off the spit, wrapped with garlic sauce, pickles and slaw — served with a portion of large fries.",
    photo: "/menu/chicken-shawarma.jpg",
    isVeg: false,
    spiceLevel: 1,
    isBestseller: true,
    isHalal: true,
    comesWithCombo: true,
    ingredients: ["Chicken shawarma", "Garlic sauce", "Pickles", "Slaw", "Tortilla", "Large fries"],
    layers: [],
    addOns: [{ name: "Extra garlic sauce", price: 20 }],
  },
  {
    id: "chicken-rolls",
    name: "Chicken Rolls",
    category: "rolls",
    price: 274.99,
    shortDesc: "Soft tortilla, marinated chicken, fresh veg.",
    longDesc:
      "Tender marinated chicken with onion, capsicum and our house chutney rolled in a soft tortilla.",
    photo: "/menu/chicken-rolls.jpg",
    isVeg: false,
    spiceLevel: 1,
    isHalal: true,
    ingredients: ["Chicken", "Onion", "Capsicum", "House chutney", "Tortilla"],
    layers: [],
  },
  {
    id: "egg-cheese-rolls",
    name: "Egg & Cheese Rolls",
    category: "rolls",
    price: 274.99,
    shortDesc: "Eggy, cheesy, comforting.",
    longDesc:
      "Fluffy fried eggs and melted cheese with sautéed onion and a touch of green chili, rolled in a paratha.",
    photo: "/menu/egg-cheese-rolls.jpg",
    isVeg: true,
    spiceLevel: 1,
    ingredients: ["Eggs", "Cheese", "Onion", "Green chili", "Paratha"],
    layers: [],
  },
  {
    id: "fried-chicken-cheese-bacon",
    name: "Fried Chicken, Cheese & Bacon",
    category: "rolls",
    price: 274.99,
    shortDesc: "Crispy chicken, cheese, smoky bacon roll.",
    longDesc:
      "Crispy fried chicken with melted cheese and smoky bacon strips, finished with a smear of garlic mayo in a soft roll.",
    photo: "/menu/fried-chicken-cheese-bacon.jpg",
    isVeg: false,
    spiceLevel: 1,
    isHalal: true,
    ingredients: ["Fried chicken", "Cheese", "Bacon", "Garlic mayo", "Roll"],
    layers: [],
  },
  {
    id: "egg-bacon-hashbrown",
    name: "Egg & Bacon Rolls With Hash Brown",
    category: "rolls",
    price: 474.99,
    shortDesc: "Breakfast in a roll. Egg, bacon, hash brown.",
    longDesc:
      "Fried eggs, smoked bacon and a crispy hash brown rolled up with melted cheese and a hit of hot sauce.",
    photo: "/menu/egg-bacon-hashbrown.jpg",
    isVeg: false,
    spiceLevel: 1,
    isNew: true,
    ingredients: ["Eggs", "Smoked bacon", "Hash brown", "Cheese", "Hot sauce", "Roll"],
    layers: [],
  },
  {
    id: "chicken-caesar-roll",
    name: "Chicken Caesar Roll",
    category: "rolls",
    price: 350,
    shortDesc: "Grilled chicken, romaine, caesar.",
    longDesc:
      "Grilled chicken strips with crisp romaine, parmesan and creamy caesar dressing wrapped in a soft tortilla.",
    photo: "/menu/chicken-caesar-roll.jpg",
    isVeg: false,
    spiceLevel: 0,
    isHalal: true,
    ingredients: ["Grilled chicken", "Romaine", "Parmesan", "Caesar dressing", "Tortilla"],
    layers: [],
  },
];
