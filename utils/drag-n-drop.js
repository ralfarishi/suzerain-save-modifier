export function dragNDrop() {
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
}
