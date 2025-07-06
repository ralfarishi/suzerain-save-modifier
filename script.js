import { dataMappings } from "./data/data.js";

import { setupThemeToggle } from "./utils/theme.js";
import { dragNDrop } from "./utils/drag-n-drop.js";
import { showAlert } from "./utils/show-alert.js";
import { tabSwitch } from "./utils/tab-switch.js";

function convertToDatetimeLocal(dateStr) {
	if (!dateStr) return "";

	const [d, m, yAndTime] = dateStr.split("/");
	if (!yAndTime) return "";

	const [y, timeAndPeriod] = yAndTime.split(" ");
	const [hourStr, minuteStr] = timeAndPeriod.split(":");
	const period = timeAndPeriod.slice(-2);
	let hour = parseInt(hourStr);
	const minute = parseInt(minuteStr);

	if (period === "PM" && hour < 12) hour += 12;
	if (period === "AM" && hour === 12) hour = 0;

	const pad = (n) => n.toString().padStart(2, "0");
	return `${y}-${pad(m)}-${pad(d)}T${pad(hour)}:${pad(minute)}`;
}

function convertDatetimeLocalToInitialDate(datetimeValue) {
	if (!datetimeValue) return "";

	const [datePart, timePart] = datetimeValue.split("T");
	if (!datePart || !timePart) return "";

	const [year, month, day] = datePart.split("-");
	let [hour, minute] = timePart.split(":");

	hour = parseInt(hour, 10);
	const period = hour >= 12 ? "PM" : "AM";
	if (hour > 12) hour -= 12;
	if (hour === 0) hour = 12;

	const pad = (n) => n.toString().padStart(2, "0");
	return `${pad(day)}/${pad(month)}/${year} ${pad(hour)}:${pad(minute)} ${period}`;
}

function setupBooleanDateToggle() {
	for (const field of dataMappings.filter((f) => f.type === "boolean-date")) {
		const checkbox = document.getElementById(field.id);
		const dateInput = document.getElementById(field.dateId);
		if (checkbox && dateInput) {
			dateInput.disabled = !checkbox.checked;
			checkbox.addEventListener("change", () => {
				dateInput.disabled = !checkbox.checked;
				// if (!checkbox.checked) dateInput.value = "";
			});
		}
	}
}

let hasSpecificInputAlert = false;

// validate the input number range
function validateFieldRange(input, field) {
	const value = parseInt(input.value, 10);
	const min = field.min ?? null;
	const max = field.max ?? null;

	if ((min !== null && value < min) || (max !== null && value > max)) {
		input.classList.add("input-invalid");
		showAlert(`The value must be between ${min} & ${max}`);
		hasSpecificInputAlert = true;
	} else {
		input.classList.remove("input-invalid");
	}
	checkAllValid();
}

// prevent download when input number beyond max. or min. limit
function checkAllValid() {
	let isAllValid = true;
	const tabErrors = {};

	document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("tab-btn-error"));

	for (const field of dataMappings) {
		if (field.type === "number") {
			const input = document.getElementById(field.id);
			if (!input) continue;

			const value = parseInt(input.value.trim() || "0", 10);
			const min = field.min ?? null;
			const max = field.max ?? null;

			if (isNaN(value) || (min !== null && value < min) || (max !== null && value > max)) {
				isAllValid = false;
				// save tab error
				if (field.tab) tabErrors[field.tab] = true;
				// mark input error
				input.classList.add("input-invalid");
			} else {
				input.classList.remove("input-invalid");
			}
		}
	}

	Object.keys(tabErrors).forEach((tabName) => {
		const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
		if (tabBtn) tabBtn.classList.add("tab-btn-error");
	});

	// does error occur on inactive tab
	const activeTab = document.querySelector(".tab-btn.active")?.dataset.tab;
	const isErrorInOtherTab = Object.keys(tabErrors).some((t) => t !== activeTab);

	if (!isAllValid && isErrorInOtherTab && !hasSpecificInputAlert) {
		showAlert("There is an input error. Please check the marked tab!");
	}

	document.getElementById("download-button").disabled = !isAllValid;

	hasSpecificInputAlert = false;
}

function parseFieldsFromSave(variablesString) {
	for (const field of dataMappings) {
		if (field.type === "number") {
			const match = new RegExp(`\\[\\\"${field.key}\\\"]=(-?\\d+)`).exec(variablesString);
			const input = document.getElementById(field.id);
			if (input) {
				input.value = match ? match[1] : "";

				if (!window.defaultValues) window.defaultValues = {};
				if (!window.defaultValues[field.tab]) window.defaultValues[field.tab] = {};
				window.defaultValues[field.tab][field.id] = input.value;

				input.addEventListener("blur", () => validateFieldRange(input, field));
			}
		} else if (field.type === "checkbox") {
			const match = new RegExp(`\\[\\\"${field.key}\\\"]=(true|false)`).exec(variablesString);
			const checkbox = document.getElementById(field.id);
			if (checkbox) {
				checkbox.checked = match ? match[1] === "true" : false;

				if (!window.defaultValues) window.defaultValues = {};
				if (!window.defaultValues[field.tab]) window.defaultValues[field.tab] = {};
				window.defaultValues[field.tab][field.id] = checkbox.checked;
			}
		} else if (field.type === "boolean-date") {
			const boolMatch = new RegExp(`\\[\\\"${field.key}\\\"]=(true|false)`).exec(variablesString);
			const dateMatch = new RegExp(`\\[\\\"${field.dateKey}\\\"\\]=\\\"(.*?)\\\"`).exec(
				variablesString
			);
			const checkbox = document.getElementById(field.id);
			const dateInput = document.getElementById(field.dateId);
			if (checkbox && dateInput) {
				checkbox.checked = boolMatch ? boolMatch[1] === "true" : false;
				dateInput.value = dateMatch ? convertToDatetimeLocal(dateMatch[1]) : "";
				dateInput.disabled = !checkbox.checked;
			}
		} else if (field.type === "radio-group") {
			for (const option of field.options) {
				const match = new RegExp(`\\[\\\"${option.key}\\\"]=(true|false)`).exec(variablesString);
				if (match && match[1] === "true") {
					document.getElementById(option.id)?.click();
					break;
				}
			}
		}
	}
	checkAllValid();
}

