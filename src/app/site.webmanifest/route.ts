import { getSiteInfo, getManifestConfig } from '@/lib/site-config';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const siteInfo = getSiteInfo();
  const manifestConfig = getManifestConfig();

  const manifest = {
    name: siteInfo.title,
    short_name: siteInfo.shortName,
    description: siteInfo.description,
    icons: manifestConfig.icons,
    splash_screens: manifestConfig.splash_screens,
    theme_color: siteInfo.themeColor,
    background_color: siteInfo.backgroundColor,
    display: manifestConfig.display,
    orientation: manifestConfig.orientation,
    scope: manifestConfig.scope,
    start_url: manifestConfig.start_url,
    lang: siteInfo.language
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
} 