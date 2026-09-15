import { defineMiddleware } from 'astro:middleware';

/**
 * Astro Middleware:
 * Dynamically rewrites un-prerendered /blog/* and /en/blog/* routes to /blog/viewer
 * during development and runtime, preserving the original URL in the browser bar
 * so the dynamic Nostr viewer can resolve the nevent or naddr from window.location.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname.replace(/\/+$/, '');

  const isBlogDetail =
    (path.startsWith('/blog/') || path.startsWith('/en/blog/')) &&
    !path.startsWith('/blog/viewer') &&
    !path.startsWith('/en/blog/viewer') &&
    !path.includes('.');

  if (isBlogDetail) {
    const response = await next();
    if (response.status === 404) {
      return context.rewrite('/blog/viewer');
    }
    return response;
  }

  return next();
});
