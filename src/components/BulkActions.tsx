import { useMemo } from "react";
import { TabData } from "../data/data";
import { FieldValues, SaveData } from "../utils/save-manager";
import {
	ArrowLineDownIcon,
	ArrowLineUpIcon,
	CheckCircleIcon,
	XCircleIcon,
} from "@phosphor-icons/react";
interface BulkActionsProps {
	activeTab: TabData;
	values: FieldValues;
	originalData: SaveData | null;
	onUpdateValues: (newValues: FieldValues) => void;
	onShowToast: (type: "success" | "error", message: string) => void;
}

export function BulkActions({ activeTab, values, onUpdateValues, onShowToast }: BulkActionsProps) {
	// Memoize field arrays to prevent recalculation on every render
	const numberFields = useMemo(
		() => activeTab.sections.flatMap((s) => s.fields).filter((f) => f.type === "number"),
		[activeTab]
	);

	const checkboxFields = useMemo(
		() => activeTab.sections.flatMap((s) => s.fields).filter((f) => f.type === "checkbox"),
		[activeTab]
	);

	// Memoize state calculations
	const allMaxed = useMemo(
		() =>
			numberFields.length > 0 &&
			numberFields.every((f) => {
				const val = values[f.id] as number;
				return f.max !== undefined && val === f.max;
			}),
		[numberFields, values]
	);

	const allMined = useMemo(
		() =>
			numberFields.length > 0 &&
			numberFields.every((f) => {
				const val = values[f.id] as number;
				return f.min !== undefined && val === f.min;
			}),
		[numberFields, values]
	);

	const allChecked = useMemo(
		() => checkboxFields.length > 0 && checkboxFields.every((f) => values[f.id] === true),
		[checkboxFields, values]
	);

	const allUnchecked = useMemo(
		() => checkboxFields.length > 0 && checkboxFields.every((f) => !values[f.id]),
		[checkboxFields, values]
	);

	const handleMaxAll = () => {
		const newValues = { ...values };
		let changed = false;
		numberFields.forEach((field) => {
			if (field.max !== undefined && newValues[field.id] !== field.max) {
				newValues[field.id] = field.max;
				changed = true;
			}
		});

		if (changed) {
			onUpdateValues(newValues);
			onShowToast("success", "All fields set to maximum values.");
		} else {
			onShowToast("success", "All fields are already maximized.");
		}
	};

	const handleMinAll = () => {
		const newValues = { ...values };
		let changed = false;
		numberFields.forEach((field) => {
			if (field.min !== undefined && newValues[field.id] !== field.min) {
				newValues[field.id] = field.min;
				changed = true;
			}
		});

		if (changed) {
			onUpdateValues(newValues);
			onShowToast("success", "All fields set to minimum values.");
		} else {
			onShowToast("success", "All fields are already minimized.");
		}
	};

	const handleCheckAll = () => {
		const newValues = { ...values };
		let changed = false;
		checkboxFields.forEach((field) => {
			if (newValues[field.id] !== true) {
				newValues[field.id] = true;
				changed = true;
			}
		});

		if (changed) {
			onUpdateValues(newValues);
			onShowToast("success", "All checkboxes checked.");
		} else {
			onShowToast("success", "All checkboxes are already checked.");
		}
	};

	const handleUncheckAll = () => {
		const newValues = { ...values };
		let changed = false;
		checkboxFields.forEach((field) => {
			if (newValues[field.id] !== false) {
				newValues[field.id] = false;
				changed = true;
			}
		});

		if (changed) {
			onUpdateValues(newValues);
			onShowToast("success", "All checkboxes unchecked.");
		} else {
			onShowToast("success", "All checkboxes are already unchecked.");
		}
	};

	const showNumberActions = ["money-opinion", "rizia", "rizia-military-unit"].includes(
		activeTab.id
	);
	const showCheckboxActions = ["presidential-decrees", "assembly-court"].includes(activeTab.id);

	if (!showNumberActions && !showCheckboxActions) return null;

	return (
		<div className="flex flex-wrap gap-3 mb-6 p-4 bg-warm-surface-light dark:bg-warm-surface-dark rounded-lg border border-warm-border-light dark:border-warm-border-dark shadow-sm">
			{showNumberActions && (
				<>
					<button
						onClick={handleMaxAll}
						disabled={allMaxed}
						className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all
              ${
								allMaxed
									? "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600"
									: "text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 cursor-pointer shadow-sm hover:shadow"
							}
            `}
					>
						<ArrowLineUpIcon className="w-4 h-4" />
						Max All
					</button>
					<button
						onClick={handleMinAll}
						disabled={allMined}
						className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all
              ${
								allMined
									? "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600"
									: "text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 cursor-pointer shadow-sm hover:shadow"
							}
            `}
					>
						<ArrowLineDownIcon className="w-4 h-4" />
						Min All
					</button>
				</>
			)}

			{showCheckboxActions && (
				<>
					<button
						onClick={handleCheckAll}
						disabled={allChecked}
						className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all
              ${
								allChecked
									? "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600"
									: "text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 cursor-pointer shadow-sm hover:shadow"
							}
            `}
					>
						<CheckCircleIcon className="w-4 h-4" />
						Check All
					</button>
					<button
						onClick={handleUncheckAll}
						disabled={allUnchecked}
						className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all
              ${
								allUnchecked
									? "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600"
									: "text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 cursor-pointer shadow-sm hover:shadow"
							}
            `}
					>
						<XCircleIcon className="w-4 h-4" />
						Uncheck All
					</button>
				</>
			)}
		</div>
	);
}
