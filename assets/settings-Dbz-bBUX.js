//#region src/locales/ar/settings.json
var Comfy_Appearance_DisableAnimations = {
	"name": "تعطيل الرسوم المتحركة",
	"tooltip": "يقوم بإيقاف معظم الرسوم المتحركة والانتقالات في CSS. يسرّع الاستدلال عندما يتم استخدام وحدة معالجة الرسوميات للعرض أيضًا في التوليد."
};
var Comfy_Canvas_BackgroundImage = {
	"name": "صورة خلفية اللوحة",
	"tooltip": "رابط صورة لخلفية اللوحة. يمكنك النقر بزر الفأرة الأيمن على صورة في لوحة النتائج واختيار \"تعيين كخلفية\" لاستخدامها، أو رفع صورتك الخاصة باستخدام زر الرفع."
};
var Comfy_Canvas_LeftMouseClickBehavior = {
	"name": "سلوك النقر بزر الفأرة الأيسر",
	"options": {
		"Panning": "التنقل",
		"Select": "تحديد"
	}
};
var Comfy_Canvas_MouseWheelScroll = {
	"name": "تمرير عجلة الفأرة",
	"options": {
		"Panning": "التنقل",
		"Zoom in/out": "تكبير/تصغير"
	}
};
var Comfy_Canvas_NavigationMode = {
	"name": "وضع تنقل اللوحة",
	"options": {
		"Custom": "مخصص",
		"Drag Navigation": "سحب للتنقل",
		"Standard (New)": "قياسي (جديد)"
	}
};
var Comfy_Canvas_SelectionToolbox = {
	"name": "عرض صندوق أدوات التحديد",
	"tooltip": "عرض شريط أدوات عائم عند تحديد العقد، لتوفير وصول سريع إلى الإجراءات الشائعة."
};
var Comfy_ConfirmClear = { "name": "طلب التأكيد عند مسح سير العمل" };
var Comfy_DOMClippingEnabled = { "name": "تمكين قص عناصر DOM (قد يقلل التمكين من الأداء)" };
var Comfy_DevMode = { "name": "تمكين خيارات وضع المطور (حفظ API، إلخ)" };
var Comfy_DisableFloatRounding = {
	"name": "تعطيل تقريب عناصر التحكم العائمة الافتراضية",
	"tooltip": "(يتطلب إعادة تحميل الصفحة) لا يمكن تعطيل التقريب عندما يتم تعيينه من العقدة في الخلفية."
};
var Comfy_DisableSliders = { "name": "تعطيل منزلقات أدوات العقد" };
var Comfy_EditAttention_Delta = { "name": "دقة تحكم +Ctrl فوق/تحت" };
var Comfy_EnableTooltips = { "name": "تمكين التلميحات" };
var Comfy_EnableWorkflowViewRestore = { "name": "حفظ واستعادة موقع اللوحة ومستوى التكبير في سير العمل" };
var Comfy_ErrorSystem_ShowMissingModels = {
	"name": "إظهار النماذج المفقودة في علامة تبويب المشكلات",
	"tooltip": "عند التعطيل، لا تُدرج ملفات النماذج غير الموجودة في علامة تبويب المشكلات ولا تُبرز عُقدها."
};
var Comfy_Execution_PreviewMethod = {
	"name": "طريقة المعاينة الحية",
	"options": {
		"auto": "تلقائي",
		"default": "default",
		"latent2rgb": "latent2rgb",
		"none": "بدون",
		"taesd": "taesd"
	},
	"tooltip": "طريقة المعاينة الحية أثناء توليد الصورة. \"default\" تستخدم إعداد الخادم CLI."
};
var Comfy_FloatRoundingPrecision = {
	"name": "عدد أرقام التقريب العشرية لأدوات التحكم العائمة [0 = تلقائي]",
	"tooltip": "(يتطلب إعادة تحميل الصفحة)"
};
var Comfy_Graph_AutoPanSpeed = {
	"name": "سرعة التحريك التلقائي",
	"tooltip": "السرعة القصوى عند التحريك التلقائي بسحب المؤشر إلى حافة اللوحة. اضبطها على 0 لتعطيل التحريك التلقائي."
};
var Comfy_Graph_CanvasInfo = { "name": "عرض معلومات اللوحة في الزاوية السفلى اليسرى (الإطارات في الثانية، إلخ)" };
var Comfy_Graph_CanvasMenu = { "name": "عرض قائمة لوحة الرسم البياني" };
var Comfy_Graph_CtrlShiftZoom = { "name": "تمكين اختصار التكبير السريع (Ctrl + Shift + سحب)" };
var Comfy_Graph_DeduplicateSubgraphNodeIds = {
	"name": "إزالة التكرار من معرفات العقد الفرعية",
	"tooltip": "إعادة تعيين معرفات العقد المكررة تلقائيًا في العقد الفرعية عند تحميل سير العمل."
};
var Comfy_Graph_LinkMarkers = {
	"name": "علامات منتصف الروابط",
	"options": {
		"Arrow": "سهم",
		"Circle": "دائرة",
		"None": "لا شيء"
	}
};
var Comfy_Graph_LiveSelection = {
	"name": "تحديد مباشر",
	"tooltip": "عند التفعيل، يتم تحديد/إلغاء تحديد العقد في الوقت الفعلي أثناء سحب مستطيل التحديد، كما في أدوات التصميم الأخرى."
};
var Comfy_Graph_ZoomSpeed = { "name": "سرعة تكبير اللوحة" };
var Comfy_GroupSelectedNodes_Padding = { "name": "تباعد حول العقد المحددة في المجموعة" };
var Comfy_Group_DoubleClickTitleToEdit = { "name": "انقر مزدوج على عنوان المجموعة للتحرير" };
var Comfy_LinkRelease_Action = {
	"name": "الإجراء عند تحرير الرابط (بدون مفتاح تعديل)",
	"options": {
		"context menu": "قائمة السياق",
		"no action": "لا إجراء",
		"search box": "صندوق البحث"
	}
};
var Comfy_LinkRelease_ActionShift = {
	"name": "الإجراء عند تحرير الرابط (Shift)",
	"options": {
		"context menu": "قائمة السياق",
		"no action": "لا إجراء",
		"search box": "صندوق البحث"
	}
};
var Comfy_LinkRenderMode = {
	"name": "وضع عرض الروابط",
	"options": {
		"Hidden": "مخفي",
		"Linear": "خطي",
		"Spline": "منحنى",
		"Straight": "مستقيم"
	},
	"tooltip": "يتحكم في مظهر ووضوح الروابط بين العقد على اللوحة."
};
var Comfy_Load3D_3DViewerEnable = {
	"name": "تفعيل عارض ثلاثي الأبعاد (تجريبي)",
	"tooltip": "يُمكّن عارض ثلاثي الأبعاد (تجريبي) للعُقد المحددة. تتيح لك هذه الميزة عرض النماذج ثلاثية الأبعاد والتفاعل معها مباشرةً ضمن العارض ثلاثي الأبعاد بالحجم الكامل."
};
var Comfy_Load3D_BackgroundColor = {
	"name": "لون الخلفية الابتدائي",
	"tooltip": "يتحكم في لون الخلفية الافتراضي لمشهد ثلاثي الأبعاد. يحدد هذا الإعداد مظهر الخلفية عند إنشاء عنصر واجهة ثلاثي الأبعاد جديد، ويمكن تعديله لكل عنصر بعد الإنشاء."
};
var Comfy_Load3D_CameraType = {
	"name": "نوع الكاميرا الابتدائي",
	"options": {
		"orthographic": "متعامدة",
		"perspective": "منظور"
	},
	"tooltip": "يتحكم في ما إذا كانت الكاميرا افتراضيًا منظورًا أو متعامدة عند إنشاء عنصر واجهة ثلاثي الأبعاد جديد. يمكن تغيير هذا الإعداد لكل عنصر بعد الإنشاء."
};
var Comfy_Load3D_LightAdjustmentIncrement = {
	"name": "مقدار تعديل الإضاءة",
	"tooltip": "يتحكم في مقدار التغيير عند ضبط شدة الإضاءة في المشاهد ثلاثية الأبعاد. قيمة أصغر تتيح تحكمًا أدق في الإضاءة، بينما قيمة أكبر تؤدي إلى تغييرات أكثر وضوحًا في كل تعديل."
};
var Comfy_Load3D_LightIntensity = {
	"name": "شدة الإضاءة الابتدائية",
	"tooltip": "يحدد مستوى سطوع الإضاءة الافتراضي في المشهد ثلاثي الأبعاد. تحدد هذه القيمة مدى قوة إضاءة الأجسام عند إنشاء عنصر واجهة ثلاثي الأبعاد جديد، ويمكن تعديلها لكل عنصر بعد الإنشاء."
};
var Comfy_Load3D_LightIntensityMaximum = {
	"name": "الحد الأقصى لشدة الإضاءة",
	"tooltip": "يحدد الحد الأقصى المسموح به لقيمة شدة الإضاءة في المشاهد ثلاثية الأبعاد. يحدد هذا الحد الأعلى للسطوع الذي يمكن ضبطه عند تعديل الإضاءة في أي عنصر واجهة ثلاثي الأبعاد."
};
var Comfy_Load3D_LightIntensityMinimum = {
	"name": "الحد الأدنى لشدة الإضاءة",
	"tooltip": "يحدد الحد الأدنى المسموح به لقيمة شدة الإضاءة في المشاهد ثلاثية الأبعاد. يحدد هذا الحد الأدنى للسطوع الذي يمكن ضبطه عند تعديل الإضاءة في أي عنصر واجهة ثلاثي الأبعاد."
};
var Comfy_Load3D_PLYEngine = {
	"name": "محرك PLY",
	"options": {
		"fastply": "fastply",
		"threejs": "threejs"
	},
	"tooltip": "اختر المحرك لتحميل ملفات PLY. \"threejs\" يستخدم محمل Three.js PLY الأصلي (الأفضل لملفات الشبكة). \"fastply\" يستخدم محملًا محسنًا لملفات PLY السحابية النقطية بنسق ASCII. \"sparkjs\" يستخدم Spark.js لملفات PLY الخاصة بتقنية Gaussian Splatting ثلاثية الأبعاد."
};
var Comfy_Load3D_ShowGrid = {
	"name": "إظهار الشبكة افتراضيًا",
	"tooltip": "يتحكم في ما إذا كانت الشبكة مرئية افتراضيًا عند إنشاء عنصر واجهة ثلاثي الأبعاد جديد. يمكن تغيير هذا الإعداد لكل عنصر بعد الإنشاء."
};
var Comfy_Locale = { "name": "اللغة" };
var Comfy_MaskEditor_BrushAdjustmentSpeed = {
	"name": "مضاعف سرعة تعديل الفرشاة",
	"tooltip": "يتحكم في سرعة تغير حجم الفرشاة وصلابتها أثناء التعديل. القيم الأعلى تعني تغييرات أسرع."
};
var Comfy_MaskEditor_UseDominantAxis = {
	"name": "تقييد تعديل الفرشاة إلى المحور السائد",
	"tooltip": "عند التمكين، تؤثر التعديلات على الحجم أو الصلابة فقط بناءً على الاتجاه الذي تتحرك فيه أكثر."
};
var Comfy_ModelLibrary_AutoLoadAll = {
	"name": "تحميل جميع مجلدات النماذج تلقائيًا",
	"tooltip": "إذا كانت صحيحة، سيتم تحميل جميع المجلدات عند فتح مكتبة النماذج (قد يسبب تأخيرًا أثناء التحميل). إذا كانت خاطئة، يتم تحميل مجلدات النماذج على مستوى الجذر فقط عند النقر عليها."
};
var Comfy_ModelLibrary_NameFormat = {
	"name": "اسم العرض في شجرة مكتبة النماذج",
	"options": {
		"filename": "اسم الملف",
		"title": "العنوان"
	},
	"tooltip": "اختر \"اسم الملف\" لعرض اسم الملف المبسط بدون المجلد أو الامتداد \".safetensors\" في قائمة النماذج. اختر \"العنوان\" لعرض عنوان بيانات النموذج القابل للتكوين."
};
var Comfy_NodeBadge_NodeIdBadgeMode = {
	"name": "وضع شارة معرف العقدة",
	"options": {
		"None": "لا شيء",
		"Show all": "عرض الكل"
	}
};
var Comfy_NodeBadge_NodeLifeCycleBadgeMode = {
	"name": "وضع شارة دورة حياة العقدة",
	"options": {
		"None": "لا شيء",
		"Show all": "عرض الكل"
	}
};
var Comfy_NodeBadge_NodeSourceBadgeMode = {
	"name": "وضع شارة مصدر العقدة",
	"options": {
		"Hide built-in": "إخفاء المدمج",
		"None": "لا شيء",
		"Show all": "عرض الكل"
	}
};
var Comfy_NodeBadge_ShowApiPricing = { "name": "عرض شارة تسعير عقدة API" };
var Comfy_NodeLibrary_NewDesign = {
	"name": "تصميم مكتبة العقد الجديد",
	"tooltip": "تفعيل الشريط الجانبي المعاد تصميمه لمكتبة العقد مع علامات تبويب (الأساسية، الكل، المخصصة)، بحث محسّن، ومعاينات عند التمرير."
};
var Comfy_NodeReplacement_Enabled = {
	"name": "تفعيل الاستبدال التلقائي للعقد",
	"tooltip": "عند التفعيل، يمكن استبدال العقد المفقودة تلقائيًا بنظيراتها الأحدث إذا كان هناك مخطط استبدال متوفر."
};
var Comfy_NodeSearchBoxImpl = {
	"name": "تنفيذ مربع بحث العقدة",
	"options": {
		"default": "افتراضي",
		"litegraph (legacy)": "لايت جراف (قديم)",
		"v1 (legacy)": "الإصدار 1 (قديم)"
	}
};
var Comfy_NodeSearchBoxImpl_FollowCursor = {
	"name": "العُقَد المضافة تتبع المؤشر",
	"tooltip": "عند التفعيل، تتبع العُقَد المضافة من مربع البحث المؤشر حتى يتم النقر لوضعها. ينطبق فقط على التنفيذ الافتراضي."
};
var Comfy_NodeSearchBoxImpl_NodePreview = {
	"name": "معاينة العقدة",
	"tooltip": "ينطبق فقط على التنفيذ الافتراضي"
};
var Comfy_NodeSearchBoxImpl_ShowCategory = {
	"name": "عرض فئة العقدة في نتائج البحث",
	"tooltip": "ينطبق فقط على التنفيذ الافتراضي"
};
var Comfy_NodeSearchBoxImpl_ShowIdName = {
	"name": "عرض اسم معرف العقدة في نتائج البحث",
	"tooltip": "ينطبق فقط على التنفيذ الافتراضي"
};
var Comfy_NodeSearchBoxImpl_ShowNodeFrequency = {
	"name": "عرض تكرار العقدة في نتائج البحث",
	"tooltip": "ينطبق فقط على التنفيذ الافتراضي"
};
var Comfy_NodeSuggestions_number = {
	"name": "عدد اقتراحات العقد",
	"tooltip": "خاص بمربع بحث / قائمة السياق في لايت جراف فقط"
};
var Comfy_Node_AllowImageSizeDraw = { "name": "عرض العرض × الارتفاع تحت معاينة الصورة" };
var Comfy_Node_AlwaysShowAdvancedWidgets = {
	"name": "عرض الأدوات المتقدمة دائمًا في جميع العقد",
	"tooltip": "عند التفعيل، ستظهر الأدوات المتقدمة دائمًا في جميع العقد دون الحاجة لتوسيعها بشكل فردي."
};
var Comfy_Node_AutoSnapLinkToSlot = {
	"name": "التثبيت التلقائي للرابط إلى فتحة العقدة",
	"tooltip": "عند سحب رابط فوق عقدة، يتم تثبيت الرابط تلقائيًا على فتحة إدخال صالحة في العقدة"
};
var Comfy_Node_BypassAllLinksOnDelete = {
	"name": "الحفاظ على جميع الروابط عند حذف العقد",
	"tooltip": "عند حذف عقدة، حاول إعادة توصيل جميع روابط الإدخال والإخراج (تجاوز العقدة المحذوفة)"
};
var Comfy_Node_DoubleClickTitleToEdit = { "name": "النقر المزدوج على عنوان العقدة للتحرير" };
var Comfy_Node_MiddleClickRerouteNode = { "name": "النقر الأوسط ينشئ عقدة إعادة توجيه جديدة" };
var Comfy_Node_Opacity = { "name": "شفافية العقدة" };
var Comfy_Node_ShowDeprecated = {
	"name": "عرض العقدة المهجورة في البحث",
	"tooltip": "العقد المهجورة مخفية افتراضيًا في واجهة المستخدم، لكنها تظل فعالة في سير العمل الحالي الذي يستخدمها."
};
var Comfy_Node_ShowExperimental = {
	"name": "عرض العقدة التجريبية في البحث",
	"tooltip": "يتم تمييز العقد التجريبية في واجهة المستخدم وقد تخضع لتغييرات كبيرة أو إزالتها في الإصدارات المستقبلية. استخدمها بحذر في سير العمل الإنتاجي."
};
var Comfy_Node_SnapHighlightsNode = {
	"name": "تثبيت يبرز العقدة",
	"tooltip": "عند سحب رابط فوق عقدة تحتوي على فتحة إدخال صالحة، يتم تمييز العقدة"
};
var Comfy_Notification_ShowVersionUpdates = {
	"name": "عرض تحديثات الإصدار",
	"tooltip": "عرض التحديثات للنماذج الجديدة والميزات الرئيسية."
};
var Comfy_Pointer_ClickDrift = {
	"name": "انحراف نقرة المؤشر (أقصى مسافة)",
	"tooltip": "إذا تحرك المؤشر أكثر من هذه المسافة أثناء الضغط على زر، يعتبر سحبًا بدلاً من نقرة.\n\nيساعد على منع دفع الكائنات عن طريق الخطأ إذا تم تحريك المؤشر أثناء النقر."
};
var Comfy_Pointer_DoubleClickTime = {
	"name": "فترة النقر المزدوج (قصوى)",
	"tooltip": "الوقت الأقصى بالملي ثانية بين النقرتين في النقر المزدوج. زيادة هذه القيمة قد تساعد إذا لم يتم تسجيل النقرات المزدوجة أحيانًا."
};
var Comfy_PreviewFormat = {
	"name": "تنسيق صورة المعاينة",
	"tooltip": "عند عرض معاينة في ويدجت الصورة، يتم تحويلها إلى صورة خفيفة الوزن، مثل webp، jpeg، webp;50، إلخ."
};
var Comfy_PromptFilename = { "name": "طلب اسم الملف عند حفظ سير العمل" };
var Comfy_QueueButton_BatchCountLimit = {
	"name": "حد عدد الدُفعات",
	"tooltip": "العدد الأقصى للمهام التي تضاف إلى القائمة بنقرة زر واحدة"
};
var Comfy_Queue_MaxHistoryItems = {
	"name": "حجم تاريخ قائمة الانتظار",
	"tooltip": "العدد الأقصى للمهام المعروضة في تاريخ قائمة الانتظار."
};
var Comfy_Queue_QPOV2 = {
	"name": "استخدم قائمة انتظار المهام الموحدة في لوحة الأصول الجانبية",
	"tooltip": "يستبدل لوحة قائمة انتظار المهام العائمة بقائمة انتظار مهام مكافئة مدمجة في لوحة الأصول الجانبية. يمكنك تعطيل هذا الخيار للعودة إلى تخطيط اللوحة العائمة."
};
var Comfy_RightSidePanel_ShowErrorsTab = {
	"name": "إظهار علامة تبويب المشكلات في اللوحة الجانبية",
	"tooltip": "عند التمكين، تُعرض علامة تبويب المشكلات في اللوحة الجانبية اليمنى لإظهار الأخطاء المانعة والموارد المفقودة التي تحتاج إلى إعداد."
};
var Comfy_Sidebar_Location = {
	"name": "موقع الشريط الجانبي",
	"options": {
		"left": "يسار",
		"right": "يمين"
	}
};
var Comfy_Sidebar_Size = {
	"name": "حجم الشريط الجانبي",
	"options": {
		"normal": "عادي",
		"small": "صغير"
	}
};
var Comfy_Sidebar_Style = {
	"name": "نمط الشريط الجانبي",
	"options": {
		"connected": "متصل",
		"floating": "عائم"
	}
};
var Comfy_Sidebar_UnifiedWidth = { "name": "عرض موحد للشريط الجانبي" };
var Comfy_SnapToGrid_GridSize = {
	"name": "حجم الالتصاق بالشبكة",
	"tooltip": "عند سحب وتغيير حجم العقد مع الضغط على shift، يتم محاذاتها إلى الشبكة، هذا يتحكم في حجم تلك الشبكة."
};
var Comfy_TextareaWidget_FontSize = { "name": "حجم خط ويدجت منطقة النص" };
var Comfy_TextareaWidget_Spellcheck = { "name": "التحقق من الإملاء في ويدجت منطقة النص" };
var Comfy_TreeExplorer_ItemPadding = { "name": "حشو عناصر مستعرض الشجرة" };
var Comfy_UI_TabBarLayout = {
	"name": "تخطيط شريط التبويبات",
	"options": {
		"Default": "افتراضي",
		"Legacy": "تقليدي"
	},
	"tooltip": "يتحكم في تخطيط شريط التبويبات. \"مُدمج\" ينقل عناصر المساعدة والتحكمات الخاصة بالمستخدم إلى منطقة شريط التبويبات."
};
var Comfy_UseNewMenu = {
	"name": "استخدام القائمة الجديدة",
	"options": {
		"Disabled": "معطل",
		"Top": "أعلى"
	},
	"tooltip": "موقع شريط القائمة. على الأجهزة المحمولة، تُعرض القائمة دائمًا في الأعلى."
};
var Comfy_Validation_Workflows = { "name": "التحقق من صحة سير العمل" };
var Comfy_VueNodes_Enabled = {
	"name": "تصميم العقد الحديث (عقد Vue)",
	"tooltip": "الحديث: عرض قائم على DOM مع تفاعلية محسّنة وميزات متصفح أصلية وتصميم مرئي محدث. الكلاسيكي: عرض لوحة تقليدي."
};
var Comfy_WidgetControlMode = {
	"name": "وضع التحكم في الودجت",
	"options": {
		"after": "بعد",
		"before": "قبل"
	},
	"tooltip": "يتحكم في متى يتم تحديث قيم الودجت (توليد عشوائي/زيادة/نقصان)، إما قبل إدراج الطلب في الطابور أو بعده."
};
var Comfy_Window_UnloadConfirmation = { "name": "عرض تأكيد عند إغلاق النافذة" };
var Comfy_Workflow_AutoSave = {
	"name": "الحفظ التلقائي",
	"options": {
		"after delay": "بعد تأخير",
		"off": "إيقاف"
	}
};
var Comfy_Workflow_AutoSaveDelay = {
	"name": "تأخير الحفظ التلقائي (بالملي ثانية)",
	"tooltip": "ينطبق فقط إذا تم تعيين الحفظ التلقائي إلى \"بعد تأخير\"."
};
var Comfy_Workflow_ConfirmDelete = { "name": "عرض تأكيد عند حذف سير العمل" };
var Comfy_Workflow_NamedValuesRestore = { "name": "استعادة قيم عناصر الواجهة حسب الاسم" };
var Comfy_Workflow_Persist = { "name": "الاحتفاظ بحالة سير العمل واستعادتها عند (إعادة) تحميل الصفحة" };
var Comfy_Workflow_ShowMissingMediaWarning = {
	"name": "إظهار الوسائط المفقودة في علامة تبويب المشكلات",
	"tooltip": "عند التعطيل، لا تُدرج صور وفيديوهات وملفات الصوت المدخلة غير الموجودة في علامة تبويب المشكلات ولا تُبرز عُقدها."
};
var Comfy_Workflow_ShowMissingNodesWarning = {
	"name": "إظهار العُقد المفقودة في علامة تبويب المشكلات",
	"tooltip": "عند التعطيل، لا تُدرج حزم العُقد المفقودة في علامة تبويب المشكلات ولا تُبرز عُقدها. ولا يزال يتعذر تشغيل سير العمل حتى تُثبَّت."
};
var Comfy_Workflow_SortNodeIdOnSave = { "name": "ترتيب معرفات العقد عند حفظ سير العمل" };
var Comfy_Workflow_WarnBlueprintOverwrite = { "name": "طلب تأكيد لاستبدال مخطط الرسم البياني الفرعي الموجود" };
var Comfy_Workflow_WorkflowTabsPosition = {
	"name": "موضع تبويبات سير العمل المفتوحة",
	"options": {
		"Sidebar": "الشريط الجانبي",
		"Topbar": "شريط الأعلى"
	}
};
var LiteGraph_Canvas_MaximumFps = {
	"name": "الحد الأقصى للإطارات في الثانية",
	"tooltip": "الحد الأقصى لعدد الإطارات في الثانية التي يسمح للرسم أن يعرضها. يحد من استخدام GPU على حساب السلاسة. إذا كانت 0، يتم استخدام معدل تحديث الشاشة. الافتراضي: 0"
};
var LiteGraph_Canvas_MinFontSizeForLOD = {
	"name": "مستوى تفاصيل عقدة التكبير - حد حجم الخط",
	"tooltip": "يتحكم في وقت تبديل العقد إلى عرض LOD منخفض الجودة. يستخدم حجم الخط بالبكسل لتحديد وقت التبديل. اضبط على 0 للتعطيل. القيم 1-24 تحدد الحد الأدنى لحجم الخط لـ LOD - القيم الأعلى (24 بكسل) = التبديل إلى عرض مبسط عند التصغير مبكراً، القيم الأقل (1 بكسل) = الحفاظ على جودة العقدة الكاملة لفترة أطول."
};
var LiteGraph_ContextMenu_Scaling = { "name": "تغيير مقياس قوائم ودجت كومبو العقدة عند التكبير" };
var LiteGraph_Group_SelectChildrenOnClick = {
	"name": "تحديد عناصر المجموعة عند النقر",
	"tooltip": "عند التفعيل، يؤدي النقر على مجموعة إلى تحديد جميع العقد والعناصر بداخلها"
};
var LiteGraph_Node_DefaultPadding = {
	"name": "تصغير العقد الجديدة دائمًا",
	"tooltip": "تغيير حجم العقد إلى أصغر حجم ممكن عند الإنشاء. عند التعطيل، يتم توسيع العقدة المضافة حديثًا قليلاً لإظهار قيم الودجت."
};
var LiteGraph_Node_TooltipDelay = { "name": "تأخير التلميح" };
var LiteGraph_Reroute_SplineOffset = {
	"name": "إزاحة منحنى إعادة التوجيه",
	"tooltip": "إزاحة نقطة تحكم بيزير من نقطة مركز إعادة التوجيه"
};
var pysssss_SnapToGrid = {
	"name": "الالتصاق بالشبكة دائمًا",
	"tooltip": "عند التفعيل، ستتم محاذاة العقد تلقائيًا إلى الشبكة عند تحريكها أو تغيير حجمها."
};
var settings_default = {
	"Comfy-Desktop_AutoUpdate": { "name": "التحقق تلقائيًا من التحديثات" },
	"Comfy-Desktop_SendStatistics": { "name": "إرسال إحصائيات الاستخدام المجهولة" },
	"Comfy-Desktop_UV_PypiInstallMirror": {
		"name": "مرآة تثبيت Pypi",
		"tooltip": "مرآة التثبيت الافتراضية لـ pip"
	},
	"Comfy-Desktop_UV_PythonInstallMirror": {
		"name": "مرآة تثبيت بايثون",
		"tooltip": "يتم تحميل تثبيتات بايثون المدارة من مشروع Astral python-build-standalone. يمكن تعيين هذا المتغير إلى عنوان مرآة لاستخدام مصدر مختلف لتثبيتات بايثون. سيحل العنوان المقدم محل https://github.com/astral-sh/python-build-standalone/releases/download في، مثلاً، https://github.com/astral-sh/python-build-standalone/releases/download/20240713/cpython-3.12.4%2B20240713-aarch64-apple-darwin-install_only.tar.gz. يمكن قراءة التوزيعات من دليل محلي باستخدام نظام ملفات file://."
	},
	"Comfy-Desktop_UV_TorchInstallMirror": {
		"name": "مرآة تثبيت Torch",
		"tooltip": "مرآة تثبيت pip لـ pytorch"
	},
	"Comfy-Desktop_WindowStyle": {
		"name": "نمط النافذة",
		"options": {
			"custom": "مخصص",
			"default": "افتراضي"
		},
		"tooltip": "مخصص: استبدال شريط عنوان النظام بالقائمة العلوية لـ ComfyUI"
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
