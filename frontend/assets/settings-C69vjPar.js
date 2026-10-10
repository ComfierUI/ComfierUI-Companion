//#region src/locales/tr/settings.json
var Comfy_Appearance_DisableAnimations = {
	"name": "Animasyonları devre dışı bırak",
	"tooltip": "Çoğu CSS animasyonunu ve geçişini kapatır. Görüntüleme GPU'su aynı zamanda üretim için kullanıldığında çıkarımı hızlandırır."
};
var Comfy_Canvas_BackgroundImage = {
	"name": "Tuval arka plan resmi",
	"tooltip": "Tuval arka planı için resim URL'si. Çıktılar panelindeki bir resme sağ tıklayıp \"Arka Plan Olarak Ayarla\"yı seçerek kullanabilir veya yükleme düğmesini kullanarak kendi resminizi yükleyebilirsiniz."
};
var Comfy_Canvas_LeftMouseClickBehavior = {
	"name": "Sol Fare Tıklama Davranışı",
	"options": {
		"Panning": "Kaydırma",
		"Select": "Seç"
	}
};
var Comfy_Canvas_MouseWheelScroll = {
	"name": "Fare Tekerleği Kaydırma",
	"options": {
		"Panning": "Kaydırma",
		"Zoom in/out": "Yakınlaştır/Uzaklaştır"
	}
};
var Comfy_Canvas_NavigationMode = {
	"name": "Tuval Gezinme Modu",
	"options": {
		"Custom": "Özel",
		"Drag Navigation": "Sürükleyerek Gezinme",
		"Standard (New)": "Standart (Yeni)"
	}
};
var Comfy_Canvas_SelectionToolbox = {
	"name": "Seçim araç kutusunu göster",
	"tooltip": "Düğümler seçildiğinde, yaygın işlemlere hızlı erişim sağlayan bir araç çubuğu gösterir."
};
var Comfy_ConfirmClear = { "name": "İş akışını temizlerken onay iste" };
var Comfy_DOMClippingEnabled = { "name": "DOM öğesi kırpmayı etkinleştir (etkinleştirmek performansı düşürebilir)" };
var Comfy_DevMode = { "name": "Geliştirici modu seçeneklerini etkinleştir (API kaydetme, vb.)" };
var Comfy_DisableFloatRounding = {
	"name": "Varsayılan ondalık sayı widget yuvarlamasını devre dışı bırak.",
	"tooltip": "(sayfanın yeniden yüklenmesini gerektirir) Arka uçtaki düğüm tarafından yuvarlama ayarlandığında yuvarlama devre dışı bırakılamaz."
};
var Comfy_DisableSliders = { "name": "Düğüm widget kaydırıcılarını devre dışı bırak" };
var Comfy_EditAttention_Delta = { "name": "Ctrl+yukarı/aşağı hassasiyeti" };
var Comfy_EnableTooltips = { "name": "Araç İpuçlarını Etkinleştir" };
var Comfy_EnableWorkflowViewRestore = { "name": "İş akışlarında tuval konumunu ve yakınlaştırma seviyesini kaydet ve geri yükle" };
var Comfy_ErrorSystem_ShowMissingModels = {
	"name": "Sorunlar sekmesinde eksik modelleri göster",
	"tooltip": "Devre dışı bırakıldığında, bulunamayan model dosyaları sorunlar sekmesinde listelenmez ve düğümleri vurgulanmaz."
};
var Comfy_Execution_PreviewMethod = {
	"name": "Canlı önizleme yöntemi",
	"options": {
		"auto": "otomatik",
		"default": "default",
		"latent2rgb": "latent2rgb",
		"none": "hiçbiri",
		"taesd": "taesd"
	},
	"tooltip": "Görüntü oluşturma sırasında canlı önizleme yöntemi. \"default\" sunucu CLI ayarını kullanır."
};
var Comfy_FloatRoundingPrecision = {
	"name": "Ondalık sayı widget yuvarlama ondalık basamakları [0 = otomatik].",
	"tooltip": "(sayfanın yeniden yüklenmesini gerektirir)"
};
var Comfy_Graph_AutoPanSpeed = {
	"name": "Otomatik kaydırma hızı",
	"tooltip": "Tuval kenarına sürükleyerek otomatik kaydırma sırasında maksimum hız. Otomatik kaydırmayı devre dışı bırakmak için 0 olarak ayarlayın."
};
var Comfy_Graph_CanvasInfo = { "name": "Sol alt köşede tuval bilgilerini göster (fps, vb.)" };
var Comfy_Graph_CanvasMenu = { "name": "Grafik tuval menüsünü göster" };
var Comfy_Graph_CtrlShiftZoom = { "name": "Hızlı yakınlaştırma kısayolunu etkinleştir (Ctrl + Shift + Sürükle)" };
var Comfy_Graph_DeduplicateSubgraphNodeIds = {
	"name": "Alt grafik düğüm kimliklerini çoğaltmayı önle",
	"tooltip": "Bir iş akışı yüklenirken alt grafiklerdeki yinelenen düğüm kimliklerini otomatik olarak yeniden ata."
};
var Comfy_Graph_LinkMarkers = {
	"name": "Bağlantı orta nokta işaretçileri",
	"options": {
		"Arrow": "Ok",
		"Circle": "Daire",
		"None": "Yok"
	}
};
var Comfy_Graph_LiveSelection = {
	"name": "Canlı seçim",
	"tooltip": "Etkinleştirildiğinde, seçim dikdörtgenini sürüklerken düğümler gerçek zamanlı olarak seçilir/seçimi kaldırılır; diğer tasarım araçlarına benzer şekilde çalışır."
};
var Comfy_Graph_ZoomSpeed = { "name": "Tuval yakınlaştırma hızı" };
var Comfy_GroupSelectedNodes_Padding = { "name": "Seçili düğümleri gruplandırma dolgusu" };
var Comfy_Group_DoubleClickTitleToEdit = { "name": "Düzenlemek için grup başlığına çift tıkla" };
var Comfy_LinkRelease_Action = {
	"name": "Bağlantı bırakıldığında eylem (Değiştirici yok)",
	"options": {
		"context menu": "bağlam menüsü",
		"no action": "eylem yok",
		"search box": "arama kutusu"
	}
};
var Comfy_LinkRelease_ActionShift = {
	"name": "Bağlantı bırakıldığında eylem (Shift)",
	"options": {
		"context menu": "bağlam menüsü",
		"no action": "eylem yok",
		"search box": "arama kutusu"
	}
};
var Comfy_LinkRenderMode = {
	"name": "Bağlantı Oluşturma Modu",
	"options": {
		"Hidden": "Gizli",
		"Linear": "Doğrusal",
		"Spline": "Eğri",
		"Straight": "Düz"
	},
	"tooltip": "Tuvaldeki düğümler arasındaki bağlantı çizgilerinin görünümünü ve görünürlüğünü kontrol eder."
};
var Comfy_Load3D_3DViewerEnable = {
	"name": "3D Görüntüleyiciyi Etkinleştir (Beta)",
	"tooltip": "Seçili düğümler için 3D Görüntüleyiciyi (Beta) etkinleştirir. Bu özellik, tam boyutlu 3D görüntüleyicide 3D modelleri doğrudan görselleştirmenize ve etkileşimde bulunmanıza olanak tanır."
};
var Comfy_Load3D_BackgroundColor = {
	"name": "Başlangıç Arka Plan Rengi",
	"tooltip": "3D sahnenin varsayılan arka plan rengini kontrol eder. Bu ayar, yeni bir 3D bileşeni oluşturulduğunda arka planın nasıl görüneceğini belirler, ancak oluşturulduktan sonra her bileşen için ayrı ayrı ayarlanabilir."
};
var Comfy_Load3D_CameraType = {
	"name": "Başlangıç Kamera Tipi",
	"options": {
		"orthographic": "ortografik",
		"perspective": "perspektif"
	},
	"tooltip": "Yeni bir 3D bileşeni oluşturulduğunda kameranın varsayılan olarak perspektif mi yoksa ortografik mi olacağını kontrol eder. Bu varsayılan ayar, oluşturulduktan sonra her bileşen için ayrı ayrı değiştirilebilir."
};
var Comfy_Load3D_LightAdjustmentIncrement = {
	"name": "Işık Ayar Artışı",
	"tooltip": "3D sahnelerde ışık yoğunluğunu ayarlarken artış miktarını kontrol eder. Daha küçük bir adım değeri, ışık ayarlarında daha hassas kontrol sağlar; daha büyük bir değer ise her ayarda daha belirgin değişiklikler oluşturur."
};
var Comfy_Load3D_LightIntensity = {
	"name": "Başlangıç Işık Yoğunluğu",
	"tooltip": "3D sahnedeki ışıkların varsayılan parlaklık seviyesini ayarlar. Bu değer, yeni bir 3D bileşeni oluşturulduğunda nesnelerin ne kadar aydınlatılacağını belirler, ancak oluşturulduktan sonra her bileşen için ayrı ayrı ayarlanabilir."
};
var Comfy_Load3D_LightIntensityMaximum = {
	"name": "Maksimum Işık Yoğunluğu",
	"tooltip": "3D sahneler için izin verilen maksimum ışık yoğunluğu değerini ayarlar. Bu, herhangi bir 3D bileşende ışık ayarlanırken belirlenebilecek en yüksek parlaklık sınırını tanımlar."
};
var Comfy_Load3D_LightIntensityMinimum = {
	"name": "Minimum Işık Yoğunluğu",
	"tooltip": "3D sahneler için izin verilen minimum ışık yoğunluğu değerini ayarlar. Bu, herhangi bir 3D bileşende ışık ayarlanırken belirlenebilecek en düşük parlaklık sınırını tanımlar."
};
var Comfy_Load3D_PLYEngine = {
	"name": "PLY Motoru",
	"options": {
		"fastply": "fastply",
		"threejs": "threejs"
	},
	"tooltip": "PLY dosyalarını yüklemek için motoru seçin. \"threejs\" yerel Three.js PLYLoader'ı kullanır (ağ PLY dosyaları için en iyisi). \"fastply\" ASCII nokta bulutu PLY dosyaları için optimize edilmiş bir yükleyici kullanır. \"sparkjs\" ise 3D Gaussian Splatting PLY dosyaları için Spark.js kullanır."
};
var Comfy_Load3D_ShowGrid = {
	"name": "Başlangıç Izgara Görünürlüğü",
	"tooltip": "Yeni bir 3D bileşeni oluşturulduğunda ızgaranın varsayılan olarak görünüp görünmeyeceğini kontrol eder. Bu varsayılan ayar, oluşturulduktan sonra her bileşen için ayrı ayrı değiştirilebilir."
};
var Comfy_Locale = { "name": "Dil" };
var Comfy_MaskEditor_BrushAdjustmentSpeed = {
	"name": "Fırça ayar hızı çarpanı",
	"tooltip": "Ayarlama sırasında fırça boyutunun ve sertliğinin ne kadar hızlı değiştiğini kontrol eder. Daha yüksek değerler daha hızlı değişiklikler anlamına gelir."
};
var Comfy_MaskEditor_UseDominantAxis = {
	"name": "Fırça ayarını baskın eksene kilitle",
	"tooltip": "Etkinleştirildiğinde, fırça ayarları yalnızca daha fazla hareket ettiğiniz yöne bağlı olarak boyutu VEYA sertliği etkileyecektir"
};
var Comfy_ModelLibrary_AutoLoadAll = {
	"name": "Tüm model klasörlerini otomatik olarak yükle",
	"tooltip": "Doğruysa, model kütüphanesini açar açmaz tüm klasörler yüklenecektir (bu, yüklenirken gecikmelere neden olabilir). Yanlışsa, kök düzeyindeki model klasörleri yalnızca üzerlerine tıkladığınızda yüklenecektir."
};
var Comfy_ModelLibrary_NameFormat = {
	"name": "Model kütüphanesi ağaç görünümünde hangi adın görüntüleneceği",
	"options": {
		"filename": "dosyaadı",
		"title": "başlık"
	},
	"tooltip": "Model listesinde ham dosya adının (dizin veya \".safetensors\" uzantısı olmadan) basitleştirilmiş bir görünümünü oluşturmak için \"dosyaadı\"nı seçin. Yapılandırılabilir model meta veri başlığını görüntülemek için \"başlık\"ı seçin."
};
var Comfy_NodeBadge_NodeIdBadgeMode = {
	"name": "Düğüm ID rozeti modu",
	"options": {
		"None": "Yok",
		"Show all": "Tümünü göster"
	}
};
var Comfy_NodeBadge_NodeLifeCycleBadgeMode = {
	"name": "Düğüm yaşam döngüsü rozeti modu",
	"options": {
		"None": "Yok",
		"Show all": "Tümünü göster"
	}
};
var Comfy_NodeBadge_NodeSourceBadgeMode = {
	"name": "Düğüm kaynak rozeti modu",
	"options": {
		"Hide built-in": "Yerleşik olanı gizle",
		"None": "Yok",
		"Show all": "Tümünü göster"
	}
};
var Comfy_NodeBadge_ShowApiPricing = { "name": "API düğüm fiyatlandırma rozetini göster" };
var Comfy_NodeLibrary_NewDesign = {
	"name": "Yeni Düğüm Kütüphanesi Tasarımı",
	"tooltip": "Sekmeli (Temel, Tümü, Özel), geliştirilmiş arama ve üzerine gelindiğinde önizleme özelliklerine sahip yeniden tasarlanmış düğüm kütüphanesi kenar çubuğunu etkinleştir."
};
var Comfy_NodeReplacement_Enabled = {
	"name": "Otomatik düğüm değiştirmeyi etkinleştir",
	"tooltip": "Etkinleştirildiğinde, eksik düğümler için bir değiştirme eşlemesi varsa otomatik olarak daha yeni karşılıklarıyla değiştirilebilir."
};
var Comfy_NodeSearchBoxImpl = {
	"name": "Düğüm arama kutusu uygulaması",
	"options": {
		"default": "varsayılan",
		"litegraph (legacy)": "litegraph (eski)",
		"v1 (legacy)": "v1 (eski)"
	}
};
var Comfy_NodeSearchBoxImpl_FollowCursor = {
	"name": "Eklenen düğümler imleci takip eder",
	"tooltip": "Etkinleştirildiğinde, arama kutusundan eklenen düğümler tıklanıp yerleştirilene kadar imleci takip eder. Yalnızca varsayılan uygulama için geçerlidir."
};
var Comfy_NodeSearchBoxImpl_NodePreview = {
	"name": "Düğüm önizlemesi",
	"tooltip": "Yalnızca varsayılan uygulama için geçerlidir"
};
var Comfy_NodeSearchBoxImpl_ShowCategory = {
	"name": "Arama sonuçlarında düğüm kategorisini göster",
	"tooltip": "Yalnızca varsayılan uygulama için geçerlidir"
};
var Comfy_NodeSearchBoxImpl_ShowIdName = {
	"name": "Arama sonuçlarında düğüm kimliği adını göster",
	"tooltip": "Yalnızca varsayılan uygulama için geçerlidir"
};
var Comfy_NodeSearchBoxImpl_ShowNodeFrequency = {
	"name": "Arama sonuçlarında düğüm sıklığını göster",
	"tooltip": "Yalnızca varsayılan uygulama için geçerlidir"
};
var Comfy_NodeSuggestions_number = {
	"name": "Düğüm öneri sayısı",
	"tooltip": "Yalnızca litegraph arama kutusu/bağlam menüsü için"
};
var Comfy_Node_AllowImageSizeDraw = { "name": "Görüntü önizlemesinin altında genişlik × yüksekliği göster" };
var Comfy_Node_AlwaysShowAdvancedWidgets = {
	"name": "Tüm düğümlerde gelişmiş araçları her zaman göster",
	"tooltip": "Etkinleştirildiğinde, gelişmiş araçlar tüm düğümlerde ayrı ayrı genişletmeye gerek kalmadan her zaman görünür olur."
};
var Comfy_Node_AutoSnapLinkToSlot = {
	"name": "Bağlantıyı otomatik olarak düğüm yuvasına yapıştır",
	"tooltip": "Bir bağlantıyı bir düğümün üzerine sürüklerken, bağlantı otomatik olarak düğüm üzerindeki uygun bir giriş yuvasına yapışır"
};
var Comfy_Node_BypassAllLinksOnDelete = {
	"name": "Düğümleri silerken tüm bağlantıları koru",
	"tooltip": "Bir düğümü silerken, tüm giriş ve çıkış bağlantılarını yeniden bağlamaya çalışın (silinen düğümü atlayarak)"
};
var Comfy_Node_DoubleClickTitleToEdit = { "name": "Düzenlemek için düğüm başlığına çift tıkla" };
var Comfy_Node_MiddleClickRerouteNode = { "name": "Orta tıklama yeni bir Yeniden Yönlendirme düğümü oluşturur" };
var Comfy_Node_Opacity = { "name": "Düğüm opaklığı" };
var Comfy_Node_ShowDeprecated = {
	"name": "Aramada kullanımdan kaldırılmış düğümleri göster",
	"tooltip": "Kullanımdan kaldırılmış düğümler arayüzde varsayılan olarak gizlidir, ancak bunları kullanan mevcut iş akışlarında işlevsel kalır."
};
var Comfy_Node_ShowExperimental = {
	"name": "Aramada deneysel düğümleri göster",
	"tooltip": "Deneysel düğümler arayüzde bu şekilde işaretlenmiştir ve gelecekteki sürümlerde önemli değişikliklere veya kaldırılmaya tabi olabilir. Üretim iş akışlarında dikkatli kullanın"
};
var Comfy_Node_SnapHighlightsNode = {
	"name": "Yapıştırma düğümü vurgular",
	"tooltip": "Uygun giriş yuvasına sahip bir düğümün üzerine bir bağlantı sürüklerken, düğümü vurgulayın"
};
var Comfy_Notification_ShowVersionUpdates = {
	"name": "Sürüm güncellemelerini göster",
	"tooltip": "Yeni modeller ve önemli yeni özellikler için güncellemeleri göster."
};
var Comfy_Pointer_ClickDrift = {
	"name": "İşaretçi tıklama kayması (maksimum mesafe)",
	"tooltip": "İşaretçi bir düğmeyi basılı tutarken bu mesafeden daha fazla hareket ederse, bu sürükleme olarak kabul edilir (tıklama yerine).\n\nTıklarken işaretçi hareket ettirilirse nesnelerin istemeden dürtülmesini önlemeye yardımcı olur."
};
var Comfy_Pointer_DoubleClickTime = {
	"name": "Çift tıklama aralığı (maksimum)",
	"tooltip": "Çift tıklamanın iki tıklaması arasındaki milisaniye cinsinden maksimum süre. Bu değeri artırmak, çift tıklamaların bazen kaydedilmemesi durumunda yardımcı olabilir."
};
var Comfy_PreviewFormat = {
	"name": "Önizleme görüntü formatı",
	"tooltip": "Görüntü widget'ında bir önizleme görüntülerken, onu hafif bir görüntüye dönüştürün, örn. webp, jpeg, webp;50, vb."
};
var Comfy_PromptFilename = { "name": "İş akışını kaydederken dosya adı iste" };
var Comfy_QueueButton_BatchCountLimit = {
	"name": "Toplu iş sayısı sınırı",
	"tooltip": "Tek bir düğme tıklamasıyla kuyruğa eklenen maksimum görev sayısı"
};
var Comfy_Queue_MaxHistoryItems = {
	"name": "Kuyruk geçmişi boyutu",
	"tooltip": "Kuyruk geçmişinde gösterilen maksimum görev sayısı."
};
var Comfy_Queue_QPOV2 = {
	"name": "Varlıklar yan panelinde birleşik iş kuyruğunu kullan",
	"tooltip": "Kayan iş kuyruğu panelini, Varlıklar yan paneline gömülü eşdeğer bir iş kuyruğu ile değiştirir. Kayan panel düzenine dönmek için bunu devre dışı bırakabilirsiniz."
};
var Comfy_RightSidePanel_ShowErrorsTab = {
	"name": "Yan panelde sorunlar sekmesini göster",
	"tooltip": "Etkinleştirildiğinde, ayarlanması gereken engelleyici hataları ve eksik kaynakları göstermek için Sorunlar sekmesi sağ yan panelde görüntülenir."
};
var Comfy_Sidebar_Location = {
	"name": "Kenar çubuğu konumu",
	"options": {
		"left": "sol",
		"right": "sağ"
	}
};
var Comfy_Sidebar_Size = {
	"name": "Kenar çubuğu boyutu",
	"options": {
		"normal": "normal",
		"small": "küçük"
	}
};
var Comfy_Sidebar_Style = {
	"name": "Kenar Çubuğu Stili",
	"options": {
		"connected": "Bağlı",
		"floating": "Yüzer"
	}
};
var Comfy_Sidebar_UnifiedWidth = { "name": "Birleşik kenar çubuğu genişliği" };
var Comfy_SnapToGrid_GridSize = {
	"name": "Izgaraya yapıştırma boyutu",
	"tooltip": "Shift tuşunu basılı tutarken düğümleri sürükleyip yeniden boyutlandırırken ızgaraya hizalanacaklar, bu o ızgaranın boyutunu kontrol eder."
};
var Comfy_TextareaWidget_FontSize = { "name": "Metin alanı widget yazı tipi boyutu" };
var Comfy_TextareaWidget_Spellcheck = { "name": "Metin alanı widget yazım denetimi" };
var Comfy_TreeExplorer_ItemPadding = { "name": "Ağaç gezgini öğe dolgusu" };
var Comfy_UI_TabBarLayout = {
	"name": "Sekme Çubuğu Düzeni",
	"options": {
		"Default": "Varsayılan",
		"Legacy": "Klasik"
	},
	"tooltip": "Sekme çubuğu düzenini kontrol eder. \"Entegre\" seçeneği, Yardım ve Kullanıcı kontrollerini sekme çubuğu alanına taşır."
};
var Comfy_UseNewMenu = {
	"name": "Yeni menüyü kullan",
	"options": {
		"Disabled": "Devre dışı",
		"Top": "Üst"
	},
	"tooltip": "Menü çubuğu konumu. Mobil cihazlarda menü her zaman üstte gösterilir."
};
var Comfy_Validation_Workflows = { "name": "İş akışlarını doğrula" };
var Comfy_VueNodes_Enabled = {
	"name": "Modern Düğüm Tasarımı (Vue Düğümleri)",
	"tooltip": "Modern: Gelişmiş etkileşim, yerel tarayıcı özellikleri ve güncellenmiş görsel tasarıma sahip DOM tabanlı işleme. Klasik: Geleneksel tuval işleme."
};
var Comfy_WidgetControlMode = {
	"name": "Widget kontrol modu",
	"options": {
		"after": "sonra",
		"before": "önce"
	},
	"tooltip": "Widget değerlerinin ne zaman güncelleneceğini (rastgele/artırma/azaltma), istem kuyruğa alınmadan önce veya sonra kontrol eder."
};
var Comfy_Window_UnloadConfirmation = { "name": "Pencereyi kapatırken onay göster" };
var Comfy_Workflow_AutoSave = {
	"name": "Otomatik Kaydet",
	"options": {
		"after delay": "gecikmeden sonra",
		"off": "kapalı"
	}
};
var Comfy_Workflow_AutoSaveDelay = {
	"name": "Otomatik Kaydetme Gecikmesi (ms)",
	"tooltip": "Yalnızca Otomatik Kaydetme \"gecikmeden sonra\" olarak ayarlandığında geçerlidir."
};
var Comfy_Workflow_ConfirmDelete = { "name": "İş akışlarını silerken onay göster" };
var Comfy_Workflow_NamedValuesRestore = { "name": "Widget değerlerini ada göre geri yükle" };
var Comfy_Workflow_Persist = { "name": "İş akışı durumunu koru ve sayfayı (yeniden) yüklediğinde geri yükle" };
var Comfy_Workflow_ShowMissingMediaWarning = {
	"name": "Sorunlar sekmesinde eksik medyayı göster",
	"tooltip": "Devre dışı bırakıldığında, bulunamayan giriş görüntüleri, videoları ve ses dosyaları sorunlar sekmesinde listelenmez ve düğümleri vurgulanmaz."
};
var Comfy_Workflow_ShowMissingNodesWarning = {
	"name": "Sorunlar sekmesinde eksik düğümleri göster",
	"tooltip": "Devre dışı bırakıldığında, eksik düğüm paketleri sorunlar sekmesinde listelenmez ve düğümleri vurgulanmaz. İş akışı, yüklenene kadar yine de çalıştırılamaz."
};
var Comfy_Workflow_SortNodeIdOnSave = { "name": "İş akışını kaydederken düğüm kimliklerini sırala" };
var Comfy_Workflow_WarnBlueprintOverwrite = { "name": "Mevcut bir alt grafik şablonunun üzerine yazmak için onay iste" };
var Comfy_Workflow_WorkflowTabsPosition = {
	"name": "Açılan iş akışları konumu",
	"options": {
		"Sidebar": "Kenar Çubuğu",
		"Topbar": "Üst Çubuk"
	}
};
var LiteGraph_Canvas_MaximumFps = {
	"name": "Maksimum FPS",
	"tooltip": "Tuvalin saniyede oluşturmasına izin verilen maksimum kare sayısı. Akıcılık pahasına GPU kullanımını sınırlar. 0 ise, ekran yenileme hızı kullanılır. Varsayılan: 0"
};
var LiteGraph_Canvas_MinFontSizeForLOD = {
	"name": "Yakınlaştırma Düğümü Ayrıntı Seviyesi - yazı tipi boyutu eşiği",
	"tooltip": "Düğümlerin ne zaman düşük kaliteli LOD oluşturmaya geçeceğini kontrol eder. Ne zaman geçiş yapılacağını belirlemek için piksel cinsinden yazı tipi boyutunu kullanır. Devre dışı bırakmak için 0'a ayarlayın. 1-24 arasındaki değerler LOD için minimum yazı tipi boyutu eşiğini ayarlar - daha yüksek değerler (24 piksel) = uzaklaştırırken düğümleri daha erken basitleştirilmiş oluşturmaya geçirin, daha düşük değerler (1 piksel) = tam düğüm kalitesini daha uzun süre koruyun."
};
var LiteGraph_ContextMenu_Scaling = { "name": "Yakınlaştırıldığında düğüm birleşik widget menülerini (listeleri) ölçeklendir" };
var LiteGraph_Group_SelectChildrenOnClick = {
	"name": "Grup çocuklarını tıklayınca seç",
	"tooltip": "Etkinleştirildiğinde, bir gruba tıklamak içindeki tüm düğüm ve öğeleri seçer"
};
var LiteGraph_Node_DefaultPadding = {
	"name": "Yeni düğümleri her zaman küçült",
	"tooltip": "Oluşturulduğunda düğümleri mümkün olan en küçük boyuta yeniden boyutlandırın. Devre dışı bırakıldığında, yeni eklenen bir düğüm widget değerlerini göstermek için biraz genişletilecektir."
};
var LiteGraph_Node_TooltipDelay = { "name": "Araç İpucu Gecikmesi" };
var LiteGraph_Reroute_SplineOffset = {
	"name": "Yeniden yönlendirme eğri ofseti",
	"tooltip": "Yeniden yönlendirme merkez noktasından bezier kontrol noktası ofseti"
};
var pysssss_SnapToGrid = {
	"name": "Her zaman ızgaraya yapıştır",
	"tooltip": "Etkinleştirildiğinde, düğümler taşındığında veya yeniden boyutlandırıldığında otomatik olarak ızgaraya hizalanır."
};
var settings_default = {
	"Comfy-Desktop_AutoUpdate": { "name": "Güncellemeleri otomatik olarak kontrol et" },
	"Comfy-Desktop_SendStatistics": { "name": "Anonim kullanım metrikleri gönder" },
	"Comfy-Desktop_UV_PypiInstallMirror": {
		"name": "Pypi Yükleme Yansısı",
		"tooltip": "Varsayılan pip yükleme yansısı"
	},
	"Comfy-Desktop_UV_PythonInstallMirror": {
		"name": "Python Yükleme Yansısı",
		"tooltip": "Yönetilen Python kurulumları Astral python-build-standalone projesinden indirilir. Bu değişken, Python kurulumları için farklı bir kaynak kullanmak üzere bir yansıma URL'sine ayarlanabilir. Sağlanan URL, örneğin https://github.com/astral-sh/python-build-standalone/releases/download/20240713/cpython-3.12.4%2B20240713-aarch64-apple-darwin-install_only.tar.gz'deki https://github.com/astral-sh/python-build-standalone/releases/download'ın yerini alacaktır. Dağıtımlar, file:// URL şeması kullanılarak yerel bir dizinden okunabilir."
	},
	"Comfy-Desktop_UV_TorchInstallMirror": {
		"name": "Torch Yükleme Yansısı",
		"tooltip": "Pytorch için Pip yükleme yansısı"
	},
	"Comfy-Desktop_WindowStyle": {
		"name": "Pencere Stili",
		"options": {
			"custom": "özel",
			"default": "varsayılan"
		},
		"tooltip": "Özel: Sistem başlık çubuğunu ComfyUI'nin Üst menüsüyle değiştirin"
	},
	Comfy_Appearance_DisableAnimations,
	Comfy_Canvas_BackgroundImage,
	Comfy_Canvas_LeftMouseClickBehavior,
	Comfy_Canvas_MouseWheelScroll,
	Comfy_Canvas_NavigationMode,
	Comfy_Canvas_SelectionToolbox,
	Comfy_ConfirmClear,
	Comfy_DOMClippingEnabled,
	Comfy_DevMode,
	Comfy_DisableFloatRounding,
	Comfy_DisableSliders,
	Comfy_EditAttention_Delta,
	Comfy_EnableTooltips,
	Comfy_EnableWorkflowViewRestore,
	Comfy_ErrorSystem_ShowMissingModels,
	Comfy_Execution_PreviewMethod,
	Comfy_FloatRoundingPrecision,
	Comfy_Graph_AutoPanSpeed,
	Comfy_Graph_CanvasInfo,
	Comfy_Graph_CanvasMenu,
	Comfy_Graph_CtrlShiftZoom,
	Comfy_Graph_DeduplicateSubgraphNodeIds,
	Comfy_Graph_LinkMarkers,
	Comfy_Graph_LiveSelection,
	Comfy_Graph_ZoomSpeed,
	Comfy_GroupSelectedNodes_Padding,
	Comfy_Group_DoubleClickTitleToEdit,
	Comfy_LinkRelease_Action,
	Comfy_LinkRelease_ActionShift,
	Comfy_LinkRenderMode,
	Comfy_Load3D_3DViewerEnable,
	Comfy_Load3D_BackgroundColor,
	Comfy_Load3D_CameraType,
	Comfy_Load3D_LightAdjustmentIncrement,
	Comfy_Load3D_LightIntensity,
	Comfy_Load3D_LightIntensityMaximum,
	Comfy_Load3D_LightIntensityMinimum,
	Comfy_Load3D_PLYEngine,
	Comfy_Load3D_ShowGrid,
	Comfy_Locale,
	Comfy_MaskEditor_BrushAdjustmentSpeed,
	Comfy_MaskEditor_UseDominantAxis,
	Comfy_ModelLibrary_AutoLoadAll,
	Comfy_ModelLibrary_NameFormat,
	Comfy_NodeBadge_NodeIdBadgeMode,
	Comfy_NodeBadge_NodeLifeCycleBadgeMode,
	Comfy_NodeBadge_NodeSourceBadgeMode,
	Comfy_NodeBadge_ShowApiPricing,
	Comfy_NodeLibrary_NewDesign,
	Comfy_NodeReplacement_Enabled,
	Comfy_NodeSearchBoxImpl,
	Comfy_NodeSearchBoxImpl_FollowCursor,
	Comfy_NodeSearchBoxImpl_NodePreview,
	Comfy_NodeSearchBoxImpl_ShowCategory,
	Comfy_NodeSearchBoxImpl_ShowIdName,
	Comfy_NodeSearchBoxImpl_ShowNodeFrequency,
	Comfy_NodeSuggestions_number,
	Comfy_Node_AllowImageSizeDraw,
	Comfy_Node_AlwaysShowAdvancedWidgets,
	Comfy_Node_AutoSnapLinkToSlot,
	Comfy_Node_BypassAllLinksOnDelete,
	Comfy_Node_DoubleClickTitleToEdit,
	Comfy_Node_MiddleClickRerouteNode,
	Comfy_Node_Opacity,
	Comfy_Node_ShowDeprecated,
	Comfy_Node_ShowExperimental,
	Comfy_Node_SnapHighlightsNode,
	Comfy_Notification_ShowVersionUpdates,
	Comfy_Pointer_ClickDrift,
	Comfy_Pointer_DoubleClickTime,
	Comfy_PreviewFormat,
	Comfy_PromptFilename,
	Comfy_QueueButton_BatchCountLimit,
	Comfy_Queue_MaxHistoryItems,
	Comfy_Queue_QPOV2,
	Comfy_RightSidePanel_ShowErrorsTab,
	Comfy_Sidebar_Location,
	Comfy_Sidebar_Size,
	Comfy_Sidebar_Style,
	Comfy_Sidebar_UnifiedWidth,
	Comfy_SnapToGrid_GridSize,
	Comfy_TextareaWidget_FontSize,
	Comfy_TextareaWidget_Spellcheck,
	Comfy_TreeExplorer_ItemPadding,
	Comfy_UI_TabBarLayout,
	Comfy_UseNewMenu,
	Comfy_Validation_Workflows,
	Comfy_VueNodes_Enabled,
	Comfy_WidgetControlMode,
	Comfy_Window_UnloadConfirmation,
	Comfy_Workflow_AutoSave,
	Comfy_Workflow_AutoSaveDelay,
	Comfy_Workflow_ConfirmDelete,
	Comfy_Workflow_NamedValuesRestore,
	Comfy_Workflow_Persist,
	Comfy_Workflow_ShowMissingMediaWarning,
	Comfy_Workflow_ShowMissingNodesWarning,
	Comfy_Workflow_SortNodeIdOnSave,
	Comfy_Workflow_WarnBlueprintOverwrite,
	Comfy_Workflow_WorkflowTabsPosition,
	LiteGraph_Canvas_MaximumFps,
	LiteGraph_Canvas_MinFontSizeForLOD,
	LiteGraph_ContextMenu_Scaling,
	LiteGraph_Group_SelectChildrenOnClick,
	LiteGraph_Node_DefaultPadding,
	LiteGraph_Node_TooltipDelay,
	LiteGraph_Reroute_SplineOffset,
	pysssss_SnapToGrid
};
//#endregion
export { Comfy_Appearance_DisableAnimations, Comfy_Canvas_BackgroundImage, Comfy_Canvas_LeftMouseClickBehavior, Comfy_Canvas_MouseWheelScroll, Comfy_Canvas_NavigationMode, Comfy_Canvas_SelectionToolbox, Comfy_ConfirmClear, Comfy_DOMClippingEnabled, Comfy_DevMode, Comfy_DisableFloatRounding, Comfy_DisableSliders, Comfy_EditAttention_Delta, Comfy_EnableTooltips, Comfy_EnableWorkflowViewRestore, Comfy_ErrorSystem_ShowMissingModels, Comfy_Execution_PreviewMethod, Comfy_FloatRoundingPrecision, Comfy_Graph_AutoPanSpeed, Comfy_Graph_CanvasInfo, Comfy_Graph_CanvasMenu, Comfy_Graph_CtrlShiftZoom, Comfy_Graph_DeduplicateSubgraphNodeIds, Comfy_Graph_LinkMarkers, Comfy_Graph_LiveSelection, Comfy_Graph_ZoomSpeed, Comfy_GroupSelectedNodes_Padding, Comfy_Group_DoubleClickTitleToEdit, Comfy_LinkRelease_Action, Comfy_LinkRelease_ActionShift, Comfy_LinkRenderMode, Comfy_Load3D_3DViewerEnable, Comfy_Load3D_BackgroundColor, Comfy_Load3D_CameraType, Comfy_Load3D_LightAdjustmentIncrement, Comfy_Load3D_LightIntensity, Comfy_Load3D_LightIntensityMaximum, Comfy_Load3D_LightIntensityMinimum, Comfy_Load3D_PLYEngine, Comfy_Load3D_ShowGrid, Comfy_Locale, Comfy_MaskEditor_BrushAdjustmentSpeed, Comfy_MaskEditor_UseDominantAxis, Comfy_ModelLibrary_AutoLoadAll, Comfy_ModelLibrary_NameFormat, Comfy_NodeBadge_NodeIdBadgeMode, Comfy_NodeBadge_NodeLifeCycleBadgeMode, Comfy_NodeBadge_NodeSourceBadgeMode, Comfy_NodeBadge_ShowApiPricing, Comfy_NodeLibrary_NewDesign, Comfy_NodeReplacement_Enabled, Comfy_NodeSearchBoxImpl, Comfy_NodeSearchBoxImpl_FollowCursor, Comfy_NodeSearchBoxImpl_NodePreview, Comfy_NodeSearchBoxImpl_ShowCategory, Comfy_NodeSearchBoxImpl_ShowIdName, Comfy_NodeSearchBoxImpl_ShowNodeFrequency, Comfy_NodeSuggestions_number, Comfy_Node_AllowImageSizeDraw, Comfy_Node_AlwaysShowAdvancedWidgets, Comfy_Node_AutoSnapLinkToSlot, Comfy_Node_BypassAllLinksOnDelete, Comfy_Node_DoubleClickTitleToEdit, Comfy_Node_MiddleClickRerouteNode, Comfy_Node_Opacity, Comfy_Node_ShowDeprecated, Comfy_Node_ShowExperimental, Comfy_Node_SnapHighlightsNode, Comfy_Notification_ShowVersionUpdates, Comfy_Pointer_ClickDrift, Comfy_Pointer_DoubleClickTime, Comfy_PreviewFormat, Comfy_PromptFilename, Comfy_QueueButton_BatchCountLimit, Comfy_Queue_MaxHistoryItems, Comfy_Queue_QPOV2, Comfy_RightSidePanel_ShowErrorsTab, Comfy_Sidebar_Location, Comfy_Sidebar_Size, Comfy_Sidebar_Style, Comfy_Sidebar_UnifiedWidth, Comfy_SnapToGrid_GridSize, Comfy_TextareaWidget_FontSize, Comfy_TextareaWidget_Spellcheck, Comfy_TreeExplorer_ItemPadding, Comfy_UI_TabBarLayout, Comfy_UseNewMenu, Comfy_Validation_Workflows, Comfy_VueNodes_Enabled, Comfy_WidgetControlMode, Comfy_Window_UnloadConfirmation, Comfy_Workflow_AutoSave, Comfy_Workflow_AutoSaveDelay, Comfy_Workflow_ConfirmDelete, Comfy_Workflow_NamedValuesRestore, Comfy_Workflow_Persist, Comfy_Workflow_ShowMissingMediaWarning, Comfy_Workflow_ShowMissingNodesWarning, Comfy_Workflow_SortNodeIdOnSave, Comfy_Workflow_WarnBlueprintOverwrite, Comfy_Workflow_WorkflowTabsPosition, LiteGraph_Canvas_MaximumFps, LiteGraph_Canvas_MinFontSizeForLOD, LiteGraph_ContextMenu_Scaling, LiteGraph_Group_SelectChildrenOnClick, LiteGraph_Node_DefaultPadding, LiteGraph_Node_TooltipDelay, LiteGraph_Reroute_SplineOffset, settings_default as default, pysssss_SnapToGrid };
