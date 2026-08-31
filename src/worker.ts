export interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
};

const NOSTR_NIP05_JSON = JSON.stringify({
  names: {
    topluluk: 'ed15e54b8d525b7faa43aa142221f838c415aac699bbb4e74a1004e4b7e7adf8',
    emre: '46f3c7bb33cc3019049b76dc89dbb96e34c247bdda68b6ad8632682793ff8a1a',
  },
  relays: {
    'ed15e54b8d525b7faa43aa142221f838c415aac699bbb4e74a1004e4b7e7adf8': [
      'wss://relay.nostr.org.tr',
      'wss://relay.damus.io',
      'wss://nos.lol',
    ],
    '46f3c7bb33cc3019049b76dc89dbb96e34c247bdda68b6ad8632682793ff8a1a': [
      'wss://relay.nostr.org.tr',
      'wss://relay.damus.io',
      'wss://nos.lol',
    ],
  },
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle NIP-05 Nostr verification with CORS enabled
    if (url.pathname === '/.well-known/nostr.json') {
      return new Response(NOSTR_NIP05_JSON, {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 'public, max-age=3600',
          ...SECURITY_HEADERS,
        },
      });
    }

    // Default static asset response with security headers
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);

    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      newHeaders.set(key, value);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
