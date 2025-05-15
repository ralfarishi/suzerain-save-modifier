export const dataMappings = [
	{
		type: "number",
		key: "BaseGame.Sordland_HUDStat_GovernmentBudget_Min",
		id: "gov-budget-min-hudstat",
		min: -20,
		max: 0,
	},
	{
		type: "number",
		key: "BaseGame.Sordland_HUDStat_GovernmentBudget_Max",
		id: "gov-budget-max-hudstat",
		min: 0,
		max: 50,
	},
	{
		type: "number",
		key: "BaseGame.GovernmentBudget",
		id: "gov-budget",
		min: 0,
		max: 50,
	},
	{
		type: "number",
		key: "BaseGame.PersonalWealth",
		id: "personal-wealth",
		min: 0,
		max: 50,
	},
	{
		type: "number",
		key: "BaseGame.Sordland_HUDStat_PersonalWealth_Min",
		id: "personal-wealth-min-hudstat",
		min: -20,
		max: 0,
	},
	{
		type: "number",
		key: "BaseGame.Sordland_HUDStat_PersonalWealth_Max",
		id: "personal-wealth-max-hudstat",
		min: 0,
		max: 50,
	},
	{
		type: "number",
		key: "BaseGame.Public_Opinion",
		id: "public-opinion",
		min: -50,
		max: 100,
	},
	{
		type: "number",
		key: "BaseGame.Bludish_Opinion",
		id: "bludish-opinion",
		min: -50,
		max: 100,
	},
	{
		type: "number",
		key: "BaseGame.Country_Unrest",
		id: "country-unrest",
		min: -50,
		max: 100,
	},
	{
		type: "number",
		key: "BaseGame.Relations_Franc_Opinion",
		id: "frank-opinion",
		min: -50,
		max: 100,
	},
	{
		type: "number",
		key: "BaseGame.Relations_Monica_Opinion",
		id: "monica-opinion",
		min: -50,
		max: 100,
	},
	{
		type: "number",
		key: "BaseGame.Relations_Lucian_Opinion",
		id: "lucian-opinion",
		min: -50,
		max: 100,
	},
	{
		type: "checkbox",
		key: "BaseGame.Relations_Deana_Loved",
		id: "deana-loved",
	},
	{
		type: "checkbox",
		key: "BaseGame.Relations_Deana_Opinion",
		id: "deana-opinion",
	},
	{
		type: "number",
		key: "BaseGame.AgnoliaTradeDeal_Negotiation",
		id: "agnolia-negotiation",
		min: -50,
		max: 50,
	},
	{
		type: "number",
		key: "BaseGame.WehlenTradeDeal_Negotiation",
		id: "wehlen-negotiation",
		min: -50,
		max: 50,
	},
	{
		type: "radio-group",
		id: "ewald-stance",
		options: [
			{
				label: "Discontent",
				key: "BaseGame.Relations_Ewald_Discontent",
				id: "ewald-discontent",
			},
			{
				label: "Neutral",
				key: "BaseGame.Relations_Ewald_Neutral",
				id: "ewald-neutral",
			},
			{
				label: "Friendly",
				key: "BaseGame.Relations_Ewald_Friendly",
				id: "ewald-friendly",
			},
		],
	},
	// ASSEMBLY & COURT
	{
		type: "checkbox",
		key: "BaseGame.Faction_USP_AgainstProposal",
		id: "usp-against",
	},
	{
		type: "checkbox",
		key: "BaseGame.Reform_Albin_Convinced",
		id: "albin-convinced-reform",
	},

	{
		type: "checkbox",
		key: "BaseGame.Reform_Gloria_Convinced",
		id: "gloria-convinced-reform",
	},
	{
		type: "number",
		key: "BaseGame.Reform_Assembly_Vote",
		id: "assembly-vote-reform",
		min: 0,
		max: 200,
	},
	{
		type: "checkbox",
		key: "BaseGame.Reform_Reform_Isabel_Convinced",
		id: "isabel-convinced-reform",
	},
	{
		type: "number",
		key: "BaseGame.Reform_Court_Vote",
		id: "court-vote-reform",
		min: 0,
		max: 8,
	},
	// ECONOMY
	//
	//
	//
	{
		type: "checkbox",
		key: "BaseGame.SuperpowerTradeWarHappened",
		id: "superpower-trade-war",
	},
	{
		type: "checkbox",
		key: "BaseGame.BlackTuesdayHappened",
		id: "black-tuesday",
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_MarketsCrash",
		id: "markets-crash",
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_GlobalTradeWar",
		id: "global-trade-war",
	},
	{
		type: "number",
		key: "BaseGame.Economy_Agnland",
		id: "economy-angland",
		min: -50,
		max: 50,
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Agnland_MajorFishExport",
		id: "angland-fish-export",
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Agnland_EconomicStabilisation",
		id: "angland-economic-stabilisation",
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Agnland_LackInvestment",
		id: "angland-lack-investment",
	},
	{
		type: "number",
		key: "BaseGame.Economy_Bergia",
		id: "economy-bergia",
		min: -50,
		max: 50,
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Bergia_MajorAgriculturalZone",
		id: "bergia-agriculture-zone",
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Bergia_EconomicStabilisation",
		id: "bergia-economic-stabilisation",
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Bergia_EconomicDownturn",
		id: "bergia-economic-downturn",
	},
	{
		type: "number",
		key: "BaseGame.Economy_Lorren",
		id: "economy-lorren",
		min: -50,
		max: 50,
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Lorren_ProductionAndTradeCenter",
		id: "lorren-production-trade-center",
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Lorren_EconomicStabilisation",
		id: "lorren-economic-stabilisation",
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Lorren_RustBelt",
		id: "lorren-rustbelt",
	},
	{
		type: "number",
		key: "BaseGame.Economy_Gruni",
		id: "economy-gruni",
		min: -50,
		max: 50,
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Gruni_LightTowerRegion",
		id: "gruni-light-tower",
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Gruni_LaggingBehind",
		id: "gruni-lagging-behind",
	},
	{
		type: "checkbox",
		key: "BaseGame.Situation_Economy_Gruni_MaintainingGrowth",
		id: "gruni-maintaining-growth",
	},
	{
		type: "radio-group",
		id: "gasom-industry",
		options: [
			{
				label: "Booming",
				key: "BaseGame.Gasom_Booming",
				id: "gasom-booming",
			},
			{
				label: "Downsized",
				key: "BaseGame.Gasom_Downsized",
				id: "gasom-downsized",
			},
			{
				label: "Bankrupt",
				key: "BaseGame.Gasom_Bankrupt",
				id: "gasom-bankrupt",
			},
		],
	},
	{
		type: "radio-group",
		id: "transport-situation",
		options: [
			{
				label: "Improved",
				key: "BaseGame.Situation_Economy_ImprovedTransportation",
				id: "improved-transport",
			},
			{
				label: "Weak",
				key: "BaseGame.Situation_Economy_WeakTransportation",
				id: "weak-transport",
			},
		],
	},
	{
		type: "radio-group",
		id: "tourism-situation",
		options: [
			{
				label: "Declining",
				key: "BaseGame.Situation_Economy_Tourism_Declining",
				id: "tourism-decline",
			},
			{
				label: "Booming",
				key: "BaseGame.Situation_Economy_Tourism_Booming",
				id: "tourism-booming",
			},
			{
				label: "Average",
				key: "BaseGame.Situation_Economy_Tourism_Average",
				id: "tourism-average",
			},
		],
	},
	{
		type: "radio-group",
		id: "trade-situation",
		options: [
			{
				label: "Decreased",
				key: "BaseGame.Situation_Economy_DecreasedTrade",
				id: "trade-decreased",
			},
			{
				label: "Increased",
				key: "BaseGame.Situation_Economy_IncreasedTrade",
				id: "trade-increased",
			},
		],
	},

	// GAME CONDITION
	{
		type: "radio-group",
		id: "infrastructure-project",
		options: [
			{
				label: "Railway",
				key: "BaseGame.Turn01_InT_Investment_Railway",
				id: "railway-project",
			},
			{
				label: "Highway",
				key: "BaseGame.Turn01_InT_Investment_Highway",
				id: "highway-project",
			},
		],
	},
	{
		type: "checkbox",
		key: "GameCondition.Turn04_A_Convince_Gloria",
		id: "convince-gloria",
	},
	{
		type: "checkbox",
		key: "GameCondition.Turn04_A_Convince_Albin",
		id: "convince-albin",
	},
	{
		type: "checkbox",
		key: "GameCondition.Turn07_A_ConvinceIsabel",
		id: "convince-isabel",
	},
	{
		type: "number",
		key: "BaseGameIsolated.Turn07_A_Isabel_Opinion",
		id: "isabel-opinion",
		min: 0,
		max: 50,
	},
	{
		type: "checkbox",
		key: "GameCondition.Turn07_A_ConvinceHeron",
		id: "convince-heron",
	},
	{
		type: "radio-group",
		id: "military-expansion",
		options: [
			{
				label: "Army",
				key: "BaseGame.Turn06_SnO_Expansion_Army",
				id: "army-expansion",
			},
			{
				label: "Navy",
				key: "BaseGame.Turn06_SnO_Expansion_Navy",
				id: "navy-expansion",
			},
			{
				label: "Airforce",
				key: "BaseGame.Turn06_SnO_Expansion_Airforce",
				id: "airforce-expansion",
			},
		],
	},
	{
		type: "radio-group",
		id: "military-modernisation",
		options: [
			{
				label: "Army",
				key: "BaseGame.Turn06_SnO_Modernisation_Army",
				id: "army-modernisation",
			},
			{
				label: "Navy",
				key: "BaseGame.Turn06_SnO_Modernisation_Navy",
				id: "navy-modernisation",
			},
			{
				label: "Airforce",
				key: "BaseGame.Turn06_SnO_Modernisation_Airforce",
				id: "airforce-modernisation",
			},
		],
	},
	{
		type: "number",
		key: "BaseGameIsolated.Turn10_A_NumberOfResignations",
		id: "resignations-number",
		min: 0,
		max: 8,
	},
	{
		type: "checkbox",
		key: "GameCondition.Turn10_SnO_RumburgWarPlans",
		id: "rumburg-war-plans",
	},
	{
		type: "checkbox",
		key: "GameCondition.Turn10_SnO_RumburgWarSpeech",
		id: "rumburg-war-speech",
	},
	{
		type: "radio-group",
		id: "rumburg-war",
		options: [
			{
				label: "Rumburg War Lost",
				key: "GameCondition.Turn11_SnO_RumburgWarLost",
				id: "rumburg-war-lost",
			},
			{
				label: "Rumburg War Win",
				key: "GameCondition.Turn11_SnO_RumburgWarWin",
				id: "rumburg-war-win",
			},
		],
	},
	{
		type: "checkbox",
		key: "GameCondition.Turn11_SnO_WorldWar",
		id: "world-war",
	},
	{
		type: "checkbox",
		key: "GameCondition.Turn11_SnO_CoupTrial",
		id: "coup-d-etat",
	},
	// Collectible Item
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_AnricaTrophy",
		id: "anrica-trophy",
		dateKey: "BaseGameSupport.CollectionItem_AnricaTrophy_Date",
		dateId: "anrica-trophy-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_ArmadineRadio",
		id: "armandine-radio",
		dateKey: "BaseGameSupport.CollectionItem_ArmadineRadio_Date",
		dateId: "armandine-radio-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_AschrafCandle",
		id: "aschraf-candle",
		dateKey: "BaseGameSupport.CollectionItem_AschrafCandle_Date",
		dateId: "aschraf-candle-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_CarKey",
		id: "car-key",
		dateKey: "BaseGameSupport.CollectionItem_CarKey_Date",
		dateId: "car-key-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_CeremonialScissors",
		id: "ceremonial-scissors",
		dateKey: "BaseGameSupport.CollectionItem_CeremonialScissors_Date",
		dateId: "ceremonial-scissors-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_CigarBox",
		id: "cigar-box",
		dateKey: "BaseGameSupport.CollectionItem_CigarBox_Date",
		dateId: "cigar-box-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_Dagger",
		id: "dagger",
		dateKey: "BaseGameSupport.CollectionItem_Dagger_Date",
		dateId: "dagger-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_GoatStatue",
		id: "goat-statue",
		dateKey: "BaseGameSupport.CollectionItem_GoatStatue_Date",
		dateId: "goat-statue-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_Gun",
		id: "gun",
		dateKey: "BaseGameSupport.CollectionItem_Gun_Date",
		dateId: "gun-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_Headphones",
		id: "headphones",
		dateKey: "BaseGameSupport.CollectionItem_Headphones_Date",
		dateId: "headphones-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_KesaroLighter",
		id: "kesaro-lighter",
		dateKey: "BaseGameSupport.CollectionItem_KesaroLighter_Date",
		dateId: "kesaro-lighter-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_PhotoFrameTorn",
		id: "photo-frame",
		dateKey: "BaseGameSupport.CollectionItem_PhotoFrameTorn_Date",
		dateId: "photo-frame-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_Pocketwatch",
		id: "pocket-watch",
		dateKey: "BaseGameSupport.CollectionItem_Pocketwatch_Date",
		dateId: "pocket-watch-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_PoemBook",
		id: "poem-book",
		dateKey: "BaseGameSupport.CollectionItem_PoemBook_Date",
		dateId: "poem-book-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_UnderhallTrophy",
		id: "underhall-trophy",
		dateKey: "BaseGameSupport.CollectionItem_UnderhallTrophy_Date",
		dateId: "underhall-trophy-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_USPBrooch",
		id: "usp-brooch",
		dateKey: "BaseGameSupport.CollectionItem_USPBrooch_Date",
		dateId: "usp-brooch-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_WhiskeyBottle",
		id: "whiskey-bottle",
		dateKey: "BaseGameSupport.CollectionItem_WhiskeyBottle_Date",
		dateId: "whiskey-bottle-date",
	},
	{
		type: "boolean-date",
		key: "BaseGameSupport.CollectionItem_WineBottle",
		id: "wine-bottle",
		dateKey: "BaseGameSupport.CollectionItem_WineBottle_Date",
		dateId: "wine-bottle-date",
	},
];
