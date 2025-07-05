"use client";
import React from "react";
import policies from "@/data/policies.json";

export default function TermsPage() {
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
      }
      if (line.endsWith(':')) {
        return <h2 key={index} className="text-2xl font-semibold mt-6 mb-2">{line}</h2>;
      }
      return <p key={index} className="mb-4">{line}</p>;
    });
  };

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Terms and Conditions</h1>
      <div className="text-lg font-semibold mb-8 text-center">Trade name - Riya Ghaloth</div>
      <div className="prose lg:prose-xl max-w-none">
        {renderContent(policies.terms)}
      </div>
    </main>
  );
}
