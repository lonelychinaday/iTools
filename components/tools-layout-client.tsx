'use client';

import { useState, useEffect } from 'react';
import { ToolSidebar } from '@/components/tool-sidebar';
import { Header } from '@/components/ui/header';
import { CommandPalette } from '@/components/ui/command-palette';
import { useCommandPalette } from '@/hooks/use-command-palette';
import { useRouter, usePathname } from 'next/navigation';
import { isValidToolId, getToolCategoryId } from '@/lib/tools-i18n';
import { useSidebarContext } from '@/components/sidebar-provider';
import { cn } from '@/lib/utils';

interface ToolsLayoutClientProps {
  children: React.ReactNode;
}

export function ToolsLayoutClient({ children }: ToolsLayoutClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { open, setOpen, openCommandPalette } = useCommandPalette();
  const { collapsed, isMobile, setExpandedCategories, expandedCategories } =
    useSidebarContext();

  // 从pathname提取当前工具ID
  const pathSegments = pathname.split('/');
  const toolId = pathSegments.length > 2 ? pathSegments[2] : undefined;

  // 验证工具ID是否有效
  const isValidTool = Boolean(toolId && isValidToolId(toolId));

  // 当工具变化时，确保对应分类展开
  useEffect(() => {
    if (isValidTool && toolId && !isMobile) {
      const categoryId = getToolCategoryId(toolId);

      if (categoryId && !expandedCategories.includes(categoryId)) {
        const newExpandedCategories = [...expandedCategories, categoryId];
        setExpandedCategories(newExpandedCategories);
      }
    }
  }, [
    toolId,
    isValidTool,
    isMobile,
    expandedCategories,
    setExpandedCategories,
  ]);

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (newToolId: string) => {
    if (newToolId !== toolId) {
      router.push(`/tools/${newToolId}`);
    }
    // 移动端选择工具后关闭侧边栏
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // 计算侧边栏宽度
  const sidebarWidth = (() => {
    if (isMobile) {
      return sidebarOpen ? '280px' : '0px';
    }
    return collapsed ? '48px' : '280px';
  })();

  return (
    <div className='min-h-screen bg-background flex flex-col md:h-screen md:overflow-hidden'>
      {/* Header */}
      <Header
        variant='tools'
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        _searchQuery={searchQuery}
        _onSearchChange={setSearchQuery}
        selectedTool={isValidTool ? toolId : undefined}
        onToolSelect={handleToolSelect}
        onCommandPaletteTrigger={openCommandPalette}
      />

      <div className='flex flex-1'>
        {/* Sidebar */}
        <div
          className={cn(
            'transition-all duration-200 ease-in-out bg-background border-r',
            // 移动端：固定定位，通过transform控制显示隐藏
            isMobile && 'fixed top-0 bottom-0 left-0 z-40 transform',
            isMobile && (sidebarOpen ? 'translate-x-0' : '-translate-x-full'),
            // 桌面端：相对定位，始终显示
            !isMobile && 'relative flex-shrink-0'
          )}
          style={{
            width: sidebarWidth,
          }}
        >
          <div className='h-full flex flex-col'>
            {/* 移动端顶部间距，为header留出空间 */}
            {isMobile && <div className='h-12 flex-shrink-0'></div>}

            <div className='flex-1'>
              <ToolSidebar
                selectedTool={isValidTool ? toolId : undefined}
                onToolSelect={handleToolSelect}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div
            className='fixed inset-0 z-30 bg-black/50'
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className='flex-1 relative overflow-auto'>{children}</main>
      </div>

      {/* 统一的命令面板 */}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </div>
  );
}
