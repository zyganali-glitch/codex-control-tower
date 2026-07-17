# 13 Kaynak Parçalı Demo Videosu Kurgu Rehberi

Bu rehber bilgisayar ve İngilizce konusunda deneyimin olmadığını varsayar. Her “Görmen gereken” satırını doğrulamadan sonraki adıma geçme.

Nihai video **2 dakika 57 saniye**, yani **177 saniye** olmalıdır. Kesin kural: video **3 dakikadan kısa** kalmalıdır.

## Önce neyi göstereceğimizi anlayalım

Codex Control Tower ürününün merkezinde gerçek `gpt-5.6-sol` vardır. Model sınırlı kanıtı sorgular ama kilitli yerel `PASS`, `WARN`, `FAIL`, `NOT_RUN` veya `SIMULATED` durumlarını değiştiremez.

Yeni **Destructive Action Preflight** bölümü, desteklenen yıkıcı bir işlem niyetini çalıştırmadan önce hedefin gerçek sınırını hesaplar. Yazılan `$HOME/..` ifadesi kişisel klasör adını göstermeden `<USER_HOME_PARENT>` olarak görünür. Sonuç `BLOCKED`, çalışma durumu `NOT_RUN` ve `executed: false` olur. Bu bölüm bir silme komutu çalıştırmaz.

Codex'in kendi güvenli çalışma alanı ve izinleri ana korumadır. Projedeki isteğe bağlı bağlantı yalnızca desteklenen bazı `Bash` araç çağrılarını inceleyebilir; her işlem yolunu yakaladığı söylenemez. Bu yüzden videoda “tam güvenlik” veya “her silmeyi kesin engeller” deme.

InvoiceFlow Mini **kurgusal örnektir**. Hazırlanmış önce/sonra klasörleri müşteri sonucu değildir. Taramalar, iki küçük denetim, kanıt özetleri, gerçek GPT-5.6 çağrısı ve ön denetim analizi ise kontrollü girdiler üzerinde yapılan gerçek işlemlerdir. GPT-5.6 puanı 25'ten 88'e çıkarmamıştır.

## Ham videoları koru

Ham video klasörünü Dosya Gezgini'nde şu biçimde bul:

```text
<USER_HOME>\Videos\Captures
```

Bu klasördeki hiçbir dosyayı silme, yeniden adlandırma veya üzerine kaydetme.

- Klasörde 13 ayrı kaynak video vardır: 01, 02, eski 03, yeni `03 (YENİ)`, 04, 05, 06, 07, 08, 09, 10, 11 ve 12. Tamamı son kurguda kullanılacaktır.
- Eski 8 saniyelik 03 terminalden yerel dashboard'u başlatır; bu kanıt çıkarılmayacaktır. Yeni 15 saniyelik 03 ise ayrı Safety Preflight kanıtıdır ve eskisinin yerine geçmez.
- Mevcut 16 saniyelik 11 dosyası değişmeden kullanılacaktır. Yeniden çekme, silme, yeniden adlandırma veya üzerine kaydetme. Bu kayıt tarihsel dondurulmuş etiketi ve herkese açık depoyu gösterir; v2'nin var olduğunu iddia etmez.
- Ham kayıtların gerçek toplamı yaklaşık 6 dakika 23 saniyedir ve içlerindeki ses kanalları sessizdir. Dosyaları doğrudan arka arkaya ekleme; aşağıdaki hedef sürelere kırp ve İngilizce seslendirmeyi son kurguda ekle.

## Clipchamp'ın önemli sınırı

Clipchamp “pencere kaydı” seçilince yalnızca seçtiğin tek pencereyi kaydeder. Aynı video parçasında terminalden tarayıcıya, Codex'ten tarayıcıya veya başka bir uygulamaya geçmeye çalışma.

Her parça için:

1. Önce göstereceğin uygulamayı aç.
2. Sayfayı doğru bölüme getir.
3. Yazıları normal tarayıcı büyüklüğünde okunur yap.
4. Clipchamp'ta yalnızca o pencereyi seç.
5. O parçayı bitirince kaydı durdur.
6. Sonraki uygulama veya ekran için yeni bir kayıt başlat.

