import { env as publicEnv } from '$env/dynamic/public';
import { getSiteUrl as getConfiguredSiteUrl } from '$lib/seo';
import type { RequestHandler } from './$types';

function getSiteUrl(fallbackOrigin?: string) {
  const siteUrl = publicEnv.PUBLIC_SITE_URL?.trim();
  return (siteUrl && siteUrl.replace(/\/+$/, '')) || getConfiguredSiteUrl(fallbackOrigin);
}

export const GET: RequestHandler = async ({ url }) => {
  const siteUrl = getSiteUrl(url.origin);
  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};
