// lib/stripe.ts
import "server-only";
import Stripe from "stripe";

// Do NOT pin apiVersion here — it caused your red underline.
// Using the library default keeps types in sync with the installed SDK.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
