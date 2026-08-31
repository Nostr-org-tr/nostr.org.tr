export interface TalkItem {
  id: string;
  title: string;
  speaker: string;
  event: string;
  date: string;
  location: string;
  slidesUrl: string;
  videoUrl?: string;
  description: string;
  topics: string[];
}

export const talks: TalkItem[] = [
  {
    id: 'devfest-istanbul-2025',
    title: 'Nostr: A Protocol for Freedom of Speech',
    speaker: 'Emre Yılmaz (@delirehberi)',
    event: 'DevFest Istanbul 2025',
    date: '2025',
    location: 'İstanbul, Türkiye',
    slidesUrl: 'https://www.slideshare.net/slideshow/nostr-a-protocol-for-freedom-of-speech/284524621',
    description:
      'Merkezi platformların sansür, veri tekeli ve algoritma manipülasyonlarına karşı; Nostr protokolünün açık, basit ve dayanıklı mimarisi, kimlik egemenliği (public key cryptography) ve iletişim özgürlüğünün geleceği üzerine kapsamlı sunum.',
    topics: [
      'Nostr Protocol Architecture',
      'Decentralized Relays & WebSocket',
      'Public Key Cryptography',
      'Censorship Resistance',
      'Lightning Network & Zaps',
      'Do-ocracy & Open Source',
    ],
  },
];
