/**
 * CLI Script: Sync Nostr Blog Posts from Relays
 * Fetches Long-form Content (Kind 30023) from relay.nostr.org.tr and public relays,
 * fetches author profiles (Kind 0), parses Markdown, and updates src/data/blogCache.json.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_FILE_PATH = path.resolve(__dirname, '../src/data/blogCache.json');

const BLOG_TAGS = ['nostrorgtr', 'nostrturkiye', 'nostr-tr'];
const BLOG_RELAYS = [
  'wss://relay.nostr.org.tr',
];

const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const ALPHABET_MAP = {};
for (let i = 0; i < ALPHABET.length; i++) ALPHABET_MAP[ALPHABET[i]] = i;
const GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

function polymod(values) {
  let chk = 1;
  for (let p = 0; p < values.length; ++p) {
    const top = chk >> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ values[p];
    for (let i = 0; i < 5; ++i) {
      if ((top >> i) & 1) chk ^= GENERATOR[i];
    }
  }
  return chk;
}

function hrpExpand(hrp) {
  const ret = [];
  for (let p = 0; p < hrp.length; ++p) ret.push(hrp.charCodeAt(p) >> 5);
  ret.push(0);
  for (let p = 0; p < hrp.length; ++p) ret.push(hrp.charCodeAt(p) & 31);
  return ret;
}

function createChecksum(hrp, data) {
  const values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
  const mod = polymod(values) ^ 1;
  const ret = [];
  for (let p = 0; p < 6; ++p) ret.push((mod >> (5 * (5 - p))) & 31);
  return ret;
}

function convertBits(data, fromBits, toBits, pad) {
  let acc = 0;
  let bits = 0;
  const ret = [];
  const maxv = (1 << toBits) - 1;
  const maxAcc = (1 << (fromBits + toBits - 1)) - 1;
  for (let p = 0; p < data.length; ++p) {
    acc = ((acc << fromBits) | data[p]) & maxAcc;
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      ret.push((acc >> bits) & maxv);
    }
  }
  if (pad && bits > 0) ret.push((acc << (toBits - bits)) & maxv);
  return ret;
}

function encodeBech32(hrp, data) {
  const words = convertBits(data, 8, 5, true);
  const checksum = createChecksum(hrp.toLowerCase(), words);
  const combined = words.concat(checksum);
  let result = hrp.toLowerCase() + '1';
  for (let i = 0; i < combined.length; ++i) result += ALPHABET.charAt(combined[i]);
  return result;
}

function hexToBytes(hex) {
  const clean = hex.trim().toLowerCase();
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  }
  return bytes;
}

function hexToNpub(hex) {
  return encodeBech32('npub', hexToBytes(hex));
}

function encodeNaddr(kind, pubkeyHex, dTag, relays = ['wss://relay.nostr.org.tr']) {
  const tlvParts = [];
  const dBytes = new TextEncoder().encode(dTag);
  tlvParts.push(0, dBytes.length, ...Array.from(dBytes));
  if (relays.length > 0 && relays[0]) {
    const rBytes = new TextEncoder().encode(relays[0]);
    tlvParts.push(1, rBytes.length, ...Array.from(rBytes));
  }
  const aBytes = hexToBytes(pubkeyHex);
  tlvParts.push(2, aBytes.length, ...Array.from(aBytes));
  const kindBytes = new Uint8Array(4);
  new DataView(kindBytes.buffer).setUint32(0, kind, false);
  tlvParts.push(3, kindBytes.length, ...Array.from(kindBytes));
  return encodeBech32('naddr', new Uint8Array(tlvParts));
}

function slugify(text) {
  const trMap = {
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
  return text
    .split('')
    .map((c) => trMap[c] || c)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function syncNostrBlog() {
  console.log('⚡ Connecting to Nostr relays for #nostrorgtr long-form articles...');

  const rawEventsMap = new Map();
  const subId = 'cli_sync_' + Math.random().toString(36).slice(2, 8);

  const fetchPromises = BLOG_RELAYS.map((relayUrl) => {
    return new Promise((resolve) => {
      let ws = null;
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
          } catch {}
        }
        resolve();
      };

      const timeout = setTimeout(cleanup, 4500);

      try {
        ws = new WebSocket(relayUrl);

        ws.onopen = () => {
          ws?.send(
            JSON.stringify([
              'REQ',
              subId,
              {
                kinds: [30023],
                '#t': BLOG_TAGS,
              },
            ])
          );
        };

        ws.onmessage = (msg) => {
          try {
            const data = JSON.parse(msg.data);
            if (!Array.isArray(data)) return;

            const [type, reqSubId, event] = data;
            if (type === 'EVENT' && reqSubId === subId && event && event.kind === 30023) {
              const dTag = (event.tags || []).find((t) => t[0] === 'd')?.[1] || '';
              const dedupKey = `${event.pubkey}:${dTag}`;

              const existing = rawEventsMap.get(dedupKey);
              if (!existing || event.created_at > existing.created_at) {
                rawEventsMap.set(dedupKey, event);
                console.log(`  ✓ Found Kind 30023 [${relayUrl}]: ${event.tags.find((t) => t[0] === 'title')?.[1] || dTag}`);
              }
            } else if (type === 'EOSE' && reqSubId === subId) {
              clearTimeout(timeout);
              cleanup();
            }
          } catch {}
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

  await Promise.all(fetchPromises);

  const rawEvents = Array.from(rawEventsMap.values());
  console.log(`\n📋 Found ${rawEvents.length} unique long-form articles. Fetching author profiles...`);

  // Fetch author Kind 0 profiles
  const profilesMap = new Map();
  const authorPubkeys = Array.from(new Set(rawEvents.map((e) => e.pubkey)));

  if (authorPubkeys.length > 0) {
    const profSubId = 'cli_prof_' + Math.random().toString(36).slice(2, 8);
    const profRelays = BLOG_RELAYS;

    const profilePromises = profRelays.map((relayUrl) => {
      return new Promise((resolve) => {
        let ws = null;
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
                ws.send(JSON.stringify(['CLOSE', profSubId]));
              }
              ws.close();
            } catch {}
          }
          resolve();
        };

        const timeout = setTimeout(cleanup, 3500);

        try {
          ws = new WebSocket(relayUrl);
          ws.onopen = () => {
            ws?.send(
              JSON.stringify([
                'REQ',
                profSubId,
                {
                  kinds: [0],
                  authors: authorPubkeys,
                },
              ])
            );
          };

          ws.onmessage = (msg) => {
            try {
              const data = JSON.parse(msg.data);
              if (data[0] === 'EVENT' && data[1] === profSubId && data[2]?.kind === 0) {
                const meta = JSON.parse(data[2].content);
                profilesMap.set(data[2].pubkey, meta);
              } else if (data[0] === 'EOSE' && data[1] === profSubId) {
                clearTimeout(timeout);
                cleanup();
              }
            } catch {}
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

    await Promise.all(profilePromises);
  }

  const KNOWN_AUTHORS = {
    '46f3c7bb33cc3019049b76dc89dbb96e34c247bdda68b6ad8632682793ff8a1a': {
      name: 'Emre Yılmaz',
      role: 'Kurucu & Kolaylaştırıcı',
      roleEn: 'Founder & Community Facilitator',
      bio: 'Açık kaynak, dağıtık sistemler ve sansürsüz iletişim savunucusu. Nostr Türkiye topluluğunun kurucusu.',
      bioEn: 'Open source advocate, distributed systems engineer, and founder of Nostr Türkiye Community.',
      nip05: 'delirehberi@emre.xyz',
      avatar: '/images/nostr-org-logo.jpeg',
      lightningAddress: 'delirehberi@emre.xyz',
    },
  };

  // Parse and build BlogPost objects
  const posts = [];
  for (const ev of rawEvents) {
    const meta = profilesMap.get(ev.pubkey) || {};
    const known = KNOWN_AUTHORS[ev.pubkey.toLowerCase()] || {};
    const dTag = ev.tags.find((t) => t[0] === 'd')?.[1] || ev.id;
    const title = ev.tags.find((t) => t[0] === 'title')?.[1] || 'İsimsiz Nostr Yazısı';
    const summary = ev.tags.find((t) => t[0] === 'summary')?.[1] || '';
    const image = ev.tags.find((t) => t[0] === 'image')?.[1] || '/og-image.png';
    const publishedAtStr = ev.tags.find((t) => t[0] === 'published_at')?.[1];
    const publishedAt = publishedAtStr ? parseInt(publishedAtStr, 10) : ev.created_at;
    const tags = ev.tags.filter((t) => t[0] === 't').map((t) => t[1]);
    const slug = slugify(dTag || title);
    const html = await marked.parse(ev.content);
    const npub = hexToNpub(ev.pubkey);
    const naddr = encodeNaddr(30023, ev.pubkey, dTag, ['wss://relay.nostr.org.tr']);
    const words = ev.content.trim().split(/\s+/).length;
    const readingTime = `${Math.max(1, Math.ceil(words / 200))} dk`;

    posts.push({
      id: ev.id,
      pubkey: ev.pubkey,
      dTag,
      slug,
      title,
      summary: summary || (ev.content.slice(0, 160).replace(/[#*`_]/g, '') + '...'),
      image,
      publishedAt,
      createdAt: ev.created_at,
      tags: tags.length > 0 ? tags : ['nostrorgtr'],
      readingTime,
      author: {
        npub,
        hex: ev.pubkey,
        name: meta.display_name || meta.displayName || meta.name || known.name || 'Nostr Yazarı',
        role: known.role || meta.nip05 || 'Topluluk Yazarı',
        roleEn: known.roleEn || 'Community Contributor',
        bio: meta.about || meta.bio || known.bio || '',
        bioEn: meta.about || meta.bio || known.bioEn || '',
        nip05: meta.nip05 || known.nip05 || '',
        avatar: meta.picture || meta.image || known.avatar || '',
        lightningAddress: meta.lud16 || meta.lud06 || known.lightningAddress || '',
      },
      content: ev.content,
      html,
      naddr,
    });
  }

  // Sort by publishedAt descending
  posts.sort((a, b) => b.publishedAt - a.publishedAt);

  // Write to cache file
  fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(posts, null, 2) + '\n');
  console.log(`\n🎉 Successfully synced ${posts.length} articles to ${CACHE_FILE_PATH}`);
}

syncNostrBlog().catch((err) => {
  console.error('❌ Failed to sync blog posts:', err);
  process.exit(1);
});
