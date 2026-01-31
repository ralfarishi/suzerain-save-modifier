import { appData, GameField } from "../data/data";
import { convertToDatetimeLocal, convertDatetimeLocalToInitialDate } from "./date-helpers";

export interface SaveData {
	variables: string;
	[key: string]: any;
}

export type FieldValues = Record<string, string | number | boolean>;

// Create a Map for O(1) field lookups instead of O(n) array searches
let fieldsMap: Map<string, GameField> | null = null;

function getFieldsMap(): Map<string, GameField> {
	if (!fieldsMap) {
		fieldsMap = new Map();
		for (const tab of appData) {
			for (const section of tab.sections) {
				for (const field of section.fields) {
					fieldsMap.set(field.id, field);
				}
			}
		}
	}
	return fieldsMap;
}

// Helper to get a single field by ID (O(1) lookup)
export function getFieldById(id: string): GameField | undefined {
	return getFieldsMap().get(id);
}

// Helper to flatten fields (kept for backward compatibility)
export function getAllFields(): GameField[] {
	return Array.from(getFieldsMap().values());
}

export function parseSaveFile(jsonContent: string): {
	values: FieldValues;
	originalData: SaveData;
} {
	const data: SaveData = JSON.parse(jsonContent);
	const variablesString = data.variables;
	const values: FieldValues = {};
	const fields = getAllFields();

	for (const field of fields) {
		if (field.type === "number") {
			// Allow for optional spaces around '=' and support floating point numbers
			const match = new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(-?[\\d.]+)`).exec(
				variablesString
			);
			if (match) {
				values[field.id] = parseFloat(match[1]);
			}
		} else if (field.type === "checkbox") {
			// Allow optional spaces around '=' to match number field pattern
			const match = new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(true|false)`).exec(
				variablesString
			);
			if (match) {
				values[field.id] = match[1] === "true";
			}
		} else if (field.type === "boolean-date") {
			// Allow optional spaces around '=' to match number field pattern
			const boolMatch = new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(true|false)`).exec(
				variablesString
			);
			const dateMatch = new RegExp(`\\[\\"${field.dateKey}\\"\\]\\s*=\\s*\\"(.*?)\\"`).exec(
				variablesString
			);

			if (boolMatch) {
				values[field.id] = boolMatch[1] === "true";
			}
			if (dateMatch) {
				values[field.dateId] = convertToDatetimeLocal(dateMatch[1]);
			}
		} else if (field.type === "radio-group") {
			for (const option of field.options) {
				// Allow optional spaces around '=' to match number field pattern
				const match = new RegExp(`\\[\\"${option.key}\\"\\]\\s*=\\s*(true|false)`).exec(
					variablesString
				);
				if (match && match[1] === "true") {
					values[field.id] = option.id; // Store the ID of the selected option
					break;
				}
			}
		}
	}

	return { values, originalData: data };
}

export function generateSaveFile(originalData: SaveData, values: FieldValues): string {
	let vs = originalData.variables;
	const fields = getAllFields();

	for (const field of fields) {
		if (field.type === "number") {
			const val = values[field.id] ?? 0;
			vs = vs.replace(
				new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(-?[\\d.]+)`),
				`["${field.key}"]=${val}`
			);
		} else if (field.type === "checkbox") {
			const val = values[field.id] ?? false;
			vs = vs.replace(
				new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(true|false)`),
				`["${field.key}"]=${val}`
			);
		} else if (field.type === "boolean-date") {
			const isChecked = values[field.id] === true;
			const dateVal = (values[field.dateId] as string) || "";

			vs = vs.replace(
				new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(true|false)`),
				`["${field.key}"]=${isChecked}`
			);

			const formattedDate = isChecked ? convertDatetimeLocalToInitialDate(dateVal) : "";
			vs = vs.replace(
				new RegExp(`\\[\\"${field.dateKey}\\"\\]\\s*=\\s*\\"(.*?)\\"`),
				`["${field.dateKey}"]="${formattedDate}"`
			);
		} else if (field.type === "radio-group") {
			const selectedId = values[field.id];
			for (const option of field.options) {
				const isSelected = option.id === selectedId;
				vs = vs.replace(
					new RegExp(`\\[\\"${option.key}\\"\\]\\s*=\\s*(true|false)`),
					`["${option.key}"]=${isSelected}`
				);
			}
		}
	}

	const newData = { ...originalData, variables: vs };
	return JSON.stringify(newData);
}
