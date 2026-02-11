export interface Product {
  id: number;
  name: string;
  heat: "Mild" | "Medium" | "Hot" | "Extra Hot";
  price: number;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Original Red",
    heat: "Mild",
    price: 8.99,
    description: "Our classic recipe — tangy, smooth, and perfect on everything.",
  },
  {
    id: 2,
    name: "Smoky Chipotle",
    heat: "Medium",
    price: 9.99,
    description: "Rich, smoky flavor with a slow-building warmth.",
  },
  {
    id: 3,
    name: "Habanero Fury",
    heat: "Hot",
    price: 10.99,
    description: "Tropical fruit notes meet serious habanero punch.",
  },
  {
    id: 4,
    name: "Carolina Reaper Rage",
    heat: "Extra Hot",
    price: 12.99,
    description: "Not for the faint of heart. You've been warned.",
  },
  {
    id: 5,
    name: "Garlic Jalapeño",
    heat: "Mild",
    price: 8.99,
    description: "Roasted garlic meets fresh jalapeño — an everyday staple.",
  },
  {
    id: 6,
    name: "Mango Scorpion",
    heat: "Hot",
    price: 11.99,
    description: "Sweet mango meets the Trinidad Scorpion's fiery sting.",
  },
];
