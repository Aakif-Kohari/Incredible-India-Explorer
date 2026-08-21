/**
 * Dholavira Explorer - JavaScript Module
 */

const DHOLAVIRA_SECTORS = {
    citadel: {
        title: 'The Citadel (Castle & Ceremonial Ground)',
        desc: 'The heavily fortified upper city featuring 18-meter-thick stone walls, polished stone pillars, ceremonial stadium, and deep reservoirs reserved for royalty and elites.'
    },
    bailey: {
        title: 'The Bailey Sector',
        desc: 'An enclosed fortified area adjacent to the Castle, likely housing officials, administrative quarters, and guards.'
    },
    middle: {
        title: 'Middle Town',
        desc: 'Spacious residential sector separated by wide street grids, home to merchants, artisans, and bureaucrats.'
    },
    lower: {
        title: 'Lower Town',
        desc: 'Built on the eastern side for laborers, craftspeople, and weavers, fully integrated into the city water grid.'
    }
};

const DHOLAVIRA_TIMELINE = [
    { period: 'Stage I (3000–2900 BCE)', event: 'Pre-Harappan settlement established with mud-brick fortifications.' },
    { period: 'Stage II (2900–2780 BCE)', event: 'Addition of stone masonry fortifications and early reservoir construction.' },
    { period: 'Stage III (2780–2400 BCE)', event: 'Peak urban planning: Citadel created, full tripartite layout and water harvesting grid built.' },
    { period: 'Stage IV (2400–2000 BCE)', event: 'Mature Harappan Period: Global trade flourishing, 10-symbol signboard crafted.' },
    { period: 'Stage V (2000–1900 BCE)', event: 'Gradual decline begins; civic maintenance weakens.' },
    { period: 'Stage VI & VII (1900–1450 BCE)', event: 'Late Harappan ruralization and ultimate abandonment of the city.' }
];

document.addEventListener('DOMContentLoaded', () => {
    const secTitle = document.getElementById('sec-title');
    const secDesc = document.getElementById('sec-desc');
    const timelineContainer = document.getElementById('dholavira-timeline');

    window.selectDholaviraSector = function(key) {
        const data = DHOLAVIRA_SECTORS[key];
        if (!data || !secTitle) return;
        secTitle.textContent = data.title;
        secDesc.textContent = data.desc;
    };

    function renderTimeline() {
        if (!timelineContainer) return;
        timelineContainer.innerHTML = DHOLAVIRA_TIMELINE.map(t => `
            <div class="dholavira-tl-item">
                <div class="dholavira-tl-year">${t.period}</div>
                <div style="font-size:1.05rem;">${t.event}</div>
            </div>
        `).join('');
    }

    renderTimeline();
});
