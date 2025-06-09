'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToolSidebar } from '@/components/tool-sidebar';
import { ToolContent } from '@/components/tool-content';
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
  const [selectedTool, setSelectedTool] = useState('json-formatter');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
      <div className='h-screen bg-background overflow-hidden flex flex-col'>
        {/* Header */}
        <header className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 flex-shrink-0'>
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
                <Logo />
                <span className='font-lilita-one text-foreground text-lg tracking-wider font-bold'>
                  iTools
                </span>
              </div>

              {/* Desktop: Show separator and breadcrumb */}
              <div className='hidden md:flex items-center'>
                <span
                  aria-hidden='true'
                  className='text-muted-foreground/40 w-4 min-w-4 select-none text-center text-lg mx-1'
                >
                  /
                </span>
                <Breadcrumb
                  selectedTool={selectedTool}
                  onToolSelect={setSelectedTool}
                />
              </div>
            </div>

            {/* Right section with search and theme toggle */}
            <div className='flex items-center gap-3 flex-shrink-0'>
              <div className='relative hidden sm:block'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder='搜索工具'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='w-48 pl-9 h-7 bg-muted/30 border-0 rounded-md focus:bg-background focus:ring-1 focus:ring-ring transition-colors text-sm'
                />
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
              selectedTool={selectedTool}
              onToolSelect={setSelectedTool}
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
          <main className='flex-1 overflow-hidden'>
            <ToolContent selectedTool={selectedTool} />
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
