/**
 * Timeline Module
 * Renders the chronological sequence of events of the 13th day of the war.
 */

const TIMELINE_EVENTS = [
    {
        phase: "Morning",
        title: "The Formation is Deployed",
        description: "Dronacharya, the Kaurava commander, forms the Chakravyuha to capture Yudhishthira. Arjuna is lured away to the south by the Samsaptakas."
    },
    {
        phase: "Mid-Morning",
        title: "Abhimanyu Steps Forward",
        description: "With no other option, the 16-year-old Abhimanyu volunteers to break the formation, warning that he can enter but may not be able to exit. The Pandava warriors agree to follow him in."
    },
    {
        phase: "Noon",
        title: "Breaching the Outer Rings",
        description: "Abhimanyu, riding his chariot, skillfully navigates the outer layers of the Chakravyuha, cutting down numerous Kaurava warriors with his exceptional archery."
    },
    {
        phase: "Afternoon",
        title: "The Trap is Sprung",
        description: "Once Abhimanyu is deep inside the formation, Jayadratha, using a boon from Lord Shiva, blocks the entrance, preventing the other Pandava warriors (Yudhishthira, Bhima, etc.) from following him in."
    },
    {
        phase: "Late Afternoon",
        title: "The Unrighteous Attack",
        description: "Realizing they cannot defeat him fairly, seven Kaurava warriors simultaneously attack the isolated Abhimanyu, breaking the rules of engagement by attacking a single warrior from all sides."
    },
    {
        phase: "Sunset",
        title: "The Fall of a Hero",
        description: "After his weapons are destroyed, Abhimanyu fights with a chariot wheel. He is ultimately struck down from behind by Dushasana's son. His death galvanizes the Pandavas, setting the stage for Arjuna's vow to kill Jayadratha."
    }
];

/**
 * Renders the timeline into the DOM.
 */
function renderAbhimanyuTimeline() {
    const timelineContainer = document.getElementById('abhimanyu-timeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = TIMELINE_EVENTS.map(event => `
        <div class="timeline-item">
            <span class="timeline-phase">${event.phase}</span>
            <h4>${event.title}</h4>
            <p>${event.description}</p>
        </div>
    `).join('');
}

window.renderAbhimanyuTimeline = renderAbhimanyuTimeline;
