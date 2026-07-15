# Demo Videosu Çekim Rehberi

Bu rehber, bilgisayar kullanımı ve yabancı kelimeler konusunda deneyimin olmadığını varsayar. Hiçbir adımı atlama. Her adımda yazan “Görmen gereken” bölümünü doğrulamadan sonraki adıma geçme.

Videonun hedef süresi **2 dakika 52 saniyedir**. Kesin sınır **3 dakikadan kısa** olmaktır.

## Önce çok basit biçimde ne göstereceğimizi anlayalım

Codex Control Tower, Codex ile yapılan yazılım işinin görevini, sınırlarını, kanıtını ve insan kararını düzenler. Ürünün en önemli yeni parçası gerçek GPT-5.6 kullanımıdır.

GPT-5.6'ya bir iddia ve sınırlandırılmış ham kanıt verilir. Fakat karşılaştırmada kullanılacak **kilitli iddia sonucu** ve “vermesi beklenen cevap” gösterilmez. Model, her çalışmada yeni açılan boş ve geçici bir alanda çalışır; proje klasörünü kendi başına dolaşamaz, internet araması yapamaz ve bilgisayarda başka bir işlem başlatamaz. Böyle bir girişim kayda geçerse ürün sonucu kabul etmez. Ham kanıt dosyalarının içinde `PASS` veya `NOT_RUN` gibi kendi kayıtları bulunabilir; saklanan şey uzlaştırıcının kilitli iddia sonucu ve beklenen cevap sınıfıdır. Böylece model yalnızca hazır cevabı tekrar etmeye yönlendirilmez.

Model şu üç görüşten birini verir:

- `SUPPORTS`: Kanıt iddiayı destekliyor.
- `CONTRADICTS`: Kanıt iddiayla çelişiyor.
- `INSUFFICIENT`: Karar vermek için kanıt yetersiz.

Model görüşü daha sonra gizli yerel karşılaştırma kuralıyla uyuşmazsa ekranda `HUMAN REVIEW REQUIRED` görünür. Türkçesi “İNSAN İNCELEMESİ GEREKLİ”dir. `CONTRADICTS` kelimesi tek başına her zaman uyuşmazlık demek değildir; örneğin yerel `FAIL` ile modelin `CONTRADICTS` görüşü uyumlu olabilir. `COMPATIBLE` görünürse bunun anlamı “model kanıtı yetersiz buldu ama bu belirsizlik mevcut olumsuz veya çalıştırılmamış yerel kayıtla çelişmiyor”dur; tam anlaşma demek değildir. Bu yalnızca bir uyarı ve karşılaştırmadır. GPT-5.6 yerel sonucu, `PASS`, `FAIL`, `NOT_RUN`, `SIMULATED` durumunu veya insan onayını değiştiremez.

## İki gösterge sayfasının farkı

Videoda aynı ürünün iki görünümünü kullanacağız:

1. **GitHub Pages:** İnternetteki herkese açık, sabit vitrindir. Jüri hiçbir şey kurmadan açabilir. Önceden kaydedilmiş gerçek GPT-5.6 sonucunu gösterir. Senin bilgisayarında yeni işlem başlayınca kendiliğinden değişmez.
2. **Bilgisayardaki canlı sayfa:** Yeni işlemin `READY`, `RUNNING`, `COMPLETE` değişimini gösterir. Türkçe karşılıkları “HAZIR”, “ÇALIŞIYOR”, “TAMAMLANDI”dır. Bu sayfa `npm run dashboard` talimatıyla açılır.

Videonun ilk 10 saniyesinde GitHub Pages vitrini gösterilir. Daha sonra yeni çalışmayı göstermek için bilgisayardaki canlı sayfaya geçilir.

`apps/dashboard/index.html` dosyasına çift tıklama. Bu yöntem doğru sayfayı açmaz.

## Kurgusal olan ile gerçek olan

### Kurgusal örnek

