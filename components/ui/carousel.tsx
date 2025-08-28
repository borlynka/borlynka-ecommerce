"use client";

import type Stripe from "stripe"; // <-- add this back (type-only)
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "./card"; // <-- same folder, so "./card"

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  // advance every 3s
  useEffect(() => {
    if (!products?.length) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(id);
  }, [products?.length]);

  if (!products?.length) return null;

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price | null;
  const src = currentProduct.images?.[0];

  return (
    <Card className="relative h-80 w-full overflow-hidden rounded-2xl">
      {src && (
        <Image
          src={src}
          alt={currentProduct.name}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 800px, 100vw"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 bg-black/50 p-4 text-white">
        <div className="text-lg font-semibold leading-tight">
          {currentProduct.name}
        </div>
        {price?.unit_amount != null && (
          <div className="text-sm">
            ${(price.unit_amount / 100).toFixed(2)}{" "}
            {price.currency.toUpperCase()}
          </div>
        )}
      </div>
    </Card>
  );
};
