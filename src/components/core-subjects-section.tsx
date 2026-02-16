"use client";

import React from "react";
import { DATA } from "@/data/resume";
import { 
  Binary, Network, Database, Cpu, Shield 
} from "lucide-react";

const subjectIcons: Record<string, React.ReactNode> = {
  "Data Structures & Algorithms": <Binary className="size-4" />,
  "Object-Oriented Programming": <Cpu className="size-4" />,
  "Database Management Systems": <Database className="size-4" />,
  "Operating Systems": <Cpu className="size-4" />,
  "Computer Networks & Security": <Network className="size-4" />,
};

export function CoreSubjectsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Core Subjects</h2>
      <div className="flex flex-wrap gap-2">
        {DATA.coreSubjects.map((subject) => (
          <div
            key={subject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm hover:animate-shake-skill cursor-pointer"
          >
            {subjectIcons[subject] || <Binary className="size-4" />}
            <span className="text-xs font-medium">{subject}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
