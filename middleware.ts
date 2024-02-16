import { NextRequest, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'

export async function middleware(req: NextRequest) {
  const tokenValue = req.cookies.get('next-auth.session-token')?.value
  const isAuth = !!tokenValue

  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  if (!isAuth && !req.url.includes('/auth')) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  if (req.url.includes('/auth') && isAuth) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/auth',
    '/invoice-order',
    '/products',
    '/product',
    '/product/:path*',
  ],
}
