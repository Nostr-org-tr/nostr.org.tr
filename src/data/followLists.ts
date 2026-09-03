export interface FollowProfile {
  name: string;
  npub: string;
  nip05?: string;
  bio: string;
  tags?: string[];
}

export interface FollowCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  profiles: FollowProfile[];
}

export const followCategories: FollowCategory[] = [
  {
    id: 'developers',
    title: 'Geliştiriciler & Mühendisler',
    description: 'Açık kaynak, dağıtık sistemler, Nostr protokolü ve istemci/araç geliştiren mühendisler.',
    icon: 'Code2',
    profiles: [
      {
        name: 'Emre Yılmaz',
        npub: 'npub1gmeu0wenescpjpymwmwgnkaedc6vy3aamf5tdtvxxf5z0yll3gdqatwl3v',
        nip05: 'delirehberi@emre.xyz',
        bio: 'Nostr Türkiye Topluluğu kurucusu, açık kaynak ve dağıtık sistemler geliştiricisi.',
        tags: ['Distributed Systems', 'Nostr', 'Open Source'],
      },
      {
        name: 'Selim',
        npub: 'npub13wnx7nyf0q6e2ltgae80d2l9nttk0dmvdrapjg7my8jl6kghtdssrlktxq',
        nip05: 'selim@tavux.tech',
        bio: 'Yazılım mühendisliği ve açık kaynak geliştirme.',
        tags: ['Engineering', 'Coding'],
      },
      {
        name: 'Skylords',
        npub: 'npub16ntyfte9h8u2pjpc90su57gcw2f9c7yzsjx6uyfpmaq3tfuxk7lq8ty8ka',
        nip05: 'skylords@iris.to',
        bio: 'Yazılım ve sistem mühendisliği.',
        tags: ['Engineering', 'Coding'],
      },
      {
        name: 'Özgür Vurgun',
        npub: 'npub1c0vwuenjv4uaaq2gdwg7rcq88t9k9mqnv2leftswn0kckx75g3ms8g9247',
        bio: 'Merkeziyetsiz ağ yapıları ve protokol geliştirme çalışmaları.',
        tags: ['Engineering', 'Protocols'],
      },
      {
        name: 'Arda Kılıçdağı',
        npub: 'npub193tc37dd6tter8hz35390xwfd7v39ps5lxs7hk3lh3adkzuvfwaselzjc4',
        bio: 'Yazılım mühendisi ve açık kaynak geliştirici.',
        tags: ['Engineering', 'Open Source'],
      },
      {
        name: 'Taylan',
        npub: 'npub1taylannruf6ctuml6jgrcx5ckm24syukthv6quwu4xfmccwmyqeqd4x3y7',
        nip05: 'taylan@stacker.news',
        bio: 'Stacker News yazılım mühendisi ve geliştirici.',
        tags: ['Stacker News', 'Engineering'],
      },
      {
        name: 'Eren Kaplan',
        npub: 'npub1mpw538yjh9rpamlcpv83rcjmlhgmr23n47xwqu4dr0pcf3g2u45q02cx2p',
        nip05: 'erenkaplan@stacker.news',
        bio: 'Stacker News yazılım mühendisi ve geliştirici.',
        tags: ['Stacker News', 'Engineering'],
      },
    ],
  },
  {
    id: 'academics',
    title: 'Akademi, Bilim & Araştırma',
    description: 'Kriptografi, ağ teorisi, bilim ve teknoloji üzerine çalışan araştırmacılar ve akademisyenler.',
    icon: 'GraduationCap',
    profiles: [
      {
        name: 'Mustafa Akman',
        npub: 'npub1zyaz5tyawj2k2y7a6wslszy9n329ykkvkz9sfg03czww5dyp8kxqceqj79',
        nip05: 'mustafaakman@nostr.org.tr',
        bio: 'Akademik araştırmalar, bilim ve teknoloji.',
        tags: ['Akademi', 'Research'],
      },
      {
        name: 'Nagihan Saka',
        npub: 'npub1trgd8vq9c5dhuzun9f2gha4hcll8dsuhyj873rdp9la0vayqc66sqsqwcj',
        nip05: 'nagihansaka@nostrplebs.com',
        bio: 'Akademisyen, bilimsel araştırmalar ve akademik çalışmalar.',
        tags: ['Akademi', 'Research'],
      },
      {
        name: 'Vezire',
        npub: 'npub1rycxjgs336r05p82qfkyqncxk059vc7gyfsea4l2n96hrsrx3rfq8npr3m',
        bio: 'Bilim, teknoloji ve araştırma odaklı paylaşımlar.',
        tags: ['Bilim', 'Teknoloji'],
      },
    ],
  },
  {
    id: 'community',
    title: 'Topluluk & İnisiyatifler',
    description: 'Nostr Türkiye ve açık web ekosistemini büyüten topluluk üyeleri ve inisiyatifler.',
    icon: 'Users',
    profiles: [
      {
        name: 'Nostr Türkiye',
        npub: 'npub1a5272jud2fdhl2jr4g2zyg0c8rzpt2kxnxamfe62zqzwfdl84huq2usgqp',
        nip05: 'topluluk@nostr.org.tr',
        bio: 'Nostr Türkiye Topluluğu resmi iletişim ve duyuru hesabı.',
        tags: ['Official', 'Community'],
      },
      {
        name: 'Fadime Nur Atsız (delibalized)',
        npub: 'npub1v29jexhde7w6gl6zz2zq9ulasfu8mtr4cdv4mvdueuahh24sg5hsf043ey',
        nip05: 'fadim@nostr.org.tr',
        bio: 'Nostr Türkiye topluluk üyesi ve öğrenci.',
        tags: ['Community', 'Student'],
      },
      {
        name: 'Webend',
        npub: 'npub13s9jca4p8upmvacgqq6rqrac059zh3dpf85r57flxl289uefqx5q8h58zy',
        bio: 'Açık web, geliştirici topluluğu ve inisiyatifler.',
        tags: ['Community', 'Web'],
      },
    ],
  },
  {
    id: 'professionals',
    title: 'Profesyoneller & Danışmanlık',
    description: 'Hukuk, danışmanlık ve diğer profesyonel alanlarda uzmanlaşmış Nostr kullanıcıları.',
    icon: 'Briefcase',
    profiles: [
      {
        name: 'Cumhur Özkeser',
        npub: 'npub1cmhrzksr0phayy7twm6zpypwsuhvje5n38xz54wdjxxe8rmue08q3a32xa',
        nip05: 'cmhrzksr@nostrpurple.com',
        bio: 'Bilişim ve teknoloji hukuku odaklı avukatlık ve danışmanlık.',
        tags: ['Hukuk', 'Law'],
      },
      {
        name: 'Aylin',
        npub: 'npub1uv2dkwecdl7lmws97g4tmucn8suv22zwsckq5py8qz37afq3gzpscmwdez',
        bio: 'Psikolojik danışmanlık ve rehberlik paylaşımları.',
        tags: ['Psikoloji', 'Danışmanlık'],
      },
    ],
  },
  {
    id: 'venues-brands',
    title: 'Mekanlar & İşletmeler',
    description: 'Nostr ve Bitcoin kabul eden ya da destekleyen fiziksel ve dijital mekanlar.',
    icon: 'Coffee',
    profiles: [
      {
        name: 'Manzara Cafe',
        npub: 'npub1manzaramnlvuhnyvc4pqrqdsws4697t09w0yft6lex6209rzw2ys04v8me',
        bio: 'Nostr ve Bitcoin dostu topluluk mekanı.',
        tags: ['Mekan', 'Cafe'],
      },
    ],
  },
  {
    id: 'bots',
    title: 'Haber Botları',
    description: 'Sanat, bilim ve teknoloji alanlarında otomatik haber ve içerik paylaşımı yapan bot hesaplar.',
    icon: 'Bot',
    profiles: [
      {
        name: 'Sanatsal',
        npub: 'npub1y8wzme3m8r70p6qpatzv5379kx3y9un4juth2pv6rvnp8ctewtssxstcy7',
        bio: 'Sanat, kültür ve estetik haberleri paylaşan Nostr botu.',
        tags: ['Sanat', 'Haber Botu'],
      },
      {
        name: 'Bilimsel',
        npub: 'npub1gk283y02l4mpdqahjfws8z8uptn94sdvz0vxfw3fqhtu3td7k4hs6lg7xl',
        bio: 'Bilim ve teknoloji keşifleri paylaşan haber botu.',
        tags: ['Bilim', 'Haber Botu'],
      },
      {
        name: 'Teknolojik',
        npub: 'npub1d3r0w9afccxq06tcfpa96juv75tx99jlhygh93ydttxcy6ulgmls35z948',
        bio: 'Güncel teknoloji, yapay zeka ve yazılım haberleri paylaşan haber botu.',
        tags: ['Teknoloji', 'Haber Botu'],
      },
    ],
  },
  {
    id: 'others',
    title: 'Diğer',
    description: 'Ekosistem katılımcıları, Zaps profilleri ve Fediverse köprü hesapları.',
    icon: 'Globe',
    profiles: [
      {
        name: 'Doğukan',
        npub: 'npub1hh36dnh4nuwl93qhfwq5wc9h0fkcu5qd7rkd8a2l7ldxm5tmw78qfsshdh',
        nip05: 'dogukan@nostrplebs.com',
        bio: 'Nostr ekosistemi ve topluluk katkıcısı.',
        tags: ['Nostr', 'Ekosistem'],
      },
      {
        name: 'Halima Samad',
        npub: 'npub14hkj2dtgkgxemzp50knquzxv3mh8f4gmdp3u2u27gad28tjmdtkqwyw3cq',
        nip05: 'halima.samad@zaps.lol',
        bio: 'Nostr küresel ekosistemi ve Zaps paylaşımları.',
        tags: ['Zaps', 'Ecosystem'],
      },
      {
        name: 'Taner',
        npub: 'npub1jlsclfkqvqhm38fl5yhzdvnzysyg7v324lsfleur78u2jdqmwnrsan3u7r',
        nip05: 'mimtaner0805@mastodon-com-tr.mostr.pub',
        bio: 'Nostr & Fediverse/Mastodon köprü paylaşımları.',
        tags: ['Fediverse', 'Mostr'],
      },
      {
        name: 'ProfAnarch',
        npub: 'npub1e7dsdk7muyx80cra5lyxjwjl6nxshal7v46fj0yt4pawf4jqpsrsk7u0wq',
        bio: 'Propertarianism, Privacy and Freedom Supremacism, Anarchism, Therefore Monero.',
        tags: ['Privacy', 'Freedom', 'Ecosystem'],
      },
    ],
  },
];