- InvoiceFlow Mini gerçek bir müşteri projesi değildir.
- Kişiler, müşteriler, ödemeler, onaylar ve geçmiş kurgusaldır.
- `25` puanlı önceki durum ile `88` puanlı yönetimli durum önceden hazırlanmış iki örnek klasördür.
- GPT-5.6 bu iki klasörü oluşturmaz ve puanı 25'ten 88'e çıkarmaz.

### Gerçek işlemler

- Program iki örnek klasörü gerçekten tarar.
- Puanlar yerel kurallarla gerçekten hesaplanır.
- İki küçük denetim gerçekten çalışır.
- Kanıt dosyaları gerçekten toplanır ve özet değerleri hesaplanır.
- Codex uygulaması gerçek `gpt-5.6-sol` modelini yeni açılmış boş, geçici ve salt okunur bir alanda çalıştırır.
- Proje talimatları ve internet araması kapalıdır; model başka bir araç kullanmaya kalkarsa çalışma kabul edilmez.
- GPT-5.6 cevabı gerçekten kaydedilir; dayanak göstermeyen kesin cevaplar reddedilir ve geçerli cevap yerel sonuçla sonradan karşılaştırılır.

Videoda söyleyeceğin dürüst cümle şudur:

> “InvoiceFlow Mini is fictional. The scans, focused tests, evidence hashes, and GPT-5.6 call are real executions on that controlled sample.”

Türkçe anlamı: “InvoiceFlow Mini kurgusaldır. Taramalar, küçük denetimler, kanıt özetleri ve GPT-5.6 çağrısı bu kontrollü örnek üzerinde yapılan gerçek işlemlerdir.”

## Kontrollü anlam sınaması neden var?

Örneğin başarı ölçütlerinden biri, reddedilen ödeme girişimlerinin kalıcı ve yerel bir denetim kaydında tutulmasıdır. Hazırlanmış yönetimli örnekte bazı yapısal kanıtlar ve geçen küçük denetimler vardır; fakat bu başarı ölçütünün tamamını kanıtlayan kayıt yoktur.

Bu boşluk özellikle ve açıkça bırakılmış bir **kontrollü sınamadır**. Amaç modeli kandırmak veya zorla hata buldurmak değildir. Ham kayıtlar hem başarı ölçütünü hem eksik uygulama kanıtını doğal olarak içerir; fakat GPT-5.6 talimatı “şu boşluğa bak” demez ve istenen cevap sınıfını vermez. Yerel taraftaki `PASS`, burada yalnızca gerekli görev, iz, çalışan denetim ve kanıt bağlantılarının bulunduğunu söyleyen **yapısal ön kontroldür**; bütün başarı ölçütlerinin anlam bakımından kanıtlandığı iddiası değildir. Model ham görev, değişiklik, denetim ve kanıt arasındaki anlam ilişkisini kendi kurar. Görüşü yerel karşılaştırma kuralıyla uyuşmazsa `HUMAN_REVIEW_REQUIRED` oluşur. Uyuşsa da uyuşmasa da gerçek cevap olduğu gibi gösterilir.

## Çekimden bir gün önce: hazırlık

### A. Proje klasörünü bul

1. Klavyede Windows işaretli tuş ile `E` tuşuna aynı anda bas.
2. Açılan Dosya Gezgini penceresinin sağ üstündeki arama alanına `codex-control-tower` yaz.
3. Arama bitince aynı adlı klasöre çift tıkla.
4. İçeride `README.md`, `package.json`, `docs`, `apps`, `cli` ve `examples` adlarını gör.

Görmen gereken: Üstte veya pencere başlığında `codex-control-tower` adı yazmalı.

### B. Talimat yazma penceresini aç

Bu rehberde “koyu pencere” dediğimiz yer, kısa çalışma talimatlarını yazacağın penceredir.

En kolay yol:

1. Proje klasörünün içindeki boş beyaz alana farenin sağ tuşuyla tıkla.
2. `Terminalde Aç` veya `Open in Terminal` seçeneğine tıkla.
3. Koyu pencerenin son satırında `codex-control-tower` adını ara.

Bu seçenek yoksa:

