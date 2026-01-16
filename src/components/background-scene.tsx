"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BackgroundScene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-all duration-1000">
      {isDark ? <NightScene /> : <DayScene />}
    </div>
  );
}

function DayScene() {
  return (
    <div className="absolute inset-0">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-amber-100" />

      {/* Sun with realistic glow */}
      <div className="absolute top-12 right-16 sm:right-24">
        <div className="relative w-20 h-20 sm:w-28 sm:h-28">
          <div className="absolute inset-0 bg-yellow-200 rounded-full blur-3xl opacity-60 scale-150" />
          <div className="absolute inset-0 bg-orange-200 rounded-full blur-2xl opacity-40 scale-125" />
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-300 rounded-full shadow-lg" />
          <div className="absolute top-2 left-2 w-8 h-8 bg-white/40 rounded-full blur-sm" />
        </div>
      </div>

      {/* Clouds */}
      <div className="absolute top-16 left-[5%] animate-cloud opacity-90">
        <Cloud1 />
      </div>
      <div className="absolute top-28 left-[45%] animate-cloud-slow opacity-80" style={{ animationDelay: "-20s" }}>
        <Cloud2 />
      </div>
      <div className="absolute top-8 left-[70%] animate-cloud opacity-70" style={{ animationDelay: "-40s" }}>
        <Cloud3 />
      </div>
      <div className="absolute top-40 left-[20%] animate-cloud-slow opacity-60" style={{ animationDelay: "-10s" }}>
        <Cloud1 />
      </div>

      {/* Mountains */}
      <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1440 256" preserveAspectRatio="none">
        <path d="M0,256 L0,180 L120,140 L240,170 L360,120 L480,150 L600,90 L720,130 L840,80 L960,120 L1080,70 L1200,110 L1320,85 L1440,100 L1440,256 Z" fill="url(#mountainGrad1)" />
        <path d="M0,256 L0,200 L180,150 L300,180 L450,130 L600,160 L750,110 L900,150 L1050,100 L1200,140 L1350,120 L1440,130 L1440,256 Z" fill="url(#mountainGrad2)" />
        <path d="M0,256 L0,220 Q200,180 400,210 T800,190 T1200,215 T1440,200 L1440,256 Z" fill="url(#hillGrad)" />
        <defs>
          <linearGradient id="mountainGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="mountainGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4b5563" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6b7280" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="hillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Birds */}
      <div className="absolute top-24 left-[30%] animate-bird-fly">
        <Bird />
      </div>
      <div className="absolute top-32 left-[35%] animate-bird-fly" style={{ animationDelay: "-0.5s" }}>
        <Bird size={8} />
      </div>
      <div className="absolute top-28 left-[38%] animate-bird-fly" style={{ animationDelay: "-1s" }}>
        <Bird size={6} />
      </div>
    </div>
  );
}

