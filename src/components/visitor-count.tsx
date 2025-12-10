"use client";

import { useEffect, useState } from "react";

const NAMESPACE = "prath-portfolio";
const KEY = "unique-visitors";
const STORAGE_KEY = "prath_portfolio_visited_v1";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let didCancel = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    async function updateCount() {
      try {
        const res = await fetch(`/api/visitors`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!didCancel && data && typeof data.value === "number") {
          setCount(data.value);
        }
      } catch (e: any) {
        if (e && e.name === "AbortError") {
          // no-op
        } else {
          console.error("VisitorCount error", e);
        }
      } finally {
        clearTimeout(timeout);
        if (!didCancel) setLoading(false);
      }
    }

    updateCount();

    return () => {
      didCancel = true;
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  if (loading) return <p className="text-sm text-muted-foreground">Loading visitors…</p>;
  return (
    <p className="text-sm text-muted-foreground">
      {count === null ? "Visitors" : `${count.toLocaleString()} unique visitors`}
    </p>
  );
}
