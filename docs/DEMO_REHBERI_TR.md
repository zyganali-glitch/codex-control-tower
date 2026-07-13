# Demo Videosu Çekim Rehberi

Bu belge, bilgisayarda bu tür bir çalışma daha önce yapmamış biri düşünülerek hazırlanmıştır. Sırayı değiştirmeden ilerle. Bir adımda beklenen görüntüyü görmezsen sonraki adıma geçme; en alttaki “Bir şey ters giderse” bölümüne bak.

## Önce ne yapacağımızı bil

Videoda iki ayrı şeyi göstereceğiz:

1. InvoiceFlow Mini adlı tamamen uydurma örnek proje üzerinde yerel ve kurallı inceleme.
2. Codex uygulamasındaki ChatGPT üyelik oturumunu kullanan gerçek `gpt-5.6-sol` incelemesi.

25 ve 88 puanları ile örnek proje verileri benzetimdir. GPT-5.6 Sol’un ürettiği inceleme ise gerçektir. Videoda bu ayrımı söyle.

## Çekimden bir gün önce yapılacaklar

### 1. Codex oturumunu kontrol et

1. Windows ekranının en altındaki arama yerine tıkla.
2. `Codex` yaz.
3. Çıkan Codex uygulamasına bir kez tıkla.
4. Uygulama açıldığında hesabının açık olduğundan emin ol.
5. Giriş yapmanı isteyen bir ekran varsa `Continue` veya `Sign in with ChatGPT` yazan düğmeye tıkla.
6. İnternet tarayıcısında açılan sayfada ChatGPT Plus kullandığın hesabı seç.
7. İşlem bitince Codex uygulamasına dön.
8. Codex içinde yeni bir görev açmana gerek yok. Uygulamayı kapatma; küçültebilirsin.

Beklenen sonuç: Codex uygulamasında normal çalışma ekranını görmelisin; tekrar giriş yapmanı isteyen ekran kalmamalı.

### 2. Proje klasörünü bul

Bu bilgisayardaki proje klasörü:

`C:\Users\MEHMET\.gemini\antigravity\scratch\codex-control-tower`

1. Klavyede Windows işaretli tuş ile `E` tuşuna aynı anda bas.
2. Açılan pencerede en üstteki adres alanına bir kez tıkla.
3. Yukarıdaki klasör yolunu olduğu gibi yaz veya yapıştır.
4. Klavyede Enter tuşuna bas.

Beklenen sonuç: İçeride `README.md`, `package.json`, `docs`, `apps`, `cli` ve `examples` gibi adlar görmelisin.

### 3. İlk komut penceresini aç

Burada “komut penceresi” dediğimiz şey, yazdığımız kısa talimatları çalıştıran koyu renkli penceredir.

1. Proje klasörü açıkken boş bir yere sağ tıkla.
2. `Terminalde Aç` veya `Open in Terminal` seçeneğine tıkla.
3. Koyu renkli bir pencere açılacak.
4. Satırın başında proje klasörünün adı görünüyorsa doğru yerdesin.

Eğer sağ tık menüsünde bu seçenek yoksa:

1. Windows arama alanına `PowerShell` yaz.
2. `Windows PowerShell` sonucuna tıkla.
3. Açılan pencereye aşağıdaki satırı yaz ve Enter tuşuna bas:

~~~powershell
cd C:\Users\MEHMET\.gemini\antigravity\scratch\codex-control-tower
~~~

### 4. Gerekli parçaları kur

Komut penceresine aşağıdaki satırı yaz ve Enter tuşuna bas:

~~~powershell
npm install
~~~

Bir süre yazılar akabilir. Bekle. Yeni bir yazı yazabileceğin satır geri gelince işlem bitmiştir.

Beklenen sonuç: Kırmızı renkte uzun bir hata metni olmamalı. `found 0 vulnerabilities` veya buna benzer bir sonuç görebilirsin.

### 5. Bütün denetimleri çalıştır

Aynı pencereye şunu yaz ve Enter tuşuna bas:

~~~powershell
npm test
~~~

Beklenen sonuç: Birçok satırda `PASS` yazısı görünmeli. En sonda başarısız denetim sayısı `0` olmalı. Burada hata varsa video çekimine başlama.

### 6. Örnek veriyi hazırla

Aynı pencereye şunu yaz ve Enter tuşuna bas:

~~~powershell
npm run demo
~~~

Beklenen sonuç:

