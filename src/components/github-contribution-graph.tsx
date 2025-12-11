'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/magicui/blur-fade";

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
  blockSize: 11,
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
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();

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
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {githubConfig.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              <b>{username}</b>&apos;s {githubConfig.subtitle}
            </p>
            {!isLoading && !hasError && totalContributions > 0 && (
              <p className="text-sm text-primary font-medium mt-1">
                Total:{' '}
                <span className="font-black">
                  {totalContributions.toLocaleString()}
                </span>{' '}
                contributions
              </p>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">
                {githubConfig.loadingState.description}
              </p>
            </div>
          </div>
        ) : hasError || contributions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Icons.github className="w-8 h-8" />
            </div>
            <p className="font-medium mb-2">{githubConfig.errorState.title}</p>
            <p className="text-sm mb-4">
              {githubConfig.errorState.description}
            </p>
            <Button variant="outline" asChild>
              <Link
                href={`https://github.com/${username}`}
                className="inline-flex items-center gap-2"
              >
                <Icons.github className="w-4 h-4" />
                {githubConfig.errorState.buttonText}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="relative bg-background/50 backdrop-blur-sm rounded-lg border border-dashed dark:border-white/10 border-black/20 p-6">
              <div className="w-full overflow-hidden">
                <ActivityCalendar
                  data={contributions}
                  blockSize={10}
                  blockMargin={3}
                  fontSize={githubConfig.fontSize}
                  colorScheme={theme === 'dark' ? 'dark' : 'light'}
                  theme={githubConfig.theme}
                  labels={{
                    legend: {
                      less: 'Less',
                      more: 'More'
                    },
                    months: githubConfig.months,
                    totalCount: githubConfig.totalCountLabel,
                    weekdays: githubConfig.weekdays,
                  }}
                  style={{
                    color: 'rgb(139, 148, 158)',
                    maxWidth: '100%',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </BlurFade>
  );
};