# Demo Videosu Çekim Rehberi

Bu belge, bilgisayarda bu tür bir çalışma daha önce yapmamış biri düşünülerek hazırlanmıştır. Sırayı değiştirmeden ilerle. Bir adımda beklenen görüntüyü görmezsen sonraki adıma geçme; en alttaki “Bir şey ters giderse” bölümüne bak.

## Önce ne yapacağımızı bil

Videoda iki ayrı şeyi göstereceğiz:

1. InvoiceFlow Mini adlı tamamen uydurma örnek proje üzerinde yerel ve kurallı inceleme.
2. Codex uygulamasındaki ChatGPT üyelik oturumunu kullanan gerçek `gpt-5.6-sol` Kanıt Uzlaştırması.

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

- `REAL GPT-5.6 evidence reconciliation complete with gpt-5.6-sol.` yazısı,
- hemen altında `Verdict:` ile başlayan bir satır,
- `Agreement:` ve `Locked NOT_RUN claims preserved:` satırları,
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
5. `Evidence Reconciliation` kutusunda `READY` ve `gpt-5.6-sol` görünmeli.
6. Sol alandaki küçük durum bölümünde `Scanner Ready`, `Evidence reconcile READY` ve `Data flow Local + Codex` görünmeli.

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

## İki dakika kırk beş saniyelik çekimde tam olarak ne yapacaksın

Bu bölümde yazan cümleleri İngilizce söyleyeceksin. İngilizce okuyamıyorsan cümleleri önceden bir yapay ses aracına okutabilir ve videoya bu sesi ekleyebilirsin. Söylenenlerin doğru olması şarttır.

### 0:00–0:20 — Sorun ve ürün

1. Tarayıcıda `Overview` açık olsun.
2. Üstteki `SIMULATED` uyarısını fareyle göster.
3. `Evidence Reconciliation` kutusunun tamamı görünsün.

İngilizce olarak şunu söyle:

“Codex can build software quickly, but scope, proof, skipped checks, and the next safe action can disappear inside a chat. Codex Control Tower turns that missing state into a reviewable workflow. InvoiceFlow Mini is a fully simulated demo project.”

Türkçe anlamı: Codex hızlı yazılım üretebilir; fakat kapsam, kanıt, atlanan denetimler ve sonraki güvenli adım sohbet içinde kaybolabilir. Control Tower bu eksik durumu incelenebilir hâle getirir. InvoiceFlow Mini tamamen benzetimdir.

### 0:20–0:45 — Dağınık başlangıç

1. Sol menüde `Before / After` yazısına tıkla.
2. Sol taraftaki `Before` bölümünü göster.
3. Fareyi önce `25`, sonra `16` değerinin üzerine götür.

Şunu söyle:

“The local scan finds a score of twenty-five and sixteen risk flags. This is not a security certificate. It shows missing plans, evidence, approval, and continuity around the coding work.”

### 0:45–1:10 — Sınırlı görev ve kilitli kanıt

1. Sol menüde `Overview` yazısına tıkla.
2. Sayfada aşağı kaydırıp `Next bounded Codex mission` bölümünü göster.
3. İzin verilen dosyaları ve yasaklanan işlemleri kısa süre göster.
4. Tekrar yukarı kaydırıp `Evidence Reconciliation` kutusuna dön.

Şunu söyle:

“Control Tower selects the mission context and creates a bounded Codex instruction with allowed files, forbidden actions, and required proof. Before any model call, local code locks five evidence claims as PASS, FAIL, NOT_RUN, or SIMULATED.”

### 1:10–1:25 — Codex ile nasıl yapıldığını göster

1. Codex uygulamasına geç.
2. Bu ana geliştirme görevinin açık olduğu ekranı göster.
3. Kişisel bilgi, başka konuşma adı veya gizli metin görünmediğinden emin ol.
4. Yalnızca birkaç saniye gösterip ikinci komut penceresine geç.

Şunu söyle:

“I used Codex in the desktop app to turn evidence-loss problems into the scanner, bounded mission, dashboard, tests, and reconciliation safety rules. My key product decision was that GPT-5.6 must never replace local evidence state.”

### 1:25–1:55 — Gerçek GPT-5.6’yı çalıştır

1. İkinci komut penceresine geç.
2. Şu satırı yaz veya yapıştır:

~~~powershell
npm run demo:codex
~~~

3. Enter tuşuna bas.
4. Hemen tarayıcıya dön.
5. `Overview` açık değilse tıkla.
6. `Evidence Reconciliation` kutusunda `RUNNING` yazısını göster.

Şunu söyle:

