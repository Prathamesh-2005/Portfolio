import { NextResponse } from "next/server";

const NAMESPACE = "prath-portfolio";
const KEY = "unique-visitors";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const hasVisited = /pv_unique_v1=/.test(cookieHeader);

  try {
    if (!hasVisited) {
      // Register a hit from the server so client-side blockers don't interfere
      await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`);
    }

    const res = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`);
    const data = await res.json();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (!hasVisited) {
      const oneYear = 60 * 60 * 24 * 365;
      headers["Set-Cookie"] = `pv_unique_v1=1; Path=/; Max-Age=${oneYear}; HttpOnly; SameSite=Lax; Secure`;
    }

    return NextResponse.json(data, {
      status: 200,
      headers,
    });
  } catch (e) {
    return NextResponse.json({ value: null }, { status: 500 });
  }
}
