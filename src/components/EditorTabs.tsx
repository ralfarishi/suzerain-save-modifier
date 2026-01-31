import { TabData } from "../data/data";

interface EditorTabsProps {
	tabs: TabData[];
	activeTabId: string;
	onTabChange: (id: string) => void;
	errorCounts?: Record<string, number>;
}

export function EditorTabs({ tabs, activeTabId, onTabChange, errorCounts = {} }: EditorTabsProps) {
	return (
		<div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => onTabChange(tab.id)}
					className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 inline-flex items-center justify-center gap-2
            ${
							activeTabId === tab.id
								? errorCounts[tab.id] > 0
									? "bg-red-600 text-white shadow-lg shadow-red-500/25 border-red-600"
									: "bg-orange-600 text-white shadow-lg shadow-orange-500/25 border-orange-600"
								: errorCounts[tab.id] > 0
									? "bg-red-50 text-red-600 border-red-500 dark:bg-red-900/20 dark:text-red-400"
									: "bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-black/20 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white border-transparent"
						}
          `}
				>
					<span>{tab.label}</span>
					{errorCounts[tab.id] > 0 && (
						<span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-600 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-sm">
							{errorCounts[tab.id]}
						</span>
					)}
				</button>
			))}
		</div>
	);
}
