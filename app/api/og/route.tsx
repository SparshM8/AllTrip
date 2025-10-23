import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// NOTE: Ensure you install @vercel/og if not already present.
// npm install @vercel/og --save

const brandGradient = 'linear-gradient(135deg,#0f172a 0%,#1e293b 35%,#334155 65%,#0f172a 100%)';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') || 'AllTripp Travel Experiences').slice(0, 120);
  const subtitle = (searchParams.get('subtitle') || '').slice(0, 140);
  const type = searchParams.get('type') || 'default';

  const accent = type === 'destination' ? '#38bdf8' : type === 'blog' ? '#f472b6' : '#8b5cf6';

  const styles = `
    .og-root { height:100%; width:100%; display:flex; flex-direction:column; justify-content:space-between; padding:64px; background:${brandGradient}; font-family:system-ui,Inter,sans-serif; color:#f1f5f9; }
    .og-header { display:flex; width:100%; justify-content:space-between; align-items:flex-start; }
    .og-brand { display:flex; gap:12px; align-items:center; }
    .og-logo { width:64px; height:64px; border-radius:16px; background:radial-gradient(circle at 30% 30%, #ffffff20, #00000060); display:flex; align-items:center; justify-content:center; font-size:36px; font-weight:600; color:${accent}; }
    .og-name { font-size:32px; font-weight:600; }
    .og-type { font-size:20px; font-weight:500; color:#cbd5e1; }
    .og-main { flex:1; display:flex; flex-direction:column; justify-content:center; }
    .og-title { font-size:76px; line-height:1.1; font-weight:700; margin:0; background-image:linear-gradient(90deg, ${accent}, #ffffff); -webkit-background-clip:text; background-clip:text; color:transparent; }
    .og-sub { font-size:32px; margin-top:24px; max-width:1100px; color:#e2e8f0; line-height:1.3; }
    .og-footer { display:flex; justify-content:space-between; align-items:center; font-size:24px; color:#94a3b8; }
    .og-tagline { font-size:20px; }
  `;

  return new ImageResponse(
    (
      <div className="og-root">
        {/* Embedded styles to satisfy edge runtime + lint rule without inline style attributes */}
        <style suppressHydrationWarning>{styles}</style>
        <div className="og-header">
          <div className="og-brand">
            <div className="og-logo">AT</div>
            <div className="og-name">AllTripp</div>
          </div>
            <div className="og-type">{type.toUpperCase()}</div>
        </div>
        <div className="og-main">
          <h1 className="og-title">{title}</h1>
          {subtitle && (<p className="og-sub">{subtitle}</p>)}
        </div>
        <div className="og-footer">
          <span>https://alltripp.com</span>
          <span className="og-tagline">Premium India Travel</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}