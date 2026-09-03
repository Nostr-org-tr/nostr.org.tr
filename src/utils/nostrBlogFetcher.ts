/**
 * Nostr Blog Fetcher & NIP-23 Processor
 * Fetches Long-form Content (Kind 30023) from Nostr relays (specifically relay.nostr.org.tr)
 * tagged with #nostrorgtr, resolves author profiles from Kind 0 metadata,
 * parses Markdown to HTML, and generates static blog models.
 */

import { marked } from 'marked';
import { BLOG_AUTHORS, BLOG_TAGS, BLOG_RELAYS, type BlogAuthor } from '../data/blogConfig';
import { hexToBytes, encodeBech32, hexToNpub } from './nostrKey';
import fallbackPosts from '../data/blogCache.json';

export interface BlogPost {
  id: string;
  pubkey: string;
  dTag: string;
  slug: string;
  title: string;
  summary: string;
  image: string;
  publishedAt: number;
  createdAt: number;
  tags: string[];
  readingTime: string;
  author: BlogAuthor;
  content: string;
  html: string;
  naddr: string;
}

interface RawNostrEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig?: string;
}

interface NostrProfileMetadata {
  name?: string;
  display_name?: string;
  displayName?: string;
  picture?: string;
  image?: string;
  about?: string;
  bio?: string;
  nip05?: string;
  lud16?: string;
  lud06?: string;
}

/**
 * Encode NIP-19 naddr (Kind 30023 + pubkey + d-tag + relays)
 */
export function encodeNaddr(
  kind: number,
  pubkeyHex: string,
  dTag: string,
  relays: string[] = ['wss://relay.nostr.org.tr']
): string {
  try {
    const tlvParts: number[] = [];

    // TLV Type 0: Special 'd' identifier string
    const dBytes = new TextEncoder().encode(dTag);
    tlvParts.push(0, dBytes.length, ...Array.from(dBytes));

    // TLV Type 1: Relays (optional, first relay)
    if (relays.length > 0 && relays[0]) {
      const relayBytes = new TextEncoder().encode(relays[0]);
      tlvParts.push(1, relayBytes.length, ...Array.from(relayBytes));
    }

    // TLV Type 2: Author 32-byte pubkey
    const authorBytes = hexToBytes(pubkeyHex);
    tlvParts.push(2, authorBytes.length, ...Array.from(authorBytes));

    // TLV Type 3: Kind (32-bit big-endian integer, 4 bytes)
    const kindBytes = new Uint8Array(4);
    new DataView(kindBytes.buffer).setUint32(0, kind, false);
    tlvParts.push(3, kindBytes.length, ...Array.from(kindBytes));

    return encodeBech32('naddr', new Uint8Array(tlvParts));
  } catch {
    return '';
  }
}

/**
 * Generate clean URL-friendly slug from d-tag or title
 */
export function slugify(text: string): string {
  const trMap: Record<string, string> = {
    ç: 'c',
    Ç: 'c',
    ğ: 'g',
    Ğ: 'g',
    ı: 'i',
    İ: 'i',
    ö: 'o',
    Ö: 'o',
    ş: 's',
    Ş: 's',
    ü: 'u',
    Ü: 'u',
  };

  const normalized = text
    .split('')
    .map((c) => trMap[c] || c)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || 'makale';
}

/**
 * Estimate reading time based on text word count (~200 wpm)
 */
