import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Redis } from '@upstash/redis';

export const runtime = 'edge';

// Default progress data
const defaultProgress = {
  trips: [
    {
      image: "/ongoing/trip-to-goa.png",
      title: "Trip to Goa",
      status: "25% completed",
      percentage: 25
    },
    {
      image: "/ongoing/trip-to-himachal.png",
      title: "Trip to Himachal",
      status: "20% completed",
      percentage: 20
    }
  ],
  clickCount: 0,
  globalHighestProgress: 25,
  lastClickTime: 0
};

// Zod schema for POST body
const progressSchema = z.object({
  trips: z
    .array(
      z.object({
        image: z.string(),
        title: z.string(),
        status: z.string(),
        percentage: z.number().min(0).max(100),
      })
    )
    .optional(),
  clickCount: z.number().int().min(0).optional(),
  globalHighestProgress: z.number().min(0).max(100).optional(),
  lastClickTime: z.number().int().nonnegative().optional(),
});

// In-memory fallback (per-region ephemeral)
const memory = (globalThis as any).__progressMemory ?? new Map<string, any>();
(globalThis as any).__progressMemory = memory;

const hasUpstash = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
let redis: Redis | null = null;
if (hasUpstash) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

const KEY = 'progress:global:v1';
const RATELIMIT_PREFIX = 'rl:progress:'; // per ip
const RATE_WINDOW_MS = 2000; // 1 update per 2s

async function kvGet<T>(): Promise<T | null> {
  if (!redis) {
    return (memory.has(KEY) ? memory.get(KEY) : null) as T | null;
  }
  return (await redis.get<T>(KEY)) ?? null;
}

async function kvSet<T>(value: T) {
  if (!redis) {
    memory.set(KEY, value);
    return;
  }
  await redis.set(KEY, value);
}

async function checkRateLimit(ip: string | null): Promise<{ allowed: boolean; retryAfter?: number }> {
  if (!ip) return { allowed: true };
  const key = `${RATELIMIT_PREFIX}${ip}`;
  const now = Date.now();
  if (!redis) {
    // simple in-memory timestamp
    const last = memory.get(key) as number | undefined;
    if (last && now - last < RATE_WINDOW_MS) {
      return { allowed: false, retryAfter: Math.ceil((RATE_WINDOW_MS - (now - last)) / 1000) };
    }
    memory.set(key, now);
    return { allowed: true };
  }
  const existing = await redis.get<number>(key);
  if (existing) {
    return { allowed: false, retryAfter: Math.ceil((RATE_WINDOW_MS - (now - existing)) / 1000) };
  }
  // set with px expiry
  await redis.set(key, now, { px: RATE_WINDOW_MS });
  return { allowed: true };
}

function buildEtag(obj: unknown): string {
  try {
    const json = JSON.stringify(obj);
    let hash = 0;
    for (let i = 0; i < json.length; i++) hash = (hash * 31 + json.charCodeAt(i)) | 0;
    return 'W/"pg-' + (hash >>> 0).toString(16) + '"';
  } catch {
    return 'W/"pg-0"';
  }
}

// GET /api/progress - Get current progress data
export async function GET(req: NextRequest) {
  try {
    const progressData = (await kvGet<typeof defaultProgress>()) ?? defaultProgress;
    const etag = buildEtag(progressData);
    const ifNoneMatch = req.headers.get('if-none-match');
    if (ifNoneMatch && ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304, headers: { ETag: etag } });
    }
    return NextResponse.json(progressData, { headers: { ETag: etag, 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get progress' }, { status: 500 });
  }
}

// POST /api/progress - Update progress data
export async function POST(request: NextRequest) {
  try {
    // Rate limit
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || null;
    const rl = await checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded', retryAfter: rl.retryAfter }, { status: 429 });
    }
    const body = await request.json().catch(() => ({}));
    const parsed = progressSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const current = (await kvGet<typeof defaultProgress>()) ?? defaultProgress;
    const updatedData = {
      ...current,
      ...parsed.data,
      trips: parsed.data.trips ?? current.trips,
    };

    await kvSet(updatedData);
    const etag = buildEtag(updatedData);
    return NextResponse.json({ success: true, data: updatedData }, { headers: { ETag: etag } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}