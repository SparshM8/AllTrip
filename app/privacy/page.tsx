import React, { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import policies from "@/data/policies.json";
import { generateMetadata } from '@/lib/seo';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import StructuredData from "@/components/structured-data";

export const metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'Learn how AllTripp collects, uses, and protects your personal data to deliver secure, personalized travel experiences.',
  canonical: '/privacy',
  ogImage: '/logo.png'
});

function parseSections(content: string) {
  // Split by numbered headings (e.g., "1. Introduction")
  const sectionRegex = /(\d+\.\s[^\n]+)\n([\s\S]*?)(?=\n\d+\.|\n*$)/g;
  const sections = [];
  let match;
  while ((match = sectionRegex.exec(content)) !== null) {
    sections.push({
      title: match[1].trim(),
      body: match[2].trim(),
    });
  }
  return sections;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function PrivacyPage() {
  const sections = parseSections(policies.privacy);
  const toc = useMemo(() => sections.map((s) => ({ title: s.title, id: slugify(s.title) })), [sections]);

  return (
    <main className="container mx-auto py-12 px-4">
      {/* Breadcrumb */}
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
              <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Page heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Privacy Policy
        </h1>
      </div>

      {/* Two-column layout */}
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
          {sections.map((section, idx) => {
            const id = slugify(section.title);
            return (
              <Card key={idx} className="overflow-hidden">
                <CardHeader>
                  <CardTitle id={id} className="text-2xl scroll-mt-24">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none text-muted-foreground">
                    {section.body.split(/\n{2,}/).map((para, pIdx) => {
                      // Render bullet points for lines starting with "-"
                      if (para.trim().startsWith("- ")) {
                        return (
                          <ul key={pIdx} className="list-disc ml-6">
                            {para
                              .split("\n")
                              .filter((line) => line.trim().startsWith("- "))
                              .map((line, liIdx) => (
                                <li key={liIdx}>{line.replace(/^- /, "")}</li>
                              ))}
                          </ul>
                        );
                      }
                      return <p key={pIdx}>{para}</p>;
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* JSON-LD Breadcrumbs */}
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://alltripp.com" },
            { "@type": "ListItem", position: 2, name: "Policies", item: "https://alltripp.com/policies" },
            { "@type": "ListItem", position: 3, name: "Privacy Policy", item: "https://alltripp.com/privacy" },
          ],
        }}
      />
    </main>
  );
}
