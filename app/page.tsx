'use client';

import { useState } from 'react';
import { ToolHome } from '@/components/tool-home';
import { Header } from '@/components/ui/header';
import { useRouter } from 'next/navigation';

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
    <div className='min-h-screen bg-background flex flex-col'>
      {/* Header */}
      <Header variant='home' onShowToolList={handleShowToolList} />

      {/* Main Content */}
      <main className='w-full'>
        <ToolHome
          onToolSelect={handleToolSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </main>
    </div>
  );
}
