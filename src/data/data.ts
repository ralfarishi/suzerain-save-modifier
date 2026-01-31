export type FieldType = "number" | "checkbox" | "radio-group" | "boolean-date";

export interface BaseField {
	id: string;
	label: string;
	type: FieldType;
}

export interface NumberField extends BaseField {
	type: "number";
	key: string;
	min?: number;
	max?: number;
}

export interface CheckboxField extends BaseField {
	type: "checkbox";
	key: string;
}

export interface RadioOption {
	key: string;
	id: string;
	label: string;
}

export interface RadioGroupField extends BaseField {
	type: "radio-group";
	options: RadioOption[];
	// Radio groups in this app seem to map to multiple mutually exclusive boolean keys
}

export interface BooleanDateField extends BaseField {
	type: "boolean-date";
	key: string;
	dateKey: string;
	dateId: string;
}

export type GameField = NumberField | CheckboxField | RadioGroupField | BooleanDateField;

export interface Section {
	title: string;
	fields: GameField[];
}

export interface TabData {
	id: string;
	label: string;
	sections: Section[];
}

export const appData: TabData[] = [
	{
		id: "money-opinion",
		label: "Money & Opinion",
		sections: [
			{
				title: "Budget & Wealth",
				fields: [
					{
						type: "number",
						key: "BaseGame.Sordland_HUDStat_GovernmentBudget_Min",
						id: "gov-budget-min-hudstat",
						label: "Gov. Budget Min (HUD)",
						min: -20,
						max: 0,
					},
					{
						type: "number",
						key: "BaseGame.Sordland_HUDStat_GovernmentBudget_Max",
						id: "gov-budget-max-hudstat",
						label: "Gov. Budget Max (HUD)",
						min: 0,
						max: 100,
					},
					{
						type: "number",
						key: "BaseGame.GovernmentBudget",
						id: "gov-budget",
						label: "Government Budget",
						min: 0,
						max: 100,
					},
					{
						type: "number",
						key: "BaseGame.Sordland_HUDStat_PersonalWealth_Min",
						id: "personal-wealth-min-hudstat",
						label: "Personal Wealth Min (HUD)",
						min: -20,
						max: 0,
					},
					{
						type: "number",
						key: "BaseGame.Sordland_HUDStat_PersonalWealth_Max",
						id: "personal-wealth-max-hudstat",
						label: "Personal Wealth Max (HUD)",
						min: 0,
						max: 100,
					},
					{
						type: "number",
						key: "BaseGame.PersonalWealth",
						id: "personal-wealth",
						label: "Personal Wealth",
						min: 0,
						max: 100,
					},
				],
			},
			{
				title: "Public Relations",
				fields: [
					{
						type: "number",
						key: "BaseGame.Public_Opinion",
						id: "public-opinion",
						label: "Public Opinion",
						min: -50,
						max: 100,
					},
					{
						type: "number",
						key: "BaseGame.Bludish_Opinion",
						id: "bludish-opinion",
						label: "Bludish Opinion",
						min: -50,
						max: 100,
					},
					{
						type: "number",
						key: "BaseGame.Country_Unrest",
						id: "country-unrest",
						label: "Country Unrest",
						min: -50,
						max: 100,
					},
				],
			},
			{
				title: "Relationships",
				fields: [
					{
						type: "number",
						key: "BaseGame.Relations_Franc_Opinion",
						id: "frank-opinion",
						label: "Frank's Opinion",
						min: -50,
						max: 100,
					},
					{
						type: "number",
						key: "BaseGame.Relations_Monica_Opinion",
						id: "monica-opinion",
						label: "Monica's Opinion",
						min: -50,
						max: 100,
					},
					{
						type: "number",
						key: "BaseGame.Relations_Lucian_Opinion",
						id: "lucian-opinion",
						label: "Lucian's Opinion",
						min: -50,
						max: 100,
					},
					{
						type: "checkbox",
						key: "BaseGame.Relations_Deana_Loved",
						id: "deana-loved",
						label: "Deana Loved",
					},
					{
						type: "checkbox",
						key: "BaseGame.Relations_Deana_Opinion",
						id: "deana-opinion",
						label: "Deana Opinion",
					},
				],
			},
			{
				title: "Diplomacy",
				fields: [
					{
						type: "number",
						key: "BaseGame.AgnoliaTradeDeal_Negotiation",
						id: "agnolia-negotiation",
						label: "Agnolia Trade",
						min: -50,
						max: 50,
					},
					{
						type: "number",
						key: "BaseGame.WehlenTradeDeal_Negotiation",
						id: "wehlen-negotiation",
						label: "Wehlen Trade",
						min: -50,
						max: 50,
					},
					{
						type: "radio-group",
						id: "ewald-stance",
						label: "Ewald's Stance",
						options: [
							{
								key: "BaseGame.Relations_Ewald_Discontent",
								id: "ewald-discontent",
								label: "Discontent",
							},
							{
								key: "BaseGame.Relations_Ewald_Neutral",
								id: "ewald-neutral",
								label: "Neutral",
							},
							{
								key: "BaseGame.Relations_Ewald_Friendly",
								id: "ewald-friendly",
								label: "Friendly",
							},
						],
					},
				],
			},
		],
	},
	{
		id: "assembly-court",
		label: "Assembly & Court",
		sections: [
			{
				title: "Reform Voting",
				fields: [
					{
						type: "checkbox",
						key: "BaseGame.Faction_USP_AgainstProposal",
						id: "usp-against",
						label: "USP Against",
					},
					{
						type: "checkbox",
						key: "BaseGame.Faction_USP_Obstructionist",
						id: "usp-obstructionist",
						label: "USP Obstructionist",
					},
					{
						type: "checkbox",
						key: "BaseGame.Enable_Congress",
						id: "enable-congress",
						label: "Enable Congress",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_Albin_Convinced",
						id: "albin-convinced-reform",
						label: "Albin Convinced",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_Gloria_Convinced",
						id: "gloria-convinced-reform",
						label: "Gloria Convinced",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_Reform_Isabel_Convinced",
						id: "isabel-convinced-reform",
						label: "Isabel Convinced",
					},
					{
						type: "number",
						key: "BaseGame.Reform_Assembly_Vote",
						id: "assembly-vote-reform",
						label: "Assembly Vote",
						min: 0,
						max: 200,
					},
					{
						type: "number",
						key: "BaseGame.Reform_Court_Vote",
						id: "court-vote-reform",
						label: "Court Vote",
						min: 0,
						max: 8,
					},
				],
			},
		],
	},
	{
		id: "presidential-decrees",
		label: "Presidential Decrees",
		sections: [
			{
				title: "Policies",
				fields: [
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Default_AmnestyForPoliticalPrisoners",
						id: "amnesty-for-prisoners",
						label: "Prisoners Amnesty",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Default_DeSollinisation",
						id: "de-sollinisation",
						label: "Desollinisation",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Weak_FairTradeCommission",
						id: "fair-trade-commission",
						label: "Fair Trade",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Default_GenderEqualityInEducation",
						id: "gender-equality",
						label: "Gender Equality",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Default_PrivatePrisons",
						id: "private-prisons",
						label: "Private Prisons",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Default_RuralEducationInstitutes",
						id: "rural-education",
						label: "Rural Education",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Strong_CapitalPunishment",
						id: "capital-punishment",
						label: "Capital Punishment",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Strong_GunRights",
						id: "gun-rights",
						label: "Gun Rights",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Strong_PurgeGeneralStaff",
						id: "purge-general",
						label: "Purge General",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Strong_RelocationToRural",
						id: "relocate-to-rural",
						label: "Relocate to Rural",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Strong_RemoveBankIndependence",
						id: "remove-bank-independence",
						label: "Remove Bank Indep.",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Strong_RemoveReligiousSymbols",
						id: "remove-religious-symbols",
						label: "Remove Religious",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Weak_FreeMedicine",
						id: "free-medicine",
						label: "Free Medicine",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Weak_LowerRetirementAge",
						id: "lower-retirement-age",
						label: "Lower Retirement",
					},
					{
						type: "checkbox",
						key: "BaseGame.Reform_PresiPower_Weak_SordishRadioTVCouncil",
						id: "sordish-media-controll",
						label: "Sordish Media",
					},
				],
			},
			{
				title: "Media Control",
				fields: [
					{
						type: "radio-group",
						id: "sordish-media",
						label: "Media Control",
						options: [
							{
								key: "BaseGame.Reform_PresiPower_Weak_SordishRadioTVCouncil_Controlled",
								id: "media-controlled",
								label: "Controlled",
							},
							{
								key: "BaseGame.Reform_PresiPower_Weak_SordishRadioTVCouncil_Independent",
								id: "media-independent",
								label: "Independent",
							},
						],
					},
				],
			},
		],
	},
	{
		id: "economy",
		label: "Economy",
		sections: [
			{
				title: "Overview",
				fields: [
					{
						type: "number",
						key: "BaseGame.TradeAmount",
						id: "trade-amount",
						label: "Trade Amount",
						min: 0,
						max: 100,
					},
					{
						type: "number",
						key: "BaseGame.EconomicReliance",
						id: "economic-reliance",
						label: "Economic Reliance",
						min: 0,
						max: 100,
					},
					{
						type: "checkbox",
						key: "BaseGame.SuperpowerTradeWarHappened",
						id: "superpower-trade-war",
						label: "Superpower Trade War",
					},
					{
						type: "checkbox",
						key: "BaseGame.BlackTuesdayHappened",
						id: "black-tuesday",
						label: "Black Tuesday",
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_MarketsCrash",
						id: "markets-crash",
						label: "Markets Crash",
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_GlobalTradeWar",
						id: "global-trade-war",
						label: "Global Trade War",
					},
				],
			},
			{
				title: "Regional Investment",
				fields: [
					{
						type: "checkbox",
						key: "BaseGame.Policy_Economy_RegionalInvestment_Lorren",
						id: "lorren-reginvest-policy",
						label: "Lorren Investment",
					},
					{
						type: "checkbox",
						key: "BaseGame.Policy_Economy_RegionalInvestment_Bergia",
						id: "bergia-reginvest-policy",
						label: "Bergia Investment",
					},
					{
						type: "checkbox",
						key: "BaseGame.Policy_Economy_RegionalInvestment_Agnland",
						id: "agnland-reginvest-policy",
						label: "Agnland Investment",
					},
					{
						type: "checkbox",
						key: "BaseGame.Policy_Economy_RegionalInvestment_Gruni",
						id: "gruni-reginvest-policy",
						label: "Gruni Investment",
					},
				],
			},
			{
				title: "Regional Economies",
				fields: [
					{
						type: "number",
						key: "BaseGame.Economy_Agnland",
						id: "economy-agnland",
						label: "Agnland",
						min: -50,
						max: 50,
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Agnland_MajorFishExport",
						id: "agnland-fish-export",
						label: "Fish Export",
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Agnland_EconomicStabilisation",
						id: "agnland-economic-stabilisation",
						label: "Stable",
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Agnland_LackInvestment",
						id: "agnland-lack-investment",
						label: "Lack Invest",
					},
					{
						type: "number",
						key: "BaseGame.Economy_Bergia",
						id: "economy-bergia",
						label: "Bergia",
						min: -50,
						max: 50,
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Bergia_MajorAgriculturalZone",
						id: "bergia-agriculture-zone",
						label: "Agri Zone",
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Bergia_EconomicStabilisation",
						id: "bergia-economic-stabilisation",
						label: "Stable",
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Bergia_EconomicDownturn",
						id: "bergia-economic-downturn",
						label: "Downturn",
					},
					{
						type: "number",
						key: "BaseGame.Economy_Lorren",
						id: "economy-lorren",
						label: "Lorren",
						min: -50,
						max: 50,
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Lorren_ProductionAndTradeCenter",
						id: "lorren-production-trade-center",
						label: "Trade Center",
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Lorren_EconomicStabilisation",
						id: "lorren-economic-stabilisation",
						label: "Stable",
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Lorren_RustBelt",
						id: "lorren-rustbelt",
						label: "Rust Belt",
					},
					{
						type: "number",
						key: "BaseGame.Economy_Gruni",
						id: "economy-gruni",
						label: "Gruni",
						min: -50,
						max: 50,
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Gruni_LightTowerRegion",
						id: "gruni-light-tower",
						label: "Light Tower",
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Gruni_LaggingBehind",
						id: "gruni-lagging-behind",
						label: "Lagging",
					},
					{
						type: "checkbox",
						key: "BaseGame.Situation_Economy_Gruni_MaintainingGrowth",
						id: "gruni-maintaining-growth",
						label: "Growth",
					},
				],
			},
			{
				title: "Economic Situations",
				fields: [
					{
						type: "radio-group",
						id: "gasom-industry",
						label: "Gasom Industry",
						options: [
							{
								key: "BaseGame.Gasom_Booming",
								id: "gasom-booming",
								label: "Gasom Booming",
							},
							{
								key: "BaseGame.Gasom_Downsized",
								id: "gasom-downsized",
								label: "Gasom Downsized",
							},
							{
								key: "BaseGame.Gasom_Bankrupt",
								id: "gasom-bankrupt",
								label: "Gasom Bankrupt",
							},
						],
					},
					{
						type: "radio-group",
						id: "transport-situations",
						label: "Transport",
						options: [
							{
								key: "BaseGame.Situation_Economy_ImprovedTransportation",
								id: "improved-transport",
								label: "Transport Improved",
							},
							{
								key: "BaseGame.Situation_Economy_WeakTransportation",
								id: "weak-transport",
								label: "Transport Weak",
							},
						],
					},
					{
						type: "radio-group",
						id: "tourism-situations",
						label: "Tourism",
						options: [
							{
								key: "BaseGame.Situation_Economy_Tourism_Declining",
								id: "tourism-decline",
								label: "Tourism Declining",
							},
							{
								key: "BaseGame.Situation_Economy_Tourism_Booming",
								id: "tourism-booming",
								label: "Tourism Booming",
							},
							{
								key: "BaseGame.Situation_Economy_Tourism_Average",
								id: "tourism-average",
								label: "Tourism Average",
							},
						],
					},
					{
						type: "radio-group",
						id: "trade-situations",
						label: "Trade",
						options: [
							{
								key: "BaseGame.Situation_Economy_DecreasedTrade",
								id: "trade-decreased",
								label: "Trade Decreased",
							},
							{
								key: "BaseGame.Situation_Economy_IncreasedTrade",
								id: "trade-increased",
								label: "Trade Increased",
							},
						],
					},
					{
						type: "radio-group",
						id: "employment-situations",
						label: "Employment",
						options: [
							{
								key: "BaseGame.Situation_Economy_HighEmployment",
								id: "high-employment",
								label: "High Employment",
							},
							{
								key: "BaseGame.Situation_Economy_UnemploymentCrisis",
								id: "unemployment-crisis",
								label: "Unemployment Crisis",
							},
						],
					},
					{
						type: "radio-group",
						id: "tax-situations",
						label: "Taxes",
						options: [
							{
								key: "BaseGame.Situation_Economy_TaxEfficientEconomy",
								id: "tax-efficient",
								label: "Tax Efficient",
							},
							{
								key: "BaseGame.Situation_Economy_TaxAvoidance",
								id: "tax-avoidance",
								label: "Tax Avoidance",
							},
							{
								key: "BaseGame.Situation_Economy_TaxEvasion",
								id: "tax-evasion",
								label: "Tax Evasion",
							},
						],
					},
				],
			},
		],
	},
	{
		id: "game-condition",
		label: "Game Condition",
		sections: [
			{
				title: "Turn 1",
				fields: [
					{
						type: "radio-group",
						id: "infrastructure-project",
						label: "Infrastructure Project",
						options: [
							{
								key: "BaseGame.Turn01_InT_Investment_Railway",
								id: "railway-project",
								label: "L-1 Railway",
							},
							{
								key: "BaseGame.Turn01_InT_Investment_Highway",
								id: "highway-project",
								label: "H-3 Highway",
							},
						],
					},
				],
			},
			{
				title: "Turn 4",
				fields: [
					{
						type: "checkbox",
						key: "GameCondition.Turn04_A_Convince_Gloria",
						id: "convince-gloria",
						label: "Convince Gloria",
					},
					{
						type: "checkbox",
						key: "GameCondition.Turn04_A_Convince_Albin",
						id: "convince-albin",
						label: "Convince Albin",
					},
				],
			},
			{
				title: "Turn 6",
				fields: [
					{
						type: "radio-group",
						id: "military-expansion",
						label: "Military Expansion",
						options: [
							{
								key: "BaseGame.Turn06_SnO_Expansion_Army",
								id: "army-expansion",
								label: "Army Expansion",
							},
							{
								key: "BaseGame.Turn06_SnO_Expansion_Navy",
								id: "navy-expansion",
								label: "Navy Expansion",
							},
							{
								key: "BaseGame.Turn06_SnO_Expansion_Airforce",
								id: "airforce-expansion",
								label: "Airforce Expansion",
							},
						],
					},
					{
						type: "radio-group",
						id: "military-modernisation",
						label: "Military Modernisation",
						options: [
							{
								key: "BaseGame.Turn06_SnO_Modernisation_Army",
								id: "army-modernisation",
								label: "Army Modernisation",
							},
							{
								key: "BaseGame.Turn06_SnO_Modernisation_Navy",
								id: "navy-modernisation",
								label: "Navy Modernisation",
							},
							{
								key: "BaseGame.Turn06_SnO_Modernisation_Airforce",
								id: "airforce-modernisation",
								label: "Airforce Modernisation",
							},
						],
					},
				],
			},
			{
				title: "Turn 7",
				fields: [
					{
						type: "checkbox",
						key: "GameCondition.Turn07_A_ConvinceIsabel",
						id: "convince-isabel",
						label: "Convince Isabel",
					},
					{
						type: "number",
						key: "BaseGameIsolated.Turn07_A_Isabel_Opinion",
						id: "isabel-opinion",
						label: "Isabel Opinion",
						min: -10,
						max: 50,
					},
					{
						type: "checkbox",
						key: "GameCondition.Turn07_A_ConvinceHeron",
						id: "convince-heron",
						label: "Convince Heron",
					},
				],
			},
			{
				title: "Turn 10",
				fields: [
					{
						type: "checkbox",
						key: "GameCondition.Turn10_A_Congress",
						id: "a-congress",
						label: "Congress",
					},
					{
						type: "number",
						key: "BaseGameIsolated.Turn10_A_NumberOfResignations",
						id: "resignations-number",
						label: "Resignations",
						min: 0,
						max: 8,
					},
					{
						type: "checkbox",
						key: "GameCondition.Turn10_SnO_RumburgWarPlans",
						id: "rumburg-war-plans",
						label: "Rumburg War Plans",
					},
					{
						type: "checkbox",
						key: "GameCondition.Turn10_SnO_RumburgWarSpeech",
						id: "rumburg-war-speech",
						label: "Rumburg War Speech",
					},
				],
			},
			{
				title: "Turn 11",
				fields: [
					{
						type: "radio-group",
						id: "rumburg-war",
						label: "Rumburg War",
						options: [
							{
								key: "GameCondition.Turn11_SnO_RumburgWarLost",
								id: "rumburg-war-lost",
								label: "War Lost",
							},
							{
								key: "GameCondition.Turn11_SnO_RumburgWarWin",
								id: "rumburg-war-win",
								label: "War Won",
							},
						],
					},
					{
						type: "checkbox",
						key: "GameCondition.Turn11_SnO_WorldWar",
						id: "world-war",
						label: "World War",
					},
					{
						type: "checkbox",
						key: "GameCondition.Turn11_SnO_CoupTrial",
						id: "coup-d-etat",
						label: "Coup d'Etat",
					},
				],
			},
		],
	},
	{
		id: "items",
		label: "Collectibles",
		sections: [
			{
				title: "Collectibles",
				fields: [
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_AnricaTrophy",
						id: "anrica-trophy",
						label: "Anrica Trophy",
						dateKey: "BaseGameSupport.CollectionItem_AnricaTrophy_Date",
						dateId: "anrica-trophy-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_ArmadineRadio",
						id: "armandine-radio",
						label: "Armadine Radio",
						dateKey: "BaseGameSupport.CollectionItem_ArmadineRadio_Date",
						dateId: "armandine-radio-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_AschrafCandle",
						id: "aschraf-candle",
						label: "Aschraf Candle",
						dateKey: "BaseGameSupport.CollectionItem_AschrafCandle_Date",
						dateId: "aschraf-candle-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_CarKey",
						id: "car-key",
						label: "Car Key",
						dateKey: "BaseGameSupport.CollectionItem_CarKey_Date",
						dateId: "car-key-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_CeremonialScissors",
						id: "ceremonial-scissors",
						label: "Ceremonial Scissors",
						dateKey: "BaseGameSupport.CollectionItem_CeremonialScissors_Date",
						dateId: "ceremonial-scissors-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_CigarBox",
						id: "cigar-box",
						label: "Cigar Box",
						dateKey: "BaseGameSupport.CollectionItem_CigarBox_Date",
						dateId: "cigar-box-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_Dagger",
						id: "dagger",
						label: "Dagger",
						dateKey: "BaseGameSupport.CollectionItem_Dagger_Date",
						dateId: "dagger-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_GoatStatue",
						id: "goat-statue",
						label: "Goat Statue",
						dateKey: "BaseGameSupport.CollectionItem_GoatStatue_Date",
						dateId: "goat-statue-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_Gun",
						id: "gun",
						label: "Gun",
						dateKey: "BaseGameSupport.CollectionItem_Gun_Date",
						dateId: "gun-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_Headphones",
						id: "headphones",
						label: "Headphones",
						dateKey: "BaseGameSupport.CollectionItem_Headphones_Date",
						dateId: "headphones-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_KesaroLighter",
						id: "kesaro-lighter",
						label: "Kesaro Lighter",
						dateKey: "BaseGameSupport.CollectionItem_KesaroLighter_Date",
						dateId: "kesaro-lighter-date",
					},

					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_PhotoFrameTorn",
						id: "photo-frame",
						label: "Photo Frame",
						dateKey: "BaseGameSupport.CollectionItem_PhotoFrameTorn_Date",
						dateId: "photo-frame-date",
					},

					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_Pocketwatch",
						id: "pocket-watch",
						label: "Pocket Watch",
						dateKey: "BaseGameSupport.CollectionItem_Pocketwatch_Date",
						dateId: "pocket-watch-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_PoemBook",
						id: "poem-book",
						label: "Poem Book",
						dateKey: "BaseGameSupport.CollectionItem_PoemBook_Date",
						dateId: "poem-book-date",
					},

					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_UnderhallTrophy",
						id: "underhall-trophy",
						label: "Underhall Trophy",
						dateKey: "BaseGameSupport.CollectionItem_UnderhallTrophy_Date",
						dateId: "underhall-trophy-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_USPBrooch",
						id: "usp-brooch",
						label: "USP Brooch",
						dateKey: "BaseGameSupport.CollectionItem_USPBrooch_Date",
						dateId: "usp-brooch-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_WhiskeyBottle",
						id: "whiskey-bottle",
						label: "Whiskey Bottle",
						dateKey: "BaseGameSupport.CollectionItem_WhiskeyBottle_Date",
						dateId: "whiskey-bottle-date",
					},
					{
						type: "boolean-date",
						key: "BaseGameSupport.CollectionItem_WineBottle",
						id: "wine-bottle",
						label: "Wine Bottle",
						dateKey: "BaseGameSupport.CollectionItem_WineBottle_Date",
						dateId: "wine-bottle-date",
					},
				],
			},
		],
	},
	{
		id: "rizia",
		label: "Rizia DLC",
		sections: [
			{
				title: "Resources",
				fields: [
					{
						type: "number",
						key: "RiziaDLC.Rizia_HUDStat_Budget_Min",
						id: "rizia-hudstat-budget-min",
						label: "Budget Min (HUD)",
						min: -20,
						max: 0,
					},
					{
						type: "number",
						key: "RiziaDLC.Rizia_HUDStat_Budget_Max",
						id: "rizia-hudstat-budget-max",
						label: "Budget Max (HUD)",
						min: -20,
						max: 800,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Authority",
						id: "rizia-resources-authority",
						label: "Resources Authority",
						min: -20,
						max: 800,
					},
					{
						type: "number",
						key: "RiziaDLC.Rizia_HUDStat_Authority_Min",
						id: "rizia-hudstat-authority-min",
						label: "Authority Min (HUD)",
						min: -20,
						max: 0,
					},
					{
						type: "number",
						key: "RiziaDLC.Rizia_HUDStat_Authority_Max",
						id: "rizia-hudstat-authority-max",
						label: "Authority Max (HUD)",
						min: -20,
						max: 800,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Energy",
						id: "rizia-resources-energy",
						label: "Resources Energy",
						min: -20,
						max: 800,
					},
					{
						type: "number",
						key: "RiziaDLC.Rizia_HUDStat_Energy_Min",
						id: "rizia-hudstat-energy-min",
						label: "Energy Min (HUD)",
						min: -20,
						max: 0,
					},
					{
						type: "number",
						key: "RiziaDLC.Rizia_HUDStat_Energy_Max",
						id: "rizia-hudstat-energy-max",
						label: "Energy Max (HUD)",
						min: -20,
						max: 800,
					},
				],
			},
		],
	},
	{
		id: "rizia-military-unit",
		label: "Rizia Military",
		sections: [
			{
				title: "Military Capability",
				fields: [
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_AirStrikeRefillPerFragment",
						id: "rizia-airstrike-refill",
						label: "Air Strike Refill",
						min: 0,
						max: 250,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_AirSupportRefillPerFragment",
						id: "rizia-airsupport-refill",
						label: "Air Support Refill",
						min: 0,
						max: 250,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_NavalBombardmentCapability",
						id: "rizia-naval-bombardment",
						label: "Naval Bombardment",
						min: 0,
						max: 250,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_AirStrikeCooldown",
						id: "rizia-airstike-cooldown",
						label: "Air Strike Cooldown",
						min: -2,
						max: 10,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_AirSupportCooldown",
						id: "rizia-airsupport-cooldown",
						label: "Air Support Cooldown",
						min: -2,
						max: 10,
					},
					{
						type: "number",
						key: "RiziaDLC.War_ActionPoints",
						id: "rizia-war-action-points",
						label: "War Action Points",
						min: 0,
						max: 50,
					},
				],
			},
			{
				title: "Resources (Pre-Training)",
				fields: [
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_Manpower",
						id: "rizia-military-manpower",
						label: "Manpower",
						min: 0,
						max: 12000,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_Equipment",
						id: "rizia-military-equipment",
						label: "Equipment",
						min: 0,
						max: 12000,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_Trucks",
						id: "rizia-military-trucks",
						label: "Trucks",
						min: 0,
						max: 12000,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_Tanks",
						id: "rizia-military-tanks",
						label: "Tanks",
						min: 0,
						max: 12000,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_Ships",
						id: "rizia-military-ships",
						label: "Ships",
						min: 0,
						max: 12000,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_Submarines",
						id: "rizia-military-submarines",
						label: "Submarines",
						min: 0,
						max: 12000,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_BomberPlanes",
						id: "rizia-military-bomber-planes",
						label: "Bomber Planes",
						min: 0,
						max: 12000,
					},
					{
						type: "number",
						key: "RiziaDLC.Resources_Military_FighterPlanes",
						id: "rizia-military-fighter-planes",
						label: "Fighter Planes",
						min: 0,
						max: 12000,
					},
				],
			},
			{
				title: "Unit Total (Post-Training)",
				fields: [
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Infantry_Total",
						id: "rizia-military-infantry-total",
						label: "Infantry Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Support_Total",
						id: "rizia-military-support-total",
						label: "Support Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Tank_Total",
						id: "rizia-military-tank-total",
						label: "Tank Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Ship_Total",
						id: "rizia-military-ship-total",
						label: "Ship Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Paratrooper_Total",
						id: "rizia-military-paratrooper-total",
						label: "Paratrooper Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Mercenary_Total",
						id: "rizia-military-mercenary-total",
						label: "Mercenary Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Azaro_Total",
						id: "rizia-military-azaro-total",
						label: "Azaro Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Sazon_Total",
						id: "rizia-military-sazon-total",
						label: "Sazon Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_GoldenGuard_Total",
						id: "rizia-military-golden-guard-total",
						label: "Golden Guard Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Mountaineer_Total",
						id: "rizia-military-mountaineer-total",
						label: "Mountaineer Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Militia_Total",
						id: "rizia-military-militia-total",
						label: "Militia Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Fighter_Total",
						id: "rizia-military-fighter-total",
						label: "Fighter Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Submarine_Total",
						id: "rizia-military-submarine-total",
						label: "Submarine Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Flagship_Total",
						id: "rizia-military-flagship-total",
						label: "Flagship Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Marine_Total",
						id: "rizia-military-marine-total",
						label: "Marine Total",
						min: 0,
						max: 300,
					},
					{
						type: "number",
						key: "RiziaDLC.Army_Unit_Bomber_Total",
						id: "rizia-military-bomber-total",
						label: "Bomber Total",
						min: 0,
						max: 300,
					},
				],
			},
		],
	},
];
