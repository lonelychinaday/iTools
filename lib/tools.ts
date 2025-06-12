import { FileText } from 'lucide-react';

export const toolCategories = [
  {
    id: 'text-tools',
    name: '文本工具',
    icon: FileText,
    tools: [
      {
        id: 'base64-tool',
        name: 'Base64 编码',
        description: 'Base64 编码和解码工具',
        icon: FileText,
      },
    ],
  },
];
