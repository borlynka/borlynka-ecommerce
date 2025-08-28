// app/products/[id]/page.tsx
import ProductDetail from "@/components/ui/product-detail";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import type { ProductLite } from "@/types/product";

type Params = { params: { id: string } };

// Type guard to verify an expanded Stripe price
function isStripePrice(p: unknown): p is Stripe.Price {
  return (
    !!p &&
    typeof p === "object" &&
    "id" in p &&
    "currency" in p &&
    "unit_amount" in p
  );
}

export default async function ProductPage({ params }: Params) {
  const raw = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const price = isStripePrice(raw.default_price) ? raw.default_price : null;

  const product: ProductLite = {
    id: raw.id,
    name: raw.name ?? "",
    description: raw.description ?? "",
    images: Array.isArray(raw.images) ? raw.images : [],
    default_price: price
      ? {
          id: price.id,
          unit_amount: price.unit_amount ?? 0,
          currency: price.currency,
        }
      : null,
  };

  return <ProductDetail product={product} />;
}
