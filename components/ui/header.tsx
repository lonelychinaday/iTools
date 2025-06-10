'use client';

import { Moon, Sun, Menu, X, Home as HomeIcon, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBox } from '@/components/ui/search-box';
import { Logo as LogoComponent } from '@/components/ui/logo';
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
      variant='outline'
      size='sm'
      className='h-8 w-8 p-0'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>切换主题</span>
    </Button>
  );
}

export interface HeaderProps {
  // Header类型：home为首页，tools为工具页面
  variant?: 'home' | 'tools';

  // 工具页面相关props
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedTool?: string;
  onToolSelect?: (toolId: string) => void;

  // 首页相关props
  onShowToolList?: () => void;

  // 命令面板相关props
  onCommandPaletteTrigger?: () => void;

  // 自定义className
  className?: string;
}

export function Header({
  variant = 'home',
  sidebarOpen = false,
  onSidebarToggle,
  searchQuery = '',
  onSearchChange,
  selectedTool,
  onToolSelect,
  onShowToolList,
  onCommandPaletteTrigger,
  className = '',
}: HeaderProps) {
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

  // 返回首页
  const handleGoHome = () => {
    router.push('/');
  };

  // 进入工具列表
  const handleShowToolList = () => {
    onShowToolList?.();
    router.push('/tools');
  };

  // 渲染首页Header
  if (variant === 'home') {
    return (
      <header
        className={`bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 flex-shrink-0 ${className}`}
      >
        <div className='flex h-12 items-center justify-between px-4'>
          {/* Left section with logo and title */}
          <div className='flex items-center min-w-0 flex-1'>
            {/* Logo and title - always visible */}
            <div className='flex items-center gap-0.5 md:gap-2 flex-shrink-0'>
              <div className='p-1 cursor-pointer' onClick={handleGoHome}>
                <Logo />
              </div>
              <Button
                variant='ghost'
                className='p-0 h-auto font-lilita-one text-foreground text-lg tracking-wider font-bold hover:bg-transparent'
                onClick={handleGoHome}
              >
                iTools
              </Button>
            </div>
          </div>

          {/* Right section with tool list button and theme toggle */}
          <div className='flex items-center gap-1 flex-shrink-0'>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-1 md:gap-1.5 h-8 px-1.5 md:px-2.5'
              onClick={handleShowToolList}
            >
              <Grid3X3 className='h-4 w-4 flex-shrink-0 -translate-y-[0.5px]' />
              <span className='leading-4 inline'>全部工具</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }

  // 渲染工具页面Header
  return (
    <header
      className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 flex-shrink-0 md:sticky md:top-0 md:z-50 ${className}`}
    >
      <div className='flex h-12 items-center justify-between px-4'>
        {/* Left section with logo, title and breadcrumb */}
        <div className='flex items-center min-w-0 flex-1'>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden flex-shrink-0 w-8 h-8'
            onClick={onSidebarToggle}
          >
            {sidebarOpen ? (
              <X className='h-4 w-4' />
            ) : (
              <Menu className='h-4 w-4' />
            )}
          </Button>

          {/* Logo and title - always visible */}
          <div className='flex items-center gap-0.5 md:gap-2 flex-shrink-0'>
            <div className='p-1 cursor-pointer' onClick={handleGoHome}>
              <Logo />
            </div>
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
                selectedTool={selectedTool || toolId}
                onToolSelect={onToolSelect || (() => {})}
              />
            </div>
          )}
        </div>

        {/* Right section with search and theme toggle */}
        <div className='flex items-center gap-1 flex-shrink-0'>
          {/* Search */}
          <div className='hidden sm:block'>
            <SearchBox
              value=''
              onChange={() => {}}
              placeholder='搜索工具...'
              size='sm'
              variant='header'
              className='w-48'
              showShortcut={true}
              triggerCommandPalette={true}
              onCommandPaletteTrigger={onCommandPaletteTrigger}
            />
          </div>

          {/* Tool List button - Mobile only */}
          <Button
            variant='outline'
            size='sm'
            className='sm:hidden flex items-center gap-1 h-8 px-1.5'
            onClick={handleShowToolList}
          >
            <Grid3X3 className='h-4 w-4 flex-shrink-0 -translate-y-[0.5px]' />
            <span className='leading-4'>全部工具</span>
          </Button>

          {/* Home button */}
          <Button
            variant='outline'
            size='sm'
            className='hidden sm:flex items-center gap-1.5 h-8 px-2.5'
            onClick={handleGoHome}
          >
            <HomeIcon className='h-4 w-4 flex-shrink-0' />
            <span className='leading-4'>首页</span>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
