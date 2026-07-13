# Demo Videosu Çekim Rehberi

Bu rehber, bilgisayar ve komut penceresi konusunda deneyimi olmayan biri düşünülerek hazırlanmıştır. Adımları sırayla uygula. Beklenen görüntüyü görmeden sonraki adıma geçme.

## Önce iki gösterge sayfasının farkını bil

Projede aynı görünüme sahip iki farklı kullanım vardır:

1. **GitHub Pages sayfası:** Jürinin hiçbir şey kurmadan açacağı, internetteki sabit vitrindir. Önceden kaydedilmiş ve kişisel bilgilerden arındırılmış sonucu gösterir. Bilgisayarında yeni bir GPT-5.6 çalışması başladığında bu internet sayfası canlı olarak değişmez.
2. **Bilgisayarında açılan yerel gösterge:** Video sırasında kullanacağın canlı çalışma ekranıdır. Codex işlemi başlatınca `READY`, `RUNNING` ve `COMPLETE` değişimini burada görürsün.

Video çekiminde ana ürün akışı için **yerel göstergeyi** kullanacağız. GitHub Pages bağlantısını yalnızca “jüri kurulum yapmadan bu kayıtlı sonucu inceleyebilir” demek için anabiliriz.

## Videoda neyin kurgusal, neyin gerçek olduğunu bil

### Kurgusal örnek proje

- InvoiceFlow Mini adlı proje ve müşteri bilgileri gerçek değildir.
- Kişiler, ödeme/fatura olayları ve onay kaydı kurgusaldır.
- `25` puanlı “önce” ve `88` puanlı “sonra” klasörleri önceden hazırlanmış iki örnek durumdur.
- GPT-5.6 video sırasında projeyi 25 puandan 88 puana dönüştürmez.

### Gerçek işlemler

- Program iki örnek klasörü gerçekten tarar ve puanları kurallarla hesaplar.
- Yönetimli örnekte iki küçük Node.js denetimi gerçekten çalışır.
- Kanıt paketi gerçekten oluşturulur ve özet değeri kaydedilir.
- Codex gerçek `gpt-5.6-sol` modelini salt okunur biçimde çalıştırır.
- Model cevabı gerçekten denetlenir ve kanıt kaydına yazılır.
- Yerel sonuçları ve son yerel kararı model değiştiremez.

Videoda “her şey benzetim” deme. Şunu söyle: **“Örnek proje kurgusaldır; tarama, denetimler ve GPT-5.6 kanıt incelemesi gerçek ürün çıktılarıdır.”**

## Çekimden bir gün önce

### 1. Codex uygulamasını ve doğru görevi aç

1. Windows ekranının en altındaki arama alanına tıkla.
2. `Codex` yaz.
3. Codex uygulamasına tıkla.
4. Giriş istenirse `Sign in with ChatGPT` düğmesine tıkla ve GPT-5.6 erişimin olan hesabınla giriş yap.
5. Sol üstteki `+` işaretine veya `New task` / `Yeni görev` düğmesine tıkla.
6. Klasör seçme ekranı açılırsa daha önce bulduğun `codex-control-tower` klasörünü seç ve `Klasör Seç` / `Select Folder` düğmesine tıkla.
7. Yeni boş görev açıldığında sol listedeki görevin yanındaki üç nokta işaretine tıkla.
8. `Rename` / `Yeniden adlandır` seçeneği varsa tıkla, `Demo Reconciliation` yaz ve Enter'a bas. Bu seçenek görünmüyorsa sorun değildir; görevin temiz ve bu depoya bağlı olması yeterlidir.
9. Ekranda proje adının `codex-control-tower` olduğundan emin ol.
10. Uzun ana geliştirme görevini video sırasında açma; özel konuşmalar görünmemelidir.

Beklenen sonuç: Yalnızca video için açılmış temiz `Demo Reconciliation` görevi ve altta Codex’e yazı yazılan alan görünmelidir.

### 2. Proje klasörünü bul

Bu açık depoda kişisel bilgisayar yolu yazmıyoruz. Kendi bilgisayarında klasörü şu şekilde bul:

