import type { Metadata } from 'next';
import { Lilita_One } from 'next/font/google';
import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { LocaleProvider } from '../components/locale-provider';

const lilitaOne = Lilita_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-lilita-one',
});

export const metadata: Metadata = {
  title: 'iTools - 工具箱',
  description:
    '现代化的开发者工具集合，包含JSON格式化、Base64编码、密码生成等实用工具',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // 设置主题
                const theme = localStorage.getItem('theme')
                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
                
                // 设置语言
                function detectBrowserLanguage() {
                  const browserLang = navigator.language.toLowerCase();
                  if (browserLang.startsWith('en')) return 'en';
                  if (browserLang.startsWith('zh')) return 'zh';
                  return 'zh';
                }
                
                function getCurrentLocale() {
                  const stored = localStorage.getItem('locale');
                  if (stored && (stored === 'zh' || stored === 'en')) {
                    return stored;
                  }
                  return detectBrowserLanguage();
                }
                
                const locale = getCurrentLocale();
                const langMap = { zh: 'zh-CN', en: 'en-US' };
                document.documentElement.lang = langMap[locale] || 'en-US';
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${lilitaOne.variable}`} suppressHydrationWarning={true}>
        <LocaleProvider>
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
