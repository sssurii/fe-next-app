import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { httpResponseStatuses } from "@/common/utils/network/constants";

type Environment = "production" | "development" | "other";

export function middleware (req: NextRequest) {
  const environments = ["production"];
  const currentEnv = process.env.NODE_ENV as Environment;

  if (environments.includes(currentEnv) && req.headers.get("x-forwarded-proto") !== "https") {
    const hostname = req.headers.get('host') || req.nextUrl.hostname;
    return NextResponse.redirect(`https://${hostname}${req.nextUrl.pathname}`, httpResponseStatuses.MOVED_PERMANENTLY);
  }
  return NextResponse.next();
}
