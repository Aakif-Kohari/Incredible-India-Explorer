/**
 * Participants Module
 */

const PARTICIPANTS = [

    { name: "Duryodhana", kingdom: "Hastinapura", initial: "D", description: "Came with his brothers and Karna, confident of victory or to disrupt the event." },
    { name: "Karna", kingdom: "Anga", initial: "K", description: "The only warrior besides Arjuna who could potentially string the bow. He was stopped by Draupadi's refusal to marry a 'Suta-putra'." },
    { name: "Shalya", kingdom: "Madra", initial: "S", description: "The mighty king of Madra and uncle to Nakula and Sahadeva, known for his strength, but he failed the challenge." },
    { name: "Arjuna (Disguised)", kingdom: "Panchala (as Brahmin)", initial: "A", description: "Disguised as a humble Brahmin, he calmly accomplished the impossible feat, revealing his true identity only after his victory." }

];

function renderParticipants() {

    const container = document.getElementById('participants-grid');

    if (!container) return;

    container.innerHTML = PARTICIPANTS.map(p => `
        <div class="participant-card">
            <div class="participant-avatar">${p.initial}</div>
            <h4>${p.name}</h4>
            <div class="kingdom">${p.kingdom}</div>
            <p>${p.description}</p>
        </div>
    `).join('');

}

window.renderParticipants = renderParticipants;
