import { dataMappings } from "./data/data.js";

import { setupThemeToggle } from "./utils/theme.js";
import { dragNDrop } from "./utils/drag-n-drop.js";
import { shoutOut } from "./utils/shoutout.js";
import { showAlert } from "./utils/show-alert.js";

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

// validate the input number range
function validateFieldRange(input, field) {
	const value = parseInt(input.value, 10);
	const min = field.min ?? null;
	const max = field.max ?? null;

	if ((min !== null && value < min) || (max !== null && value > max)) {
		input.classList.add("input-invalid");
		showAlert(`The value must be between ${min} & ${max}`);
	} else {
		input.classList.remove("input-invalid");
	}
	checkAllValid();
}

// prevent download when input number beyond max. or min. limit
function checkAllValid() {
	let isAllValid = true;
	for (const field of dataMappings) {
		if (field.type === "number") {
			const input = document.getElementById(field.id);
			if (!input) continue;

			const value = parseInt(input.value, 10);
			const min = field.min ?? null;
			const max = field.max ?? null;

			if ((min !== null && value < min) || (max !== null && value > max)) {
				isAllValid = false;
				break;
			}
		}
	}

	document.getElementById("download-button").disabled = !isAllValid;
}

function parseFieldsFromSave(variablesString) {
	for (const field of dataMappings) {
		if (field.type === "number") {
			const match = new RegExp(`\\[\\\"${field.key}\\\"]=(-?\\d+)`).exec(variablesString);
			const input = document.getElementById(field.id);
			if (input) {
				input.value = match ? match[1] : "";
				input.addEventListener("blur", () => validateFieldRange(input, field));
			}
		} else if (field.type === "checkbox") {
			const match = new RegExp(`\\[\\\"${field.key}\\\"]=(true|false)`).exec(variablesString);
			const checkbox = document.getElementById(field.id);
			if (checkbox) checkbox.checked = match ? match[1] === "true" : false;
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

			window.isSordland = /BaseGame\.GovernmentBudget/.test(variablesString);

			if (window.isSordland) {
				parseFieldsFromSave(variablesString);
				document.getElementById("download-button").removeAttribute("disabled");
			}
		} catch (err) {
			console.error("Error parsing file:", err);
			showAlert("Only accept json file format");
		}
	};

	reader.readAsText(file);
});

document.getElementById("download-button").addEventListener("click", function () {
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

document.addEventListener("DOMContentLoaded", () => {
	setupThemeToggle();
	dragNDrop();
	shoutOut();

	setupBooleanDateToggle();
});
