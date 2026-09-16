import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Exclude login paths and auth API
  if (
    pathname === '/admin/login' || 
    pathname === '/api/auth'
  ) {
    return NextResponse.next();
  }

  // Check if it's an admin page or a mutating API route
  const isAdminRoute = pathname.startsWith('/admin');
  const isApiRoute = pathname.startsWith('/api');
  const isMutatingApi = isApiRoute && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method);

  if (isAdminRoute || isMutatingApi) {
    const session = request.cookies.get('sdea_admin_session');
    
    if (!session || !session.value) {
      if (isApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      } else {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
  }

  // Apply Security Headers to all responses
  const response = NextResponse.next();
  
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https: http:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     * - uploads/ (public uploads)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|uploads/).*)',
  ],
};
