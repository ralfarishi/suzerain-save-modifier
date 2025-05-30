export function tabSwitch() {
	document.querySelectorAll(".tab-btn").forEach((btn) => {
		btn.addEventListener("click", () => {
			document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");

			const tabName = btn.dataset.tab;
			document.querySelectorAll(".tab-content").forEach((tab) => {
				tab.classList.remove("active");
			});
			document.getElementById(`${tabName}-tab`).classList.add("active");
		});
	});
}
