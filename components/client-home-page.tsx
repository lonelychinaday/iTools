'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToolHome } from '@/components/tool-home';
import { useCommandPalette } from '@/hooks/use-command-palette';

export function ClientHomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { openCommandPalette } = useCommandPalette();

  // 处理工具选择 - 跳转到对应路由
  const handleToolSelect = (toolId: string) => {
    router.push(`/tools/${toolId}`);
  };

  return (
    <div className='w-full'>
      <ToolHome
        onToolSelect={handleToolSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCommandPaletteTrigger={openCommandPalette}
      />
    </div>
  );
}
