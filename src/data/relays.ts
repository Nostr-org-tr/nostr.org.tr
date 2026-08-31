export interface RelayInfo {
  url: string;
  name: string;
  description: string;
  readPolicy: 'open' | 'restricted' | 'paid';
  writePolicy: 'open' | 'whitelist' | 'paid';
  nips: number[];
  location: string;
  software: string;
  isOfficialCommunityRelay: boolean;
}

export const communityRelay: RelayInfo = {
  url: 'wss://relay.nostr.org.tr',
  name: 'Nostr Türkiye Resmi Topluluk Rölesi',
  description: 'Nostr Türkiye topluluğunun resmi rölesi. Okuma herkese açıktır. Yazma izni spam ve bot kirliliğini önlemek amacıyla topluluk üyelerine whitelist ile verilir.',
  readPolicy: 'open',
  writePolicy: 'whitelist',
  nips: [1, 2, 4, 9, 11, 12, 15, 16, 20, 22, 28, 33, 40, 42, 50, 56, 57],
  location: 'Türkiye / Frankfurt (Düşük Gecikme)',
  software: 'Khatru / Nostr-RS-Relay',
  isOfficialCommunityRelay: true,
};

export const recommendedRelays: RelayInfo[] = [
  communityRelay,
  {
    url: 'wss://relay.damus.io',
    name: 'Damus Relay',
    description: 'Küresel ve geniş kapsamlı açık Nostr rölesi.',
    readPolicy: 'open',
    writePolicy: 'open',
    nips: [1, 2, 9, 11, 12, 16, 20, 22, 33, 40, 42],
    location: 'Küresel',
    software: 'strfry',
    isOfficialCommunityRelay: false,
  },
  {
    url: 'wss://nos.lol',
    name: 'Nos.lol Relay',
    description: 'Yüksek performanslı ve stabil küresel röle.',
    readPolicy: 'open',
    writePolicy: 'open',
    nips: [1, 2, 9, 11, 12, 16, 20, 22, 33, 40, 42, 50],
    location: 'Avrupa / Küresel',
    software: 'strfry',
    isOfficialCommunityRelay: false,
  },
  {
    url: 'wss://relay.primal.net',
    name: 'Primal Relay Cache',
    description: 'Primal ekosistemi tarafından sağlanan optimize edilmiş önbellek rölesi.',
    readPolicy: 'open',
    writePolicy: 'open',
    nips: [1, 2, 9, 11, 12, 16, 20, 22, 33, 40],
    location: 'Küresel',
    software: 'custom-primal',
    isOfficialCommunityRelay: false,
  },
];
