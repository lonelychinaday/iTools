'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Home as HomeIcon,
  Grid3X3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToolSidebar } from '@/components/tool-sidebar';
import { ToolContent } from '@/components/tool-content';
import { ToolHome } from '@/components/tool-home';
import { ThemeProvider } from '@/components/theme-provider';
import { Breadcrumb } from '@/components/breadcrumb';
import { useTheme } from 'next-themes';

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

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 处理工具选择
  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    setSidebarOpen(false);
    setSearchQuery(''); // 选中工具后清除搜索内容
  };

  // 返回首页
  const handleGoHome = () => {
    setSelectedTool(null);
    setSidebarOpen(false);
  };

  // 进入工具列表页面（显示侧边栏和默认工具）
  const handleShowToolList = () => {
    setSelectedTool('json-formatter'); // 选择默认工具
    setSidebarOpen(false);
  };

  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
      <div
        className={`${selectedTool ? 'h-screen overflow-hidden bg-background' : 'min-h-screen bg-background'} flex flex-col`}
      >
        {/* Header */}
        <header
          className={`${selectedTool ? 'border-b sticky top-0' : ''} bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 flex-shrink-0`}
        >
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
              {selectedTool && (
                <div className='hidden md:flex items-center'>
                  <span
                    aria-hidden='true'
                    className='text-muted-foreground/40 w-4 min-w-4 select-none text-center text-lg mx-1'
                  >
                    /
                  </span>
                  <Breadcrumb
                    selectedTool={selectedTool}
                    onToolSelect={handleToolSelect}
                  />
                </div>
              )}
            </div>

            {/* Right section with search and theme toggle */}
            <div className='flex items-center gap-3 flex-shrink-0'>
              {/* Home/Tool List button */}
              <Button
                variant='ghost'
                size='sm'
                className='hidden sm:flex items-center gap-1 rounded-lg'
                onClick={selectedTool ? handleGoHome : handleShowToolList}
              >
                {selectedTool ? (
                  <HomeIcon className='h-4 w-4' />
                ) : (
                  <Grid3X3 className='h-4 w-4' />
                )}
                <span className='text-sm'>
                  {selectedTool ? '首页' : '工具列表'}
                </span>
              </Button>

              {/* Search - only show when a tool is selected */}
              {selectedTool && (
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
              )}
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className={`flex ${selectedTool ? 'flex-1 overflow-hidden' : ''}`}>
          {/* Sidebar - only show when a tool is selected */}
          {selectedTool && (
            <>
              <div
                className={`
                ${selectedTool ? 'fixed top-12 bottom-0 left-0 z-40 w-52' : 'fixed top-0 bottom-0 left-0 z-40 w-52'} transform transition-transform duration-200 ease-in-out
                md:relative md:top-0 md:translate-x-0 md:z-0 md:flex-shrink-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              `}
              >
                <ToolSidebar
                  selectedTool={selectedTool}
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
            </>
          )}

          {/* Main Content */}
          <main
            className={`${selectedTool ? 'flex-1 overflow-hidden' : 'w-full'}`}
          >
            {selectedTool ? (
              <ToolContent selectedTool={selectedTool} />
            ) : (
              <ToolHome
                onToolSelect={handleToolSelect}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}
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
