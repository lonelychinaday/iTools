import type { Metadata } from 'next';
import { toolCategories } from '@/lib/tools';
import { BRAND } from '@/lib/copy-config';
import { getServerLocale } from '@/lib/locale-server';
import { getLocalizedToolMeta } from '@/lib/seo-i18n';
import { getLocalizedToolCategories } from '@/lib/tools-i18n';

// 获取工具信息
const getToolInfo = (toolId: string, locale: string) => {
  const localizedCategories = getLocalizedToolCategories(locale as 'zh' | 'en');

  for (const category of localizedCategories) {
    const tool = category.tools.find(t => t.id === toolId);
    if (tool) {
      return { tool, category };
    }
  }
  return null;
};

// 动态生成页面metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ toolId: string }>;
}): Promise<Metadata> {
  const { toolId } = await params;
  const locale = await getServerLocale();
  const toolInfo = getToolInfo(toolId, locale);

  if (!toolInfo) {
    return {
      title: locale === 'zh' ? '工具未找到' : 'Tool Not Found',
    };
  }

  const { tool, category } = toolInfo;
  const toolMeta = getLocalizedToolMeta(tool.name, category.name, locale);
  const description = tool.description || toolMeta.description;

  return {
    title: toolMeta.title,
    description,
    keywords: toolMeta.keywords,
    alternates: {
      canonical: `/tools/${tool.id}`,
      languages: {
        'zh-CN': `/tools/${tool.id}`,
        'en-US': `/tools/${tool.id}?lang=en`,
        'x-default': `/tools/${tool.id}`,
      },
    },
    openGraph: {
      title: toolMeta.title,
      description,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? 'en_US' : 'zh_CN',
      url: `${BRAND.domain}/tools/${tool.id}`,
      siteName: BRAND.name,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
          alt: tool.name,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: toolMeta.title,
      description,
      images: [
        `/api/og?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(description)}`,
      ],
    },
    other: {
      'article:section': category.name,
      'article:tag': tool.name,
    },
  };
}

// 生成静态参数（用于构建时预生成页面）
export async function generateStaticParams() {
  const params = toolCategories.flatMap(category =>
    category.tools.map(tool => ({
      toolId: tool.id,
    }))
  );

  return params;
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
