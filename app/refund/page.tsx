import React, { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import policies from "@/data/policies.json";
import { generateMetadata } from '@/lib/seo';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import StructuredData from "@/components/structured-data";

export const metadata = generateMetadata({
  title: 'Refund & Cancellation Policy',
  description: 'Read AllTripp\'s refund and cancellation policy outlining eligibility, timelines, and procedures for booking changes or cancellations.',
  canonical: '/refund',
  ogImage: '/logo.png'
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function RefundPage() {
  const { title, lastUpdated, sections } = policies.refund;
  const toc = useMemo(() => sections.map((s: any) => ({ title: s.title, id: slugify(s.title) })), [sections]);

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/policies">Policies</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Refund & Cancellation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Last Updated: {lastUpdated}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TOC */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold mb-2">On this page</p>
            <nav className="space-y-2">
              {toc.map((item) => (
                <Link key={item.id} href={`#${item.id}`} className="block text-sm text-muted-foreground hover:text-foreground">
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-9 space-y-8">
          {sections.map((section, index) => {
            const id = slugify(section.title)
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <CardTitle id={id} className="text-2xl scroll-mt-24">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none text-muted-foreground">
                    {section.content.split(/\n{2,}/).map((block: string, pIndex: number) => {
                      const lines = block.split(/\n/).filter(Boolean)
                      const isList = lines.every(l => l.trim().startsWith('- '))
                      if (isList) {
                        return (
                          <ul key={pIndex} className="list-disc ml-6">
                            {lines.map((l, li) => (
                              <li key={li}>{l.replace(/^\-\s+/, '')}</li>
                            ))}
                          </ul>
                        )
                      }
                      return <p key={pIndex}>{block}</p>
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://alltripp.com" },
            { "@type": "ListItem", position: 2, name: "Policies", item: "https://alltripp.com/policies" },
            { "@type": "ListItem", position: 3, name: "Refund & Cancellation", item: "https://alltripp.com/refund" },
          ]
        }}
      />
    </main>
  );
}
