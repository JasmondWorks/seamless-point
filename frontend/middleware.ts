// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token'); // Assuming the auth token is stored in cookies

  // Check if the route starts with "/dashboard" and the user is not authenticated
  if (pathname.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/login', request.url); // Redirect to login if not authenticated
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}
