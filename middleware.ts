import { NextRequest, NextResponse } from 'next/server';

// 检测用户语言偏好的函数
function getLocale(request: NextRequest): string {
  // 1. 检查 URL 参数中的语言设置
  const searchParams = request.nextUrl.searchParams;
  const langParam = searchParams.get('lang');
  if (langParam && ['zh', 'en'].includes(langParam)) {
    return langParam;
  }

  // 2. 检查 Cookie 中的语言设置
  const localeCookie = request.cookies.get('locale')?.value;
  if (localeCookie && ['zh', 'en'].includes(localeCookie)) {
    return localeCookie;
  }

  // 3. 检查 Accept-Language 头
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // 解析 Accept-Language 头，例如 "zh-CN,zh;q=0.9,en;q=0.8"
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [language, qValue = 'q=1'] = lang.trim().split(';');
        const quality = qValue.startsWith('q=')
          ? parseFloat(qValue.slice(2))
          : 1;
        return { language: language.toLowerCase(), quality };
      })
      .sort((a, b) => b.quality - a.quality);

    // 查找匹配的语言
    for (const { language } of languages) {
      if (language.startsWith('zh')) return 'zh';
      if (language.startsWith('en')) return 'en';
    }
  }

  // 4. 默认返回中文
  return 'zh';
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
  // 这对所有路由都很重要，包括404页面
  response.headers.set('x-locale', locale);

  // 确保cookie中有locale信息，保持服务端和客户端一致
  // 只在正常页面请求时设置cookie，避免在静态渲染时出现问题
  if (!request.cookies.get('locale') && !pathname.startsWith('/_')) {
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