1. Dosya Gezgini'nin üstündeki adres alanına bir kez tıkla.
2. Mavi seçili hale gelen klasör adresini `Ctrl` ve `C` tuşlarına birlikte basarak kopyala.
3. Windows'un alttaki arama alanına tıkla.
4. `PowerShell` yaz ve çıkan uygulamaya tıkla.
5. Koyu pencereye `cd ` yaz. `cd` harflerinden sonra bir boşluk bırak.
6. `Ctrl` ve `V` ile klasör adresini yapıştır.
7. Enter tuşuna bas.

Görmen gereken: Son satırda `codex-control-tower` adı bulunmalı. Başka klasördeysen aşağıdaki talimatları çalışma.

### C. Gerekli parçaları kur ve tam denetimi çalıştır

Koyu pencereye aşağıdaki ilk satırı yaz ve Enter'a bas:

```powershell
npm install
```

Yazılar akarken bekle. Yeniden yazı yazabileceğin boş satır gelince şu satırı yaz ve Enter'a bas:

```powershell
npm run verify
```

Bu işlem birkaç dakika sürebilir.

Görmen gereken:

- Son bölümde kırmızı, uzun bir hata olmamalı.
- Başarısız denetim sayısı `0` olmalı.
- Sayfa oluşturma işlemi tamamlanmalı.

Hata varsa video çekimine geçme. Hata metninin ekran görüntüsünü al ve bu Codex görevine gönder.

### D. Hazırlanmış örneği oluştur

Aynı koyu pencereye yaz:

```powershell
npm run demo
```

Görmen gereken:

- `Before: 25/100, 16 risks`
- `After: 88/100, 1 risks`
- İki küçük denetimin geçtiğini belirten sonuç
- Canlı gösterge için `READY` veya `NOT STARTED`

Sayılar farklıysa videoda eski sayıları söyleme. Önce uyumsuzluğu düzelt.

### E. Codex uygulamasında temiz demo görevi aç

1. Windows'un alttaki arama alanına tıkla.
2. `Codex` yaz.
3. Codex uygulamasına tıkla.
4. Giriş istenirse `Sign in with ChatGPT` düğmesine tıkla.
5. GPT-5.6 erişimin olan ChatGPT hesabınla giriş yap.
6. Sol üstteki `+` işaretine veya `New task` yazısına tıkla.
7. Klasör seçme ekranı gelirse bulduğun `codex-control-tower` klasörünü seç.
8. `Klasör Seç` veya `Select Folder` düğmesine tıkla.
9. Yeni görevin yanındaki üç noktaya tıkla.
10. `Rename` seçeneği varsa tıkla ve `Demo Blind Audit` yaz. Bu seçenek yoksa devam et; önemli olan görevin boş olmasıdır.

Görmen gereken: Boş bir konuşma, doğru proje adı ve altta Codex'e yazı yazılan alan.

Uzun ana geliştirme görevini video sırasında açma. Özel konuşma ve `/feedback` bilgisi görünmemeli.

### F. Gerçek GPT-5.6 çalışmasını prova et

1. Dosya Gezgini'nde `docs` klasörüne çift tıkla.
2. `CODEX_DEMO_PROMPT.md` dosyasına çift tıkla. Windows hangi uygulamayla açacağını sorarsa Not Defteri'ni seçebilirsin.
3. Üç ters tırnak arasındaki İngilizce metnin tamamını fareyle seç.
4. `Ctrl` ve `C` ile kopyala.
5. Codex uygulamasına dön.
6. Alttaki yazı alanına tıkla.
7. `Ctrl` ve `V` ile yapıştır.
8. İlk satırda `Without editing any files` ve `npm run demo:codex` yazdığını kontrol et.
9. Enter'a bas.
10. Codex'in aynı adlı talimatı çalıştırdığını gör ve bitmesini bekle.

Görmen gereken özet:

