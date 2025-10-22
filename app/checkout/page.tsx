import type { Metadata } from "next";
import { generateMetadata as baseGenerateMetadata } from "@/lib/seo";
import CheckoutPageClient from "@/components/checkout/checkout-page-client";

export const metadata: Metadata = baseGenerateMetadata({
  title: "Checkout | AllTripp",
  description:
    "Secure checkout for AllTripp travel experiences. Enter traveler details, choose add-ons, and review your trip summary before payment.",
  canonical: "/checkout",
  keywords: ["checkout", "travel booking", "AllTripp"],
});

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
