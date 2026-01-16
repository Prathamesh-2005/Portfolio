"use client";

export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/30 dark:bg-purple-500/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/30 dark:bg-cyan-500/20 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-pink-500/20 dark:bg-pink-500/10 blur-3xl animate-blob animation-delay-4000" />
      
      {/* Additional subtle orbs */}
      <div className="absolute top-1/4 right-1/4 h-60 w-60 rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-3xl animate-blob-slow" />
      <div className="absolute bottom-1/4 left-1/3 h-60 w-60 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 blur-3xl animate-blob-slow animation-delay-2000" />
      
      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  );
}
