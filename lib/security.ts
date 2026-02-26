/**
 * Security Utilities
 * Provides helper functions for input validation, sanitization, and security headers
 */

/**
 * Validates and sanitizes user input to prevent XSS
 * @param input - The user input to sanitize
 * @returns Sanitized string safe for HTML context
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates email format
 * @param email - Email to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validates URL format and prevents open redirects
 * @param url - URL to validate
 * @param allowedHosts - List of allowed hosts (optional)
 * @returns true if valid and safe URL
 */
export function isValidRedirectUrl(url: string, allowedHosts?: string[]): boolean {
  // Prevent protocol-relative URLs and data URLs
  if (url.startsWith('//') || url.startsWith('javascript:') || url.startsWith('data:')) {
    return false;
  }

  try {
    const parsed = new URL(url, 'http://localhost');
    
    // Only allow http and https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }

    // If allowed hosts specified, check against them
    if (allowedHosts && !allowedHosts.includes(parsed.hostname)) {
      return false;
    }

    return true;
  } catch {
    // Invalid URL format
    return false;
  }
}

/**
 * Validates that input is a valid integer within range
 * @param value - The value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns true if valid integer within range
 */
export function isValidInteger(value: any, min: number, max: number): boolean {
  const num = parseInt(value, 10);
  return !isNaN(num) && num >= min && num <= max;
}

/**
 * Validates request size limit
 * @param contentLength - Content-Length header value
 * @param maxBytes - Maximum allowed size in bytes (default 10MB)
 * @returns true if within limit
 */
export function isValidRequestSize(contentLength: string | null, maxBytes = 10 * 1024 * 1024): boolean {
  if (!contentLength) return true;
  const size = parseInt(contentLength, 10);
  return !isNaN(size) && size <= maxBytes;
}

/**
 * Gets safe client IP from headers
 * Handles X-Forwarded-For, X-Real-IP, and direct connections
 * @param headers - Request headers object
 * @returns Safe client IP address
 */
export function getClientIp(headers: Record<string, string | string[]>): string {
  const xForwardedFor = headers['x-forwarded-for'];
  if (typeof xForwardedFor === 'string') {
    // Get first IP in case of multiple proxies
    const ips = xForwardedFor.split(',').map(ip => ip.trim());
    if (ips[0]) return ips[0];
  }

  const xRealIp = headers['x-real-ip'];
  if (typeof xRealIp === 'string') return xRealIp;

  return 'unknown';
}

/**
 * Validates API request origin for CORS/CSRF protection
 * @param origin - Request origin header
 * @param allowedOrigins - List of allowed origins
 * @returns true if origin is allowed
 */
export function isAllowedOrigin(origin: string | undefined, allowedOrigins: string[]): boolean {
  if (!origin) return false;
  return allowedOrigins.some(allowed => {
    // Exact match
    if (allowed === origin) return true;
    // Wildcard domain matching (e.g., *.example.com)
    if (allowed.startsWith('*.')) {
      const domain = allowed.slice(2);
      return origin.endsWith(domain) || origin === origin.replace(/^[^.]*\./, '').replace(/\..*/, '') + '.' + domain;
    }
    return false;
  });
}
