'use client';

import { JsonFormatter } from '@/components/tools/json-formatter';
import { Base64Tool } from '@/components/tools/base64-tool';
import { UrlTool } from '@/components/tools/url-tool';
import { PasswordGenerator } from '@/components/tools/password-generator';
import { ColorPicker } from '@/components/tools/color-picker';
import { TimestampConverter } from '@/components/tools/timestamp-converter';
import { QrGenerator } from '@/components/tools/qr-generator';
import { MarkdownPreview } from '@/components/tools/markdown-preview';

interface ToolContentProps {
  selectedTool: string;
}

export function ToolContent({ selectedTool }: ToolContentProps) {
  const renderTool = () => {
    switch (selectedTool) {
      case 'json-formatter':
        return <JsonFormatter />;
      case 'base64-tool':
        return <Base64Tool />;
      case 'url-tool':
        return <UrlTool />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'color-picker':
        return <ColorPicker />;
      case 'timestamp-converter':
        return <TimestampConverter />;
      case 'qr-generator':
        return <QrGenerator />;
      case 'markdown-preview':
        return <MarkdownPreview />;
      default:
        return <JsonFormatter />;
    }
  };

  return <div className='overflow-y-auto md:h-full'>{renderTool()}</div>;
}
