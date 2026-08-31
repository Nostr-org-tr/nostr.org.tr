# Katkı Kılavuzu (Contributing Guide)

Nostr Türkiye Topluluğu web sitesine (`nostr.org.tr`) katkıda bulunmak istediğiniz için teşekkür ederiz! Bu kılavuz, projeye nasıl katkı sağlayabileceğinizi adım adım açıklar.

---

## 🧭 Hızlı Katkı Seçenekleri

### 1. Topluluk Üyesi Olarak Eklenmek
Topluluk sayfasında yer almak ve `kullaniciadi@nostr.org.tr` NIP-05 kimliğine sahip olmak için:

1. [`src/data/members.ts`](src/data/members.ts) dosyasını açın.
2. `members` dizisine yeni bir nesne ekleyin:
   ```typescript
   {
     name: "Adınız veya Takma Adınız",
     handle: "kullaniciadi", // nip05 için: kullaniciadi@nostr.org.tr
     npub: "npub1...",       // Nostr açık anahtarınız (npub formatında)
     bio: "Kısa biyografiniz veya ilgi alanlarınız",
     avatar: "https://... (veya /avatars/adiniz.jpg)",
     roles: ["Geliştirici", "Topluluk"], // Uygun roller
     website: "https://example.com", // İsteğe bağlı
     twitter: "twitter_handle",       // İsteğe bağlı
     github: "github_handle"          // İsteğe bağlı
   }
   ```
3. İpucu: Hex pubkey kullanmak yerine `npub1...` formatında girin, sistem otomatik olarak NIP-05 uyumlu hex formatına dönüştürür.

---

### 2. Yeni Bir Röle (Relay) Eklemek
Türkiye merkezli veya topluluk için önerilen bir röle eklemek için:

1. [`src/data/relays.ts`](src/data/relays.ts) dosyasını açın.
2. `relays` dizisine yeni röle tanımını ekleyin:
   ```typescript
   {
     url: "wss://relay.ornek.org.tr",
     name: "Örnek TR Rölesi",
     description: "Türkiye merkezli, yüksek hızlı Nostr rölesi.",
     location: "İstanbul, TR",
     operator: "Operatör Adı veya npub",
     isTurkish: true,
     supportedNips: [1, 2, 9, 11, 20, 50]
   }
   ```

---

### 3. Türkçe Nostr Konuşması veya Video Eklemek
[`src/data/talks.ts`](src/data/talks.ts) dosyasına konuşma veya podcast kaydını ekleyebilirsiniz.

---

### 4. Nostr Projesi Eklemek
Türkiye'den geliştirilen veya Türkçe destekli açık kaynak Nostr projelerini [`src/data/projects.ts`](src/data/projects.ts) dosyasına ekleyebilirsiniz.

---

## 💻 Geliştirme İş Akışı

1. **Depoyu Çatallayın (Fork) ve Klonlayın**:
   ```bash
   git clone https://github.com/<kullanici-adiniz>/nostr.org.tr.git
   cd nostr.org.tr
   ```

2. **Geliştirme Dalı Oluşturun**:
   ```bash
   git checkout -b ozellik/yeni-uye-ekleme
   ```

3. **Node Sürümünü ve Bağımlılıkları Hazırlayın**:
   ```bash
   nvm use
   make install
   ```

4. **Değişiklikleri Yapın ve Doğrulayın**:
   ```bash
   make check   # Tip denetimi ve Astro tanıları
   make build   # Statik derleme testi
   ```

5. **Commit ve Push**:
   Anlaşılır, açık commit mesajları kullanın:
   ```bash
   git commit -m "feat(members): add @ahmet to community directory"
   git push origin ozellik/yeni-uye-ekleme
   ```

6. **Pull Request Açın**:
   GitHub üzerinden `nostr-turkiye/nostr.org.tr` deposunun `master` dalına PR gönderin. PR şablonundaki onay kutularını doldurun.

---

## 📐 Kod Standartları

- **TODO Bırakmayın**: Kod tabanına tamamlanmamış `TODO` yorumları eklemek yerine özellikleri eksiksiz teslim edin.
- **Tip Güvenliği**: Tüm TypeScript türleri (`src/data/`) tanımlı ve katı modda (`strict`) geçmelidir.
- **Hafif Tema Önceliği**: Yeni bileşen eklerken önce açık temanın (light mode) mükemmel göründüğünden emin olun.

Sorularınız ve topluluk iletişimi için Nostr veya Telegram kanalımız üzerinden ulaşabilirsiniz!
