/**
 * Relationships Module
 * Documents Karna's key relationships.
 */

const KARNA_RELATIONSHIPS = [
    {
        name: "Duryodhana",
        role: "Loyal Friend & Patron",
        initial: "D",
        description: "The only person who gave Karna respect and a kingdom when the world scorned him. Karna's loyalty to Duryodhana was absolute, even when he knew it was on the side of Adharma."
    },
    {
        name: "Kunti",
        role: "Birth Mother",
        initial: "K",
        description: "Revealed his true lineage to him before the war, pleading with him to join the Pandavas. Karna refused to betray Duryodhana but promised not to kill any Pandava except Arjuna."
    },
    {
        name: "Arjuna",
        role: "Brother & Arch-Rival",
        initial: "A",
        description: "Karna's ultimate rival. Their conflict was cosmic, representing the clash between innate talent (Karna) and privileged training (Arjuna), culminating in their fatal duel."
    },
    {
        name: "Radha & Adhiratha",
        role: "Adoptive Parents",
        initial: "R",
        description: "The charioteer and his wife who raised Karna with immense love. Karna always identified as 'Radheya' (son of Radha), honoring them above his biological royal lineage."
    }
];

function renderRelationships() {
    const container = document.getElementById('relationships-grid');
    if (!container) return;
    container.innerHTML = KARNA_RELATIONSHIPS.map(rel => `
        <div class="relationship-card">
            <div class="relationship-avatar">${rel.initial}</div>
            <h4>${rel.name}</h4>
            <div class="role">${rel.role}</div>
            <p>${rel.description}</p>
        </div>
    `).join('');
}
window.renderRelationships = renderRelationships;
