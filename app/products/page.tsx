// app/products/page.tsx
import { stripe } from "@/lib/stripe";
import ProductList from "@/components/ui/product-list";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    active: true,
    limit: 24,
    expand: ["data.default_price"],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">All Products</h1>
      <div className="mt-6">
        <ProductList products={products.data} />
      </div>
    </div>
  );
}
