export interface BlossomServerInfo {
  url: string;
  name: string;
  description: string;
  readPolicy: 'open' | 'restricted' | 'paid';
  uploadPolicy: 'open' | 'whitelist' | 'auth' | 'paid';
  location: string;
  isOfficialCommunityServer: boolean;
  buds: string[];
  mirrorRecommendations?: string[];
}

export const communityBlossomServer: BlossomServerInfo = {
  url: 'https://media.nostr.org.tr',
  name: 'Nostr Türkiye Resmi Blossom Medya Sunucusu',
  description: 'Nostr Türkiye topluluğunun resmi Blossom blob depolama ve medya sunucusu. SHA-256 hash tabanlı içerik adresleme, Nostr anahtarları ile kimlik doğrulama (BUD-01 auth event) ve sansürsüz, yüksek hızlı medya barındırma.',
  readPolicy: 'open',
  uploadPolicy: 'auth',
  location: 'Türkiye / Frankfurt (Düşük Gecikme)',
  isOfficialCommunityServer: true,
  buds: ['BUD-01', 'BUD-02', 'BUD-04', 'BUD-06'],
  mirrorRecommendations: [
    'https://cdn.satellite.earth',
    'https://nostr.download',
    'https://blossom.primal.net',
  ],
};

export const recommendedBlossomServers: BlossomServerInfo[] = [
  communityBlossomServer,
  {
    url: 'https://cdn.satellite.earth',
    name: 'Satellite CDN / Blossom',
    description: 'Küresel ve popüler Blossom medya dağıtım ve ayna (mirror) sunucusu.',
    readPolicy: 'open',
    uploadPolicy: 'paid',
    location: 'Küresel',
    isOfficialCommunityServer: false,
    buds: ['BUD-01', 'BUD-02', 'BUD-04'],
  },
  {
    url: 'https://nostr.download',
    name: 'Nostr Download Blossom',
    description: 'Açık topluluk Blossom blob ve dosya sunucusu.',
    readPolicy: 'open',
    uploadPolicy: 'open',
    location: 'Avrupa',
    isOfficialCommunityServer: false,
    buds: ['BUD-01', 'BUD-02', 'BUD-04'],
  },
  {
    url: 'https://blossom.primal.net',
    name: 'Primal Blossom Cache',
    description: 'Primal ekosistemi yüksek hızlı medya önbellek ve blob sunucusu.',
    readPolicy: 'open',
    uploadPolicy: 'open',
    location: 'Küresel',
    isOfficialCommunityServer: false,
    buds: ['BUD-01', 'BUD-02'],
  },
];
