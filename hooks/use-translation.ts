'use client';

import { useLocaleContext } from '@/components/locale-provider';
import { t as translateFn, type TranslationKey } from '@/i18n';

export function useTranslation() {
  const { locale, isInitialized } = useLocaleContext();

  // 翻译函数
  const t = (key: TranslationKey): string => {
    return translateFn(key, locale);
  };

  return {
    t,
    locale,
    isInitialized,
  };
}