- `gpt-5.6-sol`
- `REAL_CODEX_BLIND_SEMANTIC_AUDIT`
- boş ve geçici çalışma alanı açıklaması
- kabul edilen araç işlemi sayısının `0` olması
- `read-only` veya salt okunur açıklaması
- Yerel karar ile ayrı model görüşü
- `SUPPORTS`, `CONTRADICTS`, `INSUFFICIENT` sayıları
- Varsa `HUMAN REVIEW REQUIRED`
- Korunan `NOT_RUN` sayısı
- Kanıt güncelliği ve kayıt yolu

Başarısız olursa sonucu gizleme ve başarı görüntüsü uydurma. Video gününden önce hatayı düzelt.

### G. Prova bittikten sonra başlangıca dön

Koyu pencereye dön ve yeniden yaz:

```powershell
npm run demo
```

Bu, bilgisayardaki canlı sayfayı yeniden `READY / NOT STARTED` durumuna getirir. GitHub Pages'deki kayıtlı sonuç değişmez.

## Çekimden hemen önce: üç ekranı hazırla

### 1. Özel bilgileri kapat

1. E-posta, WhatsApp, banka, parola ve özel belge pencerelerini kapat.
2. Tarayıcıdaki kişisel sekmeleri kapat.
3. Windows bildirimlerini kapat veya “Rahatsız etmeyin” durumuna al.
4. Codex'in sol bölümündeki özel görev adları görünüyorsa sol bölümü daralt.
5. Tam ad, kullanıcı klasörü, parola, gizli anahtar ve `/feedback` kimliği görünmesin.
6. Masaüstündeki özel dosya adları görünüyorsa açık pencereleri tam ekran yap.

### 2. GitHub Pages vitrinini aç

1. Tarayıcıyı aç.
2. Üstteki adres alanına tıkla.
3. Aşağıdaki adresi kopyalayıp yapıştır:

```text
https://zyganali-glitch.github.io/codex-control-tower/
```

4. Enter'a bas.
5. Sayfa açılınca **Blind GPT-5.6 Semantic Audit** bölümünü bul.
6. Gerekirse aşağı doğru kaydır.
7. `gpt-5.6-sol`, tamamlanmış sonuç ve modelin ayrı görüşü aynı ekranda görünsün.
8. Bu sekmeyi birinci sırada bırak.

Görmen gereken: Adres `github.io` içermeli. Sayfa “arka uç kapalı” veya benzeri bir hata göstermemeli. Bu sayfa kaydedilmiş sabit vitrindir.

### 3. Bilgisayardaki canlı sayfayı aç

Koyu pencereye yaz:

```powershell
npm run dashboard
```

Enter'a bas ve koyu pencereyi kapatma.

Görmen gereken:

- Tarayıcıda ikinci bir sekme açılır.
- Adres `http://localhost:` ile başlar. Bu yabancı ifade yalnızca “bu bilgisayarda çalışan sayfa” anlamına gelir.
- Codex Control Tower görünür.
- `READY / NOT STARTED` görünür.
- **FICTIONAL SAMPLE PROJECT** ve **REAL EXECUTION** açıklamaları bulunur.

Tarayıcı kendiliğinden açılmazsa koyu penceredeki `Local:` yazısının yanındaki adresi kopyalayıp tarayıcı adres alanına yapıştır.

### 4. Codex ekranını hazırla

1. Codex uygulamasındaki temiz `Demo Blind Audit` görevine dön.
2. `CODEX_DEMO_PROMPT.md` içindeki İngilizce metni yeniden kopyala.
3. Codex'in alttaki yazı alanına yapıştır.
4. Henüz Enter'a basma.
5. İlk satır ve `npm run demo:codex` görünür kalsın.

### 5. Ekran kaydının uygulama geçişlerini çektiğini dene

Kullanacağın kayıt aracı tüm ekranı ve tarayıcıdan Codex'e geçişi kaydetmelidir. Bazı araçlar yalnızca tek pencereyi kaydeder.

