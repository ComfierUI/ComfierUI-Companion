//#region src/locales/de/settings.json
var Comfy_Appearance_DisableAnimations = {
	"name": "Animationen deaktivieren",
	"tooltip": "Deaktiviert die meisten CSS-Animationen und -Übergänge. Beschleunigt die Inferenz, wenn die Anzeige-GPU auch für die Generierung verwendet wird."
};
var Comfy_Canvas_BackgroundImage = {
	"name": "Canvas-Hintergrundbild",
	"tooltip": "Bild-URL für den Canvas-Hintergrund. Sie können ein Bild im Ausgabebereich mit der rechten Maustaste anklicken und „Als Hintergrund festlegen“ auswählen oder über die Upload-Schaltfläche ein eigenes Bild hochladen."
};
var Comfy_Canvas_LeftMouseClickBehavior = {
	"name": "Verhalten bei linkem Mausklick",
	"options": {
		"Panning": "Verschieben",
		"Select": "Auswählen"
	}
};
var Comfy_Canvas_MouseWheelScroll = {
	"name": "Mausradverhalten",
	"options": {
		"Panning": "Verschieben",
		"Zoom in/out": "Vergrößern/Verkleinern"
	}
};
var Comfy_Canvas_NavigationMode = {
	"name": "Navigationsmodus",
	"options": {
		"Custom": "Benutzerdefiniert",
		"Drag Navigation": "Zieh-Navigation",
		"Standard (New)": "Standard (Neu)"
	}
};
var Comfy_Canvas_SelectionToolbox = {
	"name": "Auswahlwerkzeugleiste anzeigen",
	"tooltip": "Zeigt eine schwebende Werkzeugleiste an, wenn Nodes ausgewählt sind, und ermöglicht schnellen Zugriff auf häufige Aktionen."
};
var Comfy_ConfirmClear = { "name": "Bestätigung beim Leeren des Workflows anfordern" };
var Comfy_DOMClippingEnabled = { "name": "Clipping von DOM-Elementen aktivieren (die Aktivierung kann die Leistung verringern)" };
var Comfy_DevMode = { "name": "Optionen für den Entwicklermodus aktivieren (API-Speichern usw.)" };
var Comfy_DisableFloatRounding = {
	"name": "Standardrundung von Float-Widgets deaktivieren.",
	"tooltip": "(Neuladen der Seite erforderlich) Die Rundung kann nicht deaktiviert werden, wenn sie vom Node im Backend festgelegt wird."
};
var Comfy_DisableSliders = { "name": "Slider für Node-Widgets deaktivieren" };
var Comfy_EditAttention_Delta = { "name": "Präzision mit Strg+Auf/Ab" };
var Comfy_EnableTooltips = { "name": "Tooltips aktivieren" };
var Comfy_EnableWorkflowViewRestore = { "name": "Canvas-Position und Zoomstufe in Workflows speichern und wiederherstellen" };
var Comfy_ErrorSystem_ShowMissingModels = {
	"name": "Fehlende Modelle im Probleme-Tab anzeigen",
	"tooltip": "Wenn deaktiviert, werden nicht gefundene Modelldateien nicht im Probleme-Tab aufgeführt und ihre Nodes nicht hervorgehoben."
};
var Comfy_Execution_PreviewMethod = {
	"name": "Methode für Live-Vorschau",
	"options": {
		"auto": "Automatisch",
		"default": "Standard",
		"latent2rgb": "latent2rgb",
		"none": "Keine",
		"taesd": "taesd"
	},
	"tooltip": "Methode für die Live-Vorschau während der Bildgenerierung. „default“ verwendet die CLI-Einstellung des Servers."
};
var Comfy_FloatRoundingPrecision = {
	"name": "Dezimalstellen für Rundung des Float-Widgets [0 = automatisch].",
	"tooltip": "(Neuladen der Seite erforderlich)"
};
var Comfy_Graph_AutoPanSpeed = {
	"name": "Geschwindigkeit für automatisches Verschieben",
	"tooltip": "Maximale Geschwindigkeit beim automatischen Verschieben durch Ziehen an den Canvas-Rand. Auf 0 setzen, um automatisches Verschieben zu deaktivieren."
};
var Comfy_Graph_CanvasInfo = { "name": "Canvas-Informationen in der unteren linken Ecke anzeigen (fps usw.)" };
var Comfy_Graph_CanvasMenu = { "name": "Graph-Canvas-Menü anzeigen" };
var Comfy_Graph_CtrlShiftZoom = { "name": "Tastenkürzel für schnelles Zoomen aktivieren (Strg + Umschalt + Ziehen)" };
var Comfy_Graph_DeduplicateSubgraphNodeIds = {
	"name": "Doppelte Node-IDs in Subgraphs entfernen",
	"tooltip": "Doppelte Node-IDs in Subgraphs beim Laden eines Workflows automatisch neu zuweisen."
};
var Comfy_Graph_LinkMarkers = {
	"name": "Markierungen in der Verbindungsmitte",
	"options": {
		"Arrow": "Pfeil",
		"Circle": "Kreis",
		"None": "Keine"
	}
};
var Comfy_Graph_LiveSelection = {
	"name": "Live-Auswahl",
	"tooltip": "Wenn aktiviert, werden Nodes beim Ziehen des Auswahlrechtecks in Echtzeit ausgewählt bzw. abgewählt, ähnlich wie in anderen Design-Tools."
};
var Comfy_Graph_ZoomSpeed = { "name": "Canvas-Zoomgeschwindigkeit" };
var Comfy_GroupSelectedNodes_Padding = { "name": "Randabstand beim Gruppieren ausgewählter Nodes" };
var Comfy_Group_DoubleClickTitleToEdit = { "name": "Gruppentitel zum Bearbeiten doppelklicken" };
var Comfy_LinkRelease_Action = {
	"name": "Aktion beim Loslassen einer Verbindung (kein Modifikator)",
	"options": {
		"context menu": "Kontextmenü",
		"no action": "Keine Aktion",
		"search box": "Suchfeld"
	}
};
var Comfy_LinkRelease_ActionShift = {
	"name": "Aktion beim Loslassen einer Verbindung (Umschalt)",
	"options": {
		"context menu": "Kontextmenü",
		"no action": "Keine Aktion",
		"search box": "Suchfeld"
	}
};
var Comfy_LinkRenderMode = {
	"name": "Verbindungsdarstellungsmodus",
	"options": {
		"Hidden": "Ausgeblendet",
		"Linear": "Linear",
		"Spline": "Spline",
		"Straight": "Gerade"
	},
	"tooltip": "Steuert das Erscheinungsbild und die Sichtbarkeit von Verbindungen zwischen Nodes auf dem Canvas."
};
var Comfy_Load3D_3DViewerEnable = {
	"name": "3D-Viewer aktivieren (Beta)",
	"tooltip": "Aktiviert den 3D-Viewer (Beta) für ausgewählte Nodes. Mit dieser Funktion können Sie 3D-Modelle direkt im 3D-Viewer in voller Größe visualisieren und mit ihnen interagieren."
};
var Comfy_Load3D_BackgroundColor = {
	"name": "Anfängliche Hintergrundfarbe",
	"tooltip": "Steuert die Standardhintergrundfarbe der 3D-Szene. Diese Einstellung bestimmt das Erscheinungsbild des Hintergrunds, wenn ein neues 3D-Widget erstellt wird, kann jedoch nach der Erstellung für jedes Widget einzeln angepasst werden."
};
var Comfy_Load3D_CameraType = {
	"name": "Standard-Kameratyp",
	"options": {
		"orthographic": "orthografisch",
		"perspective": "perspektivisch"
	},
	"tooltip": "Legt fest, ob die Kamera beim Erstellen eines neuen 3D-Widgets standardmäßig perspektivisch oder orthografisch ist. Diese Standardeinstellung kann nach der Erstellung weiterhin für jedes Widget einzeln umgeschaltet werden."
};
var Comfy_Load3D_LightAdjustmentIncrement = {
	"name": "Schrittweite für Lichtanpassung",
	"tooltip": "Legt die Schrittweite beim Anpassen der Lichtintensität in 3D-Szenen fest. Ein kleinerer Schrittwert ermöglicht eine präzisere Steuerung der Lichtanpassungen, während ein größerer Wert deutlichere Änderungen pro Anpassung bewirkt."
};
var Comfy_Load3D_LightIntensity = {
	"name": "Anfängliche Lichtintensität",
	"tooltip": "Legt die Standardhelligkeit der Beleuchtung in der 3D-Szene fest. Dieser Wert bestimmt, wie intensiv Lichter Objekte beleuchten, wenn ein neues 3D-Widget erstellt wird, kann jedoch nach der Erstellung für jedes Widget einzeln angepasst werden."
};
var Comfy_Load3D_LightIntensityMaximum = {
	"name": "Maximale Lichtintensität",
	"tooltip": "Legt den maximal zulässigen Wert für die Lichtintensität in 3D-Szenen fest. Dies definiert die obere Helligkeitsgrenze, die beim Anpassen der Beleuchtung in jedem 3D-Widget eingestellt werden kann."
};
var Comfy_Load3D_LightIntensityMinimum = {
	"name": "Minimale Lichtintensität",
	"tooltip": "Legt den minimal zulässigen Wert für die Lichtintensität in 3D-Szenen fest. Dies definiert die untere Helligkeitsgrenze, die beim Anpassen der Beleuchtung in jedem 3D-Widget eingestellt werden kann."
};
var Comfy_Load3D_PLYEngine = {
	"name": "Punktwolken-Engine",
	"options": {
		"fastply": "fastply",
		"threejs": "threejs"
	},
	"tooltip": "Wählen Sie die Engine zum Laden von Punktwolken-PLY-Dateien. „threejs“ verwendet den nativen Three.js PLYLoader (unterstützt Binär- und ASCII-Dateien, mesh-fähig). „fastply“ verwendet einen optimierten Parser für ASCII-PLY-Dateien. 3D-Gaussian-Splat-PLYs werden automatisch erkannt und unabhängig von dieser Einstellung immer über sparkjs gerendert."
};
var Comfy_Load3D_ShowGrid = {
	"name": "Standardmäßige Gittersichtbarkeit",
	"tooltip": "Legt fest, ob das Gitter beim Erstellen eines neuen 3D-Widgets standardmäßig sichtbar ist. Diese Standardeinstellung kann nach der Erstellung weiterhin für jedes Widget einzeln umgeschaltet werden."
};
var Comfy_Locale = { "name": "Sprache" };
var Comfy_MaskEditor_BrushAdjustmentSpeed = {
	"name": "Multiplikator für Anpassungsgeschwindigkeit des Pinsels",
	"tooltip": "Legt fest, wie schnell sich Pinselgröße und -härte beim Anpassen ändern. Höhere Werte bedeuten schnellere Änderungen."
};
var Comfy_MaskEditor_UseDominantAxis = {
	"name": "Pinselanpassung auf dominante Achse beschränken",
	"tooltip": "Wenn aktiviert, wirken sich Pinselanpassungen je nach der Richtung, in die Sie sich stärker bewegen, nur auf Größe ODER Härte aus."
};
var Comfy_ModelLibrary_AutoLoadAll = {
	"name": "Alle Modellordner automatisch laden",
	"tooltip": "Wenn aktiviert, werden alle Ordner geladen, sobald Sie die Modellbibliothek öffnen (dies kann während des Ladens zu Verzögerungen führen). Wenn deaktiviert, werden Modellordner der Stammebene erst geladen, nachdem Sie darauf klicken."
};
var Comfy_ModelLibrary_NameFormat = {
	"name": "Anzuzeigender Name in der Baumansicht der Modellbibliothek",
	"options": {
		"filename": "filename",
		"title": "title"
	},
	"tooltip": "Wählen Sie „filename“, um in der Modellliste eine vereinfachte Ansicht des rohen Dateinamens anzuzeigen (ohne Verzeichnis und Erweiterung „.safetensors“). Wählen Sie „title“, um den konfigurierbaren Metadatentitel des Modells anzuzeigen."
};
var Comfy_NodeBadge_NodeIdBadgeMode = {
	"name": "Node-ID-Abzeichenmodus",
	"options": {
		"None": "Keine",
		"Show all": "Alle anzeigen"
	}
};
var Comfy_NodeBadge_NodeLifeCycleBadgeMode = {
	"name": "Node-Lebenszyklus-Abzeichenmodus",
	"options": {
		"None": "Keine",
		"Show all": "Alle anzeigen"
	}
};
var Comfy_NodeBadge_NodeSourceBadgeMode = {
	"name": "Node-Quell-Abzeichenmodus",
	"options": {
		"Hide built-in": "Integrierte ausblenden",
		"None": "Keine",
		"Show all": "Alle anzeigen"
	}
};
var Comfy_NodeBadge_ShowApiPricing = { "name": "Preisabzeichen für API-Nodes anzeigen" };
var Comfy_NodeLibrary_NewDesign = {
	"name": "Neues Design der Node-Bibliothek",
	"tooltip": "Die überarbeitete Seitenleiste der Node-Bibliothek mit Tabs (Wesentlich, Alle, Benutzerdefiniert), verbesserter Suche und Vorschauen beim Überfahren aktivieren."
};
var Comfy_NodeReplacement_Enabled = {
	"name": "Vorschläge zum Ersetzen von Nodes aktivieren",
	"tooltip": "Wenn aktiviert, werden fehlende Nodes mit bekannten Ersatzmöglichkeiten im Dialog für fehlende Nodes als ersetzbar angezeigt, sodass Sie Ersatzmöglichkeiten prüfen und anwenden können."
};
var Comfy_NodeSearchBoxImpl = {
	"name": "Implementierung des Node-Suchfelds",
	"options": {
		"default": "Standard",
		"litegraph (legacy)": "litegraph (veraltet)",
		"v1 (legacy)": "v1 (veraltet)"
	}
};
var Comfy_NodeSearchBoxImpl_FollowCursor = {
	"name": "Hinzugefügte Nodes folgen dem Cursor",
	"tooltip": "Wenn aktiviert, folgen über das Suchfeld hinzugefügte Nodes dem Cursor, bis Sie zum Platzieren klicken. Gilt nur für die Standardimplementierung."
};
var Comfy_NodeSearchBoxImpl_NodePreview = {
	"name": "Node-Vorschau",
	"tooltip": "Gilt nur für die Standardimplementierung"
};
var Comfy_NodeSearchBoxImpl_ShowCategory = {
	"name": "Node-Kategorie in Suchergebnissen anzeigen",
	"tooltip": "Gilt nur für v1 (veraltet)"
};
var Comfy_NodeSearchBoxImpl_ShowIdName = {
	"name": "Node-ID-Namen in Suchergebnissen anzeigen",
	"tooltip": "Gilt nicht für litegraph (veraltet)"
};
var Comfy_NodeSearchBoxImpl_ShowNodeFrequency = {
	"name": "Node-Häufigkeit in Suchergebnissen anzeigen",
	"tooltip": "Gilt nur für v1 (veraltet)"
};
var Comfy_NodeSuggestions_number = {
	"name": "Anzahl der Node-Vorschläge",
	"tooltip": "Nur für litegraph-Suchfeld/Kontextmenü"
};
var Comfy_Node_AllowImageSizeDraw = { "name": "Breite × Höhe unter der Bildvorschau anzeigen" };
var Comfy_Node_AlwaysShowAdvancedWidgets = {
	"name": "Erweiterte Widgets auf allen Nodes immer anzeigen",
	"tooltip": "Wenn aktiviert, sind erweiterte Widgets auf allen Nodes immer sichtbar, ohne dass sie einzeln erweitert werden müssen."
};
var Comfy_Node_AutoSnapLinkToSlot = {
	"name": "Verbindung automatisch am Node-Slot einrasten",
	"tooltip": "Beim Ziehen einer Verbindung über einen Node rastet die Verbindung automatisch an einem geeigneten Eingabe-Slot des Nodes ein."
};
var Comfy_Node_BypassAllLinksOnDelete = {
	"name": "Alle Verbindungen beim Löschen von Nodes beibehalten",
	"tooltip": "Versuchen Sie beim Löschen eines Nodes, alle Ein- und Ausgangsverbindungen wiederherzustellen, indem der gelöschte Node umgangen wird."
};
var Comfy_Node_DoubleClickTitleToEdit = { "name": "Node-Titel per Doppelklick bearbeiten" };
var Comfy_Node_MiddleClickRerouteNode = { "name": "Mittelklick erstellt einen neuen Reroute-Node" };
var Comfy_Node_Opacity = { "name": "Node-Deckkraft" };
var Comfy_Node_ShowDeprecated = {
	"name": "Veraltete Nodes in der Suche anzeigen",
	"tooltip": "Veraltete Nodes sind in der UI standardmäßig ausgeblendet, bleiben jedoch in bestehenden Workflows, die sie verwenden, funktionsfähig."
};
var Comfy_Node_ShowExperimental = {
	"name": "Experimentelle Nodes in der Suche anzeigen",
	"tooltip": "Experimentelle Nodes werden in der UI entsprechend gekennzeichnet und können in zukünftigen Versionen erheblich geändert oder entfernt werden. In Produktions-Workflows mit Vorsicht verwenden"
};
var Comfy_Node_SnapHighlightsNode = {
	"name": "Node beim Einrasten hervorheben",
	"tooltip": "Wenn Sie eine Verbindung über einen Node mit einem geeigneten Eingabe-Slot ziehen, den Node hervorheben"
};
var Comfy_Notification_ShowVersionUpdates = {
	"name": "Versionsupdates anzeigen",
	"tooltip": "Updates für neue Modelle und wichtige neue Funktionen anzeigen."
};
var Comfy_Pointer_ClickDrift = {
	"name": "Zeigerbewegung beim Klicken (maximale Entfernung)",
	"tooltip": "Wenn sich der Zeiger beim Gedrückthalten einer Maustaste weiter als diese Entfernung bewegt, wird dies als Ziehen (statt als Klicken) betrachtet.\n\nHilft, unbeabsichtigtes Verschieben von Objekten zu verhindern, wenn der Zeiger beim Klicken bewegt wird."
};
var Comfy_Pointer_DoubleClickTime = {
	"name": "Doppelklickintervall (maximal)",
	"tooltip": "Die maximale Zeit in Millisekunden zwischen den beiden Klicks eines Doppelklicks. Eine Erhöhung dieses Werts kann helfen, wenn Doppelklicks manchmal nicht erkannt werden."
};
var Comfy_PreviewFormat = {
	"name": "Vorschaubildformat",
	"tooltip": "Beim Anzeigen einer Vorschau im Bild-Widget in ein kompaktes Bildformat konvertieren, z. B. webp, jpeg, webp;50 usw."
};
var Comfy_PromptFilename = { "name": "Beim Speichern des Workflows nach Dateinamen fragen" };
var Comfy_QueueButton_BatchCountLimit = {
	"name": "Limit für Batch-Anzahl",
	"tooltip": "Die maximale Anzahl an Aufgaben, die mit einem Klick auf die Schaltfläche zur Queue hinzugefügt werden"
};
var Comfy_Queue_MaxHistoryItems = {
	"name": "Größe des Queue-Verlaufs",
	"tooltip": "Die maximale Anzahl an Aufgaben, die im Queue-Verlauf angezeigt werden."
};
var Comfy_Queue_QPOV2 = {
	"name": "Angedocktes Auftragsverlaufs-/Queue-Panel",
	"tooltip": "Ersetzt das schwebende Auftrags-Queue-Panel durch eine gleichwertige Auftrags-Queue im Seitenpanel für den Auftragsverlauf. Sie können dies deaktivieren, um zum Layout mit schwebendem Panel zurückzukehren."
};
var Comfy_RightSidePanel_ShowErrorsTab = {
	"name": "Tab „Probleme“ im Seitenpanel anzeigen",
	"tooltip": "Wenn aktiviert, wird der Tab „Probleme“ im rechten Seitenpanel angezeigt, um blockierende Fehler und fehlende Ressourcen anzuzeigen, die eingerichtet werden müssen."
};
var Comfy_Sidebar_Location = {
	"name": "Position der Seitenleiste",
	"options": {
		"left": "links",
		"right": "rechts"
	}
};
var Comfy_Sidebar_Size = {
	"name": "Größe der Seitenleiste",
	"options": {
		"normal": "normal",
		"small": "klein"
	}
};
var Comfy_Sidebar_Style = {
	"name": "Stil der Seitenleiste",
	"options": {
		"connected": "verbunden",
		"floating": "schwebend"
	}
};
var Comfy_Sidebar_UnifiedWidth = { "name": "Einheitliche Breite der Seitenleiste" };
var Comfy_SnapToGrid_GridSize = {
	"name": "Rastergröße für Einrasten",
	"tooltip": "Beim Ziehen und Ändern der Größe von Nodes werden diese bei gedrückter Umschalttaste am Raster ausgerichtet. Diese Einstellung legt die Größe dieses Rasters fest."
};
var Comfy_TextareaWidget_FontSize = { "name": "Schriftgröße des Textbereich-Widgets" };
var Comfy_TextareaWidget_Spellcheck = { "name": "Rechtschreibprüfung im Textbereich-Widget" };
var Comfy_TreeExplorer_ItemPadding = { "name": "Innenabstand von Elementen im Baum-Explorer" };
var Comfy_UI_TabBarLayout = {
	"name": "Layout der Tab-Leiste",
	"options": {
		"Default": "Standard",
		"Legacy": "Legacy"
	},
	"tooltip": "Steuert die Elemente in der integrierten Tab-Leiste."
};
var Comfy_UseNewMenu = {
	"name": "Neues Menü verwenden",
	"options": {
		"Disabled": "Deaktiviert",
		"Top": "Oben"
	},
	"tooltip": "Aktiviert die überarbeitete obere Menüleiste."
};
var Comfy_Validation_Workflows = { "name": "Workflows validieren" };
var Comfy_VueNodes_Enabled = {
	"name": "Modernes Node-Design (Nodes 2.0)",
	"tooltip": "Modern: DOM-basiertes Rendering mit verbesserter Interaktivität, nativen Browserfunktionen und aktualisiertem visuellen Design. Klassisch: Herkömmliches Canvas-Rendering."
};
var Comfy_WidgetControlMode = {
	"name": "Widget-Steuerungsmodus",
	"options": {
		"after": "nachher",
		"before": "vorher"
	},
	"tooltip": "Legt fest, wann Widget-Werte aktualisiert werden (randomisieren/erhöhen/verringern): bevor der Prompt in die Queue eingereiht wird oder danach."
};
var Comfy_Window_UnloadConfirmation = { "name": "Bestätigung beim Schließen des Fensters anzeigen" };
var Comfy_Workflow_AutoSave = {
	"name": "Automatisches Speichern",
	"options": {
		"after delay": "nach Verzögerung",
		"off": "aus"
	}
};
var Comfy_Workflow_AutoSaveDelay = {
	"name": "Verzögerung für automatisches Speichern (ms)",
	"tooltip": "Gilt nur, wenn Automatisches Speichern auf „nach Verzögerung“ gesetzt ist."
};
var Comfy_Workflow_ConfirmDelete = { "name": "Bestätigung beim Löschen von Workflows anzeigen" };
var Comfy_Workflow_NamedValuesRestore = { "name": "Widget-Werte anhand des Namens wiederherstellen" };
var Comfy_Workflow_Persist = { "name": "Workflow-Status beibehalten und beim (Neu-)Laden der Seite wiederherstellen" };
var Comfy_Workflow_ShowMissingMediaWarning = {
	"name": "Fehlende Medien im Probleme-Tab anzeigen",
	"tooltip": "Wenn deaktiviert, werden nicht gefundene Eingabebilder, Videos und Audiodateien nicht im Probleme-Tab aufgeführt und ihre Nodes nicht hervorgehoben."
};
var Comfy_Workflow_ShowMissingNodesWarning = {
	"name": "Fehlende Nodes im Probleme-Tab anzeigen",
	"tooltip": "Wenn deaktiviert, werden fehlende Node-Pakete nicht im Probleme-Tab aufgeführt und ihre Nodes nicht hervorgehoben. Der Workflow kann weiterhin nicht ausgeführt werden, bis sie installiert sind."
};
var Comfy_Workflow_SortNodeIdOnSave = { "name": "Node-IDs beim Speichern des Workflows sortieren" };
var Comfy_Workflow_WarnBlueprintOverwrite = { "name": "Bestätigung zum Überschreiben eines vorhandenen Subgraph-Blueprints anfordern" };
var Comfy_Workflow_WorkflowTabsPosition = {
	"name": "Position geöffneter Workflows",
	"options": {
		"Sidebar": "Seitenleiste",
		"Topbar": "Obere Leiste"
	}
};
var LiteGraph_Canvas_MaximumFps = {
	"name": "Maximale FPS",
	"tooltip": "Die maximale Anzahl an Bildern pro Sekunde, die das Canvas rendern darf. Begrenzt die GPU-Nutzung auf Kosten der Flüssigkeit. Bei 0 wird die Bildschirmaktualisierungsrate verwendet. Standard: 0"
};
var LiteGraph_Canvas_MinFontSizeForLOD = {
	"name": "Node-Detaillierungsgrad beim Zoomen – Schriftgrößenschwelle",
	"tooltip": "Legt fest, wann die Nodes zum LOD-Rendering mit niedriger Qualität wechseln. Verwendet die Schriftgröße in Pixeln, um den Umschaltzeitpunkt zu bestimmen. Auf 0 setzen, um dies zu deaktivieren. Werte von 1–24 legen die Mindestschriftgrößenschwelle für LOD fest – höhere Werte (24 px) = Nodes wechseln beim Herauszoomen früher zur vereinfachten Darstellung, niedrigere Werte (1 px) = volle Node-Qualität bleibt länger erhalten."
};
var LiteGraph_ContextMenu_Scaling = { "name": "Node-Combo-Widget-Menüs (Listen) beim Hineinzoomen skalieren" };
var LiteGraph_Group_SelectChildrenOnClick = {
	"name": "Gruppeninhalte beim Klicken auswählen",
	"tooltip": "Wenn aktiviert, werden durch Klicken auf eine Gruppe alle darin enthaltenen Nodes und Elemente ausgewählt."
};
var LiteGraph_Node_DefaultPadding = {
	"name": "Neue Nodes immer auf Minimalgröße verkleinern",
	"tooltip": "Ändert Nodes beim Erstellen auf die kleinstmögliche Größe. Wenn deaktiviert, wird ein neu hinzugefügter Node leicht verbreitert, um Widget-Werte anzuzeigen."
};
var LiteGraph_Node_TooltipDelay = { "name": "Tooltip-Verzögerung" };
var LiteGraph_Reroute_SplineOffset = {
	"name": "Spline-Versatz für Reroute",
	"tooltip": "Der Versatz des Bezier-Kontrollpunkts vom Mittelpunkt der Reroute"
};
var pysssss_SnapToGrid = {
	"name": "Immer am Raster ausrichten",
	"tooltip": "Wenn aktiviert, werden Nodes beim Verschieben oder Ändern der Größe automatisch am Raster ausgerichtet."
};
var settings_default = {
	"Comfy-Desktop_AutoUpdate": { "name": "Automatisch nach Updates suchen" },
	"Comfy-Desktop_SendStatistics": { "name": "Anonyme Nutzungsmetriken senden" },
	"Comfy-Desktop_UV_PypiInstallMirror": {
		"name": "PyPI-Installationsmirror",
		"tooltip": "Standard-pip-Installationsmirror"
	},
	"Comfy-Desktop_UV_PythonInstallMirror": {
		"name": "Python-Installationsmirror",
		"tooltip": "Verwaltete Python-Installationen werden vom Projekt Astral python-build-standalone heruntergeladen. Diese Variable kann auf eine Mirror-URL gesetzt werden, um eine andere Quelle für Python-Installationen zu verwenden. Die angegebene URL ersetzt https://github.com/astral-sh/python-build-standalone/releases/download in z. B. https://github.com/astral-sh/python-build-standalone/releases/download/20240713/cpython-3.12.4%2B20240713-aarch64-apple-darwin-install_only.tar.gz. Distributionen können aus einem lokalen Verzeichnis gelesen werden, indem das URL-Schema file:// verwendet wird."
	},
	"Comfy-Desktop_UV_TorchInstallMirror": {
		"name": "Torch-Installationsmirror",
		"tooltip": "pip-Installationsmirror für pytorch"
	},
	"Comfy-Desktop_WindowStyle": {
		"name": "Fensterstil",
		"options": {
			"custom": "Benutzerdefiniert",
			"default": "Standard"
		},
		"tooltip": "Benutzerdefiniert: Ersetzt die Systemtitelleiste durch das obere Menü von ComfyUI"
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
