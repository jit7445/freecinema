import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || path === '/login' || path === '/signup' || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''

  if (!isPublicPath && !token) {
    // If user is not logged in and tries to access a non-public path, redirect to home page
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // If user is logged in, allow access to any path
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/search',
    '/movie',
    // Add other restricted paths here
  ]
}