import zhLocale from './locales/zh.json';
import enLocale from './locales/en.json';

export type Locale = 'zh' | 'en';

export interface LocaleConfig {
  name: string;
  label: string;
}

export const locales: Record<Locale, LocaleConfig> = {
  zh: {
    name: 'zh',
    label: '中文',
  },
  en: {
    name: 'en',
    label: 'English',
  },
};

export const defaultLocale: Locale = 'zh';

// 语言包数据
const messages = {
  zh: zhLocale,
  en: enLocale,
};

// 检测浏览器语言
export function detectBrowserLanguage(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  const browserLang = navigator.language.toLowerCase();

  // 检查是否为英语地区
  if (browserLang.startsWith('en')) {
    return 'en';
  }

  // 检查是否为中文地区
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }

  // 默认返回中文
  return defaultLocale;
}

// 获取存储的语言设置
export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem('locale');
  if (stored && (stored === 'zh' || stored === 'en')) {
    return stored as Locale;
  }

  return null;
}

// 保存语言设置
export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('locale', locale);
}

// 获取当前语言
export function getCurrentLocale(): Locale {
  const stored = getStoredLocale();
  if (stored) {
    return stored;
  }

  return detectBrowserLanguage();
}

// 翻译函数类型
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<typeof zhLocale>;

// 根据路径获取嵌套对象的值
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return (
    (path.split('.').reduce((current, key) => {
      if (current && typeof current === 'object' && key in current) {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj as unknown) as string) || path
  );
}

// 翻译函数
export function t(
  key: TranslationKey,
  locale: Locale = getCurrentLocale()
): string {
  const message = messages[locale];
  return getNestedValue(message, key);
}

// 创建绑定特定语言的翻译函数
export function createT(locale: Locale) {
  return (key: TranslationKey): string => t(key, locale);
}

export { messages };
export type { TranslationKey };
