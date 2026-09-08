import { npubToHex } from '../utils/nostrKey';
import { members } from './members';

export interface BlogAuthor {
  npub: string;
  hex: string;
  name: string;
  role?: string;
  roleEn?: string;
  bio?: string;
  bioEn?: string;
  nip05?: string;
  avatar?: string;
  lightningAddress?: string;
}

// Convert known community members to blog authors with both hex and npub
export const BLOG_AUTHORS: BlogAuthor[] = members.map((m) => {
  let hex = '';
  try {
    hex = npubToHex(m.npub);
  } catch {
    hex = '';
  }
  return {
    npub: m.npub,
    hex,
    name: m.name,
    role: m.role,
    roleEn: m.roleEn,
    bio: m.bio,
    bioEn: m.bioEn,
    nip05: m.nip05,
    avatar: m.avatar,
    lightningAddress: m.lightningAddress,
  };
}).filter((a) => Boolean(a.hex));

// Target hashtags for filtering community long-form articles (NIP-23 kind 30023)
export const BLOG_TAGS = ['nostrorgtr', 'nostrturkiye', 'nostr-tr'];

// Dedicated relay pool for fetching community blog articles
export const BLOG_FETCH_RELAYS = [
  'wss://relay.nostr.org.tr',
  'wss://relay.damus.io',
  'wss://nos.lol',
];

// Default alias for fetching
export const BLOG_RELAYS = BLOG_FETCH_RELAYS;

// Extended relay pool for live comments & discussion (NIP-22 & NIP-10)
export const BLOG_COMMENT_RELAYS = [
  'wss://relay.nostr.org.tr',
  'wss://nos.lol',
  'wss://relay.damus.io',
  'wss://relay.primal.net',
  'wss://purplepag.es',
];

// External web clients to view / interact with NIP-23 articles
export const NOSTR_CLIENT_BRIDGES = [
  {
    name: 'Habla',
    urlTemplate: (naddr: string) => `https://habla.news/a/${naddr}`,
    description: 'Nostr odaklı uzun form okuma ve yazma istemcisi',
  },
  {
    name: 'Yakihonne',
    urlTemplate: (naddr: string) => `https://yakihonne.com/article/${naddr}`,
    description: 'Nostr medya ve makale yayınlama platformu',
  },
  {
    name: 'Primal',
    urlTemplate: (naddr: string) => `https://primal.net/e/${naddr}`,
    description: 'Hızlı ve modern Nostr web istemcisi',
  },
  {
    name: 'Coracle',
    urlTemplate: (naddr: string) => `https://coracle.social/${naddr}`,
    description: 'Gelişmiş merkeziyetsiz Nostr istemcisi',
  },
];
