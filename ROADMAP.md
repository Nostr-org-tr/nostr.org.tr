# Nostr Türkiye Topluluğu (nostr.org.tr) Roadmap

Bu yol haritası, **Nostr Türkiye Topluluğu** resmi web portalının (`nostr.org.tr`) geliştirme, yayınlama ve topluluk büyüme aşamalarını detaylandırmaktadır.

---

## 🎯 Proje Vizyonu
Türkiye'deki Nostr kullanıcılarını, geliştiricilerini, akademisyenlerini ve içerik üreticilerini bir araya getiren; sansürsüz, açık protokol ilkelerine dayalı zengin Türkçe içerik ve global kamuoyu için İngilizce Manifesto sunan, Cloudflare Workers ve D1 üzerinde çalışan modern, hızlı ve açık kaynaklı bir topluluk platformu inşa etmek.

---

## 🧭 Aşama 1: Temel Altyapı ve Tasarım Sistemi (Faz 1) ✅ Tamamlandı

- [x] **1.1 Proje Başlangıcı ve Yapılandırma**
  - [x] `.nvmrc` ile Node.js sürüm standardizasyonu
  - [x] Astro + Tailwind CSS + TypeScript entegrasyonu
  - [x] Cloudflare Workers & Cloudflare D1 Database yapılandırması (`wrangler.jsonc`)
  - [x] `Makefile` ile geliştirme ve derleme otomasyonu
  - [x] SEO, OpenGraph, Canonical ve meta altyapısı

- [x] **1.2 Marka & Tasarım Sistemi (Açık Tema Öncelikli)**
  - [x] Nostr moru (`#8B5CF6`), Lightning sarısı (`#F59E0B`) ve zarif Türk bayrağı kırmızısı-beyazı (`#E11D48`/`#FFFFFF`) entegreli özel SVG logo (`logo-nostr-tr.svg`)
  - [x] Varsayılan açık tema (Light Mode First) ve tam karanlık tema (Dark Mode) desteği
  - [x] Tipografi hiyerarşisi ve responsive grid sistemi

- [x] **1.3 Minimalist ve Sade Navigasyon (Header & Footer)**
  - [x] Slogansız, temiz logo tasarımı
  - [x] İkon odaklı, kısa ve net menü butonları (Manifesto, Topluluk, Röleler, Projeler, Listeler, Rehber, Konuşmalar)
  - [x] Tek tıkla TR / EN (Manifesto) dil bağlantısı
  - [x] Tema değiştirici (Light/Dark Switcher)
  - [x] Açık kaynak GitHub bağlantısı

---

## 🧭 Aşama 2: Veri Katmanı ve Dil Kapsamı (Faz 2) ✅ Tamamlandı

- [x] **2.1 Dil Kapsamı (TR Öncelikli + EN Manifesto)**
  - [x] Türkçe tam site mimarisi ve rotalama
  - [x] İngilizce Manifesto sayfası (`/en/manifesto`) global kitleye yönelik topluluk vizyonu
  - [x] Tip güvenli veri modelleri ve sözlükler

- [x] **2.2 Topluluk ve Ekip Veri Modeli**
  - [x] Kurucu: Emre Yılmaz (`@delirehberi` / `delirehberi@emre.xyz`)
  - [x] Topluluk üyeleri: Delibalized, Özgür Vurgun
  - [x] Çalışma grupları (Guilds) ve `ekip@nostr.org.tr` başvuru altyapısı (`src/data/members.ts`)

- [x] **2.3 Manifesto İçeriği**
  - [x] Türkçe Orijinal Manifesto (5 Temel İlke - `/manifesto`)
  - [x] Profesyonel İngilizce Çeviri (`/en/manifesto`)

- [x] **2.4 Projeler, Röleler, Takip Listeleri ve Rehber Verileri**
  - [x] `relay.nostr.org.tr` (Okuma açık, yazma topluluk üyelerine whitelist ile) ve küresel röleler (`src/data/relays.ts`)
  - [x] **`x2nostr.emre.xyz`** ve **`bridge.workouse.com`** öne çıkan araçları (`src/data/projects.ts`)
  - [x] Akademisyenler, Influencerlar, Geliştiriciler, Topluluk Liderleri takip listeleri (`src/data/followLists.ts`)
  - [x] DevFest Istanbul 2025 sunumu (*Nostr: A Protocol for Freedom of Speech*) (`src/data/talks.ts`)
  - [x] Kapsamlı rehber konuları ve istemci bağlantıları (`src/data/guides.ts`)

---

## 🧭 Aşama 3: İnteraktif Bileşenler & Nostr Entegrasyonları (Faz 3) ✅ Tamamlandı

- [x] **3.1 Üye & Profil Kartları ve Ekibe Katıl Bölümü (`MemberCard` & `ApplyTeamCard`)**
  - [x] Tek tıkla `npub` kopyalama (`CopyButton.astro`)
  - [x] `nostr:` protokolü ile yerel Nostr istemcisinde açma
  - [x] NIP-05 doğrulama rozeti ve Lightning adresi
  - [x] **"Topluluk Ekibine Katıl"**: `ekip@nostr.org.tr` şablonlu e-posta tetikleyicisi (`ApplyTeamCard.astro`)