1. Yirmi saniyelik deneme kaydı başlat.
2. GitHub Pages sekmesini göster.
3. Codex uygulamasına geç.
4. Bilgisayardaki canlı sayfaya geç.
5. Kaydı durdur ve izle.
6. Üç ekran da görünüyorsa aynı aracı kullan.
7. Yalnızca bir pencere görünüyorsa tam ekran kaydı seçeneğini aç veya tüm ekranı kaydeden başka bir araç kullan.

Mikrofon denemesinde kendi sesini açıkça duymadan gerçek kayda başlama.

## İngilizce anlatımı kolay okuma yöntemi

Jürinin doğrudan anlaması için aşağıdaki kısa İngilizce cümleleri okuyacağız. Her cümlenin altında Türkçe okunuşa yakın bir yardımcı satır ve anlamı vardır. Okunuş satırı yalnız yardımdır; mükemmel aksan gerekmez. Yavaş, net ve doğal konuş.

Çekimden önce her cümleyi en az beş kez prova et. Telefonda ses kaydı alıp dinlemek çok faydalıdır.

## 2 dakika 52 saniyelik çekim

### 0:00–0:10 — GPT-5.6'yı ilk anda göster

Ekranda yap:

1. Kaydı GitHub Pages sekmesi açıkken başlat.
2. Tamamlanmış **Blind GPT-5.6 Semantic Audit** bölümü görünsün.
3. Fareyi sırayla `gpt-5.6-sol`, boş ve geçici çalışma alanı, kabul edilen araç işlemi `0` ve sonuç alanına götür.

Söyle:

> “This is a real GPT-5.6 Sol run inside Codex Control Tower. GPT-5.6 challenges the evidence, but it can never overwrite the locked local facts.”

Yaklaşık okunuş:

> “Dis iz ı riyıl ci-pi-ti fayv point siks Sol ran insayd Kodeks Kontrol Tavır. Ci-pi-ti fayv point siks çelıncız dı evidıns, bat it ken nevır ovır-rayt dı lokt lokıl fekts.”

Anlamı: Bu, ürünün içindeki gerçek GPT-5.6 çalışmasıdır. Model kanıta itiraz edebilir ama kilitli yerel gerçekleri değiştiremez.

### 0:10–0:30 — Sorunu ve dürüst sınırı söyle

Ekranda yap:

1. Aynı sayfada **FICTIONAL SAMPLE PROJECT** yazısını göster.
2. Sonra **REAL EXECUTION** yazısını göster.

Söyle:

> “Codex can build quickly, but scope, skipped checks, and proof can disappear inside a chat. InvoiceFlow Mini is fictional. The scans, focused tests, evidence hashes, and GPT-5.6 call are real.”

Yaklaşık okunuş:

> “Kodeks ken bild kuikli, bat skop, skipt çeks, end pruf ken disapir insayd ı çet. İnvoys Flo Mini iz fikşınıl. Dı skenz, fokıst tests, evidıns heşız, end ci-pi-ti fayv point siks kol ar riyıl.”

### 0:30–0:48 — Önce ve sonra görünümünü göster

Ekranda yap:

1. Soldaki `Before / After` seçeneğine tıkla.
2. Fareyle `25`, `16`, `88`, `1` ve iki geçen denetimi sırayla göster.

Söyle:

> “These are prepared snapshots, not a customer transformation. The scanner finds twenty-five points and sixteen risks before, then eighty-eight and one after. GPT-5.6 did not create this change.”

Yaklaşık okunuş:

> “Diiz ar priperd snapşats, nat ı kastımır transformeyşın. Dı skenır faynds tventi fayv points end sikstiin risks bifor, den eyti eyt end van aftır. Ci-pi-ti fayv point siks did nat kriyeyt dis çeync.”

### 0:48–1:08 — Bilgisayardaki canlı HAZIR durumuna geç

Ekranda yap:

1. Tarayıcıdaki ikinci, `localhost` yazan sekmeye tıkla.
2. `READY / NOT STARTED` alanını göster.
3. Görev sınırını, izin verilen işleri ve kanıt isteğini göster.

Söyle:

> “The local layer creates a bounded Codex mission and locks facts before any model call. It records whether a command ran, but it does not pretend that a passing test proves the whole mission.”