- `SIMULATED InvoiceFlow Mini demo prepared.` yazısı,
- `Before: 25/100, 16 risks` yazısı,
- `After: 88/100, 1 risks` yazısı görünmeli.

Sayılar farklıysa videoda bu belgedeki sayıları söyleme; ekranda çıkan güncel sayıları söyle.

### 7. Gerçek Codex bağlantısını önceden sına

Aynı pencereye şunu yaz ve Enter tuşuna bas:

~~~powershell
npm run demo:codex
~~~

Bu adım gerçek GPT-5.6 Sol incelemesini çalıştırır. Birkaç dakika sürebilir. Pencereyi kapatma.

Beklenen sonuç:

- `REAL Codex review complete with gpt-5.6-sol.` yazısı,
- hemen altında `Verdict:` ile başlayan bir satır,
- `Evidence:` ile başlayan bir kanıt yolu görünmeli.

Bu sonuç çıkarsa gerçek bağlantı hazırdır. Çekimden hemen önce tekrar `npm run demo` çalıştıracağız; böylece gösterge sayfası yeniden “hazır” durumundan başlayacak.

## Çekimden hemen önce ekranı hazırla

### 1. Masaüstünü sadeleştir

1. Kişisel ileti, e-posta, parola veya özel dosya gösteren bütün pencereleri kapat.
2. Bildirimleri kapatmak için Windows ekranının sağ altındaki saat bölümüne tıkla.
3. `Rahatsız etmeyin` seçeneği görünüyorsa aç.
4. Tarayıcıda kişisel sekmeleri kapat.
5. Ekran çözünürlüğünü değiştirme; yazılar küçükse tarayıcıda `Ctrl` ve `+` tuşlarına birlikte birkaç kez basabilirsin.

### 2. Örnek veriyi yeniden başlangıç durumuna getir

İlk komut penceresinde şu satırı çalıştır:

~~~powershell
npm run demo
~~~

Yine 25, 16, 88 ve 1 değerlerini kontrol et.

### 3. Gösterge sayfasını aç

İlk komut penceresine şunu yaz ve Enter tuşuna bas:

~~~powershell
npm run dashboard
~~~

Bu pencere açık kalacak. Buraya başka bir şey yazmaya çalışma.

Beklenen sonuç:

1. İnternet tarayıcısı kendiliğinden açılmalı.
2. Adres alanında genellikle `http://localhost:5173` benzeri bir adres görünmeli.
3. Codex Control Tower gösterge sayfası açılmalı.
4. Sayfanın üst kısmında InvoiceFlow Mini’nin benzetim verisi olduğunu söyleyen şerit görünmeli.
5. `Real Codex Review` kutusunda `READY` ve `gpt-5.6-sol` görünmeli.
6. Sol alandaki küçük durum bölümünde `Scanner Ready`, `Codex review READY` ve `Data flow Local + Codex` görünmeli.

Önemli: `index.html` dosyasına çift tıklama. Bu proje o dosyaya çift tıklayarak açılmaz. Her zaman `npm run dashboard` kullan. Bu komut gerekli görüntüleme hizmetini başlatır ve doğru sayfayı kendisi açar.

### 4. İkinci komut penceresini aç

Gösterge sayfasını ve ilk komut penceresini kapatma.

1. Windows arama alanına `PowerShell` yaz.
2. `Windows PowerShell` sonucuna tıkla.
3. Açılan ikinci koyu pencereye şu satırı yaz ve Enter tuşuna bas:

~~~powershell
cd C:\Users\MEHMET\.gemini\antigravity\scratch\codex-control-tower
~~~

4. Şimdilik başka bir şey çalıştırma.
5. Aşağıdaki satırı hazır tut; video sırasında kullanacağız:

~~~powershell
npm run demo:codex
~~~

### 5. Görüntü kaydını başlat

Windows’un kendi kayıt aracını kullanacaksan:

1. Klavyede Windows işaretli tuş ile `G` tuşuna aynı anda bas.
2. Açılan araçta `Yakalama` adlı küçük bölümü bul.
3. Mikrofon işaretinin açık olduğundan emin ol.
4. Yuvarlak kayıt düğmesine tıkla.
5. Ekranın bir köşesinde süre saymaya başlayınca kayıt başlamıştır.

Kullandığın başka bir kayıt uygulaması varsa tüm ekranı ve mikrofonu kaydedecek şekilde ayarla.

## Üç dakikalık çekim sırasında tam olarak ne yapacaksın

