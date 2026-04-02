import { env as publicEnv } from '$env/dynamic/public';
import type { RequestHandler } from './$types';

function getSiteUrl() {
  const siteUrl = publicEnv.PUBLIC_SITE_URL?.trim();
  return (siteUrl && siteUrl.replace(/\/+$/, '')) || 'http://localhost:5173';
}

export const GET: RequestHandler = async () => {
  const siteUrl = getSiteUrl();
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
