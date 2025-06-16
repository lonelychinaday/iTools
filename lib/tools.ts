import { FileText } from 'lucide-react';

export const toolCategories = [
  {
    id: 'text-tools',
    // 注意：这里的硬编码文本仅用作fallback，实际显示的文本来自翻译文件
    name: '文本工具', // fallback for tools.categories.text-tools
    icon: FileText,
    tools: [
      {
        id: 'base64-tool',
        // 注意：这里的硬编码文本仅用作fallback，实际显示的文本来自翻译文件
        name: 'Base64 编码', // fallback for tools.names.base64-tool
        description: 'Base64 编码和解码工具', // fallback for tools.descriptions.base64-tool
        icon: FileText,
      },
    ],
  },
];