## Mevcut Safety Preflight kaydını doğrula

### 1. Proje klasöründe koyu pencere aç

1. Klavyede Windows işaretli tuş ile `E` tuşuna birlikte bas.
2. `codex-control-tower` klasörünü bul ve aç.
3. Klasörün içindeki boş alana farenin sağ tuşuyla tıkla.
4. `Terminalde Aç` veya `Open in Terminal` seçeneğine tıkla.

Görmen gereken: Koyu pencerenin son satırında `codex-control-tower` yazmalıdır.

### 2. Son denetimleri çalıştır

Koyu pencereye aşağıdaki komutları birer birer yaz. Her satırdan sonra Enter'a bas ve işlem bitmeden sonraki satırı yazma.

```powershell
npm install
npm run verify
npm run demo
npm run demo:safety
npm run dashboard
```

`npm run demo:safety` yalnızca ön denetim kaydı üretir. Bir silme komutu çalıştırmaz.

Görmen gereken:

- Denetimler hata vermeden bitmelidir.
- Demo sonucu `Before: 25/100, 16 risks` ve `After: 88/100, 1 risks` göstermelidir.
- Ön denetim `BLOCKED`, `NOT_RUN` ve `<USER_HOME_PARENT>` göstermelidir.
- Tarayıcıda Codex Control Tower açılmalıdır.

Bir hata görürsen çekime başlama. Hata metninin ekran görüntüsünü bu Codex görevine gönder.

### 3. 03 panelini aç

1. Açılan Chrome veya Edge penceresini büyüt.
2. Sol taraftan `Safety Preflight` bölümüne tıkla.
3. Sayfanın üstündeki **DESTRUCTIVE ACTION PREFLIGHT** panelini bul.
4. Gerekirse sayfayı az miktarda kaydır; panelin tamamı aynı ekrana sığsın.
5. Tarayıcı büyüklüğünü normalde, yani yüzde 100'de tut.

Görmen gereken:

- `ANALYSIS ONLY · NO COMMAND EXECUTED`
- `Operation: recursive_delete`
- `Requested target: $HOME/..`
- `Resolved boundary: <USER_HOME_PARENT>`
- `Decision: BLOCKED`
- `Execution: NOT_RUN`
- `HUMAN REVIEW REQUIRED`
- Deterministik kural sürümü
- Güvenli sonraki adım

Ekranda gerçek kullanıcı adı, gerçek kullanıcı klasörü, e-posta, özel konuşma, parola, gizli anahtar veya `/feedback` kimliği varsa çekime başlama.

Mevcut `03 (YENİ)` ham kaydı bu alanları gösteriyorsa yeniden çekme. Denetlenen mevcut kayıtta bu alanlar görünmektedir; onu ham haliyle koru ve yalnızca son kurguda hedef süreye kırp.

## 01 numaralı video — 10 saniye

**Tam dosya adı:** `01 (10 sn) Codex Control Tower lets GPT-5.6 challenge bounded evidence. The model can audit the proof, but it cannot overwrite locked local facts.mp4`

**Ekranda göster:** GitHub Pages'te tamamlanmış gerçek GPT-5.6 paneli.

**Fare hareketi:** `gpt-5.6-sol`, ayrı model/yerel kararlar ve kilitli durum açıklamasında kısa süre bekle.

**Tam İngilizce seslendirme:** “Codex Control Tower lets GPT-5.6 challenge bounded evidence. The model can audit the proof, but it cannot overwrite locked local facts.”

**Türkçe anlamı:** Codex Control Tower, GPT-5.6'nın sınırlı kanıtı sorgulamasını sağlar. Model kanıtı inceleyebilir fakat kilitli yerel gerçeklerin üzerine yazamaz.

**Görmen gereken sonuç:** İlk 10 saniyede gerçek GPT-5.6'nın merkezde olduğu ve yerel gerçeği değiştiremediği anlaşılmalıdır. Mevcut ham video korunur.

