'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toolCategories } from '@/lib/tools';

interface ToolSidebarProps {
  selectedTool?: string;
  onToolSelect: (toolId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function ToolSidebar({
  selectedTool,
  onToolSelect,
  searchQuery,
  onClose,
  collapsed = false,
  onToggleCollapse,
}: ToolSidebarProps) {
  // 初始状态：总是从选中工具开始，避免SSR不一致
  const getSSRSafeInitialCategories = () => {
    if (selectedTool) {
      const categoryWithTool = toolCategories.find(category =>
        category.tools.some(tool => tool.id === selectedTool)
      );
      return categoryWithTool ? [categoryWithTool.id] : ['text-tools'];
    }
    return ['text-tools'];
  };

  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    getSSRSafeInitialCategories()
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const previousSelectedTool = useRef<string | undefined>(selectedTool);

  // 客户端hydration后，从localStorage恢复用户偏好
  useEffect(() => {
    setIsHydrated(true);

    try {
      const saved = localStorage.getItem('itools-expanded-categories');
      if (saved) {
        const parsedSaved = JSON.parse(saved);
        // 确保选中工具的分类包含在内
        if (selectedTool) {
          const categoryWithTool = toolCategories.find(category =>
            category.tools.some(tool => tool.id === selectedTool)
          );
          if (categoryWithTool && !parsedSaved.includes(categoryWithTool.id)) {
            const mergedCategories = [...parsedSaved, categoryWithTool.id];
            setExpandedCategories(mergedCategories);
            localStorage.setItem(
              'itools-expanded-categories',
              JSON.stringify(mergedCategories)
            );
            return;
          }
        }
        setExpandedCategories(parsedSaved);
      }
    } catch (error) {
      console.warn(
        'Failed to load expanded categories from localStorage:',
        error
      );
    }
  }, [selectedTool]);

  // 保存展开状态到localStorage（只在客户端）
  const saveExpandedCategories = (categories: string[]) => {
    if (isHydrated) {
      try {
        localStorage.setItem(
          'itools-expanded-categories',
          JSON.stringify(categories)
        );
      } catch (error) {
        console.warn(
          'Failed to save expanded categories to localStorage:',
          error
        );
      }
    }
  };

  // 只在选中工具真正变化时才确保对应分类展开
  useEffect(() => {
    if (selectedTool && selectedTool !== previousSelectedTool.current) {
      const categoryWithTool = toolCategories.find(category =>
        category.tools.some(tool => tool.id === selectedTool)
      );

      if (categoryWithTool) {
        setExpandedCategories(prev => {
          if (!prev.includes(categoryWithTool.id)) {
            const newCategories = [...prev, categoryWithTool.id];
            saveExpandedCategories(newCategories);
            return newCategories;
          }
          return prev;
        });
      }

      previousSelectedTool.current = selectedTool;
    }
  }, [selectedTool, isHydrated]);

  const toggleCategory = (categoryId: string) => {
    if (collapsed) return;

    const newExpandedCategories = expandedCategories.includes(categoryId)
      ? expandedCategories.filter(id => id !== categoryId)
      : [...expandedCategories, categoryId];

    setExpandedCategories(newExpandedCategories);
    saveExpandedCategories(newExpandedCategories);
  };

  const handleToolSelect = (toolId: string) => {
    if (collapsed) {
      const categoryWithTool = toolCategories.find(category =>
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
        saveExpandedCategories(newExpandedCategories);
      }
    }

    onToolSelect(toolId);
    // 不自动关闭侧边栏，让用户手动控制
  };

  const filteredCategories = toolCategories
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
        'h-full border-r bg-background flex flex-col transition-all duration-200 ease-in-out relative shadow-md',
        collapsed ? 'w-12 overflow-hidden' : 'w-52'
      )}
    >
      {/* Scrollable content */}
      <div
        className={cn(
          'flex-1',
          collapsed ? 'overflow-hidden' : 'overflow-y-auto'
        )}
      >
        <div className={cn('py-3', collapsed ? 'px-1' : 'px-4')}>
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
                      className='w-full justify-between px-0 py-1.5 h-auto text-sm font-semibold text-muted-foreground hover:bg-muted/50'
                      onClick={() => toggleCategory(category.id)}
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
                              'w-full justify-start px-2 py-1.5 h-auto text-left text-sm hover:bg-muted/70',
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
                              <span className='text-sm truncate'>
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
      {onToggleCollapse && (
        <div className='absolute bottom-2 right-2'>
          <Button
            variant='ghost'
            size='sm'
            className={cn(
              'h-8 w-8 p-0 hover:bg-muted/50 rounded-md shadow-sm border border-border/50 bg-background/80 backdrop-blur-sm',
              collapsed ? 'w-8' : 'w-8'
            )}
            onClick={onToggleCollapse}
            title={collapsed ? '展开侧边栏' : '收起侧边栏'}
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
