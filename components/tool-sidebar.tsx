'use client';

import { useMemo } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { getLocalizedToolCategories } from '@/lib/tools-i18n';
import { useLocaleContext } from '@/components/locale-provider';
import { useSidebarContext } from '@/components/sidebar-provider';
import { useTranslation } from '@/hooks/use-translation';

interface ToolSidebarProps {
  selectedTool?: string;
  onToolSelect: (toolId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ToolSidebar({
  selectedTool,
  onToolSelect,
  searchQuery,
}: ToolSidebarProps) {
  const { locale } = useLocaleContext();
  const { ts } = useTranslation();
  const {
    collapsed,
    expandedCategories,
    isMobile,
    toggleCollapsed,
    toggleCategory,
    setExpandedCategories,
  } = useSidebarContext();

  // 获取国际化的工具数据，使用 useMemo 缓存避免无限重渲染
  const localizedCategories = useMemo(
    () => getLocalizedToolCategories(locale),
    [locale]
  );

  const handleToolSelect = (toolId: string) => {
    // 桌面端：如果侧边栏收起且点击的工具分类未展开，先展开分类
    if (!isMobile && collapsed) {
      const categoryWithTool = localizedCategories.find(category =>
        category.tools.some(tool => tool.id === toolId)
      );

      if (
        categoryWithTool &&
        !expandedCategories.includes(categoryWithTool.id)
      ) {
        const newExpandedCategories = [
          ...expandedCategories,
          categoryWithTool.id,
        ];
        setExpandedCategories(newExpandedCategories);
      }
    }

    onToolSelect(toolId);
  };

  const handleCategoryToggle = (categoryId: string) => {
    if (collapsed) return; // 收起状态下不允许切换分类
    toggleCategory(categoryId);
  };

  const filteredCategories = localizedCategories
    .map(category => ({
      ...category,
      tools: category.tools.filter(
        tool =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(category => category.tools.length > 0);

  return (
    <div
      className={cn(
        'h-full border-r bg-background flex flex-col transition-all duration-200 ease-in-out relative',
        collapsed ? 'w-12 overflow-hidden' : 'min-w-[200px] max-w-[320px] w-fit'
      )}
    >
      {/* Scrollable content */}
      <div
        className={cn(
          'flex-1',
          collapsed ? 'overflow-hidden' : 'overflow-y-auto'
        )}
      >
        <div className={cn('py-3', collapsed ? 'px-1' : 'px-3')}>
          {/* Tool Categories */}
          <div className='space-y-1.5'>
            {filteredCategories.map(category => (
              <div key={category.id} className='space-y-1'>
                {collapsed ? (
                  // 收起状态：只显示分类图标，使用原生tooltip
                  <div className='space-y-1'>
                    {category.tools.map(tool => (
                      <Button
                        key={tool.id}
                        variant='ghost'
                        className={cn(
                          'w-full h-8 p-0 hover:bg-muted/70',
                          selectedTool === tool.id
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                        onClick={() => handleToolSelect(tool.id)}
                        title={tool.name}
                      >
                        <tool.icon
                          className={cn(
                            'h-4 w-4',
                            selectedTool === tool.id
                              ? 'text-accent-foreground'
                              : 'text-muted-foreground'
                          )}
                        />
                      </Button>
                    ))}
                  </div>
                ) : (
                  // 展开状态：显示完整的分类和工具
                  <>
                    <Button
                      variant='ghost'
                      className='w-auto min-w-full justify-between px-2 py-1.5 h-auto text-sm font-semibold text-muted-foreground hover:bg-muted/50'
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <div className='flex items-center gap-2'>
                        <category.icon className='h-4 w-4 text-muted-foreground' />
                        <span className='font-normal'>{category.name}</span>
                      </div>
                      {expandedCategories.includes(category.id) ? (
                        <ChevronDown className='h-3.5 w-3.5' />
                      ) : (
                        <ChevronRight className='h-3.5 w-3.5' />
                      )}
                    </Button>

                    {expandedCategories.includes(category.id) && (
                      <div className='ml-6 space-y-0.5'>
                        {category.tools.map(tool => (
                          <Button
                            key={tool.id}
                            variant='ghost'
                            className={cn(
                              'w-auto min-w-full justify-start px-2 py-1.5 h-auto text-left text-sm hover:bg-muted/70',
                              selectedTool === tool.id
                                ? 'bg-accent text-accent-foreground font-medium'
                                : 'text-muted-foreground hover:text-foreground font-normal'
                            )}
                            onClick={() => handleToolSelect(tool.id)}
                          >
                            <div className='flex items-center gap-2'>
                              <tool.icon
                                className={cn(
                                  'h-3.5 w-3.5 flex-shrink-0',
                                  selectedTool === tool.id
                                    ? 'text-accent-foreground'
                                    : 'text-muted-foreground'
                                )}
                              />
                              <span className='text-sm whitespace-nowrap'>
                                {tool.name}
                              </span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 收起/展开按钮 - 右下角 */}
      {!isMobile && (
        <div className='absolute bottom-2 right-2'>
          <Button
            variant='ghost'
            size='sm'
            className={cn(
              'h-8 w-8 p-0 hover:bg-muted/50 rounded-md shadow-sm border border-border/50 bg-background/80 backdrop-blur-sm',
              collapsed ? 'w-8' : 'w-8'
            )}
            onClick={toggleCollapsed}
            title={
              collapsed
                ? ts('sidebar.expand', '展开侧边栏')
                : ts('sidebar.collapse', '收起侧边栏')
            }
          >
            {collapsed ? (
              <ChevronRight className='h-4 w-4' />
            ) : (
              <ChevronLeft className='h-4 w-4' />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