export function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} dk`;
}

/**
 * Sanitize and find tag value from Nostr event tags array
 */
function getTagValue(tags: string[][], tagName: string): string {
  const found = tags.find((t) => t[0] === tagName && t[1]);
  return found ? found[1].trim() : '';
}

/**
 * Find all values for a specific tag name
 */
function getAllTagValues(tags: string[][], tagName: string): string[] {
  return tags
    .filter((t) => t[0] === tagName && t[1])
    .map((t) => t[1].trim());
}

/**
 * Resolve author model: merges predefined data with live Kind 0 profile
 */
export function resolveAuthor(pubkeyHex: string, meta?: NostrProfileMetadata): BlogAuthor {
  const existing = BLOG_AUTHORS.find(
    (a) => a.hex.toLowerCase() === pubkeyHex.toLowerCase()
  );

  let npub = '';
  try {
    npub = hexToNpub(pubkeyHex);
  } catch {
    npub = pubkeyHex;
  }

  const name = meta?.display_name || meta?.displayName || meta?.name || existing?.name || `${npub.slice(0, 10)}...${npub.slice(-4)}`;
  const bio = meta?.about || meta?.bio || existing?.bio || '';
  const nip05 = meta?.nip05 || existing?.nip05 || '';
  const avatar = meta?.picture || meta?.image || existing?.avatar || '';
  const lightningAddress = meta?.lud16 || meta?.lud06 || existing?.lightningAddress || '';

  return {
    npub,
    hex: pubkeyHex,
    name,
    role: existing?.role || (nip05 ? nip05 : 'Topluluk Yazarı'),
    roleEn: existing?.roleEn || 'Community Contributor',
    bio,
    bioEn: existing?.bioEn || bio,
    nip05,
    avatar,
    lightningAddress,
  };
}

/**
 * Convert raw Nostr kind 30023 event into a BlogPost model
 */
export async function parseNostrArticle(
  event: RawNostrEvent,
  authorMeta?: NostrProfileMetadata
): Promise<BlogPost | null> {
  if (event.kind !== 30023 || !event.pubkey || !event.content) {
    return null;
  }

  // Extract topic tags ('t' tags)
  const eventTags = getAllTagValues(event.tags, 't');

  // Verify that article has one of the target community hashtags
  const hasTargetTag = eventTags.some((t) =>
    BLOG_TAGS.includes(t.toLowerCase().replace(/^#/, ''))
  );
  if (!hasTargetTag) {
    return null;
  }

  // Extract NIP-23 tags
  const dTag = getTagValue(event.tags, 'd') || event.id;
  const rawTitle = getTagValue(event.tags, 'title');
  const summary = getTagValue(event.tags, 'summary');
  const image = getTagValue(event.tags, 'image');
  const publishedAtStr = getTagValue(event.tags, 'published_at');
  const publishedAt = publishedAtStr ? parseInt(publishedAtStr, 10) : event.created_at;

  // If title is missing in tags, attempt to extract first markdown H1
  let title = rawTitle;
  if (!title) {
    const h1Match = event.content.match(/^#\s+(.+)$/m);
    title = h1Match ? h1Match[1].trim() : 'İsimsiz Nostr Yazısı';
  }

  // Generate URL slug
  const slug = slugify(dTag || title);

  // Render markdown to HTML
  const html = await marked.parse(event.content);

  // Compute NIP-19 naddr
  const naddr = encodeNaddr(30023, event.pubkey, dTag, [BLOG_RELAYS[0]]);

  // Resolve author metadata
  const author = resolveAuthor(event.pubkey, authorMeta);

  return {
    id: event.id,
    pubkey: event.pubkey,
    dTag,
    slug,
    title,
    summary: summary || (event.content.slice(0, 160).replace(/[#*`_]/g, '') + '...'),
    image: image || '/og-image.png',
    publishedAt: isNaN(publishedAt) ? event.created_at : publishedAt,
    createdAt: event.created_at,
    tags: eventTags.length > 0 ? eventTags : ['nostrorgtr'],
    readingTime: calculateReadingTime(event.content),
    author,
    content: event.content,
    html,
    naddr,
  };
}