document.getElementById("json-file-input").addEventListener("change", function (e) {
	const file = e.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = () => {
		try {
			const jsonData = JSON.parse(reader.result);
			const variablesString = jsonData.variables;

			window.modifiedData = jsonData;
			window.variablesString = variablesString;

			const isValidFile = /GameCondition\.Turn01_A_PoliticalOverview/.test(variablesString);

			if (!isValidFile) return showAlert("This is not a Suzerain save file");

			parseFieldsFromSave(variablesString);

			document.querySelectorAll(".value-toggle-group .value-btn").forEach((btn) => {
				btn.removeAttribute("disabled");
			});
			document.getElementById("download-button").removeAttribute("disabled");
		} catch (err) {
			console.error("Error parsing file:", err);
			showAlert("Only accept JSON file format");
		}
	};

	reader.readAsText(file);
});

document.getElementById("download-button").addEventListener("click", function () {
	hasSpecificInputAlert = false;
	let isValid = true;

	if (!window.modifiedData || !window.variablesString) {
		showAlert("File not loaded yet");
		return;
	}

	let vs = window.variablesString;

	for (const field of dataMappings) {
		if (field.type === "number") {
			const value = document.getElementById(field.id)?.value || "0";
			vs = vs.replace(new RegExp(`\\[\\\"${field.key}\\\"]=(-?\\d+)`), `["${field.key}"]=${value}`);
		} else if (field.type === "checkbox") {
			const checked = document.getElementById(field.id)?.checked;
			vs = vs.replace(
				new RegExp(`\\[\\\"${field.key}\\\"]=(true|false)`),
				`["${field.key}"]=${checked}`
			);
		} else if (field.type === "boolean-date") {
			const checkbox = document.getElementById(field.id);
			const dateInput = document.getElementById(field.dateId);
			const isChecked = checkbox?.checked;
			const date = dateInput?.value || "";

			if (isChecked && !date) {
				showAlert("Date must be filled");
				isValid = false;

				return;
			}

			const formattedDate = isChecked ? convertDatetimeLocalToInitialDate(date) : "";
			vs = vs.replace(
				new RegExp(`\\[\\\"${field.key}\\\"]=(true|false)`),
				`["${field.key}"]=${isChecked}`
			);
			vs = vs.replace(
				new RegExp(`\\[\\\"${field.dateKey}\\\"\\]=\\\"(.*?)\\\"`),
				`["${field.dateKey}"]="${formattedDate}"`
			);
		} else if (field.type === "radio-group") {
			const selected = document.querySelector(`input[name='${field.id}']:checked`);
			const selectedId = selected?.id;
			for (const option of field.options) {
				vs = vs.replace(
					new RegExp(`\\[\\\"${option.key}\\\"]=(true|false)`),
					`["${option.key}"]=${option.id === selectedId}`
				);
			}
		}
	}

	if (!isValid) return;

	window.modifiedData.variables = vs;
	const blob = new Blob([JSON.stringify(window.modifiedData)], { type: "application/json" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = "new-save.json";
	document.body.appendChild(a);
	a.click();

	URL.revokeObjectURL(url);
	a.remove();
});

document.querySelectorAll(".checkbox-group").forEach((group) => {
	group.addEventListener("click", function (e) {
		// Jangan trigger kalau yang diklik itu input atau label (biar gak dobel)
		if (e.target.tagName.toLowerCase() !== "input" && e.target.tagName.toLowerCase() !== "label") {
			const checkbox = group.querySelector('input[type="checkbox"]');
			if (checkbox) checkbox.checked = !checkbox.checked;
		}
	});
});

document.querySelectorAll(".value-toggle-group .value-btn").forEach((btn) => {
	btn.addEventListener("click", () => {
		const tabId = btn.closest(".tab-content")?.id;
		const tab = tabId?.replace("-tab", "");

		const action = btn.dataset.type;

		if (!tab) return;

		if (action === "reset" && !window.defaultValues?.[tab]) {
			showAlert("File not loaded!");
			return;
		}

		for (const field of dataMappings) {
			if (field.tab !== tab) continue;

			const input = document.getElementById(field.id);
			if (!input) continue;

			// for number
			if (field.type === "number") {
				if (action === "max" && field.max !== undefined) {
					input.value = field.max;
				} else if (action === "min" && field.min !== undefined) {
					input.value = field.min;
				} else if (action === "reset" && window.defaultValues?.[tab]?.[field.id] !== undefined) {
					input.value = window.defaultValues[tab][field.id];
				}
				validateFieldRange(input, field);
			}

			// for checkbox
			if (field.type === "checkbox") {
				if (action === "check") input.checked = true;
				else if (action === "uncheck") input.checked = false;
				else if (action === "reset" && window.defaultValues?.[tab]?.[field.id] !== undefined) {
					input.checked = window.defaultValues[tab][field.id];
				}
			}
		}
	});
});

document.addEventListener("DOMContentLoaded", () => {
	setupThemeToggle();
	dragNDrop();
	tabSwitch();

	setupBooleanDateToggle();
});
