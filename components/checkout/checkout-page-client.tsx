"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import PolicyAgreement from "@/components/checkout/policy-agreement";
import policies from "@/data/policies.json";

// Minimal UI primitives from your existing design system (radix/shadcn based)
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Schema per step
const TravelerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
});

const TripSchema = z.object({
  destination: z.string().min(2),
  startDate: z.string().min(1),
  nights: z.coerce.number().int().min(1),
  adults: z.coerce.number().int().min(1),
  children: z.coerce.number().int().min(0).default(0),
});

const AddOnsSchema = z.object({
  insurance: z.boolean().default(false),
  airportTransfer: z.boolean().default(false),
  specialRequests: z.string().max(500).optional(),
});

const schema = TravelerSchema.and(TripSchema).and(AddOnsSchema);

type FormData = z.infer<typeof schema>;

type Step = 0 | 1 | 2 | 3;

const steps: { key: Step; title: string; desc: string }[] = [
  { key: 0, title: "Traveler", desc: "Who is traveling?" },
  { key: 1, title: "Trip", desc: "When and where?" },
  { key: 2, title: "Add-ons", desc: "Enhance your trip" },
  { key: 3, title: "Review", desc: "Confirm details" },
];

export default function CheckoutPageClient() {
  const [step, setStep] = useState<Step>(0);
  const [agree, setAgree] = useState(false);
  const reduceMotion = useReducedMotion();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      destination: "",
      startDate: "",
      nights: 3,
      adults: 2,
      children: 0,
      insurance: false,
      airportTransfer: false,
      specialRequests: "",
    },
    mode: "onBlur",
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("alltripp.checkout");
      if (raw) {
        const parsed = JSON.parse(raw);
        form.reset(parsed);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const sub = form.watch((v) => {
      try {
        localStorage.setItem("alltripp.checkout", JSON.stringify(v));
      } catch {}
    });
    return () => sub.unsubscribe();
  }, [form]);

  const nextDisabled = !form.formState.isValid && form.formState.isSubmitted;

  const Summary = useMemo(() => {
    const v = form.getValues();
    const base = 1000; // pretend base price
    const addOns = (v.insurance ? 80 : 0) + (v.airportTransfer ? 40 : 0);
    const total = base + addOns;
    return { base, addOns, total };
  }, [form]);

  const goNext = async () => {
    // validate current step fields
    let keys: (keyof FormData)[] = [];
    if (step === 0) keys = ["firstName", "lastName", "email", "phone"];
    if (step === 1) keys = ["destination", "startDate", "nights", "adults", "children"];
    if (step === 2) keys = ["insurance", "airportTransfer", "specialRequests"];

    const valid = await form.trigger(keys);
    if (!valid) return;
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  };

  const goPrev = () => setStep((s) => (s > 0 ? ((s - 1) as Step) : s));

  return (
    <main className="min-h-screen bg-white dark:bg-[hsl(var(--surface-base))]">
      <div className="container mx-auto px-6 md:px-16 lg:px-20 py-10">
        {/* Steps header */}
        <ol className="flex flex-wrap gap-3 mb-8" aria-label="Checkout steps">
          {steps.map((s, i) => (
            <li key={s.key} className="flex items-center gap-2 text-sm">
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                  step === s.key ? "bg-[hsl(var(--brand-accent))] text-white" : "bg-white/10 text-white/80 border border-white/10"
                }`}
                aria-current={step === s.key ? "step" : undefined}
              >
                {i + 1}
              </span>
              <span className="text-white/90">
                <span className="font-semibold">{s.title}</span>
                <span className="ml-2 hidden sm:inline text-white/60">{s.desc}</span>
              </span>
              {i < steps.length - 1 && <span className="mx-2 text-white/30">→</span>}
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <motion.div
            className="lg:col-span-2"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 space-y-6">
              {step === 0 && (
                <section aria-labelledby="traveler-heading" className="space-y-4">
                  <h2 id="traveler-heading" className="text-lg font-semibold">Traveler details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">First name</label>
                      <input className="input-modern" {...form.register("firstName")} />
                      <p className="text-xs text-red-400">{form.formState.errors.firstName?.message as string}</p>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Last name</label>
                      <input className="input-modern" {...form.register("lastName")} />
                      <p className="text-xs text-red-400">{form.formState.errors.lastName?.message as string}</p>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Email</label>
                      <input className="input-modern" type="email" {...form.register("email")} />
                      <p className="text-xs text-red-400">{form.formState.errors.email?.message as string}</p>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Phone</label>
                      <input className="input-modern" {...form.register("phone")} />
                      <p className="text-xs text-red-400">{form.formState.errors.phone?.message as string}</p>
                    </div>
                  </div>
                </section>
              )}

              {step === 1 && (
                <section aria-labelledby="trip-heading" className="space-y-4">
                  <h2 id="trip-heading" className="text-lg font-semibold">Trip details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Destination</label>
                      <input className="input-modern" placeholder="Goa, Kashmir..." {...form.register("destination")} />
                      <p className="text-xs text-red-400">{form.formState.errors.destination?.message as string}</p>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Start date</label>
                      <input className="input-modern" type="date" {...form.register("startDate")} />
                      <p className="text-xs text-red-400">{form.formState.errors.startDate?.message as string}</p>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Nights</label>
                      <input className="input-modern" type="number" min={1} {...form.register("nights", { valueAsNumber: true })} />
                      <p className="text-xs text-red-400">{form.formState.errors.nights?.message as string}</p>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Adults</label>
                      <input className="input-modern" type="number" min={1} {...form.register("adults", { valueAsNumber: true })} />
                      <p className="text-xs text-red-400">{form.formState.errors.adults?.message as string}</p>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Children</label>
                      <input className="input-modern" type="number" min={0} {...form.register("children", { valueAsNumber: true })} />
                      <p className="text-xs text-red-400">{form.formState.errors.children?.message as string}</p>
                    </div>
                  </div>
                </section>
              )}

              {step === 2 && (
                <section aria-labelledby="addons-heading" className="space-y-4">
                  <h2 id="addons-heading" className="text-lg font-semibold">Add-ons</h2>
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" {...form.register("insurance")} />
                    Travel insurance (+$80)
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" {...form.register("airportTransfer")} />
                    Airport transfer (+$40)
                  </label>
                  <div>
                    <label className="block text-sm mb-1">Special requests</label>
                    <textarea className="input-modern" rows={3} {...form.register("specialRequests")} />
                  </div>
                </section>
              )}

              {step === 3 && (
                <section aria-labelledby="review-heading" className="space-y-3">
                  <h2 id="review-heading" className="text-lg font-semibold">Review & confirm</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Please review your details. By placing the booking you agree to our policies.</p>
                  <div className="text-sm">
                    <p><span className="text-gray-500">Traveler:</span> {form.getValues().firstName} {form.getValues().lastName} ({form.getValues().email})</p>
                    <p><span className="text-gray-500">Trip:</span> {form.getValues().destination}, {form.getValues().startDate}, {form.getValues().nights} nights</p>
                    <p><span className="text-gray-500">Party:</span> {form.getValues().adults} adult(s){form.getValues().children ? `, ${form.getValues().children} child(ren)` : ""}</p>
                    <p><span className="text-gray-500">Add-ons:</span> {form.getValues().insurance ? "Insurance " : ""}{form.getValues().airportTransfer ? "+ Transfer" : (!form.getValues().insurance ? "None" : "")}</p>
                  </div>
                  {("checkoutPolicy" in policies) && (
                    <div className="mt-4">
                      <PolicyAgreement policy={(policies as any).checkoutPolicy} checked={agree} onCheckedChange={setAgree} />
                    </div>
                  )}
                </section>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="secondary" onClick={goPrev} disabled={step === 0}>
                  Back
                </Button>
                {step < 3 ? (
                  <Button onClick={goNext} disabled={nextDisabled}>
                    Continue
                  </Button>
                ) : (
                  <Button onClick={() => alert("Proceed to payment gateway...")} disabled={!agree}>Place booking</Button>
                )}
              </div>
            </Card>

            <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
              By continuing you agree to our <Link className="underline" href="/terms">Terms</Link>, <Link className="underline" href="/privacy">Privacy</Link> and <Link className="underline" href="/refund">Refund</Link> policies.
            </p>
          </motion.div>

          {/* Summary */}
          <aside>
            <Card className="p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Base</span><span>${'{'}Summary.base{'}'}</span></div>
                <div className="flex justify-between"><span>Add-ons</span><span>${'{'}Summary.addOns{'}'}</span></div>
                <div className="border-t border-white/10 my-2" />
                <div className="flex justify-between font-semibold"><span>Total</span><span>${'{'}Summary.total{'}'}</span></div>
              </div>
              <Button className="w-full mt-4" onClick={() => (step < 3 ? setStep(3) : alert("Proceed to payment gateway..."))} disabled={step === 3 && !agree}>
                {step < 3 ? "Review details" : (agree ? "Place booking" : "Accept policies to continue")}
              </Button>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