### 0:00–0:20 — Açılış

Ekranda gösterge sayfasının en üstü açık olsun.

Şunu söyle:

“Codex kod üretimini hızlandırıyor. Fakat geliştiricinin hâlâ kapsamı, riskleri, gerçekten çalışan denetimleri, çalışmayan denetimleri ve bir sonraki güvenli adımı görmesi gerekiyor. Codex Control Tower bu süreci görünür ve incelenebilir hâle getiriyor.”

Ardından üstteki benzetim uyarısını göster ve şunu söyle:

“InvoiceFlow Mini tamamen uydurma bir demo projesidir.”

### 0:20–0:45 — Önceki dağınık durum

1. Sol menüde `Before / After` yazısına tıkla.
2. Sol taraftaki önceki durumu göster.
3. 25 puanı ve 16 risk işaretini fareyle göster.

Şunu söyle:

“Başlangıçta plan, kanıt, onay kaydı ve devamlılık bilgileri eksik. Yerel tarama bu duruma 25 puan veriyor ve 16 risk işareti gösteriyor. Bu puan güvenlik belgesi değildir; görünür çalışma düzeninin ölçüsüdür.”

### 0:45–1:10 — Risk ve bağlam

1. Sol menüde `Risks` yazısına tıkla.
2. Bir risk kartında etkilenen alanı ve öneriyi göster.
3. Sonra `Context Trace` yazısına tıkla.
4. Seçilen dosyaları ve neden seçildiklerini göster.

Şunu söyle:

“Riskler yalnızca sayı olarak bırakılmıyor; etkilenen alan, nedeni ve önerilen önlem gösteriliyor. Bağlam izi de Codex’in hangi dosyaları neden görmesi gerektiğini açıklıyor.”

### 1:10–1:35 — İnsan kararı ve hata önleme

1. Sol menüde `Mistake Shield` yazısına tıkla.
2. Kararı, nedenleri ve daha güvenli öneriyi göster.
3. Sonra `Evidence` yazısına tıkla.
4. İnsan onayı bölümünü göster.

Şunu söyle:

“Hata Kalkanı, önerilen işi riskli alanlar ve geçmiş uyarılarla karşılaştırıyor. İnsan onayı ayrı bir kayıt olarak tutuluyor. Bu, kimlik doğrulayan kurumsal bir onay sistemi değil; açık ve yerel bir karar noktasıdır.”

### 1:35–2:05 — Gerçek GPT-5.6 Sol’u çalıştır

1. İkinci komut penceresine geç.
2. Hazır tuttuğun şu satırı yaz veya yapıştır:

~~~powershell
npm run demo:codex
~~~

3. Enter tuşuna bas.
4. Hemen tarayıcıdaki gösterge sayfasına dön.
5. Sol menüde `Overview` yazısına tıkla.
6. `Real Codex Review` kutusunda durumun `RUNNING` olduğunu göster.

Şunu söyle:

“Şimdi benzetimden ayrı olan gerçek Codex katmanını çalıştırıyorum. Sistem ChatGPT üyelik oturumunu ve hesapta GPT-5.6 Sol bulunduğunu denetliyor. Model yalnızca okuma izniyle çalışıyor. Ana puan yine kurallı ve tekrar üretilebilir kalıyor.”

Model bu otuz saniye içinde bitmezse sessizce bekleme. Diğer bölümleri göster; sonuç geldiğinde bu kutu kendiliğinden `COMPLETE` olacaktır.

### 2:05–2:30 — Kanıt sınırı

1. Sol menüde `Evidence` yazısına tıkla.
2. `PASS`, `WARN`, `FAIL`, `NOT_RUN` ve `SIMULATED` ayrımını göster.
3. `NOT_RUN` satırlarından birini fareyle göster.

Şunu söyle:

“Başarılı, uyarılı, başarısız, çalıştırılmamış ve benzetilmiş sonuçlar birbirine karıştırılmıyor. Bir dosyanın var olması, denetimin çalıştığı anlamına gelmiyor.”

### 2:30–2:50 — Sonraki durum ve gerçek sonuç

1. `Before / After` bölümüne dön.
2. 88 puanı ve 1 kalan riski göster.
3. Sonra `Overview` bölümüne dön.
4. Gerçek inceleme tamamlandıysa `COMPLETE`, `gpt-5.6-sol`, sonuç özeti ve sonraki güvenli adımı göster.

Şunu söyle:

