/**
 * Timeline Module
 */

const BHISHMA_TIMELINE = [
    { era: "Youth", title: "The Perfect Prince", description: "Devavrata is recognized as the ideal heir to the Kuru throne." },
    { era: "The Turning Point", title: "Shantanu's Desire", description: "King Shantanu falls in love with Satyavati, whose father demands her children inherit the throne." },
    { era: "The Sacrifice", title: "The Bhishma Pratigya", description: "Devavrata vows lifelong celibacy and renunciation of the throne to secure his father's happiness." },
    { era: "The Boon", title: "Ichha Mrityu", description: "Pleased by his terrible vow, the gods grant him the boon to choose the time of his death." },
    { era: "The Guardian", title: "Protector of Hastinapura", description: "He serves as the regent and guardian for his half-brother Vichitravirya and later his sons, Dhritarashtra and Pandu." },
    { era: "The War", title: "Commander of the Kauravas", description: "Bound by his vow to the throne, he leads the Kaurava army for ten days, fighting his beloved Pandava grand-nephews." },
    { era: "The Departure", title: "Bed of Arrows", description: "Struck down by Arjuna with Shikhandi's help, he waits on a bed of arrows for Uttarayana to deliver his final teachings to Yudhishthira." }
];

function renderBhishmaTimeline() {
    const container = document.getElementById('bhishma-timeline');
    if (!container) return;
    container.innerHTML = BHISHMA_TIMELINE.map(event => `
        <div class="timeline-item">
            <span class="timeline-era">${event.era}</span>
            <h4>${event.title}</h4>
            <p>${event.description}</p>
        </div>
    `).join('');
}

window.renderBhishmaTimeline = renderBhishmaTimeline;