/**
 * Fetch NIP-23 articles from relays at build time with dynamic Kind 0 profile resolution
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const rawEventsMap = new Map<string, RawNostrEvent>();
  const profilesMap = new Map<string, NostrProfileMetadata>();

  // Check if WebSocket is available in Node / environment
  if (typeof WebSocket !== 'undefined') {
    const subId = 'blog_' + Math.random().toString(36).slice(2, 8);
    const filter = {
      kinds: [30023],
      '#t': BLOG_TAGS,
    };

    const fetchPromises = BLOG_RELAYS.map((relayUrl) => {
      return new Promise<void>((resolve) => {
        let ws: WebSocket | null = null;
        let isDone = false;

        const cleanup = () => {
          if (isDone) return;
          isDone = true;
          if (ws) {
            try {
              ws.onclose = null;
              ws.onerror = null;
              ws.onmessage = null;
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(['CLOSE', subId]));
              }
              ws.close();
            } catch {
              // Ignore socket close errors
            }
          }
          resolve();
        };

        const timeout = setTimeout(cleanup, 4000);

        try {
          ws = new WebSocket(relayUrl);

          ws.onopen = () => {
            try {
              ws?.send(JSON.stringify(['REQ', subId, filter]));
            } catch {
              clearTimeout(timeout);
              cleanup();
            }
          };

          ws.onmessage = (msg: MessageEvent) => {
            try {
              const data = JSON.parse(msg.data);
              if (!Array.isArray(data)) return;

              const [type, reqSubId, event] = data;
              if (type === 'EVENT' && reqSubId === subId && event && event.kind === 30023) {
                const dTag = (event.tags as string[][]).find((t) => t[0] === 'd')?.[1] || '';
                const dedupKey = `${event.pubkey}:${dTag}`;

                const existing = rawEventsMap.get(dedupKey);
                if (!existing || event.created_at > existing.created_at) {
                  rawEventsMap.set(dedupKey, event);
                }
              } else if (type === 'EOSE' && reqSubId === subId) {
                clearTimeout(timeout);
                cleanup();
              }
            } catch {
              // Ignore parse error
            }
          };

          ws.onerror = () => {
            clearTimeout(timeout);
            cleanup();
          };

          ws.onclose = () => {
            clearTimeout(timeout);
            cleanup();
          };
        } catch {
          clearTimeout(timeout);
          cleanup();
        }
      });
    });

    try {
      await Promise.all(fetchPromises);
    } catch {
      // Ignore relay connection faults
    }

    // Fetch Kind 0 profiles for all unique author pubkeys found
    const authorPubkeys = Array.from(new Set(Array.from(rawEventsMap.values()).map((e) => e.pubkey)));
    if (authorPubkeys.length > 0) {
      const profileSubId = 'prof_' + Math.random().toString(36).slice(2, 8);
      const profilePromises = BLOG_RELAYS.map((relayUrl) => {
        return new Promise<void>((resolve) => {
          let ws: WebSocket | null = null;
          let isDone = false;
          const cleanup = () => {
            if (isDone) return;
            isDone = true;
            if (ws) {
              try {
                ws.onclose = null;
                ws.onerror = null;
                ws.onmessage = null;
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify(['CLOSE', profileSubId]));
                }
                ws.close();
              } catch {}
            }
            resolve();
          };
          const timeout = setTimeout(cleanup, 3000);

          try {
            ws = new WebSocket(relayUrl);
            ws.onopen = () => {
              ws?.send(JSON.stringify(['REQ', profileSubId, { kinds: [0], authors: authorPubkeys }]));
            };
            ws.onmessage = (msg: MessageEvent) => {
              try {
                const data = JSON.parse(msg.data);
                if (data[0] === 'EVENT' && data[1] === profileSubId && data[2]?.kind === 0) {
                  const meta: NostrProfileMetadata = JSON.parse(data[2].content);
                  profilesMap.set(data[2].pubkey, meta);
                } else if (data[0] === 'EOSE' && data[1] === profileSubId) {
                  clearTimeout(timeout);
                  cleanup();
                }
              } catch {}
            };
            ws.onerror = () => { clearTimeout(timeout); cleanup(); };
            ws.onclose = () => { clearTimeout(timeout); cleanup(); };
          } catch {
            clearTimeout(timeout);
            cleanup();
          }
        });
      });

      try {
        await Promise.all(profilePromises);
      } catch {}
    }
  }

  // Parse fetched raw events
  const parsedPosts: BlogPost[] = [];
  for (const event of rawEventsMap.values()) {
    const authorMeta = profilesMap.get(event.pubkey);
    const post = await parseNostrArticle(event, authorMeta);
    if (post) {
      parsedPosts.push(post);
    }
  }

  // If live fetching returned real articles, return them
  if (parsedPosts.length > 0) {
    return parsedPosts.sort((a, b) => b.publishedAt - a.publishedAt);
  }

  // Otherwise, use fallback cache snapshot
  const fallbackList: BlogPost[] = (fallbackPosts as BlogPost[]).map((p) => ({
    ...p,
    naddr: p.naddr || encodeNaddr(30023, p.pubkey, p.dTag, [BLOG_RELAYS[0]]),
  }));

  return fallbackList.sort((a, b) => b.publishedAt - a.publishedAt);
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchBlogPosts();
  return posts.find((p) => p.slug === slug || p.dTag === slug);
}
