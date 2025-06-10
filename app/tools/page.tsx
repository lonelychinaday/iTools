'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Moon, Sun, Menu, X, Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToolSidebar } from '@/components/tool-sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { toolCategories } from '@/lib/tools';

function Logo() {
  return (
    <Image
      src='/icon.svg'
      alt='iTools Logo'
      width={20}
      height={20}
      className='w-5 h-5'
    />
  );
}

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (toolId: string) => {
    router.push(`/tools/${toolId}`);
  };

  // 自动重定向到第一个工具
  useEffect(() => {
    const firstTool = toolCategories[0]?.tools[0];
    if (firstTool) {
      router.replace(`/tools/${firstTool.id}`);
    }
  }, [router]);

  // 返回首页
  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
      <div className='h-screen overflow-hidden bg-background flex flex-col'>
        {/* Header */}
        <header className='border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 flex-shrink-0'>
          <div className='flex h-12 items-center justify-between px-4'>
            {/* Left section with logo and title */}
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

              {/* Logo and title */}
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
            </div>

            {/* Right section with search and theme toggle */}
            <div className='flex items-center gap-3 flex-shrink-0'>
              {/* Home button */}
              <Button
                variant='ghost'
                size='sm'
                className='hidden sm:flex items-center gap-1 rounded-lg'
                onClick={handleGoHome}
              >
                <HomeIcon className='h-4 w-4' />
                <span className='text-sm'>首页</span>
              </Button>

              {/* Search */}
              <div className='relative hidden sm:block'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10' />
                <Input
                  placeholder='搜索工具'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='w-48 pl-9 pr-8 h-7 bg-muted/30 border-0 rounded-md focus:bg-background focus:ring-1 focus:ring-ring transition-colors text-sm'
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10'
                  >
                    <X className='h-3 w-3' />
                  </button>
                )}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className='flex flex-1 overflow-hidden'>
          {/* Sidebar */}
          <div
            className={`
              fixed top-12 bottom-0 left-0 z-40 w-52 transform transition-transform duration-200 ease-in-out
              md:relative md:top-0 md:translate-x-0 md:z-0 md:flex-shrink-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <ToolSidebar
              selectedTool={undefined}
              onToolSelect={handleToolSelect}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className='fixed inset-0 z-30 bg-black/50 md:hidden'
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className='flex-1 overflow-auto p-6'>
            <div className='max-w-4xl mx-auto'>
              <div className='space-y-2 mb-6'>
                <h1 className='text-2xl font-bold tracking-tight'>工具列表</h1>
                <p className='text-muted-foreground'>选择一个工具开始使用</p>
              </div>
              <div className='text-center text-muted-foreground'>
                请从左侧边栏选择一个工具，或使用搜索功能快速找到您需要的工具。
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='sm'
      className='rounded-lg'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>切换主题</span>
    </Button>
  );
}
