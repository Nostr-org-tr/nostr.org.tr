/**
 * Nostr Profile Fetcher
 * Fetches Kind 0 (set_metadata) events from the Nostr network and dynamically
 * populates avatar, bio, display name, NIP-05, and Lightning address on profile cards.
 */

export interface NostrProfileMeta {
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
  banner?: string;
  website?: string;
}

interface CachedProfile {
  meta: NostrProfileMeta;
  created_at: number;
  timestamp: number;
}

const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours TTL
const RELAYS = [
  'wss://relay.nostr.org.tr',
  'wss://purplepag.es',
  'wss://relay.primal.net',
  'wss://nos.lol',
  'wss://relay.damus.io',
  'wss://user.kindpag.es',
  'wss://relay.mostr.pub',
];

const memoryCache = new Map<string, CachedProfile>();

/**
 * Pure Bech32 npub to 32-byte hex converter for client-side execution
 */
export function npubToHex(npub: string): string | null {
  if (!npub || typeof npub !== 'string') return null;
  const clean = npub.trim().toLowerCase();
  if (!clean.startsWith('npub1')) return null;

  const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
  const data = clean.slice(5);
  const words: number[] = [];

  for (let i = 0; i < data.length; i++) {
    const d = CHARSET.indexOf(data[i]);
    if (d === -1) return null;
    words.push(d);
  }

  if (words.length <= 6) return null;
  const decoded = words.slice(0, -6);

  let acc = 0;
  let bits = 0;
  const bytes: number[] = [];

  for (let i = 0; i < decoded.length; i++) {
    acc = (acc << 5) | decoded[i];
    bits += 5;
    while (bits >= 8) {
      bits -= 8;
      bytes.push((acc >> bits) & 0xff);
    }
  }

  if (bytes.length !== 32) return null;
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Safely read cached profile from localStorage with memory fallback
 */
function getCachedProfile(pubkeyHex: string): NostrProfileMeta | null {
  const mem = memoryCache.get(pubkeyHex);
  if (mem && Date.now() - mem.timestamp < CACHE_TTL_MS) {
    return mem.meta;
  }

  try {
    const raw = localStorage.getItem(`nostr_profile_${pubkeyHex}`);
    if (!raw) return null;
    const cached: CachedProfile = JSON.parse(raw);
    if (cached && cached.meta && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      memoryCache.set(pubkeyHex, cached);
      return cached.meta;
    }
  } catch {
    // Storage access fallback
  }
  return null;
}

/**
 * Safely cache profile into localStorage with memory fallback
 */
function setCachedProfile(pubkeyHex: string, meta: NostrProfileMeta, createdAt: number): void {
  const item: CachedProfile = {
    meta,
    created_at: createdAt,
    timestamp: Date.now(),
  };
  memoryCache.set(pubkeyHex, item);

  try {
    localStorage.setItem(`nostr_profile_${pubkeyHex}`, JSON.stringify(item));
  } catch {
    // Storage quota fallback
  }
}

/**
 * Apply parsed Nostr profile metadata to a card DOM element
 */
export function applyProfileToElement(card: HTMLElement, meta: NostrProfileMeta): void {
  if (!card || !meta) return;

  // 1. Avatar Picture
  const pictureUrl = (meta.picture || meta.image || '').trim();
  if (pictureUrl && pictureUrl.startsWith('http')) {
    const avatarImg = card.querySelector<HTMLImageElement>('.member-avatar, .profile-avatar');
    const monogram = card.querySelector<HTMLElement>('.member-monogram, .profile-monogram');

    if (avatarImg) {
      avatarImg.onload = () => {
        avatarImg.classList.remove('hidden');
        if (monogram) monogram.classList.add('hidden');
      };
      avatarImg.onerror = () => {
        avatarImg.classList.add('hidden');
        if (monogram) monogram.classList.remove('hidden');
      };

      if (avatarImg.src !== pictureUrl) {
        avatarImg.src = pictureUrl;
      }

      if (avatarImg.complete) {
        if (avatarImg.naturalWidth > 0) {
          avatarImg.classList.remove('hidden');
          if (monogram) monogram.classList.add('hidden');
        } else {
          avatarImg.classList.add('hidden');
          if (monogram) monogram.classList.remove('hidden');
        }
      }
    }
  }

  // 2. Display Name / Name
  const displayName = (meta.display_name || meta.displayName || meta.name || '').trim();
  if (displayName) {
    const nameEl = card.querySelector<HTMLElement>('.member-name, .profile-name');
    if (nameEl) {
      nameEl.textContent = displayName;
    }
  }

  // 3. Bio / About
  const about = (meta.about || meta.bio || '').trim();
  if (about) {
    const bioEl = card.querySelector<HTMLElement>('.member-bio, .profile-bio');
    if (bioEl) {
      bioEl.textContent = about;
    }
  }

  // 4. NIP-05 Identifier
  const nip05 = (meta.nip05 || '').trim();
  if (nip05) {
    const nip05Text = card.querySelector<HTMLElement>('.member-nip05, .profile-nip05');
    const nip05Dyn = card.querySelector<HTMLElement>('.member-nip05-dyn, .profile-nip05-dyn');

    if (nip05Text) nip05Text.textContent = nip05;
    if (nip05Dyn) nip05Dyn.classList.remove('hidden');
  }

  // 5. Lightning Address (lud16 or lud06)
  const lud16 = (meta.lud16 || meta.lud06 || '').trim();
  if (lud16) {
    const lud16Text = card.querySelector<HTMLElement>('.member-lud16, .profile-lud16');
    const lud16Dyn = card.querySelector<HTMLElement>('.member-lightning-dyn, .profile-lightning-dyn');

    if (lud16Text) lud16Text.textContent = lud16;
    if (lud16Dyn) {
      lud16Dyn.classList.remove('hidden');
      const dynCopyBtn = lud16Dyn.querySelector<HTMLButtonElement>('.copy-btn');
      if (dynCopyBtn) {
        dynCopyBtn.setAttribute('data-copy-text', lud16);
      }
    }
  }
}

/**
 * Split array into chunks for safe relay querying
 */
function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Main function: queries Nostr relays for all cards with `data-npub` in DOM
 */
export function fetchNostrProfiles(selector = '[data-npub]'): void {
  if (typeof window === 'undefined') return;

  const execute = () => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!cards.length) return;

    const pubkeyToCardsMap = new Map<string, HTMLElement[]>();
    const pubkeysToFetch: string[] = [];

    cards.forEach((card) => {
      const npub = card.getAttribute('data-npub');
      if (!npub) return;

      const hex = npubToHex(npub);
      if (!hex) return;

      const existingList = pubkeyToCardsMap.get(hex) || [];
      existingList.push(card);
      pubkeyToCardsMap.set(hex, existingList);

      // Apply cached data immediately for zero-delay display
      const cached = getCachedProfile(hex);
      if (cached) {
        applyProfileToElement(card, cached);
      }

      if (!pubkeysToFetch.includes(hex)) {
        pubkeysToFetch.push(hex);
      }
    });

    if (!pubkeysToFetch.length) return;

    const subIdPrefix = 'p_' + Math.random().toString(36).slice(2, 7);
    const chunks = chunkArray(pubkeysToFetch, 10);
    const latestEvents = new Map<string, { created_at: number; meta: NostrProfileMeta }>();
    const sockets: WebSocket[] = [];
    const finishedRelays = new Set<string>();

    // Cleanup helper
    const closeAllSockets = () => {
      sockets.forEach((ws) => {
        try {
          if (ws.readyState === WebSocket.OPEN) {
            chunks.forEach((_, idx) => {
              try {
                ws.send(JSON.stringify(['CLOSE', `${subIdPrefix}_${idx}`]));
              } catch {
                // Ignore
              }
            });
          }
          ws.close();
        } catch {
          // Socket close safe ignore
        }
      });
      sockets.length = 0;
    };

    // Safe timeout after 8 seconds
    const timeoutId = setTimeout(closeAllSockets, 8000);

    const onRelayFinished = (relayUrl: string) => {
      finishedRelays.add(relayUrl);
      if (finishedRelays.size >= RELAYS.length) {
        clearTimeout(timeoutId);
        closeAllSockets();
      }
    };

    RELAYS.forEach((relayUrl) => {
      try {
        const ws = new WebSocket(relayUrl);
        sockets.push(ws);

        ws.onopen = () => {
          try {
            chunks.forEach((chunk, idx) => {
              const req = JSON.stringify([
                'REQ',
                `${subIdPrefix}_${idx}`,
                { kinds: [0], authors: chunk },
              ]);
              ws.send(req);
            });
          } catch {
            // Send error
          }
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (!Array.isArray(data)) return;

            const [msgType, msgSubId, nostrEvent] = data;

            if (
              msgType === 'EVENT' &&
              typeof msgSubId === 'string' &&
              msgSubId.startsWith(subIdPrefix) &&
              nostrEvent &&
              nostrEvent.kind === 0 &&
              nostrEvent.pubkey
            ) {
              const pubkey = nostrEvent.pubkey;
              const createdAt = nostrEvent.created_at || 0;

              const existing = latestEvents.get(pubkey);
              if (!existing || createdAt > existing.created_at) {
                try {
                  const meta: NostrProfileMeta = JSON.parse(nostrEvent.content);
                  latestEvents.set(pubkey, { created_at: createdAt, meta });

                  // Apply to all card elements associated with this pubkey
                  const targetCards = pubkeyToCardsMap.get(pubkey);
                  if (targetCards && targetCards.length) {
                    targetCards.forEach((c) => applyProfileToElement(c, meta));
                  }

                  // Save to cache
                  setCachedProfile(pubkey, meta, createdAt);
                } catch {
                  // Ignore bad JSON inside kind 0 event
                }
              }
            } else if (
              msgType === 'EOSE' &&
              typeof msgSubId === 'string' &&
              msgSubId.startsWith(subIdPrefix)
            ) {
              // Received EOSE for one chunk
              try {
                ws.send(JSON.stringify(['CLOSE', msgSubId]));
              } catch {
                // Ignore
              }
            }
          } catch {
            // JSON parse safe ignore
          }
        };

        ws.onerror = () => {
          onRelayFinished(relayUrl);
        };

        ws.onclose = () => {
          onRelayFinished(relayUrl);
        };
      } catch {
        onRelayFinished(relayUrl);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', execute, { once: true });
  } else {
    execute();
  }
}
