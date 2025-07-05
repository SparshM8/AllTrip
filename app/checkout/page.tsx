"use client";
import React from "react";
import policies from "@/data/policies.json";

import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Policies</h1>
      <p className="text-lg mb-8">{policies.policies}</p>
      <div className="flex flex-col gap-4">
        <Link href="/terms" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-fit">
          <span>Terms and Conditions</span>
        </Link>
        <Link href="/refund" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-fit">
          <span>Refund Policy</span>
        </Link>
        <Link href="/privacy" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-fit">
          <span>Privacy Policy</span>
        </Link>
      </div>
    </main>
  );
}
