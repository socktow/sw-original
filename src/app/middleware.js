
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Bỏ qua static files hoặc API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Nếu đã có locale trong URL thì bỏ qua
  const localeMatch = pathname.match(/^\/(en-US|zh-CN|ko-KR)(\/|$)/);
  if (localeMatch) {
    return;
  }

  // Nếu không có → lấy từ cookie hoặc Accept-Language
  const cookieLocale = request.cookies.get('locale')?.value;
  const browserLang = request.headers.get('accept-language')?.split(',')[0] || 'en-US';

  const supported = ['en-US', 'zh-CN', 'ko-KR'];
  const finalLocale = supported.includes(cookieLocale)
    ? cookieLocale
    : supported.includes(browserLang)
    ? browserLang
    : 'en-US';

  const url = request.nextUrl.clone();
  url.pathname = `/${finalLocale}/home-page`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/', '/home-page'],
};
