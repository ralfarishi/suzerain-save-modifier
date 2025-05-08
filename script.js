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
			window.isRizia = /RiziaDLC\.Resources_Budget/.test(variablesString);

			// Cek untuk Sordland
			const isSordland = /BaseGame\.GovernmentBudget/.test(variablesString);
			if (isSordland) {
				const budgetMatch = /\["BaseGame\.GovernmentBudget"\]=(\d+)/.exec(variablesString);
				const wealthMatch = /\["BaseGame\.PersonalWealth"\]=(\d+)/.exec(variablesString);
				document.getElementById("gov-budget").value = budgetMatch ? budgetMatch[1] : "";
				document.getElementById("personal-wealth").value = wealthMatch ? wealthMatch[1] : "";
			}

			// Cek untuk Rizia (DLC)
			const isRizia = /RiziaDLC\.Resources_Budget/.test(variablesString);
			if (isRizia) {
				const authority = /\["RiziaDLC\.Resources_Authority"\]=(\d+)/.exec(variablesString);
				const budget = /\["RiziaDLC\.Resources_Budget"\]=(\d+)/.exec(variablesString);
				const energy = /\["RiziaDLC\.Resources_Energy"\]=(\d+)/.exec(variablesString);
				const baseMonarch = /\["RiziaDLC\.Authority_Modifier_BaseMonarchRomus"\]=(\d+)/.exec(
					variablesString
				);
				const incomeTax = /\["RiziaDLC\.Budget_Modifier_IncomeTax"\]=(\d+)/.exec(variablesString);
				const hydroDam = /\["RiziaDLC\.Energy_Modifier_ZpanaHydroelectricDam"\]=(\d+)/.exec(
					variablesString
				);

				// render ke UI (sesuai id lo)
				document.getElementById("new-authority").value = authority?.[1] || 0;
				document.getElementById("new-budget-rizia").value = budget?.[1] || 0;
				document.getElementById("new-energy").value = energy?.[1] || 0;
				document.getElementById("new-authorityPT").value = baseMonarch?.[1] || 0;
				document.getElementById("new-budgetPT").value = incomeTax?.[1] || 0;
				document.getElementById("new-energyPT").value = hydroDam?.[1] || 0;
			}

			// Tampilkan tombol download
			if (window.isSordland || window.isRizia) {
				document.getElementById("download-button").removeAttribute("disabled");
			}
		} catch (err) {
			console.error("Parsing error:", err);
			alert("File JSON-nya gak valid.");
		}
	};
	reader.readAsText(file);
});

