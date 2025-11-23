"use client";

import BlurFade from "@/components/magicui/blur-fade";

interface GitHubContributionGraphProps {
  username: string;
  delay?: number;
}

export const GitHubContributionGraph = ({
  username,
  delay = 0,
}: GitHubContributionGraphProps) => {
  return (
    <BlurFade delay={delay}>
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">GitHub Contributions</h2>
        <div className="w-full overflow-x-auto rounded-lg border border-border bg-card">
          <img
            src={`https://ghchart.rshah.org/${username}`}
            alt={`${username}'s GitHub Contribution Graph`}
            className="w-full h-auto"
            style={{ minWidth: "700px" }}
          />
        </div>
      </div>
    </BlurFade>
  );
};