function NightScene() {
  return (
    <div className="absolute inset-0">
      {/* Night sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900" />

      {/* Milky way */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 right-1/4 h-full bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent blur-3xl transform -rotate-12" />
      </div>

      {/* Moon */}
      <div className="absolute top-12 right-16 sm:right-24">
        <div className="relative w-16 h-16 sm:w-24 sm:h-24">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-30 scale-150" />
          <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 scale-125" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-full shadow-2xl" />
          <div className="absolute top-[15%] left-[20%] w-[20%] h-[20%] bg-gray-300 rounded-full opacity-60" />
          <div className="absolute top-[45%] right-[25%] w-[15%] h-[15%] bg-gray-300 rounded-full opacity-50" />
          <div className="absolute bottom-[25%] left-[35%] w-[12%] h-[12%] bg-gray-300 rounded-full opacity-40" />
        </div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => {
          const size = Math.random() * 2 + 0.5;
          const isLarge = size > 2;
          return (
            <div
              key={i}
              className={`absolute rounded-full ${isLarge ? 'animate-twinkle-bright' : 'animate-twinkle'}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 65}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                background: isLarge ? 'radial-gradient(circle, white 0%, rgba(255,255,255,0.8) 40%, transparent 70%)' : 'white',
                boxShadow: isLarge ? '0 0 4px 1px rgba(255,255,255,0.3)' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Shooting stars */}
      <div className="absolute top-[15%] left-[20%] animate-shooting-star">
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.6),-20px_0_20px_2px_rgba(255,255,255,0.4)]" />
      </div>
      <div className="absolute top-[25%] left-[60%] animate-shooting-star" style={{ animationDelay: "5s" }}>
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.6),-20px_0_20px_2px_rgba(255,255,255,0.4)]" />
      </div>

      {/* Aurora */}
      <div className="absolute top-0 left-0 right-0 h-80 overflow-hidden opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent blur-3xl animate-aurora transform -skew-y-6" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-3xl animate-aurora-slow transform skew-y-3" style={{ animationDelay: "-4s" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-3xl animate-aurora transform -skew-y-2" style={{ animationDelay: "-8s" }} />
      </div>

      {/* Mountains silhouette */}
      <svg className="absolute bottom-0 left-0 w-full h-48" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0,200 L0,120 L150,80 L300,110 L450,60 L600,90 L750,40 L900,70 L1050,30 L1200,60 L1350,45 L1440,55 L1440,200 Z" fill="#0f172a" />
        <path d="M0,200 L0,150 L200,100 L400,130 L550,80 L700,120 L850,70 L1000,110 L1150,85 L1300,105 L1440,90 L1440,200 Z" fill="#1e293b" />
      </svg>

      {/* Trees silhouette */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-32" viewBox="0 0 1440 128" preserveAspectRatio="none">
          <g fill="#0f172a">
            <polygon points="50,128 50,60 70,75 70,45 90,60 90,30 100,10 110,30 110,60 130,45 130,75 150,60 150,128" />
            <polygon points="120,128 120,80 135,90 135,65 150,75 150,50 158,35 166,50 166,75 181,65 181,90 196,80 196,128" />
            <polygon points="280,128 280,70 300,85 300,55 320,70 320,40 332,20 344,40 344,70 364,55 364,85 384,70 384,128" />
            <polygon points="500,128 500,85 512,92 512,72 524,80 524,58 532,45 540,58 540,80 552,72 552,92 564,85 564,128" />
            <polygon points="700,128 700,75 715,85 715,60 730,70 730,45 740,28 750,45 750,70 765,60 765,85 780,75 780,128" />
            <polygon points="900,128 900,90 910,97 910,80 920,87 920,68 927,55 934,68 934,87 944,80 944,97 954,90 954,128" />
            <polygon points="1100,128 1100,65 1120,80 1120,50 1140,65 1140,35 1152,15 1164,35 1164,65 1184,50 1184,80 1204,65 1204,128" />
            <polygon points="1280,128 1280,80 1295,90 1295,65 1310,75 1310,50 1320,32 1330,50 1330,75 1345,65 1345,90 1360,80 1360,128" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Cloud1() {
  return (
    <svg width="120" height="50" viewBox="0 0 120 50">
      <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="30" rx="25" ry="18" fill="url(#cloudGrad)" />
      <ellipse cx="60" cy="22" rx="30" ry="20" fill="url(#cloudGrad)" />
      <ellipse cx="85" cy="30" rx="25" ry="18" fill="url(#cloudGrad)" />
      <ellipse cx="50" cy="35" rx="20" ry="12" fill="url(#cloudGrad)" />
      <ellipse cx="70" cy="35" rx="20" ry="12" fill="url(#cloudGrad)" />
    </svg>
  );
}

function Cloud2() {
  return (
    <svg width="160" height="60" viewBox="0 0 160 60">
      <defs>
        <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      <ellipse cx="40" cy="35" rx="30" ry="20" fill="url(#cloudGrad2)" />
      <ellipse cx="75" cy="25" rx="35" ry="22" fill="url(#cloudGrad2)" />
      <ellipse cx="115" cy="32" rx="32" ry="20" fill="url(#cloudGrad2)" />
      <ellipse cx="80" cy="40" rx="28" ry="15" fill="url(#cloudGrad2)" />
    </svg>
  );
}

function Cloud3() {
  return (
    <svg width="100" height="45" viewBox="0 0 100 45">
      <defs>
        <linearGradient id="cloudGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
      </defs>
      <ellipse cx="25" cy="28" rx="20" ry="14" fill="url(#cloudGrad3)" />
      <ellipse cx="50" cy="20" rx="25" ry="17" fill="url(#cloudGrad3)" />
      <ellipse cx="75" cy="28" rx="20" ry="14" fill="url(#cloudGrad3)" />
    </svg>
  );
}

function Bird({ size = 10 }: { size?: number }) {
  return (
    <svg width={size * 2} height={size} viewBox="0 0 20 10" className="text-slate-600">
      <path d="M0,5 Q5,0 10,5 Q15,0 20,5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