document.getElementById("download-button").addEventListener("click", function () {
	if (!window.modifiedData || !window.variablesString) {
		alert("Belum ada file yang dimuat.");
		return;
	}

	let vs = window.variablesString;

	// Update untuk Sordland
	if (window.isSordland) {
		const govBudget = document.getElementById("gov-budget").value;
		const personalWealth = document.getElementById("personal-wealth").value;
		vs = vs
			.replace(/\["BaseGame\.GovernmentBudget"\]=\d+/, `["BaseGame.GovernmentBudget"]=${govBudget}`)
			.replace(
				/\["BaseGame\.PersonalWealth"\]=\d+/,
				`["BaseGame.PersonalWealth"]=${personalWealth}`
			);
	}

	// Update untuk Rizia
	if (window.isRizia) {
		const newAuthority = document.getElementById("new-authority").value;
		const newBudget = document.getElementById("new-budget-rizia").value;
		const newEnergy = document.getElementById("new-energy").value;
		const newAuthorityPT = document.getElementById("new-authorityPT").value;
		const newBudgetPT = document.getElementById("new-budgetPT").value;
		const newEnergyPT = document.getElementById("new-energyPT").value;

		vs = vs
			.replace(
				/\["RiziaDLC\.Resources_Authority"\]=\d+/,
				`["RiziaDLC.Resources_Authority"]=${newAuthority}`
			)
			.replace(/\["RiziaDLC\.Resources_Budget"\]=\d+/, `["RiziaDLC.Resources_Budget"]=${newBudget}`)
			.replace(/\["RiziaDLC\.Resources_Energy"\]=\d+/, `["RiziaDLC.Resources_Energy"]=${newEnergy}`)
			.replace(
				/\["RiziaDLC\.Authority_Modifier_BaseMonarchRomus"\]=\d+/,
				`["RiziaDLC.Authority_Modifier_BaseMonarchRomus"]=${newAuthorityPT}`
			)
			.replace(
				/\["RiziaDLC\.Budget_Modifier_IncomeTax"\]=\d+/,
				`["RiziaDLC.Budget_Modifier_IncomeTax"]=${newBudgetPT}`
			)
			.replace(
				/\["RiziaDLC\.Energy_Modifier_ZpanaHydroelectricDam"\]=\d+/,
				`["RiziaDLC.Energy_Modifier_ZpanaHydroelectricDam"]=${newEnergyPT}`
			);
	}

	// Simpan hasil dan buat file JSON baru
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

// Drag & Drop
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("json-file-input");

dropzone.addEventListener("click", () => fileInput.click());

["dragenter", "dragover"].forEach((evt) => {
	dropzone.addEventListener(evt, (e) => {
		e.preventDefault();
		dropzone.classList.add("dragover");
	});
});
["dragleave", "drop"].forEach((evt) => {
	dropzone.addEventListener(evt, (e) => {
		e.preventDefault();
		dropzone.classList.remove("dragover");
	});
});

dropzone.addEventListener("drop", (e) => {
	const file = e.dataTransfer.files[0];
	if (file) fileInput.files = e.dataTransfer.files;
	fileInput.dispatchEvent(new Event("change"));
});

// Toggle Dark Mode
const themeBtn = document.getElementById("toggle-theme");
const themeIcon = themeBtn.querySelector(".icon");

const updateThemeIcon = (isDark) => {
	themeIcon.textContent = isDark ? "☀️" : "🌑";
};

themeBtn.addEventListener("click", () => {
	document.body.classList.toggle("dark-mode");

	const isDark = document.body.classList.contains("dark-mode");

	localStorage.setItem("theme", isDark ? "dark" : "light");

	updateThemeIcon(isDark);
});

document.addEventListener("DOMContentLoaded", () => {
	const savedTheme = localStorage.getItem("theme");

	if (!savedTheme) {
		localStorage.setItem("theme", "dark");
		document.body.classList.add("dark-mode");
		updateThemeIcon(true);

		return;
	}

	const isDark = savedTheme === "dark";
	document.body.classList.toggle("dark-mode", isDark);
	updateThemeIcon(isDark);
});

// Accordion Smooth Toggle
document.querySelectorAll(".accordion-toggle").forEach((button) => {
	button.addEventListener("click", () => {
		const item = button.closest(".accordion-item");
		item.classList.toggle("active");
	});
});

// shoutout button
const ideaSvg = `<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="22"
					height="22"
					viewBox="0 0 24 24"
				>
					<path
						 d="M 11 0 L 11 3 L 13 3 L 13 0 L 11 0 z M 4.2226562 2.8085938 L 2.8085938 4.2226562 L 4.9296875 6.34375 L 6.34375 4.9296875 L 4.2226562 2.8085938 z M 19.777344 2.8085938 L 17.65625 4.9296875 L 19.070312 6.34375 L 21.191406 4.2226562 L 19.777344 2.8085938 z M 12 5 C 8.1456661 5 5 8.1456661 5 12 C 5 14.767788 6.6561188 17.102239 9 18.234375 L 9 21 C 9 22.093063 9.9069372 23 11 23 L 13 23 C 14.093063 23 15 22.093063 15 21 L 15 18.234375 C 17.343881 17.102239 19 14.767788 19 12 C 19 8.1456661 15.854334 5 12 5 z M 12 7 C 14.773666 7 17 9.2263339 17 12 C 17 14.184344 15.605334 16.022854 13.666016 16.708984 L 13 16.943359 L 13 21 L 11 21 L 11 16.943359 L 10.333984 16.708984 C 8.3946664 16.022854 7 14.184344 7 12 C 7 9.2263339 9.2263339 7 12 7 z M 0 11 L 0 13 L 3 13 L 3 11 L 0 11 z M 21 11 L 21 13 L 24 13 L 24 11 L 21 11 z M 4.9296875 17.65625 L 2.8085938 19.777344 L 4.2226562 21.191406 L 6.34375 19.070312 L 4.9296875 17.65625 z M 19.070312 17.65625 L 17.65625 19.070312 L 19.777344 21.191406 L 21.191406 19.777344 L 19.070312 17.65625 z"
					></path>
				</svg>`;

const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 50 50">
<path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
</svg>`;

const toggleBtn = document.getElementById("shoutout-toggle");
const group = document.getElementById("shoutout-buttons");

toggleBtn.innerHTML = ideaSvg;

toggleBtn.addEventListener("click", () => {
	const isOpen = group.classList.toggle("show");

	toggleBtn.classList.add("clicked");

	toggleBtn.innerHTML = isOpen ? closeSvg : ideaSvg;

	setTimeout(() => {
		toggleBtn.classList.remove("clicked");
	}, 400);
});
