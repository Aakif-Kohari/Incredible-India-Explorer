document.addEventListener("DOMContentLoaded", () => {
    console.log("Murud Beach profile component initialized successfully.");

    // Interactive card elevation on hover
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
        });
    });
});
