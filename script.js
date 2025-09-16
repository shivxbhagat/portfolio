// Add some interactive elements
document.addEventListener("DOMContentLoaded", function () {
	// Add hover effects to project cards
	const projectCards = document.querySelectorAll(".project-card");
	projectCards.forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.style.boxShadow = "0 8px 25px rgba(86, 156, 214, 0.15)";
		});
		card.addEventListener("mouseleave", function () {
			this.style.boxShadow = "none";
		});
	});

	// Add hover effects to education cards
	const educationCards = document.querySelectorAll(".education-card");
	educationCards.forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.style.boxShadow = "0 8px 25px rgba(78, 201, 176, 0.15)";
		});
		card.addEventListener("mouseleave", function () {
			this.style.boxShadow = "0 4px 15px rgba(78, 201, 176, 0.1)";
		});
	});
});
