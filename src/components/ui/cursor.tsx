"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CursorContextType {
  isHovering: boolean;
  setIsHovering: (value: boolean) => void;
}

const CursorContext = createContext<CursorContextType | null>(null);

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a Cursor provider");
  }
  return context;
}

interface CursorProps {
  children: React.ReactNode;
  className?: string;
}

export function Cursor({ children, className }: CursorProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <CursorContext.Provider value={{ isHovering, setIsHovering }}>
      <div className={cn("cursor-none", className)}>{children}</div>
    </CursorContext.Provider>
  );
}

interface CursorPointerProps {
  className?: string;
}

export function CursorPointer({ className }: CursorPointerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
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

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isPointer ? 40 : 12,
            height: isPointer ? 40 : 12,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 400 }}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border-2 border-white"
          animate={{
            width: isPointer ? 60 : 32,
            height: isPointer ? 60 : 32,
            opacity: isVisible ? 0.5 : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
    </>
  );
}
