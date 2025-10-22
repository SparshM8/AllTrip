/**
 * Lightweight analytics helper.
 * - Safe to import in Server Components (functions no-op server side)
 * - Provides trackEvent + identifyUser scaffolding
 * - Designed for later wiring to a real endpoint or third-party SDK
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
  anonymousId?: string;
  timestamp?: string; // ISO
}

const isBrowser = typeof window !== 'undefined';

// Simple in-memory queue (browser) in case you later batch or ship to an endpoint.
const queue: AnalyticsEvent[] = [];

function flushToConsole(evt: AnalyticsEvent) {
  // Central place to replace with a real transport later
  // eslint-disable-next-line no-console
  console.debug('[analytics]', evt.name, evt);
}

export function trackEvent(name: string, properties?: Record<string, any>) {
  if (!isBrowser) return; // SSR no-op
  const evt: AnalyticsEvent = {
    name,
    properties,
    timestamp: new Date().toISOString(),
    anonymousId: getAnonymousId(),
  };
  queue.push(evt);
  flushToConsole(evt);
}

let _anonId: string | null = null;
function getAnonymousId() {
  if (!isBrowser) return undefined;
  if (_anonId) return _anonId;
  try {
    const key = 'alltripp_anonymous_id';
    const stored = window.localStorage.getItem(key);
    if (stored) { _anonId = stored; return stored; }
    _anonId = crypto.randomUUID();
    window.localStorage.setItem(key, _anonId);
    return _anonId;
  } catch {
    return undefined;
  }
}

// Basic identify hook (currently stores in-memory; extend as needed)
let _userId: string | null = null;
export function identifyUser(userId: string) {
  if (!isBrowser) return;
  _userId = userId;
  trackEvent('identify', { userId });
}

// Expose queue for potential debugging (avoid mutating outside)
export function __getQueueSnapshot() {
  return [...queue];
}

// Optional convenience: wrapped CTA click helper
export function trackCta(label: string, context?: string) {
  trackEvent('cta_click', { label, context });
}

// Future integration suggestions:
// 1. Replace flushToConsole with POST to /api/analytics (batch send on visibilitychange)
// 2. Add performance marks (e.g., LCP, FID) hooking into web-vitals
// 3. Add route change tracking via next/navigation events
// 4. Provide user consent gating before emitting events
