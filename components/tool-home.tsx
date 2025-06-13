'use client';

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
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

interface ToolHomeProps {
  onToolSelect: (toolId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCommandPaletteTrigger?: () => void;
}

export function ToolHome({
  onToolSelect,
  searchQuery,
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

  return (
    <div className='min-h-full'>
      {/* 顶部区域 */}
      <div className='relative'>
        <div className='max-w-6xl mx-auto px-6 pt-12 pb-6'>
          <div className='text-center space-y-4'>
            {/* Logo */}
            <div className='flex justify-center mb-6'>
              <Logo />
            </div>

            <h1 className='text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#1ABAFA] via-[#0891b2] to-[#28E361] bg-clip-text text-transparent'>
              {ts('home.welcomeTitle', '在线工具集合')}{' '}
              <span className='font-lilita-one tracking-wider'>VerseTool</span>
            </h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              {ts('home.welcomeSubtitle', '强大而简洁的在线工具，让工作更高效')}
            </p>

            {/* 搜索框 */}
            <div className='max-w-md mx-auto mt-8'>
              <SearchBox
                value=''
                onChange={() => {}}
                placeholder={ts('home.searchPlaceholder', '搜索工具或按 ⌘K')}
                size='lg'
                variant='home'
                showShortcut={true}
                triggerCommandPalette={true}
                onCommandPaletteTrigger={onCommandPaletteTrigger}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 工具展示区域 */}
      <div className='max-w-6xl mx-auto px-6 md:py-8 relative'>
        {/* 工具展示 */}
        <div>
          {searchQuery && (
            <h2 className='text-2xl font-semibold mb-6 text-slate-700 dark:text-slate-300'>
              {ts('common.search', '搜索')} ({filteredTools.length})
            </h2>
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
            <div className='text-center py-12'>
              <p className='text-muted-foreground text-lg'>
                {ts('home.noToolsFound', '未找到相关工具')}
              </p>
              <p className='text-muted-foreground text-sm mt-2'>
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
        'cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-border/40',
        'bg-card/60 backdrop-blur-md hover:bg-card/90 shadow-sm'
      )}
      onClick={() => onSelect(tool.id)}
    >
      <CardHeader className='pb-2 pt-4 px-4'>
        <div className='flex items-center justify-between mb-2'>
          <tool.icon className='h-6 w-6 text-accent-foreground' />
          <Badge
            variant='secondary'
            className='text-xs px-2 py-0.5 text-muted-foreground'
          >
            {categoryName}
          </Badge>
        </div>
        <CardTitle className='text-base leading-tight text-accent-foreground'>
          {tool.name}
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-0 px-4 pb-4'>
        <CardDescription className='text-sm leading-relaxed text-muted-foreground'>
          {tool.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
