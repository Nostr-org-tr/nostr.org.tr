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
    _: 'ed15e54b8d525b7faa43aa142221f838c415aac699bbb4e74a1004e4b7e7adf8',
    topluluk: 'ed15e54b8d525b7faa43aa142221f838c415aac699bbb4e74a1004e4b7e7adf8',
    delirehberi: '46f3c7bb33cc3019049b76dc89dbb96e34c247bdda68b6ad8632682793ff8a1a',
    emre: '46f3c7bb33cc3019049b76dc89dbb96e34c247bdda68b6ad8632682793ff8a1a',
    mustafaakman: '113a2a2c9d74956513ddd3a1f808859c54525accb08b04a1f1c09cea34813d8c',
    fadim: '628b2c9aedcf9da47f42128402f3fd82787dac75c3595db1bccf3b7baab0452f',
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
    '113a2a2c9d74956513ddd3a1f808859c54525accb08b04a1f1c09cea34813d8c': [
      'wss://relay.nostr.org.tr',
      'wss://relay.damus.io',
      'wss://nos.lol',
    ],
    '628b2c9aedcf9da47f42128402f3fd82787dac75c3595db1bccf3b7baab0452f': [
      'wss://relay.nostr.org.tr',
      'wss://relay.damus.io',
      'wss://nos.lol',
    ],
  },
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const normalizedPath = url.pathname.replace(/\/+$/, '');

    // Handle NIP-05 Nostr verification with CORS enabled
    if (normalizedPath === '/.well-known/nostr.json') {
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            ...corsHeaders,
            ...SECURITY_HEADERS,
          },
        });
      }

      return new Response(request.method === 'HEAD' ? null : NOSTR_NIP05_JSON, {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          ...corsHeaders,
          ...SECURITY_HEADERS,
        },
      });
    }

    // Default static asset response with security headers
    const response = await env.ASSETS.fetch(request);

    // If an un-prerendered blog post is requested, fallback to the dynamic real-time Nostr viewer
    if (response.status === 404 && (normalizedPath.startsWith('/blog/') || normalizedPath.startsWith('/en/blog/'))) {
      const viewerUrl = new URL('/blog/viewer', request.url);
      const viewerRequest = new Request(viewerUrl.toString(), request);
      const viewerResponse = await env.ASSETS.fetch(viewerRequest);

      if (viewerResponse.status === 200) {
        const viewerHeaders = new Headers(viewerResponse.headers);
        for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
          viewerHeaders.set(key, value);
        }
        viewerHeaders.set('Cache-Control', 'no-cache');
        return new Response(viewerResponse.body, {
          status: 200,
          statusText: 'OK',
          headers: viewerHeaders,
        });
      }
    }

    const newHeaders = new Headers(response.headers);

    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      newHeaders.set(key, value);
    }

    if (normalizedPath === '/.well-known/nostr.json') {
      newHeaders.set('Access-Control-Allow-Origin', '*');
      newHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