## 02 numaralı video — 13 saniye

**Tam dosya adı:** `02 (13 sn) The sample project is fictional, but this execution is real. The local scanner compares prepared snapshots, raising governance from twenty-five to eighty-eight while reducing risks from sixteen to one.mp4`

**Ekranda göster:** `FICTIONAL SAMPLE PROJECT`, `REAL EXECUTION` ve Before / After özeti.

**Fare hareketi:** Sırayla kurgusal/gerçek açıklamaları, `25 → 88` ve `16 → 1` sayılarını göster.

**Tam İngilizce seslendirme:** “The sample project is fictional, but this execution is real. The local scanner compares prepared snapshots, raising governance from twenty-five to eighty-eight while reducing risks from sixteen to one.”

**Türkçe anlamı:** Örnek proje kurgusaldır ama bu çalışma gerçektir. Yerel tarayıcı hazırlanmış görüntüleri karşılaştırır; yönetişim yirmi beşten seksen sekize çıkarken riskler on altıdan bire iner.

**Görmen gereken sonuç:** Kurgusal örnek ile gerçek tarama birbirine karışmamalıdır. GPT-5.6'nın puanı değiştirdiği söylenmemelidir. Mevcut ham video korunur.

## Eski 03 numaralı video — 8 saniye — mutlaka kullan

**Tam dosya adı:** `03 (8 sn) The dashboard starts locally from the project workspace and serves its live report at the private address shown on screen.mp4`

**Ekranda göster:** Mevcut terminal kaydını kullan. Kayıtta `npm.cmd run dashboard` komutu, dashboard paket komutu, Vite'ın hazır olması ve `http://127.0.0.1:4173/` yerel adresi görünür.

**Kurgu:** Komutun çalıştırıldığı bölümü ve Vite'ın `ready`/yerel adres sonucunu koru. Yalnızca baştaki veya sondaki gereksiz beklemeyi keserek zaman çizelgesindeki bu parçayı 8 saniye yap.

**Tam İngilizce seslendirme:** “The dashboard starts locally from the project workspace and serves its live report at the private address shown on screen.”

**Türkçe anlamı:** Dashboard proje çalışma alanından yerel olarak başlatılır ve canlı raporunu ekranda görünen özel adreste sunar.

**Görmen gereken sonuç:** 02'nin terminal sonucundan 04'ün yerel READY ekranına nasıl geçildiği kanıtlanır. Bu parça yeni Safety Preflight kaydıyla değiştirilmeyecektir.

## 04 numaralı video — 12 saniye

**Tam dosya adı:** `04 (12 sn) Before GPT-5.6 runs, the local dashboard shows READY. Access is unchecked, no model workspace exists, and accepted tool events have not run.mp4`

**Ekranda göster:** Yerel dashboard `READY / NOT STARTED` durumu.

**Fare hareketi:** READY, erişim kontrol edilmedi, model alanı yok ve araç olayları çalışmadı alanlarını sırayla göster.

**Tam İngilizce seslendirme:** “Before GPT-5.6 runs, the local dashboard shows READY. Access is unchecked, no model workspace exists, and accepted tool events have not run.”

**Türkçe anlamı:** GPT-5.6 çalışmadan önce yerel gösterge paneli READY gösterir. Erişim henüz kontrol edilmemiştir, model çalışma alanı yoktur ve kabul edilen araç olayları çalışmamıştır.

**Görmen gereken sonuç:** READY durumunun tamamlanmış çalışma olmadığı anlaşılmalıdır. Mevcut ham video korunur.

## 05 numaralı video — son kurguda 17 saniye

**Tam dosya adı:** `05 (20 sn) In Codex Desktop, one exact instruction launches the real GPT-5.6 Sol audit. About fifty-two seconds later, it returns separate verdicts, preserves NOT_RUN, and requires human review.mp4`

**Ekranda göster:** Mevcut Codex Desktop ham videosundaki tam talimat, `npm run demo:codex` başlangıcı ve aynı penceredeki sonuç. Bu parçada tarayıcıya geçme.

