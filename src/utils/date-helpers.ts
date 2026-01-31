export function convertToDatetimeLocal(dateStr: string): string {
	if (!dateStr) return "";

	const [d, m, yAndTime] = dateStr.split("/");
	if (!yAndTime) return "";

	const [y, timeAndPeriod] = yAndTime.split(" ");
	if (!timeAndPeriod) return "";

	const [hourStr, minuteStr] = timeAndPeriod.split(":");
	const period = timeAndPeriod.slice(-2);
	let hour = parseInt(hourStr, 10);
	const minute = parseInt(minuteStr, 10);

	if (period === "PM" && hour < 12) hour += 12;
	if (period === "AM" && hour === 12) hour = 0;

	const pad = (n: number) => n.toString().padStart(2, "0");
	return `${y}-${pad(parseInt(m, 10))}-${pad(parseInt(d, 10))}T${pad(hour)}:${pad(minute)}`;
}

export function convertDatetimeLocalToInitialDate(datetimeValue: string): string {
	if (!datetimeValue) return "";

	const [datePart, timePart] = datetimeValue.split("T");
	if (!datePart || !timePart) return "";

	const [year, month, day] = datePart.split("-");
	let [hourStr, minuteStr] = timePart.split(":");

	let hour = parseInt(hourStr, 10);
	const minute = parseInt(minuteStr, 10);

	const period = hour >= 12 ? "PM" : "AM";
	if (hour > 12) hour -= 12;
	if (hour === 0) hour = 12;

	const pad = (n: number | string) => n.toString().padStart(2, "0");
	return `${pad(day)}/${pad(month)}/${year} ${pad(hour)}:${pad(minute)} ${period}`;
}