- [x] **3.2 Canlı Röle Durum ve Ping Test Aracı (`RelayPingCard`)**
  - [x] Tarayıcı üzerinden WebSocket ile canlı ping ölçümü (ms cinsinden gecikme)
  - [x] `relay.nostr.org.tr` (Open Read, Whitelist Write) ve küresel röleler
  - [x] Röleye yazma izni başvuru rehberi (`ekip@nostr.org.tr`) ve `nostr:` istemciye ekleme

- [x] **3.3 Takip Listeleri & Nostr Yerel Takip / Öneri Sistemi (`FollowListGroup` & `RecommendUserModal`)**
  - [x] Zengin Kategoriler (Akademisyenler, Influencerlar, Geliştiriciler, Topluluk Liderleri, Haber & Medya)
  - [x] **Nostr Yöntemiyle Tümünü Takip Et**: Tarayıcı eklentisi (NIP-07 / Alby / nos2x) ve bunker ile tek tıkla toplu takip
  - [x] **Kullanıcı Öner Formu (Veritabanı Gerekmez - Doğrudan Nostr Mesajı)**:
    - Form: Kullanıcı adı, `npub`, kategori ve açıklama
    - Kullanıcının imzasıyla doğrudan kurucuya (`delirehberi@emre.xyz`) Nostr mesajı olarak iletilir ve yaygın rölelere yayınlanır.

- [x] **3.4 Kapsamlı Rehber, Alternatif Çözümler & Göç Araçları Düzeni (`GuideLayout`)**
  - [x] Sticky sidebar içindekiler tablosu, okuma süreleri ve bölümler
  - [x] `x2nostr.emre.xyz` ve `bridge.workouse.com` araçları ve projeler (`ProjectCard.astro`)
  - [x] DevFest Istanbul 2025 konuşma kartı (`TalkCard.astro`)

---

## 🧭 Aşama 4: Sayfa Geliştirme ve Yayınlama (Faz 4) ✅ Tamamlandı

- [x] **4.1 Türkçe Sayfalar**
  - [x] `/` (Ana Sayfa - Slogansız temiz hero, çekirdek ilkeler, canlı röle tanı önizlemesi ve topluluk alanları)
  - [x] `/manifesto` (Topluluk Manifestosu - 5 Temel İlke ve etik değerler)
  - [x] `/topluluk` (Topluluk Üyeleri, Doakrasi & `ekip@nostr.org.tr` Başvuru Bölümü)
  - [x] `/roleler` (Türkiye & Bölgesel Röleler, canlı ping tanı aracı, whitelist başvuru rehberi)
  - [x] `/projeler` (Öne Çıkan Nostr Projeleri, `x2nostr.emre.xyz`, `bridge.workouse.com` ve açık kaynak araçlar)
  - [x] `/takip-listeleri` (Küratörlü Takip Listeleri, tek tıkla toplu takip ve doğrudan Nostr mesajı ile hesap önerme formu)
  - [x] `/rehber` (Adım Adım Başlangıç, Göç Araçları ve İleri Düzey Rehber)
  - [x] `/konusmalar` (DevFest Istanbul 2025 ve Topluluk Sunumları)

- [x] **4.2 İngilizce Manifesto Sayfası**
  - [x] `/en/manifesto` (Community Manifesto in English for the global ecosystem)

---

## 🧭 Aşama 5: Test, Kalite Kontrol ve Cloudflare Yayını (Faz 5) ✅ Tamamlandı

- [x] **5.1 Kalite Kontrol ve Performans**
  - [x] TypeScript tip kontrolü (`make check`: 0 errors, 0 warnings, 0 hints)
  - [x] NIP-05 Doğrulama Endpoint'i (`public/.well-known/nostr.json` + CORS `*`)
  - [x] LLM & Yapay Zeka Keşif Standardı (`public/llms.txt` ve `public/llms-full.txt`)
  - [x] SEO İndeksleme ve Site Haritası (`public/robots.txt` ve `public/sitemap.xml`)
  - [x] WCAG 2.1 AA Erişilebilirlik ve responsive mobil/masaüstü uyumu

- [x] **5.2 Cloudflare Workers Dağıtım Hazırlığı**
  - [x] Güvenlik başlıkları (HSTS, CSP, X-Frame-Options, X-Content-Type-Options)
  - [x] Statik varlık optimizasyonu (`wrangler.jsonc` + `src/worker.ts`)
  - [x] `.env` ve `.env.example` anahtar yapılandırması

---

## 🚀 Gelecek Özellikler (Faz 6+)

- [ ] Canlı Nostr Event Akışı (Türkiye etiketli notların sitede canlı gösterimi)
- [ ] NIP-05 Doğrulama Servisi (`kullanici@nostr.org.tr` başvurusu)
- [ ] Topluluk Etkinlik Takvimi & Bildirim Botu
- [ ] Türkçe NIP Çevirileri Arşivi