**Fare hareketi:** Talimat, komut, ayrı kararlar, NOT_RUN ve insan incelemesi üzerinde kısa süre bekle.

**Kurgu:** Ham videonun başındaki talimat/çalıştırma bölümünü ve yaklaşık `00:53–01:00` arasındaki sonuç bölümünü kullan. Uzun bekleme kısmını sert kesmeyle çıkar; 60 saniyelik videonun tamamını hızlandırma, çünkü talimat ve sonuç okunur kalmalıdır. Kaynak dosya adındaki `(20 sn)` ifadesini değiştirme; yalnızca Clipchamp zaman çizelgesindeki parçayı 17 saniye yap. Sağdaki ilgisiz depo değişiklik sayacında bekleme; ortadaki doğrulanmış sonuca odaklan.

**Tam İngilizce seslendirme:** “In Codex Desktop, one exact instruction launches the real GPT-5.6 Sol audit. About fifty-two seconds later, it returns separate verdicts, preserves NOT_RUN, and requires human review.”

**Türkçe anlamı:** Codex Desktop'ta tek bir tam talimat gerçek GPT-5.6 Sol denetimini başlatır. Yaklaşık elli iki saniye sonra ayrı kararlar döner, NOT_RUN korunur ve insan incelemesi gerekir.

**Görmen gereken sonuç:** Mevcut video hem talimatı hem sonucu gösterdiği için yeniden çekilmez. Tam İngilizce metni koru; yalnızca komut ile sonuç arasındaki boş beklemeyi azaltarak zaman çizelgesindeki süreyi 17 saniye yap.

## 06 numaralı video — 14 saniye

**Tam dosya adı:** `06 (14 sn) The local dashboard now reads the same completed GPT-5.6 run. It preserves separate verdicts, one disagreement, locked NOT_RUN, and human review.mp4`

**Ekranda göster:** Yerel dashboard tamamlanmış GPT-5.6 özeti.

**Fare hareketi:** COMPLETE, ayrı kararlar, bir uyuşmazlık, kilitli NOT_RUN ve insan incelemesini göster.

**Tam İngilizce seslendirme:** “The local dashboard now reads the same completed GPT-5.6 run. It preserves separate verdicts, one disagreement, locked NOT_RUN, and human review.”

**Türkçe anlamı:** Yerel gösterge paneli artık aynı tamamlanmış GPT-5.6 çalışmasını okur. Ayrı kararları, bir uyuşmazlığı, kilitli NOT_RUN durumunu ve insan incelemesini korur.

**Görmen gereken sonuç:** Model ve yerel kararlar birleşmemelidir. Mevcut ham video korunur.

## 07 numaralı video — 15 saniye

**Tam dosya adı:** `07 (15 sn) This is the non-obvious control. GPT-5.6 can contradict a structural PASS using missing implementation and test evidence, but it cannot rewrite the locked local state.mp4`

**Ekranda göster:** `MISSION_CHANGE_TEST_ALIGNMENT`, yapısal ön kontrol ve eksik uygulama/denetim kanıtı.

**Fare hareketi:** Yapısal PASS, eksik kanıt, çelişki ilişkisi ve kilitli yerel durumu göster.

**Tam İngilizce seslendirme:** “This is the non-obvious control. GPT-5.6 can contradict a structural PASS using missing implementation and test evidence, but it cannot rewrite the locked local state.”

**Türkçe anlamı:** Bu, ilk bakışta açık olmayan denetimdir. GPT-5.6 eksik uygulama ve denetim kanıtını kullanarak yapısal PASS ile çelişebilir fakat kilitli yerel durumu yeniden yazamaz.

**Görmen gereken sonuç:** GPT-5.6'nın anlam ilişkisini sorguladığı, gerçeğin sahibi olmadığı anlaşılmalıdır. Mevcut ham video korunur.

## 08 numaralı video — 17 saniye

