"use client";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

type CheckoutPolicy = {
  title: string;
  lastUpdated?: string;
  sections: { title: string; bullets: string[] }[];
};

type Props = {
  policy: CheckoutPolicy;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
};

export default function PolicyAgreement({ policy, checked, onCheckedChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Checkbox id="agree" checked={checked} onCheckedChange={(v) => onCheckedChange(Boolean(v))} />
        <label htmlFor="agree" className="text-sm leading-6">
          I have read and agree to the key terms below and the full
          <span className="whitespace-nowrap"> </span>
          <Link href="/terms" className="underline">Terms</Link>,
          <span className="whitespace-nowrap"> </span>
          <Link href="/privacy" className="underline">Privacy</Link>, and
          <span className="whitespace-nowrap"> </span>
          <Link href="/refund" className="underline">Refund</Link> policies.
        </label>
      </div>

      <Accordion type="single" collapsible className="w-full rounded-md border border-white/10 bg-white/5">
        {policy.sections.map((sec, i) => (
          <AccordionItem key={i} value={`sec-${i}`}>
            <AccordionTrigger className="px-4">{sec.title}</AccordionTrigger>
            <AccordionContent className="px-4">
              <ul className="list-disc pl-5 space-y-1">
                {sec.bullets.map((b, j) => (
                  <li key={j} className="text-sm text-muted-foreground">{b}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {policy.lastUpdated && (
        <p className="text-xs text-muted-foreground">Last updated: {policy.lastUpdated}</p>
      )}
    </div>
  );
}
