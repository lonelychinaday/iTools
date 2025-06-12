'use client';

import { useLocaleContext } from '@/components/locale-provider';
import { t as translateFn, type TranslationKey } from '@/i18n';

export function useTranslation() {
  const { locale } = useLocaleContext();

  // 翻译函数，增加错误处理
  const t = (key: TranslationKey, fallback?: string): string => {
    try {
      return translateFn(key, locale);
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`, error);
      return fallback || key;
    }
  };

  // 安全的翻译函数，提供fallback机制
  const ts = (key: TranslationKey, fallback: string): string => {
    return t(key, fallback);
  };

  return {
    t,
    ts, // safe translation function with fallback
    locale,
  };
}
