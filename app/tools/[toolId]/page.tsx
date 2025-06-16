'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ToolContent } from '@/components/tool-content';
import { toolCategories } from '@/lib/tools';
import { isValidToolId } from '@/lib/tools-i18n';
import { useTranslation } from '@/hooks/use-translation';

// 获取工具信息
const getToolInfo = (toolId: string) => {
  for (const category of toolCategories) {
    const tool = category.tools.find(t => t.id === toolId);
    if (tool) {
      return { tool, category };
    }
  }
  return null;
};

// 生成工具页面的结构化数据
const generateToolStructuredData = (toolId: string, locale: string) => {
  const toolInfo = getToolInfo(toolId);
  if (!toolInfo) return null;

  const { tool, category } = toolInfo;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description:
      tool.description ||
      `${tool.name} - ${locale === 'zh' ? 'VerseTool在线工具' : 'VerseTool Online Tool'}`,
    url: `https://itools.jmxr.fun/tools/${tool.id}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    category: category.name,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'VerseTool',
      url: 'https://itools.jmxr.fun',
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: tool.name,
      description: tool.description,
      url: `https://itools.jmxr.fun/tools/${tool.id}`,
    },
  };
};

export default function ToolPage() {
  const router = useRouter();
  const params = useParams();
  const { locale } = useTranslation();
  const toolId = params.toolId as string;

  // 验证工具ID是否有效
  const isValidTool = isValidToolId(toolId);

  const structuredData = generateToolStructuredData(toolId, locale);

  useEffect(() => {
    // 如果工具ID无效，重定向到工具列表页面
    if (!isValidTool) {
      router.replace('/tools');
    }
  }, [toolId, isValidTool, router]);

  // 如果工具ID无效，不渲染任何内容
  if (!isValidTool) {
    return null;
  }

  return (
    <>
      {/* 结构化数据 */}
      {structuredData && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <div className='overflow-auto md:absolute md:inset-0'>
        <ToolContent selectedTool={toolId} />
      </div>
    </>
  );
}
