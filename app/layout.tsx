import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'iTools - 开发者工具箱',
  description: '现代化的开发者工具集合，包含JSON格式化、Base64编码、密码生成等实用工具',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
