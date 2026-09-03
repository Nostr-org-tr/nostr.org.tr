export interface ToolFaq {
  question: string;
  answer: string;
}

export type ToolCategory = 'keys' | 'identity' | 'relays' | 'developer' | 'lightning';

export interface ToolItem {
  id: string;
  slug: string;
  href: string;
  title: string;
  shortTitle: string;
  category: ToolCategory;
  categoryLabel: string;
  icon: string;
  badge?: string;
  summary: string;
  description: string;
  nips: string[];
  features: string[];
  faqs: ToolFaq[];
}

export const toolCategories: { key: ToolCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Tüm Araçlar', icon: 'Sparkles' },
  { key: 'keys', label: 'Anahtar & Format', icon: 'KeyRound' },
  { key: 'identity', label: 'Kimlik & NIP-05', icon: 'BadgeCheck' },
  { key: 'relays', label: 'Röle & Ağ', icon: 'Radio' },
  { key: 'developer', label: 'Geliştirici & Eklenti', icon: 'Code2' },
  { key: 'lightning', label: 'Lightning & Zap', icon: 'Zap' },
];

export const nostrTools: ToolItem[] = [
  {
    id: 'nip19-donusturucu',
    slug: 'nip19-donusturucu',
    href: '/araclar/nip19-donusturucu',
    title: 'NIP-19 & NIP-21 Evrensel Nostr Format Dönüştürücü',
    shortTitle: 'NIP-19 & NIP-21 Dönüştürücü',
    category: 'keys',
    categoryLabel: 'Anahtar & Format',
    icon: 'ArrowRightLeft',
    badge: 'Popüler',
    summary: 'npub, nsec, note, nprofile, nevent, naddr ve 32-byte Hex formatları arasında anlık çift yönlü dönüştürme ve QR kod üretimi.',
    description: 'Nostr protokolünde kullanılan tüm Bech32 kodlu (npub, nsec, note, nprofile, nevent, naddr) tanımlayıcıları ile ham 32-byte hexadecimal açık/özel anahtarlar arasında çift yönlü dönüştürme yapın. NIP-21 nostr: URI bağlantıları ve anlık QR kod önizlemesi sunar.',
    nips: ['NIP-19', 'NIP-21'],
    features: [
      'Otomatik format tespiti (npub, nsec, note, nevent, nprofile, naddr veya Hex)',
      'npub <-> 32-byte Hex açık anahtar dönüştürme',
      'nsec <-> 32-byte Hex özel anahtar dönüştürme (%100 yerel güvenlik garantisi)',
      'note <-> Hex Event ID dönüştürme',
      'nprofile ve nevent için gömülü röle ve yazar meta verisi ayrıştırma',
      'naddr parametrik adres ayrıştırma (kind, pubkey, d-identifier)',
      'nostr:... URI oluşturma ve SVG QR kod çıktısı',
      'Tek tıkla panoya kopyalama'
    ],
    faqs: [
      {
        question: 'NIP-19 nedir ve neden npub/nsec kullanılır?',
        answer: 'NIP-19, Nostr protokolünde kullanılan ham 32-byte hex anahtarların ve etkinlik ID\'lerinin insanlar tarafından daha kolay tanınması ve yazım hatalarının checksum ile engellenmesi için geliştirilmiş Bech32 kodlama standardıdır. npub açık anahtarları, nsec özel anahtarları, note ise gönderileri temsil eder.'
      },
      {
        question: 'Özel anahtarımı (nsec) bu araca yapıştırmak güvenli mi?',
        answer: 'Evet. Bu araç %100 istemci taraflı (client-side) çalışır. Hiçbir girdi ağ üzerinden herhangi bir sunucuya iletilmez. Sayfa kaynak kodunu inceleyebilir veya tarayıcınızın ağ (Network) sekmesini izleyerek tamamen çevrimdışı çalıştığını teyit edebilirsiniz.'
      },
      {
        question: 'nevent ve nprofile formatlarının npub ve note\'tan farkı nedir?',
        answer: 'npub sadece açık anahtarı, note ise sadece etkinlik kimliğini içerir. nprofile ve nevent ise TLV (Type-Length-Value) formatıyla ilgili profile veya gönderiye ait röle adreslerini ve yazar bilgilerini de içine paketler. Bu sayede istemciler veriyi hangi rölelerden çekeceğini anında bilir.'
      }
    ]
  },
  {
    id: 'nip05-dogrulayici-ve-nostr-json-ureticisi',
    slug: 'nip05-dogrulayici-ve-nostr-json-ureticisi',
    href: '/araclar/nip05-dogrulayici-ve-nostr-json-ureticisi',
    title: 'NIP-05 Alan Adı Doğrulayıcı & nostr.json Dosyası Üreticisi',
    shortTitle: 'NIP-05 Doğrulayıcı & Üretici',
    category: 'identity',
    categoryLabel: 'Kimlik & NIP-05',
    icon: 'BadgeCheck',
    badge: 'Önemli',
    summary: 'NIP-05 adreslerini canlı test edin, CORS ve HTTPS kontrolü yapın, siteniz için hazır /.well-known/nostr.json dosyası oluşturun.',
    description: 'Nostr profilinize doğrulanmış alan adı kimliği (ör: delirehberi@nostr.org.tr) bağlamak için gerekli NIP-05 standartlarını test edin ve sunucunuza yükleyeceğiniz nostr.json dosyasını hazır konfigürasyonlarla indirin.',
    nips: ['NIP-05'],
    features: [
      'Canlı NIP-05 adresi sorgulama (kullanici@alanadi.com)',
      'CORS (Access-Control-Allow-Origin: *) başlığı denetimi',
      'HTTPS sertifikası ve JSON sözdizimi analizi',
      'Public key eşleşme ve yetki doğrulaması',
      'Çoklu kullanıcı ve kök domain (_) destekli nostr.json üreticisi',
      'Tek tıkla nostr.json dosyası indirme',
      'Nginx, Caddy, Apache ve Cloudflare Workers için hazır sunucu konfigürasyonları'
    ],
    faqs: [
      {
        question: 'NIP-05 doğrulanmış kimlik nedir?',
        answer: 'NIP-05, DNS tabanlı bir kimlik doğrulama standardıdır. Kullanıcının sahip olduğu internet sitesinde (https://alanadi.com/.well-known/nostr.json) açık anahtarını yayınlamasıyla, istemcilerde mavi tik veya doğrulanmış alan adı etiketi kazanmasını sağlar.'
      },
      {
        question: 'NIP-05 doğrulamasında en sık karşılaşılan hata nedir?',
        answer: 'En yaygın hata CORS (Cross-Origin Resource Sharing) başlığının eksik olmasıdır. nostr.json dosyasını sunan web sunucusunun yanıt başlıklarında "Access-Control-Allow-Origin: *" kuralı bulunmalıdır, aksi takdirde web tabanlı Nostr istemcileri dosyayı okuyamaz.'
      },
      {
        question: 'Kök alan adımı (örn: @nostr.org.tr) nasıl NIP-05 yaparım?',
        answer: 'Kullanıcı adı olarak alt çizgi (_) karakterini kullanmanız gerekir. Örneğin nostr.json dosyasındaki "names" objesine { "_": "hex_pubkey" } girdiğinizde kimliğiniz doğrudan @nostr.org.tr şeklinde görünür.'
      }
    ]
  },
  {
    id: 'nip07-eklenti-testi',
    slug: 'nip07-eklenti-testi',
    href: '/araclar/nip07-eklenti-testi',
    title: 'NIP-07 Tarayıcı Eklentisi Test & Tanı Laboratuvarı',
    shortTitle: 'NIP-07 Eklenti Laboratuvarı',
    category: 'developer',
    categoryLabel: 'Geliştirici & Eklenti',
    icon: 'Plug',
    badge: 'Geliştirici',
    summary: 'Alby, nos2x, Amber vb. tarayıcı eklentilerinin window.nostr yeteneklerini, anahtar alımını ve imzalama fonksiyonlarını test edin.',
    description: 'Tarayıcınızda yüklü olan NIP-07 Nostr cüzdan veya imzalayıcı eklentisini (Alby, nos2x, Amber, Flat vb.) test edin. window.nostr nesnesinin getPublicKey, getRelays, signEvent, NIP-04 ve NIP-44 fonksiyonlarını güvenli bir kum havuzunda deneyin.',
    nips: ['NIP-07', 'NIP-04', 'NIP-44'],
    features: [
      'Otomatik window.nostr eklenti tespiti',
      'getPublicKey() çağrısı ile bağlı profilin npub ve hex görünümü',
      'getRelays() ile eklentide kayıtlı röle listesini görüntüleme',
      'signEvent() ile örnek kind:1 notu imzalama ve Schnorr doğrulaması',
      'NIP-04 ve NIP-44 doğrudan mesaj şifreleme/çözme testi',
      'İzin ve hata logları canlı konsolu'
    ],
    faqs: [
      {
        question: 'NIP-07 nedir?',
        answer: 'NIP-07, tarayıcı tabanlı Nostr istemcilerinin kullanıcının özel anahtarına (nsec) doğrudan erişmeden, tarayıcı eklentisi (Alby, nos2x vb.) üzerinden güvenli bir şekilde oturum açmasını ve etkinlik imzalamasını sağlayan standart bir JavaScript API arayüzüdür (window.nostr).'
      },
      {
        question: 'Web sitelerine özel anahtarımı (nsec) girmek neden risklidir?',
        answer: 'Web sitelerine nsec anahtarınızı girdiğinizde, olası bir XSS açığında veya kötü niyetli bir betik tarafından tüm hesabınızın kontrolü ele geçirilebilir. NIP-07 eklentileri ise anahtarınızı güvenli kasada tutar ve sitelere sadece onayladığınız işlemleri imzalayarak iletir.'
      }
    ]
  },
  {
    id: 'role-tani-ve-nip11-goruntuleyici',
    slug: 'role-tani-ve-nip11-goruntuleyici',
    href: '/araclar/role-tani-ve-nip11-goruntuleyici',
    title: 'Canlı Nostr Röle Tanı & NIP-11 Bilgi Görüntüleyici',
    shortTitle: 'Röle Tanı & NIP-11',
    category: 'relays',
    categoryLabel: 'Röle & Ağ',
    icon: 'Radio',
    summary: 'Herhangi bir Nostr rölesine canlı WebSocket ping atın, gecikme süresini ölçün ve NIP-11 desteklenen NIP listesini inceleyin.',
    description: 'Nostr rölelerinin erişilebilirliğini, gerçek zamanlı WebSocket bağlantı durumunu, RTT gecikme süresini (ping ms) ve NIP-11 röle bilgi dokümanını (yazılım, sürüm, desteklenen NIP protokolleri, operatör bilgileri ve ücret/sınırlama kuralları) inceleyin.',
    nips: ['NIP-01', 'NIP-11'],
    features: [
      'Canlı WebSocket el sıkışması ve yanıt süresi (RTT ping ms) ölçümü',
      'NIP-11 Röle Bilgi Dokümanı otomatik ayrıştırma',
      'Desteklenen NIP listesi rozetleri ve filtreleri',
      'Yazılım motoru (Khatru, nostr-rs-relay, Strfry vb.) ve sürüm tespiti',
      'Operatör iletişim bilgileri ve NIP-05 doğrulaması',
      'Ödeme gereksinimi ve sınırlamaları (limitation tags) gösterimi'
    ],
    faqs: [
      {
        question: 'NIP-11 Röle Bilgi Dokümanı nedir?',
        answer: 'NIP-11, bir Nostr rölesinin HTTP GET isteğine "Accept: application/nostr+json" başlığı ile yanıt vererek kendi adını, açıklamasını, yazılımını, operatörünü ve desteklediği NIP standartlarını makine tarafından okunabilir JSON formatında sunduğu protokoldür.'
      },
      {
        question: 'Neden bazı rölelere web tarayıcısından bağlanırken hata alıyorum?',
        answer: 'Web tarayıcıları yalnızca güvenli WebSocket (wss://) protokolünü destekler. Ayrıca röle sunucusunun HTTP NIP-11 uç noktasında CORS başlıkları tanımlı değilse, tarayıcı NIP-11 belgesini çekmeyi engelleyebilir.'
      }
    ]
  },
  {
    id: 'event-dogrulayici-ve-inceleyici',
    slug: 'event-dogrulayici-ve-inceleyici',
    href: '/araclar/event-dogrulayici-ve-inceleyici',
    title: 'Nostr Event JSON Doğrulayıcı & İmza İnceleyici',
    shortTitle: 'Event JSON Doğrulayıcı',
    category: 'developer',
    categoryLabel: 'Geliştirici & Eklenti',
    icon: 'Code2',
    summary: 'Ham Nostr Event JSON yapıştırın; SHA-256 Event ID kanonik hash\'ini, Schnorr imzasını ve etiket yapısını anında doğrulayın.',
    description: 'Herhangi bir Nostr etkinliğinin (event) JSON içeriğini inceleyin, NIP-01 serileştirme kuralına göre hesaplanan Event ID doğruluğunu kontrol edin, secp256k1 Schnorr imzasını doğrulayın ve etkinlik türünü (kind) detaylarıyla analiz edin.',
    nips: ['NIP-01', 'NIP-10', 'NIP-14', 'NIP-33'],
    features: [
      'Ham JSON sözdizimi ve NIP-01 şema doğrulaması',
      'Kanonik UTF-8 JSON serileştirmesi ve SHA-256 Event ID hesaplama/karşılaştırma',
      'secp256k1 Schnorr imza (sig) matematiksel doğrulaması',
      'Event Kind açıklaması (Kind 0: Profil, Kind 1: Not, Kind 7: Reaksiyon, Kind 30023: Makale vb.)',
      'Etiket (tags) tablosu ve e/p/t/d parametre ayrıştırıcı',
      'Zaman damgası (created_at) yerel saat ve göreceli zaman dönüştürücü'
    ],
    faqs: [
      {
        question: 'Nostr Event ID nasıl oluşturulur?',
        answer: 'Event ID, etkinliğin [0, pubkey, created_at, kind, tags, content] formatındaki kanonik UTF-8 JSON dizisinin SHA-256 özetidir. Dizideki en ufak bir boşluk veya karakter farkı ID\'yi ve imzayı geçersiz kılar.'
      },
      {
        question: 'Schnorr imzası nedir ve neden kullanılır?',
        answer: 'Nostr, Bitcoin\'in Taproot güncellemesinde de kullanılan BIP-340 Schnorr imzalarını (secp256k1 eğrisi) kullanır. Schnorr imzaları ECDSA\'ya kıyasla daha güvenli, 64-byte sabit boyutta ve imza birleştirme (batch verification) yeteneğine sahiptir.'
      }
    ]
  },
  {
    id: 'zap-ve-lightning-denetleyici',
    slug: 'zap-ve-lightning-denetleyici',
    href: '/araclar/zap-ve-lightning-denetleyici',
    title: 'NIP-57 Lightning & Nostr Zap Uyumluluk Denetleyicisi',
    shortTitle: 'Zap & Lightning Denetleyici',
    category: 'lightning',
    categoryLabel: 'Lightning & Zap',
    icon: 'Zap',
    summary: 'Bir Lightning adresinin Nostr NIP-57 Zaps destekleyip desteklemediğini, LNURL uç noktalarını ve limitlerini sorgulayın.',
    description: 'Herhangi bir Lightning adresinin (ör: satoshi@getalby.com veya isim@domain.com) NIP-57 Zap uyumluluğunu, nostrPubkey yetkilendirmesini, LNURL-pay uç noktalarını, minimum ve maksimum sat limitlerini canlı test edin.',
    nips: ['NIP-57', 'LNURL-pay'],
    features: [
      'Lightning Address (kullanici@alanadi.com) format çözümlemesi',
      '.well-known/lnurlp/kullanici uç noktasını otomatik sorgulama',
      'allowsNostr: true ve nostrPubkey Zap desteği denetimi',
      'Min / Max gönderilebilir satoshi (millisat) limit analizi',
      'LNURL-pay metadata ve açıklama dökümü',
      'Zap Request (kind:9734) ve Zap Receipt (kind:9735) şema açıklamaları'
    ],
    faqs: [
      {
        question: 'NIP-57 Zaps nedir?',
        answer: 'NIP-57 Zaps, Nostr protokolü ile Bitcoin Lightning Network ödemelerini birbirine bağlayan standarttır. Gönderilen her Lightning bahşişi için ağda kriptografik olarak imzalanmış bir makbuz (kind:9735 Zap Receipt) yayınlanarak profillerde anlık görünmesi sağlanır.'
      },
      {
        question: 'Lightning adresimde Zap özelliğini nasıl aktif ederim?',
        answer: 'Kullandığınız Lightning cüzdan sağlayıcısının (Alby, Wallet of Satoshi, Coinos, Strike vb.) veya kendi LNURL sunucunuzun .well-known/lnurlp yanıtına "allowsNostr: true" ve cüzdan servisinin açık anahtarını ("nostrPubkey") eklemesi gerekmektedir.'
      }
    ]
  },
  {
    id: 'anahtar-ureticisi',
    slug: 'anahtar-ureticisi',
    href: '/araclar/anahtar-ureticisi',
    title: 'Güvenli Yerel Nostr Anahtar Çifti & Vanity npub Üretici',
    shortTitle: 'Anahtar & Vanity Üretici',
    category: 'keys',
    categoryLabel: 'Anahtar & Format',
    icon: 'KeyRound',
    summary: 'Kriptografik olarak güvenli 32-byte Nostr anahtar çifti üretin, Web Worker ile özel önekli (vanity) npub arayın ve kağıt yedek alın.',
    description: 'Tarayıcınızın yerel Web Crypto API gücüyle tamamen çevrimdışı ve güvenli Nostr anahtarları (nsec, npub, hex) üretin. İsteğe bağlı olarak Web Worker üzerinden çalışan hafif özel ön ek (vanity npub) arama motorunu kullanın ve kağıt cüzdan formatında dışa aktarın.',
    nips: ['NIP-01', 'NIP-19'],
    features: [
      'Web Crypto API (crypto.getRandomValues) ile kriptografik güvenli üretim',
      '32-byte Hex, nsec ve npub anahtarlarının eş zamanlı oluşturulması',
      'Web Worker üzerinde arka planda kasmayan Vanity npub arayıcı (örn: npub1tr...)',
      'Açık ve özel anahtarlar için ayrı SVG QR kodları',
      'Kağıt yedek (Paper backup) yazdırma ve kopyalama görünümü',
      '%100 yerel ve çevrimdışı çalışma garantisi'
    ],
    faqs: [
      {
        question: 'Üretilen anahtarlar gerçekten güvenli ve rastgele mi?',
        answer: 'Evet. Üretim işlemi tarayıcınızın kriptografik olarak güvenli sözde rastgele sayı üreteci (CSPRNG - crypto.getRandomValues) kullanılarak secp256k1 standartlarına uygun 256-bit (32-byte) rastgele entropi ile yapılır.'
      },
      {
        question: 'Vanity npub ararken bilgisayarım donar mı?',
        answer: 'Hayır. Arama algoritması ana tarayıcı iş parçacığını (UI thread) kilitlememek için arka planda Web Worker üzerinde çalışır. İstediğiniz zaman aramayı durdurabilir veya bulunan anahtarı seçebilirsiniz.'
      },
      {
        question: 'Özel anahtarımı (nsec) kaybettikten sonra geri kurtarabilir miyim?',
        answer: 'Hayır. Nostr merkeziyetsiz bir protokoldür; müşteri hizmetleri veya şifre sıfırlama mekanizması yoktur. nsec anahtarınızı güvenli bir yere yedeklemeniz hayati önem taşır.'
      }
    ]
  }
];