Yaklaşık okunuş:

> “Dı lokıl leyır kriyeyts ı baundıd Kodeks mişın end loks fekts bifor eni modıl kol. İt rikords vedır ı komand ren, bat it daz nat pritend det ı pasing test pruvz dı hol mişın.”

### 1:08–1:34 — Codex'e gerçek talimatı ver

Ekranda yap:

1. Codex uygulamasına geç.
2. Hazır talimatı iki saniye göster.
3. Enter'a bas.
4. Codex'in `npm run demo:codex` çalıştırmaya başladığını göster.

Söyle:

> “Codex accelerated the architecture, implementation, tests, and verification. Now Codex launches the real GPT-5.6 audit. My key human decision was to withhold locked claim-status fields and expected comparison classes.”

Yaklaşık okunuş:

> “Kodeks ekselıreytıd dı arkitekçır, implımınteyşın, tests, end verifikeyşın. Nau Kodeks lonçız dı riyıl ci-pi-ti fayv point siks odit. May kii hümın disicın vaz tu vidhold lokt kleym steytıs fiilds end ekspektıd komperısın klasız.”

### 1:34–1:58 — Gerçek kör anlam incelemesini göster

Ekranda yap:

1. Bilgisayardaki canlı sayfaya dön.
2. `RUNNING` görünüyorsa göster.
3. İşlem bittiyse `COMPLETE` göster.
4. `gpt-5.6-sol`, `medium`, boş ve geçici çalışma alanı, kabul edilen araç işlemi `0`, `read-only` ve kör giriş açıklamasını göster.

Söyle:

> “GPT-5.6 sees only bounded evidence in an empty workspace. Project instructions and web access are disabled, and any tool event rejects the run. Locked statuses and expected classes are withheld. It answers with evidence.”

Yaklaşık okunuş:

> “Ci-pi-ti fayv point siks siiz onli baundıd evidıns in en empti vörkspeys. Procet instrakşınz end veb ekses ar diseybıld, end eni tul ivent ricekts dı ran. Lokt steytısız end ekspektıd klasız ar vithold. İt ansırs vit evidıns.”

İşlem henüz bitmediyse telaş etme. `RUNNING` ekranında güvenlik sınırlarını göstermeye devam et. Sahte tamamlanma gösterme.

### 1:58–2:28 — Kontrollü anlam sınamasını göster

Ekranda yap:

1. `MISSION_CHANGE_TEST_ALIGNMENT` satırını bul.
2. `Structural precheck` yazısını göster. Bunun “yapısal ön kontrol” olduğunu unutma; anlam bakımından kesin doğruluk değildir.
3. Model görüşünü göster.
4. Karşı kanıt, eksik kanıt ve önerilen sonraki adımı göster.
5. Varsa `HUMAN REVIEW REQUIRED` yazısını göster. `COMPATIBLE` görünürse bunun tam anlaşma değil, çelişmeyen belirsizlik olduğunu söyle.

Söyle:

> “This controlled challenge asks whether changes and tests prove every success criterion. The local PASS is only a structural precheck, not semantic truth. The prompt gives no expected answer. A conflict requires human review; compatible uncertainty is not full agreement. No local fact changes.”

Yaklaşık okunuş:

> “Dis kontrolld çelınc asks vedır çeyncız end tests pruv evri sakses kraytiriyın. Dı lokıl pas iz onli ı strakçırıl pri-çek, nat simentik trut. Dı prompt givz no ekspektıd ansır. ı konflikt rikvayırz hümın rivyu; kompatıbıl ansörtınti iz nat ful ıgriimınt. No lokıl fekt çeyncız.”

`HUMAN REVIEW REQUIRED` oluşmadıysa “oluştu” deme. Bunun yerine son cümleyi şöyle değiştir:

> “A policy conflict would require human review, but it could not change a local fact.”

### 2:28–2:43 — Değişmeyen sınırları göster

Ekranda yap:

