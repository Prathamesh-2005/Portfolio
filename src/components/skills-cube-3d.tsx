"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon, SimpleIcon } from "react-icon-cloud";

const slugs = [
  "java",
  "spring",
  "react",
  "nextdotjs",
  "javascript",
  "typescript",
  "python",
  "mysql",
  "postgresql",
  "mongodb",
  "supabase",
  "redis",
  "docker",
  "git",
  "github",
  "cplusplus",
  "nodedotjs",
  "html5",
  "css3",
  "tailwindcss",
  "amazonaws",
  "linux",
  "postman",
  "figma",
  "vercel",
  "npm",
  "gradle",
  "maven",
  "hibernate",
  "json",
];

export function SkillsCube3D() {
  const [icons, setIcons] = useState<SimpleIcon[] | null>(null);

  useEffect(() => {
    fetchSimpleIcons({ slugs }).then((data) => {
      setIcons(Object.values(data.simpleIcons));
    });
  }, []);

  const renderedIcons = useMemo(() => {
    if (!icons) return null;

    return icons.map((icon) =>
      renderSimpleIcon({
        icon,
        size: 42, 
        aProps: {
          onClick: (e) => e.preventDefault(),
        },
      })
    );
  }, [icons]);

  return (
    <div className="flex items-center justify-center py-10">
      <div className="relative flex size-[350px] items-center justify-center overflow-hidden rounded-lg bg-background">
        {renderedIcons ? (
          <Cloud
            options={{
              clickToFront: 500,
              depth: 1,
              imageScale: 2,
              
              initial: [0.1, -0.1], 
              
              minSpeed: 0.03, 
              maxSpeed: 0.04,
              
              outlineColour: "#0000",
              reverse: true,
              tooltip: "native",
              tooltipDelay: 0,
              wheelZoom: false,
            }}
          >
            {renderedIcons}
          </Cloud>
        ) : (
          <div className="flex items-center justify-center">
             <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
}