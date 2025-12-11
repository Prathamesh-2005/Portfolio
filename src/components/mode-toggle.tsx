"use client";

import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useThemeTransition } from "@/components/ui/theme-toggle-button";
import { flushSync } from "react-dom";

export const ModeToggle = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    startTransition(() => {
      flushSync(() => {
        setTheme(theme === "dark" ? "light" : "dark");
      });
    }, { x, y });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      ref={ref}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 px-2"
      aria-label="Toggle theme"
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </button>
  );
});

ModeToggle.displayName = "ModeToggle";
