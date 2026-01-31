import { CalendarDotsIcon, CheckIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { GameField, Section } from "../data/data";
import { FieldValues } from "../utils/save-manager";

interface EditorFormProps {
	section: Section;
	values: FieldValues;
	errors: Record<string, string>;
	onChange: (id: string, value: string | number | boolean) => void;
}

export function EditorForm({ section, values, errors, onChange }: EditorFormProps) {
	const renderField = (field: GameField) => {
		const error = errors[field.id];
		const hasError = !!error;

		switch (field.type) {
			case "number":
				return (
					<div
						key={field.id}
						className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md flex flex-col justify-between min-h-[110px] ${
							hasError
								? "border-red-500 bg-red-500/10"
								: "bg-warm-surface-light border-warm-border-light dark:bg-warm-surface-dark dark:border-warm-border-dark hover:border-orange-500/50"
						}`}
					>
						<div className="flex justify-between items-start mb-2">
							<label
								htmlFor={field.id}
								className="block text-sm font-semibold opacity-90 cursor-pointer"
							>
								{field.label}
							</label>
							{(field.min !== undefined || field.max !== undefined) && !hasError && (
								<div className="text-[10px] uppercase tracking-wider opacity-50 flex gap-2">
									<span>{field.min}</span>
									<span className="opacity-30">|</span>
									<span>{field.max}</span>
								</div>
							)}
						</div>

						<div className="relative">
							<input
								type="number"
								id={field.id}
								value={(values[field.id] as number) ?? ""}
								onChange={(e) => onChange(field.id, parseFloat(e.target.value))}
								min={field.min}
								max={field.max}
								className={`w-full rounded-md px-3 py-2.5 outline-none transition-all font-medium text-lg
                  ${
										hasError
											? "bg-red-900/20 border border-red-500 text-red-200 placeholder-red-300"
											: "bg-white border-warm-border-light dark:bg-black/40 dark:border-warm-border-dark focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-slate-400 dark:hover:border-slate-600"
									}
                `}
							/>
						</div>

						{hasError && (
							<div className="mt-2 text-xs text-red-400 flex items-center gap-1 bg-red-500/10 p-1.5 rounded">
								<WarningCircleIcon className="w-3.5 h-3.5" />
								<span>{error}</span>
							</div>
						)}
					</div>
				);

			case "checkbox":
				const checked = (values[field.id] as boolean) ?? false;
				return (
					<div
						key={field.id}
						className="p-4 rounded-lg border border-warm-border-light bg-warm-surface-light dark:bg-warm-surface-dark dark:border-warm-border-dark flex items-center justify-between transition-all duration-200 hover:shadow-md hover:border-orange-500/50 cursor-pointer min-h-[110px]"
						onClick={() => onChange(field.id, !checked)}
					>
						<label className="text-sm font-bold cursor-pointer select-none opacity-90 pointer-events-none pr-4">
							{field.label}
						</label>
						<div
							className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ring-offset-2 dark:ring-offset-warm-bg-dark ${
								checked
									? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/40 ring-2 ring-orange-500/50"
									: "bg-white dark:bg-black/40 border-warm-border-light dark:border-warm-border-dark text-transparent"
							}`}
						>
							<CheckIcon
								className={`w-5 h-5 transition-transform duration-300 ${checked ? "scale-100" : "scale-50"}`}
							/>
						</div>
					</div>
				);

			case "radio-group":
				return (
					<div
						key={field.id}
						className="p-6 rounded-lg border border-warm-border-light bg-warm-surface-light dark:bg-warm-surface-dark dark:border-warm-border-dark col-span-full transition-all duration-300 hover:shadow-lg"
					>
						<div className="flex items-center gap-3 mb-5">
							<div className="w-1.5 h-5 bg-orange-500 rounded-full" />
							<label className="text-sm font-bold uppercase tracking-wider opacity-60">
								{field.label}
							</label>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{field.options.map((option) => {
								const isSelected = values[field.id] === option.id;
								return (
									<label
										key={option.id}
										className={`
                    relative flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 group
                    ${
											isSelected
												? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20"
												: "bg-white border-warm-border-light hover:border-orange-500/50 hover:bg-orange-50/50 dark:bg-black/40 dark:border-warm-border-dark dark:hover:bg-orange-900/10"
										}
                  `}
									>
										<input
											type="radio"
											name={field.id}
											value={option.id}
											checked={isSelected}
											onChange={() => onChange(field.id, option.id)}
											className="sr-only"
										/>
										<div
											className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
												isSelected
													? "border-white bg-white"
													: "border-slate-300 dark:border-slate-600 bg-transparent group-hover:border-orange-400"
											}`}
										>
											<div
												className={`w-2 h-2 rounded-full transition-all duration-300 ${
													isSelected ? "bg-orange-500 scale-100" : "bg-transparent scale-0"
												}`}
											/>
										</div>
										<span className="ml-4 text-sm font-bold transition-colors">{option.label}</span>
										{isSelected && (
											<div className="absolute top-2 right-2">
												<CheckIcon className="w-4 h-4 text-white/50" />
											</div>
										)}
									</label>
								);
							})}
						</div>
					</div>
				);

			case "boolean-date":
				const isChecked = (values[field.id] as boolean) ?? false;
				return (
					<div
						key={field.id}
						className="p-4 rounded-lg border border-warm-border-light bg-warm-surface-light dark:bg-warm-surface-dark dark:border-warm-border-dark transition-all duration-300 hover:shadow-lg min-h-[110px] flex flex-col justify-between"
					>
						<div
							className="flex items-center justify-between mb-4 cursor-pointer"
							onClick={() => onChange(field.id, !isChecked)}
						>
							<label className="text-sm font-bold cursor-pointer select-none opacity-90 pr-4">
								{field.label}
							</label>
							<div
								className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ${
									isChecked
										? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/40"
										: "bg-white dark:bg-black/40 border-warm-border-light dark:border-warm-border-dark text-transparent"
								}`}
							>
								<CheckIcon
									className={`w-5 h-5 transition-transform duration-300 ${isChecked ? "scale-100" : "scale-50"}`}
								/>
							</div>
						</div>

						<div
							className={`relative transition-all duration-300 ${isChecked ? "opacity-100 translate-y-0" : "opacity-30 translate-y-1 pointer-events-none"}`}
						>
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<CalendarDotsIcon className="h-4 w-4 opacity-50" />
							</div>
							<input
								type="datetime-local"
								id={field.dateId}
								value={(values[field.dateId] as string) ?? ""}
								onChange={(e) => onChange(field.dateId, e.target.value)}
								disabled={!isChecked}
								className={`w-full bg-white border border-warm-border-light rounded-md px-3 py-2 pl-10 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none dark:bg-black/40 dark:border-warm-border-dark transition-all
                  ${!isChecked ? "cursor-not-allowed" : "cursor-pointer hover:border-slate-400"}
                `}
							/>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-bold mb-6 flex items-center gap-3 opacity-90">
					<span className="w-1 h-8 bg-orange-500 rounded-full"></span>
					{section.title}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
					{section.fields.map(renderField)}
				</div>
			</div>
		</div>
	);
}