**Tam dosya adı:** `08 (17 sn) Proof includes the model, Codex CLI, an empty read-only workspace, zero accepted tools, disabled web search, timestamps, a clean commit, and SHA-256 evidence. The age warning remains visible.mp4`

**Ekranda göster:** Model ve kanıt kökeni bölümü.

**Fare hareketi:** Model, Codex CLI `0.144.3`, boş salt okunur alan, sıfır araç, kapalı internet araması, zaman, temiz kayıt, SHA-256 ve yaş uyarısını göster.

**Tam İngilizce seslendirme:** “Proof includes the model, Codex CLI, an empty read-only workspace, zero accepted tools, disabled web search, timestamps, a clean commit, and SHA-256 evidence. The age warning remains visible.”

**Türkçe anlamı:** Kanıt; modeli, Codex komut aracını, boş salt okunur alanı, sıfır kabul edilen aracı, kapalı internet aramasını, zamanları, temiz kaydı ve SHA-256 özetini içerir. Yaş uyarısı görünür kalır.

**Görmen gereken sonuç:** Kanıt kökeni okunmalı ve eski kanıt uyarısı saklanmamalıdır. Mevcut ham video korunur.

## 09 numaralı video — 16 saniye

**Tam dosya adı:** `09 (16 sn) Evidence states never collapse into a single success claim. Seven checks pass, one fails, five remain NOT_RUN, and the fictional demo provenance stays explicitly SIMULATED.mp4`

**Ekranda göster:** Evidence durum sayıları.

**Fare hareketi:** PASS, FAIL, NOT_RUN ve SIMULATED sayılarını sırayla göster.

**Tam İngilizce seslendirme:** “Evidence states never collapse into a single success claim. Seven checks pass, one fails, five remain NOT_RUN, and the fictional demo provenance stays explicitly SIMULATED.”

**Türkçe anlamı:** Kanıt durumları tek bir başarı iddiasında birleşmez. Yedi denetim geçer, biri başarısızdır, beşi NOT_RUN kalır ve kurgusal demo kökeni açıkça SIMULATED olarak görünür.

**Görmen gereken sonuç:** Eksik veya kurgusal kanıt PASS gibi gösterilmemelidir. Mevcut ham video korunur.

## 10 numaralı video — 16 saniye

**Tam dosya adı:** `10 (16 sn) The fictional sample uses real scans, not model-made scores. Governance rises from 25 to 88, risks fall from 16 to 1, and NOT_RUN stays visible.mp4`

**Ekranda göster:** Before / After görünümü ve NOT_RUN.

**Fare hareketi:** `25`, `88`, `16`, `1` ve NOT_RUN alanlarını göster.

**Tam İngilizce seslendirme:** “The fictional sample uses real scans, not model-made scores. Governance rises from 25 to 88, risks fall from 16 to 1, and NOT_RUN stays visible.”

**Türkçe anlamı:** Kurgusal örnek, modelin ürettiği puanları değil gerçek taramaları kullanır. Yönetişim 25'ten 88'e çıkar, riskler 16'dan 1'e iner ve NOT_RUN görünür kalır.

**Görmen gereken sonuç:** Puanların yerel taramaya ait olduğu anlaşılmalıdır. Mevcut ham video korunur.

## Yeni Safety Preflight parçası — 15 saniye — `03 (YENİ)` dosyasını kullan

**Denetlenen kaynak dosya:** Adı `03 (YENİ) (15 sn) Before a destructive action...` ile başlayan ve Windows yol uzunluğu nedeniyle `...and huma.mp4` kısmında kesilen mevcut dosya. Bu ham dosyayı yeniden adlandırma veya üzerine yazma. Aşağıdaki eksiksiz seslendirmeyi kullan.

**Zaman çizelgesindeki yeri:** 10'dan sonra, 11'den önce. Bu kayıt herkese açık v0.2.0 sayfasında tamamlanmış durumu gösterdiği için 04'ün READY ekranından önce konursa zaman sırası geriye gider.

**Ekranda göster:** Chrome veya Edge içindeki Destructive Action Preflight paneli.

**Fare hareketi:**

