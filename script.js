import { dataMappings } from "./data/data.js";

import { setupThemeToggle, dragNDrop, showAlert, tabSwitch } from "./utils/index.js";

window.appState = {
	modifiedData: null,
	variablesString: "",
	defaultValues: {},
	hasSpecificInputAlert: false,
};

function resetAppState() {
	window.appState.modifiedData = null;
	window.appState.variablesString = "";
	window.appState.defaultValues = {};

	// Reset all inputs to empty/default
	for (const field of dataMappings) {
		if (field.type === "number") {
			const input = document.getElementById(field.id);
			if (input) input.value = "";
		} else if (field.type === "checkbox") {
			const checkbox = document.getElementById(field.id);
			if (checkbox) checkbox.checked = false;
		} else if (field.type === "boolean-date") {
			const checkbox = document.getElementById(field.id);
			const dateInput = document.getElementById(field.dateId);
			if (checkbox) checkbox.checked = false;
			if (dateInput) {
				dateInput.value = "";
				dateInput.disabled = true;
			}
		}
	}

	// Disable buttons
	document.querySelectorAll(".value-toggle-group .value-btn").forEach((btn) => {
		btn.setAttribute("disabled", "true");
	});
	document.getElementById("download-button").setAttribute("disabled", "true");

	// Reset dropzone UI
	const dropzone = document.getElementById("dropzone");
	const filenameDisplay = document.querySelector(".dropzone-filename");
	dropzone.classList.remove("uploaded");
	if (filenameDisplay) {
		filenameDisplay.textContent = "";
		filenameDisplay.style.display = "none";
	}

	// Clear file input
	document.getElementById("json-file-input").value = "";
}

// validate input number range with debounce
function debounce(fn, delay = 300) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}

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
			});
		}
	}
}

// validate the input number range
const validateFieldRange = debounce((input, field) => {
	const value = parseInt(input.value, 10);
	const { min = null, max = null } = field;

	if ((min !== null && value < min) || (max !== null && value > max)) {
		input.classList.add("input-invalid");
		showAlert(`The value must be between ${min} & ${max}`);
		window.appState.hasSpecificInputAlert = true;
	} else {
		input.classList.remove("input-invalid");
	}
	checkAllValid();
}, 300);

// prevent download when input number beyond max. or min. limit
const checkAllValid = debounce(() => {
	let isAllValid = true;
	const tabErrors = {};

	document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("tab-btn-error"));

	for (const field of dataMappings) {
		if (field.type === "number") {
			const input = document.getElementById(field.id);
			if (!input) continue;

			const value = parseInt(input.value.trim() || "0", 10);
			const { min = null, max = null } = field;

			if (isNaN(value) || (min !== null && value < min) || (max !== null && value > max)) {
				isAllValid = false;
				if (field.tab) tabErrors[field.tab] = true;
				input.classList.add("input-invalid");
			} else {
				input.classList.remove("input-invalid");
			}
		}
	}

	Object.keys(tabErrors).forEach((tabName) => {
		document.querySelector(`.tab-btn[data-tab="${tabName}"]`)?.classList.add("tab-btn-error");
	});

	const activeTab = document.querySelector(".tab-btn.active")?.dataset.tab;
	const isErrorInOtherTab = Object.keys(tabErrors).some((t) => t !== activeTab);

	if (!isAllValid && isErrorInOtherTab && !window.appState.hasSpecificInputAlert) {
		showAlert("There is an input error. Please check the marked tab!");
	}

	document.getElementById("download-button").disabled = !isAllValid;
	window.appState.hasSpecificInputAlert = false;
}, 300);

function parseFieldsFromSave(variablesString) {
	const { defaultValues } = window.appState;

	for (const field of dataMappings) {
		if (field.type === "number") {
			const match = new RegExp(`\\[\\\"${field.key}\\\"]=(-?\\d+)`).exec(variablesString);
			const input = document.getElementById(field.id);
			if (input) {
				input.value = match ? match[1] : "";
				defaultValues[field.tab] ??= {};
				defaultValues[field.tab][field.id] = input.value;
				input.addEventListener("blur", () => validateFieldRange(input, field));
			}
		} else if (field.type === "checkbox") {
			const match = new RegExp(`\\[\\\"${field.key}\\\"]=(true|false)`).exec(variablesString);
			const checkbox = document.getElementById(field.id);
			if (checkbox) {
				checkbox.checked = match ? match[1] === "true" : false;
				defaultValues[field.tab] ??= {};
				defaultValues[field.tab][field.id] = checkbox.checked;
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

			const isValidFile = /GameCondition\.Turn01_A_PoliticalOverview/.test(variablesString);

			if (!isValidFile) {
				resetAppState();
				return showAlert("This is not a Suzerain save file");
			}

			window.appState.modifiedData = jsonData;
			window.appState.variablesString = variablesString;

			parseFieldsFromSave(variablesString);

			document.querySelectorAll(".value-toggle-group .value-btn").forEach((btn) => {
				btn.removeAttribute("disabled");
			});
			document.getElementById("download-button").removeAttribute("disabled");
		} catch (err) {
			console.error("Error parsing file:", err);
			resetAppState();
			showAlert("Only accept JSON file format");
		}
	};

	reader.readAsText(file);
});

document.getElementById("download-button").addEventListener("click", function () {
	window.appState.hasSpecificInputAlert = false;
	let isValid = true;

	if (!window.appState.modifiedData || !window.appState.variablesString) {
		showAlert("File not loaded yet");
		return;
	}

	let vs = window.appState.variablesString;

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

	window.appState.modifiedData.variables = vs;
	const blob = new Blob([JSON.stringify(window.appState.modifiedData)], {
		type: "application/json",
	});
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

		if (action === "reset" && !window.appState.defaultValues?.[tab]) {
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
				} else if (
					action === "reset" &&
					window.appState.defaultValues?.[tab]?.[field.id] !== undefined
				) {
					input.value = window.appState.defaultValues[tab][field.id];
				}
				validateFieldRange(input, field);
			}

			// for checkbox
			if (field.type === "checkbox") {
				if (action === "check") input.checked = true;
				else if (action === "uncheck") input.checked = false;
				else if (
					action === "reset" &&
					window.appState.defaultValues?.[tab]?.[field.id] !== undefined
				) {
					input.checked = window.appState.defaultValues[tab][field.id];
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
