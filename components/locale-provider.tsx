'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Locale } from '@/i18n';
import { setStoredLocale } from '@/i18n';
import {
  getHtmlLang,
  getLocaleFromCookie,
  setLocaleToCookie,
} from '@/lib/locale-utils';

interface LocaleContextType {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: React.ReactNode;
  serverLocale: Locale; // 从服务端传入的语言
}

export function LocaleProvider({
  children,
  serverLocale,
}: LocaleProviderProps) {
  // 使用服务端传入的语言作为初始值，避免水合不匹配
  const [locale, setLocale] = useState<Locale>(serverLocale);

  // 客户端水合时同步语言设置
  useEffect(() => {
    // 验证服务端和客户端的语言是否一致
    if (typeof window !== 'undefined') {
      const cookieLocale = getLocaleFromCookie();

      // 如果cookie中的语言与服务端不一致，使用cookie中的语言
      if (cookieLocale && cookieLocale !== serverLocale) {
        setLocale(cookieLocale);
      }
    }
    // 客户端水合完成，语言同步完毕
  }, [serverLocale]);

  // 更新document的lang属性
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const newLang = getHtmlLang(locale);
      // 只有当语言真正改变时才更新
      if (document.documentElement.lang !== newLang) {
        document.documentElement.lang = newLang;
      }
    }
  }, [locale]);

  // 切换语言
  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setStoredLocale(newLocale);

    // 设置cookie，确保与服务端同步
    setLocaleToCookie(newLocale);
  };

  // 切换到下一个语言
  const toggleLocale = () => {
    const nextLocale = locale === 'zh' ? 'en' : 'zh';
    changeLocale(nextLocale);
  };

  const contextValue: LocaleContextType = {
    locale,
    changeLocale,
    toggleLocale,
  };

  return (
    <LocaleContext.Provider value={contextValue}>
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
