export interface Member {
  name: string;
  role: string;
  roleEn: string;
  nip05?: string;
  npub: string;
  avatar?: string;
  bio: string;
  bioEn: string;
  lightningAddress?: string;
  isFounder?: boolean;
  socials?: {
    github?: string;
    website?: string;
  };
}

export const founder: Member = {
  name: 'Emre Yılmaz',
  role: 'Kurucu & Kolaylaştırıcı',
  roleEn: 'Founder & Community Facilitator',
  nip05: 'delirehberi@emre.xyz',
  npub: 'npub1gmeu0wenescpjpymwmwgnkaedc6vy3aamf5tdtvxxf5z0yll3gdqatwl3v',
  bio: 'Açık kaynak, dağıtık sistemler ve sansürsüz iletişim savunucusu. Nostr Türkiye topluluğunun kurucusu.',
  bioEn: 'Open source advocate, distributed systems engineer, and founder of Nostr Türkiye Community.',
  lightningAddress: 'delirehberi@emre.xyz',
  isFounder: true,
  socials: {
    github: 'https://github.com/delirehberi',
    website: 'https://emre.xyz',
  },
};

export const members: Member[] = [
  founder,
  {
    name: 'Delibalized',
    role: 'Topluluk Üyesi & Katkıcı',
    roleEn: 'Community Contributor',
    npub: 'npub1v29jexhde7w6gl6zz2zq9ulasfu8mtr4cdv4mvdueuahh24sg5hsf043ey',
    bio: 'Nostr ekosistemi ve merkeziyetsiz protokoller üzerine aktif topluluk üyesi ve üretici.',
    bioEn: 'Active community member and creator in the Nostr ecosystem.',
  },
  {
    name: 'Özgür Vurgun',
    role: 'Topluluk Üyesi & Katkıcı',
    roleEn: 'Community Contributor',
    npub: 'npub1c0vwuenjv4uaaq2gdwg7rcq88t9k9mqnv2leftswn0kckx75g3ms8g9247',
    bio: 'Açık internet ve Nostr protokolü üzerine araştırmalar yapan ve geliştiren topluluk üyesi.',
    bioEn: 'Community member researching and building on the Nostr protocol.',
  },
];

export const workingGroups = [
  {
    id: 'tech',
    title: 'Yazılım & Teknoloji Guildi',
    description: 'Röle yönetimi, NIP geliştirmeleri, Nostr botları ve açık kaynak araçların geliştirilmesi.',
    icon: 'Terminal',
  },
  {
    id: 'content',
    title: 'İçerik & Eğitim Guildi',
    description: 'Türkçe dokümantasyon, rehberler, çeviriler ve Nostr eğitim materyallerinin hazırlanması.',
    icon: 'BookOpen',
  },
  {
    id: 'events',
    title: 'Etkinlik & Konuşmalar Guildi',
    description: 'Fiziksel ve çevrim içi buluşmalar, hackathonlar, üniversite seminerleri ve sunumlar.',
    icon: 'Mic',
  },
  {
    id: 'design',
    title: 'Tasarım & UI/UX Guildi',
    description: 'Topluluk materyalleri, görsel kimlik, infografikler ve kullanıcı arayüzü iyileştirmeleri.',
    icon: 'Palette',
  },
];
