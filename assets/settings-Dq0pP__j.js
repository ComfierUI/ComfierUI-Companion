//#region src/locales/fa/settings.json
var Comfy_Appearance_DisableAnimations = {
	"name": "غیرفعال‌سازی انیمیشن‌ها",
	"tooltip": "بیشتر انیمیشن‌ها و انتقال‌های CSS را غیرفعال می‌کند. زمانی که GPU نمایش برای تولید نیز استفاده می‌شود، سرعت استنتاج را افزایش می‌دهد."
};
var Comfy_Canvas_BackgroundImage = {
	"name": "تصویر پس‌زمینه بوم",
	"tooltip": "آدرس تصویر برای پس‌زمینه بوم. می‌توانید روی یک تصویر در پانل خروجی راست‌کلیک کرده و «تنظیم به عنوان پس‌زمینه» را انتخاب کنید یا تصویر دلخواه خود را با دکمه بارگذاری، بارگذاری نمایید."
};
var Comfy_Canvas_LeftMouseClickBehavior = {
	"name": "رفتار کلیک چپ ماوس",
	"options": {
		"Panning": "جابجایی",
		"Select": "انتخاب"
	}
};
var Comfy_Canvas_MouseWheelScroll = {
	"name": "اسکرول چرخ ماوس",
	"options": {
		"Panning": "جابجایی",
		"Zoom in/out": "بزرگ‌نمایی/کوچک‌نمایی"
	}
};
var Comfy_Canvas_NavigationMode = {
	"name": "حالت ناوبری",
	"options": {
		"Custom": "سفارشی",
		"Drag Navigation": "ناوبری با کشیدن",
		"Standard (New)": "استاندارد (جدید)"
	}
};
var Comfy_Canvas_SelectionToolbox = {
	"name": "نمایش جعبه ابزار انتخاب",
	"tooltip": "نمایش یک نوار ابزار شناور هنگام انتخاب nodeها، برای دسترسی سریع به اقدامات متداول."
};
var Comfy_ConfirmClear = { "name": "نیاز به تأیید هنگام پاک‌سازی workflow" };
var Comfy_DOMClippingEnabled = { "name": "فعال‌سازی برش عناصر DOM (فعال‌سازی ممکن است عملکرد را کاهش دهد)" };
var Comfy_DevMode = { "name": "فعال‌سازی گزینه‌های حالت توسعه (ذخیره API و غیره)" };
var Comfy_DisableFloatRounding = {
	"name": "غیرفعال‌سازی گرد کردن پیش‌فرض اعداد اعشاری.",
	"tooltip": "(نیاز به بارگذاری مجدد صفحه) امکان غیرفعال‌سازی گرد کردن زمانی که توسط node در backend تنظیم شده باشد وجود ندارد."
};
var Comfy_DisableSliders = { "name": "غیرفعال‌سازی اسلایدرهای ابزارک node" };
var Comfy_EditAttention_Delta = { "name": "دقت Ctrl+بالا/پایین" };
var Comfy_EnableTooltips = { "name": "فعال‌سازی راهنماها" };
var Comfy_EnableWorkflowViewRestore = { "name": "ذخیره و بازیابی موقعیت و سطح بزرگ‌نمایی بوم در workflowها" };
var Comfy_ErrorSystem_ShowMissingModels = {
	"name": "نمایش مدل‌های مفقود در برگهٔ مشکلات",
	"tooltip": "وقتی غیرفعال باشد، فایل‌های مدل یافت‌نشده در برگهٔ مشکلات فهرست نمی‌شوند و nodeهای آن‌ها برجسته نمی‌شوند."
};
var Comfy_Execution_PreviewMethod = {
	"name": "روش پیش‌نمایش زنده",
	"options": {
		"auto": "خودکار",
		"default": "پیش‌فرض",
		"latent2rgb": "latent2rgb",
		"none": "هیچ‌کدام",
		"taesd": "taesd"
	},
	"tooltip": "روش پیش‌نمایش زنده هنگام تولید تصویر. «پیش‌فرض» از تنظیم CLI سرور استفاده می‌کند."
};
var Comfy_FloatRoundingPrecision = {
	"name": "تعداد ارقام اعشاری گرد کردن ابزارک اعشاری [۰ = خودکار].",
	"tooltip": "(نیاز به بارگذاری مجدد صفحه)"
};
var Comfy_Graph_AutoPanSpeed = {
	"name": "سرعت حرکت خودکار",
	"tooltip": "حداکثر سرعت هنگام حرکت خودکار با کشیدن به لبه بوم. برای غیرفعال‌سازی حرکت خودکار، مقدار را روی ۰ قرار دهید."
};
var Comfy_Graph_CanvasInfo = { "name": "نمایش اطلاعات بوم در گوشه پایین سمت چپ (fps و غیره)" };
var Comfy_Graph_CanvasMenu = { "name": "نمایش منوی بوم گراف" };
var Comfy_Graph_CtrlShiftZoom = { "name": "فعال‌سازی میانبر بزرگ‌نمایی سریع (Ctrl + Shift + کشیدن)" };
var Comfy_Graph_DeduplicateSubgraphNodeIds = {
	"name": "حذف شناسه‌های تکراری node در زیرگراف",
	"tooltip": "شناسه‌های تکراری node در زیرگراف‌ها هنگام بارگذاری workflow به‌صورت خودکار دوباره اختصاص داده می‌شوند."
};
var Comfy_Graph_LinkMarkers = {
	"name": "نشانگرهای میانه‌ی پیوند",
	"options": {
		"Arrow": "پیکان",
		"Circle": "دایره",
		"None": "هیچ‌کدام"
	}
};
var Comfy_Graph_LiveSelection = {
	"name": "انتخاب زنده",
	"tooltip": "در صورت فعال بودن، nodeها به صورت آنی هنگام کشیدن مستطیل انتخاب، انتخاب یا لغو انتخاب می‌شوند؛ مشابه سایر ابزارهای طراحی."
};
var Comfy_Graph_ZoomSpeed = { "name": "سرعت بزرگ‌نمایی بوم" };
var Comfy_GroupSelectedNodes_Padding = { "name": "فاصله داخلی nodeهای انتخاب‌شده در گروه" };
var Comfy_Group_DoubleClickTitleToEdit = { "name": "دوبار کلیک روی عنوان گروه برای ویرایش" };
var Comfy_LinkRelease_Action = {
	"name": "عملکرد هنگام رها کردن پیوند (بدون کلید ترکیبی)",
	"options": {
		"context menu": "منوی زمینه",
		"no action": "بدون عمل",
		"search box": "جعبه جستجو"
	}
};
var Comfy_LinkRelease_ActionShift = {
	"name": "عملکرد هنگام رها کردن پیوند (کلید Shift)",
	"options": {
		"context menu": "منوی زمینه",
		"no action": "بدون عمل",
		"search box": "جعبه جستجو"
	}
};
var Comfy_LinkRenderMode = {
	"name": "حالت نمایش پیوند",
	"options": {
		"Hidden": "مخفی",
		"Linear": "خطی",
		"Spline": "اسپلاین",
		"Straight": "مستقیم"
	},
	"tooltip": "ظاهر و نمایش پیوندهای ارتباطی بین nodeها روی canvas را کنترل می‌کند."
};
var Comfy_Load3D_3DViewerEnable = {
	"name": "فعال‌سازی نمایشگر سه‌بعدی (بتا)",
	"tooltip": "نمایشگر سه‌بعدی (بتا) را برای nodeهای انتخاب‌شده فعال می‌کند. این قابلیت به شما امکان می‌دهد مدل‌های سه‌بعدی را مستقیماً در نمایشگر سه‌بعدی با اندازه کامل مشاهده و با آن‌ها تعامل داشته باشید."
};
var Comfy_Load3D_BackgroundColor = {
	"name": "رنگ پس‌زمینه اولیه",
	"tooltip": "رنگ پیش‌فرض پس‌زمینه صحنه سه‌بعدی را کنترل می‌کند. این تنظیم ظاهر پس‌زمینه را هنگام ایجاد یک ابزارک سه‌بعدی جدید تعیین می‌کند، اما پس از ایجاد، می‌توان آن را برای هر ابزارک به صورت جداگانه تغییر داد."
};
var Comfy_Load3D_CameraType = {
	"name": "نوع دوربین اولیه",
	"options": {
		"orthographic": "orthographic",
		"perspective": "perspective"
	},
	"tooltip": "تعیین می‌کند که دوربین به صورت پیش‌فرض هنگام ایجاد یک ابزارک سه‌بعدی جدید، perspective یا orthographic باشد. این پیش‌فرض را می‌توان برای هر ابزارک به صورت جداگانه تغییر داد."
};
var Comfy_Load3D_LightAdjustmentIncrement = {
	"name": "گام تنظیم نور",
	"tooltip": "اندازه گام هنگام تنظیم شدت نور در صحنه‌های سه‌بعدی را کنترل می‌کند. مقدار گام کوچکتر امکان کنترل دقیق‌تر نور را فراهم می‌کند، در حالی که مقدار بزرگ‌تر باعث تغییرات محسوس‌تر در هر تنظیم می‌شود."
};
var Comfy_Load3D_LightIntensity = {
	"name": "شدت نور اولیه",
	"tooltip": "سطح روشنایی پیش‌فرض نور در صحنه سه‌بعدی را تعیین می‌کند. این مقدار مشخص می‌کند که نورها هنگام ایجاد یک ابزارک سه‌بعدی جدید با چه شدتی به اشیاء تابیده می‌شوند، اما می‌توان آن را برای هر ابزارک به صورت جداگانه تغییر داد."
};
var Comfy_Load3D_LightIntensityMaximum = {
	"name": "حداکثر شدت نور",
	"tooltip": "حداکثر مقدار مجاز شدت نور برای صحنه‌های سه‌بعدی را تعیین می‌کند. این مقدار، بالاترین حد روشنایی را هنگام تنظیم نور در هر ابزارک سه‌بعدی مشخص می‌کند."
};
var Comfy_Load3D_LightIntensityMinimum = {
	"name": "حداقل شدت نور",
	"tooltip": "حداقل مقدار مجاز شدت نور برای صحنه‌های سه‌بعدی را تعیین می‌کند. این مقدار، پایین‌ترین حد روشنایی را هنگام تنظیم نور در هر ابزارک سه‌بعدی مشخص می‌کند."
};
var Comfy_Load3D_PLYEngine = {
	"name": "موتور PLY",
	"options": {
		"fastply": "fastply",
		"threejs": "threejs"
	},
	"tooltip": "موتور بارگذاری فایل‌های PLY را انتخاب کنید. «threejs» از PLYLoader بومی Three.js استفاده می‌کند (مناسب برای فایل‌های مش PLY). «fastply» از یک بارگذار بهینه‌شده برای فایل‌های point cloud PLY به صورت ASCII استفاده می‌کند. «sparkjs» از Spark.js برای فایل‌های 3D Gaussian Splatting PLY استفاده می‌کند."
};
var Comfy_Load3D_ShowGrid = {
	"name": "نمایش اولیه شبکه",
	"tooltip": "تعیین می‌کند که شبکه (Grid) به صورت پیش‌فرض هنگام ایجاد یک ابزارک سه‌بعدی جدید قابل مشاهده باشد یا خیر. این پیش‌فرض را می‌توان برای هر ابزارک به صورت جداگانه تغییر داد."
};
var Comfy_Locale = { "name": "زبان" };
var Comfy_MaskEditor_BrushAdjustmentSpeed = {
	"name": "ضریب سرعت تنظیم قلم‌مو",
	"tooltip": "کنترل می‌کند که اندازه و سختی قلم‌مو هنگام تنظیم با چه سرعتی تغییر کند. مقادیر بالاتر به معنای تغییرات سریع‌تر است."
};
var Comfy_MaskEditor_UseDominantAxis = {
	"name": "قفل تنظیم قلم‌مو به محور غالب",
	"tooltip": "در صورت فعال بودن، تنظیمات قلم‌مو فقط اندازه یا سختی را بر اساس جهتی که بیشتر حرکت می‌کنید تغییر می‌دهد."
};
var Comfy_ModelLibrary_AutoLoadAll = {
	"name": "بارگذاری خودکار همه پوشه‌های مدل",
	"tooltip": "اگر فعال باشد، همه پوشه‌ها به محض باز کردن کتابخانه مدل بارگذاری می‌شوند (این کار ممکن است باعث تأخیر در بارگذاری شود). اگر غیرفعال باشد، پوشه‌های مدل در سطح ریشه فقط پس از کلیک شما بارگذاری می‌شوند."
};
var Comfy_ModelLibrary_NameFormat = {
	"name": "نمایش نام در نمای درختی کتابخانه مدل",
	"options": {
		"filename": "filename",
		"title": "title"
	},
	"tooltip": "گزینه «filename» را انتخاب کنید تا نمای ساده‌ای از نام فایل خام (بدون مسیر یا پسوند \".safetensors\") در لیست مدل نمایش داده شود. گزینه «title» عنوان متادیتای قابل تنظیم مدل را نمایش می‌دهد."
};
var Comfy_NodeBadge_NodeIdBadgeMode = {
	"name": "حالت نشان شناسه نود",
	"options": {
		"None": "هیچ‌کدام",
		"Show all": "نمایش همه"
	}
};
var Comfy_NodeBadge_NodeLifeCycleBadgeMode = {
	"name": "حالت نشان چرخه عمر نود",
	"options": {
		"None": "هیچ‌کدام",
		"Show all": "نمایش همه"
	}
};
var Comfy_NodeBadge_NodeSourceBadgeMode = {
	"name": "حالت نشان منبع نود",
	"options": {
		"Hide built-in": "مخفی کردن داخلی‌ها",
		"None": "هیچ‌کدام",
		"Show all": "نمایش همه"
	}
};
var Comfy_NodeBadge_ShowApiPricing = { "name": "نمایش نشان قیمت‌گذاری API نود" };
var Comfy_NodeLibrary_NewDesign = {
	"name": "طراحی جدید کتابخانه Node",
	"tooltip": "فعال‌سازی نوار کناری بازطراحی‌شده کتابخانه node با تب‌های (ضروری، همه، سفارشی)، جستجوی بهبود یافته و پیش‌نمایش هنگام قرار گرفتن نشانگر ماوس."
};
var Comfy_NodeReplacement_Enabled = {
	"name": "فعال‌سازی جایگزینی خودکار node",
	"tooltip": "در صورت فعال بودن، nodeهای مفقود می‌توانند به‌طور خودکار با معادل‌های جدیدتر خود جایگزین شوند اگر نگاشت جایگزینی وجود داشته باشد."
};
var Comfy_NodeSearchBoxImpl = {
	"name": "پیاده‌سازی جعبه جستجوی نود",
	"options": {
		"default": "پیش‌فرض",
		"litegraph (legacy)": "litegraph (قدیمی)",
		"v1 (legacy)": "v۱ (قدیمی)"
	}
};
var Comfy_NodeSearchBoxImpl_FollowCursor = {
	"name": "افزودن نودها دنبال‌رو نشانگر ماوس",
	"tooltip": "در صورت فعال بودن، نودهایی که از جعبه جستجو اضافه می‌شوند تا زمان کلیک برای قرار دادن، نشانگر ماوس را دنبال می‌کنند. این گزینه فقط برای پیاده‌سازی پیش‌فرض اعمال می‌شود."
};
var Comfy_NodeSearchBoxImpl_NodePreview = {
	"name": "پیش‌نمایش نود",
	"tooltip": "فقط برای پیاده‌سازی پیش‌فرض اعمال می‌شود"
};
var Comfy_NodeSearchBoxImpl_ShowCategory = {
	"name": "نمایش دسته‌بندی نود در نتایج جستجو",
	"tooltip": "فقط برای پیاده‌سازی پیش‌فرض اعمال می‌شود"
};
var Comfy_NodeSearchBoxImpl_ShowIdName = {
	"name": "نمایش نام شناسه نود در نتایج جستجو",
	"tooltip": "فقط برای پیاده‌سازی پیش‌فرض اعمال می‌شود"
};
var Comfy_NodeSearchBoxImpl_ShowNodeFrequency = {
	"name": "نمایش فراوانی نود در نتایج جستجو",
	"tooltip": "فقط برای پیاده‌سازی پیش‌فرض اعمال می‌شود"
};
var Comfy_NodeSuggestions_number = {
	"name": "تعداد پیشنهادهای node",
	"tooltip": "فقط برای جعبه جستجوی litegraph/منوی زمینه"
};
var Comfy_Node_AllowImageSizeDraw = { "name": "نمایش عرض × ارتفاع زیر پیش‌نمایش تصویر" };
var Comfy_Node_AlwaysShowAdvancedWidgets = {
	"name": "نمایش همیشگی ابزارهای پیشرفته در همه نودها",
	"tooltip": "در صورت فعال بودن، ابزارهای پیشرفته همیشه در همه نودها قابل مشاهده هستند و نیازی به باز کردن جداگانه آن‌ها نیست."
};
var Comfy_Node_AutoSnapLinkToSlot = {
	"name": "اتصال خودکار لینک به اسلات نود",
	"tooltip": "هنگام کشیدن یک لینک روی نود، لینک به طور خودکار به ورودی مناسب روی نود متصل می‌شود."
};
var Comfy_Node_BypassAllLinksOnDelete = {
	"name": "حفظ همه لینک‌ها هنگام حذف نود",
	"tooltip": "هنگام حذف یک نود، تلاش می‌شود همه ورودی‌ها و خروجی‌های آن مجدداً به هم متصل شوند (با عبور از نود حذف‌شده)."
};
var Comfy_Node_DoubleClickTitleToEdit = { "name": "ویرایش عنوان نود با دوبار کلیک" };
var Comfy_Node_MiddleClickRerouteNode = { "name": "ایجاد نود Reroute با کلیک وسط" };
var Comfy_Node_Opacity = { "name": "شفافیت نود" };
var Comfy_Node_ShowDeprecated = {
	"name": "نمایش نودهای منسوخ در جستجو",
	"tooltip": "نودهای منسوخ به طور پیش‌فرض در رابط کاربری پنهان هستند، اما در workflowهای موجود که از آن‌ها استفاده می‌کنند، همچنان فعال خواهند بود."
};
var Comfy_Node_ShowExperimental = {
	"name": "نمایش نودهای آزمایشی در جستجو",
	"tooltip": "نودهای آزمایشی در رابط کاربری به این صورت علامت‌گذاری می‌شوند و ممکن است در نسخه‌های آینده تغییرات اساسی یا حذف شوند. در workflowهای تولیدی با احتیاط استفاده شود."
};
var Comfy_Node_SnapHighlightsNode = {
	"name": "برجسته‌سازی نود هنگام اتصال لینک",
	"tooltip": "هنگام کشیدن یک لینک روی نود با ورودی مناسب، نود برجسته می‌شود."
};
var Comfy_Notification_ShowVersionUpdates = {
	"name": "نمایش به‌روزرسانی نسخه‌ها",
	"tooltip": "نمایش به‌روزرسانی‌ها برای مدل‌های جدید و ویژگی‌های اصلی جدید."
};
var Comfy_Pointer_ClickDrift = {
	"name": "میزان جابجایی اشاره‌گر هنگام کلیک (حداکثر فاصله)",
	"tooltip": "اگر اشاره‌گر بیش از این فاصله در هنگام نگه داشتن دکمه حرکت کند، به عنوان کشیدن (drag) در نظر گرفته می‌شود نه کلیک.\n\nبه جلوگیری از جابجایی ناخواسته اشیاء هنگام حرکت اشاره‌گر در حین کلیک کمک می‌کند."
};
var Comfy_Pointer_DoubleClickTime = {
	"name": "بازه زمانی دوبار کلیک (حداکثر)",
	"tooltip": "حداکثر زمان به میلی‌ثانیه بین دو کلیک برای ثبت دوبار کلیک. افزایش این مقدار ممکن است در صورتی که دوبار کلیک گاهی ثبت نمی‌شود، کمک کند."
};
var Comfy_PreviewFormat = {
	"name": "فرمت تصویر پیش‌نمایش",
	"tooltip": "هنگام نمایش پیش‌نمایش در ابزارک تصویر، آن را به یک تصویر سبک مانند webp، jpeg، webp;50 و غیره تبدیل می‌کند."
};
var Comfy_PromptFilename = { "name": "درخواست نام فایل هنگام ذخیره workflow" };
var Comfy_QueueButton_BatchCountLimit = {
	"name": "محدودیت تعداد batch",
	"tooltip": "حداکثر تعداد taskهایی که با یک کلیک به صف اضافه می‌شوند"
};
var Comfy_Queue_MaxHistoryItems = {
	"name": "اندازه تاریخچه صف",
	"tooltip": "حداکثر تعداد taskهایی که در تاریخچه صف نمایش داده می‌شوند."
};
var Comfy_Queue_QPOV2 = {
	"name": "استفاده از صف کار یکپارچه در پنل کناری دارایی‌ها",
	"tooltip": "پنل شناور صف کار را با صف کاری معادل که در پنل کناری دارایی‌ها قرار دارد جایگزین می‌کند. می‌توانید این گزینه را غیرفعال کنید تا به چیدمان پنل شناور بازگردید."
};
var Comfy_RightSidePanel_ShowErrorsTab = {
	"name": "نمایش زبانهٔ مشکلات در پنل کناری",
	"tooltip": "در صورت فعال بودن، زبانهٔ مشکلات در پنل کناری راست نمایش داده می‌شود تا خطاهای مسدودکننده و منابعِ مفقودی که نیاز به راه‌اندازی دارند را نشان دهد."
};
var Comfy_Sidebar_Location = {
	"name": "محل نوار کناری",
	"options": {
		"left": "چپ",
		"right": "راست"
	}
};
var Comfy_Sidebar_Size = {
	"name": "اندازه نوار کناری",
	"options": {
		"normal": "معمولی",
		"small": "کوچک"
	}
};
var Comfy_Sidebar_Style = {
	"name": "سبک نوار کناری",
	"options": {
		"connected": "متصل",
		"floating": "شناور"
	}
};
var Comfy_Sidebar_UnifiedWidth = { "name": "عرض یکپارچه نوار کناری" };
var Comfy_SnapToGrid_GridSize = {
	"name": "اندازه شبکه برای چسباندن به شبکه",
	"tooltip": "هنگام کشیدن و تغییر اندازه nodeها با نگه داشتن shift، آن‌ها به شبکه تراز می‌شوند. این گزینه اندازه آن شبکه را کنترل می‌کند."
};
var Comfy_TextareaWidget_FontSize = { "name": "اندازه فونت ابزارک textarea" };
var Comfy_TextareaWidget_Spellcheck = { "name": "بررسی املای ابزارک textarea" };
var Comfy_TreeExplorer_ItemPadding = { "name": "فاصله داخلی آیتم‌های مرورگر درختی" };
var Comfy_UI_TabBarLayout = {
	"name": "چیدمان نوار تب",
	"options": {
		"Default": "پیش‌فرض",
		"Legacy": "قدیمی"
	},
	"tooltip": "چیدمان نوار تب را کنترل می‌کند. «یکپارچه» کنترل‌های راهنما و کاربر را به ناحیه نوار تب منتقل می‌کند."
};
var Comfy_UseNewMenu = {
	"name": "استفاده از منوی جدید",
	"options": {
		"Disabled": "غیرفعال",
		"Top": "بالا"
	},
	"tooltip": "فعال‌سازی نوار منوی بازطراحی‌شده بالا."
};
var Comfy_Validation_Workflows = { "name": "اعتبارسنجی workflowها" };
var Comfy_VueNodes_Enabled = {
	"name": "طراحی مدرن node (Nodes 2.0)",
	"tooltip": "مدرن: رندر مبتنی بر DOM با تعامل‌پذیری بیشتر، ویژگی‌های بومی مرورگر و طراحی بصری به‌روز. کلاسیک: رندر سنتی مبتنی بر canvas."
};
var Comfy_WidgetControlMode = {
	"name": "حالت کنترل ابزارک",
	"options": {
		"after": "بعد",
		"before": "قبل"
	},
	"tooltip": "زمان به‌روزرسانی مقادیر ابزارک (تصادفی/افزایش/کاهش) را کنترل می‌کند؛ یا قبل از قرار گرفتن prompt در صف یا بعد از آن."
};
var Comfy_Window_UnloadConfirmation = { "name": "نمایش تأیید هنگام بستن پنجره" };
var Comfy_Workflow_AutoSave = {
	"name": "ذخیره‌سازی خودکار",
	"options": {
		"after delay": "پس از تأخیر",
		"off": "خاموش"
	}
};
var Comfy_Workflow_AutoSaveDelay = {
	"name": "تأخیر ذخیره‌سازی خودکار (میلی‌ثانیه)",
	"tooltip": "فقط زمانی اعمال می‌شود که ذخیره‌سازی خودکار روی «پس از تأخیر» تنظیم شده باشد."
};
var Comfy_Workflow_ConfirmDelete = { "name": "نمایش تأیید هنگام حذف ورک‌فلو" };
var Comfy_Workflow_NamedValuesRestore = { "name": "بازیابی مقادیر ویجت بر اساس نام" };
var Comfy_Workflow_Persist = { "name": "حفظ وضعیت ورک‌فلو و بازیابی هنگام بارگذاری (مجدد) صفحه" };
var Comfy_Workflow_ShowMissingMediaWarning = {
	"name": "نمایش رسانه‌های مفقود در برگهٔ مشکلات",
	"tooltip": "وقتی غیرفعال باشد، تصاویر ورودی، ویدیوها و صوت‌های یافت‌نشده در برگهٔ مشکلات فهرست نمی‌شوند و nodeهای آن‌ها برجسته نمی‌شوند."
};
var Comfy_Workflow_ShowMissingNodesWarning = {
	"name": "نمایش nodeهای مفقود در برگهٔ مشکلات",
	"tooltip": "وقتی غیرفعال باشد، بسته‌های node مفقود در برگهٔ مشکلات فهرست نمی‌شوند و nodeهای آن‌ها برجسته نمی‌شوند. workflow همچنان تا زمان نصب آن‌ها اجرا نمی‌شود."
};
var Comfy_Workflow_SortNodeIdOnSave = { "name": "مرتب‌سازی شناسه نودها هنگام ذخیره ورک‌فلو" };
var Comfy_Workflow_WarnBlueprintOverwrite = { "name": "نیاز به تأیید برای بازنویسی بلوپرینت ساب‌گراف موجود" };
var Comfy_Workflow_WorkflowTabsPosition = {
	"name": "موقعیت ورک‌فلوهای باز شده",
	"options": {
		"Sidebar": "نوار کناری",
		"Topbar": "نوار بالا"
	}
};
var LiteGraph_Canvas_MaximumFps = {
	"name": "حداکثر فریم بر ثانیه",
	"tooltip": "حداکثر تعداد فریم در ثانیه که بوم مجاز به رندر است. مصرف GPU را با هزینه کاهش روانی محدود می‌کند. اگر ۰ باشد، نرخ تازه‌سازی صفحه نمایش استفاده می‌شود. پیش‌فرض: ۰"
};
var LiteGraph_Canvas_MinFontSizeForLOD = {
	"name": "آستانه اندازه فونت برای سطح جزئیات نود هنگام زوم",
	"tooltip": "کنترل می‌کند که نودها چه زمانی به رندر LOD با کیفیت پایین‌تر تغییر کنند. از اندازه فونت بر حسب پیکسل برای تعیین زمان تغییر استفاده می‌کند. برای غیرفعال کردن روی ۰ تنظیم کنید. مقادیر ۱ تا ۲۴ آستانه حداقل اندازه فونت برای LOD را تعیین می‌کنند - مقادیر بالاتر (۲۴ پیکسل) = تغییر سریع‌تر به رندر ساده هنگام زوم به بیرون، مقادیر پایین‌تر (۱ پیکسل) = حفظ کیفیت کامل نود برای مدت طولانی‌تر."
};
var LiteGraph_ContextMenu_Scaling = { "name": "مقیاس‌بندی منوهای ترکیبی نود هنگام زوم" };
var LiteGraph_Group_SelectChildrenOnClick = {
	"name": "انتخاب اعضای گروه با کلیک",
	"tooltip": "در صورت فعال بودن، با کلیک روی یک گروه، همه nodeها و آیتم‌های داخل آن انتخاب می‌شوند"
};
var LiteGraph_Node_DefaultPadding = {
	"name": "همیشه کوچک‌سازی نودهای جدید",
	"tooltip": "تغییر اندازه نودها به کوچک‌ترین اندازه ممکن هنگام ایجاد. اگر غیرفعال باشد، نود جدید کمی عریض‌تر خواهد بود تا مقادیر ویجت نمایش داده شود."
};
var LiteGraph_Node_TooltipDelay = { "name": "تأخیر نمایش راهنما" };
var LiteGraph_Reroute_SplineOffset = {
	"name": "افست اسپلاین مسیر مجدد",
	"tooltip": "افست نقطه کنترل بزیه از نقطه مرکزی مسیر مجدد"
};
var pysssss_SnapToGrid = {
	"name": "همیشه چسباندن به شبکه",
	"tooltip": "در صورت فعال بودن، nodeها هنگام جابجایی یا تغییر اندازه به طور خودکار با شبکه تراز می‌شوند."
};
var settings_default = {
	"Comfy-Desktop_AutoUpdate": { "name": "بررسی خودکار برای به‌روزرسانی‌ها" },
	"Comfy-Desktop_SendStatistics": { "name": "ارسال آمار استفاده ناشناس" },
	"Comfy-Desktop_UV_PypiInstallMirror": {
		"name": "آینه نصب Pypi",
		"tooltip": "آینه پیش‌فرض برای نصب pip"
	},
	"Comfy-Desktop_UV_PythonInstallMirror": {
		"name": "آینه نصب Python",
		"tooltip": "نصب‌های مدیریت‌شده Python از پروژه Astral python-build-standalone دانلود می‌شوند. این متغیر می‌تواند به یک آدرس آینه تنظیم شود تا منبع متفاوتی برای نصب‌های Python استفاده شود. آدرس ارائه‌شده جایگزین https://github.com/astral-sh/python-build-standalone/releases/download در مثال زیر خواهد شد: https://github.com/astral-sh/python-build-standalone/releases/download/20240713/cpython-3.12.4%2B20240713-aarch64-apple-darwin-install_only.tar.gz. توزیع‌ها را می‌توان با استفاده از طرح آدرس file:// از یک پوشه محلی خواند."
	},
	"Comfy-Desktop_UV_TorchInstallMirror": {
		"name": "آینه نصب Torch",
		"tooltip": "آینه pip برای نصب pytorch"
	},
	"Comfy-Desktop_WindowStyle": {
		"name": "سبک پنجره",
		"options": {
			"custom": "سفارشی",
			"default": "پیش‌فرض"
		},
		"tooltip": "سفارشی: نوار عنوان سیستم با منوی بالای ComfyUI جایگزین می‌شود"
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
