import { FileArrowUpIcon, WarningCircleIcon } from "@phosphor-icons/react";
import React, { useCallback, useState } from "react";

interface DropzoneProps {
	onFileLoaded: (content: string, filename: string) => void;
}

export function Dropzone({ onFileLoaded }: DropzoneProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	}, []);

	const processFile = useCallback(
		(file: File) => {
			setError(null);
			if (!file.name.endsWith(".json")) {
				setError("Only .json files are supported");
				return;
			}

			const reader = new FileReader();
			reader.onload = (event) => {
				const content = event.target?.result as string;
				onFileLoaded(content, file.name);
			};
			reader.onerror = () => {
				setError("Error reading file");
			};
			reader.readAsText(file);
		},
		[onFileLoaded]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragging(false);

			const file = e.dataTransfer.files[0];
			if (file) {
				processFile(file);
			}
		},
		[processFile]
	);

	const handleFileInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				processFile(file);
			}
		},
		[processFile]
	);

	return (
		<div className="w-full max-w-2xl mx-auto mt-10">
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				className={`
          relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200
          ${
						isDragging
							? "border-orange-500 bg-orange-500/10 scale-[1.02]"
							: "border-slate-300 hover:border-slate-400 bg-slate-100/50 dark:border-slate-700 dark:hover:border-slate-600 dark:bg-black/20"
					}
        `}
			>
				<input
					type="file"
					accept=".json"
					onChange={handleFileInput}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
				/>

				<div className="flex flex-col items-center gap-4">
					<div
						className={`p-4 rounded-full ${isDragging ? "bg-orange-500/20" : "bg-slate-200 dark:bg-slate-800"}`}
					>
						<FileArrowUpIcon
							className={`w-8 h-8 ${isDragging ? "text-orange-500" : "text-slate-500 dark:text-slate-400"}`}
						/>
					</div>

					<div>
						<h3 className="text-xl font-semibold mb-2 opacity-90">Drop your save file here</h3>
						<p className="text-sm opacity-60">or click to browse (supports .json)</p>
					</div>
				</div>
			</div>

			{error && (
				<div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500 dark:text-red-400">
					<WarningCircleIcon className="w-5 h-5" />
					<span>{error}</span>
				</div>
			)}
		</div>
	);
}
