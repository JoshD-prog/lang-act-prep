import { env as publicEnv } from '$env/dynamic/public';
import { createAdminSupabaseClient } from '$lib/server/supabase';
import { getSchools } from '$lib/server/data';
import type { RequestHandler } from './$types';

type SitemapEntry = {
  path: string;
  changefreq: 'weekly' | 'monthly';
  priority: string;
  lastmod?: string;
};

const STATIC_ROUTES: SitemapEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/classes', changefreq: 'weekly', priority: '0.9' },
  { path: '/how-it-works', changefreq: 'monthly', priority: '0.8' },
  { path: '/resources', changefreq: 'weekly', priority: '0.8' },
  { path: '/resources/for-parents', changefreq: 'monthly', priority: '0.7' },
  { path: '/resources/for-educators', changefreq: 'monthly', priority: '0.7' },
  { path: '/529-update', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
  { path: '/scholarship-calculator', changefreq: 'weekly', priority: '0.9' },
  { path: '/schools', changefreq: 'weekly', priority: '0.8' },
  { path: '/enroll', changefreq: 'weekly', priority: '0.8' },
  { path: '/terms-and-conditions', changefreq: 'monthly', priority: '0.3' }
];

function getSiteUrl() {
  const siteUrl = publicEnv.PUBLIC_SITE_URL?.trim();
  return (siteUrl && siteUrl.replace(/\/+$/, '')) || 'http://localhost:5173';
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildUrl(siteUrl: string, path: string) {
  return `${siteUrl}${path === '/' ? '' : path}`;
}

function normalizeDate(value?: string | null) {
  return value ? value.split('T')[0] : undefined;
}

export const GET: RequestHandler = async () => {
  const siteUrl = getSiteUrl();
  const schools = await getSchools();
  const supabase = createAdminSupabaseClient();

  let classesLastmod: string | undefined;
  let schoolsLastmod: string | undefined;
  const schoolLastmods = new Map<string, string>();

  if (supabase) {
    const [classResult, schoolResult] = await Promise.all([
      supabase
        .from('class_offerings')
        .select('updated_at')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('high_schools')
        .select('slug, updated_at')
        .order('updated_at', { ascending: false })
    ]);

    classesLastmod = normalizeDate(classResult.data?.updated_at);

    if (schoolResult.data?.length) {
      schoolsLastmod = normalizeDate(schoolResult.data[0].updated_at);

      for (const school of schoolResult.data) {
        const lastmod = normalizeDate(school.updated_at);

        if (lastmod) {
          schoolLastmods.set(school.slug, lastmod);
        }
      }
    }
  }

  const entries: SitemapEntry[] = [
    ...STATIC_ROUTES.map((route) => ({
      ...route,
      lastmod:
        route.path === '/classes' ? classesLastmod : route.path === '/schools' ? schoolsLastmod : undefined
    })),
    ...schools.map((school) => ({
      path: `/schools/${school.slug}`,
      changefreq: 'weekly' as const,
      priority: '0.7',
      lastmod: schoolLastmods.get(school.slug)
    }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(buildUrl(siteUrl, entry.path))}</loc>
${entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : ''}    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};
