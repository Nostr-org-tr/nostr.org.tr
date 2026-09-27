export interface FaqItem {
  id: string;
  category: 'genel' | 'karsilastirma' | 'guvenlik' | 'ekonomi';
  question: string;
  shortAnswer: string;
  answerHtml: string;
  citation?: {
    text: string;
    url: string;
  };
}

export interface FaqCategory {
  id: 'all' | 'genel' | 'karsilastirma' | 'guvenlik' | 'ekonomi';
  label: string;
  description: string;
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'all',
    label: 'Tüm Sorular',
    description: 'Nostr protokolü hakkında en sık sorulan soruların tamamı',
  },
  {
    id: 'genel',
    label: 'Temel Kavramlar',
    description: 'Protokol mimarisi, kimlik yapısı ve temel çalışma prensipleri',
  },
  {
    id: 'karsilastirma',
    label: 'Mastodon & Bluesky',
    description: 'Nostr\'ın Fediverse/Mastodon ve ATProto/Bluesky ile mimari farkları',
  },
  {
    id: 'guvenlik',
    label: 'Spam, Sansür & Gizlilik',
    description: 'Spam filtreleme, röle denetimi ve sansür direnci mekanizmaları',
  },
  {
    id: 'ekonomi',
    label: 'Ekonomi, Keşif & Bitcoin',
    description: 'Röle sürdürülebilirliği, Zaps mikro ödemeleri ve algoritmasız keşif',
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'protokol-nedir',
    category: 'genel',
    question: 'Nostr nedir ve neden bir uygulama değil de "protokol" olarak adlandırılır?',
    shortAnswer: 'Nostr bir şirket veya uygulama değil; e-posta (SMTP) veya web (HTTP) gibi herkesin özgürce konuşabileceği açık bir iletişim standardıdır.',
    answerHtml: `
      <p class="mb-3">
        Bir <strong>protokol</strong>, farklı yazılımların birbiriyle anlaşabilmesini sağlayan ortak bir dildir. Tıpkı <em>e-posta (SMTP)</em> veya <em>web (HTTP/HTML)</em> gibi, Nostr da tek bir şirkete veya sunucuya ait olmayan açık bir standarttır.
      </p>
      <p class="mb-3">
        Nostr'ı kullanmak için tek bir uygulamaya mahkum değilsiniz. Ağ üzerinde çalışan yüzlerce bağımsız istemci (Coracle, Amethyst, Damus, Nostur, Yakihonne vb.) mevcuttur. Dilediğiniz istemciyi seçebilir, istediğiniz an değiştirebilir ve tüm takipçilerinizi veya içeriklerinizi kaybetmeden aynı açık ağda var olmaya devam edersiniz.
      </p>
    `,
    citation: {
      text: 'Nostr Resmi Dokümantasyonu',
      url: 'https://nostr.org',
    },
  },
  {
    id: 'hesap-silme-sansur',
    category: 'genel',
    question: 'Nostr\'da hesabım kapatılabilir veya paylaşımlarım tamamen silinebilir mi?',
    shortAnswer: 'Hayır. Hesabınız bir sunucu kaydı değil, matematiksel bir açık/gizli anahtar çiftidir. Hiçbir merkezi güç kimliğinizi elinizden alamaz.',
    answerHtml: `
      <p class="mb-3">
        Geleneksel sosyal ağlarda hesabınız bir şirketin veri tabanındaki bir satırdır ve şirket dilediği an hesabınızı silebilir. Nostr'da ise kimliğiniz kriptografik bir anahtardır (<strong>npub / nsec</strong>).
      </p>
      <p class="mb-3">
        Yazdığınız her ileti (event) sizin gizli anahtarınızla imzalanır ve birden çok bağımsız röleye (relay) gönderilir. Bir röle sizi engellese veya kapansa bile, iletileriniz diğer onlarca rölede canlı kalır. Takipçileriniz, güncel röle listeniz sayesinde sizi takip etmeye kesintisiz devam eder.
      </p>
    `,
  },
  {
    id: 'nostr-vs-mastodon',
    category: 'karsilastirma',
    question: 'Neden Mastodon / Fediverse yerine Nostr?',
    shortAnswer: 'Mastodon federatif bir modeldir; kimliğiniz sunucu yöneticisinin mülkiyetindedir. Nostr ise sunucusuz kriptografik egemenlik sağlar.',
    answerHtml: `
      <p class="mb-3">
        Mastodon gibi Fediverse sistemleri kriptografik anahtar temelli değil, <strong>sunucu (alan adı)</strong> temellidir. Hesabınız (örneğin <code>@ali@mastodon.social</code>) doğrudan o sunucu yöneticisinin insafına bağlıdır.
      </p>
      <ul class="list-disc list-inside space-y-2 mb-3 text-slate-700 dark:text-slate-300">
        <li><strong>Kimlik Esareti:</strong> Mastodon sunucusu kapandığında veya yönetici sizi engellediğinde kimliğinizi ve takipçilerinizi kaybedersiniz.</li>
        <li><strong>Merkezi Olmayan Çoklu Yayın (Multi-Master):</strong> Nostr'da kimlik sunucuya değil matematiksel anahtara aittir. Kullanıcı aynı anda onlarca bağımsız sunucuya bağlanır; hiçbir sunucu tek başına otorite değildir.</li>
        <li><strong>Topluluk Özgürlüğü:</strong> Nostr'da tek bir sunucuya hapsolmazsınız. İhtiyacınıza göre farklı röleleri eşzamanlı olarak kullanabilirsiniz.</li>
      </ul>
    `,
    citation: {
      text: 'Mastodon vs Nostr Karşılaştırma Analizi',
      url: 'https://newsletter.squishy.computer/p/natures-many-attempts-to-evolve-a',
    },
  },
  {
    id: 'nostr-vs-bluesky',
    category: 'karsilastirma',
    question: 'Neden Bluesky / ATProto yerine Nostr?',
    shortAnswer: 'Bluesky merkezi bir kimlik dizinine (PLC) ve tekil veri akışına bağımlıdır. Nostr ise tam anlamıyla dağıtık ve izinsizdir.',
    answerHtml: `
      <p class="mb-3">
        Bluesky (AT Protocol) ilk bakışta açık görünse de mimari olarak iki büyük merkeziyetçilik darboğazı barındırır:
      </p>
      <ol class="list-decimal list-inside space-y-2 mb-3 text-slate-700 dark:text-slate-300">
        <li><strong>Kimlik Merkeziyeti (PLC Directory):</strong> Tüm kullanıcı DID kayıtları Bluesky şirketinin kontrolündeki merkezi bir veritabanı (PLC) tarafından işletilir. Bu mekanizma sansüre ve müdahaleye açıktır.</li>
        <li><strong>Veri Darboğazı (AppView):</strong> Bluesky istemcileri "aptal istemci" (dumb client) mantığıyla çalışır ve devasa bir ara sunucuya (AppView) muhtaçtır. Bu sunucu verileri gizlice sıralayabilir, filtreleyebilir veya engelleyebilir.</li>
      </ol>
      <p>
        Nostr'da ise <strong>akıllı istemciler (smart clients)</strong> doğrudan yüzlerce bağımsız röle ile konuşur. Arada hiçbir tekel veya aracı katman bulunmaz.
      </p>
    `,
  },
  {
    id: 'spam-ve-guvenlik',
    category: 'guvenlik',
    question: 'Nostr spam ve istenmeyen içeriklerle nasıl mücadele eder?',
    shortAnswer: 'Varsayılan akışta sadece takip ettiğiniz kişileri görürsünüz. Ayrıca Web-of-Trust (Güven Ağı), ücretli röleler ve istemci taraflı filtreler spam\'i engeller.',
    answerHtml: `
      <p class="mb-3">
        Nostr'da merkezi bir algoritma size istemediğiniz içerikleri "dayatamaz". Ana akışınızda sadece sizin açıkça takip ettiğiniz hesapların içerikleri görünür.
      </p>
      <p class="mb-3">
        Yorum ve keşif alanlarındaki spam'ler için ise çok katmanlı çözümler uygulanır:
      </p>
      <ul class="list-disc list-inside space-y-2 mb-3 text-slate-700 dark:text-slate-300">
        <li><strong>Web of Trust (Güven Ağı):</strong> İstemciler yalnızca takip ettiğiniz kişilerin takip ettiği hesaplardan gelen yanıtları öne çıkarabilir.</li>
        <li><strong>Ücretli & Doğrulanmış Röleler:</strong> Giriş için cüzi bir Lightning ödemesi (veya PoW - İş Kanıtı) isteyen röleler bot spam'ini sıfıra indirir.</li>
        <li><strong>Paylaşımlı Engelleme Listeleri:</strong> Topluluk tarafından derlenen güvenilir engelleme listeleriyle kötü niyetli aktörler filtrelenebilir.</li>
      </ul>
    `,
  },
  {
    id: 'role-sansuru-vs-protokol',
    category: 'guvenlik',
    question: 'Röle sahipleri içerik silebilir mi? Bu durum sansür sayılmaz mı?',
    shortAnswer: 'Protokol sahipsizdir, fakat röleler özel mülkiyettir. Röle denetimi özgürlüktür çünkü kullanıcılar istedikleri röleye anında geçebilir.',
    answerHtml: `
      <p class="mb-3">
        Nostr'da protokol kimseye ait değildir; ancak her röle sunucusu onu işleten birey veya kuruma aittir. Bir röle sahibi kendi sunucusunda hangi içerikleri barındıracağına özgürce karar verebilir (birlikte olma özgürlüğü).
      </p>
      <p class="mb-3">
        Bu geleneksel sansürden tamamen farklıdır: Bir röle içeriğinizi reddetse bile, içeriğiniz diğer rölelerinizde yayınlanmaya devam eder. Hatta isterseniz 5 dakika içinde kendi bağımsız rölenizi (örneğin Khatru ile) kurup yayın yapabilirsiniz.
      </p>
    `,
  },
  {
    id: 'role-ekonomisi',
    category: 'ekonomi',
    question: 'Röleleri ayakta tutacak ekonomik teşvik modeli nedir?',
    shortAnswer: 'Röle işletmek son derece ucuzdur ($5/ay ile binlerce kullanıcı). Ücretli üyelikler, topluluk bağışları ve Lightning mikro ödemeleri altyapıyı fonlar.',
    answerHtml: `
      <p class="mb-3">
        Nostr röleleri oldukça hafif ve optimize yazılımlardır. Aylık 5-10 dolarlık mütevazı bir sanal sunucu dahi binlerce aktif kullanıcıya sorunsuz hizmet verebilir.
      </p>
      <p class="mb-3">
        Ağdaki röleler farklı motivasyonlarla yaşatılır:
      </p>
      <ul class="list-disc list-inside space-y-2 mb-3 text-slate-700 dark:text-slate-300">
        <li><strong>Topluluk & Gönüllülük:</strong> Nostr Türkiye gibi yerel veya tematik toplulukların ortak katkılarıyla fonlanan kamu yararına röleler.</li>
        <li><strong>Ücretli / Özel Röleler:</strong> Spam'den uzak, yüksek hızlı ve özel arşivleme sunan aylık/yıllık abonelikli röleler.</li>
        <li><strong>Geliştirici & Şirket Desteği:</strong> Kendi istemcilerini ve ekosistem ürünlerini desteklemek isteyen ekiplerin kurduğu açık röleler.</li>
      </ul>
    `,
  },
  {
    id: 'bitcoin-ve-zaps',
    category: 'ekonomi',
    question: 'Nostr\'ın Bitcoin ile ilişkisi nedir? Kullanmak için Bitcoin bilmek zorunda mıyım?',
    shortAnswer: 'Hayır, Nostr Bitcoin olmadan da eksiksiz çalışır. Ancak Bitcoin Lightning entegrasyonu (Zap) sayesinde içerik üreticilerine anlık bahşiş gönderilebilir.',
    answerHtml: `
      <p class="mb-3">
        Nostr, Bitcoin ile aynı kriptografik temeli (Schnorr imzaları ve secp256k1 eğrisi) paylaşır ve ilk benimseyen topluluk Bitcoin geliştiricileri olmuştur. Ancak <strong>Nostr protokolü Bitcoin'e bağımlı değildir</strong>.
      </p>
      <p class="mb-3">
        İçerik okumak, mesajlaşmak veya topluluklara katılmak için Bitcoin'e sahip olmanız gerekmez.
      </p>
      <p>
        <strong>Zap Nedir?</strong> NIP-57 standardıyla geliştirilen Zap sistemi, beğendiğiniz bir içeriğe veya yazara tek tıkla 1 Satoshi bile olsa mikro değer aktarmanızı sağlayan yerleşik ve isteğe bağlı bir bahşiş mekanizmasıdır.
      </p>
    `,
  },
  {
    id: 'algoritmasiz-kesif',
    category: 'ekonomi',
    question: 'Merkezi algoritmalar yoksa yeni içerikleri ve kişileri nasıl keşfederim?',
    shortAnswer: 'Sosyal grafik etkileşimleri, tematik röleler, Web of Trust ve bağımsız Algoritma Sağlayıcıları (DVM - NIP-89/90) ile keşif yapılır.',
    answerHtml: `
      <p class="mb-3">
        Nostr'da tek bir algoritma tekelinin yerini <strong>özgür ve seçilebilir keşif modelleri</strong> almıştır:
      </p>
      <ul class="list-disc list-inside space-y-2 mb-3 text-slate-700 dark:text-slate-300">
        <li><strong>Doğal Sosyal Ağ:</strong> Takip ettiğiniz kişilerin beğendiği, paylaştığı veya etkileşime girdiği profilleri organik olarak keşfedersiniz.</li>
        <li><strong>Tematik & Topluluk Röleleri:</strong> Yazılım, sanat, haber veya Türkiye odaklı özel rölelere bağlanarak ilgi alanınıza uygun gönderileri yakalarsınız.</li>
        <li><strong>Veri Satış Makineleri (DVM - NIP-89/90):</strong> Dilediğiniz açık kaynaklı yapay zeka veya sıralama algoritmasını istemcinize entegre edebilirsiniz; içerik sıralama algoritmanızı siz seçersiniz.</li>
      </ul>
    `,
  },
  {
    id: 'arama-nasil-calisir',
    category: 'genel',
    question: 'Nostr\'da arama (Search) nasıl çalışır?',
    shortAnswer: 'NIP-50 arama destekli röleler, istemci taraflı yerel indeksleme ve nostr.band gibi açık arama motorları üzerinden arama yapılır.',
    answerHtml: `
      <p class="mb-3">
        Nostr'da arama üç farklı katmanda gerçekleşir:
      </p>
      <ol class="list-decimal list-inside space-y-2 mb-3 text-slate-700 dark:text-slate-300">
        <li><strong>NIP-50 Arama Röleleri:</strong> Tam metin (full-text) aramayı destekleyen özel röleler, iletileri indeksler ve istemcilerin anahtar kelimelere göre sorgu yapmasına olanak tanır.</li>
        <li><strong>İstemci İçi Yerel Arama:</strong> Kullandığınız istemci daha önce indirdiği tüm gönderileri cihazınızda yerel SQLite veya IndexedDB içinde arar.</li>
        <li><strong>Özel Arama İndeksleyicileri:</strong> <em>nostr.band</em> gibi genel ağ indeksleyicileri gelişmiş trend, konu etiketi ve profil aramaları sunar.</li>
      </ol>
    `,
  },
];
