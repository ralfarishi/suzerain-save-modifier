export function setupThemeToggle() {
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

	const savedTheme = localStorage.getItem("theme");
	const isDark = savedTheme === "dark" || !savedTheme;
	document.body.classList.toggle("dark-mode", isDark);
	updateThemeIcon(isDark);
}
