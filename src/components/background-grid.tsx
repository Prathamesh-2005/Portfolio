"use client";

import { useEffect, useRef } from "react";

export function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    const gridSize = 40;
    const dots: { x: number; y: number; baseRadius: number }[] = [];

    // Create dots grid
    for (let x = 0; x < window.innerWidth + gridSize; x += gridSize) {
      for (let y = 0; y < window.innerHeight + gridSize; y += gridSize) {
        dots.push({ x, y, baseRadius: 1.5 });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");
      
      dots.forEach((dot) => {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        let radius = dot.baseRadius;
        let alpha = isDark ? 0.3 : 0.2;

        if (distance < maxDistance) {
          const scale = 1 - distance / maxDistance;
          radius = dot.baseRadius + scale * 4;
          alpha = isDark ? 0.3 + scale * 0.5 : 0.2 + scale * 0.4;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark 
          ? `rgba(148, 163, 184, ${alpha})` 
          : `rgba(71, 85, 105, ${alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
