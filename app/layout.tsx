import type { Metadata } from 'next';
import { Lilita_One } from 'next/font/google';
import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { LocaleProvider } from '../components/locale-provider';
import { getServerLocale } from '@/lib/locale-server';
import { getHtmlLang } from '@/lib/locale-utils';
import { SEOMonitor } from '@/components/seo-monitor';
import { BRAND, OG_CONFIG } from '@/lib/copy-config';
import { getLocalizedSEO } from '@/lib/seo-i18n';
import { HreflangTags } from '@/components/hreflang-tags';
import { RootLayoutClient } from '@/components/root-layout-client';

const lilitaOne = Lilita_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-lilita-one',
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const localizedSEO = await getLocalizedSEO(locale);

  return {
    title: {
      default: localizedSEO.title.default,
      template: localizedSEO.title.template,
    },
    description: localizedSEO.description.main,
    keywords: [...localizedSEO.keywords.main],
    authors: [{ name: BRAND.name }],
    creator: BRAND.name,
    publisher: BRAND.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(BRAND.domain),
    alternates: {
      canonical: '/',
      languages: {
        'zh-CN': '/',
        'en-US': '/?lang=en',
        'x-default': '/',
      },
    },
    openGraph: {
      type: OG_CONFIG.type,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? 'en_US' : 'zh_CN',
      url: BRAND.domain,
      title: localizedSEO.title.default,
      description: localizedSEO.description.main,
      siteName: BRAND.name,
      images: [
        {
          url: '/api/og',
          width: OG_CONFIG.image.width,
          height: OG_CONFIG.image.height,
          alt: OG_CONFIG.image.alt,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedSEO.title.short,
      description: localizedSEO.description.short,
      creator: BRAND.twitter,
      images: ['/api/og'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification-code',
      yandex: 'yandex-verification-code',
      yahoo: 'yahoo-verification-code',
    },
    other: {
      'theme-color': '#3b82f6',
      'msapplication-TileColor': '#3b82f6',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 服务端获取语言设置，确保SSR渲染正确的语言
  const locale = await getServerLocale();
  const htmlLang = getHtmlLang(locale);

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        {/* Hreflang标签 - 改善国际化SEO */}
        <HreflangTags />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // 只处理主题设置，语言由服务端预渲染
                const theme = localStorage.getItem('theme')
                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${lilitaOne.variable}`}>
        <LocaleProvider serverLocale={locale}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <RootLayoutClient>{children}</RootLayoutClient>
            <Toaster />
          </ThemeProvider>
        </LocaleProvider>
        <SpeedInsights endpoint='_vercel/speed-insights/vitals' />
        <Analytics />
        <SEOMonitor />
        {process.env.NODE_ENV === 'development' && (
          <div style={{ display: 'none' }}>
            {/* SEO调试信息仅在开发环境显示 */}
          </div>
        )}
      </body>
    </html>
  );
}
