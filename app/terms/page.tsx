"use client";
import React from "react";
import policies from "@/data/policies.json";

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <div className="text-base font-semibold mb-6">Trade name - Riya Ghaloth</div>
      <p className="text-lg">{policies.terms}</p>
    </main>
  );
}