“Now this real command verifies my signed-in ChatGPT session and GPT-5.6 Sol, then runs Codex read-only against named fictional evidence. GPT-5.6 can support, question, or find a claim insufficient, but it cannot change the locked status.”

Model hemen bitmezse sessizce bekleme. Kutudaki `RUNNING`, `Read-only evidence audit` ve `Local states Locked` yazılarını göster. Sonuç geldiğinde kutu kendiliğinden `COMPLETE` olacaktır.

### 1:55–2:20 — Uzlaşma ve çalıştırılmamış denetimler

1. `Evidence Reconciliation` kutusu tamamlandıysa `COMPLETE` yazısını göster.
2. `Agreement`, `Disagreement` ve `NOT_RUN locked` sayılarını göster.
3. Aşağıdaki iddia satırlarından birini göster.
4. Sonra sol menüde `Evidence` yazısına tıkla.
5. `NOT_RUN` bölümünü göster.

Şunu söyle:

“The local reconciler rejects missing claims, status injection, unsupported evidence paths, malformed output, and any statement that the model ran tests. Agreement and disagreement stay visible, while browser, load, deployment, and independent security checks remain NOT_RUN.”

### 2:20–2:35 — İnsan kararı ve sonuç

1. `Evidence` sayfasında insan onayı bölümünü kısa süre göster.
2. `Before / After` bölümüne geç.
3. `88` puanını ve `1` kalan riski göster.

Şunu söyle:

“The developer remains the decision-maker. The governed fixture reaches eighty-eight with one remaining risk, while two focused fixture tests passed and every unavailable check stays visible.”

### 2:35–2:45 — Kapanış

1. `Overview` bölümüne dön.
2. Tamamlanmış `Evidence Reconciliation` kutusunu göster.

Şunu söyle:

“Codex writes. Control Tower proves. The developer decides.”

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
- `Agreement`, `Disagreement` ve kilitli `NOT_RUN` değerlerinden en az biri gösterildi.
- Codex uygulamasındaki ana geliştirme görevi birkaç saniye gösterildi.
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

### Gerçek Kanıt Uzlaştırması hata verirse

Hata metnini gizleyip başarı iddiasında bulunma. İnternet bağlantısını ve Codex oturumunu kontrol et, `npm run demo` ile başlangıcı yenile, sonra tekrar dene.

### Sayfa eski sonucu gösteriyorsa

1. İlk komut penceresinde `Ctrl` ve `C` tuşlarına bas.
2. `npm run demo` çalıştır.
3. `npm run dashboard` çalıştır.
4. Tarayıcıda `Ctrl` ve `R` tuşlarına birlikte bas.

## Devpost için `/feedback` kimliğini al

Bu işlem video çekiminin parçası değildir. Geliştirmeler ve son denetimler bittikten sonra bir kez yap.

1. Codex uygulamasını aç.
2. Sol taraftaki görevler arasında bu projenin ana geliştirme görevini bul.
3. Bu; yalnızca küçük bir soru sorduğun deneme görevi değil, projenin ana özelliklerinin yapıldığı uzun görev olmalı.
4. Görevin üzerine bir kez tıkla.
5. Ekranın altındaki, normalde Codex’e mesaj yazdığın alana bir kez tıkla.
6. Yalnızca şu ifadeyi yaz:

~~~text
/feedback
~~~

7. Klavyede Enter tuşuna bas.
8. Codex bir `Session ID` oluşturmalı. Bu, harf ve rakamlardan oluşan özel bir görev kimliğidir.
9. Kimliği seçip kopyala. Windows’ta seçtikten sonra `Ctrl` ve `C` tuşlarına birlikte basabilirsin.
10. Not Defteri’ni aç ve kimliği geçici olarak oraya yapıştır.
11. Devpost başvuru sayfasındaki `/feedback Codex Session ID` alanına aynı kimliği yapıştır.
12. Kimliği README’ye, videoya, ekran görüntüsüne veya herkese açık başka bir dosyaya koyma.
13. Codex kimlik üretmezse başka bir değer uydurma. Önce görevin doğru ana görev olduğundan emin ol ve tekrar dene.

Beklenen sonuç: Devpost alanında Codex’in gerçekten verdiği görev kimliği bulunmalı. Küçük bir deneme konuşmasının kimliği kullanılmamalı.

## İlgili belgeler

- İngilizce 2 dakika 45 saniyelik anlatım: [DEMO_SCRIPT.md](DEMO_SCRIPT.md)
- Proje ana açıklaması: [README.md](../README.md)
- Gönderim metni: [DEVPOST_SUBMISSION.md](DEVPOST_SUBMISSION.md)
- Jürinin deneme yolu: [JUDGE_TEST_PATH.md](JUDGE_TEST_PATH.md)
