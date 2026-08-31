# Güvenlik Politikası (Security Policy)

Nostr Türkiye Topluluğu olarak kullanıcılarımızın, geliştiricilerimizin ve topluluk üyelerimizin güvenliğine büyük önem veriyoruz.

---

## 🔑 Anahtar Güvenliği ve Protokol Kuralları

1. **Özel Anahtarlar (nsec / Private Keys)**:
   - Nostr özel anahtarlarınızı (`nsec1...`) **ASLA** bu depoda, commit mesajlarında, issue bildirimlerinde veya PR'larda paylaşmayın.
   - Projede geliştirme yaparken yalnızca açık anahtar (`npub1...` veya hex pubkey) kullanın.
   - `.env` ve gizli anahtarlar `.gitignore` dosyası ile güvenceye alınmıştır.

2. **NIP-05 Kimlik Doğrulaması**:
   - `src/worker.ts` ve `src/data/members.ts` üzerinden sunulan `name@nostr.org.tr` adresleri, ilgili `pubkey` ile eşleştirilir.
   - Bir üyenin anahtarı ele geçirilirse veya değiştirilmesi gerekirse, acil olarak iletişime geçilmelidir.

---

## 🚨 Güvenlik Açığı Bildirimi (Reporting a Vulnerability)

Projede veya altyapıda (Cloudflare Workers, NIP-05 servisi, web sitesi) bir güvenlik açığı tespit ederseniz, lütfen bunu **kamusal bir GitHub Issue olarak AÇMAYIN**.

Bunun yerine:
1. `iletisim@nostr.org.tr` adresine e-posta gönderin veya
2. Resmi topluluk Nostr yöneticilerine DM (şifreli mesaj) ile iletin.

Lütfen bildiriminizde şunları belirtin:
- Açığın tanımı ve potansiyel etkisi
- Sorunu yeniden oluşturmak için adımlar (PoC)
- Varsa önerilen düzeltme adımı

Güvenlik bildirimleri en geç 48 saat içinde incelenecek ve sorumlu ifşa (responsible disclosure) ilkeleri doğrultusunda çözüme kavuşturulacaktır.
