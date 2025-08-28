// components/ui/product-detail.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import type { ProductLite } from "@/types/product";

interface Props {
  product: ProductLite;
}

export default function ProductDetail({ product }: Props) {
  const { addItem, increase, decrease, getQuantity } = useCartStore();

  const unit = product.default_price?.unit_amount ?? 0;
  const priceText = unit ? `$${(unit / 100).toFixed(2)}` : "";
  const qtyInCart = getQuantity(product.id);

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: unit,
      imageUrl: product.images?.[0] ?? null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 grid gap-8 md:grid-cols-2">
      {/* image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-background">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name || "Product image"}
            fill
            priority
            className="object-cover transition-opacity duration-500"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}
      </div>

      {/* details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}

        {unit > 0 && (
          <p className="text-lg font-semibold text-gray-900 mb-6">{priceText}</p>
        )}

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => decrease(product.id)}>-</Button>
          <span className="text-lg font-semibold">{qtyInCart}</span>
          <Button onClick={() => increase(product.id)}>+</Button>
          <Button className="ml-4" onClick={onAddItem}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
