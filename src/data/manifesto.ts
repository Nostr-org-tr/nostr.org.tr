export interface ManifestoPillar {
  number: number;
  titleTr: string;
  titleEn: string;
  subtitleTr: string;
  subtitleEn: string;
  itemsTr: { title: string; body: string }[];
  itemsEn: { title: string; body: string }[];
}

export const manifestoData: {
  titleTr: string;
  titleEn: string;
  leadTr: string;
  leadEn: string;
  pillars: ManifestoPillar[];
  conclusionTr: { lead: string; quote: string; invite: string };
  conclusionEn: { lead: string; quote: string; invite: string };
} = {
  titleTr: 'Nostr Türkiye Topluluk Manifestosu: Özgür, Açık ve Sorumlu İletişimin Geleceği',
  titleEn: 'Nostr Türkiye Community Manifesto: The Future of Free, Open, and Responsible Communication',
  leadTr:
    'Bizler, dijital dünyada iletişimin platformların ve algoritmaların kontrolünde değil, bireylerin özgür iradesinde olması gerektiğine inanan bağımsız bir topluluğuz. İnternetin ilk günlerindeki açık, sansürsüz ve demokratik ruhunu günümüz teknolojisiyle yeniden canlandırmak için buradayız.',
  leadEn:
    'We are an independent community believing that digital communication must be guided by individual free will, not controlled by corporate platforms and opaque algorithms. We are here to revitalize the open, uncensored, and democratic spirit of the early internet through modern protocol technology.',
  pillars: [
    {
      number: 1,
      titleTr: 'Temel İlke ve Özgürlükler',
      titleEn: 'Foundational Principles & Freedoms',
      subtitleTr: 'Bireysel egemenlik, veri mülkiyeti ve açık ifade',
      subtitleEn: 'Individual sovereignty, data ownership, and open expression',
      itemsTr: [
        {
          title: 'Kimlik ve Veri Özgürlüğü',
          body: 'Sosyal medya şirketlerinin birer ürünü veya kullanıcısı değil, kendi dijital kimliğinin (public key) tek sahibisin. Nostr ekosisteminde verilerin şirket sunucularına hapsolmaz; sansürlenemez, satılamaz ve hesabın üçüncü tarafların kararıyla dondurulamaz.',
        },
        {
          title: 'Algoritmalardan Bağımsızlık',
          body: 'Dikkatimizi ticari kaygılarla manipüle eden kapalı algoritmaları reddediyoruz. Nostr, merkeziyetsiz röle (relay) mimarisiyle akışını ve etkileşimini senin kontrolüne bırakır.',
        },
        {
          title: 'Tarafsız Protokol, Tek İdeoloji: Özgürlük',
          body: 'Nostr bir platform veya şirket değil, açık bir protokoldür. Protokolün kendisi herhangi bir siyasi, dini veya kültürel ideolojiyi temsil etmez. Nostr’ın tek ideolojisi bireysel özgürlük ve açık iletişimdir.',
        },
        {
          title: 'İfadelerin ve Fikirlerin Özgürlüğü',
          body: 'Fikirlerin serbestçe ifade edilebilmesini, tartışılabilmesini ve çeşitliliği savunuyoruz. Düşünce özgürlüğü, gelişimin ve açık internetin temel taşıdır.',
        },
      ],
      itemsEn: [
        {
          title: 'Identity & Data Sovereignty',
          body: 'You are not a product or tenant of social media corporations; you are the sole sovereign owner of your digital identity (public key). In Nostr, your data is never locked in corporate servers; it cannot be censored, sold, or arbitrarily frozen by third parties.',
        },
        {
          title: 'Algorithmic Independence',
          body: 'We reject closed algorithms designed to manipulate human attention for advertising profit. Nostr puts your feed, connections, and interactions entirely under your own control through decentralized relays.',
        },
        {
          title: 'Neutral Protocol, One Ideology: Freedom',
          body: 'Nostr is not a company or siloed platform; it is an open standard. The protocol itself represents no political, religious, or cultural agenda. Its only ideology is individual liberty and open communication.',
        },
        {
          title: 'Freedom of Ideas & Expression',
          body: 'We champion the free expression and open discourse of diverse ideas. Intellectual freedom is the indispensable foundation of human progress and an open web.',
        },
      ],
    },
    {
      number: 2,
      titleTr: 'Örgütlenme Modeli: Hiyerarşisiz ve Katkı Odaklı (Doakrasi)',
      titleEn: 'Organizational Model: Non-Hierarchical & Contribution-Driven (Do-ocracy)',
      subtitleTr: 'Katı makamlar yok; üreten, sorumluluk alan herkes yönlendiricidir',
      subtitleEn: 'No rigid titles; whoever takes action and creates value leads the way',
      itemsTr: [
        {
          title: 'Emeğe ve Katkıya Dayalı Liderlik',
          body: 'Topluluğumuz katı makamlar, unvanlar veya dikey hiyerarşiler ile yönetilmez. Hiyerarşi yoktur; sorumluluk alan, üreten ve katkı sağlayan herkes topluluğun doğal yönlendiricisidir.',
        },
        {
          title: 'Çalışma Grupları (Guilds)',
          body: 'Yazılım/Teknoloji, İçerik/Eğitim, Moderasyon/Etkinlik ve Tasarım gibi alanlarda bağımsız hareket edebilen, esnek çalışma gruplarıyla organize oluruz.',
        },
        {
          title: 'Fikir Birliği ve Kolaylaştırıcılık',
          body: 'Kararlar, katı yönetici talimatlarıyla değil; kaba fikir birliği (rough consensus) ve açık tartışma süreçleriyle alınır. Kurucu ve kolaylaştırıcıların rolü emir vermek değil, topluluğun yolunu açmak ve manifestoyu korumaktır.',
        },
      ],
      itemsEn: [
        {
          title: 'Merit & Contribution-Based Leadership',
          body: 'Our community is not governed by rigid corporate hierarchies or permanent titles. There is no top-down command; whoever assumes responsibility, produces code, writes guides, or organizes becomes an organic facilitator.',
        },
        {
          title: 'Autonomous Working Groups (Guilds)',
          body: 'We organize through flexible, self-organizing groups spanning Software/Core Protocol, Content/Education, Events/Community, and Design/UI.',
        },
        {
          title: 'Rough Consensus & Facilitation',
          body: 'Decisions are reached not by executive mandates, but through open discussion and rough consensus. The role of founders and facilitators is to remove friction, empower contributors, and steward the community manifesto.',
        },
      ],
    },
    {
      number: 3,
      titleTr: 'Sorumluluk Sınırları ve Hukuki Çerçeve',
      titleEn: 'Boundaries of Responsibility & Legal Framework',
      subtitleTr: 'Yasalara saygı ve bireysel eylem sorumluluğu',
      subtitleEn: 'Compliance with applicable laws and personal accountability',
      itemsTr: [
        {
          title: 'Hukuka Saygı ve Yasal Çerçeve',
          body: 'Nostr Türkiye topluluğu olarak, faaliyet gösterdiğimiz Türkiye Cumhuriyeti’nin yasalarına ve hukuki düzenlemelerine saygı duyuyoruz. Oluşturduğumuz veya yönettiğimiz tüm topluluk mecraları (Telegram, Discord, web siteleri, etkinlik alanları vb.) T.C. kanunlarına ve mevzuatına tam uyum içerisinde hareket eder.',
        },
        {
          title: 'Ne Yasa Koyucuyuz Ne De Yargıç',
          body: 'Topluluk yönetimi ve üyeleri olarak kendimizi yasa koyucu veya yargı otoritesi konumında görmüyoruz. Ağ üzerindeki bireysel kullanıcıların eylemlerini yargılamak, cezalandırmak veya düzenlemek bizim yetkimizde ve görev alanımızda değildir.',
        },
        {
          title: 'Ağın Doğası ve Bireysel Sorumluluk',
          body: 'Nostr, yapısı gereği aracıları ortadan kaldırır. Bu doğası gereği, ağ üzerinde üretilen içeriklerin, kurulan etkileşimlerin ve yaşanabilecek hukuki veya kişisel sorunların muhatabı doğrudan içeriği üreten bireylerdir. Bireylerin eylemlerinden doğabilecek hukuki veya cezai sorumluluklar topluluğumuzun sorumluluk alanında değildir.',
        },
      ],
      itemsEn: [
        {
          title: 'Respect for Legal Standards',
          body: 'As the Nostr Türkiye community, we operate with full respect for the statutory laws and legal frameworks of the Republic of Türkiye. All community-managed platforms, websites, and events comply rigorously with applicable laws.',
        },
        {
          title: 'Neither Lawmakers Nor Judges',
          body: 'Community facilitators and members do not assume the role of legal or judicial authorities. Monitoring, policing, or judging independent network participants is neither our prerogative nor within our mandate.',
        },
        {
          title: 'Decentralized Nature & Individual Accountability',
          body: 'By architectural design, Nostr eliminates centralized intermediaries. Authors and key-holders are solely and directly responsible for the content they broadcast and interactions they initiate. Individual legal liabilities remain strictly with the actors themselves.',
        },
      ],
    },
    {
      number: 4,
      titleTr: 'Topluluk Kültürü, Temsil ve Etik',
      titleEn: 'Community Culture, Representation & Ethics',
      subtitleTr: 'Karşılıklı saygı, yapıcı üslup ve eğitici misyon',
      subtitleEn: 'Mutual respect, constructive dialogue, and educational mission',
      itemsTr: [
        {
          title: 'Temsiliyet ve İlkelere Bağlılık',
          body: 'Topluluk ekibindeki ve bünyesindeki her bir üye; katıldığı her platformda, yaptığı her konuşmada ve gerçekleştirdiği her sunumda topluluk kurallarına ve etik ilkelerimize sadık kalmayı taahhüt eder.',
        },
        {
          title: 'Saygı ve Etik Sorumluluk',
          body: 'Konuşma özgürlüğünü sonuna kadar destekleriz; ancak bu özgürlük başkalarına yönelik taciz, itibar suikastı veya doğrudan nefret söylemi üretme hakkını doğurmaz. Topluluğu temsil eden her mecralarda karşılıklı saygı esastır.',
        },
        {
          title: 'Ortak Eğitici Misyon',
          body: 'Amacımız; Türkiye’de Nostr ekosistemini tanıtmak, Türkçe kaynaklar üretmek, açık kaynak projeleri desteklemek ve teknik okuryazarlığı artırmaktır.',
        },
      ],
      itemsEn: [
        {
          title: 'Commitment to Ethical Representation',
          body: 'Every member representing the community in public forums, conferences, or online channels commits to upholding our shared ethical standards and respectful conduct.',
        },
        {
          title: 'Freedom with Mutual Dignity',
          body: 'We staunchly defend freedom of speech, which does not constitute a license for personal harassment, defamation, or hate-fueled abuse. Respectful discourse is foundational to all community spaces.',
        },
        {
          title: 'Educational Mission & Literacy',
          body: 'Our core objective is to educate, provide first-class Turkish documentation, champion local and global open-source projects, and elevate cryptographic literacy.',
        },
      ],
    },
    {
      number: 5,
      titleTr: 'Birlikte İnşa Ediyoruz (Lightning & Zaps)',
      titleEn: 'Building Together (Lightning & Zaps)',
      subtitleTr: 'Değer transferi ve özgür internetin inşası',
      subtitleEn: 'Value transfer and co-creating the decentralized web',
      itemsTr: [
        {
          title: 'Değer Transferi (Zaps)',
          body: 'Lightning Network entegrasyonu sayesinde değer transferini iletişimin merkezine taşıyor, üretilen emeği ve fikirleri aracısız biçimde destekliyoruz.',
        },
        {
          title: 'Açık Davet',
          body: 'Seni de kapalı duvarların ötesine geçmeye, kendi anahtarının (private key) sorumluluğunu almaya ve özgür internetin geleceğini kurallara, hukuka ve birbirimize saygılı bir şekilde inşa etmeye davet ediyoruz.',
        },
      ],
      itemsEn: [
        {
          title: 'Direct Value-for-Value (Zaps)',
          body: 'By embedding the Bitcoin Lightning Network into social communication, we enable direct, frictionless support for creators and builders without corporate cut or surveillance.',
        },
        {
          title: 'An Open Invitation',
          body: 'We invite you to step beyond walled gardens, take ownership of your cryptographic keys, and co-build the sovereign internet of tomorrow with dignity, respect, and shared purpose.',
        },
      ],
    },
  ],
  conclusionTr: {
    lead: 'Özgür iletişimin geleceğini birlikte inşa ediyoruz.',
    quote: 'İletişim senin, kimlik senin, ağ senin.',
    invite: 'Açık anahtarını al, rölelere bağlan ve aramıza katıl.',
  },
  conclusionEn: {
    lead: 'Together, we are building the future of sovereign communication.',
    quote: 'Your communication, your identity, your network.',
    invite: 'Generate your keypair, connect to relays, and join the movement.',
  },
};
