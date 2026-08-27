/**
 * Literary Perspectives Module
 * Different views on Karna's character.
 */

const LITERARY_PERSPECTIVES = [
    {
        view: "The Classical Epic View",
        description: "In the original Vyasa Mahabharata, Karna is a tragic figure bound by fate and curses. His adherence to his word (to Duryodhana and Kunti) is both his greatest virtue and his fatal flaw, making him a complex study in Dharma."
    },
    {
        view: "Modern Reinterpretations",
        description: "Modern authors like Ranjit Desai ('Yugandhar') and Shivaji Sawant ('Mrityunjay') have reimagined Karna as a proto-feminist and anti-caste hero, highlighting his struggle against systemic discrimination and his unwavering moral compass despite his circumstances."
    },
    {
        view: "The Psychological Lens",
        description: "Psychologically, Karna represents the 'imposter syndrome' and the deep-seated need for validation. His entire life was a quest to prove his worth to a society that judged him by his perceived birth, not his actions."
    }
];

function renderLiteraryPerspectives() {
    const container = document.getElementById('perspectives-list');
    if (!container) return;
    container.innerHTML = LITERARY_PERSPECTIVES.map(p => `
        <div class="perspective-item">
            <h4>${p.view}</h4>
            <p>${p.description}</p>
        </div>
    `).join('');
}
window.renderLiteraryPerspectives = renderLiteraryPerspectives;
