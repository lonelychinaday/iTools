'use client';

// 移除不必要的 hooks
import { SearchBox } from '@/components/ui/search-box';
import { Logo } from '@/components/ui/logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { getLocalizedToolCategories } from '@/lib/tools-i18n';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

interface ToolHomeProps {
  onToolSelect: (toolId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCommandPaletteTrigger?: () => void;
}

export function ToolHome({
  onToolSelect,
  searchQuery,
  onSearchChange,
  onCommandPaletteTrigger,
}: ToolHomeProps) {
  const { ts, locale } = useTranslation();

  // 获取国际化的工具数据
  const localizedCategories = getLocalizedToolCategories(locale);

  // 获取所有工具的平铺列表
  const allTools = localizedCategories.flatMap(category =>
    category.tools.map(tool => ({
      ...tool,
      categoryName: category.name,
      categoryId: category.id,
    }))
  );

  // 根据搜索查询过滤工具
  const filteredTools = allTools.filter(
    tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 移除加载状态，直接渲染内容

  return (
    <div className='min-h-full'>
      {/* 顶部区域 */}
      <div className='relative'>
        <div className='max-w-6xl mx-auto px-6 pt-16 pb-12'>
          <div className='text-center space-y-6'>
            {/* Logo */}
            <div className='flex justify-center'>
              <Logo className='w-24 h-24 md:w-32 md:h-32' />
            </div>

            {/* 品牌名称 */}
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mt-[0!important]'>
              <span className='font-lilita-one tracking-wider bg-gradient-to-r from-[#1ABAFA] via-[#0891b2] to-[#28E361] bg-clip-text text-transparent'>
                VerseTool
              </span>
            </h1>

            {/* 标语 */}
            <h2 className='text-xl md:text-2xl lg:text-3xl font-normal tracking-tight text-muted-foreground'>
              {ts('home.welcomeTitle', '让每个工具都恰到好处')}
            </h2>

            {/* 副标题 */}
            <p className='text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
              {ts(
                'home.welcomeSubtitle',
                '精心设计的实用工具集，让日常任务变得轻松简单。无需下载安装，打开即用'
              )}
            </p>

            {/* 搜索框 */}
            <div className='max-w-lg mx-auto mt-8'>
              <SearchBox
                value={searchQuery}
                onChange={onSearchChange}
                placeholder={ts('home.searchPlaceholder', '搜索工具或按 ⌘K')}
                size='lg'
                variant='home'
                showShortcut={true}
                triggerCommandPalette={true}
                onCommandPaletteTrigger={onCommandPaletteTrigger}
              />
            </div>

            {/* 特性展示 */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16'>
              <div className='text-center space-y-2 p-4 rounded-lg bg-card/30 border border-border/40 hover:bg-card/50 transition-colors'>
                <div className='text-2xl mb-1'>⚡</div>
                <h3 className='text-base font-semibold text-foreground'>
                  {ts('home.heroFeature1', '即时处理').replace('⚡ ', '')}
                </h3>
                <p className='text-xs text-muted-foreground leading-relaxed'>
                  {ts('home.heroFeature1Desc', '快速响应，即时获得结果')}
                </p>
              </div>
              <div className='text-center space-y-2 p-4 rounded-lg bg-card/30 border border-border/40 hover:bg-card/50 transition-colors'>
                <div className='text-2xl mb-1'>🔒</div>
                <h3 className='text-base font-semibold text-foreground'>
                  {ts('home.heroFeature2', '隐私安全').replace('🔒 ', '')}
                </h3>
                <p className='text-xs text-muted-foreground leading-relaxed'>
                  {ts(
                    'home.heroFeature2Desc',
                    '数据本地处理，不会上传到服务器'
                  )}
                </p>
              </div>
              <div className='text-center space-y-2 p-4 rounded-lg bg-card/30 border border-border/40 hover:bg-card/50 transition-colors'>
                <div className='text-2xl mb-1'>🎨</div>
                <h3 className='text-base font-semibold text-foreground'>
                  {ts('home.heroFeature3', '简洁易用').replace('🎨 ', '')}
                </h3>
                <p className='text-xs text-muted-foreground leading-relaxed'>
                  {ts('home.heroFeature3Desc', '直观设计，人人都能轻松上手')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 工具展示区域 */}
      <div className='max-w-6xl mx-auto px-6 py-8 relative'>
        {/* 工具展示 */}
        <div>
          {searchQuery ? (
            <div className='mb-8'>
              <h2 className='text-2xl font-bold tracking-tight mb-2 text-foreground'>
                {ts('common.search', '搜索')} ({filteredTools.length})
              </h2>
              <p className='text-muted-foreground'>
                {ts(
                  'home.searchResults',
                  `找到 ${filteredTools.length} 个相关工具`
                ).replace('{count}', filteredTools.length.toString())}
              </p>
            </div>
          ) : (
            <div className='text-center mb-12'>
              <h2 className='text-2xl md:text-3xl font-bold tracking-tight mb-3 text-foreground'>
                {ts('home.popularTools', '热门工具')}
              </h2>
              <p className='text-base text-muted-foreground max-w-2xl mx-auto'>
                {ts(
                  'pages.tools.quickStartDescription',
                  '选择一个热门工具立即开始使用'
                )}
              </p>
            </div>
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {(searchQuery ? filteredTools : allTools).map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                categoryName={tool.categoryName}
                onSelect={onToolSelect}
              />
            ))}
          </div>
          {searchQuery && filteredTools.length === 0 && (
            <div className='text-center py-16'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-xl font-semibold mb-2 text-foreground'>
                {ts('home.noToolsFound', '未找到相关工具')}
              </h3>
              <p className='text-muted-foreground'>
                {ts('home.tryDifferentKeywords', '请尝试不同的关键词')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  categoryName: string;
  onSelect: (toolId: string) => void;
}

function ToolCard({ tool, categoryName, onSelect }: ToolCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02] border-border/50',
        'bg-card/60 backdrop-blur-sm hover:bg-card/90 shadow-sm hover:border-primary/20',
        'group relative overflow-hidden'
      )}
      onClick={() => onSelect(tool.id)}
    >
      <CardHeader className='pb-3 pt-6 px-6'>
        <div className='flex items-center justify-between mb-3'>
          <div className='p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors'>
            <tool.icon className='h-6 w-6 text-primary' />
          </div>
          <Badge
            variant='secondary'
            className='text-xs px-2 py-1 text-muted-foreground bg-muted/60'
          >
            {categoryName}
          </Badge>
        </div>
        <CardTitle className='text-lg leading-tight text-foreground group-hover:text-primary transition-colors'>
          {tool.name}
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-0 px-6 pb-6'>
        <CardDescription className='text-sm leading-relaxed text-muted-foreground'>
          {tool.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

// 移除骨架屏组件，现在直接渲染内容
