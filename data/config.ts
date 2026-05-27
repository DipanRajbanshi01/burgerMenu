export const config = {
  brandName: "Jyo'zz Burger",
  brandTagline: "BURGER",
  tagline: "Smashed, stacked, sauced. Pick a burger, add a mealdeal.",
  familyPack: {
    title: "Family Pack",
    discountPct: 15,
    originalPrice: 1800,
    price: 1500,
    includes: [
      "2 Crispy chicken burgers",
      "1 Chicken shawarma",
      "500ml drinks",
      "1 Egg + bacon roll",
      "Fries",
    ],
  },
  whatsapp: "9779810223860",
  viber: "9779810223860",
  foodmandu: "https://foodmandu.com/",
  pathao: "https://food.pathao.com/",
  hours: { open: "11:00", close: "22:00" },
  deliveryZones: ["Baneshwor", "Koteshwor", "Lalitpur", "New Baneshwor"],
  etaMinutes: 35,
  minOrder: 300,
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
  mealdealIncludes: "burger + fries + drink",
} as const;

export type BrandConfig = typeof config;
