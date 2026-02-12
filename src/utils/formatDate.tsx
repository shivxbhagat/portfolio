export function formatDate(dateStr: string | null | undefined): string {
	if (!dateStr) return "";
	const date = new Date(dateStr);

	// Options for formatting
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	// Format the date
	return new Intl.DateTimeFormat("en-US", options).format(date);
}
