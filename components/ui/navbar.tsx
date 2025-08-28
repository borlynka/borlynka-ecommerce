// components/navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";

export default function Navbar() {
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const [mobileOpen, setMobileOpen] = useState(false);

  // auto-close the mobile menu when the viewport becomes >= md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="hover:text-blue-600 font-medium">
          My Ecommerce
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <Link href="/checkout" className="hover:text-blue-600">Checkout</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative" aria-label="Open cart">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-black px-1.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* hamburger for mobile */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t">
          <ul className="flex flex-col space-y-2 px-4 py-3">
            <li>
              <Link href="/" onClick={() => setMobileOpen(false)} className="block py-1">Home</Link>
            </li>
            <li>
              <Link href="/products" onClick={() => setMobileOpen(false)} className="block py-1">Products</Link>
            </li>
            <li>
              <Link href="/checkout" onClick={() => setMobileOpen(false)} className="block py-1">Checkout</Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
}