1. `Evidence` bölümüne tıkla.
2. `NOT_RUN` satırını göster.
3. Yerel karar ile model görüşünün ayrı durduğunu göster.
4. İnsan onay alanını göster.

Söyle:

> “Local validation rejects tool events and unsupported decisive claims. NOT_RUN stays NOT_RUN. The model opinion is advice; the deterministic verdict and human Review Gate remain authoritative.”

Yaklaşık okunuş:

> “Lokıl valideyşın ricekts tul ivents end ansaportıd disaysiv kleymz. Nat ran steyz nat ran. Dı modıl opinyın iz edvays; dı ditörmınıstik vördict end hümın rivyu geyt rimeyn otoritıtiv.”

### 2:43–2:52 — Kapanış

Ekranda yap: Tamamlanmış GPT-5.6 özetine dön.

Söyle:

> “Codex writes. GPT-5.6 challenges. Control Tower locks the facts. The developer decides.”

Yaklaşık okunuş:

> “Kodeks rayts. Ci-pi-ti fayv point siks çelıncız. Kontrol Tavır loks dı fekts. Dı divelıpır disayds.”

## Kaydı durdur ve eksiksiz kontrol et

1. Kayıt aracındaki kare biçimli durdurma düğmesine tıkla.
2. Kaydedilen videoyu aç.
3. Baştan sona izle; yalnızca başını ve sonunu kontrol etme.
4. Sürenin `2:59` veya daha kısa olduğunu gör.
5. İlk 10 saniyede gerçek GPT-5.6 sonucu görünmeli.
6. Sesinde “Codex” ve “GPT-5.6” açıkça duyulmalı.
7. Codex'e talimat verildiği ve Codex'in `npm run demo:codex` başlattığı görünmeli.
8. GitHub Pages'in sabit vitrin, bilgisayardaki sayfanın canlı çalışma ekranı olduğu karışmamalı.
9. Örnek projenin kurgusal, tarama/denetim/model çağrısının gerçek olduğu söylenmeli.
10. GPT-5.6'nın puanı 25'ten 88'e çıkardığı söylenmemeli.
11. Modelin kilitli sonucu değiştirebildiği söylenmemeli.
12. Boş ve geçici çalışma alanı ile kabul edilen araç işlemi `0` görünmeli.
13. `Structural precheck` kesin anlam doğruluğu gibi anlatılmamalı; `COMPATIBLE` tam anlaşma diye çevrilmemeli.
14. Varsa `HUMAN REVIEW REQUIRED` dürüstçe gösterilmeli; yoksa varmış gibi anlatılmamalı.
15. Ekranda e-posta, parola, kişisel yol, özel konuşma veya `/feedback` kimliği bulunmamalı.
16. Telif hakkı sana ait olmayan müzik kullanma.

Bir madde eksikse videoyu yeniden çek. Üç dakikayı geçen videoyu yükleme.

## YouTube'a yükleme

1. Tarayıcıda yeni sekme aç.
2. Adres alanına `youtube.com` yaz ve Enter'a bas.
3. Sağ üstteki hesap simgesinden doğru Google hesabında olduğunu kontrol et.
4. Sağ üstte kamera biçimli `Oluştur` veya `Create` düğmesine tıkla.
5. `Video yükle` veya `Upload video` seçeneğine tıkla.
6. `Dosyaları seç` veya `Select files` düğmesine tıkla.
7. Kaydettiğin videoyu seç ve `Aç` düğmesine tıkla.
8. Başlık alanına şunu yaz:

```text
Codex Control Tower — OpenAI Build Week Demo
```

9. Açıklamaya şunu yaz:

```text
Codex Control Tower gives real GPT-5.6 a blind semantic evidence challenge while deterministic local facts remain locked.

Repository: https://github.com/zyganali-glitch/codex-control-tower
Live demo: https://zyganali-glitch.github.io/codex-control-tower/
```

