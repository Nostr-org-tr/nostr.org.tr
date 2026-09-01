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

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const RELAYS = [
  'wss://relay.nostr.org.tr',
  'wss://purplepag.es',
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.primal.net',
];

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
 * Safely read cached profile from sessionStorage
 */
function getCachedProfile(pubkeyHex: string): NostrProfileMeta | null {
  try {
    const raw = sessionStorage.getItem(`nostr_profile_${pubkeyHex}`);
    if (!raw) return null;
    const cached: CachedProfile = JSON.parse(raw);
    if (cached && cached.meta && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.meta;
    }
  } catch {
    // Storage access failure fallback
  }
  return null;
}

/**
 * Safely cache profile into sessionStorage
 */
function setCachedProfile(pubkeyHex: string, meta: NostrProfileMeta, createdAt: number): void {
  try {
    const cached: CachedProfile = {
      meta,
      created_at: createdAt,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(`nostr_profile_${pubkeyHex}`, JSON.stringify(cached));
  } catch {
    // Storage quota exceeded or disabled fallback
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
      if (avatarImg.src !== pictureUrl) {
        avatarImg.onload = () => {
          avatarImg.classList.remove('hidden');
          if (monogram) monogram.classList.add('hidden');
        };
        avatarImg.onerror = () => {
          avatarImg.classList.add('hidden');
          if (monogram) monogram.classList.remove('hidden');
        };
        avatarImg.src = pictureUrl;
      } else {
        avatarImg.classList.remove('hidden');
        if (monogram) monogram.classList.add('hidden');
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
 * Main function: queries Nostr relays for all cards with `data-npub` in DOM
 */
export function fetchNostrProfiles(selector = '[data-npub]'): void {
  if (typeof window === 'undefined') return;

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

  const subId = 'meta_' + Math.random().toString(36).slice(2, 9);
  const reqMessage = JSON.stringify([
    'REQ',
    subId,
    { kinds: [0], authors: pubkeysToFetch },
  ]);

  const latestEvents = new Map<string, { created_at: number; meta: NostrProfileMeta }>();
  const sockets: WebSocket[] = [];

  // Cleanup helper
  const closeAllSockets = () => {
    sockets.forEach((ws) => {
      try {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(['CLOSE', subId]));
        }
        ws.close();
      } catch {
        // Socket close safe ignore
      }
    });
    sockets.length = 0;
  };

  // Safe timeout after 6 seconds
  const timeoutId = setTimeout(closeAllSockets, 6000);

  let closedCount = 0;
  const onSocketDone = () => {
    closedCount++;
    if (closedCount >= RELAYS.length) {
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
          ws.send(reqMessage);
        } catch {
          // Send error
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (!Array.isArray(data)) return;

          const [msgType, msgSubId, nostrEvent] = data;

          if (msgType === 'EVENT' && msgSubId === subId && nostrEvent && nostrEvent.kind === 0 && nostrEvent.pubkey) {
            const pubkey = nostrEvent.pubkey;
            const createdAt = nostrEvent.created_at || 0;

            const existing = latestEvents.get(pubkey);
            if (!existing || createdAt > existing.created_at) {
              const meta: NostrProfileMeta = JSON.parse(nostrEvent.content);
              latestEvents.set(pubkey, { created_at: createdAt, meta });

              // Apply to all card elements associated with this pubkey
              const targetCards = pubkeyToCardsMap.get(pubkey);
              if (targetCards && targetCards.length) {
                targetCards.forEach((c) => applyProfileToElement(c, meta));
              }

              // Save to cache
              setCachedProfile(pubkey, meta, createdAt);
            }
          } else if (msgType === 'EOSE' && msgSubId === subId) {
            // Relay finished sending stored events
            try {
              ws.send(JSON.stringify(['CLOSE', subId]));
              ws.close();
            } catch {
              // Close safe ignore
            }
            onSocketDone();
          }
        } catch {
          // JSON parse or event handling safe ignore
        }
      };

      ws.onerror = () => {
        onSocketDone();
      };

      ws.onclose = () => {
        onSocketDone();
      };
    } catch {
      onSocketDone();
    }
  });
}
