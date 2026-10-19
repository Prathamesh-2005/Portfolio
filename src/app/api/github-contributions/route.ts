import { NextResponse } from 'next/server';

// GraphQL-based contributions proxy for ActivityCalendar
// Requires GITHUB_TOKEN in environment (.env.local) for local development.

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username') || 'Prathamesh-2005';

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json({
        error: 'Missing GITHUB_TOKEN environment variable. Set a personal access token to use the GraphQL API.'
      }, { status: 401 });
    }

    const to = new Date().toISOString();
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 1);
    const from = fromDate.toISOString();

    const query = `query($login:String!, $from:DateTime!, $to:DateTime!) {\n  user(login:$login) {\n    contributionsCollection(from:$from, to:$to) {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            date\n            contributionCount\n          }\n        }\n      }\n    }\n  }\n}`;

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({ query, variables: { login: username, from, to } }),
    });

    const json = await res.json();
    if (!res.ok || json.errors) {
      console.error('GitHub GraphQL error:', json.errors || json);
      return NextResponse.json({ error: 'GitHub GraphQL error', details: json }, { status: 502 });
    }

    const weeks: Array<{ contributionDays: Array<{ date: string; contributionCount: number }> }> = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];

    // Flatten day counts to compute quartiles for contributionLevel mapping
    const allCounts: number[] = [];
    for (const w of weeks) {
      for (const d of w.contributionDays) allCounts.push(d.contributionCount);
    }

    // compute quartile thresholds
    const sorted = [...allCounts].sort((a, b) => a - b);
    const n = sorted.length || 1;
    const q1 = sorted[Math.floor(n * 0.25)];
    const q2 = sorted[Math.floor(n * 0.5)];
    const q3 = sorted[Math.floor(n * 0.75)];

    function levelFor(count: number) {
      if (count === 0) return 'NONE';
      if (count <= q1) return 'FIRST_QUARTILE';
      if (count <= q2) return 'SECOND_QUARTILE';
      if (count <= q3) return 'THIRD_QUARTILE';
      return 'FOURTH_QUARTILE';
    }

    const contributions = weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        contributionCount: d.contributionCount,
        contributionLevel: levelFor(d.contributionCount),
      })),
    );

    return NextResponse.json({ contributions }, { status: 200 });
  } catch (error) {
    console.error('Proxy fetch failed:', error);
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
  }
}
