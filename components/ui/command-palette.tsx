'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { toolCategories } from '@/lib/tools';
import { Home, Grid3X3, Github, Sun, Moon, ExternalLink } from 'lucide-react';

interface CommandPaletteProps {
  /** 是否打开命令面板 */
  open: boolean;
  /** 打开状态变化回调 */
  onOpenChange: (open: boolean) => void;
}

/**
 * 命令面板组件
 * 支持快捷键 Cmd+K (Mac) / Ctrl+K (Windows/Linux) 调用
 * 提供工具搜索、快捷操作等功能
 */
export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme } = useTheme();

  // 获取所有工具的平铺列表
  const allTools = React.useMemo(() => {
    return toolCategories.flatMap(category =>
      category.tools.map(tool => ({
        ...tool,
        categoryName: category.name,
        categoryIcon: category.icon,
      }))
    );
  }, []);

  // 处理工具选择
  const handleToolSelect = (toolId: string) => {
    router.push(`/tools/${toolId}`);
    onOpenChange(false);
  };

  // 处理导航
  const handleNavigation = (path: string) => {
    router.push(path);
    onOpenChange(false);
  };

  // 处理主题切换
  const handleThemeToggle = (theme: 'light' | 'dark') => {
    setTheme(theme);
    onOpenChange(false);
  };

  // 处理外部链接
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder='搜索工具或执行操作...' />
      <CommandList>
        <CommandEmpty>未找到相关结果</CommandEmpty>

        {/* 工具分组 */}
        <CommandGroup heading='工具'>
          {allTools.map(tool => (
            <CommandItem
              key={tool.id}
              value={`${tool.name} ${tool.description} ${tool.categoryName}`}
              onSelect={() => handleToolSelect(tool.id)}
              className='flex items-center gap-2 px-2 py-2'
            >
              <div className='flex items-center justify-center w-8 h-8 rounded-md bg-green-500/10'>
                <span className='text-green-600 font-mono font-bold text-xs uppercase'>
                  {tool.categoryName.slice(0, 2)}
                </span>
              </div>
              <div className='flex-1 min-w-0'>
                <div className='font-medium text-sm'>{tool.name}</div>
                <div className='text-xs text-muted-foreground truncate'>
                  {tool.description}
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* 快捷操作分组 */}
        <CommandGroup heading='操作'>
          <CommandItem
            value='home 首页 导航'
            onSelect={() => handleNavigation('/')}
            className='flex items-center gap-2 px-2 py-2'
          >
            <div className='flex items-center justify-center w-8 h-8 rounded-md bg-blue-500/10'>
              <Home className='h-4 w-4 text-blue-600' />
            </div>
            <div className='flex-1'>
              <div className='font-medium text-sm'>返回首页</div>
              <div className='text-xs text-muted-foreground'>
                回到 iTools 主页面
              </div>
            </div>
          </CommandItem>

          <CommandItem
            value='tools 工具列表 所有工具'
            onSelect={() => handleNavigation('/tools')}
            className='flex items-center gap-2 px-2 py-2'
          >
            <div className='flex items-center justify-center w-8 h-8 rounded-md bg-purple-500/10'>
              <Grid3X3 className='h-4 w-4 text-purple-600' />
            </div>
            <div className='flex-1'>
              <div className='font-medium text-sm'>浏览所有工具</div>
              <div className='text-xs text-muted-foreground'>
                查看完整的工具列表和分类
              </div>
            </div>
          </CommandItem>

          <CommandItem
            value='dark mode 深色模式 主题'
            onSelect={() => handleThemeToggle('dark')}
            className='flex items-center gap-2 px-2 py-2'
          >
            <div className='flex items-center justify-center w-8 h-8 rounded-md bg-gray-500/10'>
              <Moon className='h-4 w-4 text-gray-600' />
            </div>
            <div className='flex-1'>
              <div className='font-medium text-sm'>切换到深色模式</div>
              <div className='text-xs text-muted-foreground'>
                启用深色主题界面
              </div>
            </div>
          </CommandItem>

          <CommandItem
            value='light mode 浅色模式 主题'
            onSelect={() => handleThemeToggle('light')}
            className='flex items-center gap-2 px-2 py-2'
          >
            <div className='flex items-center justify-center w-8 h-8 rounded-md bg-yellow-500/10'>
              <Sun className='h-4 w-4 text-yellow-600' />
            </div>
            <div className='flex-1'>
              <div className='font-medium text-sm'>切换到浅色模式</div>
              <div className='text-xs text-muted-foreground'>
                启用浅色主题界面
              </div>
            </div>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* 外部链接分组 */}
        <CommandGroup heading='外部'>
          <CommandItem
            value='github repository 源码 代码仓库'
            onSelect={() => handleExternalLink('https://github.com')}
            className='flex items-center gap-2 px-2 py-2'
          >
            <div className='flex items-center justify-center w-8 h-8 rounded-md bg-gray-500/10'>
              <Github className='h-4 w-4 text-gray-600' />
            </div>
            <div className='flex-1'>
              <div className='font-medium text-sm'>Github 仓库</div>
              <div className='text-xs text-muted-foreground'>
                查看 iTools 的源代码
              </div>
            </div>
            <ExternalLink className='h-3 w-3 text-muted-foreground' />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
