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

const lilitaOne = Lilita_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-lilita-one',
});

export const metadata: Metadata = {
  title: 'iTools - 工具箱',
  description:
    '现代化的在线工具集合，包含JSON格式化、Base64编码、密码生成等实用工具',
};

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
      <body className={`${lilitaOne.variable}`} suppressHydrationWarning={true}>
        <LocaleProvider serverLocale={locale}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            // disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </LocaleProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