1. Codex uygulamasında bu görevin üst kısmındaki proje adına veya klasör bilgisine bak.
2. Varsa klasör simgesine tıklayıp `Dosya Gezgini'nde göster` benzeri seçeneği seç.
3. Bu seçenek görünmüyorsa Windows tuşu ile `E` tuşuna birlikte bas.
4. Sağ üstteki arama alanına `codex-control-tower` yaz.
5. Sonuçlardaki aynı adlı klasörü aç.
6. İçeride `README.md`, `package.json`, `docs`, `apps`, `cli` ve `examples` adlarını görmelisin.

### 3. Hazırlık için bir komut penceresi aç

“Komut penceresi”, kısa talimatları yazdığımız koyu renkli penceredir.

1. Proje klasörünün boş bir yerine sağ tıkla.
2. `Terminalde Aç` veya `Open in Terminal` seçeneğine tıkla.
3. Koyu renkli pencerenin satırında `codex-control-tower` adını gör.

Sağ tık menüsünde bu seçenek yoksa:

1. Windows aramasına `PowerShell` yaz ve uygulamayı aç.
2. Dosya Gezgini'ndeki proje klasörünün üst adres alanına tıkla.
3. Oradaki yolu seçip `Ctrl` ve `C` tuşlarına birlikte basarak kopyala.
4. PowerShell'e `cd ` yaz; `cd` harflerinden sonra bir boşluk bırak.
5. `Ctrl` ve `V` ile kopyaladığın yolu yapıştır ve Enter'a bas.

### 4. Gerekli parçaları kur ve denetle

Aynı koyu pencereye sırayla aşağıdaki satırları yaz. Her satırdan sonra Enter'a bas ve işlem bitmeden yenisini yazma:

```powershell
npm install
npm test
npm run demo
```

Beklenen sonuç:

- Uzun kırmızı bir hata metni olmamalı.
- Denetimlerin sonunda başarısız denetim sayısı `0` olmalı.
- Demo sonunda `Before: 25/100, 16 risks` görünmeli.
- Demo sonunda `After: 88/100, 1 risks` görünmeli.

Sayılar farklıysa videoda rehberdeki sayıları söyleme; önce projenin güncel belgeleri ve çıktısı arasındaki farkı düzelt.

### 5. Gerçek Codex yolunu prova et

1. Codex uygulamasındaki temiz `Demo Reconciliation` görevine dön.
2. [Codex Demo Talimatı](CODEX_DEMO_PROMPT.md) dosyasını aç.
3. Dosyadaki İngilizce kutunun tamamını kopyala.
4. Codex uygulamasının altındaki yazı alanına yapıştır.
5. Enter tuşuna bas.
6. Codex’in `npm run demo:codex` komutunu çalıştırdığını gör.
7. Codex’in işlemi bitirmesini bekle.

Beklenen özet; tam model adını, yerel kararı, ayrı model görüşünü, uyuşma/uyuşmazlık sayılarını, korunan `NOT_RUN` sayısını, kanıt güncelliğini ve kanıt kaydının yerini içermelidir. Başarısız olursa o gün video çekme; hatayı gizleme.

### 6. Prova sonrasında başlangıç durumunu geri getir

Hazırlık için açtığın koyu pencereye dön ve şunu çalıştır:

```powershell
npm run demo
```

Bu işlem yerel göstergeyi yeniden `READY / NOT STARTED` durumuna getirir.

## Çekimden hemen önce

### 1. Ekranı temizle

1. E-posta, mesajlaşma, parola ve özel dosya gösteren pencereleri kapat.
2. Tarayıcıdaki kişisel sekmeleri kapat.
3. Windows bildirimlerini kapat veya `Rahatsız etmeyin` seçeneğini aç.
4. Codex'in sol tarafında özel görev adları görünüyorsa yan paneli daralt.
5. `/feedback` sonucunu, parolayı, özel yolu veya gizli anahtarı ekranda gösterme.

### 2. Yerel göstergeyi aç

Hazırlık için kullandığın koyu pencereye şunu yaz ve Enter'a bas:

```powershell
npm run dashboard
```

Bu pencereyi açık bırak. Başka bir komut yazma.

Beklenen sonuç:

