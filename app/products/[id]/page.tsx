import { stripe } from "@/lib/stripe";
import ProductDetail from "@/components/ui/product-detail"; // <-- default import
import type { ProductLite } from "@/types/product";

type Params = { params: { id: string } };

export default async function ProductPage({ params }: Params) {
  const raw = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const product: ProductLite = {
    id: raw.id,
    name: raw.name ?? "",
    description: (raw as any).description ?? "",
    images: Array.isArray(raw.images) ? raw.images : [],
    default_price:
      typeof raw.default_price === "object" && raw.default_price
        ? {
            id: (raw.default_price as any).id,
            unit_amount: (raw.default_price as any).unit_amount,
            currency: (raw.default_price as any).currency,
          }
        : null,
  };

  return <ProductDetail product={product} />;
}
