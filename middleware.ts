import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for rate limiting (for demonstration)
// For production with multiple instances, use Redis or similar
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // Max requests per window

export function middleware(request: NextRequest) {
  // Get client IP from headers
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Rate limiting logic
  const now = Date.now();
  const clientData = rateLimitStore.get(ip);
  
  if (clientData) {
    if (now < clientData.resetTime) {
      if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((clientData.resetTime - now) / 1000).toString(),
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': clientData.resetTime.toString(),
          },
        });
      }
      clientData.count++;
    } else {
      // Reset window
      rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }
  } else {
    // First request from this IP
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }
  
  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance to trigger cleanup
    const expiredKeys = Array.from(rateLimitStore.entries())
      .filter(([_, data]) => now > data.resetTime + RATE_LIMIT_WINDOW)
      .map(([key]) => key);
    expiredKeys.forEach(key => rateLimitStore.delete(key));
  }
  
  // Add rate limit headers to response
  const response = NextResponse.next();
  const currentData = rateLimitStore.get(ip);
  if (currentData) {
    response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString());
    response.headers.set('X-RateLimit-Remaining', 
      Math.max(0, RATE_LIMIT_MAX_REQUESTS - currentData.count).toString()
    );
    response.headers.set('X-RateLimit-Reset', currentData.resetTime.toString());
  }
  
  return response;
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
