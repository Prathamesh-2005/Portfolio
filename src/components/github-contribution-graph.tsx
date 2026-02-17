'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/magicui/blur-fade";
import { Loader2 } from 'lucide-react';

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

  // Ref sits on the graph wrapper so ResizeObserver measures exactly
  // the pixels the SVG will occupy — not the outer card.
  const graphRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    function computeBlockSize() {
      if (!graphRef.current) return;

      const availableWidth = graphRef.current.clientWidth;
      const weeks = 53;
      const margin = githubConfig.blockMargin;

      // ActivityCalendar adds a weekday-label column (~28px at fontSize 12)
      const weekdayLabelWidth = 28;

      // blockSize * weeks + margin * (weeks - 1) + weekdayLabelWidth = availableWidth
      const computed = Math.floor(
        (availableWidth - weekdayLabelWidth - margin * (weeks - 1)) / weeks
      );

      setBlockSize(Math.max(5, Math.min(14, computed)));
    }

    computeBlockSize();

    const observer = new ResizeObserver(computeBlockSize);
    if (graphRef.current) observer.observe(graphRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`${githubConfig.apiUrl}/${username}.json`);
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
            const total = validContributions.reduce((sum, item) => sum + item.count, 0);
            setTotalContributions(total);
            setContributions(filterLastYear(validContributions));
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
      <div className="rounded-xl border bg-card p-4 w-full overflow-hidden">

        {/* Header — subtitle removed */}
        <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
          <h3 className="font-bold text-base flex items-center gap-1.5">
            <Icons.github className="h-4 w-4" />
            {githubConfig.title}
          </h3>

          {!isLoading && !hasError && totalContributions > 0 && (
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              Total:{' '}
              <span className="font-bold text-foreground">
                {totalContributions.toLocaleString()}
              </span>{' '}
              contributions
            </div>
          )}
        </div>

        {/*
          graphRef is placed HERE — this is the exact container the ActivityCalendar
          SVG will be rendered into, so blockSize is always computed from the
          true available width with no guesswork about outer padding.
          overflow-hidden clips any sub-pixel bleed.
        */}
        <div ref={graphRef} className="w-full overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {githubConfig.loadingState.description}
              </p>
            </div>
          ) : hasError || contributions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <p className="font-medium">{githubConfig.errorState.title}</p>
              <p className="text-sm text-muted-foreground">
                {githubConfig.errorState.description}
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.github className="mr-2 h-4 w-4" />
                  {githubConfig.errorState.buttonText}
                </Link>
              </Button>
            </div>
          ) : (
            <ActivityCalendar
              data={contributions}
              blockSize={blockSize}
              blockMargin={githubConfig.blockMargin}
              fontSize={githubConfig.fontSize}
              maxLevel={githubConfig.maxLevel}
              labels={{
                months: githubConfig.months,
                weekdays: githubConfig.weekdays,
                totalCount: githubConfig.totalCountLabel,
              }}
              theme={githubConfig.theme}
              colorScheme={theme === 'light' ? 'light' : 'dark'}
              showWeekdayLabels
            />
          )}
        </div>
      </div>
    </BlurFade>
  );
};