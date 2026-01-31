import { AppleLogoIcon, LinuxLogoIcon, WindowsLogoIcon, XIcon } from "@phosphor-icons/react";

interface SaveLocationInfoProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function SaveLocationInfo({ isOpen, onClose }: SaveLocationInfoProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
			<div className="bg-white dark:bg-warm-bg-dark rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 dark:border-white/10 overflow-hidden animate-in zoom-in-95 duration-200">
				<div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
					<h3 className="text-xl font-bold text-slate-900 dark:text-warm-text-dark">
						Locating Your Save File
					</h3>
					<button
						onClick={onClose}
						className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-slate-400"
					>
						<XIcon className="w-5 h-5" />
					</button>
				</div>

				<div className="p-6 space-y-6">
					<p className="text-slate-600 dark:text-slate-400">
						The save file is usually named{" "}
						<code className="px-2 py-1 rounded bg-slate-100 dark:bg-black/30 text-orange-600 dark:text-orange-400 font-mono text-sm">
							Active_date_time.json
						</code>
						. Here is where you can find it on your system:
					</p>

					<div className="space-y-4">
						<div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
							<div className="flex items-center gap-2 mb-2 font-semibold text-blue-900 dark:text-blue-300">
								<WindowsLogoIcon className="w-5 h-5" />
								<span>Windows</span>
							</div>
							<code className="block p-3 rounded bg-white dark:bg-black/20 text-sm font-mono text-slate-700 dark:text-slate-300 break-all border border-blue-100 dark:border-blue-900/20 select-all">
								%AppData%\..\LocalLow\Torpor Games\Suzerain\
							</code>
						</div>

						<div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50">
							<div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-slate-300">
								<AppleLogoIcon className="w-5 h-5" />
								<span>macOS</span>
							</div>
							<code className="block p-3 rounded bg-white dark:bg-black/20 text-sm font-mono text-slate-700 dark:text-slate-300 break-all border border-slate-200 dark:border-slate-700/50 select-all">
								~/Library/Application Support/Torpor Games/Suzerain/
							</code>
						</div>

						<div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20">
							<div className="flex items-center gap-2 mb-2 font-semibold text-orange-900 dark:text-orange-300">
								<LinuxLogoIcon className="w-5 h-5" />
								<span>Linux</span>
							</div>
							<code className="block p-3 rounded bg-white dark:bg-black/20 text-sm font-mono text-slate-700 dark:text-slate-300 break-all border border-orange-100 dark:border-orange-900/20 select-all">
								~/.config/unity3d/Torpor Games/Suzerain/
							</code>
						</div>
					</div>
				</div>

				<div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 flex justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:opacity-90 transition-opacity cursor-pointer"
					>
						Got it
					</button>
				</div>
			</div>
		</div>
	);
}