1. İnternet tarayıcısı kendiliğinden açılır.
2. Adres alanında `http://localhost:...` ile başlayan bir adres görünür.
3. Codex Control Tower sayfası açılır.
4. Üstte **FICTIONAL SAMPLE PROJECT** ve **REAL EXECUTION** ayrımı görünür.
5. Evidence Reconciliation bölümünde `READY / NOT STARTED` görünür.

`index.html` dosyasına çift tıklama. Bu dosya tek başına doğru çalışma ekranını açmaz.

### 3. GitHub Pages'i ana çekim ekranı yapma

Canlı değişimi göstermek için internetteki GitHub Pages bağlantısını açma. O sayfa kayıtlı vitrindir. Video sırasında `READY → RUNNING → COMPLETE` için az önce açtığın `localhost` adresli yerel sayfayı kullan.

### 4. Codex talimatını hazır et

1. Codex uygulamasındaki temiz `Demo Reconciliation` görevine dön.
2. [Codex Demo Talimatı](CODEX_DEMO_PROMPT.md) içindeki İngilizce kutuyu kopyala.
3. Codex’in yazı alanına yapıştır ama henüz Enter'a basma.
4. Talimatın ilk satırında `Without editing any files` ve `npm run demo:codex` göründüğünü kontrol et.

### 5. Görüntü kaydını başlat

Windows'un kendi kayıt aracını kullanıyorsan:

1. Windows işaretli tuş ile `G` tuşuna birlikte bas.
2. `Yakalama` bölümünü bul.
3. Mikrofon simgesinin açık olduğundan emin ol.
4. Yuvarlak kayıt düğmesine tıkla.
5. Süre saymaya başlayınca kayıt başlamıştır.

## 2 dakika 45 saniyelik çekim

İngilizce cümleler tırnak içindedir. Bunları önceden birkaç kez yavaşça oku. Yapay ses kullanırsan söylediği her bilginin ekrandaki gerçek sonuçla aynı olduğundan emin ol.

### 0:00–0:20 — Sorun ve ürün

Ekran:

1. Yerel göstergede `Overview` açık olsun.
2. **FICTIONAL SAMPLE PROJECT** ve **REAL EXECUTION** açıklamasını göster.
3. `READY / NOT STARTED` bölümünü göster.

Söyle:

> “Codex can build software quickly, but scope, proof, skipped checks, and the next safe action can disappear inside a chat. Codex Control Tower turns that missing state into a reviewable workflow. InvoiceFlow Mini is a fictional sample project; the scans, tests, and recorded model run are real tool outputs.”

Türkçe anlamı: Codex hızlı yazılım üretebilir; ancak kapsam ve kanıt sohbet içinde kaybolabilir. Örnek proje kurgusaldır; tarama, denetimler ve model kaydı gerçek ürün çıktılarıdır.

### 0:20–0:45 — Hazırlanmış başlangıç durumu

Ekran:

1. Soldan `Before / After` seçeneğine tıkla.
2. `25` puanı ve `16` riski göster.

Söyle:

> “These are prepared before and governed snapshots of the same fictional project. The local scanner scores the starting snapshot at twenty-five and finds sixteen risk flags. This is not a security certificate, and GPT-5.6 did not turn twenty-five into eighty-eight. The comparison makes missing plans, evidence, approval, and continuity reproducible.”

### 0:45–1:10 — Sınırlı görev ve kilitli kanıt

Ekran:

1. `Overview` bölümüne dön.
2. Sınırlı Codex görevini, izin verilen dosyaları ve yasak işlemleri göster.
3. `READY / NOT STARTED` bölümüne dön.

Söyle:

> “Control Tower selects mission context and creates a bounded Codex instruction with allowed files, forbidden actions, and required proof. Before any model call, local code derives target-appropriate claims and locks their PASS, FAIL, NOT_RUN, or SIMULATED states. It also computes the authoritative local verdict.”

### 1:10–1:35 — Codex'e gerçek işlemi yaptır

Ekran:

1. Codex uygulamasındaki temiz `Demo Reconciliation` görevine geç.
2. Hazır bekleyen talimatı ekranda kısa süre göster.
3. Enter tuşuna bas.
4. Codex'in `npm run demo:codex` çalıştırmaya başladığını göster.
5. Ana anlatıda ayrı PowerShell penceresi kullanma.

Söyle:

