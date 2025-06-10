'use client';

import { useState } from 'react';
import { Moon, Sun, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToolHome } from '@/components/tool-home';
import { Logo as LogoComponent } from '@/components/ui/logo';
import { ThemeProvider } from '@/components/theme-provider';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

function Logo() {
  return <LogoComponent size='sm' />;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (toolId: string) => {
    router.push(`/tools/${toolId}`);
  };

  // 进入工具列表页面
  const handleShowToolList = () => {
    router.push('/tools');
  };

  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
      <div className='min-h-screen bg-background flex flex-col'>
        {/* Header */}
        <header className='bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 flex-shrink-0'>
          <div className='flex h-12 items-center justify-between px-4'>
            {/* Left section with logo and title */}
            <div className='flex items-center min-w-0 flex-1'>
              {/* Logo and title */}
              <div className='flex items-center gap-2 flex-shrink-0'>
                <div className='p-1'>
                  <Logo />
                </div>
                <span className='font-lilita-one text-foreground text-lg tracking-wider font-bold'>
                  iTools
                </span>
              </div>
            </div>

            {/* Right section with tool list button and theme toggle */}
            <div className='flex items-center gap-3 flex-shrink-0'>
              {/* Tool List button */}
              <Button
                variant='ghost'
                size='sm'
                className='hidden sm:flex items-center gap-1 rounded-lg'
                onClick={handleShowToolList}
              >
                <Grid3X3 className='h-4 w-4' />
                <span className='text-sm'>工具列表</span>
              </Button>

              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='w-full'>
          <ToolHome
            onToolSelect={handleToolSelect}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </main>
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
