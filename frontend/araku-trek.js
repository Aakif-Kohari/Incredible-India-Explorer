document.addEventListener("DOMContentLoaded", () => {
    console.log("Araku Valley Trek profile component initialized successfully.");
    
    // Add dynamic interaction: Highlight cards on click
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            card.style.borderColor = "#2e7d32";
        });
    });
});
