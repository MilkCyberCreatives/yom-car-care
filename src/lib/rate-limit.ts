type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const vercelIp = req.headers.get("x-vercel-forwarded-for")?.trim();
  if (vercelIp) return vercelIp;

  return "unknown";
}

export function checkRateLimit(params: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();

  // Periodic cleanup to avoid unbounded map growth.
  if (Math.random() < 0.02 && buckets.size > 500) {
    for (const [k, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(k);
    }
  }

  const current = buckets.get(params.key);

  if (!current || current.resetAt <= now) {
    const next: Bucket = {
      count: 1,
      resetAt: now + params.windowMs,
    };
    buckets.set(params.key, next);
    return {
      ok: true,
      remaining: params.limit - 1,
      retryAfterMs: params.windowMs,
    };
  }

  if (current.count >= params.limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterMs: Math.max(0, current.resetAt - now),
    };
  }

  current.count += 1;
  buckets.set(params.key, current);

  return {
    ok: true,
    remaining: Math.max(0, params.limit - current.count),
    retryAfterMs: Math.max(0, current.resetAt - now),
  };
}
