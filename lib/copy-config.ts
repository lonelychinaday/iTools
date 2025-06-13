/**
 * 文案配置文件
 * 统一管理所有重复的文案内容，确保一致性和易维护性
 */

// 品牌信息
export const BRAND = {
  name: 'VerseTool',
  domain: 'https://itools.jmxr.fun',
  twitter: '@versetool',
  github: 'https://github.com/itools-jmxr',
} as const;

// 网站基础信息
export const SITE_INFO = {
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
    platform: '现代化的在线工具集合平台',
  },
  slogan: {
    main: '强大而简洁的在线工具，让工作更高效',
    welcome: '在线工具集合',
  },
} as const;

// SEO 关键词
export const KEYWORDS = {
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
    'online tools',
    'developer tools',
    'web tools',
  ],
  categories: {
    text: ['文本工具', '文本处理', 'text tools'],
    encoding: ['编码解码', '编码工具', 'encoding', 'decoding'],
    generator: ['生成器工具', 'generator tools'],
    developer: ['开发者工具', 'developer tools', 'web tools'],
  },
} as const;

// Open Graph 配置
export const OG_CONFIG = {
  type: 'website',
  locale: 'zh_CN',
  image: {
    width: 1200,
    height: 630,
    alt: 'VerseTool - 在线工具箱',
  },
  defaults: {
    title: 'VerseTool - 在线工具箱',
    description: '现代化的在线工具集合',
  },
} as const;

// PWA 配置
export const PWA_CONFIG = {
  name: 'VerseTool - 在线工具箱',
  shortName: 'VerseTool',
  description:
    '现代化的在线工具集合，包含Base64编码解码、JSON格式化、密码生成器等实用工具',
  themeColor: '#667eea',
  backgroundColor: '#ffffff',
} as const;

// localStorage 键名
export const STORAGE_KEYS = {
  expandedCategories: 'versetool-expanded-categories',
  theme: 'theme',
  locale: 'locale',
} as const;

// 结构化数据配置
export const STRUCTURED_DATA = {
  organization: {
    name: 'VerseTool',
    description: '提供免费在线开发者工具的现代化平台',
    foundingDate: '2024',
  },
  webApplication: {
    name: 'VerseTool',
    category: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    features: [
      'Base64编码解码',
      'JSON格式化',
      '密码生成器',
      'URL编码解码',
      'Hash计算',
      '时间戳转换',
      '颜色转换',
      'UUID生成',
    ],
  },
} as const;

// 错误消息
export const ERROR_MESSAGES = {
  notFound: '页面未找到',
  toolNotFound: '工具不存在',
  networkError: '网络错误，请稍后重试',
  clipboardError: '无法复制到剪贴板',
  fileError: '文件处理错误',
} as const;

// 成功消息
export const SUCCESS_MESSAGES = {
  copied: '复制成功',
  saved: '保存成功',
  processed: '处理完成',
} as const;

// 通用动作文本
export const ACTIONS = {
  copy: '复制',
  save: '保存',
  clear: '清空',
  reset: '重置',
  download: '下载',
  upload: '上传',
  process: '处理',
  generate: '生成',
  convert: '转换',
  format: '格式化',
} as const;

// 工具相关文案生成器
export const generateToolMeta = (toolName: string, categoryName: string) => ({
  title: `${toolName} - VerseTool在线工具`,
  description: `使用VerseTool的${toolName}工具，快速、免费、无需注册。${categoryName}分类下的实用在线工具。`,
  keywords: [
    toolName,
    'VerseTool',
    '在线工具',
    categoryName,
    '免费工具',
    '开发者工具',
    'web工具',
  ],
});

// URL 生成器
export const generateUrls = (path: string = '') => ({
  canonical: `${BRAND.domain}${path}`,
  og: `${BRAND.domain}/api/og`,
  sitemap: `${BRAND.domain}/sitemap.xml`,
  robots: `${BRAND.domain}/robots.txt`,
});

// 类型定义
export type BrandConfig = typeof BRAND;
export type SiteInfo = typeof SITE_INFO;
export type Keywords = typeof KEYWORDS;
export type OGConfig = typeof OG_CONFIG;
export type PWAConfig = typeof PWA_CONFIG;
export type StorageKeys = typeof STORAGE_KEYS;
export type StructuredData = typeof STRUCTURED_DATA;