1. İlk 3 saniye: başlık, `recursive_delete` ve `$HOME/..`.
2. Sonraki 4 saniye: `<USER_HOME_PARENT>`.
3. Sonraki 5 saniye: `BLOCKED`, `Execution NOT_RUN` ve `HUMAN REVIEW REQUIRED`.
4. Son 3 saniye: güvenli sonraki adım ve `ANALYSIS ONLY · NO COMMAND EXECUTED`.

**Tam İngilizce seslendirme:** “Before a destructive action, Control Tower deterministically resolves the target against protected roots. This recursive delete crosses the user-home boundary, so execution stays NOT RUN and human review is required.”

**Türkçe anlamı:** Yıkıcı bir işlemden önce Control Tower hedefi korunan köklere göre deterministik olarak çözümler. Bu özyinelemeli silme kullanıcı ana klasörü sınırını aştığı için işlem NOT RUN olarak kalır ve insan incelemesi gerekir.

**Görmen gereken sonuç:** Kişisel yol görünmeden `BLOCKED`, `NOT_RUN`, insan incelemesi ve hiçbir komutun çalışmadığı açıkça okunmalıdır. Mevcut kayıt geçerlidir; yeniden çekme gerekmez.

## 11 numaralı video — 16 saniye — mevcut kaydı kullan

**Tam dosya adı:** `11 (16 sn) The frozen Build Week tag preserves the submitted source. The public repository exposes the GPT-5.6 story, evidence, tests, workflows, a live demo, and a release for judges.mp4`

**Ekranda göster:** Mevcut GitHub kaydını değiştirmeden kullan. Görüntüde deponun genel açılışı ve üstteki dosya listesi, README başlığı ile ilk paragrafı ve yayımlanmış sürüm alanı bulunur. README'nin aşağı bölümlerinin görünmesi gerekmez. Bu tarihsel dondurulmuş temel kaydıdır; v2'nin zaten var olduğu iddiası değildir.

**Fare hareketi:** Mevcut kayıtta deponun açılışı, README ilk paragrafı ve sürüm alanı arasında yapılan hareketi aynen koru.

**Tam İngilizce seslendirme:** “The frozen Build Week tag preserves the submitted source. The public repository exposes the GPT-5.6 story, evidence, tests, workflows, a live demo, and a release for judges.”

**Türkçe anlamı:** Dondurulmuş Build Week etiketi gönderilen kaynağı korur. Herkese açık depo GPT-5.6 anlatısını, kanıtları, testleri, iş akışlarını, canlı demoyu ve jüri için bir sürümü gösterir.

**Görmen gereken sonuç:** Bu video yeniden çekilmeyecek. Mevcut ham 11 dosyası son kurguda aynen kullanılacaktır. Yeni Destructive Action Preflight kanıtını yeni 03 videosu gösterir. Mevcut 11, `openai-build-week-final-v2` etiketinin var olduğunu söylemez.

## 12 numaralı video — 8 saniye

**Tam dosya adı:** `12 (8 sn) Codex writes. GPT-5.6 challenges. Control Tower locks the facts. The developer decides.mp4`

**Ekranda göster:** Tamamlanmış denetim özeti veya ürün kapanış görüntüsü.

**Fare hareketi:** Fareyi sabit tut veya yetki cümlesi üzerinde beklet.

**Tam İngilizce seslendirme:** “Codex writes. GPT-5.6 challenges. Control Tower locks the facts. The developer decides.”

**Türkçe anlamı:** Codex yazar. GPT-5.6 sorgular. Control Tower gerçekleri kilitler. Geliştirici karar verir.

**Görmen gereken sonuç:** Video insan yetkisiyle kapanmalıdır. Mevcut ham video korunur.

## Clipchamp'ta 13 kaynak parçayı birleştir

