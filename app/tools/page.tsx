'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toolCategories } from '@/lib/tools';

export default function ToolsPage() {
  const router = useRouter();

  // 自动重定向到第一个工具
  useEffect(() => {
    const firstTool = toolCategories[0]?.tools[0];
    if (firstTool) {
      router.replace(`/tools/${firstTool.id}`);
    }
  }, [router]);

  return (
    <div className='flex-1 overflow-auto p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='space-y-2 mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>工具列表</h1>
          <p className='text-muted-foreground'>选择一个工具开始使用</p>
        </div>
        <div className='text-center text-muted-foreground'>
          请从左侧边栏选择一个工具，或使用搜索功能快速找到您需要的工具。
        </div>
      </div>
    </div>
  );
}
