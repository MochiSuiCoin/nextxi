/**
 * Spam Protection Utilities
 * 
 * Provides honeypot detection and rate limiting for form submissions.
 * Designed for low-traffic SaaS platforms without external dependencies.
 */

// Rate limiting configuration
const RATE_LIMIT_MAX_SUBMISSIONS = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

// In-memory rate limit store
// Format: Map<IP, Array<timestamp>>
// In production, this will reset on server restart, which is acceptable for low-traffic apps
const rateLimitStore = new Map<string, number[]>();

// Cleanup old entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let cleanupInterval: NodeJS.Timeout | null = null;

/**
 * Initialize cleanup interval for rate limit store
 * Cleans up entries older than the rate limit window
 */
function initializeCleanup() {
  if (cleanupInterval) return; // Already initialized

  cleanupInterval = setInterval(() => {
    const now = Date.now();
    const cutoff = now - RATE_LIMIT_WINDOW_MS;

    for (const [ip, timestamps] of rateLimitStore.entries()) {
      const filtered = timestamps.filter((ts) => ts > cutoff);
      if (filtered.length === 0) {
        rateLimitStore.delete(ip);
      } else {
        rateLimitStore.set(ip, filtered);
      }
    }
  }, CLEANUP_INTERVAL_MS);
}

/**
 * Check if a form submission triggered the honeypot field
 * 
 * Honeypot fields are hidden fields that legitimate users should never fill.
 * Bots often auto-fill all fields, including hidden ones.
 * 
 * @param formData - FormData object from the request
 * @returns true if honeypot was triggered (spam detected)
 */
export function isHoneypotTriggered(formData: FormData): boolean {
  // Check the honeypot field (named innocuously to avoid detection)
  const honeypotValue = formData.get("company_website");
  
  // If the field has any value, it's likely a bot
  return honeypotValue !== null && honeypotValue !== "";
}

/**
 * Check if an IP address has exceeded the rate limit
 * 
 * @param ip - IP address to check
 * @returns Object with { allowed: boolean, remaining: number }
 */
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  initializeCleanup();

  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  // Get existing timestamps for this IP
  const timestamps = rateLimitStore.get(ip) || [];
  
  // Filter out timestamps outside the current window
  const recentTimestamps = timestamps.filter((ts) => ts > cutoff);

  // Check if limit exceeded
  if (recentTimestamps.length >= RATE_LIMIT_MAX_SUBMISSIONS) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  // Add current submission timestamp
  recentTimestamps.push(now);
  rateLimitStore.set(ip, recentTimestamps);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_SUBMISSIONS - recentTimestamps.length,
  };
}

/**
 * Extract client IP address from Next.js request
 * Handles various proxy headers (Railway, Vercel, etc.)
 * 
 * @param request - NextRequest object
 * @returns IP address string
 */
export function getClientIP(request: Request): string {
  // Check common proxy headers (Railway, Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }

  // Fallback: try to get from request URL or use a default
  // In development, this might be localhost
  return "unknown";
}

