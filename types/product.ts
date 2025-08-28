
// types/product.ts
export type ProductLite = {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price: {
    id: string;
    unit_amount: number; // cents
    currency: string;
  } | null;
};
