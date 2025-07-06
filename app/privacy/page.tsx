"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import policies from "@/data/policies.json";

function parseSections(content) {
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

export default function PrivacyPage() {
  const sections = parseSections(policies.privacy);

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Privacy Policy
        </h1>
      </div>
      <div className="space-y-8">
        {sections.map((section, idx) => (
          <Card key={idx} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">{section.title}</CardTitle>
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
                          .filter(line => line.trim().startsWith("- "))
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
        ))}
      </div>
    </main>
  );
}
