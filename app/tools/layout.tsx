'use client';

import { useState } from 'react';
import { ToolSidebar } from '@/components/tool-sidebar';
import { Header } from '@/components/ui/header';
import { CommandPalette } from '@/components/ui/command-palette';
import { useCommandPalette } from '@/hooks/use-command-palette';
import { useRouter, usePathname } from 'next/navigation';
import { toolCategories } from '@/lib/tools';

// 注意：由于这是客户端组件，metadata需要在父级服务端组件中设置
// 或者考虑重构为服务端组件

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // 初始状态总是false（展开），避免SSR不一致
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { open, setOpen, openCommandPalette } = useCommandPalette();

  // 从pathname提取当前工具ID
  const pathSegments = pathname.split('/');
  const toolId = pathSegments.length > 2 ? pathSegments[2] : '';

  // 验证工具ID是否有效
  const isValidTool = Boolean(
    toolId &&
      toolCategories.some(category =>
        category.tools.some(tool => tool.id === toolId)
      )
  );

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (newToolId: string) => {
    if (newToolId !== toolId) {
      router.push(`/tools/${newToolId}`);
    }
    // 不自动关闭侧边栏，让用户手动控制
  };

  // 切换桌面端侧边栏收起/展开
  const handleToggleSidebarCollapse = () => {
    const newCollapsed = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsed);
  };

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
          className={`
              fixed top-0 md:top-0 bottom-0 left-0 z-40 transform transition-transform duration-200 ease-in-out bg-background
              md:relative md:translate-x-0 md:z-0 md:flex-shrink-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          style={{
            width: sidebarOpen ? '208px' : sidebarCollapsed ? '48px' : '208px',
          }}
        >
          <div className='h-full flex flex-col'>
            {/* 移动端顶部间距，为header留出空间 */}
            <div className='h-12 flex-shrink-0 md:hidden'></div>
            <div className='flex-1'>
              <ToolSidebar
                selectedTool={isValidTool ? toolId : undefined}
                onToolSelect={handleToolSelect}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                _onClose={() => setSidebarOpen(false)}
                collapsed={sidebarCollapsed}
                onToggleCollapse={handleToggleSidebarCollapse}
              />
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className='fixed inset-0 z-30 bg-black/50 md:hidden'
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className='flex-1 relative'>{children}</main>
      </div>

      {/* 统一的命令面板 */}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </div>
  );
}
