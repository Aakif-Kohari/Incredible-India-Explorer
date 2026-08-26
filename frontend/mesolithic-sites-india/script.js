/**
 * script.js
 * Interactive map for the Mesolithic Sites Across India page.
 * Renders clickable site markers on a stylised India outline, each
 * showing a short popup summary of that Mesolithic site on click.
 */

const MESOLITHIC_SITES = [
    {
        id: 'bhimbetka',
        name: 'Bhimbetka',
        state: 'Madhya Pradesh',
        color: '#dc2626',
        top: '46%',
        left: '46%',
        summary: 'A vast rock shelter complex with one of the world\'s richest collections of prehistoric rock art.'
    },
    {
        id: 'bagor',
        name: 'Bagor',
        state: 'Rajasthan',
        color: '#ea580c',
        top: '32%',
        left: '36%',
        summary: 'A long-occupied riverside site with a detailed microlithic sequence and early evidence of animal domestication.'
    },
    {
        id: 'sarai-nahar-rai',
        name: 'Sarai Nahar Rai',
        state: 'Uttar Pradesh',
        color: '#65a30d',
        top: '38%',
        left: '54%',
        summary: 'Known for its Mesolithic human burials, among the earliest evidence of deliberate interment in the region.'
    },
    {
        id: 'langhnaj',
        name: 'Langhnaj',
        state: 'Gujarat',
        color: '#0891b2',
        top: '50%',
        left: '24%',
        summary: 'A dune site yielding microliths alongside human skeletal remains and animal bones.'
    },
    {
        id: 'adamgarh',
        name: 'Adamgarh',
        state: 'Madhya Pradesh',
        color: '#7c3aed',
        top: '48%',
        left: '42%',
        summary: 'Narmada valley rock shelters with microlithic tools and early evidence linked to animal domestication.'
    },
    {
        id: 'tilwara',
        name: 'Tilwara',
        state: 'Rajasthan',
        color: '#c026d3',
        top: '34%',
        left: '28%',
        summary: 'A desert-margin site contributing to the understanding of Mesolithic adaptation in arid western India.'
    }
];

function closeOpenPopup() {
    const existing = document.querySelector('.map-popup');
    if (existing) existing.remove();
}

function showPopup(marker, site) {
    closeOpenPopup();
    const popup = document.createElement('div');
    popup.className = 'map-popup';
    popup.innerHTML = `
        <h4>${site.name}</h4>
        <p>${site.state}</p>
        <p>${site.summary}</p>
    `;
    marker.appendChild(popup);
    setTimeout(() => document.addEventListener('click', closeOpenPopup, { once: true }), 10);
}

function renderMesolithicMap() {
    const mapContainer = document.getElementById('mesolithic-map');
    const legendContainer = document.getElementById('mesolithic-legend');
    if (!mapContainer || !legendContainer) return;

    MESOLITHIC_SITES.forEach(site => {
        const marker = document.createElement('button');
        marker.type = 'button';
        marker.className = 'map-marker';
        marker.style.top = site.top;
        marker.style.left = site.left;
        marker.style.setProperty('--marker-color', site.color);
        marker.setAttribute('aria-label', `${site.name}, ${site.state}`);
        marker.innerHTML = `
            <span class="marker-dot"></span>
            <span class="marker-label">${site.name}</span>
        `;
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            showPopup(marker, site);
        });
        mapContainer.appendChild(marker);

        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <span class="legend-color" style="background:${site.color}"></span>
            <span class="legend-name">${site.name}, ${site.state}</span>
        `;
        legendItem.addEventListener('click', () => showPopup(marker, site));
        legendContainer.appendChild(legendItem);
    });
}

document.addEventListener('DOMContentLoaded', renderMesolithicMap);