export interface GuideSection {
  id: string;
  title: string;
  summary: string;
  icon: string;
  readTime: string;
  content: {
    heading: string;
    text: string;
    code?: string;
    codeTitle?: string;
    codeLang?: string;
    tips?: string[];
    links?: { label: string; url: string }[];
  }[];
}

export const guides: GuideSection[] = [
  {
    id: 'nostr-nedir',
    title: '1. Nostr Nedir? Nasıl Çalışır?',
    summary: 'Nostr (Notes and Other Stuff Transmitted by Relays) protokolünün temelleri, çalışma mantığı ve geleneksel sosyal medyadan farkları.',
    icon: 'Radio',
    readTime: '4 dk',
    content: [
      {
        heading: 'Protokol Mantığı',
        text: 'Nostr bir şirket, uygulama veya blokzincir değildir. Tıpkı e-posta protokolü (SMTP) gibi basit, hafif ve açık bir standarttır (NIP-01). Kullanıcılar istemciler (clients) aracılığıyla notlar üretir, bu notları kriptografik olarak imzalar ve rölelere (relays) iletir.',
        tips: [
          'Hesabınız hiçbir şirketin veritabanında saklanmaz.',
          'Röleler sadece mesaj taşıyıcıdır; imzanızı taklit edemez veya içeriğinizi değiştiremez.',
        ],
        links: [
          { label: 'NIP-01 Temel Protokol Spesifikasyonu', url: 'https://github.com/nostr-protocol/nips/blob/master/01.md' },
          { label: 'Tüm NIP Standartları Arşivi', url: 'https://github.com/nostr-protocol/nips' },
        ],
      },
      {
        heading: 'Neden Sansürlenemez?',
        text: 'Eğer bir röle sizin notlarınızı yayınlamayı durdurursa, tek bir tıkla başka yüzlerce açık röleye bağlanabilir veya saniyeler içinde kendi rölenizi çalıştırabilirsiniz. Takipçileriniz sizi açık anahtarınızdan tanımaya devam eder.',
      },
    ],
  },
  {
    id: 'anahtar-guvenligi',
    title: '2. Anahtar Yönetimi & Güvenlik',
    summary: 'Açık anahtar (npub) ve gizli anahtar (nsec) farkı, güvenlik kuralları ve şifreleme pratikleri.',
    icon: 'Key',
    readTime: '5 dk',
    content: [
      {
        heading: 'Public Key (npub) vs Private Key (nsec)',
        text: 'Public Key (npub), sizin kullanıcı adınız veya IBAN numaranız gibidir; herkesle özgürce paylaşabilirsiniz. Private Key (nsec) ise şifreniz ve imza mührünüzdür. nsec anahtarınızı bilen herkes hesabınızı kontrol edebilir. Bech32 formatındaki npub ve nsec anahtarları NIP-19 ile standartlaştırılmıştır.',
        tips: [
          'nsec ile başlayan anahtarınızı ASLA web sitelerine doğrudan yapıştırmayın.',
          'Tarayıcılarda nos2x veya Alby gibi NIP-07 anahtar yöneticisi eklentilerini kullanın.',
          'nsec anahtarınızı fiziksel veya şifrelenmiş güvenli bir ortamda yedekleyin.',
        ],
        links: [
          { label: 'nos2x Tarayıcı Eklentisi', url: 'https://github.com/fiatjaf/nos2x' },
          { label: 'Alby Anahtar Yöneticisi & Cüzdan', url: 'https://getalby.com' },
          { label: 'NIP-07 Tarayıcı Eklenti Standardı', url: 'https://github.com/nostr-protocol/nips/blob/master/07.md' },
          { label: 'NIP-19 Bech32 Anahtar Formatı', url: 'https://github.com/nostr-protocol/nips/blob/master/19.md' },
        ],
      },
    ],
  },
  {
    id: 'istemciler',
    title: '3. İstemci (Client) Seçimi',
    summary: 'iOS, Android ve Web için en popüler ve kararlı Nostr istemcileri.',
    icon: 'Smartphone',
    readTime: '6 dk',
    content: [
      {
        heading: 'Tavsiye Edilen İstemciler',
        text: 'Nostr açık bir protokol olduğu için dilediğiniz istemciyi kullanabilirsiniz. Hepsinde aynı anahtarla oturum açtığınızda tüm takipçileriniz ve gönderileriniz otomatik olarak yüklenir. Yerel Türkçe dil desteği ve zengin özellikleri için Nostrich, tüm platformlarda (Web, iOS, Android, macOS) öne çıkan tavsiye edilen seçenektir.',
        links: [
          { label: 'Nostrich (Web / iOS / Android / macOS - Türkçe Dil Desteği)', url: 'https://nostrich.org' },
          { label: 'Damus (iOS / macOS)', url: 'https://damus.io' },
          { label: 'Amethyst (Android)', url: 'https://github.com/vitorpamplona/amethyst' },
          { label: 'Primal (Web / iOS / Android)', url: 'https://primal.net' },
          { label: 'Coracle (Web)', url: 'https://coracle.social' },
        ],
      },
    ],
  },
  {
    id: 'goc-araclari',
    title: '4. Göç & Otomasyon Araçları',
    summary: 'x2nostr ve Bridge by Workouse ile platformlardan Nostr ekosistemine sorunsuz geçiş.',
    icon: 'ArrowRightLeft',
    readTime: '4 dk',
    content: [
      {
        heading: 'x2nostr ile Platformlardan Veri Göçü',
        text: 'x2nostr.emre.xyz; GitHub, Spotify, IMDb, Goodreads ve benzeri platformlardaki içeriklerinizi, aktivitelerinizi, listelerinizi ve profil verilerinizi Nostr protokolüne taşımanıza olanak tanıyan kapsamlı bir göç aracıdır.',
        links: [
          { label: 'x2nostr Göç Aracını Aç', url: 'https://x2nostr.emre.xyz' },
          { label: 'GitHub', url: 'https://github.com' },
          { label: 'Spotify', url: 'https://spotify.com' },
          { label: 'IMDb', url: 'https://www.imdb.com' },
          { label: 'Goodreads', url: 'https://www.goodreads.com' },
        ],
      },
      {
        heading: 'Bridge by Workouse ile Otomasyon',
        text: 'bridge.workouse.com, Nostr için Zapier gücünde otomasyonlar kurmanızı sağlar. RSS beslemelerini, blog yazılarınızı, GitHub bildirimlerini ve webhookları otomatik olarak Nostr notlarına dönüştürür.',
        links: [
          { label: 'Bridge by Workouse Servisini Ziyaret Et', url: 'https://bridge.workouse.com' },
        ],
      },
    ],
  },
  {
    id: 'nip-05',
    title: '5. NIP-05 Doğrulanmış Kimlik',
    summary: 'İsminizin yanına mavi tik benzeri alan adı doğrulaması (örneğin delirehberi@emre.xyz) ekleme rehberi ve 32-byte Hex açık anahtar dönüştürücüsü.',
    icon: 'BadgeCheck',
    readTime: '5 dk',
    content: [
      {
        heading: 'NIP-05 Nasıl Çalışır?',
        text: 'NIP-05, kendi web sitenizin `/.well-known/nostr.json` dosyasında kullanıcı adınızı 32-byte hexadecimal public key ile eşleştirerek alan adınızla kimliğinizi doğrulamanızı sağlar. İstemciler `name@domain.com` formatındaki kimliği `https://domain.com/.well-known/nostr.json?name=name` adresine GET isteği atarak sorgular.',
        codeTitle: 'Örnek: https://emre.xyz/.well-known/nostr.json',
        codeLang: 'json',
        code: `{
  "names": {
    "delirehberi": "46f3c7bb33cc3019049b76dc89dbb96e34c247bdda68b6ad8632682793ff8a1a",
    "topluluk": "ed15e54b8d525b7faa43aa142221f838c415aac699bbb4e74a1004e4b7e7adf8"
  },
  "relays": {
    "46f3c7bb33cc3019049b76dc89dbb96e34c247bdda68b6ad8632682793ff8a1a": [
      "wss://relay.nostr.org.tr",
      "wss://relay.damus.io",
      "wss://nos.lol"
    ]
  }
}`,
        tips: [
          'Kendi alan adınız yoksa: rehber.dev üzerinden ücretsiz olarak saniyeler içinde adınız@rehber.dev NIP-05 kimliği ve Lightning yönlendiricisi edinebilirsiniz.',
          'KRİTİK: nostr.json dosyasına npub1... formatında anahtar YAZILMAZ. NIP-05 spesifikasyonu tam 64 karakterli (32-byte) hexadecimal açık anahtar gerektirir.',
          'Aşağıdaki interaktif dönüştürücüyü kullanarak npub adresinizi anında 32-byte Hex formatına dönüştürebilir ve hazır nostr.json dosyanızı indirebilirsiniz.',
          'Dosyanın mutlaka HTTPS üzerinden ve `/.well-known/nostr.json` yolunda sunulması gerekir.',
          'Sunucunuzun `Access-Control-Allow-Origin: *` CORS başlığı döndürdüğünden emin olun.',
          'Content-Type başlığı `application/json; charset=utf-8` olmalıdır.',
        ],
        links: [
          { label: 'rehber.dev - Ücretsiz NIP-05 & Lightning Adres Yönlendirici', url: 'https://rehber.dev' },
          { label: 'NIP-05 Spesifikasyonu (nostr-protocol/nips)', url: 'https://github.com/nostr-protocol/nips/blob/master/05.md' },
          { label: 'NIP-19 Bech32 Spesifikasyonu', url: 'https://github.com/nostr-protocol/nips/blob/master/19.md' },
        ],
      },
    ],
  },
  {
    id: 'lightning-zaps',
    title: '6. Lightning & Zaps',
    summary: 'Nostr üzerinde mikro ödemelerle içerik üreticilerini ödüllendirme ve bahşiş gönderme.',
    icon: 'Zap',
    readTime: '4 dk',
    content: [
      {
        heading: 'Zaps Nedir?',
        text: 'Zaps, Nostr protokolünün Bitcoin Lightning Network ile birleştiği yerdir (NIP-57). Bir gönderiyi sadece beğenmek yerine, 21 satoshi veya dilediğiniz miktarda anlık mikro ödeme (Zap) gönderebilirsiniz.',
        tips: [
          'Alby, Wallet of Satoshi veya Phoenix gibi bir Lightning cüzdanı edinin.',
          'Profilinize Lightning adresinizi (Lud-16 formatında örneğin delirehberi@emre.xyz veya adiniz@rehber.dev) ekleyin.',
          'rehber.dev ile Alby / Wallet of Satoshi cüzdanınızı tek bir adrese bağlayıp kolayca zap alabilirsiniz.',
        ],
        links: [
          { label: 'rehber.dev - Lightning Adres Yönlendirici', url: 'https://rehber.dev' },
          { label: 'Alby Lightning Cüzdanı', url: 'https://getalby.com' },
          { label: 'Wallet of Satoshi', url: 'https://www.walletofsatoshi.com' },
          { label: 'Phoenix Wallet', url: 'https://phoenix.acinq.co' },
          { label: 'NIP-57 Lightning Zaps Spesifikasyonu', url: 'https://github.com/nostr-protocol/nips/blob/master/57.md' },
        ],
      },
    ],
  },
  {
    id: 'blossom-medya-sunuculari',
    title: '7. Blossom Medya Sunucuları & Merkeziyetsiz Depolama',
    summary: 'Nostr üzerinde resim, video ve dosya paylaşımının yeni açık standardı Blossom (BUD-01/02), SHA-256 tabanlı içerik adresleme, istemcilere medya sunucusu ekleme ve mirror (ayna) yedeklilik mimarisi.',
    icon: 'HardDrive',
    readTime: '7 dk',
    content: [
      {
        heading: 'Blossom Nedir ve Geleneksel İmaj Hostlarından Farkı Nedir?',
        text: 'Geleneksel web platformlarında ve eski Nostr paylaşımlarında kullanılan merkezi imaj yükleyicilerin (Imgur, Cloudinary vb.) en büyük sorunu; dosyaların silinmesi, platformun sansür uygulaması veya dosya üzerinde sıkıştırma/EXIF manipülasyonu yapmasıdır. Blossom (Blob Storage for Nostr - BUD spesifikasyonları), dosyaları SHA-256 hash özetleriyle isimlendiren (Content-Addressed Storage) merkeziyetsiz bir medya depolama standardıdır. Bir dosyanın adresi dosyanın matematiksel özetidir (örn: https://media.nostr.org.tr/<sha256>). Dosya içeriği değişmedikçe hash asla değişmez.',
        tips: [
          'SHA-256 hash tabanlı mimari sayesinde aynı dosya dünyanın farklı yerlerindeki binlerce Blossom sunucusunda birebir aynı adresle bulunabilir.',
          'Nostr Türkiye resmi Blossom sunucusu https://media.nostr.org.tr üzerinden topluluğumuza yüksek hızlı ve bağımsız medya depolama imkanı sunulmaktadır.',
        ],
        links: [
          { label: 'Blossom Protokol Spesifikasyonu (hzrd149/blossom)', url: 'https://github.com/hzrd149/blossom' },
          { label: 'BUD-01 Temel Blossom Standardı', url: 'https://github.com/hzrd149/blossom/blob/master/buds/01.md' },
          { label: 'BUD-02 Sunucu Listeleme Standardı', url: 'https://github.com/hzrd149/blossom/blob/master/buds/02.md' },
        ],
      },
      {
        heading: 'Kriptografik Kimlik Doğrulama (BUD-01 / kind: 24242)',
        text: 'Blossom sunucularına dosya yüklerken geleneksel API anahtarları veya şifreler yerine Nostr özel anahtarınızla imzalanmış kind: 24242 yetkilendirme olayı (auth event) kullanılır. Bu olayda yüklenen dosyanın SHA-256 hash değeri ve yükleme zamanı mühürlenir. Böylece sunucu, yükleme yapanın gerçek Nostr hesabınız olduğunu kriptografik olarak teyit eder.',
        codeTitle: 'Blossom Upload & Auth İsteği (BUD-01)',
        codeLang: 'bash',
        code: `# Blossom sunucusuna SHA-256 tabanlı dosya yükleme (Nostr Auth kind:24242 ile)
curl -X PUT "https://media.nostr.org.tr/upload" \\
  -H "Authorization: Nostr <base64_encoded_kind_24242_event>" \\
  -H "Content-Type: image/jpeg" \\
  --data-binary @fotograf.jpg

# Yüklenen dosya anında SHA-256 hash ile servis edilir:
# https://media.nostr.org.tr/4a5b...3c2e.jpg`,
        tips: [
          'İstemciler (Amethyst, Coracle vb.) bu yetkilendirme ve imzalama adımlarını arka planda otomatik olarak yürütür; ek bir şifre girmeniz gerekmez.',
        ],
      },
      {
        heading: 'İstemcilere Medya Sunucusu Nasıl Eklenir?',
        text: 'Nostr istemcinizde fotoğraf veya video yüklemek istediğinizde istemcinizin hangi sunucuya dosya göndereceğini yapılandırabilirsiniz. Nostrich, Amethyst, Coracle, Primal, Nostrudel ve diğer modern istemcilerde Ayarlar > Medya / Blossom Sunucuları bölümüne giderek https://media.nostr.org.tr adresini eklemeniz yeterlidir.',
        tips: [
          'Nostrich & Web İstemcileri: Ayarlar (Settings) > Medya / Blossom bölümünden https://media.nostr.org.tr sunucusunu ekleyin.',
          'Amethyst: Ayarlar > Medya Yüklemeleri > Medya Sunucuları > "+" butonuna basarak https://media.nostr.org.tr ekleyin.',
          'Coracle: Settings > Media Servers bölümünden https://media.nostr.org.tr sunucusunu birincil sağlayıcı yapın.',
        ],
        links: [
          { label: 'media.nostr.org.tr Canlı Sunucu Durumu', url: 'https://media.nostr.org.tr' },
        ],
      },
      {
        heading: 'Mirrorlar (Ayna Sunucular) Nasıl Çalışır ve Neden Tek Bir Sunucuya Güvenilmemeli?',
        text: 'Merkeziyetsizliğin altın kuralı: Tek bir sunucuya asla tamamen güvenmeyin (Single Point of Failure). Herhangi bir medya sunucusu internet kesintisi yaşayabilir, disk doluluğu nedeniyle eski dosyaları temizleyebilir veya bakım moduna geçebilir. İçerik adreslemenin en büyük gücü tam burada devreye girer: Dosyalar dosya adıyla değil SHA-256 hash ile tanımlandığı için, dosyanız media.nostr.org.tr üzerinde silinse dahi aynı SHA-256 hash değerine sahip dosya cdn.satellite.earth, nostr.download veya primal.net üzerinde mevcutsa hiçbir veri kaybı yaşanmaz.',
        codeTitle: 'BUD-04 Mirror (Aynalama) API Mantığı',
        codeLang: 'bash',
        code: `# Bir dosyayı başka bir Blossom sunucusundan media.nostr.org.tr üzerine aynalama:
curl -X PUT "https://media.nostr.org.tr/mirror" \\
  -H "Authorization: Nostr <base64_encoded_kind_24242_event>" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://cdn.satellite.earth/<sha256_hash>"}'`,
        tips: [
          'KRİTİK TAVSİYE: İstemcinize tek bir medya sunucusu yerine hem https://media.nostr.org.tr hem de küresel açık ayna (mirror) sunucuları (örn: https://cdn.satellite.earth, https://nostr.download) ekleyin.',
          'BUD-04 Mirror standardı sayesinde Blossom istemcileri yüklediğiniz bir fotoğrafı arka planda birden fazla sunucuya aynı anda yansıtabilir.',
          'Böylece medya dosyalarınız sansürlenemez, kapatılamaz ve sonsuza kadar Nostr ağında kalıcı hale gelir.',
        ],
        links: [
          { label: 'BUD-04 Mirror Spesifikasyonu', url: 'https://github.com/hzrd149/blossom/blob/master/buds/04.md' },
          { label: 'Satellite CDN Blossom', url: 'https://cdn.satellite.earth' },
          { label: 'Nostr Download Blossom', url: 'https://nostr.download' },
        ],
      },
    ],
  },
];

