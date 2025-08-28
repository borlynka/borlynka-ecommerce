// app/success/page.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

export default function SuccessPage() {
  const { clear } = useCartStore();

  // Empty the cart after successful payment
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-6 text-muted-foreground">
        Thank you for your purchase. Your order is being processed.
      </p>
      <Link href="/products" className="text-blue-600 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}
