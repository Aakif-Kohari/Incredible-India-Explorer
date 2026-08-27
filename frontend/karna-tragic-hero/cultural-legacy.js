/**
 * Cultural Legacy Module
 */
function initCulturalLegacy() {
    console.log("Cultural legacy module initialized for Karna page.");
    const heroSection = document.querySelector('.karna-hero');
    if (heroSection) {
        heroSection.setAttribute('data-cultural-theme', 'tragic-hero-generosity');
    }
}
window.initCulturalLegacy = initCulturalLegacy;
