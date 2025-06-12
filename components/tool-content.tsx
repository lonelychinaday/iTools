'use client';

import { Base64Tool } from '@/components/tools/base64-tool';

interface ToolContentProps {
  selectedTool: string;
}

export function ToolContent({ selectedTool }: ToolContentProps) {
  const renderTool = () => {
    switch (selectedTool) {
      case 'base64-tool':
        return <Base64Tool />;
      default:
        return <Base64Tool />;
    }
  };

  return <div className='overflow-y-auto md:h-full'>{renderTool()}</div>;
}
