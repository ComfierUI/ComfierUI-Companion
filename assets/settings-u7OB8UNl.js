//#region src/locales/fr/settings.json
var Comfy_Appearance_DisableAnimations = {
	"name": "Désactiver les animations",
	"tooltip": "Désactive la plupart des animations et transitions CSS. Accélère l'inférence lorsque le GPU d'affichage est également utilisé pour la génération."
};
var Comfy_Canvas_BackgroundImage = {
	"name": "Image de fond du canevas",
	"tooltip": "URL de l'image pour le fond du canevas. Vous pouvez faire un clic droit sur une image dans le panneau de sortie et sélectionner « Définir comme fond » pour l'utiliser."
};
var Comfy_Canvas_LeftMouseClickBehavior = {
	"name": "Comportement du clic gauche de la souris",
	"options": {
		"Panning": "Défilement",
		"Select": "Sélectionner"
	}
};
var Comfy_Canvas_MouseWheelScroll = {
	"name": "Défilement de la molette de la souris",
	"options": {
		"Panning": "Défilement",
		"Zoom in/out": "Zoom avant/arrière"
	}
};
var Comfy_Canvas_NavigationMode = {
	"name": "Mode de navigation sur le canvas",
	"options": {
		"Custom": "Personnalisé",
		"Drag Navigation": "Navigation par glisser-déposer",
		"Standard (New)": "Standard (Nouveau)"
	}
};
var Comfy_Canvas_SelectionToolbox = {
	"name": "Afficher la boîte à outils de sélection",
	"tooltip": "Affiche une barre d’outils flottante lorsque des nœuds sont sélectionnés, offrant un accès rapide aux actions courantes."
};
var Comfy_ConfirmClear = { "name": "Demander une confirmation lors de l'effacement du flux de travail" };
var Comfy_DOMClippingEnabled = { "name": "Activer le découpage des éléments DOM (peut réduire les performances)" };
var Comfy_DevMode = { "name": "Activer les options du mode développeur (sauvegarde API, etc.)" };
var Comfy_DisableFloatRounding = {
	"name": "Désactiver l'arrondi par défaut du widget flottant.",
	"tooltip": "(nécessite le rechargement de la page) Impossible de désactiver l'arrondi lorsque l'arrondi est défini par le nœud dans le backend."
};
var Comfy_DisableSliders = { "name": "Désactiver les curseurs du widget de nœud" };
var Comfy_EditAttention_Delta = { "name": "Précision Ctrl+haut/bas" };
var Comfy_EnableTooltips = { "name": "Activer les infobulles" };
var Comfy_EnableWorkflowViewRestore = { "name": "Sauvegarder et restaurer la position et le niveau de zoom du canevas dans les flux de travail" };
var Comfy_ErrorSystem_ShowMissingModels = {
	"name": "Afficher les modèles manquants dans l’onglet Problèmes",
	"tooltip": "Lorsqu’ils sont désactivés, les fichiers de modèles introuvables ne sont pas répertoriés dans l’onglet Problèmes et leurs nœuds ne sont pas mis en évidence."
};
var Comfy_Execution_PreviewMethod = {
	"name": "Méthode d’aperçu en direct",
	"options": {
		"auto": "auto",
		"default": "default",
		"latent2rgb": "latent2rgb",
		"none": "aucun",
		"taesd": "taesd"
	},
	"tooltip": "Méthode d’aperçu en direct pendant la génération d’image. « default » utilise le paramètre CLI du serveur."
};
var Comfy_FloatRoundingPrecision = {
	"name": "Nombre de décimales pour l'arrondi du widget flottant [0 = auto].",
	"tooltip": "(nécessite le rechargement de la page)"
};
var Comfy_Graph_AutoPanSpeed = {
	"name": "Vitesse de défilement automatique",
	"tooltip": "Vitesse maximale lors du défilement automatique en faisant glisser vers le bord du canevas. Réglez sur 0 pour désactiver le défilement automatique."
};
var Comfy_Graph_CanvasInfo = { "name": "Afficher les informations du canevas en bas à gauche (fps, etc.)" };
var Comfy_Graph_CanvasMenu = { "name": "Afficher le menu du canevas graphique" };
var Comfy_Graph_CtrlShiftZoom = { "name": "Activer le raccourci de zoom rapide (Ctrl + Shift + Glisser)" };
var Comfy_Graph_DeduplicateSubgraphNodeIds = {
	"name": "Dédupliquer les identifiants de nœuds de sous-graphe",
	"tooltip": "Réattribue automatiquement les identifiants de nœuds dupliqués dans les sous-graphes lors du chargement d’un flux de travail."
};
var Comfy_Graph_LinkMarkers = {
	"name": "Marqueurs de point médian du lien",
	"options": {
		"Arrow": "Flèche",
		"Circle": "Cercle",
		"None": "Aucun"
	}
};
var Comfy_Graph_LiveSelection = {
	"name": "Sélection en direct",
	"tooltip": "Lorsqu’elle est activée, les nœuds sont sélectionnés/désélectionnés en temps réel pendant que vous faites glisser le rectangle de sélection, comme dans d’autres outils de conception."
};
var Comfy_Graph_ZoomSpeed = { "name": "Vitesse de zoom du canevas" };
var Comfy_GroupSelectedNodes_Padding = { "name": "Marge des nœuds sélectionnés dans le groupe" };
var Comfy_Group_DoubleClickTitleToEdit = { "name": "Double-cliquer sur le titre du groupe pour le modifier" };
var Comfy_LinkRelease_Action = {
	"name": "Action lors du relâchement du lien (sans modificateur)",
	"options": {
		"context menu": "menu contextuel",
		"no action": "aucune action",
		"search box": "boîte de recherche"
	}
};
var Comfy_LinkRelease_ActionShift = {
	"name": "Action lors du relâchement du lien (Shift)",
	"options": {
		"context menu": "menu contextuel",
		"no action": "aucune action",
		"search box": "boîte de recherche"
	}
};
var Comfy_LinkRenderMode = {
	"name": "Mode de rendu du lien",
	"options": {
		"Hidden": "Caché",
		"Linear": "Linéaire",
		"Spline": "Spline",
		"Straight": "Droit"
	},
	"tooltip": "Contrôle l’apparence et la visibilité des liens de connexion entre les nœuds sur le canevas."
};
var Comfy_Load3D_3DViewerEnable = {
	"name": "Activer le visualiseur 3D (Bêta)",
	"tooltip": "Active le visualiseur 3D (Bêta) pour les nœuds sélectionnés. Cette fonctionnalité vous permet de visualiser et d’interagir avec des modèles 3D directement dans le visualiseur 3D en taille réelle."
};
var Comfy_Load3D_BackgroundColor = {
	"name": "Couleur de fond initiale",
	"tooltip": "Contrôle la couleur de fond par défaut de la scène 3D. Ce paramètre détermine l’apparence du fond lors de la création d’un nouveau widget 3D, mais peut être ajusté individuellement pour chaque widget après la création."
};
var Comfy_Load3D_CameraType = {
	"name": "Type de caméra initial",
	"options": {
		"orthographic": "orthographique",
		"perspective": "perspective"
	},
	"tooltip": "Définit si la caméra est en perspective ou orthographique par défaut lors de la création d’un nouveau widget 3D. Ce paramètre peut toujours être modifié individuellement pour chaque widget après la création."
};
var Comfy_Load3D_LightAdjustmentIncrement = {
	"name": "Incrément d’ajustement de la lumière",
	"tooltip": "Contrôle la taille de l’incrément lors de l’ajustement de l’intensité lumineuse dans les scènes 3D. Une valeur de pas plus petite permet un réglage plus précis de la lumière, tandis qu’une valeur plus grande entraîne des changements plus marqués à chaque ajustement."
};
var Comfy_Load3D_LightIntensity = {
	"name": "Intensité lumineuse initiale",
	"tooltip": "Définit le niveau de luminosité par défaut de l’éclairage dans la scène 3D. Cette valeur détermine l’intensité avec laquelle les lumières éclairent les objets lors de la création d’un nouveau widget 3D, mais peut être ajustée individuellement pour chaque widget après la création."
};
var Comfy_Load3D_LightIntensityMaximum = {
	"name": "Intensité lumineuse maximale",
	"tooltip": "Définit la valeur maximale autorisée pour l’intensité lumineuse dans les scènes 3D. Cela définit la limite supérieure de luminosité pouvant être appliquée lors de l’ajustement de l’éclairage dans n’importe quel widget 3D."
};
var Comfy_Load3D_LightIntensityMinimum = {
	"name": "Intensité lumineuse minimale",
	"tooltip": "Définit la valeur minimale autorisée pour l’intensité lumineuse dans les scènes 3D. Cela définit la limite inférieure de luminosité pouvant être appliquée lors de l’ajustement de l’éclairage dans n’importe quel widget 3D."
};
var Comfy_Load3D_PLYEngine = {
	"name": "Moteur PLY",
	"options": {
		"fastply": "fastply",
		"threejs": "threejs"
	},
	"tooltip": "Sélectionnez le moteur pour charger les fichiers PLY. « threejs » utilise le PLYLoader natif de Three.js (idéal pour les fichiers PLY de maillage). « fastply » utilise un chargeur optimisé pour les fichiers PLY de nuages de points ASCII. « sparkjs » utilise Spark.js pour les fichiers PLY de Gaussian Splatting 3D."
};
var Comfy_Load3D_ShowGrid = {
	"name": "Visibilité initiale de la grille",
	"tooltip": "Contrôle si la grille est visible par défaut lors de la création d’un nouveau widget 3D. Ce paramètre peut toujours être modifié individuellement pour chaque widget après la création."
};
var Comfy_Locale = { "name": "Langue" };
var Comfy_MaskEditor_BrushAdjustmentSpeed = {
	"name": "Multiplicateur de vitesse d'ajustement du pinceau",
	"tooltip": "Contrôle la rapidité de changement de la taille et de la dureté du pinceau lors de l'ajustement. Des valeurs plus élevées signifient des changements plus rapides."
};
var Comfy_MaskEditor_UseDominantAxis = {
	"name": "Verrouiller l'ajustement du pinceau sur l'axe dominant",
	"tooltip": "Lorsqu'il est activé, les ajustements du pinceau n'affecteront que la taille OU la dureté en fonction de la direction dans laquelle vous bougez le plus"
};
var Comfy_ModelLibrary_AutoLoadAll = {
	"name": "Charger automatiquement tous les dossiers de modèles",
	"tooltip": "Si vrai, tous les dossiers seront chargés dès que vous ouvrez la bibliothèque de modèles (cela peut causer des retards pendant le chargement). Si faux, les dossiers de modèles de niveau racine ne seront chargés que lorsque vous cliquerez dessus."
};
var Comfy_ModelLibrary_NameFormat = {
	"name": "Quel nom afficher dans l'arborescence de la bibliothèque de modèles",
	"options": {
		"filename": "nom de fichier",
		"title": "titre"
	},
	"tooltip": "Sélectionnez \"filename\" pour afficher une vue simplifiée du nom de fichier brut (sans répertoire ou extension \".safetensors\") dans la liste des modèles. Sélectionnez \"title\" pour afficher le titre configurable des métadonnées du modèle."
};
var Comfy_NodeBadge_NodeIdBadgeMode = {
	"name": "Mode de badge d'identifiant de nœud",
	"options": {
		"None": "Aucun",
		"Show all": "Afficher tout"
	}
};
var Comfy_NodeBadge_NodeLifeCycleBadgeMode = {
	"name": "Mode de badge de cycle de vie du nœud",
	"options": {
		"None": "Aucun",
		"Show all": "Afficher tout"
	}
};
var Comfy_NodeBadge_NodeSourceBadgeMode = {
	"name": "Mode de badge de source de nœud",
	"options": {
		"Hide built-in": "Cacher intégré",
		"None": "Aucun",
		"Show all": "Afficher tout"
	}
};
var Comfy_NodeBadge_ShowApiPricing = { "name": "Afficher l’insigne de tarification API du nœud" };
var Comfy_NodeLibrary_NewDesign = {
	"name": "Nouveau design de la bibliothèque de nœuds",
	"tooltip": "Activez la nouvelle barre latérale de la bibliothèque de nœuds avec des onglets (Essentiel, Tous, Personnalisé), une recherche améliorée et des aperçus au survol."
};
var Comfy_NodeReplacement_Enabled = {
	"name": "Activer le remplacement automatique des nœuds",
	"tooltip": "Lorsqu'activé, les nœuds manquants peuvent être automatiquement remplacés par leurs équivalents plus récents si une correspondance de remplacement existe."
};
var Comfy_NodeSearchBoxImpl = {
	"name": "Implémentation de la boîte de recherche de nœud",
	"options": {
		"default": "par défaut",
		"litegraph (legacy)": "litegraph (héritage)",
		"v1 (legacy)": "v1 (héritage)"
	}
};
var Comfy_NodeSearchBoxImpl_FollowCursor = {
	"name": "Les nœuds ajoutés suivent le curseur",
	"tooltip": "Lorsque cette option est activée, les nœuds ajoutés depuis la boîte de recherche suivent le curseur jusqu'à ce qu'ils soient placés par un clic. S'applique uniquement à l'implémentation par défaut."
};
var Comfy_NodeSearchBoxImpl_NodePreview = {
	"name": "Aperçu du nœud",
	"tooltip": "S'applique uniquement à l'implémentation par défaut"
};
var Comfy_NodeSearchBoxImpl_ShowCategory = {
	"name": "Afficher la catégorie de nœud dans les résultats de recherche",
	"tooltip": "S'applique uniquement à l'implémentation par défaut"
};
var Comfy_NodeSearchBoxImpl_ShowIdName = {
	"name": "Afficher le nom de l'identifiant du nœud dans les résultats de recherche",
	"tooltip": "S'applique uniquement à l'implémentation par défaut"
};
var Comfy_NodeSearchBoxImpl_ShowNodeFrequency = {
	"name": "Afficher la fréquence du nœud dans les résultats de recherche",
	"tooltip": "S'applique uniquement à l'implémentation par défaut"
};
var Comfy_NodeSuggestions_number = {
	"name": "Nombre de suggestions de nœuds",
	"tooltip": "Uniquement pour la boîte de recherche/contexte du menu litegraph"
};
var Comfy_Node_AllowImageSizeDraw = { "name": "Afficher la largeur × la hauteur sous l'aperçu de l'image" };
var Comfy_Node_AlwaysShowAdvancedWidgets = {
	"name": "Toujours afficher les widgets avancés sur tous les nœuds",
	"tooltip": "Lorsque cette option est activée, les widgets avancés sont toujours visibles sur tous les nœuds sans avoir besoin de les développer individuellement."
};
var Comfy_Node_AutoSnapLinkToSlot = {
	"name": "Lien d'ancrage automatique à l'emplacement du nœud",
	"tooltip": "Lorsque vous faites glisser un lien sur un nœud, le lien se fixe automatiquement à une fente d'entrée viable sur le nœud"
};
var Comfy_Node_BypassAllLinksOnDelete = {
	"name": "Conserver tous les liens lors de la suppression de nœuds",
	"tooltip": "Lors de la suppression d'un nœud, tentez de reconnecter tous ses liens d'entrée et de sortie (en contournant le nœud supprimé)"
};
var Comfy_Node_DoubleClickTitleToEdit = { "name": "Double-cliquez sur le titre du nœud pour le modifier" };
var Comfy_Node_MiddleClickRerouteNode = { "name": "Le clic du milieu crée un nouveau nœud de réacheminement" };
var Comfy_Node_Opacity = { "name": "Opacité du nœud" };
var Comfy_Node_ShowDeprecated = {
	"name": "Afficher les nœuds obsolètes dans la recherche",
	"tooltip": "Les nœuds obsolètes sont cachés par défaut dans l'interface utilisateur, mais restent fonctionnels dans les flux de travail existants qui les utilisent."
};
var Comfy_Node_ShowExperimental = {
	"name": "Afficher les nœuds expérimentaux dans la recherche",
	"tooltip": "Les nœuds expérimentaux sont marqués comme tels dans l'interface utilisateur et peuvent être sujets à des modifications importantes ou à une suppression dans les versions futures. À utiliser avec prudence dans les flux de travail de production"
};
var Comfy_Node_SnapHighlightsNode = {
	"name": "Le snap met en évidence le nœud",
	"tooltip": "Lorsque vous faites glisser un lien sur un nœud avec une fente d'entrée viable, mettez en évidence le nœud"
};
var Comfy_Notification_ShowVersionUpdates = {
	"name": "Afficher les mises à jour de version",
	"tooltip": "Afficher les mises à jour pour les nouveaux modèles et les nouvelles fonctionnalités majeures."
};
var Comfy_Pointer_ClickDrift = {
	"name": "Dérive du clic du pointeur (distance maximale)",
	"tooltip": "Si le pointeur se déplace plus que cette distance en maintenant un bouton enfoncé, il est considéré comme un glissement (plutôt qu'un clic).\n\nAide à prévenir que les objets soient déplacés involontairement si le pointeur est déplacé lors du clic."
};
var Comfy_Pointer_DoubleClickTime = {
	"name": "Intervalle de double clic (maximum)",
	"tooltip": "Le temps maximum en millisecondes entre les deux clics d'un double-clic. Augmenter cette valeur peut aider si les double-clics ne sont parfois pas enregistrés."
};
var Comfy_PreviewFormat = {
	"name": "Format de l'image de prévisualisation",
	"tooltip": "Lors de l'affichage d'une prévisualisation dans le widget d'image, convertissez-la en une image légère, par exemple webp, jpeg, webp;50, etc."
};
var Comfy_PromptFilename = { "name": "Demander le nom du fichier lors de l'enregistrement du flux de travail" };
var Comfy_QueueButton_BatchCountLimit = {
	"name": "Limite du nombre de lots",
	"tooltip": "Le nombre maximum de tâches ajoutées à la file d'attente en un seul clic de bouton"
};
var Comfy_Queue_MaxHistoryItems = {
	"name": "Taille de l'historique de la file d'attente",
	"tooltip": "Le nombre maximum de tâches qui s'affichent dans l'historique de la file d'attente."
};
var Comfy_Queue_QPOV2 = {
	"name": "Utiliser la file d’attente unifiée dans le panneau latéral des ressources",
	"tooltip": "Remplace le panneau flottant de la file d’attente des tâches par une file d’attente équivalente intégrée dans le panneau latéral des ressources. Vous pouvez désactiver cette option pour revenir à la disposition du panneau flottant."
};
var Comfy_RightSidePanel_ShowErrorsTab = {
	"name": "Afficher l’onglet Problèmes dans le panneau latéral",
	"tooltip": "Lorsqu’il est activé, l’onglet Problèmes s’affiche dans le panneau latéral droit pour indiquer les erreurs bloquantes et les ressources manquantes à configurer."
};
var Comfy_Sidebar_Location = {
	"name": "Emplacement de la barre latérale",
	"options": {
		"left": "gauche",
		"right": "droite"
	}
};
var Comfy_Sidebar_Size = {
	"name": "Taille de la barre latérale",
	"options": {
		"normal": "normal",
		"small": "petit"
	}
};
var Comfy_Sidebar_Style = {
	"name": "Style de la barre latérale",
	"options": {
		"connected": "Connectée",
		"floating": "Flottante"
	}
};
var Comfy_Sidebar_UnifiedWidth = { "name": "Largeur unifiée de la barre latérale" };
var Comfy_SnapToGrid_GridSize = {
	"name": "Taille de la grille d'alignement",
	"tooltip": "Lors du déplacement et du redimensionnement des nœuds tout en maintenant shift, ils seront alignés sur la grille, cela contrôle la taille de cette grille."
};
var Comfy_TextareaWidget_FontSize = { "name": "Taille de la police du widget de zone de texte" };
var Comfy_TextareaWidget_Spellcheck = { "name": "Vérification orthographique du widget de zone de texte" };
var Comfy_TreeExplorer_ItemPadding = { "name": "Espacement des éléments de l'explorateur d'arborescence" };
var Comfy_UI_TabBarLayout = {
	"name": "Disposition de la barre d’onglets",
	"options": {
		"Default": "Par défaut",
		"Legacy": "Héritage"
	},
	"tooltip": "Contrôle la disposition de la barre d’onglets. «\xA0Intégrée\xA0» déplace les contrôles Aide et Utilisateur dans la zone de la barre d’onglets."
};
var Comfy_UseNewMenu = {
	"name": "Utiliser le nouveau menu",
	"options": {
		"Disabled": "Désactivé",
		"Top": "Haut"
	},
	"tooltip": "Position de la barre de menu. Sur les appareils mobiles, le menu est toujours affiché en haut."
};
var Comfy_Validation_Workflows = { "name": "Valider les flux de travail" };
var Comfy_VueNodes_Enabled = {
	"name": "Design moderne des nœuds (nœuds Vue)",
	"tooltip": "Moderne : rendu basé sur DOM avec interactivité améliorée, fonctionnalités natives du navigateur et design visuel actualisé. Classique : rendu traditionnel sur toile."
};
var Comfy_WidgetControlMode = {
	"name": "Mode de contrôle du widget",
	"options": {
		"after": "après",
		"before": "avant"
	},
	"tooltip": "Contrôle quand les valeurs du widget sont mises à jour (randomize/increment/decrement), soit avant que l'invite ne soit mise en file d'attente, soit après."
};
var Comfy_Window_UnloadConfirmation = { "name": "Afficher une confirmation lors de la fermeture de la fenêtre" };
var Comfy_Workflow_AutoSave = {
	"name": "Auto Sauvegarde",
	"options": {
		"after delay": "après délai",
		"off": "désactivé"
	}
};
var Comfy_Workflow_AutoSaveDelay = {
	"name": "Délai de l'Auto Sauvegarde (ms)",
	"tooltip": "S'applique uniquement si l'Auto Sauvegarde est réglée sur \"après délai\"."
};
var Comfy_Workflow_ConfirmDelete = { "name": "Afficher une confirmation lors de la suppression des flux de travail" };
var Comfy_Workflow_NamedValuesRestore = { "name": "Restaurer les valeurs du widget par nom" };
var Comfy_Workflow_Persist = { "name": "Persiste l'état du flux de travail et restaure lors du (re)chargement de la page" };
var Comfy_Workflow_ShowMissingMediaWarning = {
	"name": "Afficher les médias manquants dans l’onglet Problèmes",
	"tooltip": "Lorsqu’ils sont désactivés, les images, vidéos et fichiers audio d’entrée introuvables ne sont pas répertoriés dans l’onglet Problèmes et leurs nœuds ne sont pas mis en évidence."
};
var Comfy_Workflow_ShowMissingNodesWarning = {
	"name": "Afficher les nœuds manquants dans l’onglet Problèmes",
	"tooltip": "Lorsqu’ils sont désactivés, les packs de nœuds manquants ne sont pas répertoriés dans l’onglet Problèmes et leurs nœuds ne sont pas mis en évidence. Le workflow ne peut toujours pas s’exécuter tant qu’ils ne sont pas installés."
};
var Comfy_Workflow_SortNodeIdOnSave = { "name": "Trier les ID de nœuds lors de l'enregistrement du flux de travail" };
var Comfy_Workflow_WarnBlueprintOverwrite = { "name": "Exiger une confirmation pour écraser un plan de sous-graphe existant" };
var Comfy_Workflow_WorkflowTabsPosition = {
	"name": "Position des flux de travail ouverts",
	"options": {
		"Sidebar": "Barre latérale",
		"Topbar": "Barre supérieure"
	}
};
var LiteGraph_Canvas_MaximumFps = {
	"name": "FPS maximum",
	"tooltip": "Le nombre maximum d'images par seconde que le canevas est autorisé à rendre. Limite l'utilisation du GPU au détriment de la fluidité. Si 0, le taux de rafraîchissement de l'écran est utilisé. Par défaut : 0"
};
var LiteGraph_Canvas_MinFontSizeForLOD = {
	"name": "Niveau de détail du zoom des nœuds - seuil de taille de police",
	"tooltip": "Contrôle quand les nœuds passent au rendu LOD de faible qualité. Utilise la taille de police en pixels pour déterminer quand basculer. Définir sur 0 pour désactiver. Les valeurs de 1 à 24 définissent le seuil de taille de police minimum pour le LOD - des valeurs plus élevées (24px) = basculer les nœuds vers un rendu simplifié plus tôt lors du zoom arrière, des valeurs plus faibles (1px) = maintenir la qualité complète des nœuds plus longtemps."
};
var LiteGraph_ContextMenu_Scaling = { "name": "Mise à l'échelle des menus de widgets combinés de nœuds (listes) lors du zoom" };
var LiteGraph_Group_SelectChildrenOnClick = {
	"name": "Sélectionner les éléments du groupe au clic",
	"tooltip": "Lorsque cette option est activée, cliquer sur un groupe sélectionne tous les nœuds et éléments qu’il contient"
};
var LiteGraph_Node_DefaultPadding = {
	"name": "Toujours réduire les nouveaux nœuds",
	"tooltip": "Redimensionner les nœuds à la taille minimale possible lors de leur création. Lorsque cette option est désactivée, un nœud nouvellement ajouté sera légèrement élargi pour afficher les valeurs des widgets."
};
var LiteGraph_Node_TooltipDelay = { "name": "Délai d'infobulle" };
var LiteGraph_Reroute_SplineOffset = {
	"name": "Réacheminement décalage de spline",
	"tooltip": "Le point de contrôle de Bézier est décalé par rapport au point central de réacheminement"
};
var pysssss_SnapToGrid = {
	"name": "Toujours aligner sur la grille",
	"tooltip": "Lorsque cette option est activée, les nœuds s’alignent automatiquement sur la grille lors de leur déplacement ou redimensionnement."
};
var settings_default = {
	"Comfy-Desktop_AutoUpdate": { "name": "Vérifier automatiquement les mises à jour" },
	"Comfy-Desktop_SendStatistics": { "name": "Envoyer des métriques d'utilisation anonymes" },
	"Comfy-Desktop_UV_PypiInstallMirror": {
		"name": "Miroir d'installation Pypi",
		"tooltip": "Miroir d'installation pip par défaut"
	},
	"Comfy-Desktop_UV_PythonInstallMirror": {
		"name": "Miroir d'installation Python",
		"tooltip": "Les installations Python gérées sont téléchargées depuis le projet Astral python-build-standalone. Cette variable peut être définie sur une URL de miroir pour utiliser une source différente pour les installations Python. L'URL fournie remplacera https://github.com/astral-sh/python-build-standalone/releases/download dans, par exemple, https://github.com/astral-sh/python-build-standalone/releases/download/20240713/cpython-3.12.4%2B20240713-aarch64-apple-darwin-install_only.tar.gz. Les distributions peuvent être lues à partir d'un répertoire local en utilisant le schéma d'URL file://."
	},
	"Comfy-Desktop_UV_TorchInstallMirror": {
		"name": "Miroir d'installation Torch",
		"tooltip": "Miroir d'installation Pip pour pytorch"
	},
	"Comfy-Desktop_WindowStyle": {
		"name": "Style de fenêtre",
		"options": {
			"custom": "personnalisé",
			"default": "défaut"
		},
		"tooltip": "Choisissez l'option personnalisée pour masquer la barre de titre du système"
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
