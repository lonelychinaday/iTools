'use client';

import { useState, useEffect, useRef } from 'react';
import { ToolSidebar } from '@/components/tool-sidebar';
import { useRouter, usePathname } from 'next/navigation';
import { isValidToolId, getToolCategoryId } from '@/lib/tools-i18n';
import { useSidebarContext } from '@/components/sidebar-provider';
import { cn } from '@/lib/utils';

interface ToolsLayoutClientProps {
  children: React.ReactNode;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export function ToolsLayoutClient({
  children,
  sidebarOpen = false,
  onSidebarToggle,
}: ToolsLayoutClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const { collapsed, isMobile, setExpandedCategories, expandedCategories } =
    useSidebarContext();

  // 使用 ref 来跟踪上一次的 toolId
  const prevToolIdRef = useRef<string | undefined>(undefined);

  // 从pathname提取当前工具ID
  const pathSegments = pathname.split('/');
  const toolId = pathSegments.length > 2 ? pathSegments[2] : undefined;

  // 验证工具ID是否有效
  const isValidTool = Boolean(toolId && isValidToolId(toolId));

  // 当工具变化时，确保对应分类展开
  useEffect(() => {
    // 只在 toolId 实际变化时才执行（不包括初始加载）
    if (
      isValidTool &&
      toolId &&
      !isMobile &&
      prevToolIdRef.current !== undefined && // 确保不是初始加载
      toolId !== prevToolIdRef.current
    ) {
      const categoryId = getToolCategoryId(toolId);

      if (categoryId) {
        // 使用函数式更新来获取最新的 expandedCategories
        setExpandedCategories(currentExpanded => {
          if (!currentExpanded.includes(categoryId)) {
            return [...currentExpanded, categoryId];
          }
          return currentExpanded;
        });
      }
    }

    // 更新 ref（无论是否执行展开逻辑）
    if (toolId) {
      prevToolIdRef.current = toolId;
    }
  }, [toolId, isValidTool, isMobile, setExpandedCategories]);

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (newToolId: string) => {
    if (newToolId !== toolId) {
      router.push(`/tools/${newToolId}`);
    }
    // 移动端选择工具后关闭侧边栏
    if (isMobile && onSidebarToggle) {
      onSidebarToggle();
    }
  };

  // 计算侧边栏宽度
  const sidebarWidth = (() => {
    if (isMobile) {
      return sidebarOpen ? '280px' : '0px';
    }
    return collapsed ? '48px' : '240px';
  })();

  return (
    <div className='h-full bg-background flex overflow-hidden'>
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
          onClick={onSidebarToggle}
        />
      )}

      {/* Main Content */}
      <main className='flex-1 relative overflow-auto'>{children}</main>
    </div>
  );
}
