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
    console.warn(`Server translation missing for key: ${key}`, error);
    return fallback || key;
  }
}

/**
 * 创建绑定特定语言的服务端翻译函数
 */
export function createServerTranslator(locale: Locale) {
  return (key: TranslationKey, fallback?: string): string => {
    try {
      return translateFn(key, locale);
    } catch (error) {
      console.warn(`Server translation missing for key: ${key}`, error);
      return fallback || key;
    }
  };
}

/**
 * 获取服务端翻译器Hook，用于Server Components
 * 使用方式：
 * const t = await getServerTranslator();
 * return <h1>{t('home.title')}</h1>
 */
export async function getServerTranslator() {
  const locale = await getServerLocale();
  return createServerTranslator(locale);
}