10. İçerik çocuklar için özel hazırlanmadıysa `Hayır, çocuklara özel değil` seçeneğini işaretle.
11. `İleri` düğmesine bas.
12. Ek video öğesi eklemeyeceksen sonraki ekranda yeniden `İleri` düğmesine bas.
13. Telif hakkı denetiminde sorun olmadığını gör. Sorun varsa incelemeden yayımlama.
14. Görünürlük ekranında `Herkese Açık` veya `Public` seçeneğini işaretle.
15. `Yayınla` düğmesine tıkla.
16. Video bağlantısını `Kopyala` düğmesiyle kopyala.
17. `Ctrl`, `Shift` ve `N` tuşlarına birlikte basarak gizli tarayıcı penceresi aç.
18. Bağlantıyı yapıştır ve Enter'a bas.
19. Hesaba girmeden video açılıyor, ses duyuluyor ve süre üç dakikadan kısa görünüyorsa bağlantı doğrudur.
20. Bu bağlantıyı Devpost formundaki video alanına yapıştır.

## `/feedback` kimliği

Bu kimliğin tamamlandığını varsayan başvuru değerlendirmesinde bile şu güvenlik kuralı değişmez: kimlik yalnızca Devpost'un özel alanında bulunur.

Henüz alınmadıysa:

1. Codex uygulamasında geliştirmelerin çoğunun yapıldığı uzun ana görevi aç.
2. Video için açtığın kısa `Demo Blind Audit` görevini kullanma.
3. Mesaj alanına yalnızca `/feedback` yaz.
4. Enter'a bas.
5. Codex'in verdiği gerçek `Session ID` değerini kopyala.
6. Yalnızca Devpost formundaki özel alana yapıştır.
7. README'ye, GitHub'a, videoya, YouTube açıklamasına veya ekran görüntüsüne koyma.
8. Sonuç oluşmazsa başka değer uydurma.

Zaten tamamlandıysa yeniden üretmen gerekmez; yalnızca Devpost özel alanında bulunduğunu ve videoda görünmediğini kontrol et.

## Bir şey ters giderse

### GitHub Pages açılmazsa

1. Adresin tam olarak `https://zyganali-glitch.github.io/codex-control-tower/` olduğunu kontrol et.
2. `Ctrl` ve `F5` tuşlarına birlikte bas.
3. Gizli pencerede yeniden dene.
4. Hâlâ açılmıyorsa video çekme; GitHub Pages yayınının düzelmesini bekle.

### Bilgisayardaki canlı sayfa açılmazsa

1. `index.html` dosyasına çift tıklamadığından emin ol.
2. Koyu pencereyi kapat.
3. Proje klasöründe yeni koyu pencere aç.
4. Sırayla `npm install`, `npm run demo`, `npm run dashboard` çalıştır.
5. Tarayıcı açılmazsa koyu penceredeki `Local:` adresini tarayıcıya yapıştır.

### Codex komutu başlatamazsa

1. Codex'te doğru ChatGPT hesabıyla giriş yaptığını kontrol et.
2. Doğru `codex-control-tower` klasörünün seçili olduğunu kontrol et.
3. [Codex Demo Talimatı](CODEX_DEMO_PROMPT.md) içindeki metni yeniden gönder.
4. Yalnız acil durumda ayrı koyu pencerede `npm run demo:codex` çalıştır.
5. Bu kurtarma yolunu kullanırsan videoda bunun Codex'in normalde başlattığı aynı ürün talimatı olduğunu söyle.

### Model bulunamaz veya işlem başarısız olursa

Başarı görüntüsü uydurma. Hata çıktısını koru. İnternet ve ChatGPT oturumunu kontrol et. `npm run demo` ile başlangıcı yenile. Gerçek çalışma tamamlanmadan “tamamlandı” deme.

## Son bağlantılar

- [Codex'e yapıştırılacak hazır talimat](CODEX_DEMO_PROMPT.md)
- [İngilizce zaman çizelgesi](DEMO_SCRIPT.md)
- [Jüri başlangıç sayfası](../JUDGE_START_HERE.md)
- [Jürinin deneme yolu](JUDGE_TEST_PATH.md)
- [Devpost gönderim metni](DEVPOST_SUBMISSION.md)
