// app/checkout/checkout-action.ts
"use server";

import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import type { CartItem } from "@/store/cart-store";

export async function checkoutAction(formData: FormData) {
  const itemsJson = (formData.get("items") as string) ?? "[]";
  const items: CartItem[] = JSON.parse(itemsJson);

  const line_items = items.map((item) => ({
    price_data: {
      currency: "cad",            // or "usd", etc.
      product_data: { name: item.name },
      unit_amount: item.price,     // cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    locale: "en", // forces English to avoid Chinese auto-locale
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  redirect(session.url!);
}
