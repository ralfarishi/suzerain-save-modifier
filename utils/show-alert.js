export function showAlert(message) {
	let alertBox = document.getElementById("custom-alert");
	if (!alertBox) {
		alertBox = document.createElement("div");
		alertBox.id = "custom-alert";
		Object.assign(alertBox.style, {
			position: "fixed",
			top: "20px",
			left: "50%",
			transform: "translateX(-50%)",
			background: "#f44336",
			color: "#fff",
			padding: "12px 24px",
			borderRadius: "6px",
			fontWeight: "bold",
			boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
			zIndex: 9999,
		});
		document.body.appendChild(alertBox);
	}
	alertBox.textContent = message;
	alertBox.style.display = "block";
	setTimeout(() => {
		alertBox.style.display = "none";
	}, 3500);
}
