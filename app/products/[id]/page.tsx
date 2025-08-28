// app/products/[id]/page.tsx
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

// narrow unknown -> Stripe.Price (no `any`)
function isStripePrice(p: unknown): p is Stripe.Price {
  if (typeof p !== "object" || p === null) return false;
  const r = p as Record<string, unknown>;
  return (
    typeof r.id === "string" &&
    typeof r.currency === "string" &&
    (typeof r.unit_amount === "number" || r.unit_amount === null)
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // <-- inline type for Next 15
}) {
  const { id } = await params;

  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const price = isStripePrice(product.default_price)
    ? product.default_price
    : null;

  const amountCents = price?.unit_amount ?? 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">{product.name}</h1>
      <p className="text-lg">
        {price ? `$${(amountCents / 100).toFixed(2)}` : "No price available"}
      </p>
      {/* ...rest of your UI */}
    </div>
  );
}
