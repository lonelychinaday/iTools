import { FileText, Code, Link, Key, Palette, Clock, QrCode, Eye, Type, Wrench, Shuffle } from "lucide-react"

export const toolCategories = [
  {
    id: "text-tools",
    name: "文本工具",
    icon: Type,
    tools: [
      {
        id: "json-formatter",
        name: "JSON 格式化",
        description: "格式化和验证 JSON 数据",
        icon: Code,
      },
      {
        id: "base64-tool",
        name: "Base64 编码",
        description: "Base64 编码和解码工具",
        icon: FileText,
      },
      {
        id: "url-tool",
        name: "URL 编码",
        description: "URL 编码和解码工具",
        icon: Link,
      },
      {
        id: "markdown-preview",
        name: "Markdown 预览",
        description: "Markdown 实时预览工具",
        icon: Eye,
      },
    ],
  },
  {
    id: "generator-tools",
    name: "生成工具",
    icon: Wrench,
    tools: [
      {
        id: "password-generator",
        name: "密码生成器",
        description: "生成安全的随机密码",
        icon: Key,
      },
      {
        id: "qr-generator",
        name: "二维码生成",
        description: "生成二维码图片",
        icon: QrCode,
      },
    ],
  },
  {
    id: "converter-tools",
    name: "转换工具",
    icon: Shuffle,
    tools: [
      {
        id: "timestamp-converter",
        name: "时间戳转换",
        description: "时间戳和日期互相转换",
        icon: Clock,
      },
      {
        id: "color-picker",
        name: "颜色选择器",
        description: "颜色格式转换工具",
        icon: Palette,
      },
    ],
  },
]
