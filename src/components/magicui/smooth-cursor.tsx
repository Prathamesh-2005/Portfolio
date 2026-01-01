"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface SmoothCursorProps {
  className?: string;
}

export function SmoothCursor({ className }: SmoothCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{
            scale: isPressed ? 0.8 : isPointer ? 1.5 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 400 }}
        >
          <motion.svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
            animate={{
              rotate: isPointer ? -15 : 0,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 400 }}
          >
            <path
              d="M8.5 4.5L24.5 16.5L16.5 18L12.5 26.5L8.5 4.5Z"
              className="fill-foreground stroke-background"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Trailing dot for extra smoothness */}
      <motion.div
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible && isPointer ? 0.3 : 0,
          scale: isPointer ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="h-12 w-12 rounded-full border-2 border-foreground/50" />
      </motion.div>
    </>
  );
}
