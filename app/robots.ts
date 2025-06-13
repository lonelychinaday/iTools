import { MetadataRoute } from 'next';
import { BRAND, generateUrls } from '@/lib/copy-config';

export default function robots(): MetadataRoute.Robots {
  const { sitemap } = generateUrls();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/private/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap,
    host: BRAND.domain,
  };
}
