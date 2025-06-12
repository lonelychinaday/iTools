import { NextRequest, NextResponse } from 'next/server';

// 支持的语言
const locales = ['zh', 'en'] as const;
const defaultLocale = 'zh';

// 检测用户首选语言
function getLocale(request: NextRequest): string {
  // 1. 检查cookie中的语言设置（用户手动设置的优先级最高）
  const localeCookie = request.cookies.get('locale')?.value;
  if (localeCookie && locales.includes(localeCookie as any)) {
    return localeCookie;
  }

  // 2. 检查Accept-Language头（浏览器语言偏好）
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // 解析Accept-Language头，支持权重
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [locale, q = '1'] = lang.trim().split(';q=');
        return { locale: locale.toLowerCase(), quality: parseFloat(q) };
      })
      .sort((a, b) => b.quality - a.quality);

    // 找到第一个支持的语言
    for (const { locale } of languages) {
      for (const supportedLocale of locales) {
        if (locale.startsWith(supportedLocale)) {
          return supportedLocale;
        }
      }
    }
  }

  // 3. 返回默认语言
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 跳过API路由、静态资源和Next.js内部路径
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const locale = getLocale(request);

  // 创建响应并设置locale信息
  const response = NextResponse.next();

  // 在请求头中添加locale信息，供服务端组件使用
  response.headers.set('x-locale', locale);

  // 确保cookie中有locale信息，保持服务端和客户端一致
  if (!request.cookies.get('locale')) {
    response.cookies.set('locale', locale, {
      maxAge: 365 * 24 * 60 * 60, // 1年
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: [
    // 匹配所有路径，除了API路由和静态资源
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
