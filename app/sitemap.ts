import { MetadataRoute } from 'next';
import { getAllToolIds } from '@/lib/tools-i18n';
import { BRAND } from '@/lib/copy-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.domain;

  // 基础页面路由
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/tools', priority: 0.9, changeFrequency: 'daily' as const },
  ];

  // 工具页面路由
  const toolRoutes = getAllToolIds().map(toolId => ({
    path: `/tools/${toolId}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }));

  const allRoutes = [...routes, ...toolRoutes];

  // 为每个路由生成多语言版本
  const sitemapEntries = allRoutes.flatMap(route => [
    {
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          'zh-CN': `${baseUrl}${route.path}`,
          'en-US': `${baseUrl}${route.path}?lang=en`,
        },
      },
    },
  ]);

  return sitemapEntries;
}
