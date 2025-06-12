'use client';

import { useState, useEffect } from 'react';
import {
  type Locale,
  getCurrentLocale,
  setStoredLocale,
  detectBrowserLanguage,
} from '@/i18n';

export function useLocale() {
  // 尝试同步获取初始语言设置，避免闪烁
  const getInitialLocale = (): Locale => {
    if (typeof window !== 'undefined') {
      // 客户端环境，可以同步读取localStorage
      return getCurrentLocale();
    }
    // 服务端环境，返回默认值
    return 'zh';
  };

  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化语言设置
  useEffect(() => {
    // 在客户端水合后，再次确认语言设置
    const initLocale = getCurrentLocale();
    if (initLocale !== locale) {
      setLocale(initLocale);
    }
    setIsInitialized(true);
  }, [locale]);

  // 切换语言
  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setStoredLocale(newLocale);

    // 更新document的lang属性
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  };

  // 切换到下一个语言
  const toggleLocale = () => {
    const nextLocale = locale === 'zh' ? 'en' : 'zh';
    changeLocale(nextLocale);
  };

  return {
    locale,
    changeLocale,
    toggleLocale,
    isInitialized,
  };
}