> “I used Codex in the desktop app to build and verify this workflow. Now I am asking Codex itself to run the product's featured read-only GPT-5.6 reconciliation. My key human decision is that the model may assess evidence, but it can never replace local evidence state or the deterministic local verdict.”

### 1:35–2:00 — Gerçek GPT-5.6 ve canlı durum

Ekran:

1. Yerel göstergeye dön.
2. `RUNNING` durumunu göster.
3. `gpt-5.6-sol`, salt okunur çalışma ve kilitli yerel durumları göster.
4. İşlem biterse `COMPLETE` durumunu göster.

Söyle:

> “The command verifies my signed-in ChatGPT session and GPT-5.6 Sol, then runs Codex read-only against a bounded evidence bundle. GPT-5.6 can support, question, or find a claim insufficient. Local code validates the structure, hashes the evidence, and keeps model opinion separate from deterministic fact.”

### 2:00–2:25 — Uzlaştırma ve korunmuş sınırlar

Ekran:

1. `COMPLETE` durumunu göster.
2. Yerel karar ile ayrı model görüşünü göster.
3. Uyuşma/uyuşmazlık, kanıt güncelliği ve özet değerini göster.
4. Varsa süzülüp kaydedilen desteklenmeyen kanıt yolunu göster.
5. `Evidence` bölümüne geçip `NOT_RUN` satırını göster.

Söyle:

> “The reconciler rejects missing claims, status injection, malformed output, and statements that the model ran tests. Unsupported citation paths are filtered and recorded. Semantic agreement stays visible, while the authoritative local verdict and every unavailable check remain unchanged.”

### 2:25–2:38 — İnsan kararı ve yönetimli örnek

Ekran:

1. İnsan onay bölümünü göster.
2. `Before / After` bölümünde `88`, `1` ve iki denetim sonucunu göster.

Söyle:

> “The developer remains the decision-maker. The governed prepared snapshot scores eighty-eight with one remaining risk, and two focused fixture tests really passed. This is reproducible sample evidence, not a claim that GPT-5.6 rewrote the project or proved production readiness.”

### 2:38–2:45 — Kapanış

Ekran: `Overview` bölümüne dön ve tamamlanmış uzlaştırmayı göster.

Söyle:

> “Codex writes. Control Tower proves. The developer decides.”

## Kaydı bitir ve kontrol et

1. Windows ve `G` tuşlarına birlikte bas.
2. Kare biçimli durdurma düğmesine tıkla.
3. Videoyu baştan sona izle.
4. Sürenin üç dakikadan kısa olduğunu kontrol et.
5. Sesin anlaşılır, yazıların okunur olduğunu kontrol et.
6. Codex'e talimat verdiğin ve Codex'in komutu çalıştırdığı açıkça görünmeli.
7. Yerel göstergede canlı durum değişimi görünmeli.
8. Örnek projenin kurgusal, yürütmenin gerçek olduğu söylenmeli.
9. GPT-5.6'nın 25'ten 88'e dönüşüm yaptığı söylenmemeli.
10. Kişisel yol, parola, özel görev adı veya `/feedback` kimliği görünmemeli.
11. Sonraki bölümdeki adımlarla videoyu YouTube'a **Herkese Açık / Public** olarak yükle.

## Videoyu YouTube'a yükle

