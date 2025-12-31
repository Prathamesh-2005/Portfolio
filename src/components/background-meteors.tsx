"use client";

import { Meteors } from "@/components/magicui/meteors";

export function BackgroundMeteors() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Meteors number={30} />
    </div>
  );
}
