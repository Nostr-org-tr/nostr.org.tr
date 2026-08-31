export interface ProjectItem {
  name: string;
  category: 'Migration' | 'Automation' | 'Client' | 'Protocol' | 'Bot' | 'Tool';
  description: string;
  url: string;
  previewUrl?: string;
  github?: string;
  gitworkshop?: string;
  isFeatured?: boolean;
  author: string;
  tags: string[];
}

export const projects: ProjectItem[] = [
  {
    name: 'Snippets',
    category: 'Tool',
    description: 'An open-source, decentralized code snippet sharing platform built on Nostr (NIP-C0: kind:1337), powered by Cloudflare Workers, Hono, React 19, and Tailwind CSS.',
    url: 'https://gitworkshop.dev/delirehberi@emre.xyz/relay.ngit.dev/Snippets',
    gitworkshop: 'https://gitworkshop.dev/delirehberi@emre.xyz/relay.ngit.dev/Snippets',
    isFeatured: true,
    author: 'Emre Yılmaz (@delirehberi)',
    tags: ['NIP-C0', 'kind:1337', 'Cloudflare Workers', 'Hono', 'React 19', 'Tailwind CSS'],
  },
  {
    name: 'x2nostr',
    category: 'Migration',
    description: 'GitHub, Spotify, IMDb, Goodreads ve benzeri platformlardan Nostr ağına içerik, profil ve veri göçünü kolaylaştıran kapsamlı taşıma aracı.',
    url: 'https://x2nostr.emre.xyz',
    isFeatured: true,
    author: 'Emre Yılmaz (@delirehberi)',
    tags: ['Migration', 'Cross-posting', 'Social Bridge', 'NIP-01'],
  },
  {
    name: 'Bridge by Workouse',
    category: 'Automation',
    description: 'Nostr için Zapier benzeri entegrasyon ve otomasyon platformu. Webhooklar, RSS beslemeleri, bildirimler ve üçüncü taraf servisleri Nostr protokolüne bağlar.',
    url: 'https://bridge.workouse.com',
    isFeatured: true,
    author: 'Workouse',
    tags: ['Automation', 'Zapier Alternative', 'Webhooks', 'Relay Bridge'],
  },
  {
    name: 'Readonly Nostr Web Client',
    category: 'Client',
    description: 'Readonly nostr client for a single user with standalone responsive web preview.',
    url: 'https://gitworkshop.dev/delirehberi@emre.xyz/relay.ngit.dev/Readonly-Nostr-Web-Client',
    previewUrl: 'https://nostr.emre.xyz',
    gitworkshop: 'https://gitworkshop.dev/delirehberi@emre.xyz/relay.ngit.dev/Readonly-Nostr-Web-Client',
    isFeatured: false,
    author: 'Emre Yılmaz (@delirehberi)',
    tags: ['Client', 'Readonly', 'Web', 'NIP-01'],
  },
  {
    name: 'nostr-hs',
    category: 'Protocol',
    description: 'A NIP-01 compliant Nostr library and client implementation in Haskell.',
    url: 'https://gitworkshop.dev/delirehberi@emre.xyz/relay.ngit.dev/nostr-hs',
    gitworkshop: 'https://gitworkshop.dev/delirehberi@emre.xyz/relay.ngit.dev/nostr-hs',
    isFeatured: false,
    author: 'Emre Yılmaz (@delirehberi)',
    tags: ['Haskell', 'NIP-01', 'Protocol', 'Library'],
  },
  {
    name: 'hugo2nostr',
    category: 'Tool',
    description: 'A CLI tool that bridges Hugo static sites and the Nostr network. Publish your blog posts as kind:30023 long-form articles, sync posts back from relays, and manage deletions — all from one command.',
    url: 'https://gitworkshop.dev/delirehberi@emre.xyz/relay.ngit.dev/hugo2nostr',
    gitworkshop: 'https://gitworkshop.dev/delirehberi@emre.xyz/relay.ngit.dev/hugo2nostr',
    isFeatured: false,
    author: 'Emre Yılmaz (@delirehberi)',
    tags: ['CLI', 'Hugo', 'kind:30023', 'Long-form', 'Sync'],
  },
  {
    name: 'nostr.org.tr',
    category: 'Tool',
    description: 'Nostr Türkiye Topluluğu resmi web portalı ve açık kaynak altyapısı.',
    url: 'https://nostr.org.tr',
    github: 'https://github.com/delirehberi/nostr.org.tr',
    isFeatured: false,
    author: 'Nostr Türkiye Topluluğu',
    tags: ['Astro', 'Cloudflare Workers', 'D1', 'Community'],
  },
  {
    name: 'Nostr Relay Tester',
    category: 'Tool',
    description: 'Tarayıcı üzerinden doğrudan WebSocket bağlantılarını ve NIP desteğini sınayan tanı ve gecikme ölçüm aracı.',
    url: 'https://nostr.org.tr/roleler',
    isFeatured: false,
    author: 'Nostr Türkiye Topluluğu',
    tags: ['WebSocket', 'Latency', 'Diagnostics'],
  },
];
