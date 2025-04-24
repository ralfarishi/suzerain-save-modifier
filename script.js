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
				document.getElementById("budget-data").innerHTML = budgetMatch ? budgetMatch[1] : "N/A";
				document.getElementById("wealth-data").innerHTML = wealthMatch ? wealthMatch[1] : "N/A";
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
		const newBudget = document.getElementById("new-budget").innerHTML.trim();
		const newWealth = document.getElementById("new-wealth").innerHTML.trim();
		vs = vs
			.replace(/\["BaseGame\.GovernmentBudget"\]=\d+/, `["BaseGame.GovernmentBudget"]=${newBudget}`)
			.replace(/\["BaseGame\.PersonalWealth"\]=\d+/, `["BaseGame.PersonalWealth"]=${newWealth}`);
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
	a.download = "newSave.json";
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

themeBtn.addEventListener("click", () => {
	document.body.classList.toggle("dark-mode");

	const isDark = document.body.classList.contains("dark-mode");
	const icon = isDark ? "☀️" : "🌙";
	const label = isDark ? "Light Mode" : "Dark Mode";

	themeBtn.querySelector(".icon").textContent = icon;
	themeBtn.querySelector(".label").textContent = label;
});

// Accordion Smooth Toggle
document.querySelectorAll(".accordion-toggle").forEach((button) => {
	button.addEventListener("click", () => {
		const item = button.closest(".accordion-item");
		item.classList.toggle("active");
	});
});
