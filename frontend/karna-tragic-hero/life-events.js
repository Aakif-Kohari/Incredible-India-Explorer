/**
 * Life Events Module
 * Chronological major events in Karna's life.
 */

const KARNA_LIFE_EVENTS = [
    {
        phase: "Birth",
        title: "Divine Origins and Abandonment",
        description: "Born to Kunti and Surya. Placed in a basket and set afloat on the river to protect Kunti's honor."
    },
    {
        phase: "Childhood",
        title: "Raised by a Charioteer",
        description: "Found and adopted by Adhiratha and Radha. Named Vasusena, he grew up knowing only their love, unaware of his royal lineage."
    },
    {
        phase: "Youth",
        title: "Rejection by Dronacharya",
        description: "Denied training in advanced warfare by Dronacharya due to his perceived low caste (Suta-putra)."
    },
    {
        phase: "Turning Point",
        title: "Blessing of Parashurama",
        description: "Disguised himself as a Brahmin to learn divine weapons from Parashurama. Cursed to forget his knowledge when he needed it most."
    },
    {
        phase: "Rise",
        title: "Crowned King of Anga",
        description: "Duryodhana recognized his talent and crowned him King of Anga, giving him the respect and status society had denied him."
    },
    {
        phase: "Sacrifice",
        title: "Giving Away Kavacha and Kundala",
        description: "Gave his divine, life-protecting armor and earrings to Indra (disguised as a Brahmin), embracing his mortal fate for the sake of his reputation as a giver."
    },
    {
        phase: "War",
        title: "The Fall at Kurukshetra",
        description: "Fought valiantly but was killed by Arjuna while his chariot wheel was stuck in the mud, fulfilling the curses and his tragic destiny."
    }
];

function renderKarnaTimeline() {
    const container = document.getElementById('karna-timeline');
    if (!container) return;
    container.innerHTML = KARNA_LIFE_EVENTS.map(event => `
        <div class="timeline-item">
            <span class="timeline-phase">${event.phase}</span>
            <h4>${event.title}</h4>
            <p>${event.description}</p>
        </div>
    `).join('');
}
window.renderKarnaTimeline = renderKarnaTimeline;
