import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://neo125312-project.github.io/fortune-vault/').replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/preview-versions/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
