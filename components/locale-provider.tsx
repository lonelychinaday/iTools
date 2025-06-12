'use client';

import { createContext, useContext, useEffect } from 'react';
import { useLocale } from '@/hooks/use-locale';
import type { Locale } from '@/i18n';

interface LocaleContextType {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isInitialized: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const localeState = useLocale();

  // 更新document的lang属性
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // 设置完整的locale标识符
      const langMap = { zh: 'zh-CN', en: 'en-US' };
      const newLang =
        langMap[localeState.locale as keyof typeof langMap] || 'en-US';

      // 只有当语言真正改变时才更新
      if (document.documentElement.lang !== newLang) {
        document.documentElement.lang = newLang;
      }
    }
  }, [localeState.locale]);

  return (
    <LocaleContext.Provider value={localeState}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
}
