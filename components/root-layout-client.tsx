'use client';

import { useState, cloneElement, ReactElement, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { CommandPalette } from '@/components/ui/command-palette';
import { useCommandPalette } from '@/hooks/use-command-palette';
import { commandPaletteController } from '@/lib/command-palette-controller';
import { isValidToolId } from '@/lib/tools-i18n';
import { cn } from '@/lib/utils';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { open, setOpen, openCommandPalette } = useCommandPalette();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 注册全局命令面板控制器的回调函数
  useEffect(() => {
    commandPaletteController.registerOpenCallback(openCommandPalette);
    return () => {
      commandPaletteController.unregister();
    };
  }, [openCommandPalette]);

  // 检测是否在首页
  const isHomePage = pathname === '/';
  // 检测是否在工具页面
  const isToolsPage = pathname.startsWith('/tools');

  // 从pathname提取当前工具ID
  const pathSegments = pathname.split('/');
  const toolId = pathSegments.length > 2 ? pathSegments[2] : '';
  const isValidTool = Boolean(toolId && isValidToolId(toolId));

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (toolId: string) => {
    router.push(`/tools/${toolId}`);
  };

  // 进入工具列表页面
  const handleShowToolList = () => {
    router.push('/tools');
  };

  // 处理sidebar切换
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 只在首页或工具页面显示Header
  const shouldShowHeader = isHomePage || isToolsPage;

  // 如果是工具页面，需要为children传递sidebar相关props
  const enhancedChildren =
    isToolsPage &&
    children &&
    typeof children === 'object' &&
    'type' in children
      ? cloneElement(children as ReactElement<any>, {
          sidebarOpen,
          onSidebarToggle: handleSidebarToggle,
        })
      : children;

  return (
    <div
      className={cn(
        'bg-background flex flex-col',
        isToolsPage ? 'h-screen overflow-hidden' : 'min-h-screen'
      )}
    >
      {/* 统一的Header - 只在首页和工具页面显示 */}
      {shouldShowHeader && (
        <Header
          variant={isHomePage ? 'home' : 'tools'}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={handleSidebarToggle}
          selectedTool={isValidTool ? toolId : undefined}
          onToolSelect={handleToolSelect}
          onShowToolList={handleShowToolList}
          onCommandPaletteTrigger={openCommandPalette}
        />
      )}

      {/* 页面内容 */}
      <main
        className={cn(
          shouldShowHeader ? 'flex-1' : 'min-h-screen',
          isToolsPage && 'overflow-hidden'
        )}
      >
        {enhancedChildren}
      </main>

      {/* 统一的命令面板 */}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </div>
  );
}
