import { useState, useCallback, useEffect, lazy, Suspense, useMemo } from "react";
import { appData } from "../data/data";
import {
	parseSaveFile,
	generateSaveFile,
	FieldValues,
	SaveData,
	getFieldById,
} from "../utils/save-manager";
import { Dropzone } from "./Dropzone";
import { EditorTabs } from "./EditorTabs";
import { EditorForm } from "./EditorForm";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { BulkActions } from "./BulkActions";
import {
	ArrowCounterClockwiseIcon,
	CheckCircleIcon,
	FileArrowDownIcon,
	QuestionIcon,
	XCircleIcon,
} from "@phosphor-icons/react";

// Lazy load the modal for better initial load performance
const SaveLocationInfo = lazy(() => import("./SaveLocationInfo"));

export function SaveEditor() {
	const [fileLoaded, setFileLoaded] = useState(false);
	const [originalData, setOriginalData] = useState<SaveData | null>(null);
	const [values, setValues] = useState<FieldValues>({});
	const [initialValues, setInitialValues] = useState<FieldValues>({});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [activeTabId, setActiveTabId] = useState(appData[0].id);
	const [filename, setFilename] = useState("");
	const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
	const [showHelp, setShowHelp] = useState(false);

	// Clear toast after 3 seconds
	useEffect(() => {
		if (toast) {
			const timer = setTimeout(() => setToast(null), 3000);
			return () => clearTimeout(timer);
		}
	}, [toast]);

	const handleShowToast = useCallback((type: "success" | "error", message: string) => {
		setToast({ type, message });
	}, []);

	// Optimized validation using O(1) field lookup
	const validateField = useCallback(
		(id: string, value: string | number | boolean | null | undefined) => {
			const field = getFieldById(id);
			if (!field) return null;

			if (field.type === "number") {
				if (value === null || value === undefined) return "Invalid number";
				const numVal =
					typeof value === "string" ? parseFloat(value) : typeof value === "number" ? value : NaN;
				if (isNaN(numVal)) return "Invalid number";
				if (field.min !== undefined && field.max !== undefined) {
					if (numVal < field.min || numVal > field.max) {
						return `Value must be between ${field.min} and ${field.max}`;
					}
				}
			}
			return null;
		},
		[],
	);

	const handleFileLoaded = useCallback(
		(content: string, name: string) => {
			try {
				const { values: parsedValues, originalData: data } = parseSaveFile(content);

				// Immediate validation of all parsed values
				const newErrors: Record<string, string> = {};
				Object.keys(parsedValues).forEach((id) => {
					const error = validateField(id, parsedValues[id]);
					if (error) {
						newErrors[id] = error;
					}
				});

				setValues(parsedValues);
				setInitialValues(parsedValues);
				setOriginalData(data);
				setFilename(name);
				setFileLoaded(true);
				setActiveTabId(appData[0].id);
				setErrors(newErrors);

				if (Object.keys(newErrors).length > 0) {
					setToast({
						type: "error",
						message: `Loaded with ${Object.keys(newErrors).length} validation errors.`,
					});
				} else {
					setToast({ type: "success", message: "Save file loaded successfully" });
				}
			} catch (error) {
				setToast({
					type: "error",
					message: "Failed to parse save file. Please ensure it is a valid Suzerain save.",
				});
			}
		},
		[validateField],
	);

	const handleValueChange = useCallback(
		(id: string, value: string | number | boolean) => {
			setValues((prev) => ({ ...prev, [id]: value }));

			const error = validateField(id, value);
			setErrors((prev) => {
				const newErrors = { ...prev };
				if (error) {
					newErrors[id] = error;
				} else {
					delete newErrors[id];
				}
				return newErrors;
			});
		},
		[validateField],
	);

	// Fixed: Removed `errors` from dependency array to prevent unnecessary re-creation
	const handleBulkUpdate = useCallback(
		(newValues: FieldValues) => {
			setValues(newValues);
			// Use functional update to avoid dependency on `errors`
			setErrors((prev) => {
				const newErrors = { ...prev };
				Object.keys(newValues).forEach((id) => {
					const error = validateField(id, newValues[id]);
					if (error) {
						newErrors[id] = error;
					} else {
						delete newErrors[id];
					}
				});
				return newErrors;
			});
		},
		[validateField],
	);

	const handleResetTab = useCallback(() => {
		const activeTab = appData.find((t) => t.id === activeTabId);
		if (!activeTab) return;

		const newValues = { ...values };
		activeTab.sections.forEach((section) => {
			section.fields.forEach((field) => {
				if (initialValues[field.id] !== undefined) {
					newValues[field.id] = initialValues[field.id];
				}
			});
		});
		handleBulkUpdate(newValues);
		setToast({ type: "success", message: "Tab values reset to original." });
	}, [activeTabId, values, initialValues, handleBulkUpdate]);

	const handleDownload = useCallback(() => {
		if (!originalData) return;

		if (Object.keys(errors).length > 0) {
			setToast({ type: "error", message: "Please fix validation errors before downloading." });
			return;
		}

		try {
			const newContent = generateSaveFile(originalData, values);
			const blob = new Blob([newContent], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "new-save.json";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);

			setToast({ type: "success", message: "Save file generated successfully." });
		} catch (error) {
			setToast({ type: "error", message: "Failed to generate save file." });
		}
	}, [originalData, values, errors]);

	const handleReset = useCallback(() => {
		setFileLoaded(false);
		setOriginalData(null);
		setValues({});
		setInitialValues({});
		setFilename("");
		setErrors({});
	}, []);

	// Memoize activeTab lookup to prevent unnecessary recalculations
	const activeTab = useMemo(() => appData.find((t) => t.id === activeTabId), [activeTabId]);

	const hasErrors = Object.keys(errors).length > 0;

	// Calculate errors per tab for the UI indicators
	const errorCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		appData.forEach((tab) => {
			let count = 0;
			tab.sections.forEach((section) => {
				section.fields.forEach((field) => {
					if (errors[field.id]) count++;
					// Special case for boolean-date fields
					if (field.type === "boolean-date" && errors[field.dateId]) count++;
				});
			});
			counts[tab.id] = count;
		});
		return counts;
	}, [errors]);

	return (
		<div className="min-h-screen font-sans transition-colors duration-300">
			{/* Header */}
			<header className="bg-white/80 dark:bg-warm-bg-dark/90 border-b border-slate-200 dark:border-white/10 sticky top-0 z-50 backdrop-blur-md transition-colors duration-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
							Suzerain{" "}
							<span className="font-light text-orange-600 dark:text-orange-400"> Save Editor</span>
						</h1>
					</div>

					<div className="flex items-center gap-4">
						<ThemeSwitcher />

						{fileLoaded && (
							<>
								<div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-black/20 rounded-full border border-slate-200 dark:border-white/10 text-sm opacity-70">
									<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
									{filename}
								</div>

								<button
									onClick={handleReset}
									className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
									title="Reset / Upload New File"
								>
									<ArrowCounterClockwiseIcon className="w-5 h-5" />
								</button>

								<button
									onClick={handleDownload}
									disabled={hasErrors}
									className={`
                    flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all shadow-lg active:scale-95
                    ${
											hasErrors
												? "bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-50"
												: "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/25 cursor-pointer hover:scale-105"
										}
                  `}
								>
									<FileArrowDownIcon className="w-4 h-4" />
									<span className="hidden sm:inline">Download Save</span>
								</button>
							</>
						)}
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{!fileLoaded ? (
					<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
						<div className="text-center mb-12">
							<h2 className="text-4xl font-bold mb-4 opacity-90">Modify Your Legacy</h2>
							<p className="text-lg opacity-60 max-w-2xl mx-auto mb-8">
								Edit your Suzerain save files with ease. Adjust budget, public opinion, decisions,
								and more in a modern, secure interface.
							</p>

							<button
								onClick={() => setShowHelp(true)}
								className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
							>
								<QuestionIcon className="w-4 h-4" />
								Where can I find my save file?
							</button>
						</div>
						<Dropzone onFileLoaded={handleFileLoaded} />
					</div>
				) : (
					<div className="animate-in fade-in duration-500">
						<EditorTabs
							tabs={appData}
							activeTabId={activeTabId}
							onTabChange={setActiveTabId}
							errorCounts={errorCounts}
						/>

						{activeTab && (
							<div
								key={activeTabId}
								className="animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
							>
								<div className="flex justify-between items-center mb-4">
									<BulkActions
										activeTab={activeTab}
										values={values}
										originalData={originalData}
										onUpdateValues={handleBulkUpdate}
										onShowToast={handleShowToast}
									/>

									{/* Reset Tab Button */}
									{["money-opinion", "rizia", "rizia-military-unit"].includes(activeTabId) && (
										<button
											onClick={handleResetTab}
											className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 cursor-pointer"
										>
											<ArrowCounterClockwiseIcon className="w-4 h-4" />
											Reset Tab
										</button>
									)}
								</div>

								<div className="space-y-12">
									{activeTab.sections.map((section) => (
										<EditorForm
											key={section.title}
											section={section}
											values={values}
											errors={errors}
											onChange={handleValueChange}
										/>
									))}
								</div>
							</div>
						)}
					</div>
				)}
			</main>

			{/* Toast Notification */}
			{toast && (
				<div
					className={`
          fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right fade-in duration-300 z-50
          ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
        `}
				>
					{toast.type === "success" ? (
						<CheckCircleIcon className="w-6 h-6" />
					) : (
						<XCircleIcon className="w-6 h-6" />
					)}
					<div>
						<h4 className="font-bold capitalize">{toast.type}</h4>
						<p className="text-sm opacity-90">{toast.message}</p>
					</div>
				</div>
			)}

			{/* Help Modal - Lazy Loaded */}
			<Suspense fallback={null}>
				<SaveLocationInfo isOpen={showHelp} onClose={() => setShowHelp(false)} />
			</Suspense>
		</div>
	);
}
