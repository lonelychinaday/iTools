'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToolHome } from '@/components/tool-home';

interface ClientHomePageProps {
  onCommandPaletteTrigger?: () => void;
}

export function ClientHomePage({
  onCommandPaletteTrigger,
}: ClientHomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (toolId: string) => {
    router.push(`/tools/${toolId}`);
  };

  // 如果没有传递命令面板触发函数，提供一个空函数作为fallback
  const handleCommandPaletteTrigger =
    onCommandPaletteTrigger ||
    (() => {
      console.warn('No command palette trigger provided to ClientHomePage');
    });

  return (
    <div className='w-full'>
      <ToolHome
        onToolSelect={handleToolSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCommandPaletteTrigger={handleCommandPaletteTrigger}
      />
    </div>
  );
}
