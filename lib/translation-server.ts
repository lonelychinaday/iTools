import { t as translateFn, type TranslationKey, type Locale } from '@/i18n';
import { getServerLocale } from '@/lib/locale-server';

/**
 * 服务端翻译函数
 * 在Server Components中使用
 */
export async function serverTranslate(
  key: TranslationKey,
  locale?: Locale,
  fallback?: string
): Promise<string> {
  try {
    const actualLocale = locale || (await getServerLocale());
    return translateFn(key, actualLocale);
  } catch (error) {
    // 开发环境显示翻译错误
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(`Server translation missing for key: ${key}`, error);
    }
    return fallback || key;
  }
}

/**
 * 创建绑定特定语言的服务端翻译函数
 */
export function createServerTranslator(locale: Locale) {
  const t = (key: TranslationKey, fallback?: string): string => {
    try {
      return translateFn(key, locale);
    } catch (error) {
      // 开发环境显示翻译错误
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(`Server translation missing for key: ${key}`, error);
      }
      return fallback || key;
    }
  };

  // 安全翻译函数，总是有 fallback
  const ts = (key: TranslationKey, fallback: string): string => {
    return t(key, fallback);
  };

  return { t, ts, locale };
}

/**
 * 获取服务端翻译器Hook，用于Server Components
 * 使用方式：
 * const { t, ts } = await getServerTranslator();
 * return <h1>{ts('home.title', 'Default Title')}</h1>
 */
export async function getServerTranslator() {
  const locale = await getServerLocale();
  return createServerTranslator(locale);
}

export function loadTranslations(locale: Locale): Record<string, unknown> {
  try {
    // 动态导入翻译文件
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const translations = require(`@/i18n/locales/${locale}.json`);
    return translations;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to load translations for locale: ${locale}`, error);
    // 如果加载失败，尝试加载默认语言
    if (locale !== 'zh') {
      return loadTranslations('zh');
    }
    return {};
  }
}

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

export function t(key: TranslationKey, locale: Locale = 'zh'): string {
  try {
    const translations = loadTranslations(locale);
    return getNestedValue(translations, key) || key;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Translation error for key: ${key}`, error);
    return key;
  }
}
