"use client";
import React from "react";
import policies from "@/data/policies.json";

export default function RefundPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
      <p className="text-lg">{policies.refund}</p>
    </main>
  );
}
