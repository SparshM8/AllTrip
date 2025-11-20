"use client";

import { useEffect, useState } from "react";

type CounterItem = { id: string; label: string; value: number };

function Counter({ end }: { end: number }) {
  const [num, setNum] = useState(0);

  useEffect(() => {
    let rafId: number;
    const duration = 1200; // ms
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const value = Math.round(progress * end);
      setNum(value);
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end]);

  return <div className="text-3xl md:text-4xl font-extrabold leading-none">{num.toLocaleString()}</div>;
}

export default function AnimatedCounters({ items }: { items: CounterItem[] }) {
  return (
    <div className="flex gap-8 items-start flex-wrap">
      {items.map((it) => (
        <div key={it.id} className="flex flex-col items-start">
          <Counter end={it.value} />
          <div className="text-sm text-dim mt-1">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