“Düzenlenmiş örnek 88 puana çıkıyor ve risk işaretleri 16’dan 1’e düşüyor. İki dar kapsamlı örnek denetimi geçti; diğer çalıştırılmamış denetimler görünür kalıyor. Buradaki GPT-5.6 Sol değerlendirmesi gerçek, örnek projenin kendisi ise benzetimdir.”

Gerçek inceleme henüz bitmediyse ikinci komut penceresine kısa süre dön. Tamamlanma yazısı geldiğinde gösterge sayfasına dön; sayfa kendiliğinden yenilenir.

### 2:50–3:00 — Kapanış

Gösterge sayfasında genel görünüm açıkken şunu söyle:

“Codex yazar. Control Tower kanıtlar. Geliştirici karar verir. Böylece bağlam işten önce, kanıt işten sonra ve devamlılık bir sonraki oturum için hazırdır.”

## Kaydı bitir

1. Windows işaretli tuş ile `G` tuşuna birlikte bas.
2. Kare biçimli durdurma düğmesine tıkla.
3. Kaydın oluştuğunu bildiren yazı görünmeli.
4. İlk komut penceresine dön.
5. Gösterge sayfasını durdurmak için klavyede `Ctrl` ve `C` tuşlarına aynı anda bas.
6. `Terminate batch job` benzeri bir soru çıkarsa `Y` yazıp Enter tuşuna bas.

## Kaydı izle ve kontrol et

Videoyu göndermeden önce baştan sona izle. Şunların hepsi görünmeli ve duyulmalı:

- InvoiceFlow Mini’nin benzetim olduğu söylendi.
- 25/100 ve 16 risk önceki durum olarak gösterildi.
- 88/100 ve 1 risk sonraki durum olarak gösterildi.
- `NOT_RUN` sonuçlarının hâlâ açık olduğu söylendi.
- Gerçek Codex kutusunda `gpt-5.6-sol` gösterildi.
- Gerçek Codex çalışması ile benzetim proje verisi birbirine karıştırılmadı.
- Ekranda kişisel bilgi, parola veya gizli anahtar görünmedi.
- Ses anlaşılır ve yazılar okunabilir.

## Bir şey ters giderse

### Tarayıcı kendiliğinden açılmazsa

İlk komut penceresinde `Local:` satırını bul. Yanındaki `http://localhost:...` adresini tarayıcının üst adres alanına yaz ve Enter tuşuna bas.

### Sayfa açılmazsa

1. `index.html` dosyasına tıklamadığından emin ol.
2. İlk komut penceresini kapat.
3. Yeni bir PowerShell penceresi aç.
4. Proje klasörüne geç.
5. Sırayla `npm install`, `npm run demo`, `npm run dashboard` çalıştır.

### Adres zaten kullanılıyor yazarsa

Başka bir gösterge penceresi açık kalmış olabilir. Açık koyu pencerelerde `Ctrl` ve `C` tuşlarına birlikte bas. Sonra `npm run dashboard` komutunu yeniden çalıştır.

### Gerçek Codex çalışması giriş istiyorsa

1. Codex uygulamasını aç.
2. ChatGPT Plus hesabınla giriş yap.
3. Codex uygulamasını kapatmadan ikinci komut penceresine dön.
4. `npm run demo:codex` komutunu yeniden çalıştır.

### Model kullanılamıyor yazarsa

Codex uygulamasında model seçme alanını aç ve GPT-5.6 Sol’un hesabında göründüğünü kontrol et. Görünmüyorsa o gün gerçek model bölümünü çekme; videoda çalışmış gibi gösterme.

### Gerçek inceleme hata verirse

Hata metnini gizleyip başarı iddiasında bulunma. İnternet bağlantısını ve Codex oturumunu kontrol et, `npm run demo` ile başlangıcı yenile, sonra tekrar dene.

### Sayfa eski sonucu gösteriyorsa

1. İlk komut penceresinde `Ctrl` ve `C` tuşlarına bas.
2. `npm run demo` çalıştır.
3. `npm run dashboard` çalıştır.
4. Tarayıcıda `Ctrl` ve `R` tuşlarına birlikte bas.

## İlgili belgeler

- İngilizce üç dakikalık anlatım: [DEMO_SCRIPT.md](DEMO_SCRIPT.md)
- Proje ana açıklaması: [README.md](../README.md)
- Gönderim metni: [DEVPOST_SUBMISSION.md](DEVPOST_SUBMISSION.md)
