document.addEventListener("DOMContentLoaded", () => {
    console.log("Sandakphu–Phalut Trek HTML profile successfully loaded and initialized.");

    // Interactive toggle behavior for cards
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
