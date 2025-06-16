'use client';

import { useRouter } from 'next/navigation';
import { ChevronRight, Search, Menu, ChevronLeft, Sidebar } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { getLocalizedToolCategories } from '@/lib/tools-i18n';
import { useTranslation } from '@/hooks/use-translation';
import { BRAND } from '@/lib/copy-config';

// 生成工具列表的结构化数据
const generateToolsStructuredData = (
  categories: Array<{
    tools: Array<{ id: string; name: string; description?: string }>;
  }>,
  locale: string
) => {
  const tools = categories.flatMap(category =>
    category.tools.map(
      (tool: { id: string; name: string; description?: string }) => ({
        '@type': 'SoftwareApplication',
        name: tool.name,
        description:
          tool.description ||
          `${tool.name} - ${locale === 'zh' ? 'VerseTool在线工具' : 'VerseTool Online Tool'}`,
        url: `${BRAND.domain}/tools/${tool.id}`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      })
    )
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name:
      locale === 'zh'
        ? 'VerseTool 在线工具集合'
        : 'VerseTool Online Tools Collection',
    description:
      locale === 'zh'
        ? '完整的在线工具集合，包含开发者工具、文本处理工具、编码解码工具等多种实用工具'
        : 'Complete online tools collection including developer tools, text processing tools, encoding/decoding tools and more utilities',
    url: `${BRAND.domain}/tools`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: tool,
      })),
    },
  };
};

export default function ToolsPage() {
  const router = useRouter();
  const { ts, locale } = useTranslation();
  const localizedCategories = getLocalizedToolCategories(locale);
  const structuredData = generateToolsStructuredData(
    localizedCategories,
    locale
  );

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (toolId: string) => {
    router.push(`/tools/${toolId}`);
  };

  return (
    <>
      {/* 结构化数据 */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className='overflow-auto md:absolute md:inset-0'>
        <div className='p-6 space-y-6'>
          {/* 页面标题区域 */}
          <div className='space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>
              {ts('home.welcomeTitle', '在线工具集合')} VerseTool
            </h1>
            <p className='text-muted-foreground'>
              {ts('home.welcomeSubtitle', '强大而简洁的在线工具，让工作更高效')}
            </p>
          </div>

          {/* 布局介绍区域 */}
          <Card>
            <CardHeader className='pb-4'>
              <CardTitle className='text-lg'>
                {ts('tools.usage', '使用指南')}
              </CardTitle>
              <CardDescription>
                {ts(
                  'pages.tools.usageGuideDescription',
                  '了解如何使用VerseTool工具箱'
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* 侧边栏使用说明 */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Sidebar className='h-5 w-5 text-accent-foreground' />
                      <h3 className='font-medium text-lg'>
                        {ts('pages.tools.sidebarTitle', '导航侧边栏')}
                      </h3>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {ts(
                        'pages.tools.sidebarDescription',
                        '左侧侧边栏包含了所有工具分类，点击分类标题可以展开或折叠'
                      )}
                    </p>
                  </div>
                  <div className='space-y-1 text-sm text-muted-foreground ml-2'>
                    <div className='flex items-center gap-2'>
                      <ChevronRight className='h-4 w-4 flex-shrink-0' />
                      <span>
                        {ts(
                          'pages.tools.sidebarTip1',
                          '点击工具名称进入对应工具页面'
                        )}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <ChevronRight className='h-4 w-4 flex-shrink-0' />
                      <span>
                        {ts(
                          'pages.tools.sidebarTip2',
                          '点击分类名称展开所有工具'
                        )}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <ChevronRight className='h-4 w-4 flex-shrink-0' />
                      <span>
                        {
                          ts(
                            'pages.tools.sidebarTip3',
                            '使用按钮可以折叠侧边栏'
                          ).split('按钮')[0]
                        }
                        <ChevronLeft className='h-3.5 w-3.5 inline-block mx-1' />
                        {
                          ts(
                            'pages.tools.sidebarTip3',
                            '使用按钮可以折叠侧边栏'
                          ).split('按钮')[1]
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Search className='h-5 w-5 text-accent-foreground' />
                      <h3 className='font-medium text-lg'>
                        {ts('pages.tools.searchTitle', '搜索功能')}
                      </h3>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {ts(
                        'pages.tools.searchDescription',
                        '顶部导航栏的搜索框可以帮助您快速找到需要的工具'
                      )}
                    </p>
                  </div>
                  <div className='space-y-1 text-sm text-muted-foreground ml-2'>
                    <div className='flex items-center gap-2'>
                      <ChevronRight className='h-4 w-4 flex-shrink-0' />
                      <span>
                        {ts(
                          'pages.tools.searchTip1',
                          '输入工具名称或描述进行搜索'
                        )}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <ChevronRight className='h-4 w-4 flex-shrink-0' />
                      <span>
                        {ts(
                          'pages.tools.searchTip2',
                          '搜索结果会实时显示在侧边栏中'
                        )}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Menu className='h-4 w-4 flex-shrink-0' />
                      <span>
                        {ts(
                          'pages.tools.searchTip3',
                          '在手机上，点击左上角的菜单图标打开侧边栏'
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 工具分类区域 */}
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold tracking-tight'>
              {ts('common.allTools', '全部工具')}
            </h2>

            {/* 工具分类网格 */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {localizedCategories.map(category => (
                <Card
                  key={category.id}
                  className='overflow-hidden border-border/40'
                >
                  <CardHeader className='pb-4 bg-muted/30'>
                    <div className='flex items-center gap-2'>
                      <category.icon className='h-5 w-5 text-accent-foreground' />
                      <CardTitle className='text-base'>
                        {category.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className='pt-4 space-y-3'>
                    {category.tools.map(tool => (
                      <div
                        key={tool.id}
                        className='flex items-center justify-between p-2 rounded-md hover:bg-muted/70 cursor-pointer transition-colors'
                        onClick={() => handleToolSelect(tool.id)}
                      >
                        <div className='flex items-center gap-2'>
                          <tool.icon className='h-4 w-4 text-muted-foreground' />
                          <span className='text-sm'>{tool.name}</span>
                        </div>
                        <ChevronRight className='h-4 w-4 text-muted-foreground' />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 快速开始区域 */}
          <Card className='border-accent/40 bg-muted/20'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-lg'>
                {ts('pages.tools.quickStart', '快速开始')}
              </CardTitle>
              <CardDescription>
                {ts(
                  'pages.tools.quickStartDescription',
                  '选择一个热门工具立即开始使用'
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {localizedCategories.flatMap(category =>
                  category.tools.slice(0, 2).map(tool => (
                    <Button
                      key={tool.id}
                      variant='outline'
                      className='justify-start h-10'
                      onClick={() => handleToolSelect(tool.id)}
                    >
                      <tool.icon className='h-4 w-4 mr-2' />
                      {tool.name}
                    </Button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
