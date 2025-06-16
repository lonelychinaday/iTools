import { Metadata } from 'next';
import { getServerLocale } from '@/lib/locale-server';
import { getLocalizedSEO } from '@/lib/seo-i18n';
import { BRAND } from '@/lib/copy-config';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const localizedSEO = await getLocalizedSEO(locale);

  return {
    title: localizedSEO.title.tools,
    description: localizedSEO.description.tools,
    keywords: localizedSEO.keywords.main,
    openGraph: {
      title: localizedSEO.title.tools,
      description: localizedSEO.description.tools,
      type: 'website',
      url: `${BRAND.domain}/tools`,
      siteName: 'VerseTool',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedSEO.title.short,
      description: localizedSEO.description.tools,
    },
    alternates: {
      canonical: '/tools',
      languages: {
        'zh-CN': '/tools',
        'en-US': '/tools',
        'x-default': '/tools',
      },
    },
  };
}

export default function ToolsServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
