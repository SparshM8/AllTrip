import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import policies from "@/data/policies.json";
import { generateMetadata } from "@/lib/seo";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import StructuredData from "@/components/structured-data";

export const metadata = generateMetadata({
  title: "Policies",
  description: "Read a concise overview of AllTripp Terms, Refunds & Privacy. For full details, visit each dedicated policy page.",
  canonical: "/policies",
  ogImage: "/logo.png",
});

export default function PoliciesSummaryPage() {
  const summary = (policies as any).checkoutPolicy;

  return (
    <main className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Policies</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Policies</h1>
        {summary?.lastUpdated && (
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {summary.lastUpdated}</p>
        )}
      </header>

      <article className="prose max-w-none">
        {summary?.sections?.map((s: any, i: number) => (
          <section key={i} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <ul className="list-disc ml-6">
              {s.bullets.map((b: string, j: number) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </section>
        ))}
      </article>

      <Card className="mt-10">
        <CardContent className="p-6">
          <p className="mb-4 text-sm text-muted-foreground">Read the complete policies:</p>
          <div className="flex flex-wrap gap-3">
            <Link className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" href="/terms">Terms and Conditions</Link>
            <Link className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" href="/refund">Refund Policy</Link>
            <Link className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" href="/privacy">Privacy Policy</Link>
          </div>
        </CardContent>
      </Card>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://alltripp.com" },
            { "@type": "ListItem", position: 2, name: "Policies", item: "https://alltripp.com/policies" }
          ]
        }}
      />
    </main>
  );
}
