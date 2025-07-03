import { NextResponse } from 'next/server'

export function middleware(request) {
  const cookie = request.cookies.get('cookieAuth')

  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
