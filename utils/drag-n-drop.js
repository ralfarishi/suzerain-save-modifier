export function dragNDrop() {
	const dropzone = document.getElementById("dropzone");
	const fileInput = document.getElementById("json-file-input");
	const filenameDisplay = document.querySelector(".dropzone-filename");

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
		if (file) {
			fileInput.files = e.dataTransfer.files;
		}
		fileInput.dispatchEvent(new Event("change"));
	});

	fileInput.addEventListener("change", (e) => {
		const file = e.target.files[0];
		if (file) {
			if (!file.name.endsWith(".json")) {
				return;
			}

			updateDropzoneUI(file.name);
		}
	});

	function updateDropzoneUI(filename) {
		dropzone.classList.add("uploaded");
		if (filenameDisplay) {
			filenameDisplay.textContent = filename;
			filenameDisplay.style.display = "block";
		}
	}
}