1. Tarayıcıda yeni bir sekme aç.
2. Adres alanına `youtube.com` yaz ve Enter'a bas.
3. Sağ üstteki hesabın GPT/Codex hesabından farklı olabilir; videoyu yayımlamak istediğin Google hesabında olduğundan emin ol.
4. Sağ üstte kamera biçimli `Oluştur` / `Create` düğmesine tıkla.
5. `Video yükle` / `Upload video` seçeneğine tıkla.
6. Ortadaki `Dosyaları seç` / `Select files` düğmesine tıkla.
7. Az önce kaydettiğin videoyu bul, bir kez seç ve `Aç` düğmesine tıkla.
8. `Başlık` / `Title` alanına kısa ve açık bir ad yaz: `Codex Control Tower — OpenAI Build Week Demo`.
9. Açıklama alanına projenin tek cümlelik açıklamasını ve herkese açık GitHub bağlantısını ekle. Henüz doğrulamadığın bir sonuç yazma.
10. Çocuklara özel olup olmadığı sorulduğunda içeriğin gerçek durumuna göre seçim yap. Bu teknik ürün demosu çocuklar için özel hazırlanmadıysa `Hayır, çocuklara özel değil` / `No, it's not made for kids` seçeneğini işaretle.
11. `İleri` / `Next` düğmesine tıkla. Ek video öğeleri istemiyorsan sonraki ekranlarda yeniden `İleri` düğmesine bas.
12. `Kontroller` / `Checks` ekranında telif hakkı sorunu görünmediğini kontrol et. Sorun çıkarsa yayımlamadan önce nedenini incele; sonucu gizleme.
13. `Görünürlük` / `Visibility` ekranında `Herkese Açık` / `Public` seçeneğini işaretle. `Gizli` veya `Liste Dışı` seçme; Devpost videosu herkese açık olmalıdır.
14. `Yayınla` / `Publish` düğmesine tıkla.
15. İşlem bitince gösterilen video bağlantısını `Kopyala` / `Copy` düğmesiyle kopyala.
16. Tarayıcıda gizli pencere açmak için `Ctrl`, `Shift` ve `N` tuşlarına birlikte bas.
17. Kopyaladığın bağlantıyı gizli pencereye yapıştır ve Enter'a bas.
18. Hesaba giriş yapmadan video açılıyor, ses çalışıyor ve süre üç dakikadan kısa görünüyorsa bağlantı doğrulanmıştır.
19. Bu doğrulanmış bağlantıyı Devpost formundaki video alanına yapıştır.
20. `/feedback` kimliğini video açıklamasına veya YouTube yorumuna yazma.

## Bir şey ters giderse

### Yerel gösterge açılmazsa

1. `index.html` dosyasına tıklamadığından emin ol.
2. Koyu pencereyi kapat.
3. Proje klasöründe yeni bir komut penceresi aç.
4. Sırayla `npm install`, `npm run demo`, `npm run dashboard` çalıştır.
5. Tarayıcı kendiliğinden açılmazsa koyu pencerede `Local:` yazısının yanındaki adresi tarayıcıya yaz.

### Codex komutu başlatamazsa

Önce Codex'e giriş yaptığını ve doğru `Demo Reconciliation` görevini açtığını kontrol et. Yeniden [Codex Demo Talimatı](CODEX_DEMO_PROMPT.md) içindeki metni gönder.

Yalnızca acil kurtarma için ikinci bir komut penceresinde `npm run demo:codex` çalıştırabilirsin. Bunu kullanırsan videoda bunun Codex'in normalde başlattığı aynı ürün komutu olduğunu dürüstçe söyle. Ana akışın tercih edilen yolu Codex uygulamasıdır.

### Model bulunamaz veya işlem başarısız olursa

Başarı görüntüsü uydurma. Hata çıktısını koru, interneti ve ChatGPT oturumunu kontrol et, `npm run demo` ile başlangıcı yenile ve tekrar dene. Gerçek çalışma tamamlanmadan videoda “tamamlandı” deme.

## Devpost için `/feedback` kimliğini al

Bu işlem videonun parçası değildir ve kimlik açık depoya yazılmaz.

1. Codex uygulamasında bu projenin geliştirmelerinin çoğunun yapıldığı uzun ana geliştirme görevini aç. Bu görev, video için açtığın kısa `Demo Reconciliation` görevi değildir.
2. En alttaki mesaj alanına yalnızca `/feedback` yaz.
3. Enter'a bas.
4. Codex'in verdiği gerçek `Session ID` değerini kopyala.
5. Değeri yalnızca Devpost başvuru formundaki özel alana yapıştır.
6. README'ye, videoya, ekran görüntüsüne veya GitHub dosyasına koyma.
7. Kimlik oluşmazsa başka değer uydurma.

## İlgili belgeler

- [Codex'e verilecek hazır talimat](CODEX_DEMO_PROMPT.md)
- [İngilizce 2:45 anlatım](DEMO_SCRIPT.md)
- [Proje ana açıklaması](../README.md)
- [Jürinin deneme yolu](JUDGE_TEST_PATH.md)
- [Devpost gönderim metni](DEVPOST_SUBMISSION.md)
