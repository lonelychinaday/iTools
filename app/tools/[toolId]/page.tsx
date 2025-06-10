'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ToolContent } from '@/components/tool-content';
import { toolCategories } from '@/lib/tools';

export default function ToolPage() {
  const router = useRouter();
  const params = useParams();
  const toolId = params.toolId as string;

  // 验证工具ID是否有效
  const isValidTool = toolCategories.some(category =>
    category.tools.some(tool => tool.id === toolId)
  );

  useEffect(() => {
    // 如果工具ID无效，重定向到工具列表页面
    if (!isValidTool) {
      router.replace('/tools');
    }
  }, [toolId, isValidTool, router]);

  // 如果工具ID无效，不渲染任何内容
  if (!isValidTool) {
    return null;
  }

  return (
    <div className='absolute inset-0 overflow-auto'>
      <ToolContent selectedTool={toolId} />
    </div>
  );
}
