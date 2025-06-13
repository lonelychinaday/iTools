import { headers, cookies } from 'next/headers';

export type Locale = 'zh' | 'en';

/**
 * 服务端获取当前语言
 * 优先级：middleware headers > cookies > 默认语言
 */
export async function getServerLocale(): Promise<Locale> {
  try {
    const headersList = await headers();

    // 优先使用header中的语言设置（由middleware设置）
    const localeHeader = headersList.get('x-locale');
    if (localeHeader && ['zh', 'en'].includes(localeHeader)) {
      return localeHeader as Locale;
    }

    // 其次使用cookie中的语言设置
    try {
      const cookieStore = await cookies();
      const localeCookie = cookieStore.get('locale')?.value;
      if (localeCookie && ['zh', 'en'].includes(localeCookie)) {
        return localeCookie as Locale;
      }
    } catch (cookieError) {
      // 在静态渲染时cookies()会抛出错误，这是正常的
      // eslint-disable-next-line no-console
      console.debug(
        'Cookies not available during static rendering:',
        cookieError
      );
    }

    return 'zh'; // 默认中文
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to get server locale:', error);
    return 'zh';
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
    // eslint-disable-next-line no-console
    console.warn('Failed to set server locale:', error);
  }
}
