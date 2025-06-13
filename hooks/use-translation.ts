'use client';

import { useLocaleContext } from '@/components/locale-provider';
import { t as translateFn, type TranslationKey } from '@/i18n';
import { useCallback } from 'react';

export function useTranslation() {
  const { locale } = useLocaleContext();

  const t = useCallback(
    (key: TranslationKey, fallback?: string) => {
      try {
        return translateFn(key, locale);
      } catch (error) {
        // 开发环境显示警告
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn(`Translation missing for key: ${key}`, error);
        }
        return fallback || key;
      }
    },
    [locale]
  );

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
