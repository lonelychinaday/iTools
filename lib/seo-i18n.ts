import type { Locale } from '@/i18n';

export interface LocalizedSEO {
  title: {
    default: string;
    template: string;
    short: string;
    tools: string;
  };
  description: {
    main: string;
    short: string;
    tools: string;
  };
  keywords: {
    main: string[];
  };
  structured: {
    offerCatalogName: string;
    base64ToolName: string;
    jsonToolName: string;
  };
}

export const seoContent: Record<Locale, LocalizedSEO> = {
  zh: {
    title: {
      default: 'VerseTool - 在线工具箱 | 免费实用工具集合',
      template: '%s | VerseTool',
      short: 'VerseTool - 在线工具箱',
      tools: 'VerseTool 工具列表 - 免费在线工具集合',
    },
    description: {
      main: '现代化的在线工具集合，包含Base64编码解码、JSON格式化、密码生成器、URL编码等实用工具。免费使用，无需注册。',
      short: '现代化的在线工具集合',
      tools:
        '浏览VerseTool完整的在线工具集合，包含开发者工具、文本处理工具、编码解码工具等。免费使用，无需注册。',
    },
    keywords: {
      main: [
        'VerseTool',
        '在线工具',
        '工具箱',
        'Base64编码',
        'JSON格式化',
        '密码生成器',
        'URL编码',
        '开发者工具',
        '免费工具',
      ],
    },
    structured: {
      offerCatalogName: '在线工具集合',
      base64ToolName: 'Base64 编码解码工具',
      jsonToolName: 'JSON 格式化工具',
    },
  },
  en: {
    title: {
      default: 'VerseTool - Online Toolbox | Free Utility Tools Collection',
      template: '%s | VerseTool',
      short: 'VerseTool - Online Toolbox',
      tools: 'VerseTool Tools List - Free Online Tools Collection',
    },
    description: {
      main: 'Modern online tools collection including Base64 encoding, JSON formatting, password generator, URL encoding and more utilities. Free to use, no registration required.',
      short: 'Modern online tools collection',
      tools:
        "Browse VerseTool's complete online tools collection, including developer tools, text processing tools, encoding/decoding tools and more. Free to use, no registration required.",
    },
    keywords: {
      main: [
        'VerseTool',
        'online tools',
        'toolbox',
        'base64 encoding',
        'json formatter',
        'password generator',
        'url encoding',
        'developer tools',
        'free tools',
      ],
    },
    structured: {
      offerCatalogName: 'Online Tools Collection',
      base64ToolName: 'Base64 Encoder/Decoder Tool',
      jsonToolName: 'JSON Formatter Tool',
    },
  },
};

export async function getLocalizedSEO(locale: Locale): Promise<LocalizedSEO> {
  return seoContent[locale];
}

export function getLocalizedToolMeta(
  toolName: string,
  categoryName: string,
  locale: Locale
) {
  const isZh = locale === 'zh';

  return {
    title: isZh
      ? `${toolName} - VerseTool在线工具`
      : `${toolName} - VerseTool Online Tool`,
    description: isZh
      ? `使用VerseTool的${toolName}工具，快速、免费、无需注册。${categoryName}分类下的实用在线工具。`
      : `Use VerseTool's ${toolName} tool, fast, free, no registration required. Practical online tool in ${categoryName} category.`,
    keywords: [
      toolName,
      'VerseTool',
      isZh ? '在线工具' : 'online tools',
      categoryName,
      isZh ? '免费工具' : 'free tools',
      isZh ? '开发者工具' : 'developer tools',
      isZh ? 'web工具' : 'web tools',
    ],
  };
}
