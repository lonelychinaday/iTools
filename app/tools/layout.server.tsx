import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VerseTool 工具列表 - 免费在线工具集合',
  description:
    '浏览VerseTool完整的在线工具集合，包含开发者工具、文本处理工具、编码解码工具等。免费使用，无需注册。',
  keywords: [
    'VerseTool',
    '在线工具',
    '工具列表',
    '工具集合',
    '开发者工具',
    '文本工具',
    'Base64编码',
    'JSON格式化',
    '密码生成器',
    'URL编码',
    '免费工具',
    'web工具',
  ],
  openGraph: {
    title: 'VerseTool 工具列表 - 免费在线工具集合',
    description:
      '浏览VerseTool完整的在线工具集合，包含开发者工具、文本处理工具、编码解码工具等。',
    type: 'website',
    url: 'https://versetool.com/tools',
    siteName: 'VerseTool',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VerseTool 工具列表',
    description:
      '浏览VerseTool完整的在线工具集合，包含开发者工具、文本处理工具、编码解码工具等。',
  },
  alternates: {
    canonical: '/tools',
  },
};

export default function ToolsServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
