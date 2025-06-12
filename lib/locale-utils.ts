import type { Locale } from '@/i18n';

/**
 * 获取HTML lang属性值
 * 可以在客户端和服务端使用
 */
export function getHtmlLang(locale: Locale): string {
  const langMap = { zh: 'zh-CN', en: 'en-US' };
  return langMap[locale] || 'en-US';
}

/**
 * 检测浏览器语言偏好
 * 只能在客户端使用
 */
export function detectBrowserLanguage(): Locale {
  if (typeof navigator === 'undefined') {
    return 'zh'; // 服务端默认值
  }

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('zh')) return 'zh';
  return 'zh'; // 默认值
}

/**
 * 从客户端存储获取语言设置
 * 只能在客户端使用
 */
export function getStoredLocale(): Locale | null {
  if (typeof localStorage === 'undefined') {
    return null; // 服务端返回null
  }

  const stored = localStorage.getItem('locale');
  if (stored && (stored === 'zh' || stored === 'en')) {
    return stored as Locale;
  }
  return null;
}

/**
 * 从cookie中获取语言设置
 * 可以在客户端使用
 */
export function getLocaleFromCookie(): Locale | null {
  if (typeof document === 'undefined') {
    return null; // 服务端返回null
  }

  const cookieLocale = document.cookie
    .split('; ')
    .find(row => row.startsWith('locale='))
    ?.split('=')[1] as Locale;

  if (cookieLocale && (cookieLocale === 'zh' || cookieLocale === 'en')) {
    return cookieLocale;
  }
  return null;
}

/**
 * 设置语言到cookie
 * 可以在客户端使用
 */
export function setLocaleToCookie(locale: Locale): void {
  if (typeof document !== 'undefined') {
    document.cookie = `locale=${locale}; max-age=${365 * 24 * 60 * 60}; path=/; samesite=lax`;
  }
}
