"use client";

import React from "react";
import { DATA } from "@/data/resume";
import { 
  SiJavascript, SiTypescript, SiCplusplus, SiReact, SiNextdotjs, 
  SiNodedotjs, SiTailwindcss, SiExpress, SiPostgresql, SiMongodb,
  SiPrisma, SiGit, SiGithub, SiPostman, SiDocker, SiRedis, 
  SiAmazonwebservices, SiSpring, SiPython, SiMysql,
  SiSupabase
} from "react-icons/si";
import { Database, Zap, Box } from "lucide-react";

const skillIcons: Record<string, React.ReactNode> = {
  "Java": <SiSpring className="size-4" />,
  "Spring Boot": <SiSpring className="size-4" />,
  "Spring Framework": <SiSpring className="size-4" />,
  "Spring AI": <SiSpring className="size-4" />,
  "Spring Security": <SiSpring className="size-4" />,
  "Spring Microservices": <SiSpring className="size-4" />,
  "Multithreading": <Zap className="size-4" />,
  "C++": <SiCplusplus className="size-4" />,
  "React": <SiReact className="size-4" />,
  "Next.js": <SiNextdotjs className="size-4" />,
  "JavaScript": <SiJavascript className="size-4" />,
  "Python": <SiPython className="size-4" />,
  "SQL": <Database className="size-4" />,
  "MySQL": <SiMysql className="size-4" />,
  "PostgreSQL": <SiPostgresql className="size-4" />,
  "Supabase": <SiSupabase className="size-4" />,
  "Redis": <SiRedis className="size-4" />,
  "Docker": <SiDocker className="size-4" />,
  "Git": <SiGit className="size-4" />,
  "LangChain": <Box className="size-4" />,
  "RAG": <Zap className="size-4" />,
  "Vector Databases": <Database className="size-4" />,
  "NumPy": <SiPython className="size-4" />,
  "Pandas": <SiPython className="size-4" />,
  "Scikit-learn": <SiPython className="size-4" />,
};

export function SkillsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {DATA.skills.map((skill) => (
          <div
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm hover:animate-shake-skill cursor-pointer"
          >
            {skillIcons[skill] || <Box className="size-4" />}
            <span className="text-xs font-medium">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
