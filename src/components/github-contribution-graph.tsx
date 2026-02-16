'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/magicui/blur-fade";
import { Loader2, BadgeCheck } from 'lucide-react';

type ContributionItem = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GitHubContributionResponse = {
  date: string;
  contributionCount: number;
  contributionLevel:
    | 'NONE'
    | 'FIRST_QUARTILE'
    | 'SECOND_QUARTILE'
    | 'THIRD_QUARTILE'
    | 'FOURTH_QUARTILE';
};

const githubConfig = {
  username: 'Prathamesh-2005',
  apiUrl: 'https://github-contributions-api.deno.dev',
  title: 'GitHub Activity',
  subtitle: 'coding journey over the past year',
  blockMargin: 3,
  fontSize: 12,
  maxLevel: 4,
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  weekdays: ['', 'M', '', 'W', '', 'F', ''],
  totalCountLabel: '{{count}} contributions in the last year',
  theme: {
    dark: [
      'rgb(22, 27, 34)',
      'rgb(14, 68, 41)',
      'rgb(0, 109, 50)',
      'rgb(38, 166, 65)',
      'rgb(57, 211, 83)',
    ],
    light: [
      'rgb(235, 237, 240)',
      'rgb(155, 233, 168)',
      'rgb(64, 196, 99)',
      'rgb(48, 161, 78)',
      'rgb(33, 110, 57)',
    ],
  },
  errorState: {
    title: 'Unable to load GitHub contributions',
    description: 'Check out my profile directly for the latest activity',
    buttonText: 'View on GitHub',
  },
  loadingState: {
    description: 'Fetching your GitHub activity data',
  },
};

function filterLastYear(contributions: ContributionItem[]): ContributionItem[] {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  return contributions.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= oneYearAgo;
  });
}

interface GitHubContributionGraphProps {
  username?: string;
  delay?: number;
}

export const GitHubContributionGraph = ({
  username = githubConfig.username,
  delay = 0,
}: GitHubContributionGraphProps) => {
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [blockSize, setBlockSize] = useState(11);
  const [currentTime, setCurrentTime] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Dynamically compute blockSize so the graph always fits the container width
  useEffect(() => {
    function computeBlockSize() {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      // 53 weeks + label column (~30px) + margins
      const weeks = 53;
      const labelOffset = 30;
      const margin = githubConfig.blockMargin;
      // blockSize = (availableWidth - labelOffset) / (weeks * (blockSize + margin))
      // Solve: size = (containerWidth - labelOffset) / (weeks * (1 + margin/size))
      // Approximate: size = (containerWidth - labelOffset - weeks * margin) / weeks
      const computed = Math.floor(
        (containerWidth - labelOffset - weeks * margin) / weeks
      );
      // Clamp between 8 and 14 for readability
      setBlockSize(Math.max(8, Math.min(14, computed)));
    }

    computeBlockSize();
    const observer = new ResizeObserver(computeBlockSize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${githubConfig.apiUrl}/${username}.json`,
        );
        const data: { contributions?: unknown[] } = await response.json();

        if (data?.contributions && Array.isArray(data.contributions)) {
          const flattenedContributions = data.contributions.flat();
          const contributionLevelMap = {
            NONE: 0,
            FIRST_QUARTILE: 1,
            SECOND_QUARTILE: 2,
            THIRD_QUARTILE: 3,
            FOURTH_QUARTILE: 4,
          };

          const validContributions = flattenedContributions
            .filter(
              (item: unknown): item is GitHubContributionResponse =>
                typeof item === 'object' &&
                item !== null &&
                'date' in item &&
                'contributionCount' in item &&
                'contributionLevel' in item,
            )
            .map((item: GitHubContributionResponse) => ({
              date: String(item.date),
              count: Number(item.contributionCount || 0),
              level: (contributionLevelMap[
                item.contributionLevel as keyof typeof contributionLevelMap
              ] || 0) as ContributionItem['level'],
            }));

          if (validContributions.length > 0) {
            const total = validContributions.reduce(
              (sum, item) => sum + item.count,
              0,
            );
            setTotalContributions(total);
            const filteredContributions = filterLastYear(validContributions);
            setContributions(filteredContributions);
          } else {
            setHasError(true);
          }
        } else {
          setHasError(true);
        }
      } catch (err) {
        console.error('Failed to fetch GitHub contributions:', err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [username]);

  return (
    <BlurFade delay={delay}>
      <div className="rounded-xl border bg-card p-6 shadow-sm w-full">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{githubConfig.title}</h3>
              <p className="text-sm text-muted-foreground">
                {username}&apos;s {githubConfig.subtitle}
              </p>
            </div>

            {!isLoading && !hasError && totalContributions > 0 && (
              <div className="text-right text-sm text-muted-foreground shrink-0">
                <span>Total: </span>
                <span className="font-semibold text-foreground">
                  {totalContributions.toLocaleString()}
                </span>{' '}
                <span>contributions</span>
              </div>
            )}
          </div>
        </div>

        {/* Graph area — ref used for width measurement, no overflow */}
        <div ref={containerRef} className="w-full">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <Loader2 className="mb-3 h-6 w-6 animate-spin" />
              <p className="text-sm">{githubConfig.loadingState.description}</p>
            </div>
          ) : hasError || contributions.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
              <Icons.github className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">{githubConfig.errorState.title}</p>
                <p className="text-sm text-muted-foreground">
                  {githubConfig.errorState.description}
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {githubConfig.errorState.buttonText}
                </Link>
              </Button>
            </div>
          ) : (
            <ActivityCalendar
              data={contributions}
              theme={githubConfig.theme}
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              blockSize={blockSize}
              blockMargin={githubConfig.blockMargin}
              fontSize={githubConfig.fontSize}
              maxLevel={githubConfig.maxLevel}
              labels={{
                months: githubConfig.months,
                weekdays: githubConfig.weekdays,
                totalCount: githubConfig.totalCountLabel,
              }}
              style={{ width: '100%' }}
            />
          )}
        </div>
      </div>
    </BlurFade>
  );
};