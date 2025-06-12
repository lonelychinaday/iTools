import { headers, cookies } from 'next/headers';
import { type Locale, defaultLocale } from '@/i18n';

/**
 * 服务端获取当前语言
 * 优先级：middleware headers > cookies > 默认语言
 */
export async function getServerLocale(): Promise<Locale> {
  try {
    // 1. 从middleware设置的header中获取（最可靠）
    const headersList = await headers();
    const localeFromHeader = headersList.get('x-locale');
    if (
      localeFromHeader &&
      (localeFromHeader === 'zh' || localeFromHeader === 'en')
    ) {
      return localeFromHeader as Locale;
    }

    // 2. 从cookie中获取（备选方案）
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('locale')?.value;
    if (localeCookie && (localeCookie === 'zh' || localeCookie === 'en')) {
      return localeCookie as Locale;
    }

    // 3. 返回默认语言
    return defaultLocale;
  } catch (error) {
    console.warn('Failed to get server locale:', error);
    return defaultLocale;
  }
}

/**
 * 服务端设置语言cookie
 */
export async function setServerLocale(locale: Locale) {
  try {
    const cookieStore = await cookies();
    cookieStore.set('locale', locale, {
      maxAge: 365 * 24 * 60 * 60, // 1年
      path: '/',
      sameSite: 'lax',
      httpOnly: false, // 允许客户端访问，用于同步状态
    });
  } catch (error) {
    console.warn('Failed to set server locale:', error);
  }
}
