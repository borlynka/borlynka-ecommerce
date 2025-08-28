// app/checkout/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {useCartStore} from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, increase, decrease, clear } = useCartStore();

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  if (total === 0 || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Your cart is empty.</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Checkout</h1>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="py-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-muted-foreground">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => decrease(item.id)}>–</Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button variant="outline" onClick={() => increase(item.id)}>+</Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <form action={checkoutAction} className="max-w-md mx-auto mt-4">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" className="w-full">Proceed to Payment</Button>
      </form>

      <div className="max-w-md mx-auto mt-2">
        <Button variant="secondary" onClick={clear} className="w-full">
          Clear Cart
        </Button>
      </div>
    </div>
  );
}
