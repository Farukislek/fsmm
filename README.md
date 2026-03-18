# Kredibu.com - Banka Kredi Kampanya Sitesi

Bu proje, **Kredibu.com** alan adı için hazırlanmış; bankaların kredi kampanyalarını kullanıcı dostu şekilde listeleyen, mobil ve masaüstü uyumlu, reklam geliri odaklı bir web site iskeletidir.

## Özellikler

- Mobil + masaüstü uyumlu responsive tasarım
- Kredi türüne göre filtreleme (ihtiyaç / konut / taşıt)
- Bankaya göre filtreleme
- Faiz oranı ve güncellik bazlı sıralama
- SEO için temel meta etiketleri
- Reklam yerleşimi için hazır alanlar (Google AdSense için uygun)
- Kampanya verilerini tek bir JSON dosyasından yönetme

## Dosya Yapısı

```text
.
├── index.html            # Ana sayfa
├── styles.css            # Arayüz tasarımı
├── app.js                # Filtreleme/sıralama/veri işleme
└── data/
    └── campaigns.json    # Kampanya verileri
```

---

## 1) Lokalde Çalıştırma

`fetch` ile JSON okunduğu için dosyayı direkt çift tıklayarak değil, küçük bir web server ile açmalısın.

### Seçenek A - Python ile

```bash
python3 -m http.server 8080
```

Ardından tarayıcıda aç:

```text
http://localhost:8080
```

### Seçenek B - Node (serve) ile

```bash
npx serve .
```

---

## 2) Domaine Yükleme (Kredibu.com)

Aşağıda en kolay ve pratik yöntem: **Cloudflare Pages** veya **Netlify**. (İkisi de statik site için hızlıdır.)

---

### Yöntem 1: Netlify (Kolay Başlangıç)

1. GitHub'da bu projeyi bir repo olarak tut.
2. Netlify hesabı açıp `Add new site` → `Import an existing project` seç.
3. GitHub repoyu bağla.
4. Build ayarı gerekmez (statik site):
   - Build command: boş bırak
   - Publish directory: `.`
5. Site deploy olduktan sonra `Domain settings` bölümüne gir.
6. `Add custom domain` ile `kredibu.com` ekle.
7. DNS tarafında domain sağlayıcında aşağıdaki ayarı yap:
   - `A`/`CNAME` kayıtlarını Netlify yönlendirmesine göre güncelle.
8. SSL/TLS otomatik aktif olur.

---

### Yöntem 2: Cloudflare Pages (Performans + DNS Tek Panel)

1. Domainin Cloudflare DNS'e bağlıysa önerilir.
2. Cloudflare Dashboard → `Workers & Pages` → `Create` → `Pages`.
3. GitHub repoyu bağla.
4. Build ayarı:
   - Framework preset: `None`
   - Build command: boş
   - Output directory: `/`
5. Deploy sonrası `Custom domains` kısmından `kredibu.com` ekle.
6. DNS kaydını Cloudflare otomatik yönetir.

---

## 3) Kampanya Verisini Güncelleme (Yönetim)

Kampanya verileri `data/campaigns.json` dosyasında tutulur.

Her kayıt formatı:

```json
{
  "bank": "Banka Adı",
  "name": "Kampanya adı",
  "type": "ihtiyac | konut | tasit",
  "rate": 3.19,
  "maturity": "36 aya kadar",
  "maxAmount": "250.000 TL",
  "updatedAt": "2026-03-15",
  "note": "Kısa açıklama",
  "url": "https://banka-linki"
}
```

### Güncelleme Rutini (öneri)

- Haftada 1 gün (örn. Pazartesi) kampanyaları kontrol et.
- Değişen faiz/vade/masraf bilgilerini JSON’da güncelle.
- `updatedAt` tarihini güncel gün yap.
- Commit + push yap, Netlify/Cloudflare otomatik yeniden yayınlar.

---

## 4) Reklam Geliri Kurulumu (AdSense)

> Not: Bu proje içinde reklam alanları placeholder olarak hazırdır.

1. Google AdSense hesabı oluştur ve `kredibu.com` alan adını doğrula.
2. `index.html` içine AdSense global scriptini `<head>` bölümüne ekle.
3. `Reklam Alanı` yazan blokların içindeki yorumları gerçek AdSense unit kodu ile değiştir.
4. İlk etapta 2-3 konum idealdir:
   - Hero altı (üst banner)
   - Kampanya listesi ortası/altı (in-article)
   - Footer üstü
5. Sayfayı reklamla doldurma; kullanıcı deneyimini bozma (AdSense politikası açısından önemli).

---

## 5) SEO ve Trafik Büyütme Planı

Pasif gelir için kritik unsur organik trafiktir. Önerilen plan:

- Her hafta 2 içerik üret:
  - "Mart 2026 en düşük faizli ihtiyaç kredisi"
  - "Konut kredisi hesaplama rehberi"
  - "Kredi notu nasıl yükseltilir?"
- Her içerikte tablo + kısa özet + CTA kullan.
- Search Console kaydı yap, sitemap gönder.
- Sayfa hızını yüksek tut (görsel optimizasyonu, az JS).

> İstersen ikinci adım olarak blog altyapısı (ör. `/blog`) da eklenebilir.

---

## 6) Güven, Hukuk ve Uyum

Finans içeriklerinde güven çok önemli:

- "Yatırım/finansal danışmanlık değildir" ibaresini koru.
- Banka linklerini resmi kaynaklara ver.
- Son güncelleme tarihlerini net göster.
- Yanıltıcı vaatlerden kaçın.

---

## 7) Gelecek Geliştirme Önerileri

- Kredi hesaplama aracı (taksit/geri ödeme)
- Kullanıcı favori kampanya listesi (localStorage)
- Blog + kategori sistemi
- JSON yerine basit CMS paneli (ör. Supabase + admin)
- Affiliate entegrasyonları (uygunsa)

---

## 8) Hızlı Yayın Kontrol Listesi

- [ ] Domain DNS yönlendirmesi doğru
- [ ] HTTPS aktif
- [ ] Kampanya verileri güncel
- [ ] AdSense kodu eklendi
- [ ] Mobil görünüm test edildi
- [ ] Search Console doğrulandı

