"use client";

export function BackgroundWaves() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute bottom-0 left-0 w-full h-full opacity-30 dark:opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          className="fill-primary/20 animate-wave"
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path
          className="fill-primary/15 animate-wave-slow"
          d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path
          className="fill-primary/10 animate-wave-slower"
          d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,176C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary/40 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-primary/30 rounded-full animate-float animation-delay-2000" />
      <div className="absolute top-60 left-1/4 w-2 h-2 bg-primary/50 rounded-full animate-float animation-delay-4000" />
      <div className="absolute top-32 right-1/3 w-1.5 h-1.5 bg-primary/40 rounded-full animate-float" />
      <div className="absolute top-80 left-1/2 w-2.5 h-2.5 bg-primary/30 rounded-full animate-float animation-delay-2000" />
    </div>
  );
}
