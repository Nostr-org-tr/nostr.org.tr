# nostr.org.tr — Nostr Türkiye Topluluğu

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020.svg)](https://workers.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg)](https://www.typescriptlang.org)

**Türkiye'deki Nostr kullanıcılarını, geliştiricilerini ve içerik üreticilerini bir araya getiren açık kaynaklı topluluk platformu.**

[Web Sitesi](https://nostr.org.tr) • [Manifesto](https://nostr.org.tr/manifesto) • [Rehber](https://nostr.org.tr/rehber) • [Röleler](https://nostr.org.tr/roleler) • [Topluluk](https://nostr.org.tr/topluluk)

</div>

---

## 📖 Hakkında (About)

`nostr.org.tr`, sansüre dirençli, açık ve merkeziyetsiz sosyal protokol olan **Nostr** (Notes and Other Stuff Transmitted by Relays) ekosistemini Türkiye'de tanıtmak, Türkçe kaynak üretmek ve yerel topluluğu güçlendirmek amacıyla geliştirilmiştir.

### ✨ Temel Özellikler

- **📜 Manifesto**: Nostr vizyonu, sansürsüz iletişim ve protokol felsefesi (Türkçe & İngilizce).
- **⚡ NIP-05 Kimlik Çözümleyici**: `src/worker.ts` üzerinde çalışan Cloudflare Worker ile `adiniz@nostr.org.tr` adreslerini otomatik `pubkey` hex değerlerine çeviren NIP-05 uç noktası (`/.well-known/nostr.json`).
- **📶 Canlı Röle Ping**: Türkiye ve küresel rölelerin gecikme (latency) ve erişilebilirlik durumunu tarayıcı WebSocket API ile gerçek zamanlı ölçen araç.
- **👥 Topluluk Rehberi & Anahtar Dönüştürücü**: `npub` ↔ `hex` dönüştürücü ve topluluk üyelerinin profilleri.
- **📚 Başlangıç ve İleri Düzey Rehberler**: İstemciler (Damus, Amethyst, Coracle, Primal), anahtar güvenliği, Zaps ve NIP standartları.
- **📦 Takip Paketleri**: Tek tıkla içe aktarılabilir tematik Nostr takip listeleri.
- **🎥 Konuşmalar & Projeler**: Türkçe Nostr sunumları ve Türkiye merkezli açık kaynak projeler.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Alan | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Framework** | [Astro 5](https://astro.build) | Yüksek performanslı statik site üretimi (SSG) |
| **Stil / UI** | [Tailwind CSS](https://tailwindcss.com) + Typography | Temiz, hafif-öncelikli (light-first) ve duyarlı arayüz |
| **İkonlar** | [Lucide Astro](https://lucide.dev) | Modern ve tutarlı SVG ikon seti |
| **Edge / Backend** | [Cloudflare Workers](https://workers.cloudflare.com) | NIP-05 `nostr.json` API'si ve statik varlık sunumu |
| **Dil** | [TypeScript](https://www.typescriptlang.org) | Katı tip denetimi ve güvenli veri modelleri |

---

## 🚀 Hızlı Başlangıç (Quickstart)

### Gereksinimler
- Node.js `22.x` (veya `.nvmrc` ile uyumlu sürüm)
- npm `10.x+`
- GNU Make (isteğe bağlı, kolay komutlar için)

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/nostr-turkiye/nostr.org.tr.git
cd nostr.org.tr
```

### 2. Node Sürümünü Seçin ve Bağımlılıkları Yükleyin
```bash
nvm use
make install
# veya: npm install
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
make dev
# veya: npm run dev
```
Tarayıcınızda [http://localhost:4321](http://localhost:4321) adresini açın.

### 4. Tip Kontrolü ve Derleme
```bash
make check   # Astro tanı ve tip kontrolleri
make build   # Üretim sürümü için statik derleme
```

---

## 📁 Dizin Yapısı (Project Structure)

```text
.
├── .agents/               # Ajan ve geliştirici rol belgeleri
├── .github/
│   ├── ISSUE_TEMPLATE/    # GitHub Issue şablonları (üye ekleme, röle ekleme vb.)
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/ci.yml   # CI otomasyonu (tip kontrolü + build)
├── public/                # Statik varlıklar (görseller, favicon vb.)
├── src/
│   ├── components/        # Yeniden kullanılabilir Astro bileşenleri
│   │   └── seo/           # Yapılandırılmış veri / JSON-LD bileşenleri
│   ├── data/              # Topluluk verileri (üyeler, röleler, projeler, konuşmalar)
│   │   ├── members.ts     # Topluluk üyeleri & NIP-05 eşleştirmeleri
│   │   ├── relays.ts      # Türkiye ve küresel röle tanımları
│   │   ├── projects.ts    # Açık kaynak Nostr projeleri
│   │   ├── talks.ts       # Konuşmalar ve video içerikleri
│   │   └── followLists.ts # Tematik takip listeleri
│   ├── layouts/           # Sayfa yerleşimleri (Layout.astro, GuideLayout.astro)
│   ├── pages/             # Sayfa rotaları
│   │   └── en/            # İngilizce sayfalar
│   ├── styles/            # Global CSS stilleri
│   ├── utils/             # nostrKey.ts vb. yardımcı fonksiyonlar
│   └── worker.ts          # Cloudflare Worker NIP-05 API işleyicisi
├── AGENTS.md              # Takım iş akışı kuralları
├── astro.config.mjs       # Astro konfigürasyonu
├── Makefile               # Geliştirici kısayolları
├── tailwind.config.mjs    # Tailwind tema ve renk yapılandırması
├── tsconfig.json          # TypeScript ayarları
└── wrangler.jsonc         # Cloudflare Workers yapılandırması
```

---

## 🤝 Katkıda Bulunma (Contributing)

Topluluğumuza katkıda bulunmak isterseniz:

1. Yeni bir üye, röle, konuşma veya proje eklemek için [`CONTRIBUTING.md`](CONTRIBUTING.md) belgesini inceleyin.
2. Basit veri eklemeleri için doğrudan `src/data/` altındaki ilgili TypeScript dosyasını güncelleyerek Pull Request açabilirsiniz.
3. PR göndermeden önce `make check && make build` komutunun hatasız çalıştığından emin olun.

Tüm katılımcılarımızın [Davranış Kuralları](CODE_OF_CONDUCT.md) belgesine uyması beklenmektedir.

---

## 🔒 Güvenlik (Security)

Güvenlik açığı bildirimleri ve anahtar güvenliği politikamız için [`SECURITY.md`](SECURITY.md) belgesini inceleyebilirsiniz.

---

## 📜 Lisans (License)

Bu proje [MIT Lisansı](LICENSE) altında açık kaynak olarak sunulmaktadır.
