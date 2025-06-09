import type { Metadata } from 'next';
import { Lilita_One } from 'next/font/google';
import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';

import { Analytics } from '@vercel/analytics/next';

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
    <html lang='zh-CN'>
      <body className={`${lilitaOne.variable}`} suppressHydrationWarning={true}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
