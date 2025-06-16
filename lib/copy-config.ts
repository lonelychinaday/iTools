/**
 * 技术配置文件
 * 仅包含语言无关的技术配置，如品牌信息、URL、存储键名等
 *
 * 注意：所有面向用户的文本内容已迁移到国际化系统：
 * - 页面标题、描述 -> lib/seo-i18n.ts
 * - 用户界面文本 -> i18n/locales/*.json
 * - 错误/成功消息 -> i18n/locales/*.json
 */

// 品牌信息（语言无关）
export const BRAND = {
  name: 'VerseTool',
  domain: 'https://versetool.jmxr.fun',
  twitter: '@versetool',
  github: 'https://github.com/itools-jmxr',
} as const;

// 技术配置（语言无关）
export const OG_CONFIG = {
  type: 'website' as const,
  image: {
    width: 1200,
    height: 630,
    alt: 'VerseTool', // 品牌名，保持统一
  },
  defaults: {
    title: 'VerseTool', // 仅作为技术默认值
    description: 'Online Tools Collection', // 仅作为技术默认值
  },
} as const;

// PWA 技术配置
export const PWA_CONFIG = {
  name: 'VerseTool', // 技术标识符
  shortName: 'VerseTool', // 技术标识符
  themeColor: '#667eea',
  backgroundColor: '#ffffff',
  // 注意：description 已迁移到 app/manifest.ts 中进行国际化处理
} as const;

// 存储键名（语言无关）
export const STORAGE_KEYS = {
  expandedCategories: 'versetool-expanded-categories',
  theme: 'theme',
  locale: 'locale',
} as const;

// 结构化数据技术配置
export const STRUCTURED_DATA = {
  organization: {
    name: 'VerseTool',
    foundingDate: '2024',
    // 注意：description 已迁移到国际化系统
  },
  webApplication: {
    name: 'VerseTool',
    category: 'DeveloperApplication' as const,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    // 注意：features 列表已迁移到国际化系统
  },
} as const;

// URL 生成器（语言无关）
export const generateUrls = (path: string = '') => ({
  canonical: `${BRAND.domain}${path}`,
  og: `${BRAND.domain}/api/og`,
  sitemap: `${BRAND.domain}/sitemap.xml`,
  robots: `${BRAND.domain}/robots.txt`,
});

// 类型定义
export type BrandConfig = typeof BRAND;
export type OGConfig = typeof OG_CONFIG;
export type PWAConfig = typeof PWA_CONFIG;
export type StorageKeys = typeof STORAGE_KEYS;
export type StructuredData = typeof STRUCTURED_DATA;

// === 已迁移的配置说明 ===
//
// 以下配置已迁移到国际化系统，不再在此文件中定义：
//
// 1. SITE_INFO (页面标题、描述) -> 迁移到 lib/seo-i18n.ts
// 2. KEYWORDS (SEO关键词) -> 迁移到 lib/seo-i18n.ts
// 3. ERROR_MESSAGES (错误消息) -> 迁移到 i18n/locales/*.json 的 error 分组
// 4. SUCCESS_MESSAGES (成功消息) -> 迁移到 i18n/locales/*.json 的 common 分组
// 5. ACTIONS (动作文本) -> 迁移到 i18n/locales/*.json 的 common 分组
// 6. generateToolMeta (工具元数据) -> 被 getLocalizedToolMeta 替代
//
// 使用方式：
// - import { ts } from '@/hooks/use-translation'
// - ts('error.notFound', '页面未找到')
// - ts('common.copy', '复制')
