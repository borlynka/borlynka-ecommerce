"use client";

import Link from "next/link";
import Image from "next/image";
import type Stripe from "stripe";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  product: Stripe.Product;
}

export default function ProductCard({ product }: Props) {
  const price = product.default_price as Stripe.Price | null;
  const priceText =
    price?.unit_amount != null ? `$${(price.unit_amount / 100).toFixed(2)}` : "";

  const img = product.images?.[0];

  return (
    <Card className="h-full flex flex-col overflow-hidden border-border/60 hover:shadow-md transition-shadow">
      {/* fixed-height image so all cards align */}
      {img ? (
        <div className="relative h-56 w-full">
          <Image
            src={img}
            alt={product.name ?? "Product image"}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          />
        </div>
      ) : (
        <div className="h-56 w-full bg-muted" />
      )}

      <CardHeader className="pb-2">
        {/* clamp name to 2 lines */}
        <CardTitle
          className="text-lg leading-snug"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {/* clamp description to 4 lines with ellipsis */}
        {product.description && (
          <p
            className="text-sm text-muted-foreground"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </p>
        )}
        {priceText && <p className="font-semibold">{priceText}</p>}
      </CardContent>

      <CardFooter className="mt-auto">
        <Link href={`/products/${product.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