1. Clipchamp'ta yeni boş video aç.
2. Ham video klasöründeki kullanılacak dosyaları içe aktar.
3. Zaman çizelgesine şu sırayla koy: `01, 02, eski 03 (8 sn), 04, 05, 06, 07, 08, 09, 10, yeni 03 (YENİ), mevcut 11, 12`.
4. Her parça arasında boş siyah alan olmadığını kontrol et.
5. Sürelerin sırasıyla `10, 13, 8, 12, 17, 14, 15, 17, 16, 16, 15, 16, 8` saniye olduğunu kontrol et.
6. Toplamın `2:57` olduğunu gör. `3:00` görünüyorsa dışa aktarma.
7. Videoyu baştan sona izle; yalnızca başını ve sonunu kontrol etme.
8. Dışa aktarmadan önce sesin duyulduğunu ve yazıların okunabildiğini doğrula.
9. Ek başlık kartı, siyah boşluk veya ayrı kapanış ekleme; bunlar 3 saniyelik güvenlik payını tüketir.

Doğrulanmış 13 kaynak parçayı bu sırayla birleştirip `2:57` olarak dışa aktar. Nihai videoyu herkese açık YouTube'a yükle; gerçek bağlantıyı belgelere eklemek üzere Codex'e gönder. Codex bağlantıyı doğrulayıp ekledikten, testleri yeniden çalıştırdıktan ve Pages'i doğruladıktan sonra v2 etiketini ve sürümünü oluşturacaktır. YouTube bağlantısından önce v2 oluşturma veya olmayan bir etiketi gösteren sahte görüntü hazırlama.

## Son gizlilik kontrolü

- E-posta, parola, bildirim veya özel sekme görünmüyor.
- Gerçek kullanıcı klasörü görünmüyor; yalnızca `<USER_HOME>`, `<USER_HOME_PARENT>` ve `<REPOSITORY_ROOT>` gibi güvenli ifadeler var.
- Özel Codex konuşması ve `/feedback` kimliği görünmüyor.
- InvoiceFlow Mini'nin kurgusal olduğu söyleniyor.
- GPT-5.6'nın 25 → 88 değişimini oluşturduğu söylenmiyor.
- Destructive Action Preflight için “her silmeyi engeller” veya “sandbox yerine geçer” denmiyor.
- 03 panelinde `ANALYSIS ONLY · NO COMMAND EXECUTED` görünüyor.
- Telif hakkı sana ait olmayan müzik kullanılmıyor.

## YouTube bağlantısı geldiğinde

Gerçek nihai video tamamlanıp YouTube'a **Herkese Açık** olarak yüklendiğinde:

1. `Ctrl`, `Shift` ve `N` tuşlarına birlikte basıp gizli tarayıcı penceresi aç.
2. Gerçek YouTube bağlantısını yapıştır ve Enter'a bas.
3. Hesaba girmeden video açılıyor mu kontrol et.
4. Ses var mı kontrol et.
5. Süre `3:00` değerinden kısa mı kontrol et.
6. Bağlantıyı bu Codex görevine gönder.

Codex bağlantıyı doğruladıktan sonra README, JUDGE_START_HERE, Devpost metni ve Submission Manifest içine ekleyecek; testleri yeniden çalıştıracak ve Pages'i doğrulayacak; ancak bundan sonra `openai-build-week-final-v2` etiketi ile aynı adlı sürümü oluşturacaktır. Hayalî veya geçici bağlantı yazılmayacaktır. Eski `openai-build-week-final` etiketi değiştirilmeyecektir.

## `/feedback` kimliği

Gerçek kimlik yalnızca Devpost'un özel alanında bulunmalıdır. README, GitHub, video, YouTube açıklaması, ekran görüntüsü veya bu depodaki herhangi bir dosyaya yazma. Değer yoksa uydurma.

## Son bağlantılar

- [İngilizce 13 kaynak parça planı](DEMO_SCRIPT.md)
- [Codex'e yapıştırılacak gerçek model denetimi talimatı](CODEX_DEMO_PROMPT.md)
- [Jüri başlangıç sayfası](../JUDGE_START_HERE.md)
- [Jürinin deneme yolu](JUDGE_TEST_PATH.md)
- [Devpost gönderim metni](DEVPOST_SUBMISSION.md)
