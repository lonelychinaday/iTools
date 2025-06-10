'use client';

import { useState, useEffect } from 'react';
import { Search, Moon, Sun, Menu, X, Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo as LogoComponent } from '@/components/ui/logo';
import { ToolSidebar } from '@/components/tool-sidebar';
import { Breadcrumb } from '@/components/breadcrumb';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import { toolCategories } from '@/lib/tools';

function Logo() {
  return <LogoComponent size='sm' />;
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='sm'
      className='h-8 w-8 p-0 rounded-md hover:bg-muted/40 transition-colors'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>切换主题</span>
    </Button>
  );
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // 初始状态总是false（展开），避免SSR不一致
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  // 客户端hydration后设置标志
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (newToolId: string) => {
    if (newToolId !== toolId) {
      router.push(`/tools/${newToolId}`);
    }
    // 不自动关闭侧边栏，让用户手动控制
  };

  // 返回首页
  const handleGoHome = () => {
    router.push('/');
  };

  // 切换桌面端侧边栏收起/展开
  const handleToggleSidebarCollapse = () => {
    const newCollapsed = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsed);
  };

  return (
    <div className='min-h-screen bg-background flex flex-col md:h-screen md:overflow-hidden'>
      {/* Header */}
      <header className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 flex-shrink-0 md:sticky md:top-0 md:z-50'>
        <div className='flex h-12 items-center justify-between px-4'>
          {/* Left section with logo, title and breadcrumb */}
          <div className='flex items-center min-w-0 flex-1'>
            <Button
              variant='ghost'
              size='sm'
              className='md:hidden flex-shrink-0 mr-4'
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className='h-4 w-4' />
              ) : (
                <Menu className='h-4 w-4' />
              )}
            </Button>

            {/* Logo and title - always visible */}
            <div className='flex items-center gap-2 flex-shrink-0'>
              <Button
                variant='ghost'
                size='sm'
                className='p-1 h-auto'
                onClick={handleGoHome}
              >
                <Logo />
              </Button>
              <Button
                variant='ghost'
                className='p-0 h-auto font-lilita-one text-foreground text-lg tracking-wider font-bold hover:bg-transparent'
                onClick={handleGoHome}
              >
                iTools
              </Button>
            </div>

            {/* Desktop: Show separator and breadcrumb */}
            {isValidTool && (
              <div className='hidden md:flex items-center'>
                <span
                  aria-hidden='true'
                  className='text-muted-foreground/40 w-4 min-w-4 select-none text-center text-lg mx-1'
                >
                  /
                </span>
                <Breadcrumb
                  selectedTool={toolId}
                  onToolSelect={handleToolSelect}
                />
              </div>
            )}
          </div>

          {/* Right section with search and theme toggle */}
          <div className='flex items-center gap-1 flex-shrink-0'>
            {/* Search */}
            <div className='relative hidden sm:block mr-2'>
              <Search className='absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10' />
              <Input
                placeholder='搜索工具...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='w-48 pl-8 pr-8 h-8 bg-muted/30 border-0 rounded-md focus:bg-background focus:ring-1 focus:ring-ring/30 transition-all text-sm placeholder:text-muted-foreground/70'
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors z-10'
                >
                  <X className='h-3 w-3' />
                </button>
              )}
            </div>

            {/* Home button */}
            <Button
              variant='ghost'
              size='sm'
              className='hidden sm:flex items-center gap-1.5 h-8 px-2.5 rounded-md hover:bg-muted/40 transition-colors text-sm font-normal'
              onClick={handleGoHome}
            >
              <HomeIcon className='h-4 w-4 flex-shrink-0' />
              <span className='leading-4'>首页</span>
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </header>

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
                onClose={() => setSidebarOpen(false)}
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
    </div>
  );
}
