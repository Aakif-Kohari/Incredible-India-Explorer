/**
 * Lothal Gateway Explorer - JavaScript Module
 */

const LOTHAL_STRUCTURES = {
    dockyard: {
        title: 'Tidal Dockyard Basin (218m x 37m)',
        desc: 'The world\'s oldest known artificial tidal dockyard constructed of kiln-fired bricks with lock-gates to berth ocean ships.'
    },
    acropolis: {
        title: 'Acropolis (Citadel & Governor\'s House)',
        desc: 'The elevated administrative quarter featuring paved brick baths, underground drainage, and civic offices.'
    },
    warehouse: {
        title: 'The Great Warehouse',
        desc: 'A massive 64-block mud-brick platform where goods were stored, inspected, and sealed with clay tags (terracotta sealings).'
    },
    beadfactory: {
        title: 'Carnelian Bead Manufacturing Factory',
        desc: 'A two-room industrial complex with circular kilns, drills, and gemstones exported to Mesopotamia and Dilmun.'
    },
    lowertown: {
        title: 'Lower Town & Residential Quarter',
        desc: 'Grid-planned residential sector for artisans, coppersmiths, weavers, and merchants.'
    }
};

const LOTHAL_TIMELINE = [
    { period: '2400 BCE', event: 'Foundation of urban port city and dockyard construction by Harappan engineers.' },
    { period: '2350 BCE – 2000 BCE', event: 'Peak golden era of maritime trade with Mesopotamia (Meluhha trade) and Akkad.' },
    { period: '2000 BCE', event: 'Catastrophic riverine flood forces rebuilding of city platforms and bund walls.' },
    { period: '1900 BCE – 1600 BCE', event: 'Late Harappan transition, silting of river mouth, and gradual ruralization.' },
    { period: '1954 CE', event: 'Discovered and excavated by Dr. S.R. Rao of the Archaeological Survey of India (ASI).' }
];

document.addEventListener('DOMContentLoaded', () => {
    const structTitle = document.getElementById('struct-title');
    const structDesc = document.getElementById('struct-desc');
    const timelineContainer = document.getElementById('lothal-timeline');

    window.selectLothalStruct = function(key) {
        const data = LOTHAL_STRUCTURES[key];
        if (!data || !structTitle) return;
        structTitle.textContent = data.title;
        structDesc.textContent = data.desc;
    };

    function renderTimeline() {
        if (!timelineContainer) return;
        timelineContainer.innerHTML = LOTHAL_TIMELINE.map(t => `
            <div class="lothal-tl-item">
                <div class="lothal-tl-year">${t.period}</div>
                <div style="font-size:1.05rem;">${t.event}</div>
            </div>
        `).join('');
    }

    renderTimeline();
});
