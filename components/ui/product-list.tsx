// components/ui/product-list.tsx
"use client";
import { useMemo, useState } from "react";
import type Stripe from "stripe"; // <-- type-only import is fine in client files
import ProductCard from "@/components/ui/product-card";

interface Props {
  products: Stripe.Product[]; // <-- now resolved
}


export default function ProductList({ products }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const name = p.name?.toLowerCase() ?? "";
      const desc = (p.description ?? "").toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [products, query]);

  if (!products?.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No products found. Check your Stripe catalog or query.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search box (restored) */}
      <div className="flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      {/* Equal-height, responsive grid */}
        <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {filtered.map((p) => (
            <li key={p.id} className="h-full">
            <ProductCard product={p} />
            </li>
        ))}
        </ul>

    </div>
  );
}
